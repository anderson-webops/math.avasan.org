#!/usr/bin/env python3
"""Require a bounded main-context Nginx worker shutdown policy."""

import re
import sys


MAX_CONFIG_BYTES = 16 * 1024 * 1024
CONFIG_MARKER = re.compile(r"^# configuration file [^\n]+:$")
DIRECTIVE = re.compile(r"^\s*worker_shutdown_timeout\b")
BOUNDED_DIRECTIVE = re.compile(
    r"^\s*worker_shutdown_timeout\s+([1-9]|1[0-5])s;\s*(?:#.*)?$"
)


def advance_context(line: str, depth: int, quote: str | None, escaped: bool):
    for character in line:
        if escaped:
            escaped = False
        elif character == "\\" and quote:
            escaped = True
        elif character == quote:
            quote = None
        elif character in ("'", '"') and not quote:
            quote = character
        elif character == "#" and not quote:
            break
        elif not quote and character == "{":
            depth += 1
        elif not quote and character == "}":
            depth -= 1
    return depth, quote, escaped


def validate(config: str) -> None:
    lines = config.splitlines()
    markers = [index for index, line in enumerate(lines) if CONFIG_MARKER.fullmatch(line)]
    if not markers:
        raise ValueError("missing Nginx main configuration")

    end = markers[1] if len(markers) > 1 else len(lines)
    main_lines = lines[markers[0] + 1 : end]
    depth = 0
    quote = None
    escaped = False
    matches = []
    for line in main_lines:
        if DIRECTIVE.match(line):
            matches.append(
                quote is None and depth == 0 and bool(BOUNDED_DIRECTIVE.fullmatch(line))
            )
        depth, quote, escaped = advance_context(line, depth, quote, escaped)
        if depth < 0:
            raise ValueError("invalid Nginx main configuration")

    if matches != [True] or quote is not None or depth != 0:
        raise ValueError("Nginx main worker drain is missing, ambiguous, or exceeds 15 seconds")


def main() -> None:
    if sys.argv[1:] == ["--help"]:
        print("Validate nginx -T output for one main-context worker_shutdown_timeout of 1-15s.")
        return
    if sys.argv[1:]:
        raise SystemExit("Unexpected arguments")
    raw = sys.stdin.buffer.read(MAX_CONFIG_BYTES + 1)
    if len(raw) > MAX_CONFIG_BYTES:
        raise SystemExit("Nginx configuration exceeds the preflight size limit")
    try:
        validate(raw.decode("utf-8"))
    except (UnicodeDecodeError, ValueError) as error:
        raise SystemExit(str(error)) from None


if __name__ == "__main__":
    main()
