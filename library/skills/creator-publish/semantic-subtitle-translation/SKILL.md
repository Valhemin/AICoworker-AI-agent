---
name: semantic-subtitle-translation
description: Translate and align video subtitles using NLP semantic sentence splitting, 3-pass LLM reflection translation, and audio-video time-stretching synchronization.
---

TRIGGER: foreign video subtitles need translation into target language (e.g. English/Chinese to Vietnamese), or dubbing audio overflows scene duration
OUTPUT: detailed — semantic-subtitles.srt with natural sentence boundaries, localized idiom translation, and scene-aligned audio duration markers
SKIP: original monolingual videos without translation needs

---

# Semantic Subtitle Translation & Dub Alignment

Produce natural, context-aware subtitle translations and synchronizations. Adapted from `Huanshere/VideoLingo` (~19k stars) and `jianchang512/pyvideotrans` methodology.

## Input

Read before starting:
- Raw transcription with timestamps (Whisper `.srt` or `.vtt`)
- Target language (`vi` Vietnamese, `en` English, etc.)
- Video scene boundary timestamps from `video-transform-dedup`

---

## Step 1 — NLP Semantic Sentence Splitting

Do not use raw Whisper timestamps directly (Whisper splits at random audio pauses, resulting in broken phrases):
1. **Semantic Reconstruction**: Group words into complete grammatical clauses (Subject + Verb + Object).
2. **Line Length Constraint**: Maximum 35–42 characters per line (mobile readability limit). Never split compound nouns or idioms across lines.

---

## Step 2 — 3-Pass Reflection Translation

Run translation through 3 disciplined passes via LLM:

1. **Pass 1 — Direct Meaning**: Accurate literal translation capturing technical terms and facts.
2. **Pass 2 — Reflection & Tone**: Review Pass 1 against target culture idioms:
   - Does it sound like a native speaker talking on TikTok/YouTube?
   - Replace mechanical translations with colloquial natural phrasing (e.g. translate "No way" as "Không thể nào" or "Ảo thật đấy" based on tone).
3. **Pass 3 — Character Length & Reading Speed**:
   - Vietnamese words are typically 15–20% longer than English. Compress word count so subtitle can be comfortably read at 160–180 words per minute.

---

## Step 3 — Time-Stretching & Dubbing Alignment

Prevent audio dubbing from overflowing into the next scene:
1. Compare target TTS audio duration against original speaker's scene slot.
2. If TTS duration exceeds scene length:
   - Apply audio time-stretching (`atempo=1.05` to `1.15`) without pitch change.
   - Or trim redundant filler words in Pass 3.
3. If TTS duration is shorter: pad natural silence before scene transition.

---

## Write

Write `../shared/01_Projects/<domain>/<project-name>/semantic-subtitles.srt`.

Format summary in `../shared/01_Projects/<domain>/<project-name>/translation-report.md`:
- `## Vietnamese` bảng đối soát phụ đề gốc - dịch nghĩa - chỉnh âm điệu
- `## English` alignment validation report

End with one next step.
