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
captured_header_gate="$script_dir/verify-captured-response-headers.py"
worker_gate="$script_dir/nginx-worker-generation.py"
transaction_library="$script_dir/static-promotion-transaction.sh"
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
previous_profile=""
candidate=""

readonly python_bin=/usr/bin/python3
readonly timeout_bin=/usr/bin/timeout
readonly install_bin=/usr/bin/install
readonly mv_bin=/usr/bin/mv
readonly ln_bin=/usr/bin/ln
readonly unlink_bin=/usr/bin/unlink
readonly cmp_bin=/usr/bin/cmp
readonly grep_bin=/usr/bin/grep
readonly curl_bin=/usr/bin/curl
readonly sleep_bin=/usr/bin/sleep
readonly nginx_bin=/usr/sbin/nginx
readonly systemctl_bin=/usr/bin/systemctl
readonly rm_bin=/usr/bin/rm
readonly mktemp_bin=/usr/bin/mktemp
readonly -a install_arguments=(-o root -g root -m 0644)
readonly acceptance_attempts=20
readonly worker_state_root="$recovery_root"

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

# shellcheck source=deploy/direct/static-promotion-transaction.sh
. "$transaction_library"
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
		previous_profile="$(legacy_recovery_profile "$previous_target" "$expected_current")"
		;;
	"$release_root"/*)
		if [[ "$legacy_archive" != "-" ]]; then
			echo "Legacy rollback input is accepted only for the first artifact transition." >&2
			exit 1
		fi
		previous_target="$current_target"
		previous_kind=release
		verify_release_tree "$previous_target" "$expected_current" >/dev/null
		previous_profile="$(release_recovery_profile "$previous_target" "$expected_current")"
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
		previous_profile="$(legacy_recovery_profile "$previous_target" "$expected_current")"
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
if promote_candidate "$candidate"; then
	finished=true
	echo "Promoted attested immutable Math artifact $commit and verified IPv4/IPv6 identity, routes, and policy."
	exit 0
fi

echo "Candidate acceptance failed; restoring the sealed previous Math release." >&2
exit 1
