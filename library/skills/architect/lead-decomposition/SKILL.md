---
name: lead-decomposition
description: "Split an existing spec or plan into independently delegatable subtasks ordered by dependency across 2+ modes."
---

TRIGGER: spec or plan exists and must be split into independently delegatable subtasks spanning 2+ modes
OUTPUT: detailed — subtasks ordered by dependency, each with goal, context, constraints, ACs, verification, artifact destination
SKIP: small single-mode tasks that don't need decomposition; use project-kickoff if no spec exists yet

---

# Lead Decomposition + Delegation

Use `project-kickoff` first if no spec exists yet.

## Subtask requirements

Each subtask must be independently understandable, verifiable, dependency-ordered, and small enough to complete without flooding context.

## Mode selection

- Architect Pro: requirements, docs, architecture, UX, API/data planning
- Implement Pro: scoped implementation and tests
- Debug Pro: failing tests, runtime errors, unknown breakages

## Delegation prompt — required fields

1. Objective (one sentence)
2. Relevant files and context
3. Constraints and out-of-scope items
4. Acceptance criteria
5. Verification command or manual check
6. Artifact destination (where output lands)
7. Required summary format:
   ```
   - changed files: [list or "none"]
   - checks run: [commands]
   - result: pass / fail / partial
   - risks: [list or "none"]
   - next step: [recommendation for lead]
   ```

## Before delegating — state

- How many subtasks, in what order
- Which run in parallel vs. must be sequential
- What the synthesis will look like

## After subtasks return

Collect all summaries → produce synthesis table (see coordination contract). Do not relay raw. Make a decision. State next action.

## Partial failure

Record `failed`/`partial` in synthesis, check downstream impact, propose: retry / Debug Pro / defer and continue unblocked.
