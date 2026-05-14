# Prompt Files (Slash Commands)

> Reusable task templates you invoke with `/command-name`. The fastest way to automate repetitive workflows.

---

## What They Are

Prompt files are Markdown files with a `.prompt.md` extension that become `/slash-commands` in chat. When you type `/create-component`, VS Code runs that prompt file.

Unlike instructions (always-on), you invoke prompt files **manually** when you want them.

**When to use:**
- Scaffolding new components/files/modules
- Generating PR descriptions
- Running and fixing tests
- Security reviews of selected code
- Any repeatable task you do multiple times a week

**When to use a skill instead:** When the task needs scripts, external resources, or portability across AI tools.

---

## File Format

```markdown
---
name: create-component          # becomes /create-component
description: Scaffold a new React component with tests and styles
argument-hint: '[component-name] [props?]'
agent: agent                    # ask | agent | plan | custom-agent-name
model: claude-sonnet-4-5        # optional model override
tools:                          # optional tool list
  - editFiles
  - search
---

# Create React Component

Create a new React component named `${input:componentName:ComponentName}` with:

1. TypeScript interface for props
2. Functional component with proper typing
3. CSS module file
4. Unit test file using Vitest

Follow the conventions in [React guidelines](../instructions/react.instructions.md).
```

### Frontmatter Fields

| Field | Description |
|-------|-------------|
| `name` | The `/slash-command` name (file name is used if omitted) |
| `description` | Short description shown in the UI |
| `argument-hint` | Hint text shown after `/command` in chat input |
| `agent` | Which agent to use: `ask`, `agent`, `plan`, or custom agent name |
| `model` | Language model (overrides current selection) |
| `tools` | Specific tools available for this prompt |

---

## File Locations

| Scope | Location |
|-------|----------|
| Workspace (shared with team) | `.github/prompts/*.prompt.md` |
| User profile (personal) | VS Code user data folder |

---

## Input Variables

Make prompts flexible with variables:

```markdown
# Fix Bug

Fix the bug described: ${input:bugDescription:Describe the bug here}

In file: `${input:filePath:src/}` 

${selection}   ← inserts currently selected text in editor
```

### Built-in variables:
- `${selection}` — currently selected text
- `${input:name}` — prompts user for input
- `${input:name:placeholder}` — with placeholder text

---

## Run a Prompt File

Three ways:
1. **Type** `/prompt-name` in chat
2. **Command Palette** (`Ctrl+Shift+P`) → `Chat: Run Prompt`
3. **Play button** in the editor title bar when the `.prompt.md` file is open (great for testing)

---

## Practical Examples

### `/pr-description` — Generate PR descriptions
```markdown
---
name: pr-description
description: Generate a clear pull request description based on the changes
agent: ask
---

Review the git diff and generate a pull request description with:

**Title:** One-line summary (imperative mood, under 72 chars)

**Summary:** 2-3 sentence overview of what changed and why

**Changes:**
- Bullet list of key changes

**Testing:**
- How to test this change

**Breaking Changes:**
- Any breaking changes or migration steps (or "None")
```

### `/fix-tests` — Debug failing tests
```markdown
---
name: fix-tests
description: Diagnose and fix failing tests
argument-hint: '[test file or test name]'
agent: agent
tools:
  - editFiles
  - runCommand
  - search
---

# Fix Failing Tests

1. Run the test suite and identify all failing tests
2. For each failing test:
   - Read the error message carefully
   - Trace the root cause through the code
   - Apply the minimal fix needed
   - Re-run to verify it passes
3. Do not change test expectations unless the test itself is wrong
4. Do not skip or comment out tests

Focus on: `${input:testTarget:all tests}`
```

### `/security-review` — Code security audit
```markdown
---
name: security-review
description: OWASP-based security review of selected code
agent: ask
---

Perform a security review of the following code, checking for OWASP Top 10 issues:

${selection}

Report:
1. **Critical issues** (must fix before merge)
2. **High issues** (fix soon)
3. **Medium issues** (address in next sprint)
4. **Low/informational**

For each issue: vulnerability type, line reference, recommended fix.
```

---

## Show Prompts as Recommendations

Prompts can appear as suggested actions when starting a new chat session:

```json
"chat.promptFilesRecommendations": {
  ".github/prompts/fix-tests.prompt.md": true,
  ".github/prompts/pr-description.prompt.md": true
}
```

---

## Tool Priority with Prompt Files

When both a prompt file and the current agent specify tools:
1. **Prompt file tools** win (highest priority)
2. Referenced custom agent's tools
3. Default agent tools

---

## Tips

- Reference instruction files via Markdown links instead of duplicating content
- Use the play button in the editor to test and iterate on prompts
- After a successful multi-turn chat session, ask: "turn this into a reusable prompt"
- Generate prompts with AI: `/create-prompt` + describe what you want
