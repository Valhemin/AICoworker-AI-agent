---
name: spec-pack-authoring
description: Author a complete, implementation-ready spec pack under docs/specs/<feature-or-project>/.
---

TRIGGER: authoring a complete implementation-ready spec pack for a new project or major feature
OUTPUT: detailed — all 13 spec pack files written to docs/specs/<feature>/, pack complete only when consistency analysis is READY
SKIP: small features that don't need a full spec pack; use product-requirements and writing-plans-superpowers directly

---

Use files in `.roo/templates/SPEC_PACK/` as starting scaffolds — copy each to `docs/specs/<feature>/` and fill in, do not generate from scratch.

## Pack files and done criteria

| File | Content | READY when |
|---|---|---|
| `00-brief.md` | Goal, users, non-goals, constraints | No "TBD" fields |
| `01-product-requirements.md` | User stories, FRs, NFRs, ACs | Every FR has a testable AC |
| `02-ux-ui-spec.md` | All component states, breakpoints, a11y | All 6 states per component |
| `03-technical-architecture.md` | Committed architecture, modules, contracts | One chosen arch, error paths specified |
| `04-data-model.md` | Entities, fields, types, constraints | No unnamed or untyped fields |
| `05-api-contract.md` | Endpoints, inputs, outputs, error codes | No "TBD" endpoints |
| `06-implementation-plan.md` | Ordered slices, file paths, ACs, verification | Every slice has a verification command |
| `07-test-plan.md` | Unit/integration/e2e coverage per requirement | Every AC has a test strategy |
| `08-risk-and-edge-cases.md` | Risks, mitigations, edge cases | Mitigation for every CRITICAL risk |
| `09-release-checklist.md` | Deployment, rollback, monitoring | Rollback procedure defined |
| `10-tasks.md` | T001... dependency-ordered tasks | Every task has file path + verification |
| `11-requirements-quality-checklist.md` | CHK-ID checklist per requirement | All CHECKs resolved or flagged |
| `12-consistency-analysis.md` | Cross-artifact analysis | Verdict: READY |

Pack is complete only when `12-consistency-analysis.md` verdict is `READY`. Do not hand off with `BLOCKED`.
