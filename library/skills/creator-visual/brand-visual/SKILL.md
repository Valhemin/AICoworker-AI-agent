---
name: brand-visual
description: Produce one ad image and one short video from BRAND.md that drive action, not just recognition. CEO gate requires bilingual versions.
---

TRIGGER: launch-sprint needs ad assets — one image and one short video for the committed channel
OUTPUT: detailed — prompt or file for each asset in docs/launch/, bilingual versions, stops before rendering at WAITING REVIEW
SKIP: logo or brand identity creation — that belongs to designer; illustration or decorative art not tied to a launch

---

# Brand Visual

Read before starting:
- `docs/design/BRAND.md` — colors, fonts, logo, tagline, brand voice
- `docs/design/DESIGN.md` — design tokens
- `../shared/01_Projects/<domain>/<project-name>/audience-channel.md` — channel and buyer group
- `../shared/01_Projects/<domain>/<project-name>/launch-sprint.md` — core message (outcome, not feature)

If `BRAND.md` is missing: stop. State that `designer` must create it first.

---

## What makes an effective ad image

The image has one job: stop the scroll and make the viewer want to read the message. Most ad images fail because they show the product, not the outcome.

### The outcome-first rule

- ❌ Show: screenshot of the app dashboard
- ✅ Show: the person who used the app — what does their life/work look like now?

- ❌ Show: feature list bullets on a gradient background
- ✅ Show: the before/after — the painful state vs. the resolved state

- ❌ Show: logo + tagline centered on a background
- ✅ Show: the result the buyer wants, with the brand mark secondary

### Image composition requirements

1. **One focal point.** The eye should land on one thing within 2 seconds. If there are two competing focal points, remove one.
2. **Text on image: maximum 7 words.** Any more and it won't be read on mobile. Use the core message sentence from `launch-sprint.md`, shortened.
3. **Brand colors from DESIGN.md.** Never introduce a new color not in the token system.
4. **Readable at 200×200px.** Test this — ad thumbnails are often tiny. If the text is illegible at small size, remove it or enlarge it.
5. **No generic stock photo people.** Use brand assets, product output, or abstract representation. Stock photos of smiling people in offices have zero credibility.

### Image prompt structure (for AI image generation)

Write the prompt as:
```
[Subject/outcome being shown], [lighting/mood], [composition type], [color palette from BRAND.md], [style — photorealistic/illustrated/flat], [negative: what to exclude]

Format: [W×H px], [aspect ratio], [platform — Instagram square / Facebook banner / etc.]
```

Example:
```
A Vietnamese freelancer confidently closing a laptop after completing a project, warm natural light, medium shot from slight above, brand colors: #[hex] and #[hex], clean flat illustration style
Negative: generic office, stock photo look, cluttered background
Format: 1080×1080px, 1:1, Instagram feed
```

---

## What makes an effective short video (30–60 seconds max)

The video has one narrative: **before → action → after**. This is not a feature tour.

### Structure (applies to 15s, 30s, and 60s)

| Second | Content |
|---|---|
| 0–3 | The pain (show it, don't explain it) — the viewer must recognize themselves immediately |
| 3–10 | One action (the product solving the problem) — the simplest possible demonstration |
| 10–25 | The outcome (show the after state — what changed) |
| 25–30 | Brand mark + one CTA line |

**Expand for 60s by deepening the "outcome" section — show more proof or a second scenario. Never expand by adding more features.**

### Video requirements

1. **No voiceover that reads the UI labels aloud.** If the video shows clicking "Submit," the voiceover should say the outcome ("Done in 30 seconds") — not "Click Submit."
2. **Sound-off must work.** 85% of social video is watched without sound. Every key message must be readable as on-screen text.
3. **First 3 seconds decide everything.** The opening must show motion, recognition, or conflict — not a logo animation.
4. **One CTA at the end.** Not three options. One: link, message, or join.

### Video script/prompt structure

Write as a shooting script or AI video prompt:

```
Scene 1 (0–3s): [Visual description] — [On-screen text if any] — [No VO / VO line]
Scene 2 (3–10s): [Visual description] — [On-screen text] — [VO line]
Scene 3 (10–25s): [Visual description] — [On-screen text] — [VO line]
Scene 4 (25–30s): [Logo placement] — [Tagline] — [CTA text]

Platform: [channel]
Format: [W×H, aspect ratio]
Duration: [Xs]
```

---

## `ceo` gate — bilingual versions

**Image**: produce one version with Vietnamese text, one with English text — same layout, same composition, only text changes.

**Video**: one version with Vietnamese on-screen text (and Vietnamese VO if applicable), one with English. Voiceover language follows the channel target audience.

Write both versions' prompts to `docs/launch/`. Label clearly: `ad-image-vi.png`, `ad-image-en.png`, `video-vi.mp4`, `video-en.mp4`.

---

## Do not

- Change the brand identity (colors, logo, font) — if it's wrong, stop and return to `designer`
- Introduce a new visual direction not in BRAND.md
- Render in bulk — write the prompt/script first, stop at WAITING REVIEW before paying for any render
- Use the product name as the headline — use the outcome instead

---

## Output

Write prompts and scripts to `docs/launch/`:
- `ad-image-brief-vi.md` + `ad-image-brief-en.md` — image brief with prompt
- `video-script-vi.md` + `video-script-en.md` — shooting script or AI video prompt

Stop at WAITING REVIEW before paying for any render or API call. End with one next step.
