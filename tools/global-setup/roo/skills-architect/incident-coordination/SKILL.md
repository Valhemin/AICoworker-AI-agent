---
name: incident-coordination
description: Coordinate production incidents — severity triage, containment, stakeholder comms, resolution path, and post-incident record.
---

TRIGGER: production is degraded or down, a critical bug is live, or an emergency rollback is needed
OUTPUT: detailed — severity triage, containment action, stakeholder communication, resolution path, post-incident record
SKIP: non-production bugs or feature gaps that can wait for normal development cycle

---

# Incident Coordination

## Trigger Patterns

- "Production is down / broken / slow"
- "Users reporting [critical error]"
- "We need to rollback [feature/deploy]"
- "Critical bug is live — what do we do?"
- Severity escalation from Debug Pro

## Phases

### Phase 1 — Triage (first 5 minutes)

Establish:
1. **What is broken?** — affected system, endpoint, feature, user segment.
2. **When did it start?** — time of first signal (alert, user report, deploy).
3. **Impact scope** — % users affected, revenue/data risk, SLA breach risk.
4. **Known trigger** — recent deploy, config change, dependency outage, traffic spike.

Assign severity immediately:

| Severity | Criteria | Response |
|---|---|---|
| P0 | Total outage, data loss risk, or >50% users affected | Rollback or hotfix now |
| P1 | Partial outage or core feature broken | Fix or mitigate within 1 hour |
| P2 | Degraded performance or non-critical feature broken | Fix within same business day |
| P3 | Minor issue, workaround exists | Schedule fix |

### Phase 2 — Contain

- P0/P1: prefer **rollback** over forward-fix unless rollback risk is higher. State the tradeoff explicitly.
- Disable the broken feature flag / route traffic away from broken service if possible.
- Stop any deploy pipelines touching the affected system.
- Delegate root-cause investigation to Debug Pro — do not block containment on root cause.

### Phase 3 — Communicate

State to stakeholders (in plain language, no jargon):
- What is broken and who is affected.
- What is being done right now.
- ETA for resolution (or "investigating, update in X minutes").

Update every 15 minutes for P0, every 30 for P1, until resolved.

### Phase 4 — Resolve

- After containment: delegate root-cause fix to Debug Pro or Implement Pro.
- Verify fix in staging before re-deploy if time allows.
- Re-enable feature / restore traffic in stages if risk permits.
- Confirm resolution with monitoring data, not just "it feels fixed."

### Phase 5 — Post-Incident

After resolution, immediately create a postmortem item. Use `retrospective-postmortem` skill within 24 hours for P0/P1.

Minimum incident record:
```
- Incident: [title]
- Severity: P0/P1/P2/P3
- Duration: [start] → [end]
- Impact: [users/systems affected]
- Root cause: [one sentence]
- Fix applied: [what changed]
- Prevention: [what will stop recurrence]
- Postmortem scheduled: yes/no
```

## Lead Responsibilities During Incident

- Owns the timeline and communication cadence. Does not disappear into debugging.
- Delegates investigation and fixes — does not implement solo during P0/P1.
- Makes the rollback/hotfix decision. Does not defer indefinitely.
- Records every decision with a timestamp and rationale (even brief notes).

## After Incident Closes

Feed incident record into `retrospective-postmortem`. Update `delivery-roadmap` if incident reveals a milestone risk or forces re-ordering.
