---
name: opencreator-subtitle
description: Write four subtitle layers from a local file or script. Lock terminology. Do not self-download.
---

# OpenCreator subtitle

Only run when `opencreator-handoff` has selected `subtitle`.

Source is a video or audio file already in the working folder, or an existing script. For links, let `opencreator-download` fetch them first. This skill does not download.

Write in `produce.md` under Subtitles, all four layers:

- Source-language subtitles.
- Target-language subtitles.
- Bilingual subtitles. `ceo` gate: Vietnamese line then English line for the same idea. Target language on top if the task specifies it; otherwise note which layer is on top.
- Short vertical subtitles: one idea per line, readable on a phone.

One idea per line. Line timings do not overlap. Vertical video does not stack two same-language sentences in one line. CJK characters count as width 2, Latin characters as width 1, when line-breaking.

Terminology section: terms that must not be translated to a different word.

Expected file names in the working folder:

- `origin_language_srt.srt`
- `target_language_srt.srt`
- `bilingual_srt.srt`
- `short_origin_mixed_srt.srt`

Write source and target language as codes, for example `vi` and `en`. If missing, write `not available` in that field.

If the CLI is not installed, stop after the plan file is complete. If the CLI is present and the user requests a run, run only the subtitle stage on the local file, verify the subtitle file actually has content — do not trust a plain success message. Delete drafts. End with the next step.
