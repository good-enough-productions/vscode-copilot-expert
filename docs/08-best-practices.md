# Best Practices & Expert Workflows

> Patterns that separate casual Copilot users from power users.

---

## 1. The `/init` Ritual

**Do this in every project you work in.**

```
/init
```

Copilot analyzes your codebase and generates a `.github/copilot-instructions.md` tailored to your actual code. This single 30-second action dramatically improves output quality for the entire project.

After generating, review and refine it — the AI-generated version is a strong starting point, not a final answer.

---

## 2. Layer Your Instructions

Don't put everything in one file. Use the layered system:

```
.github/copilot-instructions.md    ← universal rules (architecture, stack, core conventions)
.github/instructions/
  typescript.instructions.md       ← TypeScript-specific (applyTo: **/*.ts)
  react.instructions.md            ← React-specific (applyTo: src/components/**)
  tests.instructions.md            ← Testing conventions (applyTo: **/*.test.*)
  api.instructions.md              ← API design (applyTo: src/api/**)
```

This keeps instructions targeted and prevents context overload.

---

## 3. Hooks Are Your Safety Net

Add these hooks immediately in any serious project:

### Auto-format everything
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

### Block destructive terminal commands
Create a `PreToolUse` hook with a script that denies `rm -rf`, `DROP TABLE`, etc.

### Inject session context
Create a `SessionStart` hook that feeds the AI your branch name, Node version, pending migrations, etc.

---

## 4. Build Specialized Agents for Your Workflow

Don't always work in "generic agent" mode. Create agents for the roles you actually play:

**Example personal agent set:**
- `planner` — read-only, for design and planning work
- `reviewer` — security + quality focused, limited editing
- `implementer` — full tools, general purpose
- `docs-writer` — focused on documentation quality

Connect them with handoffs: planner → implementer → reviewer

---

## 5. Capture Good Conversations as Reusable Assets

After a successful multi-turn session, immediately extract:
- `/create-prompt` — "turn this into a reusable prompt"
- `/create-skill` — "create a skill from how we debugged that"
- `/create-agent` — "make an agent for this kind of task"
- `/create-instruction` — "extract an instruction from this conversation"

You're building a personal library of AI expertise.

---

## 6. Use Models Strategically

Different tasks call for different models:
- **Heavy architecture/planning:** Use the most capable model (Claude Sonnet, GPT-4)
- **Bulk file editing / repetitive tasks:** Use a faster/cheaper model
- **Quick questions:** Any model is fine

Set model preferences per agent in `.agent.md`:
```markdown
---
name: "planner"
model: "claude-sonnet-4-5"
---
```

Or per prompt file:
```markdown
---
model: "gpt-4o"
---
```

---

## 7. The Right Tool for Each Use Case

| Task | Best tool |
|------|-----------|
| Set coding conventions | `copilot-instructions.md` |
| Language-specific rules | `.instructions.md` with `applyTo` |
| Scaffold a new file/component | Prompt file (`.prompt.md`) |
| Generate PR description | Prompt file |
| Complex debugging workflow | Agent skill (SKILL.md) |
| Enforce a security rule | PreToolUse hook |
| Run linter on every change | PostToolUse hook |
| Switch to "planning mode" | Custom agent with read-only tools |
| Connect to a database | MCP server |
| Install a complete workflow | Plugin |

---

## 8. Trust but Verify — Review AI Changes Before Accepting

Always review generated code before accepting it. Use the diff view.

**Don't accept and move on.** Understand what was changed and why. You're training your own judgment alongside the AI's capabilities.

---

## 9. Organize Customizations in `.github/`

Commit everything to version control:

```
.github/
  copilot-instructions.md     ← workspace-wide instructions
  instructions/               ← file-specific instructions
  prompts/                    ← slash commands
  agents/                     ← custom agent personas
  skills/                     ← reusable capabilities
  hooks/                      ← automation
```

This shares your AI workflow with your entire team automatically.

---

## 10. Troubleshoot with Diagnostics

When something isn't working:
1. **Right-click in Chat view → Diagnostics** — see all loaded customizations and errors
2. **Output panel → "GitHub Copilot Chat Hooks"** — see hook execution logs
3. **Check References** in the chat response — see which instructions were applied
4. **Command Palette → "Chat: Open Customizations"** — inspect the Agent Customizations editor

---

## 11. VS Code Insiders — Stay on the Cutting Edge

You're already using VS Code Insiders. This gives you access to features as they ship:
- Agents window (Preview)
- Agent-scoped hooks (Preview)
- Forked skills context (Experimental)
- Background agents

Watch the [VS Code Insiders Podcast](https://www.vscodepodcast.com/) and VS Code release notes to stay current.

---

## 12. Community Resources

Don't build everything from scratch:

- **[github/awesome-copilot](https://github.com/github/awesome-copilot)** — 32k+ stars, community collection of agents, skills, hooks, instructions
- **[awesome-copilot.github.com](https://awesome-copilot.github.com)** — searchable website with full-text search
- **[anthropics/skills](https://github.com/anthropics/skills)** — reference skill implementations
- **[agentskills.io](https://agentskills.io)** — the open standard spec

---

## Keyboard Shortcuts Reference

| Action | Shortcut |
|--------|----------|
| Open Chat | `Ctrl+Alt+I` |
| Inline chat in editor | `Ctrl+I` |
| Open Command Palette | `Ctrl+Shift+P` |
| Open Agent Customizations | `Ctrl+Shift+P` → "Chat: Open Customizations" |
| Open Extensions (for MCP) | `Ctrl+Shift+X` |

---

## Key Settings to Know

```json
{
  // Enable AGENTS.md support
  "chat.useAgentsMdFile": true,
  
  // Enable parent repo discovery (monorepos)
  "chat.useCustomizationsInParentRepositories": true,
  
  // Enable nested AGENTS.md files
  "chat.useNestedAgentsMdFiles": true,
  
  // Show recommended prompts when starting new chat
  "chat.promptFilesRecommendations": {
    ".github/prompts/fix-tests.prompt.md": true
  },
  
  // Enable agent-scoped hooks
  "chat.useCustomAgentHooks": true,
  
  // Auto-start MCP server on config change
  "chat.mcp.autoStart": true,
  
  // Prevent AI from editing hook scripts without approval
  "chat.tools.edits.autoApprove": false,
  
  // Enable forked skills context
  "github.copilot.chat.skillTool.enabled": true,
  
  // Enable org-level instructions
  "github.copilot.chat.organizationInstructions.enabled": true
}
```
