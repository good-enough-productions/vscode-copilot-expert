# Hooks — Deep Dive

> Your #1 power tool. Hooks are deterministic automation that runs at guaranteed lifecycle points — unlike instructions, the AI cannot ignore them.

---

## Why Hooks Change Everything

Instructions tell the AI *how to think*. Hooks tell your machine *what to do*.

```
Instructions: "Please run prettier after editing files"
              → AI might forget. AI might format incorrectly.

Hook:         "Run prettier --write after every file edit"
              → Runs. Every. Single. Time. Period.
```

Use hooks to:
- **Enforce quality** — auto-format, lint, run tests after every file change
- **Enforce security** — block `rm -rf`, `DROP TABLE`, etc. before they execute
- **Create audit trails** — log everything for compliance
- **Inject context** — feed the AI project info, env state, branch name at session start
- **Control flow** — require human approval before sensitive operations

---

## Quick Start — Your First Hook

Create `.github/hooks/format.json` in your workspace:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write \"$TOOL_INPUT_FILE_PATH\""
      }
    ]
  }
}
```

Save the file. VS Code auto-loads it. Next time the agent edits a file, Prettier runs automatically.

> Check output: **View → Output → GitHub Copilot Chat Hooks**

---

## The 8 Hook Events

| Event | When it fires | Common uses |
|-------|--------------|-------------|
| `SessionStart` | User submits the first prompt of a new session | Inject env context, log session start, validate project state |
| `UserPromptSubmit` | User submits any prompt | Audit requests, inject dynamic context |
| `PreToolUse` | Before the agent invokes any tool | **Block dangerous operations**, require approval, modify tool input |
| `PostToolUse` | After a tool completes successfully | **Run formatters/linters**, log results, trigger follow-up |
| `PreCompact` | Before conversation context is compacted | Export important context before it gets cut |
| `SubagentStart` | When a subagent is spawned | Track nested agent usage |
| `SubagentStop` | When a subagent completes | Aggregate results, cleanup |
| `Stop` | When the agent session ends | Generate reports, run final test suite, send notifications |

---

## Hook File Locations

VS Code searches these locations by default:

| Scope | Location |
|-------|----------|
| Workspace | `.github/hooks/*.json` |
| Workspace (Claude compat) | `.claude/settings.json`, `.claude/settings.local.json` |
| User (global) | `~/.copilot/hooks/` |
| Custom agent | `hooks:` field in `.agent.md` frontmatter |
| Plugin | `hooks.json` in plugin bundle |

Configure custom locations in settings:
```json
"chat.hookFilesLocations": {
  ".github/hooks": true,
  "custom/my-hooks": true,
  "~/shared-hooks/security.json": true,
  ".claude/settings.json": false  // disable Claude-format hooks
}
```

---

## Hook Configuration Format

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/validate-tool.sh",
        "timeout": 15
      }
    ],
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx eslint --fix \"$TOOL_INPUT_FILE_PATH\""
      }
    ]
  }
}
```

### All Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | string | Must be `"command"` |
| `command` | string | Cross-platform command (default) |
| `windows` | string | Windows-specific override |
| `linux` | string | Linux-specific override |
| `osx` | string | macOS-specific override |
| `cwd` | string | Working directory (relative to repo root) |
| `env` | object | Additional environment variables |
| `timeout` | number | Timeout in seconds (default: 30) |

---

## Hook Input / Output

### What every hook receives (stdin as JSON)
```json
{
  "timestamp": "2026-05-13T10:30:00.000Z",
  "cwd": "/path/to/workspace",
  "sessionId": "session-identifier",
  "hookEventName": "PostToolUse",
  "transcript_path": "/path/to/transcript.json"
}
```

### What hooks return (stdout as JSON)
```json
{
  "continue": true,
  "stopReason": "Reason if stopping the session",
  "systemMessage": "Warning shown to the user in chat"
}
```

### Exit Codes
| Code | Meaning |
|------|---------|
| `0` | Success — parse stdout as JSON |
| `2` | Blocking error — stop processing and show error to model |
| Other | Non-blocking warning — show to user, continue |

---

## PreToolUse — The Security Hook

Fires BEFORE a tool runs. You can allow, deny, or ask for confirmation.

**Input extras:**
```json
{
  "tool_name": "editFiles",
  "tool_input": { "filePath": "src/main.ts" },
  "tool_use_id": "tool-123"
}
```

**Output to control execution:**
```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Production files are read-only",
    "updatedInput": { "filePath": "src/safe-copy.ts" },
    "additionalContext": "Direct to staging environment instead"
  }
}
```

| `permissionDecision` | Effect |
|---------------------|--------|
| `"allow"` | Auto-approve (skip confirmation dialog) |
| `"deny"` | Block the tool call entirely |
| `"ask"` | Force user confirmation popup |

**Priority:** When multiple hooks run, `deny` > `ask` > `allow`.

---

## PostToolUse — The Quality Hook

Fires AFTER a tool succeeds. Most common use: formatters, linters, test runners.

**Input extras:**
```json
{
  "tool_name": "editFiles",
  "tool_input": { "filePath": "src/main.ts" },
  "tool_use_id": "tool-123",
  "tool_response": "File edited successfully"
}
```

**Output:**
```json
{
  "decision": "block",
  "reason": "Linting failed — 3 errors found",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "ESLint found: no-unused-vars on line 42"
  }
}
```

---

## SessionStart — The Context Injector

Use this to feed the agent dynamic project info at the start of every session.

**Output:**
```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Project: my-app v2.1.0 | Branch: feature/auth | Node: v20.11.0 | Pending migrations: 2"
  }
}
```

A PowerShell script that does this dynamically:

```powershell
# scripts/session-context.ps1
$branch = git branch --show-current 2>$null
$nodeVersion = node --version 2>$null
$context = "Branch: $branch | Node: $nodeVersion | Time: $(Get-Date -Format 'HH:mm')"

$output = @{
  hookSpecificOutput = @{
    hookEventName = "SessionStart"
    additionalContext = $context
  }
} | ConvertTo-Json

Write-Output $output
```

Hook config (for Windows):
```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "echo {}",
        "windows": "powershell -File scripts/session-context.ps1"
      }
    ]
  }
}
```

---

## Stop Hook — Force Agent to Finish Work First

The Stop hook fires when the agent wants to stop. Return `"block"` to force it to continue (e.g., "run tests before you're done").

```json
{
  "hookSpecificOutput": {
    "hookEventName": "Stop",
    "decision": "block",
    "reason": "You must run the test suite before finishing. Run: npm test"
  }
}
```

⚠️ **Always check `stop_hook_active`** to avoid infinite loops:

```python
#!/usr/bin/env python3
import json, sys

data = json.loads(sys.stdin.read())

# CRITICAL: prevent infinite loops
if data.get("stop_hook_active"):
    sys.exit(0)

# Check if tests passed
import subprocess
result = subprocess.run(["npm", "test", "--passWithNoTests"], capture_output=True)
if result.returncode != 0:
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "Stop",
            "decision": "block",
            "reason": f"Tests are failing. Fix them before finishing:\n{result.stdout.decode()}"
        }
    }))
else:
    sys.exit(0)
```

---

## Agent-Scoped Hooks (Preview)

Define hooks directly in a custom agent's frontmatter. They only run when that agent is active.

```markdown
---
name: "Strict Formatter"
description: "Auto-formats every file it touches"
hooks:
  PostToolUse:
    - type: command
      command: "npx prettier --write \"$TOOL_INPUT_FILE_PATH\""
      windows: "npx prettier --write \"%TOOL_INPUT_FILE_PATH%\""
---

You are a code editing agent. Files are automatically formatted after every edit.
```

Enable with setting: `"chat.useCustomAgentHooks": true`

---

## Environment Variables in Hooks

Available in hook commands via `$VARIABLE_NAME` (or `%VARIABLE_NAME%` on Windows):

| Variable | Description |
|----------|-------------|
| `$TOOL_INPUT_FILE_PATH` | Path of the file being edited (PostToolUse) |
| `$TOOL_NAME` | Name of the tool being invoked |
| `$SESSION_ID` | Current session identifier |
| `$HOOK_EVENT_NAME` | The event name (e.g., "PostToolUse") |

---

## Practical Hook Patterns

### 1. Auto-format on save (most common)
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write \"$TOOL_INPUT_FILE_PATH\" 2>/dev/null || true",
        "windows": "npx prettier --write \"%TOOL_INPUT_FILE_PATH%\" 2>NUL"
      }
    ]
  }
}
```

### 2. Block dangerous terminal commands
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "python3 scripts/block-dangerous.py",
        "windows": "python scripts\\block-dangerous.py"
      }
    ]
  }
}
```

Where `block-dangerous.py`:
```python
#!/usr/bin/env python3
import json, sys

data = json.loads(sys.stdin.read())
tool_name = data.get("tool_name", "")
tool_input = data.get("tool_input", {})

# Block dangerous patterns
dangerous_patterns = ["rm -rf", "DROP TABLE", "DELETE FROM", "format c:", "del /f /s"]
command = str(tool_input.get("command", "")).lower()

for pattern in dangerous_patterns:
    if pattern.lower() in command:
        print(json.dumps({
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "deny",
                "permissionDecisionReason": f"Blocked by security policy: '{pattern}' pattern detected"
            }
        }))
        sys.exit(0)

sys.exit(0)  # Allow all other commands
```

### 3. Audit log — log every tool call
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "python3 scripts/audit-log.py",
        "windows": "python scripts\\audit-log.py"
      }
    ]
  }
}
```

Where `audit-log.py`:
```python
#!/usr/bin/env python3
import json, sys
from datetime import datetime
from pathlib import Path

data = json.loads(sys.stdin.read())

log_entry = {
    "timestamp": datetime.utcnow().isoformat(),
    "session_id": data.get("sessionId"),
    "tool": data.get("tool_name"),
    "input": data.get("tool_input"),
}

log_path = Path(".copilot-audit.jsonl")
with log_path.open("a") as f:
    f.write(json.dumps(log_entry) + "\n")

sys.exit(0)
```

### 4. Require approval for production file edits
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "python3 scripts/protect-prod.py",
        "windows": "python scripts\\protect-prod.py"
      }
    ]
  }
}
```

Where `protect-prod.py`:
```python
#!/usr/bin/env python3
import json, sys

data = json.loads(sys.stdin.read())
tool_input = data.get("tool_input", {})
file_path = str(tool_input.get("filePath", ""))

protected_paths = ["prod/", "production/", "deploy/", ".env.production"]

if any(p in file_path for p in protected_paths):
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "ask",
            "permissionDecisionReason": f"Production file: {file_path} — requires manual approval"
        }
    }))
else:
    sys.exit(0)  # auto-allow
```

---

## Troubleshooting Hooks

1. **View loaded hooks:** Output panel → "GitHub Copilot Chat Hooks"
2. **Check which hooks are loaded:** Chat debug logs → search "Load Hooks"
3. **Right-click in Chat view → Diagnostics** to see all loaded customizations

### Common Issues

| Problem | Fix |
|---------|-----|
| Hook not running | Verify `.github/hooks/` path + `.json` extension + `"type": "command"` |
| Permission denied | `chmod +x script.sh` on Unix |
| Timeout | Increase `timeout` value (default: 30s) |
| JSON parse error | Validate stdout is valid JSON (use `jq` or a JSON library) |
| Hook runs on Windows but not WSL | Use `windows:` and `linux:` OS-specific commands |

---

## Security Checklist for Hooks

- [ ] Never hardcode API keys — use environment variables
- [ ] Validate and sanitize all input from `tool_input` before using in shell commands
- [ ] Review all shared hook scripts before enabling in your workspace
- [ ] Use `chat.tools.edits.autoApprove` to prevent AI from modifying hook scripts
- [ ] Apply principle of least privilege — hooks should only access what they need
- [ ] Check `stop_hook_active` in Stop hooks to prevent infinite loops

---

## Claude Code Compatibility

VS Code reads Claude Code hook configs from `.claude/settings.json` by default.

Key differences when adapting Claude hooks for VS Code:
- **Tool input properties**: Claude uses `snake_case` (`tool_input.file_path`), VS Code uses `camelCase` (`tool_input.filePath`)
- **Tool names**: Claude uses `Write`/`Edit`, VS Code uses `create_file`/`replace_string_in_file`
- **Matchers**: Claude `"matcher"` syntax is parsed but **ignored** in VS Code (hooks run on all invocations)
