---
name: opencreator-handoff
description: Choose one production step and write the plan to produce.md. Stop before paid renders.
---

# OpenCreator handoff

One step at a time. Other steps have their own skill.

Source is a local file, a script in the project folder, or public video links that are in the task.

## Plan

Write or update `produce.md`. First version is `v1`. Revisions increment the number and note one line of what changed.

The plan section lists each requested output, one per line, using only these names:

- `download`: one file per link in the task, when no local file exists for that link.
- `subtitle`: source-language subtitles, target-language subtitles, bilingual subtitles, short vertical subtitles.
- `tts`: voice from target-language subtitles.
- `speech`: voice from plain text, when no subtitles exist yet.
- `horizontal-bilingual` or `horizontal-dubbed`.
- `vertical-bilingual` or `vertical-dubbed`.
- `cover`: one cover image.

Choose exactly one next step that is still missing, in order: download links if the task has links without local files, then subtitles, then voice, then frame format, then cover image. Do not skip steps. Do not run multiple steps in one pass.

The working folder is one folder inside the project. Do not scatter files at the repo root. The future manifest file is `krillinai_manifest.json` in that folder. Subsequent steps use paths from the manifest — do not guess file names.

If a step errors, re-run only that step. Keep the output of completed steps. Errors belong to one type: bad call, retryable, missing tool, or internal error. Do not claim a file was exported when no file exists.

If the CLI is not installed, write the complete plan and stop. Do not install OpenCreator in this step. Stop at WAITING REVIEW before calling any paid API or starting a render. End with the name of the next skill.
