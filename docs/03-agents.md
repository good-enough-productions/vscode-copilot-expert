# Custom Agents

> Persistent AI personas with their own tools, instructions, and handoff chains. Switch contexts instantly.

---

## What They Are

A custom agent is a named AI persona that:
- Has a specific **role and behavior** (e.g., "security reviewer")  
- Can only use **specified tools** (e.g., read-only tools for a planner)
- Appears in the **agent dropdown** in chat
- Can chain to other agents via **handoffs**

Think of them as named presets for the AI's "mode."

**When to use an agent:**
- You have a specialized role you switch to repeatedly (planner, reviewer, docs writer)
- You want to restrict what tools are available for safety reasons
- You want to create a guided workflow between multiple AI roles
- You need a persistent persona with specific model preferences

**Use a prompt file instead** when it's a one-off task without tool restrictions.

---

## File Format

```markdown
---
name: "Security Reviewer"
description: "Reviews code for security vulnerabilities. Use for pre-merge security audits."
tools:
  - search
  - fetch
argument-hint: '[file or PR to review]'
model: claude-sonnet-4-5
handoffs:
  - label: "Fix Issues"
    agent: implementation
    prompt: "Fix the security issues identified in the review above."
    send: false
---

You are a security expert conducting a thorough code review.

Focus exclusively on security vulnerabilities:
- OWASP Top 10
- Authentication/authorization flaws
- Injection vulnerabilities (SQL, XSS, command injection)
- Exposed secrets or credentials
- Insecure dependencies

Do NOT suggest style improvements or refactors — security only.

For each issue found, provide:
1. Severity (Critical/High/Medium/Low)
2. Vulnerability type
3. Exact location (file + line)
4. Concrete fix recommendation
```

---

## Frontmatter Fields

| Field | Description |
|-------|-------------|
| `name` | Display name in the agents dropdown |
| `description` | Shown as placeholder text in chat input |
| `tools` | List of allowed tools (restricts available tools) |
| `agents` | Subagents this agent can invoke (`*` = all) |
| `model` | Language model (string or priority list) |
| `argument-hint` | Hint text in chat input |
| `user-invocable` | `false` to hide from dropdown (subagent-only) |
| `disable-model-invocation` | `true` to prevent auto-invocation as subagent |
| `handoffs` | Transition buttons to other agents |
| `hooks` | Agent-scoped hooks (Preview, needs `chat.useCustomAgentHooks: true`) |

---

## File Locations

| Scope | Location |
|-------|----------|
| Workspace (shared) | `.github/agents/*.agent.md` |
| Workspace (Claude compat) | `.claude/agents/*.md` |
| User profile (personal) | `~/.copilot/agents/` |

Configure extra locations:
```json
"chat.agentFilesLocations": {
  ".github/agents": true,
  "team/agents": true
}
```

---

## Handoffs — Chain Agents Together

Handoffs create guided workflows between agents. After the agent responds, buttons appear that transition to the next agent.

```markdown
---
name: "Planner"
description: "Creates implementation plans"
tools:
  - search
  - fetch
  - readFiles
handoffs:
  - label: "Start Coding"
    agent: implementation
    prompt: "Implement the plan outlined above, starting with the data layer."
    send: false
    model: "GPT-5 (copilot)"
  - label: "Get Review"
    agent: reviewer
    prompt: "Review this plan for potential issues before implementation."
    send: true     # auto-submits the prompt
---
```

### Handoff Fields

| Field | Required | Description |
|-------|----------|-------------|
| `label` | Yes | Button text shown after AI response |
| `agent` | Yes | Target agent identifier |
| `prompt` | No | Pre-filled prompt sent to next agent |
| `send` | No | `true` = auto-submit (default: false) |
| `model` | No | Model to use in the next agent |

---

## Example Workflow: Plan → Implement → Review

**Planner agent** → creates a structured plan  
  ↓ [Start Implementation] button  
**Implementation agent** → writes the code  
  ↓ [Request Review] button  
**Reviewer agent** → security + quality check  
  ↓ [Fix Issues] button  
**Implementation agent** → applies fixes

This creates a guided, repeatable software development loop.

---

## Useful Agent Types to Create

### Read-Only Planner
```markdown
---
name: "planner"
description: "Analyze the codebase and create an implementation plan. Read-only — makes no changes."
tools:
  - search
  - fetch
  - readFiles
  - problems
handoffs:
  - label: "Implement This Plan"
    agent: agent
    prompt: "Execute the implementation plan created above."
    send: false
---
```

### Docs Writer
```markdown
---
name: "docs-writer"
description: "Writes and updates documentation. Focused on clarity for external readers."
tools:
  - editFiles
  - readFiles
  - search
---
```

### Database Admin
```markdown
---
name: "dba"
description: "Database schema design and query optimization specialist"
tools:
  - readFiles
  - editFiles
  - search
---
Focus only on database concerns: schema design, query performance, migrations, indexing.
Never modify application logic. Always consider transaction safety and rollback plans.
```

---

## Subagents

Agents can invoke other agents as subagents (delegate sub-tasks). Control this with the `agents` field:

```markdown
---
name: "orchestrator"
tools:
  - agent
  - search
  - editFiles
agents:
  - planner          # can invoke planner agent
  - reviewer         # can invoke reviewer agent
---
```

To allow all agents: `agents: ["*"]`  
To prevent any subagent invocation: `agents: []`

---

## Agent-Scoped Hooks (Preview)

Embed hooks directly in agent frontmatter (only run when this agent is active):

```markdown
---
name: "formatter"
hooks:
  PostToolUse:
    - type: command
      command: "npx prettier --write \"$TOOL_INPUT_FILE_PATH\""
      windows: "npx prettier --write \"%TOOL_INPUT_FILE_PATH%\""
---
```

Enable with: `"chat.useCustomAgentHooks": true`

---

## Tips

- **Principle of least privilege:** Only give agents the tools they actually need
- **Name matters:** The name becomes the ID for handoffs and subagent invocation
- **Generate with AI:** Type `/create-agent` and describe the persona — Copilot will generate the `.agent.md` file
- **Extract from conversation:** After a productive multi-turn session, ask "make a custom agent for this kind of task"
- **Share via version control:** Commit `.github/agents/` to share with your team
