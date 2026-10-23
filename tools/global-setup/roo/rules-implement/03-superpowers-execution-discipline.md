# Superpowers Execution Discipline

Implement from a written plan or create a short local plan before editing. Use the `executing-plans-batched` skill. If tests exist or are practical, use the `tdd-red-green-refactor` skill. When research is needed, use the `research-before-implement` skill.

Do not batch large unreviewed changes. Do not claim completion without verification evidence.

## Execution Sequence

**Small task (single file, obvious scope):** implement → verify → report. Skip state management.

**Large/multi-session task:**
```
1. Read .agent/state.json if exists — resume from last state
2. Read source-of-truth: spec.md / plan.md / tasks.md
3. Check hard blockers (missing creds, tool failure) — stop only for these
4. Implement smallest valid scope
5. Run validation scaled to risk (see debug rules verification scale)
6. Capture evidence (test output, exit code)
7. Update .agent/state.json
8. Report result + remaining risks
```

## Workflow State & Resume

For multi-session or long-running features, maintain `.agent/state.json` at the project root:

```json
{
  "schemaVersion": 1,
  "phase": "implement",
  "activeFeature": "feature-name",
  "activeSpec": "specs/feature/spec.md",
  "completedTasks": ["T001", "T002"],
  "pendingTasks": ["T003"],
  "blockedTasks": [],
  "lastValidatedCommit": "abc123",
  "qualityGateStatus": "partial",
  "approvals": {
    "dependencyInstall": false,
    "schemaChange": false,
    "ciChange": false
  },
  "openRisks": [],
  "nextAction": "Implement T003 — see specs/feature/plan.md"
}
```

Rules:
- Update state after each completed scope or phase.
- Do not mark a task complete without evidence.
- When resuming: read state, verify it matches current git status and repo. If they drift — stop, produce a reconciliation report before continuing.
- Do not delete state history to "clean up" — mark tasks `blocked` or `superseded` instead.

## Agent Command Interface

Do not guess the project's build tool, test runner, or package manager. If the project provides agent scripts, use them:

```
./scripts/agent/doctor        — verify environment is set up correctly
./scripts/agent/setup         — install dependencies and configure env
./scripts/agent/dev           — start local dev server
./scripts/agent/lint          — run linter
./scripts/agent/typecheck     — run type checker
./scripts/agent/test          — run all tests
./scripts/agent/test-unit     — run unit tests only
./scripts/agent/test-integration
./scripts/agent/test-e2e
./scripts/agent/build         — production build
./scripts/agent/validate      — run all required quality gates
./scripts/agent/security      — run security scan
./scripts/agent/a11y          — run accessibility audit
```

If these scripts do not exist: check `AGENTS.md` for the equivalent commands. If `AGENTS.md` is also absent: infer from `package.json` / `Makefile` / `Taskfile`, and flag in the completion output that `AGENTS.md` is missing.

Every script must:
- Return a correct exit code (0 = pass, non-zero = fail)
- Produce output sufficient for diagnosis on failure
- Be idempotent (safe to run multiple times)
- Fail loudly if required secrets are missing — not silently with partial results

## Never Do These

- Return with "I can't do X" without attempting and reporting what was tried.
- Ask the user a clarifying question when the answer can be inferred from code, spec, or conventions.
- Produce a plan or design doc when the task requested working code.
- Silently skip a subtask because it was hard — report it explicitly.

## Minimum Actionable Output

Every response where implementation occurred must include:
- At least one changed or created file path
- The verification command run and its exit status
- If nothing was changed: why, and what the user should do next
