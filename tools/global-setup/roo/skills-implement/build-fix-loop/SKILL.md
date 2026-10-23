TRIGGER: build, typecheck, lint, or tests fail during implementation
OUTPUT: compact — first meaningful failure extracted, smallest fix applied, focused check re-run until pass
SKIP: silencing errors by deleting assertions, weakening types, or broad try/catch

---

# Build Fix Loop

## Workflow

1. Extract the first meaningful failure signal, not the whole log.
2. Identify the changed files and likely owner scope.
3. Fix the smallest cause that explains the failure.
4. Re-run the focused check.
5. Repeat until the focused check passes or a blocker is proven.
6. Run the broader check only after focused checks pass.

## Rules

- Do not silence errors by deleting assertions, weakening types, or broad try/catch.
- Do not chase unrelated failures unless they block the current scope.
- Do not report success until the relevant command actually passes.
