# Tasks

## Rules

- Tasks are dependency-ordered.
- Each task is specific enough to execute without hidden context.
- Use `[P]` only for tasks that can run in parallel without touching the same files or depending on each other.
- Use `[US1]`, `[US2]`, etc. only when tasks map to a user story/slice.
- Include exact file paths whenever possible.

## Phase 1 — Setup / foundation

- [ ] T001 Create or update project foundation in `<path>`

## Phase 2 — User Story / Slice 1

Goal:
Independent test/verification:

- [ ] T002 [US1] Implement `<specific change>` in `<path>`
- [ ] T003 [US1] Add/update verification for `<behavior>` in `<path or command>`

## Phase 3 — User Story / Slice 2

Goal:
Independent test/verification:

- [ ] T004 [US2] Implement `<specific change>` in `<path>`

## Final Phase — Polish and readiness

- [ ] T999 Run final verification and update docs/release notes

## Dependency order

## Parallel opportunities

## Verification summary
