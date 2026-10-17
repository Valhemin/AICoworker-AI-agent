# Visual Explanation and Information Design Playbook

## Purpose

Turn a concept, process, comparison, system, or dataset into a visual explanation that improves understanding. Decoration, cinematic mood, and visual complexity are not evidence of explanatory value.

## Start with the cognitive job

Choose the primary job:

- identify parts;
- compare alternatives;
- understand sequence;
- trace cause and effect;
- locate something in space;
- see change over time;
- understand hierarchy or containment;
- estimate magnitude;
- make a decision.

One visual can support multiple jobs, but it needs a dominant reading path.

## Representation choice

- labeled illustration for parts and spatial relationships;
- flowchart for decisions and process;
- timeline for chronological progression;
- before/after or small multiples for change;
- table for precise multi-attribute comparison;
- chart for quantitative pattern;
- map for spatial distribution;
- storyboard for action and state change;
- animation when motion, transformation, or sequence is itself the concept.

Do not animate a static relationship merely to increase activity.

## Explanation specification

```yaml
visual_explanation:
  audience_prior_knowledge:
  target_understanding:
  likely_misconception:
  representation:
  reading_order:
  visual_encoding:
  annotations:
  narration_or_caption_role:
  interaction_or_reveal_sequence:
  comprehension_check:
```

## Visual hierarchy

- one obvious entry point;
- consistent reading direction;
- contrast reserved for meaningful difference;
- labels close to the referenced object;
- alignment and grouping that reflect conceptual structure;
- whitespace to separate stages or layers;
- legends only when direct labeling would be worse;
- units, baselines, scales, and uncertainty shown when relevant.

## Animation and video

Use reveal order to manage cognitive load. Keep persistent anchors while other elements change. Signal transitions. Coordinate narration and image so they complement rather than duplicate each other word-for-word. Pause long enough for comparison or reading.

## Quantitative integrity

- use proportional encodings;
- avoid truncated axes unless clearly justified and labeled;
- distinguish count, rate, percentage, and percentage-point change;
- show uncertainty and missing data when decision-relevant;
- avoid 3D or area effects that distort magnitude;
- cite data source and date;
- make color semantics accessible and culturally reviewed.

## Global adaptation

Text expansion, reading direction, numeral/date formats, units, symbol meanings, color associations, maps, and examples vary. Keep editable layout, separate text layers, and locale-specific source files. Validate technical terminology with a domain-aware local reviewer.

## Testing

Ask target users to explain the visual without seeing the script. Record:

- first element noticed;
- inferred message;
- misunderstood relationships;
- time to answer the intended question;
- accessibility or readability issues.

## Failure recovery

- crowded: remove decorative elements and split into stages;
- misleading: change representation or scale;
- narration-dependent: add persistent labels and clearer causal states;
- too abstract: add a concrete example before the general model;
- locale breakage: redesign layout and symbols rather than shrinking translated text.

## Acceptance criteria

The intended audience can correctly infer the main relationship or complete the target task; visual encoding is honest; labels, units, sources, accessibility, and localization are complete.
