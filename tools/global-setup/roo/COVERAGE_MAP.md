# Coverage Map — Anti-Duplication Index

**Before creating or modifying a skill or rule, check this map.**
If a topic is listed here, it is already owned. Extend the owner — do not create a parallel skill.

Format: `topic → owner (group/skill-name)`

---

## Planning & Spec

| Topic | Owner |
|---|---|
| Project brief / goal discovery | `skills-architect/new-project-discovery` |
| Stack selection for new projects | `skills-architect/stack-selection` |
| Full spec pack authoring | `skills-architect/spec-pack-authoring` |
| Product requirements → user stories + ACs | `skills-architect/product-requirements` |
| User story mapping (multi-role) | `skills-architect/user-story-mapping` |
| Non-functional requirements | `skills-architect/non-functional-requirements` |
| UI/UX spec (state-complete) | `skills-architect/ui-ux-spec` |
| Implementation plan slices | `skills-architect/writing-plans-superpowers` |
| Task list from spec | `skills-architect/task-generation` |
| Artifact workflow sequence | `skills-architect/artifact-workflow-sequence` |
| Project kickoff (brief → spec pack → milestones) | `skills-architect/project-kickoff` |
| Clarification loop | `skills-architect/clarification-loop` |

## Research

| Topic | Owner |
|---|---|
| Pre-commitment viability (VIABLE/NOT VIABLE) | `skills-architect/feasibility-research` |
| API/SaaS comparison (multiple options) | `skills-architect/api-service-research` |
| Mid-planning technical unknowns | `skills-architect/technical-planning-research` |
| Implementation-time library/API uncertainty | `skills-implement/research-before-implement` |
| Debug: external library bug / version issue | `skills-debug/research-for-debug` |
| Research keyword construction + language-aware | `rules/01-current-research-and-truthfulness` |

## Architecture & Design

| Topic | Owner |
|---|---|
| System/feature architecture decisions | `skills-architect/technical-architecture` |
| Multi-user / multi-tenant / billing / roles | `skills-architect/multi-user-production` |
| Data privacy / PII / compliance | `skills-architect/data-privacy-compliance` |
| Project constitution / principles / DoD | `skills-architect/constitution-governance` |
| Brainstorming / design exploration | `skills-architect/brainstorming-design-refinement` |
| Stack decision record | `skills-architect/stack-selection` (output) + `rules-architect/03` (format) |

## Quality Gates (pre-handoff)

| Topic | Owner |
|---|---|
| Requirements quality (intra-artifact) | `skills-architect/requirements-quality-checklist` |
| Spec author self-review (proactive gaps) | `skills-architect/spec-self-review` |
| Cross-artifact consistency (blocking gate) | `skills-architect/spec-consistency-analysis` |
| Acceptance test planning | `skills-architect/acceptance-test-planning` |
| Production readiness audit | `skills-architect/production-audit` |
| Feature branch final readiness | `skills-architect/finishing-development-branch` |

## Delegation & Coordination

| Topic | Owner |
|---|---|
| Decompose spec → delegatable subtasks + delegation prompt | `skills-architect/lead-decomposition` |
| Parallel independent subtasks (no shared state) | `skills-architect/dispatching-parallel-agents` |
| Delivery roadmap / milestones | `skills-architect/delivery-roadmap` |
| Cross-team / vendor dependency tracking | `skills-architect/cross-team-dependency-tracking` |
| Routing work between modes | `skills-architect/mode-workflow-routing` |
| Subagent summary format / synthesis contract | `rules-architect/01-output-contract` |

## Implementation

| Topic | Owner |
|---|---|
| Feature from spec/ACs | `skills-implement/feature-implementation` |
| Execute from tasks.md | `skills-implement/tasks-md-execution` |
| Execute from plan doc (prose/slices) | `skills-implement/executing-plans-batched` |
| State management (any stack) | `skills-implement/state-management-patterns` |
| API integration (external service) | `skills-implement/api-integration-workflow` |
| DB schema migration | `skills-implement/db-migration-workflow` |
| Background jobs / cron | `skills-implement/background-job-patterns` |
| Error handling / failure states | `skills-implement/error-handling-patterns` |
| Environment variables / secrets | `skills-implement/env-config-management` |
| Pagination / cursor | `skills-implement/pagination-cursor` |
| Webhook receiver | `skills-implement/webhook-handling` |
| Refactor without behavior change | `skills-implement/safe-refactor` |
| LLM feature prompt design | `skills-implement/ai-feature-prompt-design` |
| AI agent / agentic loop feature | `skills-implement/ai-agent-ready` |
| Icon / SVG / logo generation | `skills-implement/icon-svg-generator` |
| Figma → code | `skills-implement/figma-to-code` |
| UI orchestration | `skills-implement/ui-orchestrator` |
| Docs sync after behavior change | `skills-implement/docs-sync` |
| Code layers for a new repo | `skills-implement/code-structure` |
| Dangerous shell commands | `skills-implement/command-risk` |
| Pre-ship security check | `skills-implement/security-threat-model` |

## Testing

| Topic | Owner |
|---|---|
| Test strategy (coverage decisions) | `skills-implement/test-strategy` |
| TDD red-green-refactor | `skills-implement/tdd-red-green-refactor` |
| API endpoint testing | `skills-implement/api-testing` |
| Browser E2E / click flows | `skills-implement/browser-testing-workflow` |
| Visual QA / screenshot regression | `skills-implement/visual-qa-playwright` |
| Regression test after bug fix | `skills-debug/regression-test-design` |

## Review

| Topic | Owner |
|---|---|
| Self-review after each scope (implementer reviews own work) | `skills-implement/incremental-self-review` |
| Verification before claiming complete | `skills-implement/verification-before-completion` |
| Independent review per slice (reviewer has only spec + diff, not implementer's chat) | `skills-implement/requesting-code-review` |
| Full diff / PR-level severity report (merge readiness) | `skills-implement/structured-review-report` |
| Build/typecheck/lint failure loop | `skills-implement/build-fix-loop` |

## Debugging

| Topic | Owner |
|---|---|
| Triage — unknown bug category | `skills-debug/systematic-debugging-superpowers` |
| General root cause | `skills-debug/root-cause-debugging` |
| Flaky / intermittent test | `skills-debug/flaky-test-debugging` |
| Concurrency / race condition | `skills-debug/concurrency-debugging` |
| Environment / config only | `skills-debug/environment-config-debugging` |
| Memory leak | `skills-debug/memory-leak-debugging` |
| HTTP / API / auth failure | `skills-debug/network-api-debugging` |
| Performance / slow path | `skills-debug/performance-debugging` |
| Frontend devtools / browser profiler | `skills-debug/chrome-devtools-debugging` |
| Click path / state after interaction | `skills-debug/click-path-audit` |
| Roo/Zoo config / MCP / rules broken | `skills-debug/harness-config-debugging` |

## Operations & Production

| Topic | Owner |
|---|---|
| Incident coordination (prod down) | `skills-architect/incident-coordination` |
| Canary / post-deploy monitoring | `skills-architect/canary-watch` |
| Technical debt triage | `skills-architect/technical-debt-triage` |
| Retrospective / postmortem | `skills-architect/retrospective-postmortem` |
| GitHub PR / issue management | `skills-architect/github-workflow` |
| Git worktrees (parallel branches) | `skills-architect/using-git-worktrees` |
| Harness / MCP / rule audit | `skills-architect/harness-audit` |

## Cross-Cutting Rules (not skills)

| Topic | Owner |
|---|---|
| Bias to action / warn don't block | `rules/00-quality-first-agent-contract` |
| Research freshness / keyword quality | `rules/01-current-research-and-truthfulness` |
| UI content standard (user-appropriate) | `rules-implement/01-scope-by-scope-delivery` |
| Architect output contract / synthesis | `rules-architect/01-output-contract` |
| Artifact quality gates / traceability | `rules-architect/02-artifact-quality-gates` |
| Planning discipline / delegation contract | `rules-architect/03-planning-discipline` |
| Debug output contract / fast path | `rules-debug/01-debug-evidence-contract` |

---

## Testing (Tester Pro)

| Topic | Owner |
|---|---|
| Test plan / case table | `skills-tester/qa-plan` |
| Edge-case audit | `skills-tester/qa-edge` |
| Playwright specs + Page Objects | `skills-tester/qa-write`, `skills-tester/qa-pom` |
| Run suite + read summary | `skills-tester/qa-run` |
| Desktop window tests | `skills-tester/qa-desktop` |
| Figma vs build comparison | `skills-tester/qa-figma` |
| PASS/FAIL verdict for a slice | `skills-tester/product-test` |
| Bug report from confirmed failure | `skills-tester/qa-bug` |
| Test data cleanup | `skills-tester/qa-cleanup` |
| Release check summary | `skills-tester/qa-release-check` |

---

## How to use this file

1. **Before writing a new skill**: search this table. If the topic is listed, extend the owner instead.
2. **Before adding a section to a rule**: check if a skill already covers it. Rules cover global behavior; skills cover task-specific process.
3. **After merging or deleting a skill**: update this table immediately.
4. **After creating a new skill**: add a row here before closing the task.
