---
name: deep-research
description: "user sends a URL to investigate, requests competitive analysis, technology comparison, API evaluation, or says 'research X' or 'deep dive"
---

TRIGGER: user sends a URL to investigate, requests competitive analysis, technology comparison, API evaluation, or says 'research X' or 'deep dive'
OUTPUT: report — executive summary, key findings per sub-question, source comparison, verdict/recommendation, gaps, all sources cited
SKIP: quick single-source lookups or questions fully answerable from project code or official docs

---

# Deep Research

Use when: user sends a URL to investigate, requests competitive analysis, API evaluation, technology comparison, or says "research X", "look into X", "deep dive", "evaluate X".

This skill enforces multi-source synthesis with a concrete output — not a list of "things to research further."

## Trigger Patterns

- User pastes a URL + asks what it does / whether it's worth using
- "Research [topic/API/tool/provider]"
- "Compare [A] vs [B]"
- "Look into / evaluate / analyze [X]"
- Evaluation criteria table provided (like pricing / endpoints / freshness / risk)

## Workflow

### Phase 1 — Decompose (before searching)
Break the research question into 3–5 specific sub-questions. Example for "evaluate RapidAPI provider X":
- What endpoints does it expose?
- What are the pricing tiers and limits?
- How fresh/reliable is the data?
- What auth does it require?
- What are the known risks or limitations?

### Phase 2 — Multi-source fetch (depth floor)
- Minimum **3 unique sources** per topic.
- For URL inputs: fetch the URL itself + at least 2 corroborating or contrasting sources.
- Use 2–3 keyword variations per sub-question.
- Source priority: official docs > release notes > reputable news/academic (**≤12 months — flag if older**) > community (GitHub Issues, Stack Overflow, **check date**) > blogs (**flag if >12 months**).
- **Recency first**: among same-tier sources, always prefer the most recently published. Note publication date for every source cited.
- Enable Tavily/Brave Search MCP if needed (disabled by default — inform user first).

### Phase 3 — Synthesize (mandatory)
After fetching, produce a structured report. **Never stop at raw findings.**

Required output sections:
1. **Executive Summary** — 3–5 bullet answer to the original question.
2. **Key Findings** — per sub-question, with evidence and source.
3. **Source Comparison** — if sources conflict or have different quality, state which wins and why.
4. **Verdict / Recommendation** — concrete: "use / don't use / use with caveats" + reasoning.
5. **Gaps & Caveats** — what could not be verified, and why.
6. **Sources** — all sources cited, with quality tier label.

## Gap Reporting Rules

If an authoritative answer is unavailable:
- Report best available evidence (partial, indirect, secondary) with confidence label: `high / medium / low / unverified`.
- State exactly which sources were tried and what they returned.
- Give a "best bet" recommendation under uncertainty rather than deferring entirely to the user.

**Never**: return "I found some info, you'll need to research more" as the final answer.

## Output Length

- Short topics (single API, single question): summary in chat.
- Broad topics (multi-provider comparison, market landscape): summary in chat + write detailed report to `docs/research/<topic>.md`.

## Source Quality Reference

| Tier | Examples | Trust | Recency threshold |
|---|---|---|---|
| 1 — Official | API docs, spec, source repo | Highest | Current version only |
| 2 — Release | Changelog, release notes | High | ≤6 months preferred |
| 3 — Reputable | TechCrunch, academic, official blog | Medium-high | ≤12 months; flag if older |
| 4 — Community | GitHub Issues, Stack Overflow | Medium (flag unofficial) | Check date; flag if >12 months |
| 5 — Blog/Tutorial | Dev.to, Medium | Low — cross-verify required | Flag if >12 months |

Among same-tier sources: always cite the most recently published. Include publication date in every citation.
