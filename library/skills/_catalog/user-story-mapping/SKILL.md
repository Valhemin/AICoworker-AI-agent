---
name: user-story-mapping
description: "Build a user story map — a two-dimensional grid of user activities and tasks ordered by user journey — to expose scope, sequencing, and release slices..."
---

TRIGGER: new product or major feature with 3+ distinct user actions, unclear scope, or multiple user roles with diverging workflows
OUTPUT: detailed — story map table (backbone × release slices), walking skeleton journey, gaps and risks, release slice IDs
SKIP: small features with a single clear user flow (use product-requirements directly)

---

## What a story map is

A story map organizes work in two axes:
- **Horizontal (left to right)**: user activities in the order a user experiences them — the backbone.
- **Vertical (top to bottom)**: tasks within each activity, ordered by priority/release. Top row = MVP slice.

## Workflow

### Phase 1 — Identify the user journey backbone

List every major activity a user does from first touch to goal completion. These are verbs at high altitude:

```
Discover → Sign up → Configure → Use core feature → Get results → Share / Export → Return / Retain
```

Rules:
- Each activity is a milestone in the user's mental model, not a UI screen.
- Order is chronological from the user's perspective.
- Identify which user role performs each activity if multiple roles exist.

### Phase 2 — Break activities into user tasks

Under each activity, list the concrete tasks a user performs:

```
## Activity: Sign up
- Enter email and password
- Verify email address
- Complete profile (name, org)
- Accept terms of service
```

Each task is a candidate user story. Format: `As [role], I want [task] so that [outcome]`.

### Phase 3 — Identify walking skeleton

Draw a horizontal line across the map. Everything above the line = the minimum viable experience where a user can complete the core journey end-to-end. This is the walking skeleton, not the full MVP.

Label rows:
- **Walking skeleton**: fewest tasks to complete the journey once
- **MVP slice**: minimum shippable product — adds reliability, error handling, onboarding
- **Later**: improvements, delight, edge cases

### Phase 4 — Surface gaps and risks

After mapping, run these checks:

| Check | Finding type |
|---|---|
| Any activity with no tasks in walking skeleton | GAP — journey breaks here |
| Any task with no clear system response | GAP — undefined behavior |
| Any activity performed by multiple roles with conflicting needs | RISK — scope ambiguity |
| Any activity that depends on a third-party integration | RISK — external dependency |
| Tasks that appear in multiple activities (duplication) | SIMPLIFICATION opportunity |

Report findings in `## Map Gaps & Risks` section.

### Phase 5 — Output

Produce the story map as a structured table:

```
## User Story Map

| Activity | Walking Skeleton | MVP Slice | Later |
|---|---|---|---|
| Discover | [US1] Landing page loads | [US2] SEO meta tags | [US3] Blog / content |
| Sign up | [US4] Email + password signup | [US5] Email verification | [US6] SSO / OAuth |
| ... | ... | ... | ... |
```

Then produce the walking skeleton as a numbered user journey:

```
## Walking Skeleton — end-to-end journey

1. User visits landing page → sees product value proposition
2. User clicks "Sign up" → enters email and password → account created
3. User completes [core action] → sees [core result]
4. User [exits or returns]

Gaps in skeleton: [list any broken steps]
```

## Output contract

```
## User Story Map
[table]

## Walking Skeleton
[numbered journey, gaps called out]

## Release slices
- Walking skeleton: [US IDs]
- MVP: [US IDs]
- Later: [US IDs]

## Map Gaps & Risks
- GAP: [description] — [recommendation]
- RISK: [description] — [mitigation]

## Suggestions & Improvements
- MISSING: [implied requirement not visible in the map]
- SUGGESTION: [simplification or reordering that improves coherence]
```

## Done-definition

Story map is READY when:
- Every activity has at least one task in the walking skeleton.
- Walking skeleton forms a complete end-to-end journey with no broken steps.
- Every user role mentioned in scope appears in at least one activity.
- Gap and risk findings are documented (not silently omitted).
- Release slice labels exist (skeleton / MVP / later) for every task.
- Output is written to `docs/specs/<project>/00b-story-map.md` for spec packs, or returned inline for smaller requests.
