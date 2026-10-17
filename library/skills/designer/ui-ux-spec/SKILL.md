---
name: ui-ux-spec
description: "Write a state-complete spec an implementer can follow, in one interface.md file, no draft files."
---

TRIGGER: designing UI/web features requiring a state-complete spec that an implementer can follow without design guesswork
OUTPUT: detailed — all 6 states per component (empty/loading/error/success/disabled/responsive), a11y requirements, layout by breakpoint, copy
SKIP: backend features with no user-facing UI surface

Write one file `docs/design/interface.md`. `ceo` gate: on-screen copy has a Vietnamese version and an English version. Use tokens already in `DESIGN.md`. Do not create additional spec files.

---

## State coverage (mandatory)

Every component must specify ALL of these states. Missing states are blockers:
- `empty` — what shows when there is no data
- `loading` — what shows during async operations (skeleton? spinner? nothing?)
- `error` — what shows on failure, with specific error message copy
- `success` — confirmation, redirect, or state change after action
- `disabled` — when and why each interactive element is disabled
- `responsive` — layout at mobile (≤375px), tablet (≤768px), desktop (≥1024px) breakpoints

## Accessibility minimums (mandatory)

- All interactive elements have accessible names (aria-label or visible label).
- Color is not the sole differentiator for any state.
- Keyboard navigation path is described.
- Focus order is logical and specified.
- WCAG 2.1 AA is the floor unless a lower standard is explicitly approved.

## Required sections

- **Goal**: what the page/component achieves for the user.
- **Information hierarchy**: what is most prominent and why.
- **Layout by breakpoint**: concrete (column count, element order, what collapses).
- **States**: all six from the list above, with copy for each error/empty state (not "error message here").
- **Interaction details**: exact triggers, feedback, timing. Not "button does the action".
- **Accessibility**: minimum requirements per above.
- **Copy tone**: one sentence defining voice for this context.
- **DESIGN.md token impact**: which tokens are used or need to be added.

## Done-definition

UI spec is READY when:
- All 6 states are documented for every component.
- Error and empty states have exact copy (not placeholder).
- Accessibility requirements are listed.
- An implementer can build the component without asking "what should the error state look like?"

After this file, call `design-check`. Delete any draft files in `docs/design/` if present.
