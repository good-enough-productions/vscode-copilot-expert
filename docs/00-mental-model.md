# The Mental Model: How Everything Fits Together

> Read this first. Everything else will make more sense.

---

## The Core Idea

VS Code Copilot is not just a chatbot. It's a **customizable AI agent platform** where you define:
- **What the AI knows** (instructions, context)
- **What the AI can do** (tools, MCP servers)
- **How the AI behaves** (agents, personas)
- **What happens automatically** (hooks, lifecycle events)

Think of it like a programmable coworker.

---

## The Customization Stack (from broadest to most specific)

```
┌─────────────────────────────────────────────────────────────┐
│  ALWAYS-ON INSTRUCTIONS                                     │
│  copilot-instructions.md / AGENTS.md / CLAUDE.md           │
│  "Apply to every chat request in this workspace"           │
├─────────────────────────────────────────────────────────────┤
│  FILE-BASED INSTRUCTIONS (.instructions.md)                 │
│  "Apply only when working on TypeScript files" (applyTo)   │
├─────────────────────────────────────────────────────────────┤
│  CUSTOM AGENTS (.agent.md)                                  │
│  "When in this mode, use only these tools + these rules"   │
├─────────────────────────────────────────────────────────────┤
│  PROMPT FILES (.prompt.md)                                  │
│  "Run this specific task on demand via /slash-command"     │
├─────────────────────────────────────────────────────────────┤
│  AGENT SKILLS (SKILL.md)                                    │
│  "Portable capability with scripts + resources"            │
├─────────────────────────────────────────────────────────────┤
│  HOOKS (.github/hooks/*.json)                               │
│  "Run shell commands at lifecycle events — guaranteed"     │
├─────────────────────────────────────────────────────────────┤
│  MCP SERVERS (.vscode/mcp.json)                             │
│  "Give AI access to external tools, APIs, databases"       │
├─────────────────────────────────────────────────────────────┤
│  PLUGINS                                                    │
│  "Bundles of the above — install from marketplace"         │
└─────────────────────────────────────────────────────────────┘
```

---

## Decision Tree: Which Tool Do I Use?

```
What do you want to do?
│
├── "Set coding standards for my project"
│     → copilot-instructions.md  (always-on, whole workspace)
│     → .instructions.md files   (targeted by file type/folder)
│
├── "Run a repeatable task on demand"
│     → Prompt file (.prompt.md) if it's a simple one-step workflow
│     → Agent skill (SKILL.md) if it involves scripts/resources/portability
│
├── "Create a specialized AI role (reviewer, planner, etc.)"
│     → Custom agent (.agent.md)
│     → Add handoffs to chain agents together
│
├── "Automate something every time the AI edits a file"
│     → Hook (PostToolUse event)
│
├── "Enforce security / block dangerous commands"
│     → Hook (PreToolUse event)
│
├── "Inject context automatically at the start of sessions"
│     → Hook (SessionStart event)
│
├── "Connect AI to my database / API / external service"
│     → MCP server
│
└── "Install a community-built workflow bundle"
      → Plugin (from awesome-copilot or VS Code marketplace)
```

---

## File Locations Cheat Sheet

| Type | Workspace (shared) | User Profile (personal) |
|------|-------------------|------------------------|
| Always-on instructions | `.github/copilot-instructions.md` | n/a |
| File-based instructions | `.github/instructions/*.instructions.md` | `~/.copilot/instructions/` |
| Prompt files | `.github/prompts/*.prompt.md` | VS Code user data |
| Custom agents | `.github/agents/*.agent.md` | `~/.copilot/agents/` |
| Agent skills | `.github/skills/<name>/SKILL.md` | `~/.copilot/skills/<name>/SKILL.md` |
| Hooks | `.github/hooks/*.json` | `~/.copilot/hooks/` |
| MCP servers | `.vscode/mcp.json` | `~/.vscode/mcp.json` |

> **Claude/Anthropic format** alternatives also work: `.claude/settings.json`, `.claude/agents/`, `.claude/rules/`, etc.

---

## Priority Order (when conflicts exist)

1. **User-level instructions** (highest priority — your personal rules win)
2. **Repository instructions** (`.github/copilot-instructions.md` or `AGENTS.md`)
3. **Organization instructions** (GitHub org-level, lowest priority)

For **tools** (prompt file vs. agent vs. defaults):
1. Tools specified in the **prompt file** frontmatter
2. Tools from the **referenced custom agent**
3. **Default tools** for the selected agent

---

## How Hooks Differ from Instructions

This is the most important distinction to understand:

| Instructions | Hooks |
|-------------|-------|
| Guide AI behavior (probabilistic) | Execute shell commands (deterministic) |
| "Please follow these coding conventions" | "Run prettier — guaranteed, every time" |
| Can be overridden by a clever prompt | Cannot be bypassed by the AI |
| Live in Markdown files | Live in JSON files |
| Applied to context window | Run as OS processes |

**Use instructions** to shape how the AI thinks.  
**Use hooks** to guarantee what actually happens.

---

## The Agent Lifecycle (where hooks fire)

```
User submits prompt
        │
        ▼
[SessionStart hook] ← fires once per new session
        │
        ▼
[UserPromptSubmit hook] ← fires on every prompt
        │
        ▼
Agent processes, calls tools in a loop:
    │
    ├── [PreToolUse hook] ← before each tool call (can block/modify)
    │         │
    │   Tool executes
    │         │
    └── [PostToolUse hook] ← after each tool call (can run formatters)
        │
        ▼
Context getting long?
    [PreCompact hook] ← before context is truncated
        │
Subagent spawned?
    [SubagentStart hook]
    [SubagentStop hook]
        │
        ▼
Agent finishes
    [Stop hook] ← can force agent to continue (e.g., "run tests first")
```

---

## The Agent Types

| Agent Type | Where it runs | Best for |
|-----------|--------------|---------|
| **Local** | Your VS Code | Interactive coding work |
| **Background** | Your machine, async | Long-running tasks you don't want to babysit |
| **Cloud** | GitHub infrastructure | PRs, team collaboration |
| **Custom** | Defined by `.agent.md` | Specialized roles (planner, reviewer) |
| **Subagent** | Spawned by another agent | Delegated sub-tasks |
| **Plan** | Built-in | Breaking work into structured steps |

---

## What `/init` Does (Your First Move in Any New Project)

When you type `/init` in Copilot chat:
1. Copilot discovers existing AI convention files (`AGENTS.md`, etc.)
2. Analyzes your project structure and coding patterns
3. Generates a comprehensive `.github/copilot-instructions.md` tailored to your codebase

**Do this in every project.** It's the highest-leverage 30 seconds you'll spend.

---

## The Agent Customizations Editor (UI)

Open it with: `Ctrl+Shift+P` → **Chat: Open Customizations**  
Or: Click the gear icon in the Chat view.

This is a centralized UI for managing all customization types. Use it to:
- Browse and create agents, skills, instructions, hooks
- Toggle MCP servers on/off
- Browse and install plugins
- See diagnostics (right-click in Chat view → Diagnostics)
