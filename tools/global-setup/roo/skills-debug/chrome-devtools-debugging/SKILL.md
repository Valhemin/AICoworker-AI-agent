---
name: chrome-devtools-debugging
description: Debug frontend performance, network, and rendering issues using Chrome DevTools MCP. Enable MCP before use.
---

TRIGGER: debugging frontend performance, network waterfall, rendering, or browser memory issues that Playwright alone cannot surface
OUTPUT: detailed — findings with metrics, root cause hypothesis, fix recommendations, before/after verification
SKIP: backend HTTP failures or pure interaction/screenshot testing (use playwright instead)

---


Use for performance debugging, network inspection, rendering issues, and runtime analysis that Playwright alone cannot surface.

## MCP Tools

Chrome DevTools MCP provides: DOM inspection, network request monitoring, performance profiling, console access, CSS computed styles, and JavaScript evaluation.

Enable `chrome-devtools` MCP before use (disabled by default).

## When to Use (vs Playwright)

| Problem | Use |
|---|---|
| Visual bugs, interaction testing, screenshots | **Playwright** |
| Slow page load, layout thrashing, memory leaks | **Chrome DevTools** |
| Network waterfall, blocked requests, CORS | **Chrome DevTools** |
| Both visual + performance | **Both** — Playwright navigates, DevTools profiles |

## Protocol

### Network Debugging
1. Navigate to target URL.
2. Inspect network requests — look for failed requests (4xx/5xx), slow responses (>1s), large payloads (>1MB).
3. Check request headers, CORS issues, redirect chains.
4. Identify blocking resources in the critical path.

### Performance Debugging
1. Check DOM node count (>1500 is a warning).
2. Look for layout shifts (CLS sources).
3. Identify long tasks (>50ms) blocking main thread.
4. Check memory usage trends for leaks.
5. Inspect paint/composite layers for unnecessary repaints.

### CSS/Layout Debugging
1. Inspect computed styles on problematic elements.
2. Check box model for unexpected margins/padding.
3. Verify z-index stacking context.
4. Test CSS containment opportunities.

### Console & Runtime
1. Capture console errors and warnings.
2. Evaluate runtime state of key variables.
3. Check for unhandled promise rejections.
4. Inspect event listeners on problematic elements.

## Partial Findings Rule

If root cause is unclear after all protocols, still report:
- Every metric gathered (timings, DOM count, error list).
- Which categories were inspected and their verdict.
- Best current hypothesis with the specific metric that supports it.
- Single next step (e.g., "profile with CPU throttling to isolate JS cost").

Never return "I couldn't find the issue." Report what was found and what it rules out.

## Output Contract

Every response must include:
- **Findings**: specific metrics with evidence (timings, counts, error strings).
- **Hypotheses checked**: each with verdict.
- **Root cause / best hypothesis**: with supporting evidence.
- **Fix recommendations**: ranked by impact, with expected before/after.
- **Verification**: before/after metrics after fix applied (if applicable).
