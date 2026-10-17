# Production Design and Art Direction Playbook

## Visual system

Art direction translates story, audience, brand, and world rules into repeatable visual decisions.

Define:

- visual thesis;
- shape language;
- material language;
- palette with narrative states;
- texture and wear;
- location rules;
- wardrobe rules;
- prop hierarchy;
- typography and graphic language;
- visual motifs and their evolution;
- prohibited clichés or reference dependence.

## Palette as state

Do not specify only color names. Define where colors appear, relative dominance, contrast, saturation, and how the palette changes with story or information state.

## Prop design

A hero prop needs function, dimensions, material, condition, ownership, scene state, reference views, and interaction constraints. Props that carry plot information must be legible at the planned shot size.

## Brand integration

Use brand assets as part of the world rather than a late overlay. Preserve logo clear space, product truth, packaging accuracy, and local-market variants. Separate brand recognition from excessive repetition.

## AI-generation controls

- create canonical reference boards before prompt variants;
- use stable design tokens and asset IDs;
- specify invariants versus allowed variation;
- avoid style labels that conflict;
- document reference priority when multiple images are supplied;
- create negative examples for common drift;
- store approved outputs as future references.

## Accessibility and inclusion

Check contrast, text legibility, visual complexity, representation, and whether important information relies only on color. Avoid exoticizing or flattening cultures into décor.

## Failure patterns

- moodboard has many attractive but incompatible styles;
- palette does not support skin, product, or text readability;
- props change shape or scale between shots;
- production design tells a different period or socioeconomic reality than the script;
- visual novelty overwhelms the focal action;
- localized typography is treated as an afterthought.
## Production design specification

```yaml
design_asset:
  asset_id:
  function:
  canonical_views: []
  dimensions_or_scale:
  materials:
  condition_states: []
  market_variants: []
  shot_visibility_requirements:
  continuity_owner:
```

## Workflow

1. Translate the brief, story state, audience, and market into a one-sentence visual thesis.
2. Build two or three coherent design directions with explicit differences in mechanism, cost, and risk.
3. Select one direction before generating large asset batches.
4. Create canonical location, wardrobe, product, prop, graphic, and palette references.
5. Test hero subject, skin, product, type, and critical props under planned lighting and framing.
6. Publish invariants, allowed variation, and market variants to the visual bible.
7. Audit generated or captured assets against the approved state.

## Cost and failure recovery

Reuse modular locations, controlled wardrobe states, and editable graphics. Protect hero assets; simplify background detail that does not survive delivery size. If outputs drift, reduce conflicting references, rank reference priority, and isolate one design variable per test. If a design direction is unaffordable, preserve its shape, contrast, material, or motif logic rather than replacing it with unrelated generic imagery.

## Acceptance criteria

The visual system is coherent, producible, legible, culturally reviewed where needed, and represented by canonical assets that downstream camera, continuity, prompting, and editing skills can use without guessing.

