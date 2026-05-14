# VS Code Copilot Expert

A comprehensive knowledge base for mastering GitHub Copilot in VS Code — built from official Microsoft docs, community patterns, and real working examples.

> **Last updated:** May 2026 | VS Code Insiders + GitHub Copilot

---

## 🗺️ Map of the Project

```
VS Code Copilot expert/
├── README.md                    ← You are here
├── docs/
│   ├── 00-mental-model.md       ← The big picture — how everything connects
│   ├── 01-instructions.md       ← Custom instructions (copilot-instructions.md, AGENTS.md, .instructions.md)
│   ├── 02-prompt-files.md       ← Prompt files / slash commands (.prompt.md)
│   ├── 03-agents.md             ← Custom agents (.agent.md)
│   ├── 04-skills.md             ← Agent skills (SKILL.md)
│   ├── 05-hooks.md              ← Hooks ★ (your priority — deepest coverage)
│   ├── 06-mcp-servers.md        ← MCP servers (mcp.json)
│   ├── 07-plugins.md            ← Agent plugins
│   └── 08-best-practices.md     ← Patterns, tips, and expert workflows
└── examples/
    ├── .github/
    │   ├── copilot-instructions.md        ← Always-on workspace instructions
    │   ├── hooks/
    │   │   ├── format.json                ← Auto-format after file edits
    │   │   ├── security.json              ← Block dangerous terminal commands
    │   │   ├── audit.json                 ← Log all tool usage
    │   │   └── context-injector.json      ← Inject project context at session start
    │   ├── agents/
    │   │   ├── planner.agent.md           ← Read-only planning agent
    │   │   ├── reviewer.agent.md          ← Security-focused code reviewer
    │   │   └── docs-writer.agent.md       ← Documentation specialist
    │   ├── prompts/
    │   │   ├── create-component.prompt.md ← Scaffold a UI component
    │   │   ├── pr-description.prompt.md   ← Generate PR descriptions
    │   │   └── fix-tests.prompt.md        ← Debug failing tests
    │   ├── instructions/
    │   │   ├── typescript.instructions.md ← TypeScript-specific rules
    │   │   ├── testing.instructions.md    ← Testing conventions
    │   │   └── api-design.instructions.md ← API design standards
    │   └── skills/
    │       └── debug-logs/
    │           └── SKILL.md               ← Skill for diagnosing log errors
    └── .vscode/
        └── mcp.json                       ← Example MCP server config
```

---

## 🚀 Quick Start — Go from Zero to Expert

### Step 1 — Understand the system (15 min)
Read [docs/00-mental-model.md](docs/00-mental-model.md). It explains what every piece is, how they interact, and when to use each one.

### Step 2 — Set up your workspace (10 min)
1. Copy `examples/.github/copilot-instructions.md` to your project and customize it
2. Run `/init` in Copilot chat to have AI generate workspace-specific instructions

### Step 3 — Add your first hook (10 min)
Read [docs/05-hooks.md](docs/05-hooks.md) then copy `examples/.github/hooks/format.json` to your project's `.github/hooks/` folder.

### Step 4 — Build custom agents (20 min)
Read [docs/03-agents.md](docs/03-agents.md) and create role-specific agents for your workflow (planner, reviewer, etc.)

### Step 5 — Create reusable prompts & skills (20 min)
Read [docs/02-prompt-files.md](docs/02-prompt-files.md) and [docs/04-skills.md](docs/04-skills.md) to automate repetitive tasks.

---

## 🧠 AI Slash Commands — Generate Any Customization

Type these directly in Copilot chat:

| Command | What it does |
|---------|-------------|
| `/init` | Analyze your workspace → generate `copilot-instructions.md` |
| `/create-instruction` | Generate a targeted `.instructions.md` file |
| `/create-prompt` | Generate a `.prompt.md` slash command |
| `/create-agent` | Generate a `.agent.md` custom agent |
| `/create-skill` | Generate a `SKILL.md` agent skill |
| `/create-hook` | Generate a hook configuration |
| `/instructions` | Open the Configure Instructions menu |
| `/prompts` | Open the Configure Prompt Files menu |
| `/agents` | Open the Configure Custom Agents menu |
| `/skills` | Open the Configure Skills menu |
| `/hooks` | Open the Configure Hooks menu |

---

## 📖 Key Resources

- [Official VS Code Copilot Docs](https://code.visualstudio.com/docs/copilot/overview)
- [Agent Customizations Overview](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [Awesome Copilot (community repo)](https://github.com/github/awesome-copilot)
- [Agent Skills Standard](https://agentskills.io/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
