#!/usr/bin/env bash
# Run only from the installed root-owned helper during the first artifact transition.
set -euo pipefail
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export PATH
unset NODE_OPTIONS NODE_PATH PYTHONHOME PYTHONPATH
umask 077

if [[ $# -ne 2 ]]; then
	echo "Usage: prepare-legacy-rollback.sh <expected-current-commit> <output-directory>" >&2
	exit 2
fi
if [[ ${EUID:-$(id -u)} -ne 0 ]]; then
	echo "Prepare the one-time protected rollback artifact as root." >&2
	exit 1
fi

commit="$1"
output="$(cd -- "$2" && pwd -P)"
if [[ ! "$commit" =~ ^[0-9a-f]{40}$ || -L "$2" ]]; then
	echo "Expected current commit must be exact and output must be a real directory." >&2
	exit 1
fi
if [[ "$commit" != cc774b9c75c425f97bb5c6768f31985ae4ad0cfc ]]; then
	echo "Legacy capture is bounded to the reviewed v1.0.16 release." >&2
	exit 1
fi

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
helper_root="$(cd -- "$script_dir/../.." && pwd -P)"
artifact_tool="$helper_root/scripts/static-artifact.py"
path_guard="$script_dir/trusted-paths.py"
base=/srv/math.avasan.org
legacy_root="$base/releases"
current_link="$base/current"
snippet_root=/etc/nginx/snippets

/usr/bin/python3 -I "$path_guard" --tree "$helper_root"
/usr/bin/python3 -I "$path_guard" /usr/bin/timeout "$output" "$base/.deployment-recovery"
if [[ "$output" != "$base/.deployment-recovery" ]]; then
	echo "Legacy rollback output must remain in the protected Math recovery directory." >&2
	exit 1
fi
if [[ ! -L "$current_link" ]]; then
	echo "The current Math deployment must be a symlink before legacy capture." >&2
	exit 1
fi
current_target="$(/usr/bin/readlink -f -- "$current_link")"
case "$current_target/" in
	"$legacy_root/"*) ;;
	*) echo "Legacy capture is allowed only from the existing release root." >&2; exit 1 ;;
esac
for required in front-end/dist/index.html front-end/dist/404.html front-end/dist/release.json; do
	if [[ ! -f "$current_target/$required" || -L "$current_target/$required" ]]; then
		echo "Current legacy release is missing $required." >&2
		exit 1
	fi
done
/usr/bin/python3 -I -c '
import json, pathlib, sys
release=json.loads(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))
expected={"classroomUsageEnabled": False, "revision": sys.argv[2], "version": "1.0.16"}
if release != expected: raise SystemExit("active release is not the reviewed v1.0.16 identity")
' "$current_target/front-end/dist/release.json" "$commit"
for snippet in \
	math.avasan.org-http-maps.conf \
	math.avasan.org-server-policy.conf \
	math.avasan.org-classroom-usage.inc; do
	if [[ ! -f "$snippet_root/$snippet" || -L "$snippet_root/$snippet" ]]; then
		echo "Installed legacy policy is missing $snippet." >&2
		exit 1
	fi
done

stage="$(/usr/bin/mktemp -d "$base/.deployment-recovery/legacy-stage-XXXXXXXX")"
cleanup() {
	if [[ -d "$stage" ]]; then
		/usr/bin/chmod -R u+rwX -- "$stage" 2>/dev/null || true
		/usr/bin/rm -rf -- "$stage"
	fi
}
trap cleanup EXIT

/usr/bin/mkdir -p "$stage/front-end" "$stage/deploy/nginx"
/bin/cp -a -- "$current_target/front-end/dist" "$stage/front-end/dist"
/bin/cp -- "$snippet_root/math.avasan.org-http-maps.conf" "$stage/deploy/nginx/http-maps.conf"
/bin/cp -- "$snippet_root/math.avasan.org-server-policy.conf" "$stage/deploy/nginx/server-policy.conf"
/bin/cp -- "$snippet_root/math.avasan.org-classroom-usage.inc" "$stage/deploy/nginx/classroom-usage.inc"
if /usr/bin/find "$stage" -type l -print -quit | /usr/bin/grep -q .; then
	echo "Legacy rollback capture must not contain symbolic links." >&2
	exit 1
fi
/usr/bin/find "$stage" -type f -exec /usr/bin/chmod 0444 {} +
archive="$output/math.avasan.org-legacy-${commit:0:12}.tar.gz"
if [[ -e "$archive" || -L "$archive" ]]; then
	echo "Refusing to overwrite legacy rollback artifact: $archive" >&2
	exit 1
fi
/usr/bin/timeout --signal=KILL 30s \
	/usr/bin/python3 -I "$artifact_tool" pack "$stage" \
		--archive "$archive" --commit "$commit" --allow-legacy
sha="$(/usr/bin/python3 -I -c '
import hashlib, pathlib, sys
value=hashlib.sha256(pathlib.Path(sys.argv[1]).read_bytes()).hexdigest()
print(value)
' "$archive")"
/usr/bin/chmod 0400 "$archive"
echo "Prepared one-time protected legacy rollback artifact: $archive"
echo "SHA-256 $sha"
