# Production Readiness Gate

Before claiming completion, verify as much as practical.

Use `rules/05-definition-of-done.md` as the task-type checklist (API, UI, all tasks). This gate governs the final status output format; the DoD governs what must be checked before reaching this gate.

## Evidence Requirements

Every claim in a completion report must be backed by evidence. "I checked" is not evidence.

| Claim | Required evidence |
|---|---|
| "Tests pass" | Command run + exit code + summary line count (e.g. `42 passed, 0 failed`) |
| "Accessibility verified" | Audit tool report + keyboard flow result |
| "No performance regression" | Before/after benchmark output |
| "API error handling works" | Integration or E2E test reference |
| "Responsive layout correct" | Viewport matrix checked + screenshot or automated result |
| "Security checked" | Scan results + threat-model checklist items ticked |
| "Migration is safe" | Migration test run + rollback rehearsal result |
| "No secrets exposed" | Secret scan result or explicit grep output |

If a check could not be run, record it as `not_verified` with the reason. Never describe a result that was not actually observed.

Evidence may be stored at `artifacts/validation/` (test summaries, reports, screenshots) and referenced by path in the completion output.

## Final Report Format

Final status must include all applicable items below. Skip a section explicitly with a one-line reason — do not silently omit.

1. **Phase & scope completed** — what was implemented, by scope.
2. **Acceptance criteria status** — which ACs are met, with traceability to test/evidence.
3. **Artifacts created or updated** — docs, specs, migrations, ADRs.
4. **Code & architecture changes** — structural decisions made, alternatives rejected.
5. **Commands run** — exact commands and exit status (pass / fail / skipped + why).
6. **Quality gate results** — lint, typecheck, test, build, security, a11y, perf.
7. **Evidence location** — where to find test output, reports, screenshots.
8. **Platform coverage** — what was tested on which platform/browser/viewport.
9. **Security & privacy impact** — what was changed, what was verified.
10. **Artifact drift result** — which dependent docs were checked; which are still stale.
11. **Risks & technical debt** — known gaps, deferred items, things that will bite later.
12. **Blockers** — what is preventing completion if status is PARTIAL or BLOCKED.
13. **Approvals still needed** — actions in the prohibited tier not yet taken.
14. **Next recommended action** — the single most useful next step.

Do not call work production-ready if: critical acceptance criteria are incomplete, tests fail without documented pre-existing cause, auth is unverified, a destructive action was taken without approval, or any item above is missing without an explicit skip reason.

See `rules/05-definition-of-done.md` for the full per-category checklist.
