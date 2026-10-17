# Design Bridge Reference

## What the Bridge Does

`bridge-design.mjs` converts `uipro-output.json` (UI UX Pro Max JSON output) into a structured root `DESIGN.md` that Impeccable and Taste can read as a shared contract.

## Data Flow

```
uipro-output.json
    ↓ bridge-design.mjs
DESIGN.md (merged, section-aware)
    ↓ read by
Impeccable (Phase 6 implement)
    ↓ read by  
Taste (Phase 7 overlay)
```

## Section Ownership

Each section in DESIGN.md is either **auto-generated** or **user-owned**:

```markdown
## Color <!-- auto-generated -->
^ This section is overwritten on bridge re-run.

## Components
^ No marker = user-owned. Bridge never touches this.
```

To convert an auto-generated section to user-owned: remove the `<!-- auto-generated -->` comment. The bridge will skip it on next run.

## uipro-output.json Structure

UI UX Pro Max outputs a JSON object. Key paths the bridge reads:

```json
{
  "style": { "name": "Clean Modern" },
  "colors": {
    "palette": {
      "primary": "#3B82F6",
      "accent": "#8B5CF6",
      "surface": "#FFFFFF",
      "background": "#F8FAFC",
      "text": "#1A1A1A",
      "error": "#EF4444",
      "success": "#22C55E"
    }
  },
  "typography": {
    "fonts": {
      "heading": "Inter",
      "body": "Inter",
      "mono": "JetBrains Mono"
    }
  },
  "effects": {
    "borderRadius": { "sm": "4px", "md": "8px", "lg": "16px" },
    "shadow": { "sm": "...", "md": "..." }
  },
  "anti_patterns": ["...", "..."],
  "reasoning": "Selected for..."
}
```

Bridge is defensive: if a key is missing, it uses sensible defaults rather than failing.

## DESIGN.md Sections and Sources

| Section | Source | Overwrite |
|---|---|---|
| Product Mode | Inferred from PRODUCT.md | Yes (auto-generated) |
| Design Intent | uipro style + reasoning + anti_patterns | Yes |
| Agent Design Controls | state.dials | Yes |
| Color | uipro colors.palette | Yes |
| Typography | uipro typography.fonts | Yes |
| Spacing and Density | state.dials.VISUAL_DENSITY | Yes |
| Shape and Elevation | uipro effects | Yes |
| Motion | state.dials.MOTION_INTENSITY | Yes |
| Layout | Fixed responsive rules | Yes |
| Components | Empty template | No (user-owned) |
| Interaction States | Fixed a11y rules | Yes |
| Responsive Behavior | Fixed rules | Yes |
| Accessibility | Fixed WCAG rules | Yes |
| Do and Do Not | Fixed rules | Yes |
| Provenance | Bridge metadata | Always |

## Updating DESIGN.md After Approval

Once `designApproved: true`:
- Do not re-run the bridge automatically.
- For small corrections (typo, add a component entry): edit DESIGN.md directly.
- For a design system update: set `designApproved: false`, re-run Phase 2–5.

## Provenance Section

Always auto-overwritten. Contains:
```markdown
## Provenance

- input_hash: <sha256 of uipro-output.json used>
- bridge_version: <semver>
- generated_at: <ISO timestamp>
- source: ui-ux-pro-max
- dials_source: <preset|inferred|user|design.md|default>
```

Use this to trace which UI UX Pro Max run produced the current DESIGN.md.
