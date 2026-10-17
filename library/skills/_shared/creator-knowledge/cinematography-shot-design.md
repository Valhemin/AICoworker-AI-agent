# Cinematography and Shot Design Playbook

## Shot function first

Every shot must answer: what new story, emotion, evidence, spatial information, or visual pleasure does it provide?

## Shot variables

- frame size;
- camera height and angle;
- lens or field-of-view behavior;
- camera-to-subject distance;
- composition and negative space;
- depth layers;
- camera movement;
- subject movement;
- lighting direction, quality, contrast, and motivation;
- duration and cut motivation.

Do not use “cinematic” as a substitute for decisions.

## Lens intent

Use lens choice to shape spatial relation and attention:

- wider field close to subject increases environment and perspective exaggeration;
- longer field compresses depth and isolates layers;
- neutral perspective supports clarity;
- macro or insert reveals causal detail.

Exact focal length depends on sensor or model behavior; define intent and field of view when physical simulation is uncertain.

## Camera movement

Movement needs motivation:

- reveal information;
- follow action;
- change relationship;
- increase or release pressure;
- shift point of view;
- create embodied energy.

Avoid stacking camera and subject motion beyond model reliability.

## Lighting plan

Specify source motivation, direction, quality, ratio, color relation, exposure priority, and continuity. Track sun/window direction and practical lights across coverage.

## Shot-list schema

```yaml
shot:
  shot_id:
  scene_id:
  narrative_function:
  subject_and_action:
  frame_size:
  angle_height:
  field_of_view_intent:
  composition:
  camera_motion:
  subject_motion:
  lighting:
  start_state:
  end_state:
  duration_seconds:
  cut_in_reason:
  cut_out_reason:
  continuity_dependencies: []
  generation_risk:
  fallback_coverage:
```

## AI-production risk classes

- low: static object, simple portrait, slow environmental motion;
- medium: one person walking, controlled camera move, simple prop use;
- high: multiple interacting people, hands manipulating small objects, fast choreography, reflective text-heavy products, long continuous motion.

High-risk shots require benchmark or coverage fallback before final generation.

## Failure patterns

- every shot is a centered medium shot;
- lens and camera movement conflict with emotional purpose;
- lighting direction changes between cuts;
- no establishing geography but action depends on space;
- close-ups are used without performance or information value;
- shot duration is determined by generation length rather than edit need.
