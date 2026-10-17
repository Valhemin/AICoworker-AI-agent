# Motion Graphics and VFX Planning Playbook

## Purpose

Plan motion design and visual effects as narrative and informational systems, with clear shot ownership, technical feasibility, references, dependencies, and quality-control criteria.

## Classify the work

- typography and kinetic type;
- logo/brand motion;
- data or interface animation;
- 2D/3D explainer graphics;
- compositing, cleanup, rotoscoping, keying, tracking;
- environment extension or replacement;
- particles, simulations, transformations;
- screen replacement and device content;
- generative inserts or style transfer;
- title/opening/transition packages.

Each category has different source requirements and review criteria.

## Shot VFX brief

```yaml
vfx_shot:
  shot_id:
  narrative_function:
  source_plate:
  frame_range:
  camera_metadata:
  effect_description:
  practical_elements:
  generated_elements:
  mattes_or_tracking:
  interaction_with_subject:
  lighting_and_grain_match:
  deliverables:
  fallback:
  approval_owner:
```

## Design system

Define typography, grid, safe zones, color, line/shape language, motion curves, transition grammar, texture, icon rules, and duration ranges. Repetition creates identity; variation should communicate hierarchy or progression.

## Motion principles

- movement needs cause, destination, and settling behavior;
- speed and easing imply weight and tone;
- preserve visual continuity across transitions;
- use anticipation to clarify complex changes;
- stagger elements to establish order;
- avoid simultaneous movement that competes for the same attention;
- reserve spectacular effects for moments with narrative or brand importance.

## Plate and capture planning

Plan lens, shutter, frame rate, motion blur, lighting direction, exposure, markers, clean plates, reference balls/charts, depth information, and camera movement before capture. AI cannot reliably recover every missing physical cue.

## Generative VFX

Use generated elements with explicit provenance and a replacement strategy. Benchmark edge interaction, temporal consistency, fine text, hands, reflections, shadows, and camera motion. Prefer generating isolated elements or controlled plates when full-shot generation creates unacceptable drift.

## Review stages

1. design frames;
2. motion test or blocking pass;
3. technical proof for hardest shot;
4. low-resolution sequence;
5. comp integration;
6. color/grain match;
7. delivery QC.

Do not wait for final render to discover that timing or hierarchy is wrong.

## Cost control

Estimate by shot complexity, duration, revisions, simulations, roto/cleanup, render resolution, and number of deliverable formats. Reuse templates and precomps, but avoid visibly generic motion. Lock typography and timing before expensive simulation or high-resolution render.

## Failure recovery

- effect looks detached: fix interaction, light, shadow, focus, grain, and motion blur;
- motion feels generic: define a brand-specific motion rule and remove unnecessary transitions;
- AI drift: shorten the generated interval, isolate elements, or composite over a stable plate;
- unreadable: reduce simultaneous motion and increase hold time;
- scope explosion: protect hero shots, simplify supporting shots, and use practical or 2D alternatives.

## Acceptance criteria

Every effect has a function, source and deliverable plan; design frames and technical tests are approved; compositing matches the plate; text and accessibility survive every format; files remain editable and traceable.
