---
name: video-motion-prompt-engineering
description: Compiles approved shot intent into model-specific motion prompts, decomposing subject, performance, camera, environment, timing, physics, start/end states, negatives, and fallbacks. Use for video generation after visual-plan approval; do not redesign the shot silently.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - motion prompt package
  - motion constraints
  - mode recommendation
  - shot fallback
---
# Video Motion Prompt Engineering

## Mission

Create feasible, controlled motion-generation instructions.

## Activate when

for video generation after visual-plan approval

## Ownership

- motion prompt package
- motion constraints
- mode recommendation
- shot fallback

## Must not

- change script or blocking
- add competing motions for spectacle
- approve identity continuity

## Input contract

- `approved shot`
- `source frame/reference`
- `continuity state`
- `model adapter`
- `duration and edit need`

## Output contract

- `motion_prompt`
- `generation_mode`
- `adapter settings`
- `fallback_strategy`

Every output includes:

```yaml
meta:
  project_id:
  artifact_id:
  artifact_type:
  owner_skill: {name}
  version:
  source_artifact_ids: []
  assumptions: []
  evidence_ids: []
  rights_status: unknown
  confidence: 0.0
  created_at:
```

## Decision rules

1. Use one dominant action per shot.
2. Define start and end state.
3. Choose text-to-video, image-to-video, continuation, or post animation based on control need.
4. State physical contact and timing when important.
5. Cut before expected coherence degradation.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If identity morphs, shorten motion or strengthen reference.
- If action does not complete, reduce scope and specify end state.
- If background boils, use a plate or lower environmental motion.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/video-motion-prompting.md`](../../_shared/creator-knowledge/video-motion-prompting.md)
- [`knowledge/cinematography-shot-design.md`](../../_shared/creator-knowledge/cinematography-shot-design.md)
- [`knowledge/continuity-management.md`](../../_shared/creator-knowledge/continuity-management.md)

## Preferred handoff

- `ai-production-technical-direction`
- `continuity-supervision`
- `editing-postproduction`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
