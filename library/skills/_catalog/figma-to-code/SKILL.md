---
name: figma-to-code
description: "Convert Figma designs to code using Figma MCP (cloud) or Figma Desktop MCP (local). Enable one before use."
---

TRIGGER: a Figma link, selection, or design reference is provided
OUTPUT: detailed — components created/modified with paths, tokens added/reused, design decisions, state gaps flagged
SKIP: UI implementation without a Figma reference (use design-taste-frontend instead)

---


Use when a Figma link, selection, or design reference is provided.

## MCP Options

| MCP | When to use | Enable |
|---|---|---|
| **figma** (cloud) | Figma not open locally, or working from shared links | `"disabled": false` in mcp.json |
| **figma-desktop** | Figma Desktop app running with Dev Mode | `"disabled": false` in mcp.json |

Only enable one at a time.

## Protocol

1. **Inspect existing code first** — check project components, tokens, design system.

2. **Read Figma deeply** via MCP — do not just collect tokens:
   - Layer structure, grouping, naming — these reveal intent
   - Auto-layout direction, gap, padding, alignment — map to flexbox/grid
   - Constraints (left/right/center/stretch) — map to responsive behavior
   - Component variants and properties — map to props
   - Spacing rhythm — infer scale, don't hardcode pixel values
   - Typography hierarchy — map to semantic tags (h1/h2/p, not just font-size)
   - Design tokens (colors, spacing, typography) — map to CSS variables

3. **Responsive assessment (mandatory):**
   - Evaluate layout on mobile (≤768px), tablet (768–1280px), desktop (>1280px)
   - Figma is often desktop-only — proactively propose responsive adaptations if mobile not designed
   - Flag layouts that will break on small screens and propose fixes
   - Prefer fluid/relative units (%, rem, fr) over fixed px for layout dimensions

4. **Component and style decomposition:**
   - Extract reusable components — if a pattern appears 2+ times, make it a component
   - Separate concerns: layout wrapper / content component / style variants
   - Style: use design tokens + utility classes where available, avoid inline styles
   - Name components and props to reflect design intent, not implementation detail

5. **Map to existing primitives** before creating new:
   - Reuse existing components where design matches — don't duplicate
   - Match colors, spacing, typography to existing scale

6. **Handle all states**: hover, focus, active, disabled, loading, error, empty — not just happy path

7. **Verify visually** — use Playwright MCP if available for screenshot comparison

## Output

- Components created/modified with file paths
- Responsive behavior per breakpoint
- Tokens reused vs new tokens added
- Design decisions where Figma was ambiguous
- States implemented vs gaps (not designed — flagged for designer)
- Responsive proposals if mobile layout was absent in Figma
