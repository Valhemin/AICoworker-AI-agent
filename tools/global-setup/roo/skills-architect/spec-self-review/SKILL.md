---
name: spec-self-review
description: Run a pre-handoff self-review of the full spec pack — catching gaps the author missed before spec-consistency-analysis runs. Use before declaring any spec READY.
---

TRIGGER: after authoring a spec pack and before running spec-consistency-analysis
OUTPUT: report — phase 1-4 pass/fail counts, failures with specific doc locations and fix required, READY/BLOCKED verdict
SKIP: running before spec is fully drafted; only use when the author is ready for pre-handoff gate

---


Use after authoring a spec pack (or any spec artifact) and before running `spec-consistency-analysis`. This is the author's own gate — catching obvious gaps before a cross-artifact analysis runs.

## Position in workflow

```
Draft spec → spec-self-review (this skill) → spec-consistency-analysis → handoff
```

Do not skip this step. `spec-consistency-analysis` checks cross-artifact consistency but does not check for missing proactive content. This skill does.

## Phase 1 — Proactive content check

Run every item. Mark PASS / FAIL. A FAIL is a blocker — fix before continuing.

| Check | Pass condition |
|---|---|
| `## Suggestions & Improvements` section exists | Present in spec, non-empty |
| Missing requirements checked | Auth, error handling, rate limiting, data retention, logging, monitoring, rollback, accessibility each considered — either addressed in spec or explicitly listed as out-of-scope |
| Research done for all APIs/services | Every named API/service has a cited source; none rely on `ASSUMPTION:` for verifiable facts |
| Production risks called out | At least one `RISK:` entry in Suggestions section, or explicit "no production risks identified" |
| Improvements offered | At least one `SUGGESTION:` entry, or explicit "no improvements identified" |

## Phase 2 — Spec completeness check

| Check | Pass condition |
|---|---|
| Goal statement present | One sentence, outcome-focused, no feature list |
| Target users named | Specific roles — not "users" or "people" |
| Out-of-scope section | Exists and is non-empty |
| Assumptions section | Exists; every `ASSUMPTION:` in spec is also listed here |
| Every FR has an AC | No FR without at least one Given/When/Then, metric, or constraint |
| No vague NFRs | No "fast", "reliable", "secure", "easy" without a numeric metric |
| Error paths specified | Every integration and user-facing failure mode has a stated behavior |
| Auth model stated | Who can do what — not "auth TBD" |

## Phase 3 — Clarity check

| Check | Pass condition |
|---|---|
| No banned output patterns | None of: "we could consider", "one approach might be", "this depends on your preference", "further clarification needed" |
| Decisions are committed | Every decision is `DECISION:` not "Option A or B" |
| Assumptions are recorded | Every assumption is `ASSUMPTION: [topic] — [value] — [rationale]` |
| Open questions are minimal | Max 1 truly blocking open question; everything else is an assumption |

## Phase 4 — Research adequacy check

For every external dependency named in the spec:

| Check | Pass condition |
|---|---|
| Current docs verified | Source URL and date cited, or `RESEARCH-NEEDED:` flag with what was tried |
| Pricing confirmed at official page | Cell in comparison table or `[official]` label |
| Rate limits checked | Stated explicitly or `RESEARCH-NEEDED:` |
| Auth mechanism verified | Named and cited |

## Output format

```
## Spec Self-Review

### Summary
- Phase 1 (proactive content): [N] PASS, [N] FAIL
- Phase 2 (completeness): [N] PASS, [N] FAIL
- Phase 3 (clarity): [N] PASS, [N] FAIL
- Phase 4 (research): [N] PASS, [N] FAIL

### Failures (must fix before READY)
- [phase] [check name] — [specific location in spec] — [fix required]

### Verdict: READY TO PROCEED TO CONSISTENCY ANALYSIS / BLOCKED
Reason: [one line]
```

## After failures

Fix every FAIL before running `spec-consistency-analysis`. Do not patch the report — patch the spec.

If a check cannot pass because the information is genuinely unavailable:
- Record `RESEARCH-NEEDED: [topic] — [what was tried] — [what would resolve it]`
- That is a PASS for Phase 4 (gap is visible, not hidden)
- It is a FAIL for Phase 2 if it relates to a blocking spec gap

## Done-definition

Self-review is COMPLETE when:
- All phases are run.
- Every FAIL is either fixed in the spec or recorded as `RESEARCH-NEEDED:`.
- Verdict is rendered.
- Findings are written to `docs/specs/<project>/00c-self-review.md` for spec packs, or returned inline for smaller requests.
