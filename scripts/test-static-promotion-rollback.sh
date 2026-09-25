#!/usr/bin/env bash
set -euo pipefail

if [[ "$(uname -s)" != Linux ]]; then
	echo "Static promotion recovery integration is exercised on the Linux CI deployment runner."
	exit 0
fi

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)"
legacy_commit=cc774b9c75c425f97bb5c6768f31985ae4ad0cfc
if [[ "$(git -C "$repo_root" rev-parse 'v1.0.16^{}')" != "$legacy_commit" ]]; then
	echo "The reviewed v1.0.16 rollback identity is unavailable or has moved." >&2
	exit 1
fi

test_root="$(mktemp -d)"
server_pid=""
worker_master_pid=""
cleanup_test() {
	if [[ -n "$server_pid" ]]; then
		kill "$server_pid" 2>/dev/null || true
		wait "$server_pid" 2>/dev/null || true
	fi
	if [[ -n "$worker_master_pid" ]]; then
		kill "$worker_master_pid" 2>/dev/null || true
		wait "$worker_master_pid" 2>/dev/null || true
	fi
	chmod -R u+rwX -- "$test_root" 2>/dev/null || true
	rm -rf -- "$test_root"
}
trap cleanup_test EXIT

candidate_commit="$(python3 -I -c '
import json, pathlib, sys
release=json.loads(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))
print(release["revision"])
' "$repo_root/front-end/dist/release.json")"
candidate_version="$(python3 -I -c '
import json, pathlib, sys
release=json.loads(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))
print(release["version"])
' "$repo_root/front-end/dist/release.json")"
[[ "$candidate_commit" =~ ^[0-9a-f]{40}$ ]]
python3 -I -c '
import sys
version=tuple(int(value) for value in sys.argv[1].split("."))
if version <= (1, 0, 16): raise SystemExit(1)
' "$candidate_version"

mkdir -p "$test_root/candidate-output" "$test_root/candidate"
"$repo_root/scripts/package-static-artifact.sh" \
	"$repo_root" "$test_root/candidate-output" "$candidate_commit" >/dev/null
candidate_archive="$(find "$test_root/candidate-output" -maxdepth 1 -type f -name '*.tar.gz' -print -quit)"
candidate_sha="$(sha256sum "$candidate_archive" | cut -d' ' -f1)"
python3 -I "$repo_root/scripts/static-artifact.py" unpack "$test_root/candidate" \
	--archive "$candidate_archive" --sha256 "$candidate_sha" \
	--commit "$candidate_commit" --version "$candidate_version" >/dev/null

legacy_stage="$test_root/legacy-stage"
mkdir -p \
	"$legacy_stage/front-end/dist/admin" \
	"$legacy_stage/front-end/dist/courses" \
	"$legacy_stage/front-end/dist/graph-sketcher" \
	"$legacy_stage/deploy/nginx"
printf '%s\n' '<!doctype html><title>Math legacy fixture</title>' >"$legacy_stage/front-end/dist/index.html"
printf '%s\n' 'Page not found' >"$legacy_stage/front-end/dist/404.html"
printf '%s\n' 'Admin handoff' >"$legacy_stage/front-end/dist/admin/index.html"
printf '%s\n' 'Courses' >"$legacy_stage/front-end/dist/courses/index.html"
printf '%s\n' 'Graph Sketcher' >"$legacy_stage/front-end/dist/graph-sketcher/index.html"
printf '{"classroomUsageEnabled":false,"revision":"%s","version":"1.0.16"}\n' \
	"$legacy_commit" >"$legacy_stage/front-end/dist/release.json"
git -C "$repo_root" show v1.0.16:deploy/nginx/http-maps.conf \
	>"$legacy_stage/deploy/nginx/http-maps.conf"
git -C "$repo_root" show v1.0.16:deploy/nginx/server-policy.conf \
	>"$legacy_stage/deploy/nginx/server-policy.conf"
cp -- "$repo_root/deploy/nginx/classroom-usage-disabled.inc" \
	"$legacy_stage/deploy/nginx/classroom-usage.inc"
find "$legacy_stage" -type f -exec chmod 0444 {} +
legacy_archive="$test_root/legacy.tar.gz"
legacy_pack="$(python3 -I "$repo_root/scripts/static-artifact.py" pack "$legacy_stage" \
	--archive "$legacy_archive" --commit "$legacy_commit" --allow-legacy)"
legacy_sha="$(python3 -I -c 'import json,sys; print(json.loads(sys.argv[1])["sha256"])' "$legacy_pack")"
mkdir "$test_root/legacy"
python3 -I "$repo_root/scripts/static-artifact.py" unpack "$test_root/legacy" \
	--archive "$legacy_archive" --sha256 "$legacy_sha" \
	--commit "$legacy_commit" --allow-legacy >/dev/null

mkdir -p "$test_root/runtime/snippets" "$test_root/runtime/recovery"
current_link="$test_root/runtime/current"
ln -s -- "$test_root/legacy" "$current_link"
maps_target="$test_root/runtime/snippets/math.avasan.org-http-maps.conf"
policy_target="$test_root/runtime/snippets/math.avasan.org-server-policy.conf"
usage_target="$test_root/runtime/snippets/math.avasan.org-classroom-usage.inc"
cp -- "$test_root/legacy/deploy/nginx/http-maps.conf" "$maps_target"
cp -- "$test_root/legacy/deploy/nginx/server-policy.conf" "$policy_target"
cp -- "$test_root/legacy/deploy/nginx/classroom-usage.inc" "$usage_target"

cat >"$test_root/mock-nginx" <<'MOCK_NGINX'
#!/usr/bin/env bash
set -euo pipefail
case "${1:-}" in
	-t) exit 0 ;;
	-T)
		printf '# configuration file %s:\n' \
			"$MATH_TEST_MAPS_TARGET" "$MATH_TEST_POLICY_TARGET" "$MATH_TEST_USAGE_TARGET"
		;;
	*) exit 2 ;;
esac
MOCK_NGINX
cat >"$test_root/mock-systemctl" <<'MOCK_SYSTEMCTL'
#!/usr/bin/env bash
set -euo pipefail
case "${1:-}" in
	show) cat "$MATH_TEST_MASTER_PID_FILE" ;;
	reload)
		[[ "${2:-}" == nginx.service ]]
		readlink -f -- "$MATH_TEST_CURRENT" >>"$MATH_TEST_RELOAD_LOG"
		kill -HUP "$(cat "$MATH_TEST_MASTER_PID_FILE")"
		;;
	*) exit 2 ;;
esac
MOCK_SYSTEMCTL
chmod 0755 "$test_root/mock-nginx" "$test_root/mock-systemctl"
export MATH_TEST_MAPS_TARGET="$maps_target"
export MATH_TEST_POLICY_TARGET="$policy_target"
export MATH_TEST_USAGE_TARGET="$usage_target"
export MATH_TEST_CURRENT="$current_link"
export MATH_TEST_RELOAD_LOG="$test_root/reloads.log"
export MATH_TEST_MASTER_PID_FILE="$test_root/nginx-master.pid"

node "$repo_root/scripts/verify-nginx-worker-fixture.mjs" master \
	"$MATH_TEST_MASTER_PID_FILE" "$test_root/nginx-workers.log" \
	>"$test_root/nginx-worker-server.log" 2>&1 &
worker_master_pid=$!
for _ in {1..100}; do
	[[ -s "$MATH_TEST_MASTER_PID_FILE" ]] \
		&& grep -Fq 'worker-start' "$test_root/nginx-workers.log" 2>/dev/null \
		&& break
	sleep 0.05
done
[[ -s "$MATH_TEST_MASTER_PID_FILE" ]]
grep -Fq 'worker-start' "$test_root/nginx-workers.log"

node "$repo_root/scripts/verify-static-promotion-fixture.mjs" \
	"$current_link" "$policy_target" "$test_root/port" "$test_root/events.log" \
	>"$test_root/server.log" 2>&1 &
server_pid=$!
for _ in {1..100}; do
	[[ -s "$test_root/port" ]] && break
	sleep 0.05
done
[[ -s "$test_root/port" ]]
port="$(cat "$test_root/port")"

# These globals are fixed by the privileged wrapper in production. The test sets
# only disposable paths and unprivileged command shims before sourcing the exact
# transaction implementation.
python_bin="$(command -v python3)"
timeout_bin="$(command -v timeout)"
install_bin="$(command -v install)"
mv_bin="$(command -v mv)"
ln_bin="$(command -v ln)"
unlink_bin="$(command -v unlink)"
cmp_bin="$(command -v cmp)"
grep_bin="$(command -v grep)"
curl_bin="$(command -v curl)"
sleep_bin="$(command -v true)"
nginx_bin="$test_root/mock-nginx"
systemctl_bin="$test_root/mock-systemctl"
rm_bin="$(command -v rm)"
mktemp_bin="$(command -v mktemp)"
install_arguments=(-m 0644)
acceptance_attempts=1
artifact_tool="$repo_root/scripts/static-artifact.py"
path_guard="$repo_root/deploy/direct/trusted-paths.py"
snippet_gate="$repo_root/deploy/direct/verify-nginx-snippet-dump.sh"
captured_header_gate="$repo_root/deploy/direct/verify-captured-response-headers.py"
worker_gate="$repo_root/deploy/direct/nginx-worker-generation.py"
worker_state_root="$test_root/runtime/recovery"
host_header=math.avasan.org
site_origin="http://$host_header:$port"
resolve_ipv4="$host_header:$port:127.0.0.1"
resolve_ipv6="$host_header:$port:[::1]"
next_link="${current_link}.next.$$"
response_ipv4="$test_root/response-ipv4"
response_ipv6="$test_root/response-ipv6"
headers_ipv4="$test_root/headers-ipv4"
headers_ipv6="$test_root/headers-ipv6"
nginx_dump="$test_root/nginx-dump"
state_record="$test_root/runtime/recovery/promotion-state-test"
previous_target="$test_root/legacy"
previous_kind=legacy
expected_current="$legacy_commit"
candidate="$test_root/candidate"
mutation_started=false
finished=false
rollback_failed=false

. "$repo_root/deploy/direct/static-promotion-transaction.sh"

# Path ownership is independently enforced by the privileged wrapper. This
# rootless integration still runs the real manifest and identity verification.
verify_release_tree() {
	local target="$1" expected="$2" expected_version="${3:-}"
	local arguments=(verify "$target" --commit "$expected")
	[[ -n "$expected_version" ]] && arguments+=(--version "$expected_version")
	"$python_bin" -I "$artifact_tool" "${arguments[@]}"
}
verify_legacy_tree() {
	"$python_bin" -I "$artifact_tool" verify "$1" --commit "$2" --allow-legacy
}
cleanup() {
	rm -f -- "$next_link" "$response_ipv4" "$response_ipv6" \
		"$headers_ipv4" "$headers_ipv6" "$nginx_dump"
}

previous_profile="$(legacy_recovery_profile "$previous_target" "$expected_current")"
printf '%s\n%s\n%s\n%s\n' \
	"$previous_target" "$previous_kind" "$candidate" "$candidate_commit" >"$state_record"

set +e
(
	set -euo pipefail
	trap on_exit EXIT
	trap 'exit 129' HUP
	trap 'exit 130' INT
	trap 'exit 143' TERM
	mutation_started=true
	if promote_candidate "$candidate"; then
		finished=true
		exit 0
	fi
	echo "Candidate acceptance failed; restoring the sealed previous Math release." >&2
	exit 1
) >"$test_root/transaction.log" 2>&1
transaction_status=$?
set -e

[[ "$transaction_status" -eq 1 ]]
grep -Fq 'Candidate acceptance failed' "$test_root/transaction.log"
grep -Fq 'Restored and verified the sealed previous Math release' "$test_root/transaction.log"
if grep -Fq 'CRITICAL' "$test_root/transaction.log"; then
	echo "Rollback unexpectedly entered manual-recovery state." >&2
	exit 1
fi
[[ "$(readlink -f -- "$current_link")" == "$test_root/legacy" ]]
cmp -s "$test_root/legacy/deploy/nginx/http-maps.conf" "$maps_target"
cmp -s "$test_root/legacy/deploy/nginx/server-policy.conf" "$policy_target"
cmp -s "$test_root/legacy/deploy/nginx/classroom-usage.inc" "$usage_target"
[[ ! -e "$state_record" ]]
[[ "$(wc -l <"$test_root/reloads.log")" -eq 2 ]]
while IFS= read -r reloaded_target; do
	[[ "$reloaded_target" == "$test_root/legacy" ]]
done <"$test_root/reloads.log"
grep -Fq "\"family\":\"ipv6\",\"method\":\"POST\",\"path\":\"/\",\"version\":\"$candidate_version\"" "$test_root/events.log"
grep -Fq '"family":"ipv4","method":"GET","path":"/release.json","version":"1.0.16"' "$test_root/events.log"
grep -Fq '"family":"ipv6","method":"GET","path":"/release.json","version":"1.0.16"' "$test_root/events.log"
[[ "$(grep -Fc 'worker-retired' "$test_root/nginx-workers.log")" -eq 2 ]]

for family in ipv4 ipv6; do
	for path in \
		/release.json / /admin /courses /graph-sketcher \
		/404 /404/ /404.html /404/index.html /index.html /%69ndex.html \
		/admin.html /admin/index.html /admin/index%2ehtml /admin/index%2Ehtml \
		/courses.html /courses/index.html /courses%2ehtml /courses/index%2Ehtml \
		/graph-sketcher.html /graph-sketcher/index.html /graph-sketcher%2Ehtml \
		/python-ide /python-ide/asset.js /.vite/ssr-manifest.json \
		/__math-artifact-probe-missing; do
		grep -Fq "\"family\":\"$family\",\"method\":\"GET\",\"path\":\"$path\",\"version\":\"$candidate_version\"" \
			"$test_root/events.log"
	done
done

status="$(request_status --ipv4 "$resolve_ipv4" "$response_ipv4" "$headers_ipv4" "$site_origin/")"
[[ "$status" == 200 ]]
grep -Fq "img-src 'self' data: blob: https:;" "$headers_ipv4"
grep -Fq "media-src 'self' blob: https:;" "$headers_ipv4"
captured_page_headers "$test_root/legacy" "$headers_ipv4" root
if family_matches --ipv4 "$resolve_ipv4" "$response_ipv4" "$headers_ipv4" "$test_root/legacy"; then
	echo "Candidate acceptance incorrectly accepted the legacy CSP." >&2
	exit 1
fi

mutation_marker="$test_root/rollback-mutated"
set +e
(
	verify_legacy_tree() { return 1; }
	install_release_policies() { touch "$mutation_marker"; }
	rollback
)
verification_failure_status=$?
set -e
[[ "$verification_failure_status" -ne 0 && ! -e "$mutation_marker" ]]

echo "Verified a real candidate activation failure restores sealed v1.0.16 behavior and fails closed."
