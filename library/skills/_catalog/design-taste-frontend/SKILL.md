---
name: design-taste-frontend
description: "frontend/UI implementation or redesign — any task writing CSS, layout, components, typography, color, or spacing"
---

TRIGGER: frontend/UI implementation or redesign — any task writing CSS, layout, components, typography, color, or spacing
OUTPUT: compact — design decisions applied with rationale, specific values used, anti-patterns avoided
SKIP: backend or API work with no frontend surface; visual critique of existing screenshot (use visual-design-critique)

---

# Design Taste — Frontend

Apply these principles when writing any UI code. Not guidelines — decisions with specific values.

---

## Hierarchy

Every screen has one primary action. If everything is bold, nothing is.

- **Size scale:** Use 3 sizes max per screen. Jump at least 4px between levels: `12 / 14 / 16 / 20 / 24 / 32 / 40 / 48px`
- **Weight:** `400` body, `500` label/button, `600`–`700` heading only — never `800`+ for UI text
- **Color to de-emphasize:** muted text = `opacity: 0.5` on the base text color, not a random grey. Keeps it harmonious on any background.
- One element per screen at maximum visual weight. Everything else supports it.

## Spacing

Use a base-8 scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px`. Never pick arbitrary values like `13px` or `22px`.

- **Breathing room:** between unrelated groups, use at least `24px`. Between related items: `8–12px`.
- **Card padding:** `16px` minimum, `24px` comfortable, `32px` generous. Never `10px`.
- **Tightest useful gap:** `4px` (icon-to-label). Never `2px` or `3px` — invisible at a glance.
- **Law of proximity:** things that belong together get less space between them than things that don't.

## Typography

- **Line height:** `1.5` for body, `1.2`–`1.3` for headings, `1.4` for labels
- **Line length:** 50–75 chars for body text (`max-width: 65ch`). Wider = harder to read.
- **Letter spacing:** `0` for body, `-0.02em` for large headings (≥ 32px), `+0.05em` for ALL-CAPS labels
- **Font stack:** system font first: `system-ui, -apple-system, sans-serif`. Only load custom font if brand requires it.
- **Never:** mix more than 2 typefaces. Never use decorative fonts for UI labels.

## Color

- **Contrast:** text on background minimum `4.5:1` (WCAG AA). Large text (≥ 18px bold): `3:1`
- **Palette discipline:** 1 brand color, 1 neutral scale (grey), 1 semantic set (error/warning/success). Total: 10–15 tokens max.
- **Saturation:** UI surfaces should be low-saturation. High saturation only for interactive elements and status.
- **Dark backgrounds:** don't use `#000000`. Use `#0f0f0f` or `#111827`. Pure black creates harsh contrast that reads as broken.
- **Light backgrounds:** don't use `#ffffff` for cards on white. Use `#f9fafb` or `#f3f4f6` for subtle depth.
- **Color alone ≠ meaning:** never convey state (error, success, active) through color alone — add icon, label, or pattern.

## Elevation and depth

- Use 2–3 shadow levels max. Each level = one use case:
  - Level 1 `box-shadow: 0 1px 3px rgba(0,0,0,0.1)` — card, input
  - Level 2 `box-shadow: 0 4px 12px rgba(0,0,0,0.12)` — dropdown, tooltip
  - Level 3 `box-shadow: 0 16px 40px rgba(0,0,0,0.16)` — modal, dialog
- Never use `box-shadow: 0 0 10px rgba(0,0,0,0.5)` — the symmetrical glow looks amateur.
- Drop shadow direction: always downward (`dy` positive) — light comes from above.

## Layout and alignment

- **Optical centering:** vertically centered icons feel low — nudge `margin-top: -2px` or `translateY(-1px)` to optically center.
- **Grid discipline:** align everything to a grid. 4-col mobile, 8 or 12-col desktop. Items that break the grid look like bugs.
- **Asymmetry is intentional:** equal columns everywhere creates visual boredom. Use `2:1`, `3:1` ratios for content-heavy layouts.
- **Scan path:** F-pattern (top-left heavy) or Z-pattern (short pages). Place primary CTA where the eye lands naturally — top-right or center-bottom.

## Interactivity and motion

- **Hover transition:** `transition: all 150ms ease` is the worst default — it transitions layout properties and causes jank. Use: `transition: background-color 150ms ease, box-shadow 150ms ease, opacity 150ms ease`
- **Micro-animation timing:** `100–200ms` for immediate feedback (button press). `200–300ms` for entrance/exit. Never > `400ms` for UI transitions — feels laggy.
- **Easing:** `ease-out` for elements entering the screen. `ease-in` for leaving. `ease-in-out` for in-place transitions.
- **Focus ring:** always visible, never hidden with `outline: none` without replacement. Use `outline: 2px solid <brand-color>; outline-offset: 2px`

## States (non-negotiable)

Every interactive element needs all states designed:
- `default` → `hover` → `active/pressed` → `focus` → `disabled`
- Every data view needs: `loading` → `empty` → `error` → `populated`
- Empty state is not blank. It teaches: icon + heading + 1 CTA.

## Anti-patterns (never ship these)

- `border-radius: 999px` on rectangular elements — pill shape only for badges/tags, not cards
- Gradient text on body copy — illegible at small sizes
- Box shadow + border together — pick one to define the container edge
- `margin: auto` centering inside flexbox — use `justify-content: center`
- Random glassmorphism (`backdrop-filter: blur`) without performance justification
- `font-weight: 900` on paragraph text
- Icon + label with `gap: 0` — always at least `gap: 6px`
- Color contrast below `3:1` on the assumption "it looks fine" — test it
