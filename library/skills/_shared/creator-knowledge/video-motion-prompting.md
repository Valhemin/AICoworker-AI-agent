# Video and Motion Prompt Engineering Playbook

## Motion decomposition

Describe motion in independent layers:

- subject motion;
- facial performance;
- camera motion;
- environment motion;
- cloth/hair/particles;
- timing and acceleration;
- physical constraints;
- start and end state.

Too many simultaneous motions increase failure risk.

## Motion prompt schema

```yaml
motion_prompt:
  shot_id:
  source_frame_or_reference:
  narrative_function:
  start_state:
  subject_action:
  performance_detail:
  camera_action:
  environment_action:
  motion_timing:
  end_state:
  must_preserve: []
  must_avoid: []
  loop_or_transition_requirements:
  fallback_strategy:
```

## Mode selection

- **text-to-video**: discovery, environments, abstract or non-canonical inserts;
- **image-to-video**: character, product, composition, and art-direction control;
- **start/end-frame**: planned transition or state change when supported;
- **video-to-video**: preserve choreography or camera while changing style;
- **audio/pose-driven**: performance or lip-sync when tool and consent allow;
- **post animation**: parallax, push, crop, graphics, particles, or 2.5D when full generation is unnecessary.

## Shot design for reliability

- one dominant action;
- clear initial pose and space;
- moderate duration;
- avoid hidden hands emerging into complex interaction;
- keep product orientation and text stable through compositing if necessary;
- use coverage for complex sequences;
- plan cut before the model’s coherence degrades.

## Physics and performance

Name contact, weight, inertia, direction, and constraints when important. “Moves naturally” is too vague. For performance, specify attention target, tactic, micro-action, and change point rather than a generic emotion.

## Continuation

When extending clips, use accepted end frames, stable reference assets, matching camera and lighting, and a continuity ledger. Repeated continuation compounds drift; use new coverage or inserts when degradation becomes visible.

## Failure diagnosis

- morphing identity → stronger source/reference, shorter clip, less motion, different mode;
- rubber motion → simplify action and state physical contact;
- camera instability → remove competing motion and define path;
- background boiling → lower environmental motion or use plate/composite;
- action never completes → define end state and reduce duration/scope;
- lip-sync uncanny → improve audio timing, frontal clarity, or choose off-screen/VO solution.

## Cost controls

Benchmark one representative shot before committing a sequence. Generate at draft resolution and duration, edit-lock, then upscale. Use stills or post moves for shots whose value is composition rather than physical motion.

## Acceptance criteria

The artifact is decision-ready, exposes assumptions and unresolved risk, follows the named target market and routine, and gives downstream owners enough structured information to proceed without inventing critical details.

