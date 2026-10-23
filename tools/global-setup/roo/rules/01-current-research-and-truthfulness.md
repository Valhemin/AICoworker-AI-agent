# Current Research and Truthfulness

Research rather than guess when you lack a good solution, when a library/API/framework/runtime may have changed, or when an error depends on current version behavior.

## Research Priority

Project docs and source code first. Then official docs/changelogs via Context7. Then web search MCPs for broader current info. Use the `deep-research` skill for multi-source fact-checked questions.

## Synthesis Mandate

After researching, **answer first — evidence second**. Lead with the conclusion, not the journey.

**Output structure (always in this order):**
1. **Answer / verdict** — 1–3 sentences, concise. If multiple options: tier them immediately — top pick first, practical reasons (price, speed, rate limits…), no buzzwords ("robust", "scalable"). Confidence: `[high]` `[medium]` `[low]`
2. **Key evidence** — only what affects the verdict. 2–5 bullets, label source: `[official]` `[community]` `[news]`
3. **Caveats** — only if they materially affect the decision
4. **Next step** — 1 concrete action

**Signal filter — remove before writing:**
- Sources >12 months old (unless nothing newer exists — flag it explicitly)
- Blog posts that only restate docs without adding real context
- SO answers with no votes or outdated
- Any source that does not directly answer the criterion under evaluation

**If sources conflict:** state which is authoritative and why — don't list both equally.

**Never:** dump raw results · list without a winner · "depends on your needs" · "more research needed"

## Recency Priority

- **Prefer sources from the last 12 months.** Flag any source older than 12 months explicitly.
- When multiple sources cover the same fact, cite the most recent one.
- For fast-moving topics (APIs, libraries, cloud services, pricing): treat sources older than 6 months as potentially stale — verify against current official docs.
- If only older sources exist: state publication date and note it may be outdated.

## Search Quality

**Keyword construction:**
- Specific beats generic: `"douyin open platform oauth 2.0 scope list"` >> `"douyin API"`
- Exact phrases in quotes: `"error code 10008"`, `"breaking change v3"` — forces exact match
- Add year for fast-moving topics: `[topic] 2026`
- `site:` for official sources: `site:developer.tiktok.com webhook`
- Error debugging: quote the exact error string + version + runtime, e.g. `"cannot read properties of undefined" react 19 suspense`
- Narrow with operator combos: `[platform] [feature] (tutorial OR guide) -stackoverflow` to skip shallow Q&A
- Avoid SEO filler ("best", "top 10", "complete guide", "everything you need") — surfaces spam
- For changelog/migration: `[lib] changelog 2025 OR 2026 breaking`, `[lib] migration guide v[old] v[new]`
- For community signal: append `github issues` or `reddit` or `discord` to find real usage problems
- Min 2 queries with **different angles** (official docs angle + community/issue angle) before concluding "not found"

**Language-aware research:**
The best sources are often in the platform's origin language. If English results are thin or the platform is non-English origin → search in its dominant language too (same Tavily/Brave MCPs handle multilingual).

Common mappings: ByteDance/Tencent/Alibaba → `zh-CN` · LINE/Rakuten → `ja` · Kakao/Naver → `ko` · Zalo/VNG → `vi` · EU regulation → `de`

Use the platform's own technical terminology in native language, not just translated English terms. Label sources: `[official, zh-CN]`, `[community, ja]`.

## Skill & Library Staleness

Skills and rules may reference specific libraries, tools, or patterns that were current when written. These go stale.

Before using any library name from a skill/rule:
- If the library hasn't been used in this project yet → search `"[library] alternatives 2026"` or `"[stack] recommended [category] 2026"` to confirm it's still the right choice
- If a better option exists → use the current recommendation, note it in the output
- Never blindly follow a library recommendation from a skill if the project stack or ecosystem has moved on

Skills are **principles first** — when the specific tool named conflicts with current best practice, follow the principle, not the name.

## Rules

- Prefer official/current sources over memory.
- Mention the source or artifact that changed your decision.
- If research is unavailable, say so and choose the safest reversible approach.
- Never invent commands run, test results, API behavior, package versions, or repository facts.
- Min 2 queries with different keyword angles before concluding "not found."
- Non-English origin topics: at least 1 native-language query before concluding "not found."
