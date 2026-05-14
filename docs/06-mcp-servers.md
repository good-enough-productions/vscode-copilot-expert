# MCP Servers

> Connect the AI to databases, APIs, browsers, file systems, and external services via the Model Context Protocol.

---

## What MCP Does

MCP (Model Context Protocol) is an open standard for giving AI models access to external tools and data. An MCP server exposes:

- **Tools** — functions the AI can call (query a DB, search Slack, run a browser)
- **Resources** — data the AI can read (files, DB tables, API responses)
- **Prompts** — preconfigured templates from the server
- **MCP Apps** — interactive UI components rendered directly in chat

---

## Quick Start — Install a Popular MCP Server

```
Ctrl+Shift+X → search "@mcp playwright" → Install
```

Then in chat:
```
Go to code.visualstudio.com and give me a screenshot of the homepage.
```

The Playwright MCP server opens a real browser, navigates to the page, and returns a screenshot.

---

## Configure MCP Servers via mcp.json

### Workspace config (shared with team)
Create `.vscode/mcp.json`:

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@microsoft/mcp-server-playwright"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "${workspaceFolder}"]
    }
  }
}
```

### User config (personal, all workspaces)
`Command Palette` → `MCP: Open User Configuration`

---

## MCP Server Types

| Type | How it connects | Use case |
|------|----------------|---------|
| `stdio` | Local process via stdin/stdout | Most local tools |
| `http` | Remote HTTP server | Cloud APIs, GitHub Copilot MCP |
| `sse` | Server-Sent Events | Streaming remote servers |

---

## Useful MCP Servers

| Server | Package | What it does |
|--------|---------|-------------|
| GitHub | `https://api.githubcopilot.com/mcp` | Issues, PRs, code search |
| Playwright | `@microsoft/mcp-server-playwright` | Browser automation, screenshots |
| Filesystem | `@modelcontextprotocol/server-filesystem` | Read/write local files |
| Memory | `@modelcontextprotocol/server-memory` | Persistent key-value storage |
| Fetch | `@modelcontextprotocol/server-fetch` | HTTP requests |
| SQLite | `@modelcontextprotocol/server-sqlite` | Query local SQLite databases |

Browse more at: `Ctrl+Shift+X` → `@mcp`

---

## Tool Management

### Toggle individual tools
Click **Configure Tools** in the chat input to see all MCP server tools and toggle specific ones on/off.

### Limit tools in a custom agent
```markdown
---
name: "github-agent"
tools:
  - github/*          # all tools from the github MCP server
  - search            # built-in search
---
```

Or specific tools:
```markdown
tools:
  - github/list_issues
  - github/create_pull_request
```

---

## Security

⚠️ **MCP servers run with the same permissions as VS Code.**

Best practices:
- Only install servers from trusted sources
- Review the server package before starting it
- Use sandbox mode on macOS/Linux for untrusted servers
- Never hardcode API keys — use input variables instead

### Sandbox Mode (macOS/Linux only)
```json
{
  "servers": {
    "risky-server": {
      "command": "npx",
      "args": ["-y", "@example/server"],
      "sandboxEnabled": true,
      "sandbox": {
        "filesystem": {
          "allowWrite": ["${workspaceFolder}/output"]
        },
        "network": {
          "allowedDomains": ["api.example.com"]
        }
      }
    }
  }
}
```

### Input Variables for Secrets
```json
{
  "servers": {
    "my-api": {
      "command": "node",
      "args": ["server.js"],
      "env": {
        "API_KEY": "${input:apiKey}"
      }
    }
  }
}
```

VS Code prompts the user for `apiKey` and stores it securely.

---

## MCP Resources (Read-only Context)

Beyond tools, MCP servers can expose data as **resources** — read-only context you attach to prompts.

In chat: **Add Context → MCP Resources**  
Or: `Command Palette` → `MCP: Browse Resources`

---

## MCP Prompts (Server-defined Slash Commands)

Some MCP servers expose their own prompt templates. Use them with:
`/<server-name>.<prompt-name>`

---

## Managing Servers

| Action | How |
|--------|-----|
| Start/Stop server | Right-click server in Extensions view |
| View logs | Extensions view → MCP server → Show Output |
| Reset trust | `Command Palette` → `MCP: Reset Trust` |
| List all servers | `Command Palette` → `MCP: List Servers` |

---

## Sync Across Devices

Settings Sync can sync your MCP server configs:
1. `Command Palette` → `Settings Sync: Configure`
2. Enable **MCP Servers** in the list
