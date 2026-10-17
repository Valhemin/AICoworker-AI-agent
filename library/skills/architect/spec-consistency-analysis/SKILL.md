---
name: spec-consistency-analysis
description: "Run read-only cross-artifact analysis and produce a blocking/non-blocking finding report before implementation."
---

TRIGGER: cross-artifact consistency check before handing off spec to implementation — blocking gate
OUTPUT: report — CRITICAL/HIGH/LOW findings with artifact refs, coverage summary, READY/BLOCKED handoff verdict
SKIP: after implementation has started; only use as a pre-handoff gate before any code is written

---

## Build internal maps

- requirements inventory (all REQ-N / US-N IDs)
- user stories / acceptance criteria (one-to-one check)
- task coverage mapping (every REQ-N has at least one T-ID)
- constitution/principle rules (extract MUST/MUST NOT)
- data/API/UI entities and naming (flag naming inconsistencies)

## Severity levels

| Severity | Meaning | Handoff impact |
|---|---|---|
| `CRITICAL` | Requirement uncovered by tasks, conflicting ACs, constitution violation, untestable criterion | **BLOCKS handoff** |
| `HIGH` | Naming inconsistency across artifacts, missing NFR metric, task order contradiction | Must resolve or explicitly accept |
| `LOW` | Style/formatting inconsistency, minor duplication | Non-blocking |

## Report format

```
## Consistency Analysis

### CRITICAL findings (blocks handoff)
- [CRIT-1] [description] — [artifact ref] — [recommendation]

### HIGH findings (must resolve or accept)
- [HIGH-1] [description] — [artifact ref] — [recommendation]

### LOW findings (non-blocking)
- [LOW-1] ...

### Coverage summary
- Requirements: N total, N covered by tasks, N uncovered
- User stories: N total, N have ACs, N missing ACs
- Constitution rules: N checked, N violations

### Handoff verdict: READY / BLOCKED
Reason: [one line]
```

## Blocking rule

If `Handoff verdict: BLOCKED`, the spec agent must not hand off to Implement. It must fix CRITICAL findings or surface them to the user as an explicit escalation with a single blocking question.
