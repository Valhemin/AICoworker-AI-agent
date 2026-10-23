# Capability packs

Install **only** packs required by the chosen genre. Do not install the full viral list.

## Pack matrix

| Pack id | Purpose | Key deps | Agent skills (external) |
|---------|---------|----------|-------------------------|
| `core` | Code→MP4 render | Remotion, FFmpeg, Mediabunny (via Remotion) | `npx skills add remotion-dev/skills`; `npx skills add iart-ai/motion-design-skills` |
| `assets` | Titles, SVG, icons, fonts | SVGO, Satori (as needed), Fontsource, Lucide | — |
| `motion` | Complex timelines / React UI motion in comps | `gsap`, `motion` | `npx skills add https://github.com/greensock/gsap-skills`; Motion AI Kit (`npx motion-ai`) |
| `captions` | Transcript + karaoke captions | faster-whisper or WhisperX; `@remotion/captions` | Remotion captions skill (in remotion-dev/skills) |
| `voice` | Local TTS + word timing + loudness | Kokoro, soundfile, faster-whisper, `av<16`, espeak-ng, FFmpeg | — |
| `data` | Charts + batch props | Remotion dataset render; SVG/Recharts/D3 in composition | — |
| `scene3d` | 3D shots in Remotion | `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` (± `@react-three/rapier`) | — |
| `maps` | Map animations | MapLibre / Mapbox per Remotion maps docs | `/remotion-maps` |
| `manim` | Math explainers | Manim Community, FFmpeg | — |
| `edit` | Cut/join footage | FFmpeg; MoviePy **or** Editly | — |
| `alt-html` | Apache HTML→MP4 escape | HyperFrames | HyperFrames repo agent skills |

## Genre → packs (required)

| genre_id | Packs |
|----------|-------|
| product-ad | core, assets, motion |
| ui-tutorial | core, assets |
| quote-short | core, assets |
| kinetic-feature | core, assets, motion |
| captioned-social | core, assets, captions, voice |
| audiogram | core, assets, captions |
| tip-daily | core, assets |
| data-chart | core, assets, data |
| dataset-batch | core, assets, data |
| unwrapped-stats | core, assets, data |
| product-3d | core, scene3d |
| map-route | core, maps |
| math-explainer | manim |
| clip-compile | edit, assets |

## Explicitly deferred (do not install by default)

| Tool | Why deferred |
|------|----------------|
| anime.js | Overlaps GSAP + Motion |
| Howler.js | Remotion has first-class audio for export |
| Rive / dotLottie | Use when designer delivers `.riv`/`.lottie`, or interactive-only |
| Motion Canvas | Prefer Remotion or Manim; weaker headless batch |
| Revideo | MIT alternative if Remotion license blocks; document in PLAN, do not dual-stack |

## License notes (packs)

- **Remotion:** free for individuals and orgs ≤3 employees; company license / Automators rules for larger or video-SaaS — see `engines.md`.
- **GSAP:** free for commercial sites/apps; prohibited in competing no-code animation builders.
- **HyperFrames:** Apache-2.0, no seat threshold.
- **Manim / MoviePy / faster-whisper / SVGO:** MIT (or as upstream states); verify before client delivery.
