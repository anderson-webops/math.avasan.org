#!/usr/bin/env bash
# Install this helper under /usr/local/libexec before privileged use.
set -euo pipefail
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export PATH
unset NODE_OPTIONS NODE_PATH PYTHONHOME PYTHONPATH
umask 077

if [[ $# -ne 6 && $# -ne 8 ]]; then
	echo "Usage: promote-static-release.sh <archive> <attestation-bundle> <sha256> <commit> <version> <expected-current-commit> [<reviewed-legacy-archive> <reviewed-legacy-sha256>]" >&2
	exit 2
fi
if [[ ${EUID:-$(id -u)} -ne 0 ]]; then
	echo "Run the installed promotion helper with root privileges." >&2
	exit 1
fi

archive="$1"
attestation_bundle="$2"
archive_sha="$3"
commit="$4"
version="$5"
expected_current="$6"
legacy_archive="-"
legacy_sha="-"
if [[ $# -eq 8 ]]; then
	legacy_archive="$7"
	legacy_sha="$8"
fi
if [[ ! "$archive" = /* || ! "$attestation_bundle" = /* \
	|| ! "$archive_sha" =~ ^[0-9a-f]{64}$ \
	|| ! "$commit" =~ ^[0-9a-f]{40}$ \
	|| ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ \
	|| ! "$expected_current" =~ ^[0-9a-f]{40}$ ]]; then
	echo "Pass absolute artifact paths, a reviewed SHA-256, an exact semver version, and lowercase source commits." >&2
	exit 1
fi
expected_archive="math.avasan.org-v$version-${commit:0:12}-static.tar.gz"
if [[ "$(basename -- "$archive")" != "$expected_archive" ]]; then
	echo "Release artifact filename does not match the expected version and commit." >&2
	exit 1
fi
for input in "$archive" "$attestation_bundle"; do
	if [[ ! -f "$input" || -L "$input" ]]; then
		echo "Release artifact inputs must be regular non-symlink files: $input" >&2
		exit 1
	fi
done
if [[ "$legacy_archive" == "-" || "$legacy_sha" == "-" ]]; then
	if [[ "$legacy_archive" != "-" || "$legacy_sha" != "-" ]]; then
		echo "Pass both reviewed legacy archive and SHA-256, or omit both." >&2
		exit 1
	fi
elif [[ ! "$legacy_archive" = /* || ! "$legacy_sha" =~ ^[0-9a-f]{64}$ \
	|| ! -f "$legacy_archive" || -L "$legacy_archive" ]]; then
	echo "Legacy rollback archive must be a regular absolute file with a reviewed SHA-256." >&2
	exit 1
fi

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
helper_root="$(cd -- "$script_dir/../.." && pwd -P)"
artifact_tool="$helper_root/scripts/static-artifact.py"
path_guard="$script_dir/trusted-paths.py"
snippet_gate="$script_dir/verify-nginx-snippet-dump.sh"
base=/srv/math.avasan.org
release_root="$base/artifact-releases"
incoming_root="$base/artifact-incoming"
recovery_root="$base/.deployment-recovery"
legacy_root="$base/releases"
current_link="$base/current"
snippet_root=/etc/nginx/snippets
maps_target="$snippet_root/math.avasan.org-http-maps.conf"
policy_target="$snippet_root/math.avasan.org-server-policy.conf"
usage_target="$snippet_root/math.avasan.org-classroom-usage.inc"
host_header=math.avasan.org
site_origin=https://math.avasan.org
resolve_ipv4="$host_header:443:127.0.0.1"
resolve_ipv6="$host_header:443:[::1]"

/usr/bin/python3 -I "$path_guard" --tree "$helper_root"
/usr/bin/python3 -I "$path_guard" /usr/bin/gh /usr/bin/timeout "$base" "$release_root" "$incoming_root" "$recovery_root" "$snippet_root"
if [[ "$(/usr/bin/stat -c '%u:%g:%a' "$release_root")" != "0:0:755" \
	|| "$(/usr/bin/stat -c '%u:%g:%a' "$incoming_root")" != "0:0:700" \
	|| "$(/usr/bin/stat -c '%u:%g:%a' "$recovery_root")" != "0:0:700" ]]; then
	echo "Protected release directories do not match their reviewed ownership and modes." >&2
	exit 1
fi
for target in "$maps_target" "$policy_target" "$usage_target"; do
	if [[ -e "$target" ]]; then
		/usr/bin/python3 -I "$path_guard" "$target"
	fi
done
if [[ ! -L "$current_link" ]]; then
	echo "Promotion requires an existing verified current Math release symlink." >&2
	exit 1
fi
if ! /usr/sbin/nginx -t; then
	echo "Nginx configuration must pass before artifact installation or activation." >&2
	exit 1
fi

exec 9>"$recovery_root/promotion.lock"
if ! /usr/bin/flock -n 9; then
	echo "Another Math promotion is active." >&2
	exit 1
fi
if /usr/bin/find "$recovery_root" -maxdepth 1 -type f -name 'promotion-state-*' -print -quit | /usr/bin/grep -q .; then
	echo "A protected promotion recovery record needs operator review before another activation." >&2
	exit 1
fi

protected_archive="$(/usr/bin/mktemp "$incoming_root/release-XXXXXXXX.tar.gz")"
protected_bundle="$(/usr/bin/mktemp "$incoming_root/attestation-XXXXXXXX.jsonl")"
protected_legacy_archive=""
candidate_temp=""
legacy_temp=""
next_link="${current_link}.next.$$"
response_ipv4="$(/usr/bin/mktemp)"
response_ipv6="$(/usr/bin/mktemp)"
headers_ipv4="$(/usr/bin/mktemp)"
headers_ipv6="$(/usr/bin/mktemp)"
nginx_dump="$(/usr/bin/mktemp)"
state_record=""
mutation_started=false
finished=false
rollback_failed=false
previous_target=""
previous_kind=""
candidate=""

# shellcheck disable=SC2329 # Invoked from the EXIT trap.
cleanup() {
	if [[ -L "$next_link" ]]; then /usr/bin/unlink -- "$next_link"; fi
	if [[ -n "$candidate_temp" && -d "$candidate_temp" ]]; then
		/usr/bin/chmod -R u+rwX -- "$candidate_temp" 2>/dev/null || true
		/usr/bin/rm -rf -- "$candidate_temp"
	fi
	if [[ -n "$legacy_temp" && -d "$legacy_temp" ]]; then
		/usr/bin/chmod -R u+rwX -- "$legacy_temp" 2>/dev/null || true
		/usr/bin/rm -rf -- "$legacy_temp"
	fi
	/usr/bin/rm -f -- "$protected_archive" "$protected_bundle" \
		"$response_ipv4" "$response_ipv6" "$headers_ipv4" "$headers_ipv6" "$nginx_dump"
	if [[ -n "$protected_legacy_archive" ]]; then
		/usr/bin/rm -f -- "$protected_legacy_archive"
	fi
}

activate_target() {
	local target="$1"
	if [[ -L "$next_link" ]]; then /usr/bin/unlink -- "$next_link" || return 1; fi
	/usr/bin/ln -s -- "$target" "$next_link" || return 1
	/usr/bin/mv -Tf -- "$next_link" "$current_link"
}

verify_release_tree() {
	local target="$1" expected="$2" expected_version="${3:-}"
	local arguments=(verify "$target" --commit "$expected")
	if [[ -n "$expected_version" ]]; then
		arguments+=(--version "$expected_version")
	fi
	/usr/bin/python3 -I "$path_guard" --tree "$target" \
		&& /usr/bin/timeout --signal=KILL 30s \
			/usr/bin/python3 -I "$artifact_tool" "${arguments[@]}"
}

verify_legacy_tree() {
	local target="$1" expected="$2"
	/usr/bin/python3 -I "$path_guard" --tree "$target" \
		&& /usr/bin/timeout --signal=KILL 30s \
			/usr/bin/python3 -I "$artifact_tool" verify "$target" \
				--commit "$expected" --allow-legacy
}

install_snippet() {
	local source="$1" target="$2"
	/usr/bin/install -o root -g root -m 0644 -- "$source" "${target}.next.$$" \
		&& /usr/bin/mv -Tf -- "${target}.next.$$" "$target"
}

install_release_policies() {
	local target="$1"
	install_snippet "$target/deploy/nginx/http-maps.conf" "$maps_target" \
		&& install_snippet "$target/deploy/nginx/server-policy.conf" "$policy_target" \
		&& install_snippet "$target/deploy/nginx/classroom-usage.inc" "$usage_target"
}

verify_installed_policies() {
	local target="$1"
	/usr/bin/cmp -s "$target/deploy/nginx/http-maps.conf" "$maps_target" \
		&& /usr/bin/cmp -s "$target/deploy/nginx/server-policy.conf" "$policy_target" \
		&& /usr/bin/cmp -s "$target/deploy/nginx/classroom-usage.inc" "$usage_target" \
		&& /usr/sbin/nginx -T >"$nginx_dump" 2>&1 \
		&& "$snippet_gate" "$nginx_dump" "$maps_target" "$policy_target" "$usage_target"
}

strict_page_headers() {
	local headers="$1"
	/usr/bin/grep -Eiq "^Content-Security-Policy:.*img-src 'self' data: blob:;.*media-src 'self' blob:;.*frame-src https://scratch\.mit\.edu;.*frame-ancestors 'none'" "$headers" \
		&& /usr/bin/grep -Eiq '^Cross-Origin-Opener-Policy:[[:space:]]*same-origin' "$headers" \
		&& /usr/bin/grep -Eiq '^Cross-Origin-Resource-Policy:[[:space:]]*same-origin' "$headers" \
		&& /usr/bin/grep -Eiq '^X-Content-Type-Options:[[:space:]]*nosniff' "$headers" \
		&& /usr/bin/grep -Eiq '^X-Frame-Options:[[:space:]]*DENY' "$headers"
}

request_status() {
	local family="$1" resolve="$2" response="$3" headers="$4" url="$5"
	shift 5
	/usr/bin/curl --noproxy '*' "$family" --path-as-is --silent --show-error --max-time 5 \
		--resolve "$resolve" --header "Host: $host_header" --output "$response" \
		--dump-header "$headers" --write-out '%{http_code}' "$@" "$url"
}

denied_paths_match() {
	local family="$1" resolve="$2" response="$3" headers="$4"
	local path status
	for path in \
		/404 /404/ /404.html /404/index.html /index.html /%69ndex.html \
		/admin.html /admin/index.html /admin/index%2ehtml /admin/index%2Ehtml \
		/courses.html /courses/index.html /courses%2ehtml /courses/index%2Ehtml \
		/graph-sketcher.html /graph-sketcher/index.html /graph-sketcher%2Ehtml \
		/python-ide /python-ide/asset.js /.vite/ssr-manifest.json; do
		status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin$path")" || return 1
		[[ "$status" == 404 ]] || return 1
		/usr/bin/grep -Fq 'Page not found' "$response" || return 1
		if [[ "$path" == /admin* ]]; then
			/usr/bin/grep -Eiq '^Cache-Control:.*no-store' "$headers" || return 1
			/usr/bin/grep -Eiq '^X-Robots-Tag:.*noindex' "$headers" || return 1
		fi
	done
}

family_matches() {
	local family="$1" resolve="$2" response="$3" headers="$4" target="$5"
	local status
	/usr/bin/curl --noproxy '*' "$family" --path-as-is --fail --silent --show-error --max-time 5 \
		--resolve "$resolve" "$site_origin/release.json" --output "$response" \
		&& /usr/bin/cmp -s "$target/front-end/dist/release.json" "$response" \
		|| return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/")" || return 1
	[[ "$status" == 200 ]] && strict_page_headers "$headers" || return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/admin")" || return 1
	[[ "$status" == 302 ]] \
		&& /usr/bin/grep -Eiq '^Location:[[:space:]]*https://cs\.avasan\.org/admin' "$headers" \
		&& /usr/bin/grep -Eiq '^Cache-Control:.*no-store' "$headers" \
		&& /usr/bin/grep -Eiq '^X-Robots-Tag:.*noindex' "$headers" \
		|| return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/courses")" || return 1
	[[ "$status" == 301 ]] && /usr/bin/grep -Fiq "Location: $site_origin/courses/" "$headers" || return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/graph-sketcher")" || return 1
	[[ "$status" == 301 ]] && /usr/bin/grep -Fiq "Location: $site_origin/graph-sketcher/" "$headers" || return 1
	denied_paths_match "$family" "$resolve" "$response" "$headers" || return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/__math-artifact-probe-missing")" || return 1
	[[ "$status" == 404 ]] && /usr/bin/grep -Fq 'Page not found' "$response" || return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/" --request POST)" || return 1
	[[ "$status" == 405 ]]
}

wait_for_target() {
	local target="$1"
	for _ in {1..20}; do
		if family_matches --ipv4 "$resolve_ipv4" "$response_ipv4" "$headers_ipv4" "$target" \
			&& family_matches --ipv6 "$resolve_ipv6" "$response_ipv6" "$headers_ipv6" "$target"; then
			return 0
		fi
		/usr/bin/sleep 1
	done
	return 1
}

# shellcheck disable=SC2329 # Invoked from the EXIT trap.
rollback() {
	local failed=0
	if [[ "$previous_kind" == legacy ]]; then
		verify_legacy_tree "$previous_target" "$expected_current" >/dev/null || failed=1
	else
		verify_release_tree "$previous_target" "$expected_current" >/dev/null || failed=1
	fi
	install_release_policies "$previous_target" || failed=1
	verify_installed_policies "$previous_target" >/dev/null || failed=1
	activate_target "$previous_target" || failed=1
	/usr/sbin/nginx -t && /usr/bin/systemctl reload nginx || failed=1
	wait_for_target "$previous_target" || failed=1
	return "$failed"
}

# shellcheck disable=SC2329 # Registered as the EXIT trap.
on_exit() {
	local status=$?
	trap - EXIT
	trap '' HUP INT TERM
	if [[ "$mutation_started" == true && "$finished" != true ]]; then
		if ! rollback; then
			rollback_failed=true
			echo "CRITICAL: rollback needs operator recovery; record retained at $state_record" >&2
		else
			echo "Restored and verified the sealed previous Math release after candidate failure." >&2
		fi
		if [[ "$status" == 0 ]]; then status=1; fi
	fi
	cleanup
	if [[ "$rollback_failed" != true && -n "$state_record" ]]; then
		/usr/bin/rm -f -- "$state_record"
	fi
	exit "$status"
}
trap on_exit EXIT
trap 'exit 129' HUP
trap 'exit 130' INT
trap 'exit 143' TERM

/usr/bin/install -o root -g root -m 0400 -- "$archive" "$protected_archive"
/usr/bin/install -o root -g root -m 0400 -- "$attestation_bundle" "$protected_bundle"
if [[ "$(/usr/bin/stat -c '%s' "$protected_archive")" -gt 134217728 \
	|| "$(/usr/bin/stat -c '%s' "$protected_bundle")" -gt 8388608 ]]; then
	echo "Release artifact or attestation exceeds the reviewed size bound." >&2
	exit 1
fi

# GitHub Actions provenance is the independent source-to-artifact trust anchor.
# The candidate checkout, local refs, and candidate scripts are never trusted by root.
/usr/bin/env -u GH_TOKEN -u GITHUB_TOKEN \
	GH_CONFIG_DIR="$recovery_root/gh-config" \
	/usr/bin/gh attestation verify "$protected_archive" \
	--repo anderson-webops/math.avasan.org \
	--bundle "$protected_bundle" \
	--signer-workflow anderson-webops/math.avasan.org/.github/workflows/ci.yml \
	--source-digest "$commit" \
	--source-ref "refs/tags/v$version" \
	--deny-self-hosted-runners >/dev/null

candidate="$release_root/$commit-${archive_sha:0:16}"
if [[ -e "$candidate" || -L "$candidate" ]]; then
	verify_release_tree "$candidate" "$commit" "$version" >/dev/null
	/usr/bin/timeout --signal=KILL 30s \
		/usr/bin/python3 -I "$artifact_tool" verify "$candidate" \
			--archive "$protected_archive" --sha256 "$archive_sha" \
			--commit "$commit" --version "$version" >/dev/null
else
	candidate_temp="$(/usr/bin/mktemp -d "$release_root/.candidate-XXXXXXXX")"
	/usr/bin/timeout --signal=KILL 30s \
		/usr/bin/python3 -I "$artifact_tool" unpack "$candidate_temp" \
			--archive "$protected_archive" --sha256 "$archive_sha" \
			--commit "$commit" --version "$version" >/dev/null
	/usr/bin/chown -R root:root -- "$candidate_temp"
	/usr/bin/chmod 0555 -- "$candidate_temp"
	/usr/bin/python3 -I "$path_guard" --tree "$candidate_temp"
	/usr/bin/mv -- "$candidate_temp" "$candidate"
	candidate_temp=""
fi

current_target="$(/usr/bin/readlink -f -- "$current_link" 2>/dev/null || true)"
if [[ -z "$current_target" ]]; then
	echo "Existing Math deployment symlink does not resolve." >&2
	exit 1
fi
case "$current_target" in
	"$release_root"/legacy-*)
		if [[ "$legacy_archive" != "-" ]]; then
			echo "Legacy rollback input is accepted only for the first artifact transition." >&2
			exit 1
		fi
		previous_target="$current_target"
		previous_kind=legacy
		verify_legacy_tree "$previous_target" "$expected_current" >/dev/null
		;;
	"$release_root"/*)
		if [[ "$legacy_archive" != "-" ]]; then
			echo "Legacy rollback input is accepted only for the first artifact transition." >&2
			exit 1
		fi
		previous_target="$current_target"
		previous_kind=release
		verify_release_tree "$previous_target" "$expected_current" >/dev/null
		;;
	"$legacy_root"/*)
		if [[ "$legacy_archive" == "-" ]]; then
			echo "The first transition requires a separately reviewed legacy rollback artifact." >&2
			exit 1
		fi
		protected_legacy_archive="$(/usr/bin/mktemp "$incoming_root/legacy-XXXXXXXX.tar.gz")"
		/usr/bin/install -o root -g root -m 0400 -- "$legacy_archive" "$protected_legacy_archive"
		if [[ "$(/usr/bin/stat -c '%s' "$protected_legacy_archive")" -gt 134217728 ]]; then
			echo "Legacy rollback archive exceeds the reviewed size bound." >&2
			exit 1
		fi
		legacy_temp="$(/usr/bin/mktemp -d "$release_root/.legacy-XXXXXXXX")"
		/usr/bin/timeout --signal=KILL 30s \
			/usr/bin/python3 -I "$artifact_tool" unpack "$legacy_temp" \
				--archive "$protected_legacy_archive" --sha256 "$legacy_sha" \
				--commit "$expected_current" --allow-legacy >/dev/null
		/usr/bin/chown -R root:root -- "$legacy_temp"
		/usr/bin/chmod 0555 -- "$legacy_temp"
		/usr/bin/python3 -I "$path_guard" --tree "$legacy_temp"
		sealed_legacy="$release_root/legacy-${expected_current:0:12}-${legacy_sha:0:16}"
		if [[ -e "$sealed_legacy" || -L "$sealed_legacy" ]]; then
			verify_legacy_tree "$sealed_legacy" "$expected_current" >/dev/null
			/usr/bin/timeout --signal=KILL 30s \
				/usr/bin/python3 -I "$artifact_tool" verify "$sealed_legacy" \
					--archive "$protected_legacy_archive" --sha256 "$legacy_sha" \
					--commit "$expected_current" --allow-legacy >/dev/null
			/usr/bin/chmod -R u+rwX -- "$legacy_temp"
			/usr/bin/rm -rf -- "$legacy_temp"
		else
			/usr/bin/mv -- "$legacy_temp" "$sealed_legacy"
		fi
		legacy_temp=""
		previous_target="$sealed_legacy"
		previous_kind=legacy
		if ! /usr/bin/cmp -s \
			"$current_target/front-end/dist/release.json" \
			"$previous_target/front-end/dist/release.json"; then
			echo "Reviewed legacy rollback identity does not match the active release." >&2
			exit 1
		fi
		;;
	*)
		echo "Existing deployment target is outside the reviewed legacy and artifact roots: $current_target" >&2
		exit 1
		;;
esac

state_record="$(/usr/bin/mktemp "$recovery_root/promotion-state-XXXXXXXX")"
/usr/bin/printf '%s\n%s\n%s\n%s\n' \
	"$previous_target" "$previous_kind" "$candidate" "$commit" > "$state_record"
/usr/bin/chmod 0600 "$state_record"

mutation_started=true
install_release_policies "$candidate"
verify_installed_policies "$candidate"
activate_target "$candidate"
if /usr/sbin/nginx -t \
	&& /usr/bin/systemctl reload nginx \
	&& wait_for_target "$candidate"; then
	finished=true
	echo "Promoted attested immutable Math artifact $commit and verified IPv4/IPv6 identity, routes, and policy."
	exit 0
fi

echo "Candidate acceptance failed; restoring the sealed previous Math release." >&2
exit 1
