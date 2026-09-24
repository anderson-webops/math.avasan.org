#!/usr/bin/env bash
set -euo pipefail
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export PATH
umask 077

if [[ $# -ne 3 ]]; then
	echo "Usage: package-static-artifact.sh <built-tracked-source> <artifact-output-directory> <source-commit>" >&2
	exit 2
fi
if [[ ${EUID:-$(id -u)} -eq 0 ]]; then
	echo "Package release artifacts as an unprivileged build identity, not root." >&2
	exit 1
fi

source_root="$(cd -- "$1" && pwd -P)"
output="$(cd -- "$2" && pwd -P)"
commit="$3"
if [[ -L "$1" || -L "$2" || ! "$commit" =~ ^[0-9a-f]{40}$ ]]; then
	echo "Source and output must be real directories and commit must be an exact lowercase digest." >&2
	exit 1
fi
for required in \
	front-end/dist/index.html \
	front-end/dist/404.html \
	front-end/dist/release.json \
	deploy/nginx/http-maps.conf \
	deploy/nginx/server-policy.conf \
	deploy/nginx/classroom-usage-disabled.inc \
	deploy/nginx/classroom-usage-enabled.inc \
	scripts/static-artifact.py; do
	if [[ ! -f "$source_root/$required" || -L "$source_root/$required" ]]; then
		echo "Built tracked source is missing a regular $required file." >&2
		exit 1
	fi
done
if /usr/bin/find "$source_root/front-end/dist" -type l -print -quit | /usr/bin/grep -q .; then
	echo "Static build output must not contain symbolic links." >&2
	exit 1
fi

version="$(/usr/bin/python3 -I -c '
import json, pathlib, re, sys
value=json.loads(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))["version"]
if not isinstance(value, str) or not re.fullmatch(r"\d+\.\d+\.\d+", value): raise SystemExit(1)
print(value)
' "$source_root/package.json")"
usage_mode="$(/usr/bin/python3 -I -c '
import json, pathlib, sys
release=json.loads(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))
if set(release) != {"classroomUsageEnabled", "revision", "version"}: raise SystemExit(1)
if release["revision"] != sys.argv[2] or release["version"] != sys.argv[3]: raise SystemExit(1)
if not isinstance(release["classroomUsageEnabled"], bool): raise SystemExit(1)
print("enabled" if release["classroomUsageEnabled"] else "disabled")
' "$source_root/front-end/dist/release.json" "$commit" "$version")"

archive="$output/math.avasan.org-v$version-${commit:0:12}-static.tar.gz"
receipt="${archive%.tar.gz}.json"
checksum="$archive.sha256"
for target in "$archive" "$receipt" "$checksum"; do
	if [[ -e "$target" || -L "$target" ]]; then
		echo "Refusing to overwrite existing release artifact: $target" >&2
		exit 1
	fi
done

stage="$(/usr/bin/mktemp -d "$output/.math-static-stage-XXXXXXXX")"
cleanup() {
	if [[ -d "$stage" ]]; then
		/bin/chmod -R u+rwX -- "$stage" 2>/dev/null || true
		/bin/rm -rf -- "$stage"
	fi
}
trap cleanup EXIT

/bin/mkdir -p "$stage/front-end" "$stage/deploy/nginx"
/bin/cp -a -- "$source_root/front-end/dist" "$stage/front-end/dist"
/bin/cp -- "$source_root/deploy/nginx/http-maps.conf" "$stage/deploy/nginx/http-maps.conf"
/bin/cp -- "$source_root/deploy/nginx/server-policy.conf" "$stage/deploy/nginx/server-policy.conf"
/bin/cp -- "$source_root/deploy/nginx/classroom-usage-${usage_mode}.inc" \
	"$stage/deploy/nginx/classroom-usage.inc"
if /usr/bin/find "$stage" -type l -print -quit | /usr/bin/grep -q .; then
	echo "Static artifact staging must not contain symbolic links." >&2
	exit 1
fi
/usr/bin/find "$stage" -type f -exec /bin/chmod 0444 {} +
pack_json="$(/usr/bin/python3 -B "$source_root/scripts/static-artifact.py" pack "$stage" \
	--archive "$archive" --commit "$commit")"
/usr/bin/printf '%s\n' "$pack_json" > "$receipt"
archive_sha="$(/usr/bin/python3 -I -c '
import hashlib, pathlib, sys
checksum=hashlib.sha256()
with pathlib.Path(sys.argv[1]).open("rb") as stream:
    for chunk in iter(lambda: stream.read(1024 * 1024), b""): checksum.update(chunk)
print(checksum.hexdigest())
' "$archive")"
/usr/bin/printf '%s  %s\n' "$archive_sha" "$(basename -- "$archive")" > "$checksum"
/bin/chmod 0444 "$archive" "$receipt" "$checksum"

echo "Prepared complete Math static artifact for $commit:"
echo "  $archive"
echo "  SHA-256 $archive_sha"
