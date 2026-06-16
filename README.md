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


## Recommended Enhancements (from Scraped Articles)

The following opportunities were identified during a review of scraped technical articles:

- **[China is winning the open source AI race — but a U]()** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, GitHub Copilot, Docker, React, Next.js, Python, TypeScript, JavaScript, Wasm
  - *Action:* Review article for best practices on this project.
- **[Explore]()** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, Local AI & Self-Hosting, Vibe Coding, n8n, React, TypeScript, JavaScript
  - *Action:* Review article for best practices on this project.
- **[Untitled]()** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Web Scraping & ETL, Vibe Coding, LangChain, FastAPI, Streamlit, Python
  - *Action:* Review article for best practices on this project.
- **[Anatomy of the .claude- Folder - by Avi Chawla]()** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, Vibe Coding, Claude Code, React, TypeScript, JavaScript
  - *Action:* Review article for best practices on this project.
- **[How Middleware Lets You Customize Your Agent Harne]()** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, LangChain
  - *Action:* Review article for best practices on this project.
- **[Replit taps RevenueCat to help vibe-coders make mo]()** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Home Automation, Web Scraping & ETL, Vibe Coding, Ollama, Claude Code, Docker, React, Python, TypeScript, JavaScript, Wasm
  - *Action:* Review article for best practices on this project.
- **[Subagents in Gemini CLI Enable Task Delegation and]()** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, Vibe Coding, Claude Code, Docker, JavaScript
  - *Action:* Review article for best practices on this project.
- **[5 Useful Python Scripts for Time Series Analysis -]()** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Web Scraping & ETL, Vibe Coding, Claude Code, Python
  - *Action:* Review article for best practices on this project.
- **[Give Your AI Unlimited Updated Context - Towards D]()** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Vibe Coding, n8n
  - *Action:* Review article for best practices on this project.
- **[Stop Wasting Tokens- A Smarter Alternative to JSON]()** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code, FastAPI, Python
  - *Action:* Review article for best practices on this project.
- **[OpenAI Codex arrives in the browser with new Chrom]()** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Home Automation, Vibe Coding, Claude Code, Docker, React, Python, TypeScript, JavaScript, Wasm
  - *Action:* Review article for best practices on this project.
- **[Meet Turbovec- A Rust Vector Index with Python Bin]()** (Relevance: High)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, LangGraph, LangChain, Python, NetworkX
  - *Action:* Review article for best practices on this project.
- **[Untitled (1)]()** (Relevance: Medium)
  - *Concepts/Tools:* Vibe Coding
  - *Action:* Review article for best practices on this project.
- **[How to Build Knowledge Graph Generation Pipelines ]()** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Web Scraping & ETL, Vibe Coding, Playwright, Ollama, LangGraph, LangChain, GitHub Copilot, LiteLLM, Modal, Python, TypeScript, JavaScript, NetworkX, Langfuse
  - *Action:* Review article for best practices on this project.
- **[Meet OmniVoice Studio- A Local, Open-Source Altern]()** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Web Scraping & ETL, Vibe Coding, Playwright, LangGraph, LangChain, Claude Code, Docker, Modal, Vercel, FastAPI, Streamlit, React, Next.js, Python, TypeScript, JavaScript, Langfuse
  - *Action:* Review article for best practices on this project.
- **[Introducing Microsoft Scout- Your always-on person]()** (Relevance: Medium)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, Vibe Coding, GitHub Copilot
  - *Action:* Review article for best practices on this project.
- **[7 Real World AI Projects to Build in 2026 (with Gu]()** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, n8n, Gemma 4, Claude Code, NotebookLM, Python
  - *Action:* Review article for best practices on this project.
- **[Meet GitAgent: The Docker for AI Agents that is Finally Solving the Fragmentation between LangChain, AutoGen, and Claude Code - MarkTechPost](https://share.google/NBe4ZgKEsidmtvpLX)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Web Scraping & ETL, Vibe Coding, LangGraph, LangChain, Claude Code, Docker, Modal, Vercel, Streamlit, React, Next.js, Python, TypeScript, JavaScript
  - *Action:* Review article for best practices on this project.
- **[Inside Netflix’s Graph Abstraction: Handling 650TB of Graph Data in Milliseconds Globally - InfoQ](https://share.google/nmDW8jlBnCYCKxSFl)** (Relevance: Medium)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, Local AI & Self-Hosting, Vibe Coding, Gemma 4
  - *Action:* Review article for best practices on this project.
- **[How to Design a Production-Ready AI Agent That Automates Google Colab Workflows Using Colab-MCP, MCP Tools, FastMCP, and Kernel Execution - MarkTechPost](https://share.google/5NOcdcOTR62CaFnnq)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code, Python
  - *Action:* Review article for best practices on this project.
- **[I added one tool to my local LLM setup, and it finally stopped making things up](https://share.google/8vfjl5EHikH79AMv4)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), LLM Engineering, Local AI & Self-Hosting
  - *Action:* Review article for best practices on this project.
- **[Agentic Platform Engineering with GitHub Copilot | All things Azure](https://share.google/diCFBKbmdyNg8Kubu)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Vibe Coding, GitHub Copilot
  - *Action:* Review article for best practices on this project.
- **[Uber Automates Design Documentation with Agentic Systems - InfoQ](https://share.google/yEgq3tOcUIXtlaGXP)** (Relevance: Medium)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, Local AI & Self-Hosting, Vibe Coding, Gemma 4, React
  - *Action:* Review article for best practices on this project.
- **[When Infrastructure Scales But Understanding Doesn't | All things Azure](https://share.google/oXYb9pOYdPZYlkvj6)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, Vibe Coding, GitHub Copilot
  - *Action:* Review article for best practices on this project.
- **[Copilot usage metrics now identify active Copilot coding agent users - GitHub Changelog](https://share.google/eyP582QGyB99Obfp2)** (Relevance: High)
  - *Concepts/Tools:* Agentic Design Patterns, Vibe Coding, GitHub Copilot
  - *Action:* Review article for best practices on this project.
- **[How to Build a Production-Ready Claude Code Skill | Towards Data Science](https://share.google/YrNQvDjH02h4dgGMI)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Vibe Coding, LangGraph, LangChain, Claude Code, Vercel, Python, JavaScript
  - *Action:* Review article for best practices on this project.
- **[How we build evals for Deep Agents](https://share.google/A8jUpQo9KMhfNUp3s)** (Relevance: High)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Vibe Coding, LangChain, Claude Code
  - *Action:* Review article for best practices on this project.
- **[Vercel Releases JSON-Render: A Generative UI Framework for AI-Driven Interface Composition - InfoQ](https://share.google/2E3HE9etlJnzKStqs)** (Relevance: Medium)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, Gemma 4, Vercel, React, TypeScript
  - *Action:* Review article for best practices on this project.
- **[Announcing Cline Kanban: a CLI-agnostic app for multi-agent orchestration. - Cline Blog](https://share.google/1wZKaRDjrF61rXWFP)** (Relevance: High)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[Not Just Understanding, But Evolving: The All-New Self-Evolving JiuwenClaw Makes Its Debut - MarkTechPost](https://share.google/iGyvsEAUipek7tfzE)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[How to Build Advanced Cybersecurity AI Agents with CAI Using Tools, Guardrails, Handoffs, and Multi-Agent Workflows - MarkTechPost](https://share.google/JmUXgHM5d6kZskN7c)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, Vibe Coding, Claude Code, Python
  - *Action:* Review article for best practices on this project.
- **[ProxySQL Introduces Multi-Tier Release Strategy With Stable, Innovative, and AI Tracks - InfoQ](https://share.google/sPgNHks7ob0UWLDmB)** (Relevance: Medium)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, Gemma 4
  - *Action:* Review article for best practices on this project.
- **[Build it yourself: A data pipeline that trains a real model - The New Stack](https://share.google/txEyCvLDiNAWUhwdW)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Home Automation, Web Scraping & ETL, Vibe Coding, Gemma 4, Claude Code, GitHub Copilot, Docker, React, Python, TypeScript, JavaScript, Wasm
  - *Action:* Review article for best practices on this project.
- **[Async subagents - Docs by LangChain](https://share.google/ldquxw2lni4FqAtsL)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, LangGraph, Python, TypeScript
  - *Action:* Review article for best practices on this project.
- **[Get Started with Frontier | Microsoft Frontier](https://share.google/AVAnClHp1BlXBpg7w)** (Relevance: Medium)
  - *Concepts/Tools:* Vibe Coding, Modal
  - *Action:* Review article for best practices on this project.
- **[OpenClaw vs. Hermes Agent: The race to build AI assistants that never forget - The New Stack](https://share.google/XOn4AG8Jisv2y3NRL)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Home Automation, Vibe Coding, Ollama, Gemma 4, Claude Code, GitHub Copilot, Docker, React, Python, TypeScript, JavaScript, Wasm
  - *Action:* Review article for best practices on this project.
- **[llm-wiki](https://share.google/IJyK9i6Heuuo6KDaB)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, Ollama, Claude Code, Obsidian, NotebookLM, Python
  - *Action:* Review article for best practices on this project.
- **[Meet 'AutoAgent': The Open-Source Library That Lets an AI Engineer and Optimize Its Own Agent Harness Overnight - MarkTechPost](https://share.google/6X242kRRnPy0IKsiL)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code, Docker, Python
  - *Action:* Review article for best practices on this project.
- **[Building a Real-Time Multi-Agent UI with AG-UI and Microsoft Agent Framework Workflows | Microsoft Agent Framework](https://share.google/uqj9zMIEbc62mKb1G)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, Vibe Coding, Modal, FastAPI, React, Python
  - *Action:* Review article for best practices on this project.
- **[Kaggle + Google’s Free 5-Day Gen AI Course - KDnuggets](https://share.google/FqvJBXIoJzRmekJTx)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, Ollama, LangGraph, Claude Code, NotebookLM, Python
  - *Action:* Review article for best practices on this project.
- **[10 LLM Engineering Concepts Explained in 10 Minutes - KDnuggets](https://share.google/aW4thHKQIj1xCTSSz)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, Ollama, Claude Code, Docker, Python
  - *Action:* Review article for best practices on this project.
- **[x.com/BHolmesDev/status/2042361921857356270](https://share.google/fwWtxHyphl1jX9zvQ)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, Vibe Coding, Obsidian
  - *Action:* Review article for best practices on this project.
- **[I used Claude to learn about Python and I should have sooner](https://share.google/BLlhrVUMuiNSLNhbw)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, Vibe Coding, Claude Code, Python
  - *Action:* Review article for best practices on this project.
- **[5 Useful Things to Do with Google’s Antigravity Besides Coding - KDnuggets](https://share.google/5QnRGe0tXKZFWravr)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, Local AI & Self-Hosting, Vibe Coding, Ollama, Claude Code, Python
  - *Action:* Review article for best practices on this project.
- **[How to Maximize Claude Cowork | Towards Data Science](https://share.google/eN8p4F5YkiygFp38K)** (Relevance: High)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Vibe Coding, LangGraph, Claude Code
  - *Action:* Review article for best practices on this project.
- **[Android Developers Blog: Android CLI and skills: Build Android apps 3x faster using any agent](https://share.google/aP5nA8p61V0JYKmBD)** (Relevance: High)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[Introducing Genie Agent Mode | Databricks Blog](https://share.google/HDVyTMsyQlyt4l7Wq)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns
  - *Action:* Review article for best practices on this project.
- **[I Just Vibe Coded a Global Mass Surveillance Site in 2 Hours With OpenAI's Codex. It Was Terrifyingly Easy | PCMag](https://share.google/uSbjV8IzAeXDMV2vb)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[Changes to GitHub Copilot Individual plans - The GitHub Blog](https://share.google/hAL2sjAIBm1PtvHh2)** (Relevance: High)
  - *Concepts/Tools:* Agentic Design Patterns, Vibe Coding, GitHub Copilot
  - *Action:* Review article for best practices on this project.
- **[Building with Modal and the OpenAI Agents SDK](https://share.google/kcyD9KOC8pPWbffxq)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code, Modal
  - *Action:* Review article for best practices on this project.
- **[Claude Design: Everything You Can Build in 16 Minutes (5 Real Use Cases)](https://share.google/O91NRRDF5a3ucWKRf)** (Relevance: Medium)
  - *Concepts/Tools:* Model Context Protocol (MCP), Vibe Coding, Claude Code, JavaScript
  - *Action:* Review article for best practices on this project.
- **[Agents CLI in Agent Platform: create to production in one CLI - Google Developers Blog](https://share.google/2e5Bwg4sxy8dVXUqc)** (Relevance: High)
  - *Concepts/Tools:* Agentic Design Patterns, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[Agentic Design Patterns - by Neo Kim](https://share.google/7n0yrgEBjXyYl6QRT)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, React, JavaScript
  - *Action:* Review article for best practices on this project.
- **[Visual Studio Code 1.118](https://share.google/lxdcKMwQYDt5f5Ix4)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Vibe Coding, Modal, TypeScript, JavaScript
  - *Action:* Review article for best practices on this project.
- **[10 GitHub Repositories To Master Claude Code - KDnuggets](https://share.google/GzoXAqhSHwmrIwMbn)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, Local AI & Self-Hosting, Vibe Coding, Ollama, Claude Code, Python
  - *Action:* Review article for best practices on this project.
- **[Automate the busywork: 8 SEO tasks you shouldn’t do manually](https://share.google/JBm2yQrRxCPQlmTIq)** (Relevance: Medium)
  - *Concepts/Tools:* LLM Engineering, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[Google Brings Enterprise AI Agent Tools Under One Roof](https://share.google/NO74YHvcEZx0SozJf)** (Relevance: Medium)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering
  - *Action:* Review article for best practices on this project.
- **[How to Run OpenClaw with Open-Source Models | Towards Data Science](https://share.google/utk5etrpS9E45uC9z)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[Cowork on 3P: How to Run Any LLM in Claude Cowork and Claude Code](https://share.google/ppDOsQuIXNqbjK1Ja)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, Ollama, Claude Code, LiteLLM, JavaScript
  - *Action:* Review article for best practices on this project.
- **[Good News! AI-first Warp Terminal is Now Open Source](https://share.google/D2MSJwekDdnSR7lH7)** (Relevance: High)
  - *Concepts/Tools:* Agentic Design Patterns, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[How to Build a Multi-Agent AI System with LangGraph, MCP, and A2A [Full Book]](https://share.google/IUOW2Chww2nlHOsA6)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, Ollama, LangGraph, LangChain, Docker, LiteLLM, FastAPI, Streamlit, React, Next.js, Python, Langfuse
  - *Action:* Review article for best practices on this project.
- **[GitHub Copilot in Visual Studio Code, April releases - GitHub Changelog](https://share.google/55lq9VBBuBgQHTczy)** (Relevance: High)
  - *Concepts/Tools:* Agentic Design Patterns, Local AI & Self-Hosting, Vibe Coding, Ollama, GitHub Copilot
  - *Action:* Review article for best practices on this project.
- **[How Agents Manage Other Agents: Four Subagents Patterns in 2026](https://share.google/2XM9lpMdBsj0LXNTR)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns
  - *Action:* Review article for best practices on this project.
- **[Single Agent vs Multi-Agent: When to Build a Multi-Agent System | Towards Data Science](https://share.google/lQ8bzI3vA03gBKsph)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, LangGraph, Claude Code, Streamlit, React, Python
  - *Action:* Review article for best practices on this project.
- **[How to Make Claude Code Validate its own Work | Towards Data Science](https://share.google/vm1YOwWxmbvpTPawb)** (Relevance: Medium)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[Meet GitHub Spec-Kit: An Open Source Toolkit for Spec-Driven Development with AI Coding Agents - MarkTechPost](https://share.google/GPuWnENdQthFSmoxM)** (Relevance: High)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code, GitHub Copilot, Python, TypeScript, JavaScript
  - *Action:* Review article for best practices on this project.
- **[Build a Hybrid-Memory Autonomous Agent with Modular Architecture and Tool Dispatch Using OpenAI - MarkTechPost](https://share.google/Xva4I6r8eDEzZVQc5)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, Ollama, LangGraph, LangChain, Claude Code, GitHub Copilot, Modal, Python, TypeScript, JavaScript, NetworkX, Langfuse
  - *Action:* Review article for best practices on this project.
- **[Notion just turned its workspace into a hub for AI agents | TechCrunch](https://share.google/c6EIupaG1xTkYCtgm)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[Claude Code for Beginners](https://share.google/Cup0IDhYFfoH0Pvkq)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[Meet LiteLLM Agent Platform: A Kubernetes-Based, Self-Hosted Infrastructure Layer for Isolated Agent Sandboxes and Persistent Session Management in Production - MarkTechPost](https://share.google/Ry4cUNCR25hXrHNY2)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code, Docker, LiteLLM, Vercel, Next.js, Python, TypeScript
  - *Action:* Review article for best practices on this project.
- **[I used Claude Design to re-create my website landing page, and realized why Opus is worth $20](https://share.google/Zogaya0OhC4AVVSoH)** (Relevance: Medium)
  - *Concepts/Tools:* LLM Engineering, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[I vibe coded a complex data visualisation and analysis dashboard. Here’s what I learned | Reuters Institute for the Study of Journalism](https://share.google/tmqFjEALF7giChFfy)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[GitHub takes aim at Claude Code and Codex with its new Copilot app - The New Stack](https://share.google/bGm3e0Y41ysQKrAP6)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Home Automation, Vibe Coding, Gemma 4, Claude Code, GitHub Copilot, Docker, React, Python, TypeScript, JavaScript, Wasm
  - *Action:* Review article for best practices on this project.
- **[Fara1.5 - A family of frontier computer use agent models - Microsoft Research](https://share.google/cvQSR0PVeyGjwvYKh)** (Relevance: High)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Web Scraping & ETL, Vibe Coding, GitHub Copilot
  - *Action:* Review article for best practices on this project.
- **[A Step-by-Step Coding Tutorial to Implement GBrain: The Self-Wiring Memory Layer Built by Y Combinator's Garry Tan for AI Agents - MarkTechPost](https://share.google/0bSHwklbLGLA4sbvk)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code, Docker, Vercel, TypeScript, Wasm
  - *Action:* Review article for best practices on this project.
- **[Tencent Open-Sources TencentDB Agent Memory: A 4-Tier Local Memory Pipeline for AI Agents - MarkTechPost](https://share.google/I80aewXRdhBwBh9gj)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Web Scraping & ETL, Vibe Coding, LangGraph, LangChain, Claude Code, Docker, Modal, Vercel, Streamlit, React, Next.js, TypeScript, JavaScript
  - *Action:* Review article for best practices on this project.
- **[Google Introduces Middleware Architecture for Genkit Applications - InfoQ](https://share.google/RfeAegohyfLyRvyPC)** (Relevance: Medium)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, Local AI & Self-Hosting, Vibe Coding, Gemma 4, Python, TypeScript
  - *Action:* Review article for best practices on this project.
- **[Build a Complete Langfuse Observability and Evaluation Pipeline for Tracing, Prompt Management, Scoring, and Experiments - MarkTechPost](https://share.google/jJShou5opX976nb5M)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, Ollama, LangGraph, LangChain, GitHub Copilot, Modal, Vercel, Python, TypeScript, JavaScript, NetworkX, Langfuse
  - *Action:* Review article for best practices on this project.
- **[I added these MCP servers to my local LLM stack, and one of them replaces a $249 paid tool](https://share.google/WYXgts2xQhXZ2nJSp)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), LLM Engineering, Local AI & Self-Hosting, Home Automation, Web Scraping & ETL, Vibe Coding, Playwright, Docker, Home Assistant, Next.js, Obsidian
  - *Action:* Review article for best practices on this project.
- **[Copilot CLI: Improved UI, rubber duck, prompt scheduling, and voice input - GitHub Changelog](https://share.google/ypazfq53PsAAaSNmG)** (Relevance: High)
  - *Concepts/Tools:* Agentic Design Patterns, Vibe Coding, GitHub Copilot
  - *Action:* Review article for best practices on this project.
- **[My favorite alternative to VS Code isn’t Cursor or Claude Code: it’s something way cooler and productive](https://share.google/OLq1ZSrywKjK61QCH)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[Trajectory Releases a Concurrent Multi-LoRA Training Stack for Continual Learning, Reporting a 2.81× Experiment-Throughput Gain - MarkTechPost](https://share.google/tRnfVjuWYCDguhQin)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Web Scraping & ETL, Vibe Coding, LangGraph, LangChain, Claude Code, Docker, Modal, Vercel, Streamlit, React, Next.js, TypeScript, JavaScript
  - *Action:* Review article for best practices on this project.
- **[GitHub Agentic Workflows is now in public preview - GitHub Changelog](https://share.google/Wxi2RTSOVSHc814TV)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, Vibe Coding, GitHub Copilot
  - *Action:* Review article for best practices on this project.
- **[Moonshot AI Launches Kimi Work, a Local Desktop Agent Reportedly Running on Kimi K2.6 With a 300-Sub-Agent Agent Swarm - MarkTechPost](https://share.google/o3SJVbAH8BnDaR1vU)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Vibe Coding, Vercel, Python
  - *Action:* Review article for best practices on this project.
- **[Anthropic’s Complete Guide to Claude Skills Building - KDnuggets](https://share.google/RtrPPVSPk2BwlU7r5)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Local AI & Self-Hosting, Vibe Coding, Ollama, Claude Code, Python
  - *Action:* Review article for best practices on this project.
- **[I created a complex web app using Claude Code, Codex, and Antigravity, and only one acted like a tech lead](https://share.google/9bXv7HlMu41uLlne2)** (Relevance: Medium)
  - *Concepts/Tools:* Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
- **[Introducing the MDN MCP server](https://share.google/iR6BlY9xwFG0HU2P0)** (Relevance: High)
  - *Concepts/Tools:* Model Context Protocol (MCP), Agentic Design Patterns, LLM Engineering, Vibe Coding, Claude Code
  - *Action:* Review article for best practices on this project.
