# Precedence Rules

## Decision Authority by Phase

| Phase | Authority | What they control |
|---|---|---|
| 0–5 | UI UX Pro Max | Design direction, palette, typography, style, dials |
| 6 | Impeccable | Component structure, IA, interactions, quality bar |
| 7 | Taste | Art direction overlays only (within DESIGN.md constraints) |
| All | User | Any override, any redesign |

## Conflict Resolution Chain

```
User requirements
    ↓
Accessibility + platform conventions (WCAG AA, iOS HIG, Material, etc.)
    ↓
PRODUCT.md (product goals, audience, use cases)
    ↓
DESIGN.md (locked design contract — palette, typography, tokens, dials)
    ↓
Page-specific override (documented in DESIGN.md or task spec)
    ↓
Impeccable rules (component quality, IA, heuristics)
    ↓
Taste rules (art direction, anti-generic, visual composition)
    ↓
UI UX Pro Max raw output (MASTER.md — intermediate, not final authority)
    ↓
Model defaults (last resort, never override above layers)
```

## Key Conflicts and How to Resolve

### Taste vs. DESIGN.md
- Taste proposes a new accent color → check DESIGN.md `## Color`. If not in token table → reject.
- Taste proposes asymmetric layout → check DESIGN.md `## Layout`. If grid-based → constrain to rhythm, not rewrite.
- Taste proposes GSAP animation → check `MOTION_INTENSITY`. If ≤ 4 → reduce to CSS transition only.

### Impeccable vs. DESIGN.md  
- Impeccable critique suggests "use bolder typeface" → check DESIGN.md `## Typography`. If font is locked → improve weight/scale within the locked family, not replace it.
- Impeccable audit flags spacing inconsistency → check `## Spacing and Density` scale. Fix to match scale, not Impeccable's default.

### New feature vs. existing DESIGN.md
- Adding a new UI section: follow `## Color`, `## Typography`, `## Spacing` tokens. Do not introduce new tokens unless a Section Override is approved.
- Section Override requires: user confirmation + addition to DESIGN.md under the relevant section.

### Accessibility vs. visual design
Accessibility always wins. No exception. Examples:
- "The design uses light gray text on white" → boost contrast to ≥4.5:1 regardless of DESIGN.md color choice.
- "Taste says remove focus ring for clean look" → keep focus ring, adjust it to match design aesthetic instead.
- "Animation makes the page feel alive" → add `prefers-reduced-motion` fallback regardless of MOTION_INTENSITY.

## What Requires Redesign vs. What Doesn't

### Does NOT require redesign (safe without user asking)
- Fixing spacing to match DESIGN.md scale
- Adding missing interaction states (hover/focus/loading/error)
- Responsive adaptation within existing breakpoint rules
- Replacing hardcoded hex with DESIGN.md tokens
- Taste improvements within `constrained` mode

### DOES require explicit redesign request
- Changing palette or any color token
- Replacing the typography system
- Changing DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY
- Switching surface mode (Persuade → Operate)
- Changing Taste activation mode
- Re-running UI UX Pro Max
