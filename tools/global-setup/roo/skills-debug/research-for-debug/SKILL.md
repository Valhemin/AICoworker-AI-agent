TRIGGER: debugging hit an external knowledge boundary — cryptic error, suspected library bug, version-specific breaking change, or behavior contradicts documented contract
OUTPUT: compact — verdict (known issue / local bug / unknown), evidence with source tiers, workaround or fix direction
SKIP: replacing internal code tracing; only trigger after internal investigation has produced a hypothesis to verify

---

# Research For Debug

Use only after internal investigation has produced a confirmed symptom or hypothesis to verify externally. Not a replacement for code tracing.

## Search strategy

1. Exact error string (strip file paths and variable IDs) + library name + version
2. Paraphrase + framework name + year
3. `site:github.com [repo] issues [symptom]`
4. Native language query if platform is non-English origin (see `rules/01`)

Min 2 keyword variations, min 2 independent sources before concluding.

## MCP priority

1. **Context7** — library docs + changelogs for the version range where bug appeared
2. **Tavily** — error messages, GitHub issues, community reports
3. **Brave Search** — fallback if Tavily unavailable

## Verdict

| Verdict | Meaning |
|---|---|
| **Known issue** | 2+ sources confirm upstream bug/breaking change — include version range, issue link, workaround |
| **Local bug** | Library behaves as documented — bug is in consuming code |
| **Unknown** | No authoritative answer — state what was searched, best hypothesis, confidence |

Source tiers: `[official]` docs/spec/changelog · `[release]` release notes/migration guide · `[issue]` GitHub issues · `[community]` SO/Reddit/Discord

## Output

- Verdict + confidence
- 2–3 evidence bullets with source tier labels
- Workaround or fix direction
- If unknown: next most diagnostic internal step
