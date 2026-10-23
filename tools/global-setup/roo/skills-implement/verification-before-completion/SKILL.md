---
name: verification-before-completion
description: Require evidence before claiming completion.
---

TRIGGER: before final summaries, task completion claims, release readiness declarations, or bug fix claims
OUTPUT: compact — evidence checklist ticked per work type, known failures reported honestly, risks and follow-ups listed
SKIP: intermediate work-in-progress steps that are not final completion claims

---


Use before final summaries, task completion, release readiness, or bug fix claims.

## Backend / API Work — Required Evidence

- [ ] `api-testing` skill run — all cases listed with PASS/FAIL, not "tests passed"
- [ ] Typecheck passes with zero new errors
- [ ] Lint passes or new warnings are explicitly acknowledged
- [ ] Auth failure case tested (401/403)
- [ ] Input validation tested (400 on bad input)
- [ ] Error handling covers all failure modes identified in `error-handling-patterns`

## Frontend Work — Required Evidence

- [ ] Typecheck passes with zero new errors
- [ ] Lint passes
- [ ] Component renders in all required states (loading, error, empty, filled)
- [ ] Accessibility: form fields labeled, interactive elements keyboard-accessible
- [ ] Responsive behavior verified at intended breakpoints (manual or screenshot)
- [ ] E2E/browser test: only if user explicitly requested

## Database / Schema Work — Required Evidence

- [ ] Migration ran cleanly on local dev DB
- [ ] Rollback plan confirmed
- [ ] `api-testing` run against endpoints affected by schema change
- [ ] Constraint boundary cases tested

## All Work — Required

- [ ] Acceptance criteria checked one by one — not "all done" without listing them
- [ ] Changed files summarized (path + behavior changed)
- [ ] Known failures reported honestly — no hiding partial failures
- [ ] Risks and follow-ups listed
- [ ] No unrequested features or abstractions added

## Completion Gate

Never write "done", "fixed", "complete", or "production-ready" without ticking every applicable item above and showing the evidence (command output, test results, or explicit skip reason).

If any item is skipped: name it and give the reason. Silence on any item = incomplete verification.
