#!/usr/bin/env python3
"""Capture and wait for one exact Linux Nginx worker generation."""

import argparse
import json
import os
from pathlib import Path
import stat
import time


def process_identity(pid: int):
    process = Path("/proc") / str(pid)
    try:
        raw_stat = (process / "stat").read_text(encoding="ascii")
        close = raw_stat.rfind(") ")
        if close < 0:
            raise ValueError("malformed process stat")
        fields = raw_stat[close + 2 :].split()
        if len(fields) < 20:
            raise ValueError("malformed process stat")
        title = (process / "cmdline").read_bytes().replace(b"\0", b" ").strip()
        return {
            "pid": pid,
            "ppid": int(fields[1]),
            "startTime": fields[19],
            "title": title.decode("utf-8", errors="strict"),
        }
    except (FileNotFoundError, ProcessLookupError):
        return None


def protected_state_file(path: Path):
    metadata = path.lstat()
    if (
        not stat.S_ISREG(metadata.st_mode)
        or metadata.st_nlink != 1
        or metadata.st_uid != os.geteuid()
        or stat.S_IMODE(metadata.st_mode) != 0o600
    ):
        raise ValueError("worker-generation state file is not protected")


def capture(master_pid: int, output: Path):
    protected_state_file(output)
    if output.stat().st_size:
        raise ValueError("worker-generation state file must start empty")
    master = process_identity(master_pid)
    if not master or not master["title"].startswith("nginx: master process"):
        raise ValueError("systemd MainPID is not the Nginx master process")
    children_path = Path("/proc") / str(master_pid) / "task" / str(master_pid) / "children"
    children = [int(value) for value in children_path.read_text(encoding="ascii").split()]
    workers = []
    for pid in children:
        identity = process_identity(pid)
        if (
            identity
            and identity["ppid"] == master_pid
            and identity["title"].startswith("nginx: worker process")
        ):
            workers.append({"pid": pid, "startTime": identity["startTime"]})
    if not workers:
        raise ValueError("no active Nginx worker generation was found")
    state = {
        "format": 1,
        "master": {"pid": master_pid, "startTime": master["startTime"]},
        "workers": workers,
    }
    output.write_text(json.dumps(state, sort_keys=True) + "\n", encoding="utf-8")


def load_state(path: Path):
    protected_state_file(path)
    state = json.loads(path.read_text(encoding="utf-8"))
    if set(state) != {"format", "master", "workers"} or state["format"] != 1:
        raise ValueError("worker-generation state is malformed")
    if set(state["master"]) != {"pid", "startTime"}:
        raise ValueError("worker-generation master identity is malformed")
    if not isinstance(state["workers"], list) or not state["workers"]:
        raise ValueError("worker-generation state has no workers")
    for worker in state["workers"]:
        if set(worker) != {"pid", "startTime"}:
            raise ValueError("worker-generation worker identity is malformed")
    return state


def same_process(expected, identity):
    return bool(
        identity
        and identity["pid"] == expected["pid"]
        and identity["startTime"] == expected["startTime"]
    )


def wait_for_retirement(state_path: Path, timeout: float):
    state = load_state(state_path)
    deadline = time.monotonic() + timeout
    while True:
        master = process_identity(state["master"]["pid"])
        if not same_process(state["master"], master):
            raise ValueError("Nginx master identity changed during graceful reload")
        remaining = [
            worker
            for worker in state["workers"]
            if same_process(worker, process_identity(worker["pid"]))
        ]
        if not remaining:
            return
        if time.monotonic() >= deadline:
            raise TimeoutError("previous Nginx workers did not retire before activation")
        time.sleep(0.05)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)
    capture_parser = subparsers.add_parser("capture")
    capture_parser.add_argument("master_pid", type=int)
    capture_parser.add_argument("state", type=Path)
    wait_parser = subparsers.add_parser("wait")
    wait_parser.add_argument("state", type=Path)
    wait_parser.add_argument("--timeout", type=float, default=30.0)
    args = parser.parse_args()
    if args.command == "capture":
        if args.master_pid <= 1:
            raise SystemExit("invalid Nginx master PID")
        capture(args.master_pid, args.state)
    else:
        if not 0 < args.timeout <= 60:
            raise SystemExit("worker retirement timeout must be between 0 and 60 seconds")
        wait_for_retirement(args.state, args.timeout)


if __name__ == "__main__":
    main()
