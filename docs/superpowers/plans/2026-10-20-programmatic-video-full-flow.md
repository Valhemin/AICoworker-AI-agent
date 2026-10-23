# Programmatic Video Full Flow — Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox syntax.

**Goal:** Add a full genre-routed programmatic video skill (Remotion-first) with packs, templates, and agent wiring so creators can produce ads, tutorials, social, data, 3D/maps, and math/edit videos.

**Architecture:** Router skill + reference catalogs + copy-paste Remotion templates under `library/skills/creator-visual/programmatic-video/`. No monorepo Remotion app with node_modules; agents scaffold via `npx create-video` then copy templates.

**Tech Stack:** Remotion (default), FFmpeg, optional HyperFrames/Manim/faster-whisper/R3F packs; Agent Skills format.

---

### Task 1: Skill router + references

- [x] Create `library/skills/creator-visual/programmatic-video/SKILL.md`
- [x] Add `references/genres.md`, `packs.md`, `engines.md`, `workflow.md`, `install.md`
- [x] Self-check: every phase 1–5 genre appears in genres.md with pack ids

### Task 2: Phase 1 templates

- [x] `templates/product-ad/ProductAd.tsx` + `props.json`
- [x] `templates/ui-tutorial/UiTutorial.tsx` + `props.json`
- [x] `templates/quote-short/QuoteShort.tsx` + `props.json`
- [x] `templates/README.md` — how to copy into Remotion project

### Task 3: Phase 2–5 stubs

- [x] `templates/captioned-social/` stub + props contract
- [x] `templates/data-chart/` stub + props contract
- [x] Note 3D/maps/math/edit in packs only (no heavy deps in repo)

### Task 4: Wire agents

- [x] Add `programmatic-video` to `openclaw.agents.example.json5` creator-visual skills
- [x] Update `workspaces/creator-visual/AGENTS.md` Allowed / Tools lines
- [x] Mention handoff in skill: OpenCreator optional after MP4

### Task 5: Verify

- [x] Grep confirms skill name in openclaw + skill folder
- [x] Spec success criteria checklist updated in this plan when done
