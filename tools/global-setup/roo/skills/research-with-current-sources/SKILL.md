TRIGGER: knowledge may be stale, API/library changed, user sends URL to investigate, or no clear solution is known
OUTPUT: compact — answer/finding with confidence level, source comparison, remaining gaps, all sources cited
SKIP: questions fully answerable from project code or Context7 docs — exhaust those first

---

# Research With Current Sources

Use when: knowledge may be stale, API/library changed, user sends URL to investigate, or no clear solution is known.

## Depth Floor (non-negotiable)

- Minimum **3 independent sources** before concluding. If fewer available, say so explicitly.
- Minimum **2 keyword variations** per sub-question.
- For URL inputs: fetch the URL + at least 2 corroborating/contrasting sources.

## MCP Priority

1. Project docs and source code.
2. Official docs and release notes.
3. **Context7** — library/framework docs (`resolve-library-id` → `get-library-docs`).
4. **Tavily** — web search for recent issues, migration notes, blog posts (`tavily-search`). Enable MCP first if disabled.
5. **Brave Search** — fallback if Tavily unavailable (`brave_web_search`).

Use the most specific source first. Do not web-search when Context7 has the answer.

## Synthesis Mandate

After gathering sources, **always produce a synthesized conclusion** — never return raw "I found X, you should research more."

Structure:
1. **Answer / Finding** — direct answer to the research question, even if partial.
2. **Confidence** — high (3+ agreeing official sources) / medium (mixed or secondary sources) / low (single source, unverified).
3. **Source comparison** — if sources conflict or differ in quality, state which is authoritative and why.
4. **Remaining gaps** — specific unknowns that are genuinely unresolvable with available tools (not "I didn't look hard enough").
5. **Sources cited** — list every source used.

## Gap Reporting (when no good answer exists)

If research yields no definitive answer:
- State clearly: "No authoritative answer found."
- Report best available evidence (partial, indirect, or secondary sources) with confidence level.
- Explain what specific search terms/sources were tried.
- Recommend the safest reversible next step.

**Never**: stop at "insufficient data" without reporting what WAS found.

## Source Quality Ranking

1. Official docs / source repo / spec — **current version only**
2. Official release notes / changelog — **≤6 months preferred**
3. Reputable news / academic — **≤12 months required; flag if older**
4. Community discussions (Stack Overflow, GitHub Issues) — cite + flag as unofficial + check date
5. Blogs / tutorials — lowest trust, cross-verify required, **flag if >12 months old**

When sources conflict: prefer higher-ranked source. State the conflict explicitly.

**Recency rule**: Always cite the most recent source available. If the best source is >12 months old, flag it: `[stale — published YYYY-MM, verify against current docs]`. For APIs, pricing, and library behavior: treat anything >6 months old as suspect.

## When to enable search MCPs

Tavily and Brave are disabled by default. Enable when:
- Context7 lacks coverage.
- Question is about current events, recent releases, or community discussions.
- Multiple independent sources needed to cross-verify.
