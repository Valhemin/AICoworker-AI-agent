---
name: retrospective-postmortem
description: "Run a retrospective or postmortem after a milestone, sprint, or incident — what went well/wrong, root causes, action items with owners."
---

TRIGGER: after a milestone completes, sprint ends, or incident resolves (P0/P1 mandatory; P2/P3 optional)
OUTPUT: detailed — what went well/wrong, root causes, incident timeline (postmortem), concrete action items with owner/due date
SKIP: ongoing active incidents (use incident-coordination); retros run only after work concludes

---

# Retrospective / Postmortem

## Trigger Patterns

- "Let's do a retro on [milestone/sprint]"
- "Postmortem for [incident]"
- "What went wrong with [feature/delivery]?"
- After `incident-coordination` closes a P0 or P1

## Retro vs. Postmortem

| Mode | Use when | Focus |
|---|---|---|
| **Retrospective** | Milestone or sprint completed | Process, teamwork, delivery quality |
| **Postmortem** | Incident resolved | Root cause, timeline, prevention |

Both use the same structure below; postmortems add the incident timeline section.

## Workflow

### Phase 1 — Gather Evidence (before opinions)

Collect factual inputs first:
- What was planned vs. what shipped?
- Milestone gate results (pass / fail / partial) from `delivery-roadmap` synthesis.
- Incident record if applicable (from `incident-coordination`).
- Any test failures, rollbacks, or hotfixes during the period.
- Velocity delta: did delivery take longer than estimated? By how much?

Do not start with "what went wrong" — start with what actually happened.

### Phase 2 — Structured Analysis

#### What Went Well
- Delivery items that hit gate, under time, or with low rework.
- Processes that held up under pressure.
- Decisions that turned out correct.

#### What Went Wrong
- Missed gates, late deliveries, rework loops.
- Decisions that were wrong or made too late.
- Communication breakdowns or unclear ownership.

#### Root Cause Analysis (postmortem: required; retro: for repeated failures)

Use 5 Whys or equivalent. Stop at the systemic cause, not the surface symptom.

```
Symptom: [what broke]
Why 1: [immediate cause]
Why 2: [cause of that]
...
Root cause: [systemic issue]
```

#### Incident Timeline (postmortem only)

```
[time] — [event: alert fired / deploy triggered / detection / escalation / fix / resolution]
```

### Phase 3 — Action Items (mandatory, concrete)

Every finding must produce either an action item or an explicit "accept and monitor" decision.

| Finding | Action | Owner | Due | Tracks to |
|---|---|---|---|---|
| [finding] | [specific change] | [role] | [date] | [skill/milestone] |

Action item rules:
- Must be specific enough to verify as done or not done.
- Must have an owner (a role, not "the team").
- Must have a due date or milestone target.
- No action item that is "discuss further" — discussions produce decisions, not more discussions.

Acceptable actions:
- Add to `technical-debt-triage`.
- Create a named task in `delivery-roadmap`.
- Update a rule, skill, or process doc.
- Run a `feasibility-research` spike before next planning.
- Schedule a follow-up check at a specific future milestone.

### Phase 4 — Output

Write to `docs/retrospectives/<date>-<topic>.md` with:
1. **Summary** — 2–3 sentence verdict on the period.
2. **What Went Well** — bulleted.
3. **What Went Wrong** — bulleted.
4. **Root Causes** — (postmortem: required; retro: for repeated failures).
5. **Incident Timeline** — (postmortem only).
6. **Action Items Table** — all items with owner and due date.
7. **Carry-forward** — unresolved items from the previous retro (if any) and their status.

Then in chat: summarize the top 3 action items and state which `delivery-roadmap` milestone or `technical-debt-triage` they feed into.

## Rules

- Never end a retro/postmortem without action items. "We'll do better" is not an action item.
- P0 postmortem must be completed within 24 hours of resolution.
- Blameless framing: findings identify system failures and process gaps, not individual failures.
- Carry-forward check is mandatory: unresolved items from the last retro must appear with a status update.
