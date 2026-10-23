---
name: video-transform-dedup
description: Apply anti-fingerprint video transformation (scene re-cutting, B-roll overlay, Ken Burns, speed-ramping, LUT color grading, and audio track replacement) to ensure fair-use uniqueness and bypass duplicate detection.
---

TRIGGER: re-uploading or localizing foreign video content, adapting viral clips for TikTok/Shorts/Reels, or avoiding duplicate content penalties
OUTPUT: detailed — dedup-manifest.md with transformation recipe, scene cut timestamps, B-roll overlay points, and executable FFmpeg command
SKIP: 100% original AI-generated footage or company-owned master recordings

---

# Video Transform & De-duplication (Chống trùng lặp & Băm cảnh)

Transform external source videos into unique, fair-use transformative content. Overcomes duplicate video detection on TikTok, YouTube Shorts, and Facebook Reels.

## Input

Read before starting:
- Source video path or URL
- Target language translation/dubbing script
- Desired aspect ratio (9:16 for Shorts/Reels, 16:9 for YouTube)

---

## Step 1 — Scene Breakdown & Re-cutting

Do not keep original clip uninterrupted for longer than 4-6 seconds:
1. **Scene Detection**: Use `scenedetect` (PySceneDetect) or FFmpeg `select='gt(scene,0.3)'` to find visual cut points.
2. **Re-sequencing & Trimming**: Trim 0.3s-0.5s from dead intro/outro frames of each cut.

---

## Step 2 — Visual Transformation Layers (Phá chữ ký video gốc)

Combine at least 4 of the following techniques:

1. **Smart Cropping & Zooming**: Dynamic crop with 3–5% zoom and subtle continuous pan/tilt (Ken Burns motion).
2. **Horizontal Flip**: Flip video horizontally (`hflip`) if there is no critical unreadable text on screen.
3. **Speed Variance (Ramping)**: Shift playback speed by 1.02x–1.04x with pitch-preserved audio (`atempo=1.02,setpts=PTS/1.02`).
4. **Color Grading & LUT**: Apply subtle warm/cool film LUT or adjust saturation (+5%) and contrast (+3%) to alter color histogram signature.
5. **Frame Rate Resampling**: Convert to constant frame rate (e.g. 29.97fps or 30fps) with slight blur/sharpen filter.

---

## Step 3 — B-Roll & Overlay Injection (Tạo nội dung phái sinh mới)

Replace or overlay 25%–40% of source duration with fresh visual elements:
1. **First 3-Second Hook**: Replace the first 3 seconds with a high-retention hook scene (AI-generated visual, reaction face, or kinetic title card).
2. **B-Roll Cutaways**: Insert stock video / AI image cutaways during long talking-head segments.
3. **Picture-in-Picture (PiP) / Split Screen**: If keeping original footage, place it inside a stylized frame with title banner on top and animated captions below.

---

## Step 4 — Audio Signature Scrubbing

Video platforms fingerprint audio tracks heavily:
1. **Mute or Filter Original BGM**: Strip background music using vocal separation (e.g. Demucs) or low-pass filter background track.
2. **New Voiceover + Royalty-Free BGM**: Lay fresh localized TTS voiceover + fresh trending background music with -16dB ducking.

---

## Write

Write `../shared/01_Projects/<domain>/<project-name>/dedup-manifest.md`.

Format:
- `## Vietnamese` danh sách kỹ thuật biến đổi và lệnh FFmpeg thực thi
- `## English` transformation checklist and executable FFmpeg command

End with one next step.
