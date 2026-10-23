---
name: state-management-patterns
description: State management patterns for any frontend stack — layers, async state, derived state, normalization. Use when adding or restructuring client state.
---

TRIGGER: adding a new data domain to client state, introducing a store, implementing derived state, or resolving stale/over-fetching bugs
OUTPUT: detailed — state layer chosen, data shape, async state model, selectors/derivations, cleanup path
SKIP: server state fully managed by a data-fetching library — prefer that library's cache over manual store patterns for remote data

---

## Step 0 — Check current stack's recommended patterns (REQUIRED)

Before applying any pattern, search for the **current recommended state management approach** for the project's specific stack and framework version. Library recommendations shift often (e.g. Context fell out of favor, then came back with React Server Components changing the picture again).

Search: `"[framework] state management best practices 2026"` or `"[framework] [version] recommended state library"`

Use what the project already has before introducing anything new.

---

## State Layer Decision (framework-agnostic)

Before reaching for a shared store:

1. **Component-local state** — default. If only one component needs it, keep it there.
2. **Lifted state** — when sibling components share data. Lift to nearest common parent.
3. **Context / DI / service** — for low-frequency global data (auth user, theme, locale). Not for high-frequency updates.
4. **External store** — when data is shared across many unrelated components, persists outside the UI tree, or needs complex derived state with selectors.
5. **Server/data-fetching cache** — remote data belongs in a data-fetching layer (not a client store). Duplicating server cache in a store causes stale data bugs.

Never reach for a store to avoid prop-drilling when lifting state or a context/service would work.

---

## Universal Rules (apply to any stack)

**Structure:**
- Normalize relational data — store entities by ID, not nested arrays
- Keep store slices flat — deeply nested state is hard to update correctly
- Separate server cache from UI state — they have different lifecycles

**Derived state:**
- Derive, don't duplicate — if a value can be computed, compute it; never store it separately
- Memoize expensive derivations
- Selectors/computed values must be pure — no side effects, no async

**Async state shape:**
Model every async operation with an explicit status discriminant — not separate boolean flags:
```
{ status: 'idle' | 'loading' | 'success' | 'error', data?, error? }
```
Boolean `isLoading + error + data` as three separate fields allows impossible states.

**Safety:**
- Never mutate state directly — always produce new references
- Never store non-serializable values (functions, class instances, promises) in shared store
- Always handle the error state in UI — never render only the happy path
- Clean up / reset state on unmount when data is component-scoped

---

## Checklist per State Domain

- [ ] Is this state actually shared, or can it be local?
- [ ] Is remote/server data handled by a data-fetching layer, not a manual store?
- [ ] Is relational data normalized (no nested arrays of objects with IDs)?
- [ ] Is async state modeled with a status discriminant?
- [ ] Are derived values computed, not duplicated?
- [ ] Is there a reset/cleanup path on unmount or navigation away?

---

## Output Contract

- State layer chosen and reason
- Data shape / schema
- Async state handling approach
- Derivations/selectors added and what they compute
- Any existing state reused or consolidated
- Library used (if any) — note version and why it's current recommendation for this stack
