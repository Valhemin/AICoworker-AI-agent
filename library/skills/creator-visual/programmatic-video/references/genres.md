# Genre catalog

Pick **one** primary `genre_id`. Phase = minimum packs to unlock.

## Phase 1 — Core

| genre_id | Output | Typical length | Packs | Template |
|----------|--------|----------------|-------|----------|
| `product-ad` | Promo / launch ad MP4 | 15–30s | core, assets, motion | `templates/product-ad/` |
| `ui-tutorial` | Step-by-step UI guide MP4 | 45–90s | core, assets | `templates/ui-tutorial/` |
| `quote-short` | Quote / tip vertical MP4 | 8–20s | core, assets | `templates/quote-short/` |
| `kinetic-feature` | Feature list / kinetic type | 20–40s | core, assets, motion | adapt `product-ad` beats |

## Phase 2 — Social & voice

| genre_id | Output | Packs | Template |
|----------|--------|-------|----------|
| `captioned-social` | Footage or graphic + karaoke captions | core, assets, captions | `templates/captioned-social/` |
| `audiogram` | Waveform + avatar + captions | core, assets, captions | no template yet; adapt `captioned-social` + Remotion audiogram docs |
| `tip-daily` | Daily tip card series | core, assets | adapt `quote-short` |

## Phase 3 — Data & batch

| genre_id | Output | Packs | Template |
|----------|--------|-------|----------|
| `data-chart` | Animated chart / KPI story | core, assets, data | `templates/data-chart/` |
| `dataset-batch` | N MP4s from CSV/JSON | core, assets, data | Remotion dataset-render loop |
| `unwrapped-stats` | Personalized year/stats review | core, assets, data | custom props on chart + kinetic |

## Phase 4 — 3D & maps

| genre_id | Output | Packs | Notes |
|----------|--------|-------|-------|
| `product-3d` | Turntable / cinematic product | core, scene3d | Remotion + R3F + drei |
| `map-route` | Animated route / region | core, maps | Remotion maps skill / MapLibre |

## Phase 5 — Math & edit

| genre_id | Output | Packs | Engine |
|----------|--------|-------|--------|
| `math-explainer` | Equations / algorithms | manim | **Manim** (not Remotion) |
| `clip-compile` | Cut/join existing clips + titles | edit, assets | FFmpeg / MoviePy / Editly |

## Adjacent (not MP4-first)

| id | Output | When |
|----|--------|------|
| `interactive-rive` | `.riv` runtime | In-app character/state machine |
| `interactive-lottie` | `.lottie` / Lottie JSON | AE-exported UI motion in product |

Document these in PLAN.md if requested; do not pretend they are Remotion renders.
