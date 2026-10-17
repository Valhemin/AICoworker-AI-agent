---
name: opencreator-voice
description: Finalize voice reading from target-language subtitles or plain text. Do not record until approved.
---

# OpenCreator voice

Only run when the plan has selected `tts` or `speech`, and the subtitle step is complete if `tts` was selected.

## Dubbing from subtitles

Input is `target_language_srt.srt`. Do not read source-language lines. If the task requires voice on a bilingual version, state clearly whether the target language is on top or bottom.

In `produce.md` under Voice, write: speaker, language code, voice ID, speed, and emotion. Expected file: `tts_final_audio.wav`. If a source video exists, the expected merged file is `video_with_tts.mp4`.

## Reading plain text

Only when no subtitles exist and the plan selected `speech`. Write exactly the passage to be read. Do not independently condense a script into a different passage.

Do not record and do not call a paid API until approved. If the CLI is present and approval has been given, verify the audio file is non-empty — do not trust the manifest alone. If the voice provider config is missing, say so — do not fabricate a voice ID. Delete drafts. End with the next step.
