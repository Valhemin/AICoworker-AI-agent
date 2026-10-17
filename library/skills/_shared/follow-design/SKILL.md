---
name: follow-design
description: Code UI according to DESIGN.md and the state spec. Missing files: stop.
---

# Follow design

Call before editing UI. Skip when the diff does not touch any screens.

1. Read `docs/design/DESIGN.md` and `docs/design/interface.md`.
2. `ceo` gate: missing files — stop and report that `designer` is needed.
3. `developer-personal` gate: use `docs/design/` if the task provides it. Not available: follow the existing components in the repo. Do not spawn `designer`.
4. `developer-work` gate: use existing components. Do not introduce a new visual system. Do not call `web-seo`.
5. When tokens exist: use them. Do not add new colors, fonts, or radii.
6. Each component must have empty, loading, error, success, disabled, and responsive states per spec when the spec exists.
7. Check the code just changed: accessible names, visible focus, form errors have text, images have dimensions, filter/tab state is in the URL.
8. Spec deviations must be fixed before `verify-change`. Do not report done when it only runs.

Reference: Vercel Web Interface Guidelines. Do not download the guide from the internet.
