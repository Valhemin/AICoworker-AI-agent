# Full workflow

```
Brief + assets
    → genre_id (genres.md)
    → engine (engines.md)
    → packs[] (packs.md)
    → install missing packs (install.md) [approval if network/system]
    → scaffold or reuse Remotion (or alt) project under project folder
    → copy template; fill props
    → Studio preview
    → WAITING REVIEW
    → local render → out/*.mp4
    → verify file
    → optional OpenCreator handoff (subtitle / voice / cover)
```

## Project folder layout

```text
shared/01_Projects/<domain>/<project>/programmatic-video/
  PLAN.md                 # genre, packs, commands, gates
  props.json              # composition inputs
  assets/                 # screenshots, logo, audio, csv
  remotion/               # optional local Remotion app (gitignored node_modules)
  out/                    # rendered MP4 / PNG
  evidence/               # preview frames, logs
```

Do not scatter renders at repo root.

## PLAN.md minimum sections

1. **Brief** — one paragraph  
2. **genre_id / engine / packs**  
3. **Aspects** — 16:9 and/or 9:16  
4. **Assets** — paths  
5. **Template** — source path in this skill  
6. **Commands** — preview + render (render marked WAITING REVIEW)  
7. **QC** — claims match product; text readable on mobile; duration  
8. **Next** — done | opencreator-handoff | second genre pass  

## QC checklist (before calling done)

- [ ] File exists at claimed `out/` path and size > 0  
- [ ] Correct aspect(s) requested in brief  
- [ ] No fabricated metrics/logos  
- [ ] Safe margins for captions on 9:16  
- [ ] Audio present if plan promised audio  
- [ ] Rights/provenance noted for third-party assets  

## OpenCreator handoff

When the MP4 is picture-lock but needs subtitles, TTS, bilingual burn-in, or cover:

1. Point `opencreator-handoff` at the local MP4 path.  
2. Do not re-render Remotion for subtitle-only changes if OpenCreator can overlay.  
3. Keep Remotion as source of truth for motion-graphic masters.

## Parallel with generative video

| Need | Path |
|------|------|
| Controlled UI/type/chart motion | This skill |
| Photoreal / impossible camera / performance | `video-motion-prompt-engineering` then edit |
| Hybrid | Gen B-roll → `clip-compile` or Remotion `<OffthreadVideo>` overlay |
