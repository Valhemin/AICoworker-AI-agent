---
name: requirements-quality-checklist
description: Run a structured quality checklist against a requirements artifact and produce a pass/fail report with actionable findings.
---

TRIGGER: reviewing a requirements artifact before spec-consistency-analysis gate to run structured quality checks
OUTPUT: report — pass/fail per CHK-ID, CRITICAL/HIGH/LOW failures with specific doc locations, READY/NOT READY verdict
SKIP: implementation work; this is a pre-handoff gate for spec artifacts only

---


Use when reviewing `01-product-requirements.md` or any requirements artifact before the spec-consistency-analysis gate. Run this before declaring requirements READY.

## Input contract

Requires one of:
- `01-product-requirements.md` from a spec pack
- A requirements artifact with user stories, functional requirements, and acceptance criteria

## Mandatory checklist categories

Run ALL categories. Do not skip any category. Mark each item PASS / FAIL / N/A with a reference to the specific line or section that triggered FAIL.

### Category 1 — Completeness

| ID | Check | Severity if FAIL |
|---|---|---|
| CHK-C1 | Every functional requirement (FR) has at least one acceptance criterion | CRITICAL |
| CHK-C2 | Every user story has a role, action, and outcome (`As [role], I want [action] so that [outcome]`) | HIGH |
| CHK-C3 | An explicit out-of-scope section exists | HIGH |
| CHK-C4 | An assumptions section exists and is populated (even "none") | HIGH |
| CHK-C5 | Every integration (API, external service, 3rd party) is named — not "some payment provider" | HIGH |
| CHK-C6 | Auth and permissions model is stated (who can do what) | HIGH |
| CHK-C7 | Error handling behavior is specified for every integration and user-facing failure mode | HIGH |
| CHK-C8 | Non-functional requirements exist with numeric metrics — not vague qualifiers | HIGH |

### Category 2 — Clarity (ambiguity)

| ID | Check | Severity if FAIL |
|---|---|---|
| CHK-CL1 | No requirement uses vague qualifiers: fast, intuitive, easy, seamless, user-friendly, robust | CRITICAL |
| CHK-CL2 | Every metric in an NFR has a unit (ms, %, req/s, users) | CRITICAL |
| CHK-CL3 | Every acceptance criterion is in Given/When/Then, metric, or constraint form — no prose-only ACs | CRITICAL |
| CHK-CL4 | Observable outcomes are stated (what changes in the system/UI, not "it works") | HIGH |
| CHK-CL5 | No MUST/SHOULD is used interchangeably — MUST = mandatory, SHOULD = preferred | LOW |

### Category 3 — Consistency

| ID | Check | Severity if FAIL |
|---|---|---|
| CHK-CO1 | Entity names are consistent across all requirements (no "user" vs "account" vs "member" for the same concept) | HIGH |
| CHK-CO2 | No two requirements contradict each other | CRITICAL |
| CHK-CO3 | User story IDs (US1, US2) are referenced in FR IDs or ACs where traceability is expected | LOW |

### Category 4 — Testability

| ID | Check | Severity if FAIL |
|---|---|---|
| CHK-T1 | Every AC can be tested without human interpretation ("it looks good" is not testable) | CRITICAL |
| CHK-T2 | Every security requirement names the specific control — not "must be secure" | HIGH |
| CHK-T3 | Every performance requirement names the measurement condition (load, duration, hardware baseline) | HIGH |
| CHK-T4 | Negative / failure scenarios exist for every integration AC | HIGH |

### Category 5 — Proactive coverage (spec agent must verify these were considered)

| ID | Check | Severity if FAIL |
|---|---|---|
| CHK-P1 | Rate limiting or quota behavior is addressed if any external API is used | HIGH |
| CHK-P2 | Data retention and deletion paths are defined if any PII is stored | HIGH |
| CHK-P3 | Rollback / recovery behavior is specified for any destructive or migration operation | HIGH |
| CHK-P4 | Accessibility standard is named (WCAG 2.1 AA default) for any UI feature | HIGH |
| CHK-P5 | `## Suggestions & Improvements` section exists in the spec and is non-empty | HIGH |

## Output format

```
## Requirements Quality Report

### Summary
- Total checks run: N
- PASS: N
- FAIL (CRITICAL): N
- FAIL (HIGH): N
- FAIL (LOW): N
- N/A: N

### CRITICAL failures (block READY)
- [CHK-ID] [description] — [specific location in doc] — [fix required]

### HIGH failures (must resolve or accept with rationale)
- [CHK-ID] [description] — [specific location] — [recommended fix]

### LOW failures (non-blocking)
- [CHK-ID] ...

### Verdict: READY / NOT READY
Reason: [one line — reference specific CRITICAL or HIGH failures if NOT READY]
```

## Blocking rule

Requirements artifact is NOT READY if ANY CRITICAL failure remains unresolved.
HIGH failures must be resolved OR the agent must record an explicit `ASSUMPTION:` or `DECISION:` accepting the gap with rationale — they cannot be silently skipped.

## Done-definition

This skill is complete when:
- All CHK-IDs have a result (PASS / FAIL / N/A).
- Every FAIL has a specific doc location, not a generic description.
- A verdict is rendered.
- Findings are written into `11-requirements-quality-checklist.md` (spec pack) or returned inline for smaller requests.
