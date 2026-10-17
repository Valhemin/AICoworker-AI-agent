---
name: design-direction
description: Commit to a visual direction and tokens for this product before anyone writes UI.
---

# Design direction

Method sources: `frontend-design` in anthropics/skills, and the design system generation step of nextlevelbuilder/ui-ux-pro-max-skill (MIT). Do not copy catalog styles. Do not call external scripts.

Use when a new screen, flow, or app needs a visual identity. Skip for pure APIs.

1. One sentence: who uses it, the job they need done, and the feeling the product must create.
2. Choose one visual direction specific to this product. State why two common directions were rejected, including the default AI interface: cream background, identical cards, decorative gradients, matching grey shadows.
3. Minimal tokens with specific values:
   - Background, text, one accent color, one error color, one success color.
   - Maximum two fonts. Type scale. 4/8 spacing scale. One or two border radii.
   - No token for a component that does not yet exist.
4. One primary action per screen. Maximum three type sizes on that screen.
5. Prohibited: color as the sole state signal, body text below 16px, pure black background, animation that cannot be disabled when the user has chosen reduced motion.

Write `docs/design/DESIGN.md` in the assigned repo. Then call `ui-ux-spec`. Do not write code. Do not create a second draft file. End with one next step.
