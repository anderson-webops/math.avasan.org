"""Bounded host worker-drain contract fixtures."""

import re
import subprocess
import sys
import unittest
from pathlib import Path


GATE = Path(__file__).resolve().parents[1] / "deploy/direct/verify-nginx-worker-drain.py"
PROMOTER = Path(__file__).resolve().parents[1] / "deploy/direct/promote-static-release.sh"


def main_config(line: str) -> str:
    return (
        "# configuration file /etc/nginx/nginx.conf:\n"
        "worker_processes 1;\n"
        f"{line}\n"
        "events { worker_connections 64; }\n"
        "http { include /etc/nginx/conf.d/*.conf; }\n"
        "# configuration file /etc/nginx/conf.d/math.conf:\n"
        "server { listen 127.0.0.1:8080; }\n"
    )


class WorkerDrainPolicyTests(unittest.TestCase):
    def check_dump(self, config: str, accepted: bool) -> None:
        result = subprocess.run(
            [sys.executable, "-I", str(GATE)],
            input=config,
            text=True,
            capture_output=True,
            timeout=3,
            check=False,
        )
        self.assertEqual(result.returncode == 0, accepted, result.stderr)
        self.assertNotIn("/etc/nginx/conf.d/math.conf", result.stderr)

    def test_accepts_bounded_main_policy(self):
        for seconds in (1, 10, 15, 30):
            with self.subTest(seconds=seconds):
                self.check_dump(main_config(f"worker_shutdown_timeout {seconds}s;"), True)

    def test_rejects_unbounded_or_ambiguous_policy(self):
        for line in (
            "", "# worker_shutdown_timeout 10s;", "worker_shutdown_timeout 0s;",
            "worker_shutdown_timeout 31s;", "worker_shutdown_timeout 1m;",
            "worker_shutdown_timeout 15000ms;",
            "worker_shutdown_timeout 10s;\nworker_shutdown_timeout 10s;",
            "http {\nworker_shutdown_timeout 10s;\n}",
            'env "held\nworker_shutdown_timeout 10s;\nvalue";',
        ):
            with self.subTest(line=line):
                self.check_dump(main_config(line), False)

    def test_rejects_policy_only_in_included_config(self):
        self.check_dump(main_config("") + "worker_shutdown_timeout 10s;\n", False)

    def test_promoter_retirement_wait_exceeds_host_shutdown_bound(self):
        promoter = PROMOTER.read_text(encoding="utf-8")
        match = re.search(r"^readonly worker_retirement_timeout=(\d+)$", promoter, re.MULTILINE)
        self.assertIsNotNone(match)
        self.assertEqual(int(match.group(1)), 45)


if __name__ == "__main__":
    unittest.main()
