#!/usr/bin/env bash
set -euo pipefail

if [[ "$(uname -s)" != Linux ]]; then
	echo "Real Nginx header regression runs on the Linux CI deployment runner."
	exit 0
fi

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)"
nginx_bin="${NGINX_BIN:-$(command -v nginx || true)}"
[[ -x "$nginx_bin" ]] || {
	echo "The Linux header regression requires Nginx." >&2
	exit 1
}

test_root="$(mktemp -d)"
server_pid=""
cleanup() {
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
printf '%s\n' '<!doctype html><title>Page not found</title><p>Page not found</p>' \
	>"$test_root/public/404.html"
printf '%s\n' '{"ok":true}' >"$test_root/public/release.json"

cat >"$test_root/nginx.conf" <<EOF
worker_processes 1;
pid "$test_root/nginx.pid";
error_log "$test_root/error.log" notice;

events {
	worker_connections 64;
}

http {
	access_log off;
	include "$repo_root/deploy/nginx/http-maps.conf";

	server {
		listen 127.0.0.1:$port;
		server_name math.avasan.org;
		root "$test_root/public";
		error_page 404 /404.html;

		add_header X-Robots-Tag \$math_robots_tag always;
		add_header Cache-Control \$math_cache_control always;

		location = /404.html {
			internal;
			try_files \$uri =404;
		}

		location = /admin {
			return 302 https://cs.avasan.org/admin;
		}

		location = /admin/ {
			return 302 https://cs.avasan.org/admin;
		}

		location / {
			if (\$math_admin_request) {
				return 404;
			}
			if (\$math_legacy_artifact_request) {
				return 404;
			}
			try_files \$uri \$uri/ =404;
		}
	}
}
EOF

"$nginx_bin" -p "$test_root/" -c "$test_root/nginx.conf" -t
"$nginx_bin" -p "$test_root/" -c "$test_root/nginx.conf" -g 'daemon off;' &
server_pid=$!

for _ in {1..100}; do
	if curl --noproxy '*' --silent --max-time 1 \
		"http://127.0.0.1:$port/release.json" >/dev/null; then
		break
	fi
	sleep 0.05
done
kill -0 "$server_pid"

request() {
	local method="$1" path="$2" expected_status="$3"
	local headers="$test_root/headers" body="$test_root/body" status
	local method_arguments=(--request "$method")
	if [[ "$method" == HEAD ]]; then
		method_arguments=(--head)
	fi
	status="$(curl --noproxy '*' --path-as-is --silent --show-error --max-time 2 \
		"${method_arguments[@]}" --dump-header "$headers" --output "$body" \
		--write-out '%{http_code}' "http://127.0.0.1:$port$path")"
	[[ "$status" == "$expected_status" ]]
}

assert_private_admin_headers() {
	grep -Eiq '^Cache-Control:[[:space:]]*no-store' "$test_root/headers"
	grep -Eiq '^X-Robots-Tag:[[:space:]]*noindex, nofollow, noarchive' "$test_root/headers"
}

for path in \
	/admin.html \
	/admin/index.html \
	/admin/index%2ehtml \
	/admin/index%2Ehtml \
	/%61dmin.html \
	/admin//index.html \
	/admin/./index.html \
	'/admin.html?source=probe' \
	'/admin/index%2ehtml?source=probe'; do
	request GET "$path" 404
	grep -Fq 'Page not found' "$test_root/body"
	assert_private_admin_headers
	request HEAD "$path" 404
	assert_private_admin_headers
done

request GET '/admin?source=probe' 302
grep -Eiq '^Location:[[:space:]]*https://cs\.avasan\.org/admin' "$test_root/headers"
assert_private_admin_headers

request GET '/release.json?source=probe' 200
grep -Eiq '^Cache-Control:[[:space:]]*no-store' "$test_root/headers"

request GET /ordinary-missing-route 404
grep -Fq 'Page not found' "$test_root/body"
! grep -Eiq '^Cache-Control:[[:space:]]*no-store' "$test_root/headers"
! grep -Eiq '^X-Robots-Tag:[[:space:]]*noindex' "$test_root/headers"

echo "Real Nginx internal-redirect header regression passed."
