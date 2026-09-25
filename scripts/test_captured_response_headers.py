#!/usr/bin/env python3

import subprocess
from pathlib import Path
import tempfile
import unittest


ROOT = Path(__file__).resolve().parent.parent
GATE = ROOT / "deploy/direct/verify-captured-response-headers.py"
STATIC_HEADERS = {
    "Content-Security-Policy": (
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; "
        "img-src 'self' data: blob: https:; media-src 'self' blob: https:; "
        "font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; "
        "frame-src https://scratch.mit.edu; object-src 'none'; base-uri 'self'; "
        "form-action 'self'; frame-ancestors 'none'"
    ),
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": (
        'accelerometer=(), camera=(), fullscreen=(self "https://scratch.mit.edu"), '
        "geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()"
    ),
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
}


class CapturedResponseHeaderTest(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        self.policy = self.root / "server-policy.conf"
        self.headers = self.root / "headers.txt"
        self.policy.write_text(
            "\n".join(
                f'add_header {name} "{value.replace(chr(34), r"\"")}" always;'
                for name, value in STATIC_HEADERS.items()
            )
            + "\n",
            encoding="utf-8",
        )

    def tearDown(self):
        self.temporary.cleanup()

    def run_gate(self, profile="root"):
        return subprocess.run(
            [
                "python3",
                "-I",
                str(GATE),
                str(self.policy),
                str(self.headers),
                profile,
            ],
            check=False,
            capture_output=True,
            text=True,
        )

    def write_headers(self, values=None):
        selected = STATIC_HEADERS if values is None else values
        self.headers.write_text(
            "HTTP/1.1 200 OK\r\n"
            + "".join(f"{name}: {value}\r\n" for name, value in selected.items())
            + "\r\n",
            encoding="iso-8859-1",
        )

    def test_accepts_the_exact_legacy_policy(self):
        self.write_headers()
        self.assertEqual(self.run_gate().returncode, 0)

        release = dict(STATIC_HEADERS)
        release["Cache-Control"] = "no-store"
        self.write_headers(release)
        self.assertEqual(self.run_gate("release").returncode, 0)

        admin = dict(release)
        admin["X-Robots-Tag"] = "noindex, nofollow, noarchive"
        self.write_headers(admin)
        self.assertEqual(self.run_gate("admin").returncode, 0)

    def test_rejects_a_new_policy_substituted_for_the_captured_policy(self):
        values = dict(STATIC_HEADERS)
        values["Content-Security-Policy"] = values[
            "Content-Security-Policy"
        ].replace("blob: https:;", "blob:;")
        self.write_headers(values)
        result = self.run_gate()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("do not match", result.stderr)

    def test_rejects_missing_or_duplicate_security_headers(self):
        values = dict(STATIC_HEADERS)
        values.pop("X-Frame-Options")
        self.write_headers(values)
        self.assertNotEqual(self.run_gate().returncode, 0)

        self.write_headers()
        with self.headers.open("a", encoding="iso-8859-1") as stream:
            stream.write("X-Frame-Options: DENY\r\n")
        result = self.run_gate()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("duplicate response header", result.stderr)

    def test_rejects_conflicting_or_unexpected_dynamic_headers(self):
        root = dict(STATIC_HEADERS)
        root["Cache-Control"] = "public"
        self.write_headers(root)
        self.assertNotEqual(self.run_gate("root").returncode, 0)

        admin = dict(STATIC_HEADERS)
        admin["Cache-Control"] = "no-store, public"
        admin["X-Robots-Tag"] = "noindex"
        self.write_headers(admin)
        self.assertNotEqual(self.run_gate("admin").returncode, 0)


if __name__ == "__main__":
    unittest.main()
