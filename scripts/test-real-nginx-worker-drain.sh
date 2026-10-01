#!/usr/bin/env bash
set -euo pipefail

if [[ "$(uname -s)" != Linux ]]; then
	echo "Real Nginx worker-drain regression runs on the Linux CI deployment runner."
	exit 0
fi

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)"
nginx_bin="${NGINX_BIN:-$(command -v nginx || true)}"
[[ -x "$nginx_bin" ]] || { echo "Nginx is required." >&2; exit 1; }
test_root="$(mktemp -d)"
server_pid=""
client_pid=""
cleanup() {
	if [[ -n "$client_pid" ]]; then
		kill "$client_pid" 2>/dev/null || true
		wait "$client_pid" 2>/dev/null || true
	fi
	if [[ -n "$server_pid" ]]; then
		kill -TERM "$server_pid" 2>/dev/null || true
		wait "$server_pid" 2>/dev/null || true
	fi
	rm -rf -- "$test_root"
}
trap cleanup EXIT

port="$(python3 -I -c '
import socket
with socket.socket() as listener:
    listener.bind(("127.0.0.1", 0))
    print(listener.getsockname()[1])
')"
mkdir -p "$test_root/public"
printf '%s\n' 'Synthetic static page' >"$test_root/public/index.html"
cat >"$test_root/nginx.conf" <<EOF
worker_processes 1;
worker_shutdown_timeout 2s;
pid "$test_root/nginx.pid";
error_log "$test_root/error.log" notice;
events { worker_connections 64; }
http {
	access_log off;
	client_header_timeout 30s;
	server {
		listen 127.0.0.1:$port;
		server_name math.avasan.org;
		root "$test_root/public";
	}
}
EOF

"$nginx_bin" -p "$test_root/" -c "$test_root/nginx.conf" -t
"$nginx_bin" -p "$test_root/" -c "$test_root/nginx.conf" -T 2>/dev/null \
	| python3 -I "$repo_root/deploy/direct/verify-nginx-worker-drain.py"
"$nginx_bin" -p "$test_root/" -c "$test_root/nginx.conf" -g 'daemon off;' &
server_pid=$!
for _ in {1..100}; do
	if curl --noproxy '*' --silent --max-time 1 "http://127.0.0.1:$port/" >/dev/null; then
		break
	fi
	sleep 0.05
done
kill -0 "$server_pid"

python3 -I - "$port" "$test_root/client-ready" <<'PY' &
import pathlib
import socket
import sys
import time

with socket.create_connection(("127.0.0.1", int(sys.argv[1])), timeout=3) as connection:
    connection.sendall(b"GET / HTTP/1.1\r\nHost: math.avasan.org\r\nX-Hold: ")
    pathlib.Path(sys.argv[2]).write_text("ready", encoding="ascii")
    time.sleep(15)
PY
client_pid=$!
for _ in {1..100}; do
	[[ -s "$test_root/client-ready" ]] && break
	sleep 0.05
done
[[ -s "$test_root/client-ready" ]]

cat >"$test_root/mock-nginx" <<'MOCK_NGINX'
#!/usr/bin/env bash
exec "$TEST_NGINX_BIN" -p "$TEST_ROOT/" -c "$TEST_ROOT/nginx.conf" "$@"
MOCK_NGINX
cat >"$test_root/mock-systemctl" <<'MOCK_SYSTEMCTL'
#!/usr/bin/env bash
case "$1" in
	show) printf '%s\n' "$TEST_MASTER_PID" ;;
	reload) kill -HUP "$TEST_MASTER_PID" ;;
	*) exit 2 ;;
esac
MOCK_SYSTEMCTL
chmod 0755 "$test_root/mock-nginx" "$test_root/mock-systemctl"
export TEST_NGINX_BIN="$nginx_bin" TEST_ROOT="$test_root" TEST_MASTER_PID="$server_pid"

nginx_bin="$test_root/mock-nginx"
systemctl_bin="$test_root/mock-systemctl"
python_bin="$(command -v python3)"
worker_gate="$repo_root/deploy/direct/nginx-worker-generation.py"
drain_gate="$repo_root/deploy/direct/verify-nginx-worker-drain.py"
mktemp_bin="$(command -v mktemp)"
rm_bin="$(command -v rm)"
worker_state_root="$test_root"
worker_retirement_timeout=8
state_record="$test_root/promotion-state-test"
mutation_started=false
. "$repo_root/deploy/direct/static-promotion-transaction.sh"

if prepare_worker_drain >"$test_root/preflight.log" 2>&1; then
	[[ "$preflight_failure_code" -eq 0 ]]
	echo "Real Nginx retired its old worker before serving mutation."
else
	[[ "$preflight_failure_code" -eq 75 ]]
	grep -Fq 'no release pointer or policy changed' "$test_root/preflight.log"
	echo "Real Nginx kept an incomplete-header worker; promotion safely refused before recovery lock."
fi
[[ "$mutation_started" == false ]]
[[ ! -e "$state_record" ]]
curl --noproxy '*' --fail --silent --show-error --max-time 2 "http://127.0.0.1:$port/" >/dev/null
