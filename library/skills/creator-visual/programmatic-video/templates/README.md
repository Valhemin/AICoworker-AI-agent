# Remotion templates

**Production flow:** `video/src/` (scene-based, driven by `spec.json` via `scripts/make_video.py`). The per-genre folders below are legacy single-scene starters.

These files are **copy sources**. They are not a runnable app by themselves.

## Setup

1. Create a Remotion app (see `../references/install.md`).
2. Copy the genre folder’s `.tsx` into `src/compositions/` (or equivalent).
3. Copy `props.json` values into the composition default props / `Root.tsx` `defaultProps`.
4. Register with `<Composition id="..." component={...} durationInFrames={...} fps={30} width={...} height={...} />`.
5. For 9:16 use `width={1080} height={1920}`; for 16:9 swap.

## Audio

Copy `AudioTracks.tsx` to `src/AudioTracks.tsx` (templates import `../AudioTracks`). Pass `audioSrc` / `musicSrc` / `musicVolume` props. See `../references/audio.md`.

## Root.tsx example

```tsx
import { Composition } from "remotion";
import { ProductAd } from "./compositions/ProductAd";
import props from "./props/product-ad.json"; // copied from templates/product-ad/props.json

export const RemotionRoot = () => (
  <Composition id="ProductAd" component={ProductAd} defaultProps={props}
    durationInFrames={900} fps={30} width={1080} height={1920} />
);
```

Tested 2026-10-22 on Remotion 4.0.537: `tsc` clean, all 5 templates render.

Copy `props.json` without non-component keys (e.g. `genre`, `phase`, `packs`, `notes`) or strip them before passing.

## Duration and size

| Template | Composition id | durationInFrames @30fps | Notes |
|----------|----------------|-------------------------|-------|
| `product-ad` | `ProductAd` | 900 (30s); min ~ 70 + features*28 + 45 | 1080x1920 or 1920x1080 |
| `ui-tutorial` | `UiTutorial` | 45 + steps * secondsPerStep * 30 | needs >=1 step; images in `public/assets/` |
| `quote-short` | `QuoteShort` | 450 (15s) | 1080x1920 |
| `data-chart` | `DataChart` | >= 60 + series*8 + 60, e.g. 240 | any aspect |
| `captioned-social` | `CaptionedSocial` | round(video seconds * 30) | 1080x1920; video in `public/assets/` |

## Phase coverage

| Folder | Phase | Status |
|--------|-------|--------|
| `product-ad/` | 1 | Ready |
| `ui-tutorial/` | 1 | Ready |
| `quote-short/` | 1 | Ready |
| `captioned-social/` | 2 | Ready (needs real `captions[]`) |
| `data-chart/` | 3 | Ready |

Phase 4–5: follow packs/engines; no heavy Three.js/Manim sources vendored here.

## Conventions

- `fps = 30` unless brief says otherwise.
- Use `spring` / `interpolate` from `remotion` only in ready templates (no GSAP required for phase 1 starters).
- Replace placeholder brand colors via props.
- Never hardcode fake metrics—pass real numbers in props.

## 9:16 notes

- `data-chart`: content sits in the top half on 1080x1920. Use 1920x1080, or add padding/larger fonts for vertical.
- `ui-tutorial`: 16:9 screenshots letterbox inside a vertical frame. Use portrait screenshots or 1920x1080.
