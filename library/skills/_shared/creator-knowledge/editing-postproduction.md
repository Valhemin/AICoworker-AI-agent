# Editing and Post-Production Playbook

## Edit logic

Cut because attention, information, emotion, action, or point of view changes. Do not cut on a fixed timer.

## Passes

1. **Radio edit** — speech and story logic.
2. **Structure edit** — order, duration, promise/payoff.
3. **Picture edit** — coverage, performance, visual clarity.
4. **Rhythm edit** — shot duration, pauses, accelerations, resets.
5. **Sound edit** — dialogue, ambience, effects, music.
6. **Graphics/captions** — readable, timed, accessible.
7. **Color and finishing** — continuity, hierarchy, brand.
8. **Platform and localization versions** — crops, text, duration, CTA.
9. **QC** — technical, claims, rights, continuity, export.

## J-cuts and L-cuts

Use audio overlap to guide attention, smooth transitions, or create anticipation. Avoid overusing transitions when a motivated straight cut is stronger.

## Generated-media editing

- cut before identity or motion degrades;
- use inserts, reaction shots, and sound to bridge discontinuity;
- stabilize only when it does not create new warping;
- avoid hiding critical errors with excessive motion blur;
- use clean plates and local fixes for logos, text, or product geometry;
- keep source manifest linked to timeline clips.

## Captions

Captions should be accurate, readable, and timed to speech. Do not cover faces, product, or platform UI. Use emphasis sparingly. Provide accessible caption files when needed, not only burned-in text.

## Versioning

Maintain master timeline, platform derivatives, locale versions, and package versions. Changes to script, claims, or timing must propagate to captions, audio, and localization.

## QC checklist

- no flash frames or missing media;
- correct aspect ratio, resolution, frame rate, color, and audio channels;
- consistent spelling and locale;
- safe-zone check;
- subtitle timing and line breaks;
- claim and disclosure visibility;
- no unlicensed temp assets;
- final duration and CTA correct;
- thumbnail/cover matches content.

## Cost controls

Edit-lock before upscaling, interpolation, final lip-sync, or multi-locale rendering. Use proxy media and automated technical checks. Repair only defects visible at delivery size and duration unless they affect truth or continuity.
## Edit decision record

```yaml
edit_decision:
  timeline_range:
  current_function:
  problem:
  proposed_change:
  cut_motivation:
  downstream_effects: []
  owner_or_approval:
```

## Rhythm and retention diagnostics

Distinguish confusion, boredom, emotional underdevelopment, repetitive proof, and technical distraction. Faster cutting only treats some boredom and can worsen every other problem. Preserve reaction, inference, and comprehension time when they carry meaning.

## Audio hierarchy

Prioritize intelligible dialogue or teaching content, then meaningful effects and ambience, then music. Use loudness and dynamics appropriate to the delivery platform. Check translated/dubbed mixes independently because speech length and emphasis change.

## Failure recovery

- missing coverage: use motivated inserts, reframing, graphics, audio bridges, or a targeted pickup;
- continuity error: choose the least meaning-damaging angle, repair locally, or revise the sequence rather than hiding it with random B-roll;
- weak opening: compare package promise with the first proof and remove orientation debt;
- bloated middle: group repeated claims and protect the strongest example;
- synthetic artifact: shorten, replace, composite, or redesign the shot based on visibility and narrative importance;
- localization overflow: reconform picture/audio/captions as a locale version.

## Acceptance criteria

The edit has clear causal or explanatory progression, motivated rhythm, intelligible and rights-cleared audio, accurate captions, traceable generated sources, no critical continuity or claim errors, and platform/locale deliverables that pass final QC.

