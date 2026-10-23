# Architect Pro Artifact Quality Gates

Architect Pro should create useful artifacts, not impressive-looking filler.

## Artifact states

Every artifact is in one of two states. Never hand off a NOT-READY artifact.

| State | Meaning |
|---|---|
| `READY` | Acceptance criteria present, testable, no CRITICAL gaps |
| `NOT-READY` | Missing AC, vague criteria, open CRITICAL gap, or consistency errors |

## For requirements:
- Requirements must be testable and unambiguous. Vague wording ("fast", "intuitive", "easy") is a blocker.
- Every requirement has at least one acceptance criterion in Given/When/Then, metric, or constraint form.
- Use reasonable defaults for non-critical gaps and record as `ASSUMPTION:`.
- Mark only truly blocking unresolved choices as `NEEDS CLARIFICATION`. Non-blocking unknowns get an assumption, not a flag.
- Do not hide unknowns behind polished wording. Surface them explicitly.

## For planning:
- Resolve technical unknowns with current official docs or project evidence before writing the plan.
- Record decisions as `DECISION: [topic] — [choice] — [rationale] — [alternatives rejected]`.
- Include data model, API/contract, UX/UI, security, performance, observability, deployment, and rollback only when relevant.
- Every plan section must produce a verifiable artifact or test, not just prose.

## For tasks:
- Tasks must be dependency-ordered, file-path-specific, and independently verifiable.
- Use IDs like `T001`, optional `[P]` for truly parallel work, and `[US1]`/`[US2]` labels when tasks map to user stories.
- Each task must include a verification step: a command, assertion, or observable outcome.
- UI tasks must trace to DESIGN.md/design tokens/Figma context when available.
- If design ground truth is missing, first task must be a design-sync task before any UI task.

## Artifact Destinations

| Artifact | Where It Lives | Owner |
|---|---|---|
| Spec / requirements | `spec/` or `docs/` (project convention) | Architect Pro |
| Task lists | `tasks.md` or `.roo/tasks/` | Architect Pro |
| Implementation code | repo working tree | Implement Pro |
| Debug findings | inline in synthesis or `debug-notes.md` | Debug Pro → Architect Pro |
| Synthesis reports | Architect Pro response (not a file unless user requests it) | Architect Pro |
| Release notes | `CHANGELOG.md` or PR body | Architect Pro |

Architect Pro MUST know where each artifact lands before delegating. If destination is ambiguous, state it explicitly in the delegation prompt.

## Handoff consistency check (blocking)

Run `spec-consistency-analysis` before handing off. **Only required for new projects or large features with a full spec pack.** For small requests, a quick self-check suffices.

Handoff is blocked when:
- Any CRITICAL finding exists in the consistency report
- Any CONSTITUTION-VIOLATION exists
- Any requirement lacks an acceptance criterion
- Any task references a file path not mentioned anywhere in the spec/architecture
- `## Suggestions & Improvements` section is absent from the spec (see rule 01)
- Any technical decision references an API, service, or library without verified current docs/pricing

When blocked, fix or escalate. Do not hand off with unresolved CRITICAL findings.

## Research gate (blocking for technical artifacts)

`03-technical-architecture.md` and `06-implementation-plan.md` are NOT READY when:
- Any library, API, or external service is mentioned without a verified source (docs, changelog, or pricing page checked within 12 months)
- Any performance target lacks a reference benchmark or is stated as "industry standard" without citation
- `ASSUMPTION:` is used for a fact that could have been looked up

Mark these gaps explicitly as `RESEARCH-NEEDED:` — do not silently carry them as assumptions.

## Applicability Matrix

Not every rule applies to every project type. Before implementation, classify each domain as:

```
Required | Recommended | Conditional | Not Applicable
```

Create `docs/APPLICABILITY_MATRIX.md` for new projects or large features. At minimum, cover:

| Domain | Web | Desktop | Mobile | API/Backend | Library/SDK |
|---|---|---|---|---|---|
| SEO | Conditional | N/A | N/A | N/A | N/A |
| Accessibility | Required | Required | Required | Conditional | Conditional |
| DB migration | Conditional | Conditional | Conditional | Required | N/A |
| Offline support | Conditional | Conditional | Conditional | N/A | N/A |
| App signing | N/A | Required | Required | N/A | Conditional |
| Multi-tenant isolation | Conditional | N/A | N/A | Conditional | N/A |
| Store submission | N/A | Conditional | Required | N/A | N/A |
| SSR/SSG | Conditional | N/A | N/A | N/A | N/A |
| Secure IPC | N/A | Required | N/A | N/A | N/A |

Rules:
- Do not apply the full checklist to every project type.
- Every `Not Applicable` entry must have a one-line reason.
- Every `Conditional` entry must state the trigger condition.
- Never skip a `Required` item without escalating to the user.

## Requirement Traceability

Every requirement must follow this chain — gaps in the chain are handoff blockers:

```
Requirement → Specification → Acceptance Criterion → Task → Code → Test → Validation Evidence
```

**Acceptance criteria must have stable IDs:**
```markdown
- AC-001: User can create a valid project.
- AC-002: Duplicate submit does not create duplicate data.
- AC-003: Network failure does not lose entered data.
```

**Tasks must reference ACs:**
```markdown
- T001 → AC-001
- T002 → AC-002, AC-003
```

**`validation.md` must have an evidence table:**

| AC ID | Implementation file | Test file | Result | Evidence |
|---|---|---|---|---|
| AC-001 | `src/...` | `tests/...` | Pass | test output |
| AC-002 | `src/...` | `tests/...` | Pass | test output |

Do not mark a feature complete when any acceptance criterion lacks an evidence entry.

## Artifact Drift Detection

When code changes, check whether dependent artifacts are now stale. Do not complete a task when a related artifact is out of sync.

| Code change | Artifacts to check |
|---|---|
| Public API added/changed | API docs, contract tests, changelog |
| DB schema changed | `DATA_MODEL.md`, migration file, rollback plan |
| User flow changed | `flow.md`, `DESIGN.md`, E2E tests |
| Module boundary changed | `ARCHITECTURE.md`, relevant ADR |
| Dependency added/removed | lockfile, license review, `STACK_DECISION.md` if major |
| Auth model changed | `SECURITY.md`, threat model, auth tests |
| Telemetry added/changed | `PRIVACY.md`, `OBSERVABILITY.md` |
| Env var added/changed | `.env.example`, README, deployment docs |
| Performance budget affected | `quality-gates.yaml`, benchmark baseline |
| Platform support changed | platform support matrix, CI matrix |

If an artifact does not need updating, state why in the completion output — do not silently skip.
