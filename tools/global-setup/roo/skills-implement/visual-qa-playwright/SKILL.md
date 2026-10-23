---
name: visual-qa-playwright
description: Automated visual QA, interaction testing, visual regression, and accessibility audits using Playwright MCP. Enable MCP before use.
---

TRIGGER: user explicitly requests visual QA, visual regression, screenshot comparison, or accessibility audit — NOT general E2E interaction flows (use browser-testing-workflow instead)
OUTPUT: report — QA report with smoke/interaction/visual regression/accessibility phases and GO/NO-GO ship recommendation
SKIP: automatically after any implementation without explicit user request; never trigger on backend-only changes

---


## When to Use / When NOT to Use

**Only when user explicitly requests E2E or UI testing.** Never trigger automatically after implementation.

**Use when:** User asks for visual QA, visual regression, accessibility audit, Playwright testing, browser screenshot comparison, or UI interaction testing.
**Do NOT use:** After API or backend implementation. After frontend implementation unless user specifically asks. Never run automatically as a default post-implementation step.

Use for UI changes when browser verification is needed. Requires Playwright MCP (disabled by default — enable before use).

## MCP Tools

Playwright MCP provides: `browser_navigate`, `browser_click`, `browser_type`, `browser_screenshot`, `browser_evaluate`, `browser_wait_for_selector`, and more.

## Safety

- Default to **read-only**: navigate, screenshot, inspect. Do not submit forms or trigger mutations on production URLs.
- Use staging/preview URLs for mutating journeys (checkout, delete, signup).
- Redact credentials/tokens/PII before saving screenshots.
- Never use real production credentials — use seeded test accounts only.

## Phase 1: Smoke Test

1. Navigate to target URL.
2. Screenshot above-the-fold — desktop (1280px) and mobile (375px).
3. Check console for errors (`browser_evaluate` → `console.error` intercept).
4. Verify no 4xx/5xx in visible content.
5. Check basic layout: no overflow, no clipped text, no missing images.
6. Core Web Vitals if measurable: LCP <2.5s, CLS <0.1, INP <200ms.

## Phase 2: Interaction Test

1. Test primary user flow (click buttons, fill forms, navigate).
2. Verify state changes reflect in UI.
3. Submit forms with valid data → verify success state.
4. Submit forms with invalid data → verify error state.
5. Test keyboard navigation (Tab order, Enter/Space activation).
6. Check focus indicators are visible.
7. Screenshot each meaningful state change.

## Phase 3: Visual Regression

1. Screenshot key pages at 3 breakpoints: 375px, 768px, 1440px.
2. Compare against baseline screenshots if committed in repo.
3. No baseline → report INCONCLUSIVE, never silent PASS.
4. Flag layout shifts >5px, missing elements, overflow.
5. Check dark mode if applicable.

## Phase 4: Accessibility

1. Run axe-core or equivalent via `browser_evaluate` on each page.
2. Flag WCAG 2.2 AA violations: contrast, labels, alt text, focus order.
3. Verify keyboard navigation works end-to-end (Tab through all interactive elements).
4. Check screen reader landmarks (main, nav, footer, heading hierarchy).
5. Note: automated a11y covers ~30-40% of WCAG. A clean run is necessary but not sufficient — flag remaining manual checks needed.

## Output

```markdown
## QA Report — [URL] — [date]

### Phase 1: Smoke
- Console errors: X critical, Y warnings
- Network: pass/fail
- Core Web Vitals: LCP/CLS/INP values

### Phase 2: Interaction
- User flows tested: [list]
- Issues found: [list with severity]

### Phase 3: Visual Regression
- Breakpoints tested: 375/768/1440
- Regressions found: [list or NONE]
- Baseline status: EXISTS / INCONCLUSIVE

### Phase 4: Accessibility
- Automated violations: X critical, Y serious
- Keyboard nav: pass/fail
- Manual checks needed: [list]

### Summary
- Blocking issues: [count]
- Warnings: [count]
- Ship recommendation: GO / NO-GO / CONDITIONAL
```
