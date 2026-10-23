---
name: task-generation
description: Generate actionable dependency-ordered tasks from specs/plans for AI implementation.
---

TRIGGER: creating tasks.md or an implementation task list from specs/plans with dependency ordering
OUTPUT: detailed — dependency-ordered tasks with T-IDs, exact file paths, verification steps, full coverage of every FR/US
SKIP: before requirements are finalized; all FRs must exist before task generation

---


Use when creating `tasks.md` or an implementation task list.

Task quality contract:
- Tasks must be immediately executable without hidden context.
- Organize by user story or independently deliverable slice.
- Each user story/slice should be independently implementable and verifiable where possible.
- Use format: `- [ ] T001 [P?] [US?] Action with exact file path`.
- `[P]` means parallelizable only when tasks touch different files and have no dependency conflict.
- Use `[US1]`, `[US2]`, etc. only when tied to user-story phases.
- Include setup/foundational tasks before story tasks.
- Include polish/cross-cutting tasks at the end.
- Include verification task(s) appropriate for the project, not fake test tasks.

For UI tasks:
- Trace to DESIGN.md, design tokens, Figma context, screenshots, or explicit visual spec.
- Include states: loading, empty, error, disabled, responsive, accessibility.
- If design ground truth is missing, add a design-sync/spec clarification task first.

## Coverage check (mandatory before READY)

After generating tasks, verify:
- Every functional requirement (FR-N) and user story (US-N) from `01-product-requirements.md` maps to at least one task. List uncovered FRs as `[CRIT] FR-N has no task`.
- Every task has a verification step — command, assertion, or observable. No task ends with "implement X" without a check.
- Dependency order is valid: no task's `Depends on` points to a later task ID.

## Done-definition

Task list is READY when:
- Every FR and US has task coverage (zero uncovered).
- Every task has: file path, verification step, dependency declaration.
- Dependency order is valid.
- No task relies on hidden context — a fresh agent must be able to execute it without asking follow-up questions.
