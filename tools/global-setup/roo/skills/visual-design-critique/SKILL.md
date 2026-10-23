---
name: visual-design-critique
description: Critique UI screenshots with design-grounded visual judgment, identify specific problems by region, propose concrete CSS/code fixes, and iterate until the screen looks professional.
---

TRIGGER: user explicitly requests visual critique — "review the design", "does this look good", "UI looks bad", "run visual critique", "critique UI", or invokes this skill by name
OUTPUT: detailed — visual critique per region, severity rating, specific fix for each problem, then apply fixes and re-render
SKIP: any UI work where user has NOT explicitly requested visual critique — instead, suggest it as an option; UX flow critique (use ui-ux-product-design); pure code review

---

# Visual Design Critique

## Why screenshots, not just code review

Reading CSS is not the same as seeing the result. A `padding: 16px` that looks fine in code can feel claustrophobic next to a dense table. This skill requires **seeing** the actual rendered output, critiquing it like a designer would, then fixing it.

---

## Step 0 — Confirm before running

This skill uses Playwright MCP to screenshot and iterates multiple times — **it consumes significant tokens**. Before starting:

> "Visual critique uses Playwright to take screenshots and iterates through multiple fix passes — more token-intensive than a standard review. Do you want to run it?"

Only proceed after user confirms. If user says no, do a lightweight code-only review instead and note what to visually check manually.

## Step 1 — Get the screenshot

Once confirmed:
1. Use Playwright MCP or Chrome DevTools MCP to screenshot the current state:
   ```
   Navigate to [URL or localhost:PORT], take full-page screenshot
   ```
2. If MCP unavailable: ask user to provide a screenshot before continuing.

Do NOT critique code alone. The visual output is the source of truth.

---

## Step 2 — Scan in passes (do all 5 before writing feedback)

### Pass 1 — 5-second impression (squint test)
Look at the screenshot without reading anything.
- Is there a clear focal point?
- Does the eye know where to go first?
- Does it feel heavy/light/balanced?
- First emotional reaction: polished / amateur / cluttered / empty?

### Pass 2 — Hierarchy scan
- Is there one primary action per screen?
- Are heading → subheading → body → label sizes clearly distinct?
- Does anything compete for attention that shouldn't?

### Pass 3 — Spacing and alignment grid
- Do elements align to an invisible grid? (look for ragged left edges, inconsistent gaps)
- Is spacing consistent between similar element types?
- Are there any "floating" elements with no clear group membership?

### Pass 4 — Color and contrast
- Can you read all text without strain?
- Are interactive elements visually distinct from static content?
- Is color used consistently for the same meaning across the screen?

### Pass 5 — States and edge cases
- What does this look like with a long name / long text?
- Is the empty state handled?
- Does it look right at mobile width? (mentally compress to 375px)

---

## Step 3 — Write critique by region

Format each finding as:

```
REGION: [component or area name, e.g. "navigation bar", "card grid", "form submit button"]
SEVERITY: Critical | Major | Minor | Polish
PROBLEM: [specific, visual description — not "it looks bad" but "the icon and label have 0px gap, they're touching"]
FIX: [exact CSS property or code change]
```

Severity guide:
- **Critical** — breaks usability or accessibility (contrast fails WCAG AA, click target < 44px, text overflow breaking layout)
- **Major** — looks visibly amateur or inconsistent (misaligned elements, arbitrary spacing, wrong font weight)
- **Minor** — subtle but noticeable to trained eye (optical misalignment, shadow direction wrong, hover state missing)
- **Polish** — refinement that separates good from great (micro-animation easing, letter-spacing on heading, muted color harmony)

---

## Step 4 — Apply fixes

After writing all findings, apply fixes from Critical → Major → Minor, stopping at Polish unless user requests.

For each fix:
1. Edit the specific CSS/component
2. Re-render screenshot
3. Verify the problem is resolved (don't assume — look at it)

---

## Step 5 — Re-critique loop

After applying fixes, do a fresh 5-second impression (Step 1, Pass 1).
- If the overall impression improved: continue to remaining severity levels
- If new problems appeared (fixes introduced regressions): address them first
- Stop when no Critical or Major issues remain

Minimum: 2 iterations. Maximum: 5 (if still broken after 5 passes, flag underlying structural issue to user).

---

## Critique dimensions reference

### Typography problems to look for
- Body text > 16px or < 13px
- Line height < 1.4 on body text (lines feel cramped)
- Line length > 80 chars (too wide to read)
- Font weight > 500 on body text (heavy, fatiguing)
- All-caps without `letter-spacing: 0.05em`
- Two competing typefaces that don't harmonize

### Spacing problems to look for
- Non-8-base values (`13px`, `22px`, `7px`) — use 4/8/12/16/24/32/48
- Cards with < 16px padding
- Icon touching adjacent label (gap < 6px)
- Section breaks that feel arbitrary (too much or too little separation)
- Different spacing between same-type elements on the same screen

### Color problems to look for
- Text contrast below 4.5:1 on normal text, 3:1 on large text
- Pure `#000000` or `#ffffff` in UI (too harsh)
- More than 3 accent colors active at once (visual noise)
- Semantic color inconsistency (red used for both error AND a tag)
- Muted text using a random grey instead of `rgba(base, 0.5)`

### Layout problems to look for
- Nothing aligns to a visible grid (ragged edges everywhere)
- Centered layout where left-aligned would be more readable
- Equal-width columns forcing unnatural content distribution
- Important CTA buried below the fold or in a visual dead zone
- No clear visual grouping (proximity) between related items

### Interaction state problems to look for
- Button with no hover state
- Input with no focus ring
- Disabled element that looks the same as enabled
- Loading state not differentiated from loaded state
- Clickable element not obviously clickable (no cursor, no affordance)

### Common "AI-generated UI" tells to eliminate
- Centered hero + 3 equal cards — every AI app looks like this
- Random gradient on every surface
- `border-radius: 9999px` on non-pill elements
- Glassmorphism without purpose
- Shadow on shadow (border + box-shadow + gradient on same element)
- Every section the same visual weight
- Generic placeholder icons (generic chart icon for "analytics", generic person icon for "users")

---

## Output format

```
## 5-second impression
[2–3 sentence honest reaction]

## Findings

### Critical
- REGION: ...  PROBLEM: ...  FIX: ...

### Major
- REGION: ...  PROBLEM: ...  FIX: ...

### Minor (if any)
- ...

### Polish (if any)
- ...

## Applying fixes...
[apply, re-render, confirm]

## After fixes — impression
[updated reaction]
```

---

## Done checklist

- [ ] Screenshot obtained (not just code review)
- [ ] All 5 scan passes completed before writing critique
- [ ] Each finding has region + severity + specific problem + exact fix
- [ ] Fixes applied Critical → Major order
- [ ] Re-rendered and visually verified each fix
- [ ] At least 2 critique → fix → verify iterations
- [ ] No Critical or Major issues remain
