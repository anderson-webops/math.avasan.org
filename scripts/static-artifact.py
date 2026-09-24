#!/usr/bin/env python3
"""Pack, verify, or unpack the complete immutable Math static runtime."""

import argparse
import gzip
import hashlib
import hmac
import io
import json
from pathlib import Path, PurePosixPath
import re
import stat
import sys
import tarfile

sys.dont_write_bytecode = True

REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
CONTRACT = REPOSITORY_ROOT / "deploy/static-artifact.json"
TRUSTED_POLICY_ROOT = REPOSITORY_ROOT / "deploy/nginx"
MANIFEST = "runtime-manifest.json"
MAX_FILES = 10_000
MAX_BYTES = 128 * 1024 * 1024
MAX_COMPRESSED_BYTES = 128 * 1024 * 1024
MAX_MANIFEST_BYTES = 1024 * 1024
MAX_ARCHIVE_EXPANDED_BYTES = MAX_BYTES + MAX_MANIFEST_BYTES + (MAX_FILES + 1) * 2048
CHUNK = 1024 * 1024
POLICY_FILES = {
    "deploy/nginx/http-maps.conf": "http-maps.conf",
    "deploy/nginx/server-policy.conf": "server-policy.conf",
}
EXACT_STATIC_FILES = {
    "404.html",
    "admin/index.html",
    "apple-touch-icon.png",
    "courses/index.html",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "favicon.svg",
    "graph-sketcher/index.html",
    "icon-192.png",
    "icon-512.png",
    "index.html",
    "og.png",
    "release.json",
    "robots.txt",
    "site.webmanifest",
    "sitemap.xml",
    "theme.js",
}
ASSET_SUFFIXES = {
    ".avif",
    ".css",
    ".gif",
    ".jpg",
    ".jpeg",
    ".js",
    ".png",
    ".svg",
    ".webp",
    ".woff2",
}


def digest(path):
    checksum = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(CHUNK), b""):
            checksum.update(chunk)
    return checksum.hexdigest()


def unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"duplicate JSON key: {key}")
        result[key] = value
    return result


def load_json_bytes(value):
    return json.loads(value, object_pairs_hook=unique_object)


def load_json(path):
    return load_json_bytes(path.read_text(encoding="utf-8"))


def permitted(name):
    parts = PurePosixPath(name).parts
    if (
        not parts
        or PurePosixPath(name).as_posix() != name
        or name.startswith("/")
        or "//" in name
    ):
        return False
    allowed = (
        name == MANIFEST
        or name in ("front-end", "front-end/dist", "deploy", "deploy/nginx")
        or name.startswith("front-end/dist/")
        or name in (*POLICY_FILES, "deploy/nginx/classroom-usage.inc")
    )
    return allowed and all(
        part not in (".", "..", ".git", ".ai-work", ".npmrc", "credentials.json")
        and not part.startswith(".env")
        and not part.endswith(
            (
                ".key",
                ".pem",
                ".p12",
                ".pfx",
                ".sqlite",
                ".sqlite3",
                ".sqlite3-shm",
                ".sqlite3-wal",
            )
        )
        for part in parts
    )


def permitted_static_file(relative):
    if relative in EXACT_STATIC_FILES:
        return True
    path = PurePosixPath(relative)
    if len(path.parts) < 2:
        return False
    if path.parts[0] == "assets":
        return path.suffix.lower() in ASSET_SUFFIXES
    if path.parts[0] == "licenses":
        return path.suffix.lower() in (".md", ".txt")
    return False


def inventory(root):
    files = {}
    total = 0
    for path in sorted(root.rglob("*")):
        name = path.relative_to(root).as_posix()
        metadata = path.lstat()
        if stat.S_ISLNK(metadata.st_mode) or not permitted(name):
            raise ValueError(f"forbidden artifact path: {name}")
        if stat.S_ISDIR(metadata.st_mode):
            continue
        if not stat.S_ISREG(metadata.st_mode) or metadata.st_nlink != 1:
            raise ValueError(f"not an independent regular file: {name}")
        if name == MANIFEST:
            continue
        mode = stat.S_IMODE(metadata.st_mode)
        if mode != 0o444:
            raise ValueError(f"artifact file mode must be 0444: {name}")
        total += metadata.st_size
        if len(files) >= MAX_FILES or total > MAX_BYTES:
            raise ValueError("artifact exceeds the bounded file or byte limit")
        files[name] = {
            "type": "file",
            "mode": "0444",
            "sha256": digest(path),
            "size": metadata.st_size,
        }
    return files


def validate_static_paths(files):
    for name in files:
        if not name.startswith("front-end/dist/"):
            continue
        relative = name.removeprefix("front-end/dist/")
        if not permitted_static_file(relative):
            raise ValueError(f"undeclared static output path: {relative}")
        if relative.startswith("python-ide/") or relative.endswith(".map"):
            raise ValueError(f"forbidden production static output: {relative}")


def validate_policies(root, release, purpose):
    if purpose == "legacy-rollback":
        return
    for artifact_name, trusted_name in POLICY_FILES.items():
        if not hmac.compare_digest(
            (root / artifact_name).read_bytes(),
            (TRUSTED_POLICY_ROOT / trusted_name).read_bytes(),
        ):
            raise ValueError(f"artifact policy differs from trusted helper: {artifact_name}")
    usage_name = (
        "classroom-usage-enabled.inc"
        if release["classroomUsageEnabled"]
        else "classroom-usage-disabled.inc"
    )
    if not hmac.compare_digest(
        (root / "deploy/nginx/classroom-usage.inc").read_bytes(),
        (TRUSTED_POLICY_ROOT / usage_name).read_bytes(),
    ):
        raise ValueError("artifact classroom usage policy does not match release identity")


def validate(root, manifest, allow_legacy=False):
    contract = load_json(CONTRACT)
    if set(manifest) != {"format", "purpose", "commit", "contract", "files"}:
        raise ValueError("artifact manifest has unsupported fields")
    if manifest.get("format") != 1 or manifest.get("contract") != contract:
        raise ValueError("artifact does not match the independently trusted static contract")
    if not re.fullmatch(r"[0-9a-f]{40}", manifest.get("commit", "")):
        raise ValueError("an exact lowercase source commit is required")
    purpose = manifest.get("purpose")
    if purpose not in ("release", "legacy-rollback"):
        raise ValueError("artifact purpose is invalid")
    if purpose == "legacy-rollback" and not allow_legacy:
        raise ValueError("legacy rollback artifacts cannot be promoted as candidates")

    actual = inventory(root)
    if actual != manifest.get("files"):
        raise ValueError("artifact paths, types, modes, hashes, or sizes do not match")
    validate_static_paths(actual)
    required = (
        contract["legacyRollback"]["required"]
        if purpose == "legacy-rollback"
        else contract["required"]
    )
    for name in required:
        if name not in actual:
            raise ValueError(f"required static path missing: {name}")

    release = load_json(root / "front-end/dist/release.json")
    if set(release) != {"classroomUsageEnabled", "revision", "version"}:
        raise ValueError("static deployment identity is malformed")
    if (
        not isinstance(release["classroomUsageEnabled"], bool)
        or release["revision"] != manifest["commit"]
        or not re.fullmatch(r"\d+\.\d+\.\d+", release.get("version", ""))
    ):
        raise ValueError("static deployment identity does not match the artifact")
    if purpose == "legacy-rollback":
        version = tuple(int(value) for value in release["version"].split("."))
        maximum = tuple(
            int(value)
            for value in contract["legacyRollback"]["maximumVersion"].split(".")
        )
        if version > maximum:
            raise ValueError("release is too new for the bounded legacy rollback contract")

    validate_policies(root, release, purpose)
    homepage = (root / "front-end/dist/index.html").read_text(encoding="utf-8")
    if purpose == "release" and "https://math.avasan.org" not in homepage:
        raise ValueError("static artifact does not preserve the canonical Math origin")
    return manifest


def write_manifest(root, commit, purpose="release", allow_legacy=False):
    manifest_path = root / MANIFEST
    if manifest_path.exists():
        manifest_path.chmod(0o644)
        manifest_path.unlink()
    manifest = {
        "format": 1,
        "purpose": purpose,
        "commit": commit,
        "contract": load_json(CONTRACT),
        "files": inventory(root),
    }
    validate(root, manifest, allow_legacy=allow_legacy)
    manifest_path.write_text(
        json.dumps(manifest, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )
    manifest_path.chmod(0o444)
    return manifest


class BoundedReader(io.RawIOBase):
    def __init__(self, source, limit):
        self.source = source
        self.limit = limit
        self.consumed = 0

    def readable(self):
        return True

    def read(self, size=-1):
        remaining = self.limit - self.consumed
        request = remaining + 1 if size < 0 or size > remaining + 1 else size
        data = self.source.read(request)
        self.consumed += len(data)
        if self.consumed > self.limit:
            raise ValueError("archive exceeds the bounded expanded-byte limit")
        return data


def archive_state():
    return {"count": 0, "fileBytes": 0, "manifestCount": 0, "names": set()}


def validate_archive_member(member, state):
    name = member.name
    if (
        name in state["names"]
        or state["count"] >= MAX_FILES + 1
        or not member.isfile()
        or not permitted(name)
        or stat.S_IMODE(member.mode) != 0o444
        or member.uid != 0
        or member.gid != 0
        or member.uname
        or member.gname
        or member.linkname
        or member.pax_headers
        or member.size < 0
    ):
        raise ValueError("unsafe archive members")
    if name == MANIFEST:
        if member.size > MAX_MANIFEST_BYTES:
            raise ValueError("unsafe archive members")
        state["manifestCount"] += 1
    else:
        state["fileBytes"] += member.size
        if state["fileBytes"] > MAX_BYTES:
            raise ValueError("unsafe archive members")
    state["names"].add(name)
    state["count"] += 1


def ensure_archive_complete(state):
    if state["manifestCount"] != 1:
        raise ValueError("unsafe archive members")


def open_archive_stream(archive_path):
    if archive_path.stat().st_size > MAX_COMPRESSED_BYTES:
        raise ValueError("archive exceeds the bounded compressed-byte limit")
    raw = archive_path.open("rb")
    compressed = gzip.GzipFile(fileobj=raw, mode="rb")
    bounded = BoundedReader(compressed, MAX_ARCHIVE_EXPANDED_BYTES)
    archive = tarfile.open(fileobj=bounded, mode="r|")
    return raw, compressed, archive


def archived_manifest(archive_path):
    state = archive_state()
    declared = None
    raw, compressed, archive = open_archive_stream(archive_path)
    try:
        for member in archive:
            validate_archive_member(member, state)
            if member.name == MANIFEST:
                stream = archive.extractfile(member)
                if stream is None:
                    raise ValueError("archive manifest is missing")
                declared = load_json_bytes(stream.read().decode("utf-8"))
        ensure_archive_complete(state)
    finally:
        archive.close()
        compressed.close()
        raw.close()
    if declared is None:
        raise ValueError("archive manifest is missing")
    return declared


def pack(root, archive_path, commit, allow_legacy=False):
    if archive_path.exists() or archive_path.is_symlink():
        raise ValueError("never overwrite an existing artifact")
    purpose = "legacy-rollback" if allow_legacy else "release"
    manifest = write_manifest(root, commit, purpose, allow_legacy)
    names = sorted([MANIFEST, *manifest["files"]])
    archive_path.parent.mkdir(parents=True, exist_ok=True)
    with archive_path.open("xb") as raw:
        with gzip.GzipFile(
            filename="", mode="wb", fileobj=raw, mtime=0, compresslevel=9
        ) as compressed:
            with tarfile.open(
                fileobj=compressed, mode="w", format=tarfile.USTAR_FORMAT
            ) as archive:
                for name in names:
                    source = root / name
                    info = tarfile.TarInfo(name)
                    info.size = source.stat().st_size
                    info.mode = 0o444
                    info.mtime = 0
                    info.uid = 0
                    info.gid = 0
                    info.uname = ""
                    info.gname = ""
                    with source.open("rb") as stream:
                        archive.addfile(info, stream)
    if archive_path.stat().st_size > MAX_COMPRESSED_BYTES:
        archive_path.unlink()
        raise ValueError("archive exceeds the bounded compressed-byte limit")
    return {
        "archive": archive_path.name,
        "sha256": digest(archive_path),
        "commit": commit,
        "files": len(manifest["files"]),
    }


def unpack(root, archive_path, expected_sha, expected_commit, allow_legacy=False):
    if not hmac.compare_digest(digest(archive_path), expected_sha) or any(root.iterdir()):
        raise ValueError("archive hash mismatch or destination not empty")
    state = archive_state()
    raw, compressed, archive = open_archive_stream(archive_path)
    try:
        for member in archive:
            validate_archive_member(member, state)
            target = root / member.name
            target.parent.mkdir(parents=True, exist_ok=True)
            stream = archive.extractfile(member)
            if stream is None:
                raise ValueError(f"archive file is unreadable: {member.name}")
            with target.open("xb") as output:
                while chunk := stream.read(CHUNK):
                    output.write(chunk)
            target.chmod(0o444)
        ensure_archive_complete(state)
    finally:
        archive.close()
        compressed.close()
        raw.close()
    for directory in sorted(
        (path for path in root.rglob("*") if path.is_dir()),
        key=lambda item: len(item.parts),
        reverse=True,
    ):
        directory.chmod(0o555)
    manifest = validate(root, load_json(root / MANIFEST), allow_legacy=allow_legacy)
    expected_purpose = "legacy-rollback" if allow_legacy else "release"
    if manifest["purpose"] != expected_purpose:
        raise ValueError(f"artifact purpose must be {expected_purpose}")
    if manifest["commit"] != expected_commit:
        raise ValueError("artifact source identity mismatch")
    return manifest


def assert_expected_version(root, expected_version):
    if expected_version is None:
        return
    release = load_json(root / "front-end/dist/release.json")
    if release.get("version") != expected_version:
        raise ValueError("artifact release version mismatch")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("operation", choices=["pack", "verify", "unpack"])
    parser.add_argument("tree", type=Path)
    parser.add_argument("--archive", type=Path)
    parser.add_argument("--commit")
    parser.add_argument("--sha256")
    parser.add_argument("--version")
    parser.add_argument("--allow-legacy", action="store_true")
    args = parser.parse_args()
    root = args.tree.resolve(strict=True)

    if args.operation == "pack":
        if not args.archive or not args.commit:
            parser.error("pack requires --archive and --commit")
        result = pack(root, args.archive, args.commit, args.allow_legacy)
    elif args.operation == "unpack":
        if not args.archive or not args.sha256 or not args.commit:
            parser.error("unpack requires --archive, --sha256 and --commit")
        manifest = unpack(
            root,
            args.archive,
            args.sha256,
            args.commit,
            args.allow_legacy,
        )
        assert_expected_version(root, args.version)
        result = {
            "unpacked": True,
            "commit": manifest["commit"],
            "files": len(manifest["files"]),
        }
    else:
        declared = load_json(root / MANIFEST)
        if args.archive or args.sha256:
            if (
                not args.archive
                or not args.sha256
                or not hmac.compare_digest(digest(args.archive), args.sha256)
            ):
                raise ValueError("trusted archive checksum mismatch")
            if declared != archived_manifest(args.archive):
                raise ValueError("staged manifest differs from trusted archive")
        manifest = validate(root, declared, allow_legacy=args.allow_legacy)
        expected_purpose = "legacy-rollback" if args.allow_legacy else "release"
        if manifest["purpose"] != expected_purpose:
            raise ValueError(f"artifact purpose must be {expected_purpose}")
        if args.commit and manifest["commit"] != args.commit:
            raise ValueError("artifact source identity mismatch")
        assert_expected_version(root, args.version)
        result = {
            "verified": True,
            "commit": manifest["commit"],
            "files": len(manifest["files"]),
        }
    print(json.dumps(result, sort_keys=True))


if __name__ == "__main__":
    main()
