# Engines

## Decision tree

1. Need **math/algorithm** visuals → **Manim**.
2. Need **cut/join existing clips** only → **FFmpeg** (+ MoviePy or Editly).
3. Need **Apache-2.0 / HTML+GSAP** or Remotion license risk → **HyperFrames**.
4. Otherwise → **Remotion** (default).

## Remotion (default)

- **Authoring:** React + TypeScript; `useCurrentFrame()` / `interpolate` / `spring`.
- **Output:** MP4, WebM, ProRes, image sequence, GIF.
- **Strengths:** Templates, dataset batch, captions, R3F, Lambda maturity, agent skills.
- **License:** Source-available. Free for individuals and for-profit orgs with ≤3 employees (and nonprofits). Larger orgs need a company license; Automators pricing can apply when selling automated renders — check current remotion.dev/license.
- **Scaffold:** `npx create-video@latest` then copy templates from this skill.
- **Preview:** `npm run dev` / Remotion Studio.
- **Render:** `npx remotion render src/index.ts <CompositionId> out/file.mp4 --port=<free port>` (WAITING REVIEW first). Pass entry file and `--port` explicitly; port 3000 is often busy.

## HyperFrames (escape)

- **Authoring:** HTML/CSS + seekable GSAP/Lottie/CSS.
- **Output:** Deterministic MP4 via Chrome + FFmpeg.
- **Strengths:** Apache-2.0, agent-friendly HTML, no Remotion seat threshold.
- **Weaknesses:** Younger ecosystem than Remotion; different mental model (seek timelines).
- **When:** User insists on OSS license cleanliness, or HTML/GSAP assets already exist.

## Manim (phase 5)

- **Authoring:** Python scenes.
- **Output:** MP4 (math explainer).
- **When:** Equations, geometry, algorithm visualization — not product UI ads.

## FFmpeg / MoviePy / Editly (phase 5 edit)

- **When:** Source media already exists; need trim, concat, overlay, burn-in titles.
- **Output:** MP4.
- Prefer FFmpeg for simple ops; MoviePy/Editly for scripted timelines.

## What engines are not

| Tool | Role |
|------|------|
| GSAP / Motion / anime.js | Animation libraries **inside** a composition or web page — not full video exporters alone |
| Satori / SVGO | Asset generation/optimize |
| Mediabunny | Encode/convert (Remotion integrates related tooling) |
| Rive / dotLottie | Interactive or designed animation files |
| Generative video APIs | Pixel generation — different skill path |
