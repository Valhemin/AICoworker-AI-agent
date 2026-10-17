---
name: writing-plans-superpowers
description: "Write implementation plans that are concrete, small, verifiable, and low-ambiguity."
---

TRIGGER: after a design/spec is accepted, to write a concrete verifiable implementation plan with slices
OUTPUT: detailed — per-slice: scope, exact file paths, dependencies, ACs, verify command, rollback notes for destructive slices
SKIP: before architecture decision exists; never write a plan without a committed architecture

---

## Plan slice format

```
### S[N]: [name]
Scope: [one sentence — what this delivers]
Files: [exact paths]
Depends on: [S-IDs or "none"]
AC: [from requirements doc — Given/When/Then or metric]
Verify: [exact command or observable]
Rollback: [how to revert — required for DB migrations, infra, auth, data changes]
```

## Done-definition

Plan is READY when:
- Every slice has exact file paths (not "somewhere in auth").
- Every slice has a runnable or observable verification step.
- All destructive/migration slices have rollback notes.
- Slice order is dependency-valid.
- ACs trace back to requirement IDs.
- Out-of-scope boundary is stated explicitly.

Tasks should be small enough to review independently. Another agent must be able to execute each slice without asking follow-up questions.
