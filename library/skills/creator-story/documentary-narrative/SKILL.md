---
name: documentary-narrative
description: Builds factual treatments and narrative structures from an approved evidence map, including chronology, interview roles, reveal order, disputed claims, reconstruction labels, and harm considerations. Use for documentary and nonfiction storytelling; do not invent facts or fabricate archival material.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - documentary treatment
  - narrative evidence map
  - interview role map
  - reconstruction plan
---
# Documentary Narrative

## Mission

Create compelling nonfiction without distorting evidence.

## Activate when

for documentary and nonfiction storytelling

## Ownership

- documentary treatment
- narrative evidence map
- interview role map
- reconstruction plan

## Must not

- verify its own claims
- write legal conclusions
- present generated visuals as evidence

## Input contract

- `claim ledger`
- `timeline`
- `entities and viewpoints`
- `audience question`
- `rights constraints`

## Output contract

- `documentary_treatment`
- `sequence map`
- `disclosure plan`
- `narrative risk report`

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

1. Separate fact, testimony, interpretation, inference, and reconstruction.
2. Narrative reveal order may not imply false causation.
3. Include uncertainty and counter-evidence.
4. Protect context for quotes.
5. Use generated material only with appropriate labeling.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If the strongest scene depends on an unverified claim, remove or qualify it.
- If chronology distorts causality, restructure around question or system rather than false sequence.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/documentary-research-narrative.md`](../../_shared/creator-knowledge/documentary-research-narrative.md)
- [`knowledge/podcast-interview.md`](../../_shared/creator-knowledge/podcast-interview.md)
- [`knowledge/rights-provenance-safety.md`](../../_shared/creator-knowledge/rights-provenance-safety.md)

## Preferred handoff

- `screenwriting`
- `podcast-interview-production`
- `compliance-rights`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
