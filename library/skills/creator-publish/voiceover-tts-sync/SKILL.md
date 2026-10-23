---
name: voiceover-tts-sync
description: Generate natural voice-over narration using high-quality neural TTS (Edge-TTS, Kokoro), extract word-level SRT timestamps, and normalize loudness to -14 LUFS social standard.
---

TRIGGER: voiceover audio needed for an approved script, or video narration audio missing
OUTPUT: detailed — tts-manifest.md with audio file paths, voice configuration, word-level SRT, and loudness normalization command
SKIP: silent visual-only videos; videos using human live-recorded vocal tracks

---

# Voiceover TTS & Word-Level Sync

Produce broadcast-quality voiceover audio synchronized with subtitle timestamps. Uses Microsoft Edge-TTS (free, natural neural voices) and FFmpeg loudness normalization.

## Input

Read before starting:
- Script text with punctuation and sentence break markers from `creator-story`
- Target voice profile: Vietnamese (`vi-VN-HoaiMyNeural` nữ, `vi-VN-NamMinhNeural` nam) or English (`en-US-ChristopherNeural`, `en-US-JennyNeural`)
- Pacing rate (default: `+0%` for standard, `+10%` to `+15%` for TikTok fast-paced narration)

---

## Step 1 — Edge-TTS Generation Command

Generate high-quality `.mp3` and timestamped `.vtt`/`.srt`:

```bash
# Example generation command:
edge-tts --voice vi-VN-NamMinhNeural \
         --rate=+5% \
         --text "Nội dung kịch bản cần đọc ở đây..." \
         --write-media output_voice.mp3 \
         --write-subtitles output_words.vtt
```

---

## Step 2 — Loudness Normalization (-14 LUFS Standard)

Social media platforms (YouTube, TikTok, Meta) compress un-normalized audio harshly:
1. Normalize integrated loudness to **-14 LUFS** and true peak to **-1.5 dBTP** using FFmpeg `loudnorm`:
```bash
ffmpeg -i output_voice.mp3 -af loudnorm=I=-14:TP=-1.5:LRA=7 voice_normalized.mp3
```

---

## Step 3 — Word-Level Subtitle Conversion

1. Convert `.vtt` to compact `.srt` or `.ass` format with word-by-word timing.
2. Group words into 3–5 words per visual line (ideal for mobile reading retention; never let subtitle exceed 2 lines).

---

## Write

Write `../shared/01_Projects/<domain>/<project-name>/tts-manifest.md`.

Format:
- `## Vietnamese` cấu hình giọng đọc, thông số âm thanh và lệnh thực thi
- `## English` voice parameters, audio specs, and generation commands

End with one next step.
