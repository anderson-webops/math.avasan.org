#!/usr/bin/env bash
set -euo pipefail
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export PATH

release_root="${RELEASE_ROOT:-/srv/math.avasan.org/releases}"

if [[ $# -ne 1 ]]; then
  echo "Usage: prepare-static-release.sh /srv/math.avasan.org/releases/<release>" >&2
  exit 2
fi
if [[ ${EUID:-$(id -u)} -eq 0 ]]; then
  echo "Prepare releases as an unprivileged deployment user, not root." >&2
  exit 1
fi

release_root_real="$(realpath -e -- "$release_root")"
candidate="$(realpath -e -- "$1")"
case "$candidate/" in
  "$release_root_real/"*) ;;
  *) echo "Candidate must resolve beneath $release_root_real: $candidate" >&2; exit 1 ;;
esac

if [[ ! -f "$candidate/package-lock.json" ]] || ! git -C "$candidate" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Candidate must be a complete Git checkout with the committed root lockfile." >&2
  exit 1
fi
if [[ -n "$(git -C "$candidate" status --porcelain)" ]]; then
  echo "Candidate checkout must be clean before preparation." >&2
  exit 1
fi
if [[ "$(node --version)" != "v24.18.1" || "$(npm --version)" != "12.0.2" ]]; then
  echo "Preparation requires Node 24.18.1 and npm 12.0.2." >&2
  exit 1
fi

export SOURCE_REVISION="$(git -C "$candidate" rev-parse HEAD)"
export MATH_RELEASE_VERSION="$(node -p "require('$candidate/package.json').version")"
"$candidate/deploy/direct/verify-release-source.sh" \
  "$candidate" "$MATH_RELEASE_VERSION"

cd -- "$candidate"
npm ci --include=optional --strict-allow-scripts
npm run verify:dependency-graph
npm run verify:native-lock
npm run audit
npm run audit:production
npm run audit:signatures
npm run lint
npm run typecheck
npm run -w front-end test:unit
npm run build

usage_mode="$(node -p "require('./front-end/src/config/classroom-usage.json').classroomUsageEnabled ? 'enabled' : 'disabled'")"
install -m 0644 "deploy/nginx/classroom-usage-${usage_mode}.inc" .math-classroom-usage.inc

node - <<'NODE'
import { readFileSync, writeFileSync } from 'node:fs'

const release = JSON.parse(readFileSync('front-end/dist/release.json', 'utf8'))
if (release.revision !== process.env.SOURCE_REVISION)
  throw new Error('Built release identity does not match the candidate commit.')
if (release.version !== process.env.MATH_RELEASE_VERSION)
  throw new Error('Built release version does not match the package version.')
writeFileSync('.math-static-release.json', `${JSON.stringify(release, null, 2)}\n`, { mode: 0o644 })
NODE

echo "Prepared native Math release $candidate at $SOURCE_REVISION."
