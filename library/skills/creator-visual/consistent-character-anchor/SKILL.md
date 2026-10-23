---
name: consistent-character-anchor
description: Formulate consistent character identity tokens, fixed costume formulas, seed preservation, and prompt anchoring across multiple AI video/image shots.
---

TRIGGER: story or ad has a recurring character across 2 or more shots in visual generation (Midjourney, Flux, SDXL, Kling, Runway, Sora)
OUTPUT: detailed — character-anchor.md with base prompt anchor, trigger token, fixed wardrobe/facial features, and per-shot prompt template
SKIP: faceless faceless/voice-only explainers; abstract motion graphics without human characters

---

# Consistent Character Anchor (Nhất quán nhân vật)

Lock character identity, facial geometry, wardrobe, and art style across multiple AI generated scenes. Adapted from StoryDiffusion and IP-Adapter character consistency methodology.

## Input

Read before starting:
- Character bio from `creator-story` (age, ethnicity, hairstyle, signature clothing)
- Target video generation model (Flux, Midjourney v6, Kling 1.5, Runway Gen-3)

---

## Step 1 — Master Identity Anchor Formula

Construct a locked identity string that is prepended to EVERY single shot prompt:

```text
[Subject Anchor]: a [exact age]-year-old [exact ethnicity] [gender], [distinct facial feature: e.g. sharp jawline, hazel eyes], [exact hairstyle and color: e.g. messy dark brown textured crop haircut]
[Wardrobe Anchor]: wearing [exact signature outfit: e.g. matte black bomber jacket over an olive green crewneck t-shirt], [accessories: silver ring on index finger]
[Style Anchor]: cinematic film still, shot on 35mm lens, natural directional lighting, subtle film grain, muted color grading, hyper-realistic texture --no cartoon, anime, 3d render, plastic skin, distorted fingers
```

---

## Step 2 — Face Reference & Consistency Tokens

1. **Seed Anchoring**: Generate Shot 1, lock the initial seed, and pass Shot 1 image as image-to-image / character reference (`--cref` in Midjourney or IP-Adapter image prompt).
2. **Angle / Camera Decoupling**: Do NOT change wardrobe or face traits between shots. Only change camera perspective and action verbs:
   - Shot 1: Master anchor + `close-up portrait, looking into camera, slight neutral smile`
   - Shot 2: Master anchor + `medium shot, standing inside modern coffee shop, typing on laptop, 45-degree angle profile`
   - Shot 3: Master anchor + `wide shot, walking down street in rain holding black umbrella, low angle dynamic tracking shot`

---

## Step 3 — Continuity Gate (Kiểm tra liền mạch)

Verify 4 items before approving generation batch:
1. Hair color & length identical in all shots.
2. Wardrobe colors and layers identical (no disappearing jackets).
3. Face geometry and age consistent (no sudden aging or facial morphing).
4. Lighting temperature consistent across consecutive shots in the same scene.

---

## Write

Write `../shared/01_Projects/<domain>/<project-name>/character-anchor.md`.

Format:
- `## Vietnamese` bảng công thức nhân vật và prompt từng shot
- `## English` character anchor formula and per-shot prompts

End with one next step.
