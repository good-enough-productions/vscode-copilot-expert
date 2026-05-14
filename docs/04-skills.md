# Agent Skills

> Portable, self-contained capabilities. Unlike instructions, skills can bundle scripts and resources. They work across VS Code, Copilot CLI, and GitHub cloud agents.

---

## What Makes Skills Different

| | Instructions | Prompt Files | **Skills** |
|---|---|---|---|
| Auto-applied | Yes (with `applyTo`) | No | On-demand or auto-matched |
| Can include scripts | No | No | **Yes** |
| Portable (cross-tool) | No | No | **Yes** |
| Has a directory structure | No | No | **Yes** |
| Open standard | No | No | **Yes** (agentskills.io) |

**Use skills for:**
- Domain-specific workflows that include helper scripts
- Capabilities you want to reuse across multiple AI tools
- Complex procedures you want packaged and shareable
- Community-contributed expertise you want to install

---

## Skill Directory Structure

```
.github/skills/
└── webapp-testing/          ← directory name MUST match the `name` field in SKILL.md
    ├── SKILL.md             ← required — instructions + frontmatter
    ├── test-template.js     ← bundled resource (referenced from SKILL.md)
    └── examples/            ← additional context
        └── login-test.js
```

---

## SKILL.md Format

```markdown
---
name: webapp-testing              # MUST match directory name (lowercase, hyphens only)
description: >
  Run and debug web application tests. Use when asked to test a feature,
  debug a test failure, or set up new test coverage. Works with Playwright,
  Vitest, and Jest.
argument-hint: '[test file] [options]'
user-invocable: true              # appears in / slash menu (default: true)
disable-model-invocation: false   # AI can auto-load this skill (default: false)
context: inline                   # inline (default) or fork (experimental)
---

# Web Application Testing Skill

## When to use this skill
- Testing a specific page or feature
- Debugging a failing test
- Setting up test coverage for new code

## Procedure

1. Check the test runner: `npm test -- --list` to see all available tests
2. Run the failing test in isolation: `npm test -- --filter "test name"`
3. Read the error output carefully before making changes
4. Reference the [test template](./test-template.js) for new test patterns
5. Never comment out tests — fix the underlying issue

## Key Rules
- Prefer integration tests for user-visible behavior
- Unit tests for pure functions and business logic
- Never modify test assertions unless the test itself has a bug
```

---

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | **Yes** | Unique ID — only lowercase, numbers, hyphens. Max 64 chars. **Must match directory name.** |
| `description` | **Yes** | What the skill does and when to use it. Copilot uses this for auto-matching. Max 1024 chars. |
| `argument-hint` | No | Hint shown in chat input when skill is invoked |
| `user-invocable` | No | `false` = hide from `/` menu but allow AI auto-loading |
| `disable-model-invocation` | No | `true` = only manual `/skill-name` invocation, no auto-loading |
| `context` | No | `inline` (default) or `fork` (experimental — runs in isolated subagent) |

---

## How Copilot Loads Skills (3-Level System)

1. **Discovery:** Copilot reads the `name` + `description` from SKILL.md frontmatter. When your request matches, it loads the skill.
2. **Instructions:** The SKILL.md body loads into context — detailed procedures become available.
3. **Resources:** Referenced files (like `test-template.js`) load only when the instructions reference them.

This means you can have many skills installed without bloating every context window — Copilot loads only what's relevant.

---

## File Locations

| Scope | Location |
|-------|----------|
| Workspace (shared) | `.github/skills/<name>/SKILL.md` |
| Workspace (Claude compat) | `.claude/skills/<name>/SKILL.md` |
| User profile (personal) | `~/.copilot/skills/<name>/SKILL.md` |

Configure extra locations:
```json
"chat.agentSkillsLocations": {
  ".github/skills": true,
  "team/skills": true
}
```

---

## Using Skills as Slash Commands

All skills with `user-invocable: true` appear in the `/` menu:

- `/webapp-testing` — invoke the skill
- `/webapp-testing for the login page` — invoke with extra context
- `/debug-logs PR #42` — invoke with argument

---

## Forked Context (Experimental)

For large skills whose intermediate work shouldn't clutter the conversation:

```markdown
---
name: review-pr
description: Review a pull request for code quality. Use when asked to review a PR.
context: fork
---

Run in a dedicated subagent. Only the final report returns to the main conversation.
```

Best for skills that:
- Read many files or do lengthy investigation
- Produce a focused final result (summary, report, small set of edits)
- Should not influence the parent agent beyond their output

Enable with: `"github.copilot.chat.skillTool.enabled": true`

---

## Community Skills

The official community collection lives at [github/awesome-copilot](https://github.com/github/awesome-copilot).

To use a community skill:
1. Browse the `skills/` directory in the repo
2. Copy the skill directory to your `.github/skills/` folder
3. Review and customize `SKILL.md` for your needs

**Always review skills before using them** — they can execute scripts.

---

## Example Skills to Build

### `git-workflow` — Branch and commit conventions
```markdown
---
name: git-workflow
description: Follow our git workflow. Use when creating branches, commits, or PRs.
---
# Git Workflow
- Branch naming: `feat/`, `fix/`, `chore/` prefixes
- Commit messages: conventional commits format
- PR title: imperative mood, under 72 chars
```

### `api-testing` — REST API test generation
```markdown
---
name: api-testing
description: Generate API tests. Use when asked to test endpoints or add API coverage.
---
# API Testing
Reference the [test template](./api-test.http) for common patterns.
Use our custom test runner: `npm run test:api`
```

---

## Tips

- **Name is critical** — must be lowercase with hyphens only, must match directory name exactly. Invalid names silently fail to load.
- **Description drives auto-loading** — write it from the perspective of "when should this be used?" not what it does
- **Reference files explicitly** — unreferenced files in the skill directory won't be loaded
- **Generate with AI:** `/create-skill` + describe what you want
- **Extract from conversation:** "Create a skill from how we just debugged that"
