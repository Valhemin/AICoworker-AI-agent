---
name: cross-team-dependency-tracking
description: "Track external team, API, and service dependencies with risk assessment and escalation protocol during delivery planning."
---

TRIGGER: delivery depends on work owned by another team, a third-party API, or an external service not controlled by this project
OUTPUT: detailed — dependency register, risk assessment (High/Medium/Low), mitigation options, escalation protocol
SKIP: internal dependencies within the same team or codebase

---

# Cross-Team Dependency Tracking

## Trigger Patterns

- "We're blocked on [team/service/vendor]"
- "Our milestone depends on [external API / another squad / infra team]"
- "Track what we need from outside before we can ship"
- "Third-party X hasn't delivered Y yet"
- During `delivery-roadmap` planning when any milestone has an external input

## Workflow

### Phase 1 — Identify All External Dependencies

For each milestone in the roadmap, list every external input required before the milestone can complete.

| Dependency | Type | Owner | Required by | Current status | Risk |
|---|---|---|---|---|---|
| [what we need] | [API / service / data / decision / approval] | [team/vendor] | [milestone/date] | [not started / in progress / blocked / delivered] | [low/medium/high] |

Dependency types:
- **API / Service** — third-party endpoint or SDK not yet available or stable.
- **Data** — dataset, schema, or seed data from another team.
- **Decision** — architectural, legal, or product decision owned externally.
- **Approval** — security review, compliance sign-off, stakeholder sign-off.
- **Infrastructure** — environment, credentials, or platform not owned by this project.
- **Integration** — another team's feature that this project must integrate against.

### Phase 2 — Risk Assessment

For each dependency:

**Risk = Likelihood of delay × Impact on milestone**

| Risk level | Criteria |
|---|---|
| High | Blocks a P0 milestone, no known workaround, ETA unknown |
| Medium | Blocks a milestone but workaround exists, or ETA is known but tight |
| Low | Non-blocking or dependency has already started with clear ETA |

High-risk dependencies get a mitigation plan immediately. Do not defer.

### Phase 3 — Mitigation Options

For each High or Medium dependency, choose:

- **Stub / mock** — build against a contract now; swap real implementation when dependency arrives.
- **Decouple** — restructure the milestone so the external piece is isolated and can be swapped in later without rework.
- **Escalate** — raise visibility with the external owner; set a hard deadline.
- **Reorder** — move the dependent milestone later in the roadmap and advance unblocked work.
- **Replace** — evaluate an alternative (use `feasibility-research` skill).
- **Accept risk** — explicitly acknowledge the risk and the plan if the dependency is late.

### Phase 4 — Tracking Register

Maintain a dependency register updated at each milestone synthesis:

```
# Dependency Register — [project name]
Last updated: [date]

| ID | Dependency | Owner | Required by | Status | Risk | Mitigation | Last contact |
|---|---|---|---|---|---|---|---|
| D1 | | | | | | | |
```

Write to `docs/dependencies.md`. Update it at every `delivery-roadmap` milestone synthesis. Do not let it go stale.

### Phase 5 — Escalation Protocol

If a dependency is overdue and blocking a milestone:
1. State the block explicitly in the milestone synthesis: "D1 is overdue by X days. Milestone Y is blocked."
2. Identify which mitigation applies: stub, reorder, or escalate.
3. If escalate: draft the escalation message — owner, what is needed, when it was due, impact of continued delay, requested resolution date.
4. If no resolution within 2 milestone cycles: surface to the user for stakeholder intervention.

## Rules

- Never assume an external dependency is on track because it hasn't been flagged as late. Verify at each milestone gate.
- Stubs and mocks must have a clear swap-in plan and a named milestone when the real integration is expected.
- An unmitigated High-risk dependency is a milestone gate failure. Do not advance the milestone without a mitigation decision.

## Feed Into

- `delivery-roadmap` — dependency status is part of every milestone gate.
- `feasibility-research` — when a dependency replacement needs evaluation.
- `incident-coordination` — when a dependency failure causes a production incident.
