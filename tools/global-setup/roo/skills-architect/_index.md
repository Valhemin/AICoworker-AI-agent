# Skill Index

Read this before loading any skill. Match trigger → load only that skill.

## Group A — Planning & Spec

| Skill | Load when | Skip when |
|---|---|---|
| new-project-discovery | Brand-new project — discover goal/users/requirements, produce 00-brief.md before any spec | Continuing in-progress work; brief already exists (run project-kickoff instead) |
| stack-selection | Brief exists but stack not yet decided — pick stack based on goal/timeline/team; run after new-project-discovery, before project-kickoff | Stack already committed in brief |
| brainstorming-design-refinement | Goal vague or multiple viable designs | Single clear design already chosen |
| product-requirements | Converting requests to testable requirements | Requirements already written |
| user-story-mapping | 3+ user roles or unclear feature scope | Single-role, clearly scoped feature |
| technical-architecture | Designing system or feature architecture | Architecture already committed |
| technical-planning-research | Mid-planning unknown blocking implementation — direction set but details unclear | Pre-commitment check (use feasibility-research); architecture already fully decided |
| api-service-research | Evaluating / comparing external APIs or SaaS | Single option, no comparison needed |
| feasibility-research | Pre-commitment viability check — need VIABLE/NOT VIABLE verdict before it enters the roadmap | Technology already decided; mid-build unknown (use technical-planning-research) |
| ui-ux-spec | UI feature needs state-complete spec | Non-UI or already specced feature |
| non-functional-requirements | Feature has perf/security/scale/compliance needs | Pure functional, no NFRs |
| data-privacy-compliance | Feature stores/transmits user data | No user data involved |
| multi-user-production | Project has multiple users, orgs, shared resources, roles, tenant isolation, billing, or production availability target | Single-user tool, static page, unauthenticated prototype, offline app with no shared data |
| writing-plans-superpowers | Writing concrete verifiable implementation plan | Plan already written |
| spec-pack-authoring | New project or major feature needs full spec pack | Small feature or spec already exists |
| clarification-loop | Spec has ambiguities that block implementation | Requirements already clear |
| acceptance-test-planning | Writing test plan for defined acceptance criteria | No acceptance criteria defined |
| requirements-quality-checklist | Reviewing requirements before gate | Requirements not yet written |
| spec-self-review | After authoring spec, before handoff | Spec already reviewed |
| spec-consistency-analysis | Cross-artifact consistency gate before impl | Single-artifact, no cross-checks needed |
| task-generation | Creating tasks.md from spec/plan | tasks.md already exists |
| constitution-governance | Project needs stable non-negotiable principles | Principles already documented |
| artifact-workflow-sequence | Feature needs structured docs before impl | Docs already exist and current |

## Group B — Coordination & Delivery

| Skill | Load when | Skip when |
|---|---|---|
| project-kickoff | Brief agreed — produce full spec pack, milestones, delegation plan; run after new-project-discovery | Goal still unclear (run new-project-discovery first); spec already exists |
| lead-decomposition | Splitting work into delegatable subtasks + writing delegation prompts for each mode | Work is single-mode, no delegation needed |
| dispatching-parallel-agents | Work splits into independent parallel scopes with no shared state | Sequential work or shared state |
| delivery-roadmap | Planning production delivery with milestones | No delivery planning needed yet |
| finishing-development-branch | All tasks complete — final readiness gate before PR/merge; includes branch cleanup | Work still in progress; correctness-only mid-feature check (use quality-gate) |
| incident-coordination | Production down, degraded, or critical bug live | Non-production or planned work |
| canary-watch | Post-deploy monitoring of live URL/endpoint | Pre-deploy or local environment |
| production-audit | Pre-launch or post-merge production readiness audit — runs against a live/staging URL | Development-phase work; deploy checklist (use release-readiness) |
| retrospective-postmortem | Sprint/milestone complete or incident resolved | Work still in progress |
| technical-debt-triage | Debt slowing delivery, needs priority | No debt pressure on current work |
| cross-team-dependency-tracking | Blocked on external team, vendor, or upstream | All deps owned internally |
| github-workflow | PR/issue management via GitHub MCP | No GitHub MCP or repo access |
| using-git-worktrees | Risky parallel branches need isolation | Simple single-branch work |
| harness-audit | Evaluating new agent pack, MCP, or rule update | No harness changes planned |
| mode-workflow-routing | Routing work between Architect/Implement/Debug | Mode already chosen |
