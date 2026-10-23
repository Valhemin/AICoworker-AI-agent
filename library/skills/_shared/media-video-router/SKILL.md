---
name: media-video-router
description: Dynamic router for video and media production. Evaluates the task and points to exactly one target skill. Prevents loading redundant skills into context.
---

TRIGGER: any media or video task (AI video generation, scriptwriting, voiceover, re-up, localization, de-duplication, video assembly)
OUTPUT: compact — exact path of the single matching skill to read and execute
SKIP: non-media software development or server operations tasks

---

# Media & Video Skill Router

Read this routing table to identify the single skill needed. **Load only that one SKILL.md into context**. Do not load other skills.

## Routing Table

| If the task is... | Read only this skill path |
|---|---|
| **1. Kịch bản & Phân cảnh** | |
| Viết kịch bản video, hook 3s đầu, giữ chân người xem | `library/skills/creator-story/hook-retention/SKILL.md` |
| Xây dựng cốt truyện dài, phim ngắn, documentary | `library/skills/creator-story/screenwriting/SKILL.md` |
| **2. Hình ảnh & Video AI Nguyên Bản (Original AI Video)** | |
| Khóa khuôn mặt, trang phục, seed nhân vật nhất quán qua nhiều shot | `library/skills/creator-visual/consistent-character-anchor/SKILL.md` |
| Viết prompt chuyển động AI video (Kling, Runway, Sora, Luma) | `library/skills/creator-visual/video-motion-prompt-engineering/SKILL.md` |
| Tạo video bằng code (Remotion, Motion Graphic, UI Demo) | `library/skills/creator-visual/programmatic-video/SKILL.md` |
| Lồng tiếng TTS tự nhiên, chuẩn -14 LUFS, xuất phụ đề Word-level | `library/skills/creator-publish/voiceover-tts-sync/SKILL.md` |
| Ráp video hoàn chỉnh: Ken Burns pan/zoom + Audio Ducking + Dynamic Sub | `library/skills/creator-publish/ai-video-assembly/SKILL.md` |
| **3. Dịch Thuật & Re-up Video Nước Ngoài (Video Localization & Re-up)** | |
| Tải video ngoại từ link (YouTube, TikTok, X, Douyin) | `library/skills/creator-publish/opencreator-download/SKILL.md` |
| Dịch phụ đề chuẩn ngữ nghĩa NLP, reflection 3 bước, co giãn khớp khẩu hình | `library/skills/creator-publish/semantic-subtitle-translation/SKILL.md` |
| Băm cảnh, chèn B-roll, lật/zoom, tạo nhiễu vô hình chống trùng lặp thuật toán | `library/skills/creator-publish/video-transform-dedup/SKILL.md` |
| Thiết kế ảnh bìa / Thumbnail click-through cao | `library/skills/creator-publish/opencreator-cover/SKILL.md` |

---

## Execution Rule

1. Check the table above.
2. Select at most **one** target skill path matching the active phase.
3. Call `view_file` on that `<path>/SKILL.md`.
4. Execute according to that skill's instructions.
