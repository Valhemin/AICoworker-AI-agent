# Skill Index

Read this before loading any skill. Match trigger → load only that skill.

## Research

| Skill | Load when | Skip when |
|---|---|---|
| search-first | Starting non-trivial feature — check if pattern/package already exists before writing | Evaluating which API method to call (use research-before-implement in implement tree) |
| research-with-current-sources | Specific API or library docs may be outdated — need current accurate version | General concept research (use deep-research); topic covered by context7 |
| web-research | Current web info Context7 cannot provide | Context7 covers the topic |
| deep-research | User requests research, analysis, or URL review | Quick lookup, not deep synthesis |

## Memory

| Skill | Load when | Skip when |
|---|---|---|
| agentmemory-recall | User references prior work or past decisions | Fresh task with no prior context |
| agentmemory-remember | After key decisions, bugs, or completed phases | Nothing durable worth saving |
| agentmemory-handoff | End of long session, switching mode or agent | Short session, no handoff needed |
| agentmemory-forget | Memory is stale, wrong, or privacy-sensitive | Memory is accurate and current |
| continuous-learning-v2 | Setting up session-based instinct learning via hooks | One-off task, hooks not configured |

## Quality & Security

| Skill | Load when | Skip when |
|---|---|---|
| quality-gate | Before declaring task/feature/fix complete — correctness and coverage check only, no deploy steps | Mid-implementation; about to deploy to production (use release-readiness) |
| release-readiness | Before deploying to production — deploy sequence, migration steps, rollback plan | Feature still in dev; correctness-only check not going to prod (use quality-gate) |
| security-threat-model | Auth, payments, uploads, or external integration | No trust boundary or user data |
| config-security-audit | MCP, auth, deploy, env, or automation config changes | No config or security surface touched |
| observability-errors | Adding production flows with failure modes | Dev-only or internal tooling |

## Architecture & Design

| Skill | Load when | Skip when |
|---|---|---|
| api-contract-design | Adding or changing any API endpoint/function | Implementation only, no new contract |
| architecture-decision-records | Making architectural or technology decisions | Tactical change, no arch decision |
| integration-boundary | Connecting services, APIs, queues, or webhooks | Internal, same-process call |
| dependency-upgrade | Adding or upgrading packages | No dependency change planned |
| performance-engineering | Slow paths, heavy queries, or scale-sensitive features | No performance concern reported |

## UI / Frontend

| Skill | Load when | Skip when |
|---|---|---|
| ui-ux-product-design | User flows, pages, dashboards, or forms involved | Backend-only or non-UI work |
| design-taste-frontend | Frontend/UI implementation or redesign — applying spacing, typography, color, hierarchy rules while coding | No visual or layout decisions; visual critique of existing output (use visual-design-critique) |
| visual-design-critique | User explicitly requests visual critique — "does this look good", "UI looks bad", "critique UI", or invokes by name. High token cost — suggest as option after UI work, never auto-activate | User has not explicitly requested it; UX flow critique only (use ui-ux-product-design) |
| design-md-system | UI-heavy work or new web project needs design tokens | Design system already documented |

## Utility

| Skill | Load when | Skip when |
|---|---|---|
| context-window-management | Many files, long logs, or multi-phase task | Small focused single-file task |
| skill-stocktake | Setup feels bloated, duplicated, or stale | No harness maintenance needed |
