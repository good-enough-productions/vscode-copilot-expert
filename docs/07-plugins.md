# Plugins

> Pre-packaged bundles of agents, skills, hooks, and MCP servers. One install = a complete workflow.

---

## What Plugins Are

A plugin is a curated bundle of customizations that can include:
- Custom agents (`.agent.md`)
- Agent skills (`SKILL.md`)
- Hooks (`hooks.json`)
- MCP servers
- Prompt files

**Install once, get a complete specialized workflow.**

---

## Install a Plugin

### From VS Code Extensions
`Ctrl+Shift+X` → browse the marketplace → look for Copilot plugin extensions

### From the Community (awesome-copilot)
The awesome-copilot marketplace is already registered in VS Code Insiders:

```bash
copilot plugin install <plugin-name>@awesome-copilot
```

Or register manually if not already there:
```bash
copilot plugin marketplace add github/awesome-copilot
copilot plugin install <plugin-name>@awesome-copilot
```

### From the Agent Customizations Editor
`Chat gear icon` → **Plugins** tab → **Browse**

---

## Notable Community Plugins (from awesome-copilot)

| Plugin | What it gives you |
|--------|-------------------|
| `dotnet-test` | .NET testing workflow with agents and skills |
| `winui` | Windows UI development with MVVM Toolkit |
| `arize` | ML observability and tracing |
| Various | Browse at [awesome-copilot.github.com](https://awesome-copilot.github.com) |

---

## Plugin Structure (if you want to build one)

```
my-plugin/
├── hooks.json              # or hooks/hooks.json
├── agents/
│   └── my-agent.agent.md
├── skills/
│   └── my-skill/
│       └── SKILL.md
└── README.md
```

When a skill is installed via a plugin, it gets a namespace prefix in slash commands:  
`/my-plugin:skill-name`

> Do NOT manually add namespace prefixes to the `name` field in SKILL.md — this causes silent failures. The plugin system adds them automatically.

---

## Why Plugins vs. Manual Setup

| | Manual setup | Plugin |
|---|---|---|
| Time | Configure each piece separately | Install once |
| Updates | Manual | Plugin author manages |
| Sharing | Copy files | `copilot plugin install` |
| Namespacing | You manage | Automatic |

---

## More Information

- [Official Plugin Docs](https://code.visualstudio.com/docs/copilot/customization/agent-plugins)
- [awesome-copilot Plugins Directory](https://github.com/github/awesome-copilot/tree/main/plugins)
