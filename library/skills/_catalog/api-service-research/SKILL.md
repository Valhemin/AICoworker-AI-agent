---
name: api-service-research
description: "Evaluate external APIs or service providers against explicit criteria and produce a comparison table with a per-option verdict."
---

TRIGGER: deciding whether to adopt an external API, SaaS, or data provider when multiple options exist to compare
OUTPUT: report — provider comparison table, gap flags, per-option verdict (USE/DON'T USE/USE WITH CAVEATS), concrete recommendation
SKIP: evaluating internal service design or single-provider decisions with no alternatives to compare

---

## Input contract

Accept from user (any format — table, list, prose):
- The provider/option names to evaluate.
- The evaluation criteria (or derive sensible defaults if not supplied; see Default Criteria below).

## Default criteria (use when user supplies none)

| Criterion | What to check |
|---|---|
| Pricing / limits | Tiers, free quota, overage cost, rate limits |
| Endpoint coverage | Does it expose the data/operations the feature needs? |
| Data freshness | How often is data updated? Real-time, daily, weekly? |
| Auth mechanism | API key, OAuth, IP allowlist — complexity of integration |
| Reliability / SLA | Uptime claims, known outages, community reports |
| Documentation quality | Complete, versioned, includes error codes? |
| Vendor risk | Company age, funding, open support issues, data ownership |

## Workflow

### Phase 0 — Search planning

For each provider:
1. Build specific queries: `"[provider] [feature] [year]"`, `site:[official-domain] [topic]` — never generic names alone
2. Check provider origin language (see `rules/01`) — if non-English origin, plan 1 native-language query per provider alongside English
3. Use the platform's own technical terms in native language, not translated English

### Phase 1 — Per-provider research (minimum sources)

For each provider/option:
1. Official docs/pricing page — English + native language if applicable (`[official]` / `[official, zh-CN]`)
2. At least 1 independent source: GitHub Issues, community forum, news (`[community]` / `[news]`)
3. Pricing: official page only — never infer from blog posts
4. English results thin → run native-language query before marking `UNVERIFIED`

Minimum 2 sources per provider. Single source → mark entire provider as `confidence: low`.

### Phase 1.5 — Signal filter (before writing any output)

Discard before synthesizing:
- Sources >12 months old unless nothing newer exists (flag: `[source outdated, best available]`)
- Blog posts that only restate official docs without adding context
- Community posts with no upvotes / no replies / no accepted answer
- Any source that doesn't directly answer a specific criterion

Keep only what changes or confirms a verdict cell.

### Phase 2 — Comparison table (mandatory output)

Produce this table. Never omit it. Never replace it with prose-only findings.

```
## Provider Comparison

| Criterion | [Provider A] | [Provider B] | [Provider C] |
|---|---|---|---|
| Pricing / limits | ... [tier label] | ... | ... |
| Endpoint coverage | ... | ... | ... |
| Data freshness | ... | ... | ... |
| Auth mechanism | ... | ... | ... |
| Reliability / SLA | ... | ... | ... |
| Documentation | ... | ... | ... |
| Vendor risk | ... | ... | ... |
```

Source quality labels (append to every cell where data came from a source):
- `[official]` — from vendor's own docs/pricing page
- `[community]` — from GitHub Issues, Stack Overflow, Reddit, forum
- `[news]` — from reputable news or analysis
- `[inferred]` — derived from indirect evidence, not stated explicitly

### Phase 3 — Gap flags (mandatory)

For every criterion that cannot be verified with available sources:
- Mark the cell: `UNVERIFIED — [what was tried]`
- Do NOT omit the criterion.
- Do NOT mark it as "N/A" unless the criterion genuinely does not apply to that provider.

### Phase 4 — Output (answer first, evidence after)

**For any output with multiple options: rank by tier before writing anything else.**

```
## Result

### ⭐ Top pick: [Provider X]
Why: [reason #1 most important] · [reason #2] · [reason #3]
Caveat: [specific risk if any]
Next step: [1 concrete action]

### Other options
**[Provider B]** — Viable if [condition]. Weakness: [main issue].
**[Provider C]** — Avoid because [short reason].

---
[Comparison table — evidence, placed after]
```

**Tier ranking rules:**
- Top pick = best for user's context, not most popular
- Reasons must be concrete (price, integration speed, rate limit, language support…) — no buzzwords ("robust", "scalable", "enterprise-grade")
- Caveats only if they materially affect the decision
- If 2 options are equal → pick lower vendor lock-in, state the tiebreaker

Never: "depends on your needs", "more research needed", or a flat list with no winner.

## Gap reporting rules

- UNVERIFIED data is reported in the table, not hidden.
- If official pricing is paywalled or undisclosed, state that explicitly in the cell and note that pricing was obtained from community sources.
- If no source can answer a criterion, write: `UNVERIFIED — no source found after searching [terms tried]`.

**Never** end with "you should research X more" as the final output.

## Output length and destination

- 1–2 providers: summary in chat is sufficient.
- 3+ providers or complex criteria: write to `docs/research/<feature>-provider-comparison.md` and summarize in chat.

## Source quality tiers

| Tier | Label | Examples | Trust |
|---|---|---|---|
| 1 | `[official]` | Vendor docs, pricing page, API reference, source repo | Highest |
| 2 | `[release]` | Changelog, release notes, migration guide | High |
| 3 | `[reputable]` | Tech news, analyst report ≤12mo | Medium-high |
| 4 | `[community]` | GitHub Issues, Stack Overflow, Reddit | Medium — flag as unofficial |
| 5 | `[blog]` | Dev.to, Medium, personal blogs | Low — cross-verify required |
