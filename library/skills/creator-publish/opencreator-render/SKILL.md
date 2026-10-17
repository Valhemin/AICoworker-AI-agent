---
name: opencreator-render
description: Finalize one render command — horizontal or vertical — from existing subtitles and voice. Stop before rendering.
---

# OpenCreator render

Only run when the plan has selected exactly one type: `horizontal-bilingual`, `horizontal-dubbed`, `vertical-bilingual`, or `vertical-dubbed`.

## Horizontal, bilingual

Source video plus `bilingual_srt.srt`. Expected output file: `horizontal_bilingual.mp4`.

## Horizontal, dubbed

`video_with_tts.mp4` plus `target_language_srt.srt`. Expected output file: `horizontal_dubbed.mp4`.

## Vertical, bilingual

Source video plus `short_origin_mixed_srt.srt`. Add one large title and one small title. Expected reframed file: `transferred_vertical_video.mp4`. Final file: `vertical_bilingual.mp4`.

## Vertical, dubbed

`video_with_tts.mp4` plus target-language subtitles, same two titles. Final file: `vertical_dubbed.mp4`.

In `produce.md` under Frame Format, write why horizontal or vertical was chosen, that the text region does not cover faces, and the subtitle path to be used. Do not mix two types in one pass.

Stop at WAITING REVIEW before rendering. If the CLI is present and approval has been given, verify the output video has both picture and audio, and that one frame shows subtitles that are readable. Delete drafts. End with the next step.
