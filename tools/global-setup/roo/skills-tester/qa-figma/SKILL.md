---
name: qa-figma
description: Compare a built screen to the correct Figma frame. Content first, layout second. Do not fix code.
---

# QA Figma

For web pages only. Do not use this skill for desktop windows.

Requires a frame link with `node-id` and the path of the real screen. Whole-file link: ask which frame. Cannot read Figma (expired access, wrong link): state the reason clearly and stop — do not estimate measurements from a screenshot.

0. Read `knowledge/<system>/<feature>.md` if it exists — know the real URL, whether login is needed, and previously noted breakpoint quirks.
1. Call Figma MCP **in this order**: `get_metadata` first (light outline), `get_screenshot` next (color and layout comparison), only call `get_design_context` when exact numbers are needed (spacing, font, color). Do not call all three to be safe.
2. Open the real screen at desktop 1280px. Get ariaSnapshot + take a screenshot.
3. Compare content before layout: (a) missing or extra components, (b) wrong text or remaining placeholders, (c) wrong state, (d) visible layout deviation.
4. Repeat steps 2–3 at tablet 768 and mobile 375. Figma has no design for that size: write "no design available" — do not infer.
5. First-time acceptance test: also measure LCP/CLS and accessibility errors if the repo has a command. No command: write not measured. Bug fix: skip measurement unless the task requires it.
6. Multiple screens: check each screen in the flow table; screenshots separated per screen.

Do not conclude which side is wrong when Figma and the real screen differ and the cause is unclear — write it in `## Needs clarification`. Do not fix code. Write the report and screenshots in `reports/figma-check/`.
