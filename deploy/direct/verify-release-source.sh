#!/usr/bin/env bash
set -euo pipefail
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export PATH

if [[ $# -ne 3 ]]; then
	echo "Usage: verify-release-source.sh /path/to/checkout <package-version> <expected-commit>" >&2
	exit 2
fi

candidate="$(realpath -- "$1")"
release_version="$2"
expected_commit="$3"
if [[ ! "$release_version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ \
	|| ! "$expected_commit" =~ ^[0-9a-f]{40}$ ]]; then
	echo "Release version or independently expected commit is invalid." >&2
	exit 1
fi

source_revision="$(git -C "$candidate" rev-parse --verify 'HEAD^{commit}')"
if [[ "$source_revision" != "$expected_commit" ]]; then
	echo "Candidate HEAD does not match the independently expected commit." >&2
	exit 1
fi
origin_url="$(git -C "$candidate" remote get-url origin 2>/dev/null || true)"
if [[ ! "$origin_url" =~ ^(git@github\.com:|ssh://git@github\.com/|https://github\.com/)anderson-webops/math\.avasan\.org(\.git)?$ ]]; then
	echo "Candidate origin is not anderson-webops/math.avasan.org: ${origin_url:-missing}" >&2
	exit 1
fi

origin_main="$(git -C "$candidate" rev-parse --verify 'refs/remotes/origin/main^{commit}' 2>/dev/null || true)"
if [[ "$source_revision" != "$origin_main" ]]; then
	echo "Candidate HEAD is not the exact fetched origin/main revision." >&2
	exit 1
fi

release_tag="v${release_version}"
tag_type="$(git -C "$candidate" cat-file -t "refs/tags/$release_tag" 2>/dev/null || true)"
if [[ "$tag_type" != "tag" ]]; then
	echo "Release tag $release_tag must exist as an annotated tag." >&2
	exit 1
fi
tag_revision="$(git -C "$candidate" rev-parse --verify "refs/tags/$release_tag^{commit}")"
if [[ "$tag_revision" != "$expected_commit" ]]; then
	echo "Annotated release tag $release_tag does not resolve to the independently expected commit." >&2
	exit 1
fi

echo "Verified annotated $release_tag at exact origin/main and expected revision $expected_commit."
