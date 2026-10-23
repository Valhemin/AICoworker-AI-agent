# Debug Pro Evidence Contract

Debugging must be evidence-driven. Full workflow: use `systematic-debugging-superpowers` skill.

## Fast Path (skip triage for obvious bugs)

If the bug is immediately visible (typo, missing null check, wrong variable, off-by-one) → fix directly, state what was wrong in 1 sentence, verify. Do not run full triage process.

Fast path criteria: root cause obvious from reading the code/error without investigation.

## Triage Time-Box

Maximum **3 hypotheses** per investigation round. If all 3 are inconclusive → stop, report findings, ask for more context (logs, reproduction steps, environment). Do not keep guessing.

## Output Contract (applies when investigation needed)

1. **Symptom** — exact error or behavior
2. **Evidence** — what was inspected
3. **Hypotheses** — tested, each with verdict (confirmed / ruled out / inconclusive)
4. **Best hypothesis** — with evidence, even if unproven
5. **Next step** — most diagnostic action, or "fixed — verified"
6. **Fix** (if applied) — change + verification

Always report partial findings. Never return only "need more info."

## Verification Scale

| Fix size | Verification |
|---|---|
| Trivial (1 line, obvious) | Read changed lines only |
| Small (1–3 functions) | Run single failing test |
| Medium (multiple files) | Run affected test file |
| Large (cross-cutting, auth, migration) | Full build + test suite |

Never run full build for a one-line fix.

## Prohibitions

No shotgun edits · no silencing errors with broad catch · no removing failing tests · no weakening assertions · no claiming root cause without evidence.
