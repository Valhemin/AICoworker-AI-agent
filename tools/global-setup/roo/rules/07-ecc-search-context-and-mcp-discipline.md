# Search, Context, and MCP Discipline

## Search-first mindset

Before building custom utilities, integrations, auth flows, payment flows, background jobs, parsing logic, caching logic, or platform-specific behavior:
1. Check whether the project already has a pattern.
2. Check official/current documentation via Context7.
3. Only then consider web search or custom implementation.

Prefer existing project patterns over new abstractions. Prefer official docs over generic blog content. If research channels are unavailable, state that honestly and choose the safest reversible implementation.

## MCP Inventory

| MCP | Purpose | Default | Needs API key |
|---|---|---|---|
| **context7** | Library/framework docs lookup | enabled | No |
| **agentmemory** | Persistent memory across sessions | enabled | No |
| **tavily** | Web search — articles, issues, migration notes | disabled | `TAVILY_API_KEY` |
| **brave-search** | Web search — broad coverage, news | disabled | `BRAVE_API_KEY` |
| **playwright** | Browser automation, UI testing, screenshots | disabled | No |
| **chrome-devtools** | Performance profiling, network debug, DOM inspection | disabled | No |
| **github** | PR/issue management, code search | disabled | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| **figma** | Cloud Figma design access (Dev Mode) | disabled | No (browser auth) |
| **figma-desktop** | Local Figma Desktop app access | disabled | No (app must be running) |

## Enable/Disable Protocol

Most MCPs are disabled by default to minimize token overhead and attack surface.

**When to enable:**
- The current task specifically requires that MCP's capability.
- Context7 and project docs cannot answer the question (for search MCPs).
- The user explicitly requests it.

**How to enable:**
- Inform the user which MCP you need and why.
- The user sets `"disabled": false` in `mcp.json` (or the agent requests it).
- After the task, recommend disabling if it was a one-off need.

**Never:**
- Enable all MCPs "just in case."
- Add new MCPs without explaining risk and purpose.
- Auto-approve MCP changes without user awareness.

## Context budget

- Load only the files needed for the current decision.
- Summarize large artifacts before continuing.
- Keep long logs, dependency output, generated files, and unrelated docs out of active context.
- Use AgentMemory for durable context, but verify current repo state before acting on memory.
- Every enabled MCP adds ~500 tokens/tool to context. Keep enabled count minimal.
