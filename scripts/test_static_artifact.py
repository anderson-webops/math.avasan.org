#!/usr/bin/env python3

import gzip
import hashlib
import importlib.util
import io
import json
import os
from pathlib import Path
import tarfile
import tempfile
import unittest

spec = importlib.util.spec_from_file_location(
    "static_artifact",
    Path(__file__).with_name("static-artifact.py"),
)
artifact = importlib.util.module_from_spec(spec)
spec.loader.exec_module(artifact)

COMMIT = "a" * 40


class StaticArtifactTest(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)

    def tearDown(self):
        for path in sorted(self.root.rglob("*"), reverse=True):
            try:
                path.chmod(0o755 if path.is_dir() else 0o644)
            except FileNotFoundError:
                pass
        self.temporary.cleanup()

    def fixture(self, name, version="1.0.17", usage=False):
        root = self.root / name
        output = root / "front-end/dist"
        policies = root / "deploy/nginx"
        output.mkdir(parents=True)
        policies.mkdir(parents=True)
        metadata = {
            "classroomUsageEnabled": usage,
            "revision": COMMIT,
            "version": version,
        }
        files = {
            "index.html": '<!doctype html><link rel="canonical" href="https://math.avasan.org/">',
            "404.html": "Page not found",
            "admin/index.html": "Admin handoff",
            "courses/index.html": "Courses",
            "graph-sketcher/index.html": "Graph Sketcher",
            "release.json": json.dumps(metadata),
            "robots.txt": "User-agent: *\nAllow: /\n",
            "site.webmanifest": "{}",
            "sitemap.xml": "<urlset></urlset>",
            "theme.js": "document.documentElement.dataset.theme='light'",
            "assets/app.js": "console.log('fixture')",
            "assets/app.css": "body{}",
        }
        for relative, content in files.items():
            target = output / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(content, encoding="utf-8")
            target.chmod(0o444)
        for target_name, source_name in artifact.POLICY_FILES.items():
            target = root / target_name
            target.write_bytes((artifact.TRUSTED_POLICY_ROOT / source_name).read_bytes())
            target.chmod(0o444)
        usage_name = (
            "classroom-usage-enabled.inc"
            if usage
            else "classroom-usage-disabled.inc"
        )
        usage_target = policies / "classroom-usage.inc"
        usage_target.write_bytes((artifact.TRUSTED_POLICY_ROOT / usage_name).read_bytes())
        usage_target.chmod(0o444)
        return root

    def test_pack_is_reproducible_and_unpacked_tree_is_exact(self):
        first = self.fixture("first")
        second = self.fixture("second")
        first_archive = self.root / "first.tar.gz"
        second_archive = self.root / "second.tar.gz"
        first_result = artifact.pack(first, first_archive, COMMIT)
        second_result = artifact.pack(second, second_archive, COMMIT)
        self.assertEqual(first_result["sha256"], second_result["sha256"])

        unpacked = self.root / "unpacked"
        unpacked.mkdir()
        artifact.unpack(unpacked, first_archive, first_result["sha256"], COMMIT)
        artifact.validate(unpacked, artifact.load_json(unpacked / artifact.MANIFEST))
        self.assertEqual(
            (unpacked / "front-end/dist/index.html").read_bytes(),
            (first / "front-end/dist/index.html").read_bytes(),
        )

    def test_trusted_archive_detects_every_post_pack_mutation(self):
        stage = self.fixture("stage")
        archive = self.root / "release.tar.gz"
        result = artifact.pack(stage, archive, COMMIT)
        target = stage / "front-end/dist/assets/app.js"
        target.chmod(0o644)
        target.write_text("changed", encoding="utf-8")
        target.chmod(0o444)
        with self.assertRaisesRegex(ValueError, "paths, types, modes, hashes, or sizes"):
            artifact.validate(stage, artifact.load_json(stage / artifact.MANIFEST))
        self.assertEqual(artifact.digest(archive), result["sha256"])

    def test_unpack_rejects_traversal_and_duplicate_members(self):
        for name, members in (
            ("traversal", [("../escape", b"escape")]),
            ("duplicate", [(artifact.MANIFEST, b"{}"), (artifact.MANIFEST, b"{}")]),
        ):
            archive_path = self.root / f"{name}.tar.gz"
            with archive_path.open("wb") as raw:
                with gzip.GzipFile(filename="", mode="wb", fileobj=raw, mtime=0) as compressed:
                    with tarfile.open(fileobj=compressed, mode="w") as archive:
                        for member_name, payload in members:
                            info = tarfile.TarInfo(member_name)
                            info.size = len(payload)
                            info.mode = 0o444
                            info.uid = 0
                            info.gid = 0
                            archive.addfile(info, io.BytesIO(payload))
            destination = self.root / f"{name}-output"
            destination.mkdir()
            sha = hashlib.sha256(archive_path.read_bytes()).hexdigest()
            with self.assertRaisesRegex(ValueError, "unsafe archive members"):
                artifact.unpack(destination, archive_path, sha, COMMIT)
        self.assertFalse((self.root / "escape").exists())

    def test_stream_reader_stops_expanded_archives_at_the_byte_budget(self):
        reader = artifact.BoundedReader(io.BytesIO(b"x" * 17), 16)
        with self.assertRaisesRegex(ValueError, "expanded-byte limit"):
            reader.read()

    def test_legacy_archive_requires_explicit_bounded_mode(self):
        fixture = self.fixture("legacy", version="1.0.16")
        archive = self.root / "legacy.tar.gz"
        result = artifact.pack(fixture, archive, COMMIT, allow_legacy=True)
        rejected = self.root / "legacy-rejected"
        rejected.mkdir()
        with self.assertRaisesRegex(ValueError, "legacy rollback artifacts"):
            artifact.unpack(rejected, archive, result["sha256"], COMMIT)

        accepted = self.root / "legacy-accepted"
        accepted.mkdir()
        manifest = artifact.unpack(
            accepted,
            archive,
            result["sha256"],
            COMMIT,
            allow_legacy=True,
        )
        self.assertEqual(manifest["purpose"], "legacy-rollback")

    def test_rejects_links_and_undeclared_static_output(self):
        symlink_fixture = self.fixture("symlink")
        (symlink_fixture / "front-end/dist/assets/linked.js").symlink_to("app.js")
        with self.assertRaisesRegex(ValueError, "forbidden artifact path"):
            artifact.pack(symlink_fixture, self.root / "symlink.tar.gz", COMMIT)

        hardlink_fixture = self.fixture("hardlink")
        os.link(
            hardlink_fixture / "front-end/dist/assets/app.js",
            hardlink_fixture / "front-end/dist/assets/alias.js",
        )
        (hardlink_fixture / "front-end/dist/assets/alias.js").chmod(0o444)
        with self.assertRaisesRegex(ValueError, "independent regular file"):
            artifact.pack(hardlink_fixture, self.root / "hardlink.tar.gz", COMMIT)

        undeclared_fixture = self.fixture("undeclared")
        undeclared = undeclared_fixture / "front-end/dist/python-ide/assets/run.js"
        undeclared.parent.mkdir(parents=True)
        undeclared.write_text("alert(1)", encoding="utf-8")
        undeclared.chmod(0o444)
        with self.assertRaisesRegex(ValueError, "undeclared static output"):
            artifact.pack(undeclared_fixture, self.root / "undeclared.tar.gz", COMMIT)

    def test_release_policy_must_match_installed_trusted_policy(self):
        fixture = self.fixture("policy")
        policy = fixture / "deploy/nginx/server-policy.conf"
        policy.chmod(0o644)
        policy.write_text("return 200;\n", encoding="utf-8")
        policy.chmod(0o444)
        with self.assertRaisesRegex(ValueError, "differs from trusted helper"):
            artifact.pack(fixture, self.root / "policy.tar.gz", COMMIT)

    def test_usage_policy_must_match_release_identity(self):
        fixture = self.fixture("usage", usage=False)
        usage = fixture / "deploy/nginx/classroom-usage.inc"
        usage.chmod(0o644)
        usage.write_bytes(
            (artifact.TRUSTED_POLICY_ROOT / "classroom-usage-enabled.inc").read_bytes()
        )
        usage.chmod(0o444)
        with self.assertRaisesRegex(ValueError, "usage policy does not match"):
            artifact.pack(fixture, self.root / "usage.tar.gz", COMMIT)

    def test_expected_release_version_is_independent_of_the_archive_name(self):
        fixture = self.fixture("version", version="1.0.17")
        artifact.assert_expected_version(fixture, "1.0.17")
        with self.assertRaisesRegex(ValueError, "release version mismatch"):
            artifact.assert_expected_version(fixture, "1.0.18")


if __name__ == "__main__":
    unittest.main()
