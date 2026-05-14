#!/usr/bin/env python3
"""
block-dangerous.py — PreToolUse hook to block dangerous terminal commands.

Place at: .github/hooks/scripts/block-dangerous.py
Reference from: .github/hooks/security.json

This hook reads tool invocation data from stdin and blocks commands
that match known destructive patterns.
"""
import json
import sys

def main():
    try:
        data = json.loads(sys.stdin.read())
    except (json.JSONDecodeError, ValueError):
        sys.exit(0)  # Can't parse input — allow and move on

    tool_name = data.get("tool_name", "")
    tool_input = data.get("tool_input", {})

    # Only care about terminal/command execution tools
    command_tools = {"runCommand", "terminal", "bash", "exec", "shell"}
    if tool_name not in command_tools:
        sys.exit(0)  # Not a command tool — allow

    command = str(tool_input.get("command", "")).lower()

    # Patterns to block — customize this list for your project
    dangerous_patterns = [
        "rm -rf",
        "rm -fr",
        "rmdir /s",
        "del /f /s",
        "format c:",
        "drop table",
        "drop database",
        "delete from",       # bare DELETE without WHERE
        "truncate table",
        "git push --force",
        "git push -f",
        "git reset --hard",
        "sudo rm",
        "> /dev/sda",
        "dd if=/dev/zero",
    ]

    for pattern in dangerous_patterns:
        if pattern in command:
            result = {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "deny",
                    "permissionDecisionReason": (
                        f"Blocked by security policy: command contains "
                        f"dangerous pattern '{pattern}'. "
                        f"If this is intentional, run it manually in the terminal."
                    )
                }
            }
            print(json.dumps(result))
            sys.exit(0)

    # Command is safe — allow it
    sys.exit(0)


if __name__ == "__main__":
    main()
