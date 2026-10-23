# Install notes

All network and system installs are **high risk** unless already on the machine. Prefer documenting commands in PLAN.md / RISK approval files over silent install.

## Prerequisites (core)

- Node.js 18+ on PATH (Remotion current docs may prefer newer; check create-video output)
- FFmpeg on PATH (`ffmpeg -version`)
- For HyperFrames: Node ≥22 per upstream when using that engine

## Agent skills (recommended before writing compositions)

Package names last checked 2026-10-22 against upstream docs/READMEs; re-check if an install 404s.

```bash
# Remotion API + captions/maps guidance
npx skills add remotion-dev/skills

# Motion design taste (timing, kinetic type, Remotion craft)
npx skills add iart-ai/motion-design-skills

# Optional: broadcast-style Remotion graphics
# npx skills add liamrjohnston/remotion-motion-graphics-skill

# When pack `motion` is required
npx skills add https://github.com/greensock/gsap-skills
npx motion-ai
```

Install into the agent environment the user actually runs (Cursor / Claude / OpenClaw skill dirs)—not into git unless the team standardizes on vendored skills.

## Remotion project (per product)

From the project `programmatic-video/` folder (after approval):

```bash
npx create-video@latest remotion --blank
# or non-interactive variants from current Remotion docs
```

Copy TSX templates from this skill’s `templates/` into `remotion/src/`. Register compositions in `Root.tsx`.

```bash
cd remotion
npm run dev
# after WAITING REVIEW:
npx remotion render src/index.ts ProductAd out/product-ad-1080x1920.mp4 --port=3991
# --port: default 3000 may be taken by another local app (render then fails with "verify that it is a Remotion project")
```

## Pack installs (inside Remotion app when needed)

```bash
# assets (examples — add only what you use)
npm install satori @resvg/resvg-js   # if generating SVG/PNG titles in Node
# svgo as CLI: npx svgo input.svg

# motion
npm install gsap motion

# captions helpers
# follow Remotion captions docs / @remotion/captions

# scene3d
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
# optional: @react-three/rapier

# maps — follow remotion maps skill / MapLibre docs
```

## Captions transcription (host)

```bash
# Python env — do not sudo; use venv
pip install faster-whisper
# or WhisperX for word-level alignment when needed
```

Export JSON/SRT → Remotion caption components.

## Manim (phase 5)

```bash
pip install manim
# requires FFmpeg; follow Manim Community install docs for OS extras
```

## HyperFrames (alt-html)

```bash
npm install -g hyperframes   # or: npx hyperframes (no global install); needs Node >=22 + FFmpeg
npx skills add heygen-com/hyperframes   # agent skills
```

## Edit pack

```bash
# MoviePy
pip install moviepy
# or Editly (Node)
npm install -g editly
```

## Verify

| Check | Command / proof |
|-------|-----------------|
| FFmpeg | `ffmpeg -version` |
| Remotion project | Studio opens; composition listed |
| Render | `out/*.mp4` exists, size > 0 |
| Agent skills | Agent can answer Remotion `useCurrentFrame` without outdated API |
