# Analytics and Experimentation Playbook

## Measurement starts before production

Define the causal question and metric tree before creating variants.

```yaml
experiment:
  hypothesis:
  audience:
  market:
  platform:
  unit_of_analysis:
  treatment_variants: []
  control:
  primary_metric:
  diagnostic_metrics: []
  guardrail_metrics: []
  minimum_exposure_or_duration:
  decision_rule:
  confounders: []
  result:
  learning:
```

## Metric interpretation

- impression-to-view: package and distribution;
- early hold: opening and audience match;
- average watch and retention curve: structure, value, pacing;
- rewatches: delight, density, or confusion;
- shares/saves: identity, utility, or social currency;
- comments: questions, objections, community, controversy;
- click quality/conversion: offer and audience qualification;
- repeat viewers: series and brand value;
- learning assessment: comprehension and transfer.

No single metric explains performance.

## Creative coding

Tag assets by mechanism, not only topic:

- hook type;
- proof type;
- emotional frame;
- creator/character type;
- format;
- duration;
- CTA;
- production tier;
- market and locale.

This enables pattern analysis across projects.

## Experiment quality

- change one major variable when causal learning matters;
- use package tests when variables intentionally work together;
- distinguish concurrent from sequential tests;
- record paid spend and targeting changes;
- avoid comparing assets published in incomparable contexts;
- include negative and null results.

## Learning loop

After each release:

1. collect technical and audience outcomes;
2. diagnose by stage rather than blame “the algorithm”;
3. update confidence in market and creative hypotheses;
4. add accepted and rejected examples to the calibration set;
5. revise routing, cost assumptions, and evaluator anchors;
6. expire patterns that depend on old platform behavior.

## Failure patterns

- post-hoc hypothesis after seeing results;
- optimizing CTR while watch quality falls;
- tiny sample treated as universal truth;
- only winning content is coded;
- no link between creative attributes and metrics;
- local-market result generalized globally.
