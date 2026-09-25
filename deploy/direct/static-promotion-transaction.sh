#!/usr/bin/env bash
# Sourced only by the installed root-owned promoter and the isolated recovery test.
# shellcheck disable=SC2154 # All operational values are fixed by the trusted caller.

legacy_v1_commit=cc774b9c75c425f97bb5c6768f31985ae4ad0cfc

activate_target() {
	local target="$1"
	if [[ -L "$next_link" ]]; then "$unlink_bin" -- "$next_link" || return 1; fi
	"$ln_bin" -s -- "$target" "$next_link" || return 1
	"$mv_bin" -Tf -- "$next_link" "$current_link"
}

verify_release_tree() {
	local target="$1" expected="$2" expected_version="${3:-}"
	local arguments=(verify "$target" --commit "$expected")
	if [[ -n "$expected_version" ]]; then
		arguments+=(--version "$expected_version")
	fi
	"$python_bin" -I "$path_guard" --tree "$target" \
		&& "$timeout_bin" --signal=KILL 30s \
			"$python_bin" -I "$artifact_tool" "${arguments[@]}"
}

verify_legacy_tree() {
	local target="$1" expected="$2"
	"$python_bin" -I "$path_guard" --tree "$target" \
		&& "$timeout_bin" --signal=KILL 30s \
			"$python_bin" -I "$artifact_tool" verify "$target" \
				--commit "$expected" --allow-legacy
}

legacy_recovery_profile() {
	local target="$1" expected="$2"
	[[ "$expected" == "$legacy_v1_commit" ]] || return 1
	"$python_bin" -I -c '
import json, pathlib, sys
root = pathlib.Path(sys.argv[1])
expected = sys.argv[2]
manifest = json.loads((root / "runtime-manifest.json").read_text(encoding="utf-8"))
release = json.loads((root / "front-end/dist/release.json").read_text(encoding="utf-8"))
if (
    manifest.get("purpose") != "legacy-rollback"
    or manifest.get("commit") != expected
    or set(release) != {"classroomUsageEnabled", "revision", "version"}
    or release != {
        "classroomUsageEnabled": False,
        "revision": expected,
        "version": "1.0.16",
    }
):
    raise SystemExit(1)
print("legacy-v1.0.16")
' "$target" "$expected"
}

release_recovery_profile() {
	local target="$1" expected="$2"
	"$python_bin" -I -c '
import json, pathlib, re, sys
root = pathlib.Path(sys.argv[1])
expected = sys.argv[2]
manifest = json.loads((root / "runtime-manifest.json").read_text(encoding="utf-8"))
release = json.loads((root / "front-end/dist/release.json").read_text(encoding="utf-8"))
if (
    manifest.get("purpose") != "release"
    or manifest.get("commit") != expected
    or set(release) != {"classroomUsageEnabled", "revision", "version"}
    or release.get("revision") != expected
    or not isinstance(release.get("classroomUsageEnabled"), bool)
    or not re.fullmatch(r"\d+\.\d+\.\d+", release.get("version", ""))
):
    raise SystemExit(1)
print("strict-release")
' "$target" "$expected"
}

install_snippet() {
	local source="$1" target="$2"
	"$install_bin" "${install_arguments[@]}" -- "$source" "${target}.next.$$" \
		&& "$mv_bin" -Tf -- "${target}.next.$$" "$target"
}

install_release_policies() {
	local target="$1"
	install_snippet "$target/deploy/nginx/http-maps.conf" "$maps_target" \
		&& install_snippet "$target/deploy/nginx/server-policy.conf" "$policy_target" \
		&& install_snippet "$target/deploy/nginx/classroom-usage.inc" "$usage_target"
}

verify_installed_policies() {
	local target="$1"
	"$cmp_bin" -s "$target/deploy/nginx/http-maps.conf" "$maps_target" \
		&& "$cmp_bin" -s "$target/deploy/nginx/server-policy.conf" "$policy_target" \
		&& "$cmp_bin" -s "$target/deploy/nginx/classroom-usage.inc" "$usage_target" \
		&& "$nginx_bin" -T >"$nginx_dump" 2>&1 \
		&& "$snippet_gate" "$nginx_dump" "$maps_target" "$policy_target" "$usage_target"
}

strict_page_headers() {
	local headers="$1"
	"$grep_bin" -Eiq "^Content-Security-Policy:.*img-src 'self' data: blob:;.*media-src 'self' blob:;.*frame-src https://scratch\.mit\.edu;.*frame-ancestors 'none'" "$headers" \
		&& "$grep_bin" -Eiq '^Cross-Origin-Opener-Policy:[[:space:]]*same-origin' "$headers" \
		&& "$grep_bin" -Eiq '^Cross-Origin-Resource-Policy:[[:space:]]*same-origin' "$headers" \
		&& "$grep_bin" -Eiq '^X-Content-Type-Options:[[:space:]]*nosniff' "$headers" \
		&& "$grep_bin" -Eiq '^X-Frame-Options:[[:space:]]*DENY' "$headers"
}

captured_page_headers() {
	local target="$1" headers="$2" profile="$3"
	"$python_bin" -I "$captured_header_gate" \
		"$target/deploy/nginx/server-policy.conf" "$headers" "$profile"
}

request_status() {
	local family="$1" resolve="$2" response="$3" headers="$4" url="$5"
	shift 5
	"$curl_bin" --noproxy '*' "$family" --path-as-is --silent --show-error --max-time 5 \
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
		"$grep_bin" -Fq 'Page not found' "$response" || return 1
		if [[ "$path" == /admin* ]]; then
			"$grep_bin" -Eiq '^Cache-Control:.*no-store' "$headers" || return 1
			"$grep_bin" -Eiq '^X-Robots-Tag:.*noindex' "$headers" || return 1
		fi
	done
}

legacy_v1_denied_paths_match() {
	local family="$1" resolve="$2" response="$3" headers="$4"
	local path status
	for path in \
		/404 /404/ /404.html /404/index.html /index.html \
		/admin.html /admin/index.html \
		/courses.html /courses/index.html \
		/graph-sketcher.html /graph-sketcher/index.html \
		/.vite/ssr-manifest.json; do
		status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin$path")" || return 1
		[[ "$status" == 404 ]] || return 1
		"$grep_bin" -Fq 'Page not found' "$response" || return 1
	done
}

family_matches() {
	local family="$1" resolve="$2" response="$3" headers="$4" target="$5"
	local status
	"$curl_bin" --noproxy '*' "$family" --path-as-is --fail --silent --show-error --max-time 5 \
		--resolve "$resolve" "$site_origin/release.json" --output "$response" \
		&& "$cmp_bin" -s "$target/front-end/dist/release.json" "$response" \
		|| return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/")" || return 1
	[[ "$status" == 200 ]] && strict_page_headers "$headers" || return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/admin")" || return 1
	[[ "$status" == 302 ]] \
		&& "$grep_bin" -Eiq '^Location:[[:space:]]*https://cs\.avasan\.org/admin' "$headers" \
		&& "$grep_bin" -Eiq '^Cache-Control:.*no-store' "$headers" \
		&& "$grep_bin" -Eiq '^X-Robots-Tag:.*noindex' "$headers" \
		|| return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/courses")" || return 1
	[[ "$status" == 301 ]] && "$grep_bin" -Fiq "Location: $site_origin/courses/" "$headers" || return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/graph-sketcher")" || return 1
	[[ "$status" == 301 ]] && "$grep_bin" -Fiq "Location: $site_origin/graph-sketcher/" "$headers" || return 1
	denied_paths_match "$family" "$resolve" "$response" "$headers" || return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/__math-artifact-probe-missing")" || return 1
	[[ "$status" == 404 ]] && "$grep_bin" -Fq 'Page not found' "$response" || return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/" --request POST)" || return 1
	[[ "$status" == 405 ]]
}

legacy_v1_family_matches() {
	local family="$1" resolve="$2" response="$3" headers="$4" target="$5"
	local path status
	"$curl_bin" --noproxy '*' "$family" --path-as-is --fail --silent --show-error --max-time 5 \
		--resolve "$resolve" --dump-header "$headers" "$site_origin/release.json" --output "$response" \
		&& "$cmp_bin" -s "$target/front-end/dist/release.json" "$response" \
		&& captured_page_headers "$target" "$headers" release \
		|| return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/")" || return 1
	[[ "$status" == 200 ]] && captured_page_headers "$target" "$headers" root || return 1
	for path in /admin /admin/; do
		status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin$path")" || return 1
		[[ "$status" == 302 ]] \
			&& "$grep_bin" -Eiq '^Location:[[:space:]]*https://cs\.avasan\.org/admin' "$headers" \
			&& captured_page_headers "$target" "$headers" admin \
			|| return 1
	done
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/courses")" || return 1
	[[ "$status" == 301 ]] && "$grep_bin" -Fiq "Location: $site_origin/courses/" "$headers" || return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/graph-sketcher")" || return 1
	[[ "$status" == 301 ]] && "$grep_bin" -Fiq "Location: $site_origin/graph-sketcher/" "$headers" || return 1
	legacy_v1_denied_paths_match "$family" "$resolve" "$response" "$headers" || return 1
	for path in /api /api/not-a-public-route /__math-legacy-rollback-probe-missing; do
		status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin$path")" || return 1
		[[ "$status" == 404 ]] || return 1
	done
	"$grep_bin" -Fq 'Page not found' "$response" || return 1
	status="$(request_status "$family" "$resolve" "$response" "$headers" "$site_origin/" --request POST)" || return 1
	[[ "$status" == 405 ]]
}

wait_for_target() {
	local target="$1"
	local attempt
	for ((attempt = 1; attempt <= acceptance_attempts; attempt += 1)); do
		if family_matches --ipv4 "$resolve_ipv4" "$response_ipv4" "$headers_ipv4" "$target" \
			&& family_matches --ipv6 "$resolve_ipv6" "$response_ipv6" "$headers_ipv6" "$target"; then
			return 0
		fi
		"$sleep_bin" 1
	done
	return 1
}

wait_for_previous_target() {
	local target="$1" profile="$2"
	local attempt
	case "$profile" in
		legacy-v1.0.16)
			for ((attempt = 1; attempt <= acceptance_attempts; attempt += 1)); do
				if legacy_v1_family_matches --ipv4 "$resolve_ipv4" "$response_ipv4" "$headers_ipv4" "$target" \
					&& legacy_v1_family_matches --ipv6 "$resolve_ipv6" "$response_ipv6" "$headers_ipv6" "$target"; then
					return 0
				fi
				"$sleep_bin" 1
			done
			return 1
			;;
		strict-release) wait_for_target "$target" ;;
		*) return 1 ;;
	esac
}

reload_nginx() {
	local master_pid worker_state
	"$nginx_bin" -t || return 1
	worker_state="$("$mktemp_bin" "$worker_state_root/nginx-workers-XXXXXXXX")" || return 1
	master_pid="$("$systemctl_bin" show --property=MainPID --value nginx.service)" || {
		"$rm_bin" -f -- "$worker_state"
		return 1
	}
	if [[ ! "$master_pid" =~ ^[1-9][0-9]*$ ]] \
		|| ! "$python_bin" -I "$worker_gate" capture "$master_pid" "$worker_state"; then
		"$rm_bin" -f -- "$worker_state"
		return 1
	fi
	if ! "$systemctl_bin" reload nginx.service \
		|| ! "$python_bin" -I "$worker_gate" wait "$worker_state" --timeout 30; then
		"$rm_bin" -f -- "$worker_state"
		return 1
	fi
	"$rm_bin" -f -- "$worker_state"
}

promote_candidate() {
	local target="$1"
	# Load the candidate's narrower policy before exposing candidate content.
	install_release_policies "$target" \
		&& verify_installed_policies "$target" \
		&& reload_nginx \
		&& activate_target "$target" \
		&& wait_for_target "$target"
}

# shellcheck disable=SC2329 # Invoked from the EXIT trap.
rollback() {
	if [[ "$previous_kind" == legacy ]]; then
		verify_legacy_tree "$previous_target" "$expected_current" >/dev/null || return 1
		[[ "$(legacy_recovery_profile "$previous_target" "$expected_current")" == "$previous_profile" ]] || return 1
	else
		verify_release_tree "$previous_target" "$expected_current" >/dev/null || return 1
		[[ "$(release_recovery_profile "$previous_target" "$expected_current")" == "$previous_profile" ]] || return 1
	fi
	install_release_policies "$previous_target" || return 1
	verify_installed_policies "$previous_target" >/dev/null || return 1
	activate_target "$previous_target" || return 1
	reload_nginx || return 1
	wait_for_previous_target "$previous_target" "$previous_profile"
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
		"$rm_bin" -f -- "$state_record"
	fi
	exit "$status"
}
