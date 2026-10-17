---
name: ui-orchestrator
description: "Orchestrate UI/UX Pro Max → Impeccable → Taste. Two modes: new project (full pipeline) and existing project (audit-first, targeted fix). Single source of..."
---

TRIGGER: any UI/UX task — new project, new feature with UI, redesign, fix existing UI, Figma-to-code, or explicit /ui-orchestrator command
OUTPUT: PRODUCT.md, DESIGN.md, implementation or targeted fix, QA audit report
SKIP: pure backend with zero UI, CLI-only tools, infrastructure

---

## Mode Detection — Run First

Before any phase, detect which mode to use:

```
IF src/ or existing UI code present AND user says "fix", "improve", "redesign existing", "update UI"
  → EXISTING PROJECT MODE (phases A0–A7 below)

IF no existing UI code OR user says "new project", "build from scratch"
  → NEW PROJECT MODE (phases 0–8 below)

IF unsure → ask: "Does the project already have UI, or are we building from scratch?"
```

Set `state.mode = "existing" | "new"` before proceeding.

Also detect autonomous mode — use **semantic intent**, not exact phrase matching:

```
autonomousMode = true  when the user's message conveys ANY of:
  • Delegating judgment to the agent
      "you decide", "your call", "use your best judgment",
      "pick the best option", "handle it yourself"
  • Skipping confirmation / approval
      "auto", "just do it", "go ahead", "no approval needed",
      "don't ask", "proceed without asking", "skip confirmation"
  • Granting autonomy broadly
      "full authority", "handle it all", "take over",
      "handle it yourself", "use your best judgment"

autonomousMode = false (default) when:
  • User asks for options, review, or recommendations first
  • User says "show me first", "let me review", "wait for my approval",
    "suggest then I choose"
  • Message is ambiguous — default to false, ask once
```

Signal is **intent-level**: if the message clearly means "you decide and proceed", set `autonomousMode = true` — even if none of the example phrases match exactly.

`autonomousMode` only removes confirmation gates (A3/A4, Phase 5 design lock). Preflight failures still block — the agent cannot fix missing dependencies.

---

## EXISTING PROJECT MODE (A0–A7)

Use when: fixing, improving, or redesigning UI in an existing codebase.

### Phase A0 — Preflight (same as Phase 0)

Run `node scripts/preflight.mjs`. Fix any failures before continuing.

### Phase A1 — Extract Current Design System

Run `node scripts/audit-existing.mjs --phase extract`.

This runs:
```
npx impeccable extract   ← scans codebase, captures current tokens/components
```

Produces `.ui-orchestrator/extracted-design.json` with:
- Colors found in codebase (CSS vars, Tailwind config, hardcoded hex)
- Typography (font-family, font-size scales)
- Spacing scale
- Component patterns detected

If `DESIGN.md` does not exist: generate a draft from extracted data (reverse bridge).
Guard: if `DESIGN.md` exists → do NOT overwrite it. Compare extracted vs declared — flag drift.

### Phase A2 — Audit Existing UI + UX

Run `node scripts/audit-existing.mjs --phase audit`.

Runs in sequence:
```
npx impeccable critique   ← UX heuristics (hierarchy, clarity, consistency)
npx impeccable audit      ← a11y + perf + responsive technical checks
npx impeccable            ← deterministic detector (59 rules)
node scripts/validate-design.mjs  ← token drift vs DESIGN.md
```

Additionally, perform UX flow analysis inline (no extra tool needed):

**UX Flow Audit — check each:**
- **Task completion:** can a user complete the primary task (from `PRODUCT.md`) in ≤3 steps without reading docs?
- **Error recovery:** do error states tell users what went wrong AND what to do next?
- **Empty states:** do empty states explain what goes here and how to populate it?
- **Navigation clarity:** can users always tell where they are, where they came from, and where they can go?
- **Loading feedback:** are all async operations covered with visible loading states?
- **Form UX:** labels visible, validation inline (not on submit-only), success confirmation shown?
- **Cognitive load:** does any screen require users to hold >7 items in memory simultaneously?
- **Progressive disclosure:** are advanced settings hidden by default? Core flow unblocked?
- **Consistency:** same action = same UI pattern across all pages/tabs?
- **Mobile UX:** touch targets ≥44px, no hover-only interactions, back navigation works?

Produces `.ui-orchestrator/audit-report.md` with:
- UX flow issues (severity: critical / major / minor)
- Visual/design problems
- Design token drift
- A11y violations
- Consistency issues across components

### Phase A3 — Report & Scope

Check `state.autonomousMode`:

**If `autonomousMode: true`** (user said "auto", "just do it", "no approval needed", or similar):
→ Select scope automatically using this rule:
  - All `critical` issues → always include
  - `major` issues → include
  - Token drift → always include (`fix-token-drift`)
  - Taste overlay → include only if audit found visual consistency issues
  - Full redesign → never auto-select; requires explicit user request
→ Set `auditScope` in state, log the decision: "Auto-selected scope: [list]. Proceeding."
→ Skip Phase A4 entirely. Proceed directly to Phase A5.

**If `autonomousMode: false` (default):** present `audit-report.md` to user and ask:

> "Found [N] issues. Which to fix?
> 1. Fix all critical + major
> 2. Fix critical only
> 3. Visual upgrade (Taste overlay)
> 4. Specific scope: [user describes]
> 5. Full redesign (switches to new project mode for design direction)"

Save chosen scope to `.ui-orchestrator/state.json` under `auditScope`.
Do NOT start fixing until user approves scope.

### Phase A4 — Approve Scope

Skip entirely if `autonomousMode: true`.

After user confirms: `node scripts/state.mjs set auditDone true`

Record scope in state:
```json
"auditScope": ["fix-a11y", "fix-token-drift", "taste-overlay"]
```

### Phase A5 — Targeted Fix

Use Impeccable targeted commands based on approved scope:

| Scope item | Action |
|---|---|
| UX copy, label clarity | `npx impeccable clarify` |
| Empty states, onboarding flow | `npx impeccable onboard` |
| Edge cases, error/loading states | `npx impeccable harden` |
| Spacing, rhythm, visual balance | `npx impeccable polish` |
| Responsive issues | `npx impeccable adapt` |
| A11y, contrast, focus | `npx impeccable audit` → fix inline |
| Token drift | Replace hardcoded values with DESIGN.md tokens |
| Full visual upgrade | `npx impeccable bolder` or `quieter` based on DESIGN.md |
| Task flow too long (>3 steps) | Restructure navigation or add shortcut path — no tool, implement directly |
| Cognitive overload | Split screen/modal, add progressive disclosure — implement directly |
| Inconsistent patterns across pages | Extract to shared component + apply everywhere (DRY sweep) |
| Missing loading/error states | Add inline — follow DESIGN.md `## Interaction States` |

Rules:
- Follow DESIGN.md tokens — do NOT introduce new colors, fonts, or spacing values.
- Fix scope only. Do not refactor unrelated components.
- After each targeted fix: re-run `npx impeccable critique` to confirm improvement.

**If user chose "Full redesign" (option 5 in Phase A3):**
→ Set `state.designApproved = false`, `state.mode = "new"`
→ Jump to Phase 2 of New Project Mode (Resolve Dials) — skip Phase 1 if PRODUCT.md exists.

### Phase A6 — Taste Overlay (optional)

Only if `auditScope` includes `taste-overlay` or user explicitly requests visual upgrade.

Same rules as Phase 7 in New Project Mode:
- Read `DESIGN.md` `## Agent Design Controls` for Taste mode.
- Pass dials from DESIGN.md — not Taste baseline `8/6/4`.
- `constrained` mode only for dashboards, SaaS, developer tools.
- No new tokens, no UX architecture changes, no a11y regressions.

### Phase A7 — QA (same as Phase 8)

```
npx impeccable critique
npx impeccable audit
node scripts/validate-design.mjs
```

Manual checks: keyboard nav, focus states, contrast, responsive, token drift.
Do not declare done until QA passes.

### Existing Mode Quick Reference

| Phase | Action | Guard |
|---|---|---|
| A0 Preflight | preflight.mjs | Always |
| A1 Extract | audit-existing.mjs --phase extract | Creates DESIGN.md draft if missing |
| A2 Audit | audit-existing.mjs --phase audit | Produces audit-report.md |
| A3 Report | Present to user | Wait for scope approval |
| A4 Approve | state.mjs set auditDone true | User must confirm |
| A5 Fix | Impeccable targeted commands | DESIGN.md tokens only |
| A6 Taste | Taste skill (optional) | constrained by default |
| A7 QA | Impeccable + validate-design.mjs | Must pass |

---

## NEW PROJECT MODE (phases 0–8)

Use when: building UI from scratch, or after user chooses "Full redesign" from existing mode.

---

## Core Contracts

- `DESIGN.md` at project root = single source of truth. Every agent reads it; no agent recreates it.
- One design director per phase. UI UX Pro Max owns direction (Phase 3). Impeccable owns implementation (Phase 6). Taste is additive-only (Phase 7).
- State lives in `.ui-orchestrator/state.json`. Check state before each phase — never repeat completed phases without explicit redesign request.
- Idempotent: if `PRODUCT.md` exists → skip init. If `DESIGN.md` exists → skip bridge. If `designApproved: true` → skip UI UX Pro Max.

## Precedence Order

```
User requirements
> Accessibility + platform conventions
> PRODUCT.md
> DESIGN.md
> Page-specific override
> Impeccable rules
> Taste rules
> UI UX Pro Max raw output
> Model defaults
```

## Phase 0 — Preflight

Run `node scripts/preflight.mjs` from the skill directory.

Checks (report pass/fail per item — do NOT auto-install):
- Node.js ≥ 18
- Python 3 available
- `uipro` CLI installed (`uipro --version`)
- UI UX Pro Max skill path discoverable (`UIPRO_ROOT` env or `.claude/skills/ui-ux-pro-max/`)
- Impeccable installed (`npx impeccable --version` or local)
- Taste skill installed (`npx skills list | grep design-taste-frontend`)
- `.ui-orchestrator/` directory writable

If any check fails: report which item failed + install command. Do NOT proceed to Phase 1. Ask user to resolve and re-run.

## Phase 1 — Product Context

Read `.ui-orchestrator/state.json`. Check `productContextDone`.

**If `PRODUCT.md` exists:** read it, set `productContextDone: true`, proceed.

**If `PRODUCT.md` missing:** run Impeccable init workflow:
```
Read Impeccable SKILL.md, then run: npx impeccable init
```
Impeccable init creates `PRODUCT.md` only. Guard: do NOT let Impeccable create or touch `DESIGN.md` here.
After init completes, set `productContextDone: true` in state.

## Phase 2 — Resolve Design Controls

Run `node scripts/resolve-dials.mjs`.

Resolve `DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY` via priority chain:

1. User-specified values in current session
2. Existing values in `DESIGN.md` (`## Agent Design Controls` section)
3. Product-type preset from `PRODUCT.md` keywords:
   ```
   B2B dashboard       → 4 / 3 / 8
   Developer tool      → 5 / 4 / 7
   Consumer SaaS       → 6 / 5 / 5
   Landing page        → 7 / 6 / 4
   Creative portfolio  → 9 / 8 / 3
   Regulated product   → 3 / 2 / 6
   Documentation       → 4 / 2 / 6
   ```
4. Infer from `PRODUCT.md` text (audience, vibe words, constraints)
5. Default: `6 / 5 / 5`

Persist resolved values to `.ui-orchestrator/state.json` under `dials`. Report which source was used.

## Phase 3 — UI UX Pro Max (design direction)

**Guard:** if `state.designApproved === true` → skip this phase entirely. Report skipped.

Run `node scripts/run-uipro.mjs`. This script calls:
```bash
python3 "$UIPRO_ROOT/scripts/search.py" \
  "$DESIGN_QUERY" \
  --design-system \
  --persist \
  --json \
  --variance "$VARIANCE" \
  --motion "$MOTION" \
  --density "$DENSITY" \
  -p "$PROJECT_NAME" \
  --output-dir "$PROJECT_ROOT" \
  > .ui-orchestrator/uipro-output.json
```

Outputs: `design-system/<project>/MASTER.md` + `.ui-orchestrator/uipro-output.json`

`DESIGN_QUERY` = distilled from `PRODUCT.md`: product type + industry + 3–5 keywords max.
Do not use Markdown output as primary source — use JSON (`uipro-output.json`) for bridge.

## Phase 4 — Bridge to DESIGN.md

**Guard:** if `DESIGN.md` exists and `state.designApproved === true` → skip. Report skipped.

Run `node scripts/bridge-design.mjs`.

Bridge reads `uipro-output.json` → writes root `DESIGN.md` with sections:
```
# Design System
## Product Mode
## Design Intent
## Agent Design Controls
## Color
## Typography
## Spacing and Density
## Shape and Elevation
## Motion
## Layout
## Components
## Interaction States
## Responsive Behavior
## Accessibility
## Do and Do Not
## Provenance
```

`## Agent Design Controls` must contain:
```markdown
- DESIGN_VARIANCE: <value>
- MOTION_INTENSITY: <value>
- VISUAL_DENSITY: <value>
- Surface mode: <Persuade|Operate|Read|Experience>
- Taste activation: <off|constrained|full>
```

`## Provenance` must record:
```markdown
- input_hash: <sha256 of uipro-output.json>
- bridge_version: <semver>
- generated_at: <ISO timestamp>
- source: ui-ux-pro-max@<version>
```

Merge behavior:
- If `DESIGN.md` already exists with manual edits → merge section-by-section. Never overwrite a section unless it has no content or is marked `<!-- auto-generated -->`.
- Sections without `<!-- auto-generated -->` comment = user-owned, skip silently.

After bridge: prompt user to review `DESIGN.md`. Do NOT auto-approve.

## Phase 5 — Design Lock

**If `autonomousMode: true`:** skip confirmation. Auto-approve `DESIGN.md` and proceed.
`node scripts/state.mjs set designApproved true` → log: "Auto-approved design direction. Proceeding to Phase 6."

**If `autonomousMode: false`:** show user `DESIGN.md` diff. Ask: "Approve design direction? (yes / edit / skip)"
On approval: `node scripts/state.mjs set designApproved true`

Once approved (either path):
- No UI UX Pro Max re-run without explicit `redesign` keyword in request.
- No palette, typography, or visual direction changes.
- Style changes require user to say "redesign" or "update design direction".

## Young User Contract (applies to ALL phases)

**Full spec:** `references/young-user-standard.md` — read it before implementing any UI.

Quick enforcement rules active in every phase:

### Content & Copy
- Button text = verb + outcome. Never single-word ("OK", "Submit", "Next").
- Error = what happened + why + what to do next (3 parts, 1 sentence each).
- Empty state = invitation with CTA, not absence ("Nothing here yet — add your first one?").
- Loading = progress description, not "Loading..." ("Searching...", "Almost there...").
- Banned words in any user-facing copy: "seamless", "powerful", "robust", "welcome to [app]", "an error has occurred".
- Headline ≤6 words. Subtext ≤15 words. If longer → cut.

### Interaction Feel
- **100ms rule:** every tap/click → visible feedback within 100ms, even if async takes 3 seconds.
- **Optimistic UI default:** update UI before server confirms. Rollback only on error.
  - Exception: financial transactions, irreversible destructive → wait for confirm.
- **Gesture-native (mobile):** swipe-right = positive/back, swipe-left = delete/archive, pull-down = refresh, long-press = context menu.

### Dark Mode (non-optional)
- Implement from day 1 using CSS custom properties — never hardcode `#FFF` or `#000` in components.
- Respect `prefers-color-scheme` by default. Provide manual toggle.
- Same hue, adjusted lightness for dark variant of accent color — not a new color.
- Shadows → replace with border/inner glow in dark mode.

### Perceived Performance
- **Skeleton over spinner** when layout shape is known (cards, list rows, profiles).
- **Spinner only** when duration + layout are unknown. Show "taking longer..." after 3s silence.
- **Shimmer/wave animation** on skeletons (not pulse).
- Never show skeleton for < 300ms — use suspense threshold.
- Progress bar for known-duration operations (upload, export, processing).
- Celebrate success — micro-animation on completion (checkmark draw, subtle confetti for big moments).

### First-Run & Onboarding
- **No tutorial gates.** Never block feature access behind a walkthrough.
- **Empty state = onboarding:** show greyed-out preview of what full state looks like + single CTA.
- **Value before sign-up:** let user do something real before requiring account creation.
- **Feature discovery:** tooltip on first encounter only, max 1 at a time, auto-dismiss after 5s.

### Animation
Read `references/young-user-standard.md` `## Animation & Motion` for full library selection.

Quick rules:
- Web/Electron: **Motion (Framer Motion)** for layout/gesture/page transitions, **GSAP** for scroll-driven.
- Mobile RN: **React Native Reanimated** for all animations.
- Duration: micro=80–120ms, navigation=200–280ms, sheet enter=300–380ms, sheet exit=200–250ms.
- Animate only `transform` + `opacity`. Never `width`, `height`, `top`, `left`.
- Every animation needs `prefers-reduced-motion` fallback.
- If animation removes meaning when removed → it's decoration, cut it.

### Anti-Generic Architecture
Never default to: sidebar nav + header + dashboard with 4 metric cards + table.

Pick the right pattern for the product type:
- **Content/social app** → Feed / timeline, bottom tab nav, card stack
- **Tool/productivity** → Command palette (Cmd+K), split-view live preview, contextual settings
- **Data/analytics** → Bento grid (variable cells), not uniform card grid
- **Mobile app** → Bottom sheets over modals, thumb-zone CTA placement, swipe-native
- **Desktop app** → Command-first, floating island toolbar, expandable panels

Before implementing any page layout: ask "Is there a fresher pattern that fits this content better than a standard grid?" If yes → use it.

### Anti-Patterns — Block Before Ship
Before marking any feature done, confirm none of these exist:
- 3 equal-width cards in a row as primary layout
- AI-purple + white card + gradient button (the default SaaS look)
- Split-header hero
- Sidebar + header + content as the entire app structure
- Spinner where skeleton would work
- Modal where bottom sheet would work (mobile)
- Any banned copy phrase
- Hardcoded hex in components (always use DESIGN.md tokens)
- No `prefers-reduced-motion` fallback
- Tutorial gate before first interaction

---

## Phase 6 — Implement with Impeccable (UI + UX)

Read Impeccable SKILL.md. Read `PRODUCT.md`. Read `DESIGN.md`. Then run Impeccable workflow:

```
npx impeccable shape    ← information architecture + wireframe plan
npx impeccable craft    ← full implementation
npx impeccable critique ← UX heuristic review
```

Before writing any UI code, validate UX flow:

**UX Flow Checklist (resolve before implementing):**
- Primary task from `PRODUCT.md` completable in ≤3 steps from landing screen?
- Navigation: user always knows where they are (active state, breadcrumb if deep)?
- Every async action has: loading state → success state → error state?
- Every empty state has: explanation + call-to-action?
- Forms: label above field, inline validation, clear submit feedback?
- Destructive actions (delete, reset): require confirmation?
- Mobile: all flows completable with one thumb, no hover-only interactions?

If any item fails during `impeccable shape` → fix IA before proceeding to `craft`.

Impeccable is design authority here. It must:
- Follow tokens and direction from `DESIGN.md` — do NOT derive new design direction.
- Implement all states: loading, empty, error, disabled, hover, focus.
- Implement responsive: mobile ≤768px, tablet 768–1280px, desktop >1280px.
- NOT create or modify `DESIGN.md`.

If Impeccable output conflicts with `DESIGN.md` → `DESIGN.md` wins. Adjust Impeccable output to match.

## Phase 7 — Taste Overlay

**Skip if:** product is B2B dashboard, developer tool, or has `accessibilityCritical: true` in state → use `constrained` or `off`.

Determine mode from `DESIGN.md` `## Agent Design Controls`:
- `Taste activation: off` → skip this phase entirely.
- `Taste activation: constrained` → Taste adjusts art direction only.
- `Taste activation: full` → Taste applies full treatment (landing/portfolio only).

Read Taste SKILL.md (`design-taste-frontend`). Run `node scripts/resolve-dials.mjs --source design.md` to extract dials. Pass to Taste — do NOT use Taste baseline `8/6/4`.

**In `constrained` mode, Taste may only improve:**
- Typography hierarchy (weights, scale, contrast — within existing font choices)
- Spacing rhythm (within existing density setting)
- Visual composition (asymmetry, focal points — within existing layout)
- Anti-generic patterns (removing AI-purple, Inter defaults, 3-equal-cards)
- Micro-interactions (within motion intensity setting)

**Taste hard guards:**
- No new design tokens not in `DESIGN.md`.
- No UX architecture changes (navigation, flows, IA).
- No accessibility regressions.
- Conflict with `DESIGN.md` → `DESIGN.md` wins.
- Conflict with accessibility → accessibility wins.

## Phase 8 — QA

Run in sequence:
```
npx impeccable critique    ← UX heuristics
npx impeccable audit       ← a11y + perf + responsive technical checks
npx impeccable            ← deterministic detector (59 rules)
node scripts/validate-design.mjs  ← token drift check vs DESIGN.md
```

Manual checks:

**UX:**
- [ ] Primary task completable in ≤3 steps from entry screen
- [ ] Every async action has loading + success + error state
- [ ] Every empty state has explanation + action
- [ ] Error messages tell user what happened AND what to do next
- [ ] Destructive actions require confirmation
- [ ] Navigation: active state visible, user knows where they are
- [ ] No screen requires holding >7 items in memory (cognitive load)
- [ ] Advanced settings hidden by default (progressive disclosure)

**Accessibility + Visual:**
- [ ] Keyboard navigation through all interactive elements
- [ ] Focus states visible on all interactive elements
- [ ] Color contrast ≥4.5:1 for normal text, ≥3:1 for large
- [ ] `prefers-reduced-motion` respected for all animations
- [ ] Responsive at 375px, 768px, 1280px, 1440px
- [ ] No design token drift (colors/fonts/spacing not in `DESIGN.md`)

Do not declare complete if any QA item is unresolved. Fix → re-run QA → then complete.

## Quick Reference

| Phase | Tool | Guard |
|---|---|---|
| 0 Preflight | preflight.mjs | Always runs |
| 1 Product Context | Impeccable init | Skip if PRODUCT.md exists |
| 2 Resolve Dials | resolve-dials.mjs | Always runs |
| 3 Design Direction | UI UX Pro Max | Skip if designApproved |
| 4 Bridge | bridge-design.mjs | Merge, never overwrite manual sections |
| 5 Lock | state.mjs | Requires user approval |
| 6 Implement | Impeccable | Reads DESIGN.md, does not write it |
| 7 Taste | Taste skill | Mode from DESIGN.md; off/constrained/full |
| 8 QA | Impeccable + validate-design.mjs | Must pass before complete |
