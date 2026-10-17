# UI Orchestrator Workflow Reference

## Mode Detection (run first)

```
Existing UI code in src/ AND user says "fix UI", "improve UI", or similar
  → EXISTING PROJECT MODE

No UI code, OR user says "new project", "build from scratch", or similar
  → NEW PROJECT MODE

Unsure → ask user
```

## Existing Project Mode (A0–A7)

```
Phase A0  Preflight         → node scripts/preflight.mjs
Phase A1  Extract           → node scripts/audit-existing.mjs --phase extract
Phase A2  Audit             → node scripts/audit-existing.mjs --phase audit
Phase A3  Report & Scope    → present audit-report.md, ask for scope approval
Phase A4  Approve           → node scripts/state.mjs set auditDone true
Phase A5  Targeted Fix      → Impeccable targeted commands (scope-specific)
Phase A6  Taste Overlay     → Taste skill (optional, constrained by default)
Phase A7  QA                → Impeccable critique+audit + validate-design.mjs
```

## New Project Mode (0–8)

```
Phase 0  Preflight        → node scripts/preflight.mjs
Phase 1  Product Context  → PRODUCT.md (Impeccable init if missing)
Phase 2  Resolve Dials    → node scripts/resolve-dials.mjs
Phase 3  UI UX Pro Max    → node scripts/run-uipro.mjs
Phase 4  Bridge           → node scripts/bridge-design.mjs
Phase 5  Design Lock      → node scripts/state.mjs set designApproved true  (after user review)
Phase 6  Implement        → Impeccable: shape → craft → critique
Phase 7  Taste Overlay    → Taste skill (mode from DESIGN.md)
Phase 8  QA               → Impeccable: critique + audit + validate-design.mjs
```

## Existing Mode — Scope Options

| Scope key | What it covers |
|---|---|
| `fix-a11y` | Contrast, focus states, form labels, keyboard nav |
| `fix-token-drift` | Replace hardcoded hex/px with DESIGN.md tokens |
| `fix-responsive` | Mobile/tablet breakpoint issues |
| `fix-ux-copy` | Labels, empty states, error messages (`impeccable clarify`) |
| `fix-ux-flow` | Task path too long, navigation unclear, missing shortcuts |
| `fix-empty-states` | Empty screens with no guidance (`impeccable onboard`) |
| `fix-error-states` | Error/loading states missing or unhelpful (`impeccable harden`) |
| `fix-cognitive-load` | Screen overloaded, progressive disclosure missing |
| `fix-consistency` | Same action different pattern across pages → extract shared component |
| `taste-overlay` | Visual polish without structure changes (`constrained`) |
| `full-redesign` | Re-runs Phase 2–5 of new project mode with existing PRODUCT.md |

**Auto-scope logic (autonomousMode: true):**
- Always include: `fix-a11y`, `fix-token-drift`
- Include if found in audit: `fix-ux-flow`, `fix-empty-states`, `fix-error-states`, `fix-consistency`
- Include if visual issues found: `taste-overlay` (constrained only)
- Never auto-include: `full-redesign`

## State Keys

```json
{
  "mode": "new | existing",
  "productContextDone": false,
  "designApproved": false,
  "auditDone": false,
  "auditScope": ["fix-a11y", "fix-token-drift"],
  "tasteMode": "constrained",
  "dials": {
    "DESIGN_VARIANCE": 6,
    "MOTION_INTENSITY": 5,
    "VISUAL_DENSITY": 5,
    "source": "default"
  },
  "phases": {
    "preflight": { "status": "pending|running|done|skipped|failed" }
  }
}
```

## Guard Rules (hard)

| Condition | Action |
|---|---|
| `PRODUCT.md` exists | Skip Impeccable init. Read it. |
| `DESIGN.md` exists + `designApproved: true` | Skip bridge. Skip UI UX Pro Max. |
| `mode = existing` + no `auditDone` | Do not start fixes. Run audit first. |
| `mode = existing` + no `auditScope` approved | Do not start fixes. Get scope approval. |
| No redesign keyword in request | Do not run UI UX Pro Max. Do not change visual direction. |
| Taste conflicts DESIGN.md | DESIGN.md wins. |
| Visual rule conflicts a11y | Accessibility wins. |
| `auditScope` does not include `full-redesign` | Fix in-scope items only. Do not refactor unrelated components. |

## Taste Mode Selection

| Product type | Default mode |
|---|---|
| B2B dashboard, developer tool | constrained |
| Consumer SaaS | constrained |
| Landing page, portfolio | full (if requested) |
| Regulated, accessibility-critical | off |

`full` is never the auto-default — must be explicitly set or triggered by product type match.

## Re-running Phases

### Partial re-run (no redesign)
Safe to re-run: Phase 0, Phase 2, Phase 8.

### Redesign request
When user says "redesign" or "update design direction":
```
node scripts/state.mjs set designApproved false
```
Then re-run Phase 2 → 3 → 4 → 5.

### PRODUCT.md update
After manual edit to PRODUCT.md:
Re-run Phase 2 (re-resolve dials from updated product context).

## Idempotency Notes

- Phase 3 (run-uipro): re-running overwrites `uipro-output.json`. Guard prevents it if `designApproved: true`.
- Phase 4 (bridge): user-owned sections in DESIGN.md are never overwritten. `<!-- auto-generated -->` sections regenerate.
- Phase 5 (lock): only flips `designApproved`. Idempotent.
- Phase 6 (Impeccable): Impeccable tracks its own session state in `.impeccable/`. Safe to re-run.

## Artifacts at Each Phase

| After phase | New artifacts |
|---|---|
| Phase 1 | `PRODUCT.md` |
| Phase 2 | `.ui-orchestrator/state.json` (dials populated) |
| Phase 3 | `design-system/<project>/MASTER.md`, `.ui-orchestrator/uipro-output.json` |
| Phase 4 | `DESIGN.md` |
| Phase 5 | `state.json` (`designApproved: true`) |
| Phase 6 | Implementation files, `.impeccable/critique/` |
| Phase 8 | QA report in `.impeccable/critique/` |
