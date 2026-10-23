---
name: programmatic-video
description: Route a brief into a deterministic code-to-MP4 pipeline (Remotion default): pick genre, packs, template, and render checklist. Stops at WAITING REVIEW before render.
---

TRIGGER: product ad, UI tutorial, quote/tip short, captioned social, data chart, map/3D, math explainer, or clip compile needed as MP4 from code
OUTPUT: detailed — PLAN.md with genre_id, engine, packs, template path, props, preview and render commands; MP4 path after approved render
SKIP: generative text/image-to-video (use video-motion-prompt-engineering); subtitle/voice/cover on an existing master (use opencreator-*)

Phases 1-5 in `references/genres.md` = rollout order of genres (1 core, 2 social/voice, 3 data/batch, 4 3D/maps, 5 math/edit).

# Programmatic Video

## Mission

Turn a clear brief into a **deterministic motion-graphic MP4** (and optional stills) using code compositions—not generative pixel models.

## Activate when

- Product ad, feature promo, UI walkthrough, quote/tip short, captioned social, audiogram, data/chart video, batch personalized videos, map route, 3D product turntable, math explainer, or clip compile from existing footage.
- User asks to use Remotion / HyperFrames / Manim / “code to video” / motion design studio stacks.

## Do not activate when

- Pure text→video / image→video model generation → use `video-motion-prompt-engineering`.
- Only VO/subtitle/cover on an existing master → use `opencreator-*`.
- In-app interactive mascot only (no MP4) → document Rive/dotLottie; do not force Remotion.

## Ownership

- Genre + pack selection
- Composition / template plan
- Local preview + render checklist
- Evidence paths under the project folder

## Must not

- Invent product claims or fake metrics
- Install system packages or run cloud/Lambda render without approval
- Claim an MP4 exists when no file was written
- Pull every viral animation repo; only required packs for the chosen genre
- Silently switch to generative video models

## Input contract

- `brief` (goal, length, aspect: 16:9 and/or 9:16)
- `brand` (palette, logo path, fonts if any)
- `assets` (screenshots, screen recording, product URL, CSV/JSON if data genre)
- `script_or_beats` (optional but preferred)
- `delivery` (platforms, language)

## Output contract

- `genre_id`
- `engine` (`remotion` | `hyperframes` | `manim` | `ffmpeg-edit`)
- `packs[]`
- `template_path`
- `composition_props`
- `preview_command`
- `render_command` (written; run only after approval when marked high-risk)
- `output_paths` (after render)
- `opencreator_handoff` (optional next skill name)

Every output includes:

```yaml
meta:
  project_id:
  artifact_id:
  artifact_type: programmatic_video_plan
  owner_skill: programmatic-video
  version: 1.0.0
  source_artifact_ids: []
  assumptions: []
  evidence_ids: []
  rights_status: unknown
  confidence: 0.0
  created_at:
```

## Decision rules

1. Default engine is **Remotion**. Use HyperFrames only if user requires Apache-2.0 / HTML authoring. Use Manim only for math/algorithm. Use FFmpeg/MoviePy/Editly when the job is cut/join existing clips.
2. Map brief → exactly one primary `genre_id` from `references/genres.md`. Secondary genre only as a second pass.
3. Install **only** packs listed for that genre in `references/packs.md`.
4. Use the scene-based flow (`templates/video/`, `scripts/make_video.py`); do not invent a new stack.
5. Aspect: ship 9:16 for social-first; 16:9 for YouTube/landing; both when “full delivery”.
6. Stop at **WAITING REVIEW** before `npx remotion render`, Lambda/Cloud Run, or any paid API.
7. Voice-over is generated per scene by `make_video.py`; duration follows the voice (`references/audio.md`).
8. After local MP4 exists, optional next step is OpenCreator subtitle/voice/cover—never invent those files.

## Operating procedure (production flow)

0. Read `references/creative-direction.md` first: hook, arc, pacing, motion language. A web page pasted into scenes is not a video.
1. Brief + script approved first (`creative-brief`, `screenwriting`, `hook-retention`, `research-fact-verification`). No invented claims or numbers.
2. Write `<project>/programmatic-video/spec.json` (`references/spec.md`; example `examples/sample-vi.json`) and put assets + `rights` in `assets/` (`references/sources.md`). One narration per scene, short sentences.
3. Write PLAN.md: genre, spec path, assets, risks.
4. Init once (network, needs approval): `python scripts/make_video.py <project> --init`.
5. Build: `python scripts/make_video.py <project>` (pv-audio venv). Validates, makes voice per scene, sizes scenes from the voice, typechecks. Prints preview command. **Stop at WAITING REVIEW.**
6. On approval: `... --render` (add `--aspect 16:9` for a second delivery). It runs QC and writes `out/RELEASE.md` + `out/qc/contact-sheet.png`.
7. Human checks before publish: view the contact sheet and full video, listen to the audio, fact-check claims/numbers, confirm rights table, credit VAIS-1000 for the Vietnamese voice.
8. Optional next: `opencreator-handoff` (cover/translation). Do not claim "done" unless the script printed PASS.

Genre notes: `references/genres.md` (legacy per-genre templates in `templates/<genre>/` still usable for single-scene jobs). Math (Manim) and clip-compile (FFmpeg) are separate engines, not covered by `make_video.py`.

## Knowledge to load

- `references/workflow.md`
- `references/genres.md`
- `references/engines.md`
- `references/packs.md`
- `references/install.md`
- `references/creative-direction.md` (read first)
- `references/spec.md` (production flow input)
- `references/sources.md` (footage/music licenses)
- `references/brief-to-props.md` (legacy per-genre templates)
- `references/captions.md` (captioned-social / audiogram)
- `references/audio.md` (voice-over, music, loudness — a silent video is not a finished video)
- `references/ecosystem.md` (vetted open-source skills/tools)
- `templates/README.md`
- Nearest template folder for the chosen genre

## Relationship to other skills

| Skill | Role |
|-------|------|
| `motion-graphics-vfx-planning` | Creative/VFX plan before code |
| `video-motion-prompt-engineering` | Generative model prompts (different path) |
| `opencreator-*` | Post on finished media |
| Remotion / GSAP / Motion **agent skills** (external) | API correctness while writing compositions — install per `references/install.md` |

## Failure recovery

- Wrong genre → re-route; do not bolt packs onto a bad template.
- Render fails → capture log; fix composition; do not switch engine silently.
- Missing FFmpeg/Node → document blocker; do not sudo-install without RISK approval.
- License concern (Remotion company size / Automators) → propose HyperFrames escape from `engines.md`.

## Cost discipline

- One composition iteration before cloud render experiments.
- No dataset batch of N>3 without explicit approval.
- Prefer local render for phase 1–2.
