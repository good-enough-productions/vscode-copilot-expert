# Custom Instructions

> Always-on rules that shape every chat request. Set these up first in every project.

---

## The Three Kinds

### 1. `copilot-instructions.md` — The Foundation
**Location:** `.github/copilot-instructions.md`

Automatically applies to **every chat request** in the workspace. This is your primary tool for encoding project-wide conventions.

Use it for:
- Technology stack and preferred libraries
- Coding style and naming conventions
- Architecture patterns to follow or avoid
- Security requirements and error handling
- Documentation standards

**How to create:** Type `/init` in chat to have AI generate this from your codebase, or create it manually.

### 2. `.instructions.md` Files — Targeted Rules
**Location:** `.github/instructions/*.instructions.md`

Applied conditionally based on file patterns or task context. Use for language/framework-specific rules.

```markdown
---
name: 'TypeScript Standards'
description: 'Conventions for TypeScript files'
applyTo: '**/*.ts,**/*.tsx'
---

- Use strict TypeScript. No `any` types.
- Use `interface` for object shapes, `type` for unions/intersections.
- All async functions must handle errors with try/catch.
```

### 3. `AGENTS.md` — Multi-Agent Compatible
**Location:** `AGENTS.md` at workspace root (or subfolders)

Like `copilot-instructions.md` but recognized by multiple AI tools (Claude, etc.). Good for monorepos with subfolder-level instructions (enable `chat.useNestedAgentsMdFiles`).

---

## Instruction File Format

```markdown
---
name: 'Display Name'              # shown in UI
description: 'Short description'  # shown on hover
applyTo: '**/*.py'                 # glob pattern (omit = not auto-applied)
---

# Your instructions here in Markdown

- Rule 1
- Rule 2
```

**Key `applyTo` patterns:**
- `**/*.ts` — all TypeScript files
- `**/tests/**` — all test files
- `src/api/**` — just the API folder
- `**` — all files (always-on)

---

## Instruction Priority (high to low)

1. **Personal instructions** (user-level `~/.copilot/instructions/`)
2. **Repository instructions** (`.github/copilot-instructions.md` or `AGENTS.md`)
3. **Organization instructions** (GitHub org-level)

When multiple instruction files match, VS Code combines them all.

---

## Instruction File Locations

| Scope | Location |
|-------|----------|
| Workspace (always-on) | `.github/copilot-instructions.md` |
| Workspace (targeted) | `.github/instructions/*.instructions.md` |
| Workspace (Claude compat) | `.claude/rules/*.md` |
| User profile (personal) | `~/.copilot/instructions/` |
| User profile (Claude compat) | `~/.claude/rules/` |

Configure extra locations:
```json
"chat.instructionsFilesLocations": {
  ".github/instructions": true,
  "team/ai-rules": true
}
```

---

## How to Organize Instructions (Multi-File Strategy)

```
.github/instructions/
  frontend/
    react.instructions.md       ← applyTo: "src/components/**"
    accessibility.instructions.md ← applyTo: "**/*.tsx"
  backend/
    api-design.instructions.md  ← applyTo: "src/api/**"
    database.instructions.md    ← applyTo: "src/db/**"
  testing/
    unit-tests.instructions.md  ← applyTo: "**/tests/**"
    e2e.instructions.md         ← applyTo: "**/e2e/**"
```

---

## Tips for Writing Effective Instructions

1. **Explain the WHY** — AI makes better edge-case decisions when it knows the reason:
   - ❌ `"Use date-fns instead of moment.js"`
   - ✅ `"Use date-fns instead of moment.js because moment.js is deprecated and significantly increases bundle size"`

2. **Show concrete examples**, not abstract rules:
   - ❌ `"Handle errors appropriately"`
   - ✅ `"Always use try/catch in async functions and log errors with the logger utility: logger.error(err, { context })`

3. **Skip what linters already enforce** — Focus on decisions and architecture, not syntax

4. **Keep each file focused** — one topic per file, not one giant file

5. **Use `applyTo` for precision** — Broad rules in `copilot-instructions.md`, narrow rules in targeted `.instructions.md` files

---

## Sharing Instructions Across Teams

- **In-repo:** commit `.github/copilot-instructions.md` + `.github/instructions/` to version control
- **Org-level:** Admins can define org-wide instructions in GitHub settings (enable with `github.copilot.chat.organizationInstructions.enabled: true`)
- **Settings Sync:** User instruction files sync across devices via VS Code Settings Sync

---

## Troubleshooting

**Instructions not being applied?**
1. Check the file is in the correct location
2. Verify `applyTo` glob pattern matches the file you're editing
3. Check `chat.includeApplyingInstructions` is enabled
4. Right-click Chat view → **Diagnostics** to see loaded instructions
5. Open the Agent Customizations editor (gear icon in Chat) → Instructions tab

**Verify which instructions were used:**  
Check the **References** section in the chat response.
