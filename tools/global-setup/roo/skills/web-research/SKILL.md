---
name: web-research
description: Search the web for current information using Tavily or Brave Search MCP when project docs and Context7 are insufficient.
---

TRIGGER: need current web information that Context7 and project docs cannot provide — recent releases, community discussions, security advisories
OUTPUT: compact — findings with source attribution, confidence level (single vs cross-verified), remaining uncertainties
SKIP: questions answerable from Context7 or project docs — search those first before enabling web search MCPs

---


Use when you need current web information that Context7 and project docs cannot provide: recent releases, community discussions, comparisons, migration guides, security advisories.

## MCP Tools

| MCP | Tool | Best for |
|---|---|---|
| **Tavily** | `tavily-search` | Deep search with LLM-ready extracted text, current articles |
| **Brave Search** | `brave_web_search` | Fast web search, broad coverage, news |

Both are disabled by default. Enable the one you need before calling.

## Protocol

1. Confirm Context7 and project docs do not already answer the question.
2. Enable Tavily or Brave Search MCP.
3. Search with specific, targeted queries. Prefer 2-3 focused queries over 1 broad one.
4. Cross-verify claims across sources when the decision is high-impact.
5. Summarize findings with source attribution.
6. Disable MCP after use if it was enabled for this task only.

## Query Tips

- Include version numbers: `"react 19 server components migration"` not `"react server components"`.
- Include year for currency: `"vite 7 breaking changes 2026"`.
- Use site-scoped queries for official sources: `"site:github.com prisma orm release"`.

## Output

- Findings relevant to the decision at hand.
- Source URLs.
- Confidence level (single source vs cross-verified).
- What remains uncertain.
