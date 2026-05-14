# Copilot Instructions for this workspace

## Project
VS Code Copilot Expert — A knowledge base and example library for mastering GitHub Copilot in VS Code.

## Language & Stack
- All documentation is Markdown
- All hook scripts use Python 3 or PowerShell 5.1
- JSON for hook configurations and MCP server configs
- No build tooling required

## Conventions

### Markdown
- Use ATX-style headers (`#` not underline style)
- Code blocks must specify language (` ```json `, ` ```python `, etc.)
- Tables use standard GFM table syntax
- Links use relative paths for internal references

### When writing hook scripts
- Always include error handling
- Always check `stop_hook_active` in Stop hooks to prevent infinite loops
- Validate all input from `tool_input` before using in shell commands
- Never hardcode secrets — use environment variables or stdin

### When writing agent files
- Follow principle of least privilege for `tools` lists
- Always include a meaningful `description` — this is what the AI uses for matching
- Include concrete examples in the body, not just abstract rules

## This project's purpose
Help users understand VS Code Copilot customization through:
1. Conceptual documentation (in `docs/`)
2. Ready-to-use examples (in `examples/`)
3. Real, working code they can copy directly into their projects
