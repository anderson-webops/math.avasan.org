#!/usr/bin/env python3
"""Match static response headers to the exact sealed Nginx policy."""

import re
import sys
from pathlib import Path


REQUIRED = {
    "content-security-policy",
    "cross-origin-opener-policy",
    "cross-origin-resource-policy",
    "strict-transport-security",
    "referrer-policy",
    "permissions-policy",
    "x-content-type-options",
    "x-frame-options",
}
DYNAMIC = {"cache-control", "x-robots-tag"}
DYNAMIC_PROFILES = {
    "root": {},
    "release": {"cache-control": "no-store"},
    "admin": {
        "cache-control": "no-store",
        "x-robots-tag": "noindex, nofollow, noarchive",
    },
}
POLICY_LINE = re.compile(
    r'^add_header ([A-Za-z0-9-]+) "((?:\\["\\]|[^"\\\r\n])*)" always;$'
)


def expected_headers(policy: Path, profile: str):
    expected = {}
    for line in policy.read_text(encoding="utf-8").splitlines():
        match = POLICY_LINE.fullmatch(line)
        if not match:
            continue
        name, encoded = match.groups()
        value = encoded.replace(r'\"', '"').replace(r"\\", "\\")
        normalized = name.lower()
        if normalized not in REQUIRED:
            continue
        if normalized in expected:
            raise ValueError(f"duplicate captured policy header: {name}")
        expected[normalized] = value
    if set(expected) != REQUIRED:
        raise ValueError("captured policy is missing required static headers")
    if profile not in DYNAMIC_PROFILES:
        raise ValueError("unknown captured response profile")
    expected.update(DYNAMIC_PROFILES[profile])
    return expected


def response_headers(headers: Path):
    actual = {}
    for line in headers.read_text(encoding="iso-8859-1").splitlines():
        if not line or line.startswith("HTTP/") or ":" not in line:
            continue
        name, value = line.split(":", 1)
        normalized = name.strip().lower()
        if normalized not in REQUIRED | DYNAMIC:
            continue
        if normalized in actual:
            raise ValueError(f"duplicate response header: {name}")
        actual[normalized] = value.strip()
    return actual


def main():
    if len(sys.argv) != 4:
        raise SystemExit(
            "Usage: verify-captured-response-headers.py <policy> <headers> <profile>"
        )
    expected = expected_headers(Path(sys.argv[1]), sys.argv[3])
    actual = response_headers(Path(sys.argv[2]))
    if actual != expected:
        raise SystemExit("response headers do not match the sealed Nginx policy")


if __name__ == "__main__":
    main()
