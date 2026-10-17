# Character and World Bible Playbook

## Character canon

Separate immutable identity from scene variables.

```yaml
character:
  character_id:
  narrative_role:
  age_range:
  physical_invariants: []
  face_reference_ids: []
  body_and_movement:
  voice_profile:
  worldview:
  want:
  need:
  limitation:
  relationships: []
  wardrobe_sets: []
  props: []
  allowed_variations: []
  forbidden_changes: []
```

Do not encode protected attributes or personal data without a legitimate creative need and appropriate consent.

## Visual reference set

For recurring generated characters, create:

- neutral front, three-quarter, and profile views;
- full-body proportion reference;
- expression sheet;
- wardrobe turnarounds;
- distinctive props;
- lighting-neutral identity reference;
- approved style examples;
- negative examples of identity drift.

A single beauty portrait is not enough for multi-shot continuity.

## Character behavior

Identity is more than face. Track posture, gesture range, walking style, eye contact, personal space, habits, and response under stress. These improve performance consistency and story credibility.

## World rules

```yaml
world:
  time_period:
  geography:
  social_rules:
  technology_level:
  physical_rules:
  economic_constraints:
  locations: []
  visual_motifs: []
  sound_motifs: []
  forbidden_anachronisms: []
```

A world rule should affect choices and production design, not merely decorate the bible.

## Location bible

For each recurring location capture geography, entrances, windows, light direction, key furniture, prop positions, time-of-day states, sound, and camera-safe zones. Create a simple overhead map for action continuity.

## Canon changes

Any intentional change—haircut, injury, wardrobe, prop possession, relationship status—needs a timestamp or scene boundary and must update downstream references.

## Failure patterns

- overly poetic descriptions with no controllable visual detail;
- wardrobe described differently in every prompt;
- character age or proportions drift;
- world rules introduced only when plot needs them;
- prop continuity not tied to scene state;
- reference images use conflicting styles or facial structure.

## Acceptance criteria

The artifact is decision-ready, exposes assumptions and unresolved risk, follows the named target market and routine, and gives downstream owners enough structured information to proceed without inventing critical details.

