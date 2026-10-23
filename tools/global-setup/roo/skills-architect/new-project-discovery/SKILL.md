---
name: new-project-discovery
description: Run a focused kickoff discovery to produce a committed project brief — not a list of questions.
---

TRIGGER: project kickoff — goal/users/requirements must be discovered from scratch; produces 00-brief.md before any spec or plan is written
OUTPUT: detailed — 00-brief.md with product goal, users, workflows, constraints, integrations, assumptions, critical unknowns
SKIP: project-kickoff (run after this brief is agreed); continuing in-progress projects with existing brief and specs

---

## Default behavior

Fill every discoverable gap with reasonable web/domain defaults before asking. Ask only when a gap materially changes architecture, scope, or security model.

## Output: project brief

After discovery, write `docs/specs/<project>/00-brief.md` with:
- **Product goal**: one sentence, outcome-not-feature.
- **Target users**: specific roles, not "users" or "people".
- **Core workflows**: numbered, each as a user journey (`user does X → system does Y → user sees Z`).
- **Non-goals**: explicit. If nothing is out of scope, state that and flag it as a risk.
- **Tech constraints**: languages, frameworks, hosting. If none stated: record `ASSUMPTION: [default stack chosen] — [rationale]`.
- **Auth model**: who can do what. Record assumption if not specified.
- **Data**: primary entities, rough volume/scale expectations.
- **Integrations**: third-party services needed. If payment/auth SaaS: name the provider assumed.
- **UI/brand**: existing design system or `ASSUMPTION: no design system, use [default]`.
- **Deployment target**: cloud, self-hosted, CLI, etc.
- **Critical unknowns**: only truly blocking items not resolvable by assumption.
- **Assumptions**: full list.

## Question discipline

Max 3 questions total during discovery. Format each with recommendation. After limit: assume and proceed.

## Done-definition

Discovery is DONE when `00-brief.md` exists with all sections populated and zero empty "TBD" fields. Every unknown is either resolved or recorded as `ASSUMPTION:` or `NEEDS CLARIFICATION` (critical only).

## Next step

After brief is agreed:
- If stack not yet decided → run `stack-selection` skill
- If stack is already a hard constraint → run `project-kickoff` directly
