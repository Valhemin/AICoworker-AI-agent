---
name: opencreator-cover
description: Write a self-contained cover image prompt with text, language, layout, and dimensions. Do not assume a reference image is available.
---

# OpenCreator cover

Only run when the plan has selected `cover`.

The prompt must be self-contained. Include on-image text, language, layout, and visual style. `ceo` gate: one option with Vietnamese text and one with English text, same layout. If `BRAND.md` exists, use the exact brand identity and colors there. Do not introduce a new visual direction.

The cover image CLI does not accept reference images. Do not state that the original video image was used.

Dimensions: default `1024x1024`. Landscape: `1536x1024` if the task requires it. Write the dimensions in `produce.md` under Cover Image.

Expected files: `generated_cover.png` and `cover_prompt.final.txt`. The prompt in the text file must match the prompt that was sent.

Do not call the image API until approved. If the image provider is missing, say so. Delete drafts. End with the next step.
