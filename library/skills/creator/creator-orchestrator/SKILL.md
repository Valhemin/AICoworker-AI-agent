---
name: creator-orchestrator
description: Routes global content-production requests to the smallest sufficient set of specialist skills, manages project state, quality gates, cost ceilings, handoffs, and revision ownership. Use for multi-stage creator projects, ambiguous requests, or project audits; do not use as the domain writer or prompt engineer.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - normalized brief draft before approval
  - routine selection
  - execution DAG
  - gate schedule
  - change-request routing
  - global cost and risk register
---
# Creator Orchestrator

For a video link or file that needs subtitles, dubbing, frame format, or a cover image: use an `opencreator-*` skill on `creator-publish`. Do not route that work to storytelling skills.

## Mission

Turn a user request into a controlled execution plan and maintain the shared project state.

## Activate when

for multi-stage creator projects, ambiguous requests, or project audits

## Ownership

- normalized brief draft before approval
- routine selection
- execution DAG
- gate schedule
- change-request routing
- global cost and risk register

## Must not

- write final scripts
- invent market evidence
- change owner artifacts
- approve its own final output

## Input contract

- `user request`
- `available assets and tools`
- `quality/cost preference`
- `existing project state if any`

## Output contract

- `orchestration_result`
- `knowledge-load plan`
- `adapter plan`
- `artifact plan`
- `gate results and routed change requests`

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

1. Select the smallest routine that satisfies every required deliverable.
2. Stop on blocking unknowns; expose safe assumptions.
3. Load only the next decision’s skills and references.
4. Require target market and platform before market-sensitive work.
5. Do not spend render budget before concept, script, and visual-plan gates.
6. Escalate repeated defects by changing strategy, not rerolling.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If two routes appear valid, compare required artifacts, cost, and omitted risk.
- If owner conflict appears, pause and resolve the ownership matrix.
- If context grows, produce a state summary and pass only artifact IDs plus necessary excerpts.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/cost-optimization.md`](../../_shared/creator-knowledge/cost-optimization.md)
- [`knowledge/global-localization-transcreation.md`](../../_shared/creator-knowledge/global-localization-transcreation.md)
- [`knowledge/platform-native-creative.md`](../../_shared/creator-knowledge/platform-native-creative.md)

## Preferred handoff

- `all activated skills`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
