---
name: design-check
description: Audit visual quality and state completeness before committing the design. Delete redundant design files.
---

# Design check

Call after `docs/design/DESIGN.md` and `docs/design/interface.md` exist. `ceo` gate also requires `BRAND.md`. Method sources: anthropics/skills `frontend-design` self-review gate, visual rules in `design-taste-frontend`, and the Vercel Web Interface Guidelines minimum. Do not download rules from the internet. Do not copy catalog styles.

Fix files until every item below is correct. Do not write a separate checklist file.

1. Each screen has one primary action. One heaviest element. Maximum three type sizes on that screen.
2. Maximum two fonts. Body text from 16px, line-height 1.5. Headings no heavier than weight 700.
3. Spacing only on the 4/8 scale. Items in the same group are closer to each other than to items in other groups.
4. Text on background meets 4.5:1. Background is not pure black. Cards are not the same white as a white background.
5. Color is not the only signal for any state. Focus is visible.
6. If the visual direction still resembles a default AI interface, change it: cream background, identical cards, decorative gradients, matching grey shadows, all-caps labels on every heading.
7. `interface.md` has empty, loading, error, success, disabled, and responsive. Empty and error copy is real text, not placeholder.
8. `ceo` gate: customer-facing copy has Vietnamese and English. `BRAND.md` uses the colors in `DESIGN.md`.

When done, delete every file in `docs/design/` that is not one of those three files. Products not for sale do not have `BRAND.md`. No `draft`, `notes`, or `tmp` files. End with one next step.
