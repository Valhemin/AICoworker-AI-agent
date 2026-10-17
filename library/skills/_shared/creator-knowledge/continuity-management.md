# Continuity Management Playbook

## Continuity dimensions

- identity and body proportions;
- hair, makeup, wardrobe, accessories;
- props and possession;
- damage, dirt, food, liquid, and consumable state;
- action and eyeline match;
- screen direction and geography;
- time, weather, light, and environment;
- dialogue, performance intensity, and emotional state;
- product packaging and readable text;
- world rules and chronology.

## State ledger

```yaml
continuity_event:
  scene_id:
  shot_id:
  entity_id:
  property:
  before:
  change:
  after:
  source_reference:
  severity_if_wrong: low|medium|high|critical
```

Track state changes at the scene level before writing prompts.

## Reference hierarchy

1. locked canonical asset;
2. approved scene-state reference;
3. previous accepted shot end frame;
4. descriptive prompt;

When references conflict, the system must state which has priority.

## Generated-asset check

Compare each accepted asset against:

- face and body landmarks;
- wardrobe and prop IDs;
- location geometry;
- lighting direction;
- action start/end state;
- product text and logo;
- forbidden changes;
- neighboring shots.

Do not accept an attractive frame that breaks a critical story state.

## Repair hierarchy

1. prompt or parameter correction;
2. stronger or cleaner reference;
3. local edit/inpaint;
4. alternate angle or crop;
5. split shot or insert coverage;
6. change generation mode or model;
7. redesign the shot.

Repeated full regeneration is often the most expensive repair.

## Continuity budget

Not every variation matters equally. Define:

- critical invariants: identity, product, story prop, injury, direction;
- acceptable variation: folds, small background detail, non-story hair movement;
- stylistic variation allowed by sequence;
- defects hidden by crop, motion blur, or duration only when they do not mislead.

## Failure patterns

- continuity checked only after all renders;
- wardrobe described by prose instead of ID/reference;
- scene order changes without updating states;
- last frame of one clip cannot connect to first frame of next;
- light and weather treated as style rather than chronology;
- identity similarity evaluated only from one angle.

## Acceptance criteria

The artifact is decision-ready, exposes assumptions and unresolved risk, follows the named target market and routine, and gives downstream owners enough structured information to proceed without inventing critical details.

