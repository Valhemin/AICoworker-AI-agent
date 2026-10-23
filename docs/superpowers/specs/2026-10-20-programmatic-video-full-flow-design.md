# Programmatic Video Full Flow — Design

**Date:** 2026-10-20  
**Status:** approved (user: full flow)  
**Owner skill:** `creator-visual/programmatic-video`

## Problem

AICoworker already covers AI video prompting and OpenCreator post (download → subtitle → voice → render). It lacks a **deterministic code → MP4** path for product ads, UI tutorials, social shorts, data videos, and related motion-graphic genres after shipping software.

## Goals

1. Route any brief to a **genre → engine → capability pack → template → render checklist**.
2. Cover genres beyond ad/tutorial via phased packs (not one mega-install).
3. Keep Remotion as default render core; HyperFrames and Manim as documented escapes.
4. Stop before paid/cloud render without approval (same pattern as OpenCreator).
5. Optional handoff of finished MP4 into OpenCreator for VO/subtitle polish.

## Non-goals

- Generative pixel video (Runway/Sora) — stays on `video-motion-prompt-engineering`.
- Interactive in-app only (Rive/dotLottie runtime) — documented, not primary MP4 path.
- Installing every npm package from viral “20 repo” lists into the monorepo.

## Architecture

```
Brief / product UI assets
        ↓
programmatic-video (router skill)
        ↓
genre catalog → packs required → engine (Remotion default)
        ↓
copy/adapt template composition
        ↓
local preview (Remotion Studio) → WAITING REVIEW
        ↓
render MP4 (local FFmpeg) → evidence path
        ↓
optional: opencreator-* for VO/sub/cover
```

### Engines

| Engine | When |
|--------|------|
| **Remotion** (default) | Ads, tutorials, social, data batch, captions, 3D-in-video, maps |
| **HyperFrames** | Need Apache-2.0 / HTML+GSAP authoring; company size license risk |
| **Manim** | Math/algorithm explainers only |
| **FFmpeg / MoviePy / Editly** | Cut/join existing footage; no new motion graphic |

### Genre → phase map

| Phase | Genres unlocked | Packs |
|-------|-----------------|-------|
| 1 Core | product-ad, ui-tutorial, quote-short, kinetic-feature | core, assets |
| 2 Social/voice | captioned-social, audiogram, tip-daily | + captions |
| 3 Data/batch | data-chart, dataset-batch, unwrapped-stats | + data |
| 4 3D/maps | product-3d, map-route | + scene3d, maps |
| 5 Math/edit | math-explainer, clip-compile | + manim, edit |

### Capability packs (install on demand)

- **core** — Remotion, Remotion Skills, motion-design skills, FFmpeg, Mediabunny (via Remotion)
- **assets** — SVGO, Satori, Fontsource, Lucide
- **motion** — GSAP (+ GSAP Skills), Motion (+ Motion AI Kit) when UI-in-composition needs them
- **captions** — faster-whisper (or WhisperX), `@remotion/captions`
- **data** — chart comps; CSV/JSON props; dataset render loop
- **scene3d** — `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` (± rapier)
- **maps** — MapLibre / Remotion maps guidance
- **manim** — Manim Community
- **edit** — MoviePy or Editly + FFmpeg
- **alt-html** — HyperFrames + its agent skills (escape hatch)

### Outputs

Primary deliverable: **MP4** (and optionally WebM / still PNG).  
Aspect defaults: `1920x1080` and/or `1080x1920`.  
Artifacts live under `shared/01_Projects/<domain>/<project>/programmatic-video/`.

## Agent wiring

- Allow skill on `creator-visual`.
- `creator-publish` may consume finished MP4 via existing OpenCreator skills; do not duplicate render CLI there.
- AGENTS.md: creator-visual may prepare Remotion compositions; stop at WAITING REVIEW before `remotion render` if task marks render as high-risk / paid cloud.

## Success criteria

- [x] Genre brief produces a pack list + template path without inventing deps.
- [x] Phase 1 templates (product-ad, ui-tutorial, quote-short) exist as Remotion comps to copy into a Remotion app.
- [x] Phases 2–5 documented with install commands and input contracts (stubs for captioned-social + data-chart).
- [x] openclaw example lists the new skill.
