TRIGGER: before declaring a feature, fix, refactor, or migration complete — correctness and coverage check, no deploy steps
OUTPUT: compact — evidence per gate item, one status label (Ready / Ready with risks / Blocked / Not ready)
SKIP: intermediate implementation steps; pre-production deploy checklist (use release-readiness instead)

---

# Quality Gate

Use before declaring a feature, fix, refactor, migration, or release-ready state complete.

## Gate

A task is not complete until the answer includes evidence for:

- Acceptance criteria satisfied.
- Relevant tests/build/lint/typecheck or project-native checks run.
- Manual verification steps when automation is unavailable.
- Security/privacy impact considered.
- Performance or UX impact considered when relevant.
- Documentation/tasks/checklists updated if they exist.
- Known failures, skipped checks, or remaining risks stated plainly.

## Status Labels

Use exactly one:

- `Ready` — all required checks passed.
- `Ready with risks` — functionality works, but non-blocking risks remain.
- `Blocked` — cannot proceed without user/project/environment input.
- `Not ready` — required verification failed or acceptance criteria are incomplete.

Never beautify an incomplete result as complete.
