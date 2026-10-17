---
name: research-fact-verification
description: Builds evidence and claim ledgers, verifies factual or product claims, distinguishes facts from inference and reconstruction, checks source quality and freshness, and flags uncertainty. Use for nonfiction, education, ads, regulated claims, or any current facts; do not write narrative structure.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - evidence ledger
  - claim map
  - source-quality assessment
  - uncertainty labels
  - fact defect report
---
# Research Fact Verification

## Mission

Ensure factual statements and proof are traceable and appropriately qualified.

## Activate when

for nonfiction, education, ads, regulated claims, or any current facts

## Ownership

- evidence ledger
- claim map
- source-quality assessment
- uncertainty labels
- fact defect report

## Must not

- choose a market angle
- write dramatic scenes
- approve legal compliance

## Input contract

- `approved brief`
- `draft claims or source material`
- `market and time window`
- `risk category`

## Output contract

- `evidence_ledger`
- `claim_ledger`
- `research_gaps`
- `allowed wording and prohibited overclaims`

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

1. Prioritize primary sources for critical claims.
2. Map each claim to exact supporting evidence.
3. Search for counter-evidence and source dependence.
4. Treat time-sensitive facts as expiring.
5. Label reconstructions and generated visuals separately from evidence.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If evidence is weak, narrow the claim, add uncertainty, replace the proof, or remove the claim.
- If sources conflict, represent the disagreement and identify what would resolve it.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/documentary-research-narrative.md`](../../_shared/creator-knowledge/documentary-research-narrative.md)
- [`knowledge/rights-provenance-safety.md`](../../_shared/creator-knowledge/rights-provenance-safety.md)
- [`knowledge/market-intelligence.md`](../../_shared/creator-knowledge/market-intelligence.md)

## Preferred handoff

- `market-intelligence`
- `screenwriting`
- `documentary-narrative`
- `compliance-rights`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
