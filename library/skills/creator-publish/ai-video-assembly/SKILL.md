---
name: ai-video-assembly
description: Assemble shots, AI images, voiceover audio, background music with audio ducking, Ken Burns pan/zoom, and dynamic animated subtitles into final MP4 (9:16 or 16:9).
---

TRIGGER: voiceover audio, shot images/clips, and subtitles are ready to be combined into a final video
OUTPUT: detailed — assembly-plan.md with FFmpeg assembly command or Remotion render command; final rendered MP4 path
SKIP: scriptwriting stage, raw asset ideation stage

---

# AI Video Assembly Engine (Ráp video tự động)

Automated assembly pipeline turning still images, video clips, voiceover, and background music into a polished video. Adapted from MoneyPrinterTurbo and ShortGPT assembly methodology.

## Input

Read before starting:
- `voice_normalized.mp3` and `output_words.srt`
- List of visual shot assets (AI images or video clips) matching scene durations
- Royalty-free background music track (BGM)
- Target aspect ratio: `vertical` (1080x1920) or `horizontal` (1920x1080)

---

## Step 1 — Ken Burns Motion on Still Images

Turn static AI images into cinematic moving shots:
- Apply slow zoom-in (`zoompan=z='min(zoom+0.0015,1.25)':d=125:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'`) or slow pan across the image.
- Avoid static freeze-frames longer than 2.5 seconds.

---

## Step 2 — Automatic Audio Ducking (Nhạc nền tự né tiếng nói)

Blend Voiceover with BGM:
- When Voiceover is active, BGM automatically drops to **-18dB (15-20% volume)**.
- In pauses/silence (> 0.5s), BGM smoothly ramps back up to **-6dB (50% volume)** over 300ms.
- FFmpeg `sidechaincompress` or `amix` filter handles this automatically.

---

## Step 3 — Dynamic Subtitle Burn-In (Styling mạng xã hội)

Burn subtitles directly into video:
- Position: Lower-third (Y = 75-80%), never blocking the center face or platform UI elements (TikTok like/comment bar).
- Font: Bold Sans-Serif (Montserrat, The Bold Font, Inter Black).
- Colors: White text with subtle black drop-shadow and active word highlighted in Yellow (`#FFE600`) or Cyan (`#00F0FF`).

---

## Step 4 — Assembly Command Generation

Generate single-pass FFmpeg assembly command:

```bash
ffmpeg -i voice.mp3 -i bgm.mp3 \
  -filter_complex "[1:a]volume=0.25[bgm];[0:a][bgm]amix=inputs=2:duration=first[aout]" \
  -map "[aout]" ... -vf "subtitles=subs.srt:force_style='FontSize=20,Bold=1,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,Outline=2'" \
  -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 192k final_video.mp4
```

---

## Write

Write `../shared/01_Projects/<domain>/<project-name>/assembly-plan.md`.

Format:
- `## Vietnamese` sơ đồ ráp video, thông số audio/video và lệnh render
- `## English` assembly timeline, audio mixing parameters, and render command

End with one next step.
