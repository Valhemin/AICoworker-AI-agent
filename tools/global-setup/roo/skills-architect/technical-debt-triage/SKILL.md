---
name: technical-debt-triage
description: Triage accumulated technical debt against delivery pressure — impact/effort scores and Now/Next/Batch/Accept/Spike decisions.
---

TRIGGER: debt has accumulated to the point of slowing delivery, or before committing roadmap space to a refactor request
OUTPUT: report — triage table with impact/effort scores, decisions (Now/Next/Batch/Accept/Spike), owner assignments
SKIP: individual cleanup tasks that don't need prioritization against delivery pressure

---

# Technical Debt Triage

## Trigger Patterns

- "We're slowing down — too much tech debt"
- "Should we refactor [X] before adding [feature]?"
- "Prioritize these cleanup tasks"
- "We keep hitting the same broken area"
- Pre-roadmap checkpoint where debt risk needs to be assessed

## Workflow

### Phase 1 — Inventory

List all known debt items. For each:

| Item | Area | Type | Discovery source |
|---|---|---|---|
| [description] | [file/module/system] | [category below] | [incident / code review / dev complaint] |

Debt categories:
- **Structural** — wrong abstraction, tight coupling, missing boundaries.
- **Test** — untested critical paths, brittle tests, missing coverage.
- **Performance** — known bottlenecks not yet urgent.
- **Security** — known vulnerability or outdated dependency.
- **Compliance** — licensing, data handling, accessibility gaps.
- **Ops** — missing observability, fragile deploy, manual steps.
- **Docs** — missing or wrong specs, no onboarding path.

### Phase 2 — Score Each Item

Score on two axes (1–3 each):

**Impact if unaddressed**:
- 3 — Blocks features, causes incidents, or creates security/compliance risk.
- 2 — Slows delivery or causes recurring bugs.
- 1 — Cosmetic or low-traffic area.

**Effort to fix**:
- 1 — Hours (one subtask, no risk).
- 2 — Days (one sprint slot, moderate risk).
- 3 — Weeks (dedicated milestone, high coordination needed).

Priority = Impact ÷ Effort (higher = do sooner). Items with Impact 3 + Effort 1 are **always** top priority regardless of score.

### Phase 3 — Triage Decision

For each item, assign one of:

- **Now** — must fix before next milestone; blocks delivery or is a security issue.
- **Next sprint** — schedule as a named task alongside feature work.
- **Batch** — group with similar items into a dedicated refactor slot.
- **Accept** — acknowledge and document; not worth the cost to fix now.
- **Spike first** — unknown scope; delegate a time-boxed spike (≤1 day) before scheduling.

### Phase 4 — Output

Produce a triage table:

| Item | Category | Impact | Effort | Priority | Decision | Owner |
|---|---|---|---|---|---|---|

Then:
- **Now** items: create subtasks and delegate immediately.
- **Next sprint** items: add to `delivery-roadmap` as named slots.
- **Batch** items: propose a dedicated refactor milestone if batch total > 3 days effort.
- **Accept** items: document in `docs/tech-debt-log.md` with rationale and review date.

## Rules

- Never triage debt in isolation from delivery pressure. State the tradeoff: "fixing X delays milestone Y by Z days."
- Never defer a Security or Compliance item to "Accept" without explicit user/stakeholder sign-off.
- Debt that caused an incident in the last 30 days is automatically Impact 3.

## Feed Into

- `delivery-roadmap` — Now and Next Sprint items become named milestones or slots.
- `lead-decomposition` — Batch refactors become decomposed subtasks.
- `retrospective-postmortem` — Debt identified in postmortems feeds back here.
