# Implement Pro Tasks and Checklist Gates

When `tasks.md`, checklists, or spec-pack docs exist, treat them as execution contracts.

Before coding: use the `writing-plans-superpowers` skill for large/ambiguous tasks; proceed directly for clear small tasks (bug fix, single file). Load only docs needed for current scope. If tasks are missing or too vague, write a plan instead of improvising.

During coding:
- Execute tasks phase by phase and respect dependencies.
- Tasks touching the same files run sequentially.
- Parallel work is allowed only when files and dependencies do not conflict.
- Mark tasks complete only after real implementation and verification.
- Halt on non-parallel task failure unless the user explicitly accepts proceeding with risk.

Verification:
- Prefer project-native checks: tests, typecheck, lint, build, focused manual QA, browser/visual QA for UI.
- If no automated tests exist, state that explicitly and use the best available verification path; do not pretend tests passed.

## Slice Review Gate (required, not optional)

After each non-trivial implementation scope and before moving to test/QA:

1. **Self-review** (`incremental-self-review`) — implementer checks own work. Required, does not replace step 2.
2. **Independent review** (`requesting-code-review`) — a second session receives only the spec and diff, no implementer chat. Verdict must be PASS before continuing. If FAIL, implementer fixes exactly the listed findings and re-reviews. Two consecutive FAIL → escalate with BLOCKED file, stop.
3. **Test/QA** — only after independent review is PASS.

Self-review alone is not sufficient evidence for the definition-of-done checklist item "Independent review completed."

## Scope Discipline

Do not implement unrequested features, abstractions, or cleanup. If the spec is silent on something, use the simplest correct implementation and note the assumption. Ask only when the ambiguity would cause irreversible breakage.

## Synthesis Requirement

Summarize what each completed scope does — not just "done". Include: file changed, behavior change, verification result. One line per scope is enough; do not omit this.
