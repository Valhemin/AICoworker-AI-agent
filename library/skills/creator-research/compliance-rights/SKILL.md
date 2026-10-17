---
name: compliance-rights
description: Reviews claims, licenses, asset provenance, consent, likeness/voice use, disclosures, platform restrictions, and safety risk. Use before publishing and for risky assets; do not provide legal certainty beyond available evidence.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - rights report
  - claim-risk report
  - disclosure requirements
  - release blockers
---
# Compliance Rights

## Mission

Prevent unauthorized, misleading, unsafe, or untraceable publication.

## Activate when

before publishing and for risky assets

## Ownership

- rights report
- claim-risk report
- disclosure requirements
- release blockers

## Must not

- clear unknown rights by assumption
- rewrite creative content itself
- replace qualified legal review where required

## Input contract

- `asset registry`
- `claim ledger`
- `consent records`
- `market/platform profiles`
- `final package`

## Output contract

- `rights_and_compliance_report`
- `hard stops`
- `required edits/disclosures`
- `waivers`

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

1. Separate code, model, weights, dataset, and output terms.
2. Verify scope of likeness/voice consent.
3. Match claim strength to evidence.
4. Review each locale for changed meaning.
5. Label synthetic reconstructions when audience confusion is foreseeable.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If rights are unknown, replace, obtain permission, or remove the asset.
- If claim risk is unresolved, narrow or delete wording and escalate to qualified reviewer.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/rights-provenance-safety.md`](../../_shared/creator-knowledge/rights-provenance-safety.md)
- [`knowledge/documentary-research-narrative.md`](../../_shared/creator-knowledge/documentary-research-narrative.md)
- [`knowledge/global-localization-transcreation.md`](../../_shared/creator-knowledge/global-localization-transcreation.md)

## Preferred handoff

- `quality-evaluation`
- `creative-producer`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.

## Release note

Record the exact artifact version, unresolved uncertainty, and cheapest valid fallback before handoff.

