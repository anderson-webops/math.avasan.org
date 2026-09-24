#!/usr/bin/env bash
set -euo pipefail

system_path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
node_bin_dir="${NODE_BIN_DIR:-/opt/node-24.18.1/bin}"
if [[ "$node_bin_dir" != /* || ! -x "$node_bin_dir/node" || ! -x "$node_bin_dir/npm" ]]; then
	echo "NODE_BIN_DIR must be an absolute directory containing executable node and npm binaries." >&2
	exit 1
fi
node_bin_dir_real="$(cd -- "$node_bin_dir" && pwd -P)"
PATH="$node_bin_dir_real:$system_path"
export PATH
export PUPPETEER_SKIP_DOWNLOAD=true
umask 077

if [[ $# -ne 2 ]]; then
	echo "Usage: prepare-static-release.sh <clean-checkout> <artifact-output-directory>" >&2
	exit 2
fi
if [[ ${EUID:-$(id -u)} -eq 0 ]]; then
	echo "Build release artifacts as an unprivileged deployment user, not root." >&2
	exit 1
fi

candidate="$(cd -- "$1" && pwd -P)"
output="$(cd -- "$2" && pwd -P)"
if [[ -L "$1" || -L "$2" || ! -f "$candidate/package-lock.json" ]]; then
	echo "Checkout and output must be real directories, and the checkout must contain the root lockfile." >&2
	exit 1
fi
if ! /usr/bin/git -C "$candidate" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
	echo "Candidate must be a complete Git checkout." >&2
	exit 1
fi
if [[ -n "$(/usr/bin/git -C "$candidate" status --porcelain --untracked-files=no)" ]]; then
	echo "Candidate tracked source must be clean before preparation." >&2
	exit 1
fi
if [[ "$(node --version)" != "v24.18.1" || "$(npm --version)" != "12.0.2" ]]; then
	echo "Preparation requires Node 24.18.1 and npm 12.0.2." >&2
	exit 1
fi

source_commit="$(/usr/bin/git -C "$candidate" rev-parse --verify 'HEAD^{commit}')"
expected_commit="${EXPECTED_SOURCE_REVISION:-}"
if [[ ! "$expected_commit" =~ ^[0-9a-f]{40}$ || "$source_commit" != "$expected_commit" ]]; then
	echo "EXPECTED_SOURCE_REVISION must name the independently expected candidate commit." >&2
	exit 1
fi
version="$(/usr/bin/python3 -I -c '
import json, pathlib, re, sys
value=json.loads(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))["version"]
if not isinstance(value, str) or not re.fullmatch(r"\d+\.\d+\.\d+", value): raise SystemExit(1)
print(value)
' "$candidate/package.json")"
"$candidate/deploy/direct/verify-release-source.sh" \
	"$candidate" "$version" "$expected_commit"

work_root="$(/usr/bin/mktemp -d "$output/.math-tracked-build-XXXXXXXX")"
source_archive="$work_root/source.tar"
build_root="$work_root/source"
cleanup() {
	if [[ -d "$work_root" ]]; then
		/usr/bin/chmod -R u+rwX -- "$work_root" 2>/dev/null || true
		/usr/bin/rm -rf -- "$work_root"
	fi
}
trap cleanup EXIT

/usr/bin/mkdir "$build_root"
/usr/bin/git -C "$candidate" archive --format=tar --output="$source_archive" "$source_commit"
/usr/bin/tar -xf "$source_archive" -C "$build_root"
if /usr/bin/find "$build_root" -type l -print -quit | /usr/bin/grep -q .; then
	echo "Tracked production source must not contain symbolic links." >&2
	exit 1
fi

for variable in ${!VITE_@} ${!MATH_@} ${!SOURCE_@}; do
	unset "$variable"
done
export SOURCE_REVISION="$source_commit"
export MATH_RELEASE_VERSION="$version"
export VITE_SITE_URL=https://math.avasan.org
export NODE_ENV=production

cd -- "$build_root"
npm ci --include=dev --include=optional --strict-allow-scripts
npm run audit
npm run audit:production
npm run audit:signatures
npm run verify:dependency-graph
npm run verify:native-lock
npm run verify:platform-install
npm run lint
npm run typecheck
npm test
npm run test:artifact
npm run build
npm run a11y
"$build_root/scripts/package-static-artifact.sh" \
	"$build_root" "$output" "$source_commit"

echo "Prepared an exact tracked-source Math artifact for $source_commit."
