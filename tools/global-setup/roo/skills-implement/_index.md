# Skill Index

Read this before loading any skill. Match trigger → load only that skill.

| Skill | Load when | Skip when |
|---|---|---|
| feature-implementation | Building any feature from a spec | No spec; still in planning phase |
| tasks-md-execution | Implementing from a tasks.md file with explicit phases | No tasks.md exists; input is a prose plan (use executing-plans-batched) |
| executing-plans-batched | Executing from a written prose plan (not a tasks.md) with slices and checkpoints | No plan written yet; input is a tasks.md file (use tasks-md-execution) |
| build-fix-loop | Build, typecheck, lint, or tests fail | All checks passing |
| tdd-red-green-refactor | Tests exist or can be added reasonably | No test infrastructure available |
| api-testing | Any API/backend endpoint added or changed | Pure frontend or non-HTTP change |
| verification-before-completion | Before claiming task or feature complete | Mid-implementation, not done yet |
| research-before-implement | Unsure of correct API/library method | Pattern already known in project |
| safe-refactor | Restructuring code without behavior change | Adding new behavior simultaneously |
| docs-sync | Public behavior, API, or setup changed | Internal refactor, no public change |
| api-integration-workflow | Adding call to external API or service | Internal service-to-service call |
| db-migration-workflow | Changing database schema | No schema change involved |
| env-config-management | Adding env vars, secrets, or feature flags | Config hardcoded and intentional |
| error-handling-patterns | Adding error states or exception handling | No failure paths to handle |
| test-strategy | Adding or changing testable behavior | No behavioral change made |
| incremental-self-review | After each implementation scope — self-check own work before continuing | Before implementation begins; code being handed to another reviewer (use requesting-code-review) |
| requesting-code-review | After implementation slice — producing a review request for an external reviewer or teammate | Self-review only; code not yet ready |
| independent-review | After verify-change passes on a slice, as the final review gate before handing to tester. Run it with only spec + diff + test output, not the implementation chat | Slice not yet verified; trivial formatting-only change |
| structured-review-report | Explicit review report or merge readiness asked | Routine post-impl review |
| state-management-patterns | Adding or restructuring frontend client state | No frontend state involved |
| background-job-patterns | Work should not block HTTP response, OR any scheduled/recurring task (backup, cron, cleanup, report generation) | Synchronous request-response flow |
| browser-testing-workflow | User explicitly requests E2E/interaction testing — click paths, flows, navigation | Visual regression or screenshot comparison (use visual-qa-playwright) |
| visual-qa-playwright | User explicitly requests visual QA, screenshot comparison, or accessibility audit | General E2E interaction flows (use browser-testing-workflow) |
| webhook-handling | Implementing inbound webhook endpoint | Outbound HTTP calls, not inbound |
| pagination-cursor | Adding list endpoint or infinite scroll | Single-item or non-list endpoint |
| figma-to-code | Figma link or design reference provided | No Figma input given |
| icon-svg-generator | User requests icon, app icon, favicon, launcher icon, logo, brand mark, or PWA icon | Existing icon system only needs resizing; photo-realistic image |
| ui-orchestrator | New project with UI, redesign, or any task needing coordinated design direction (UI UX Pro Max + Impeccable + Taste) | Pure backend, CLI tool, or user explicitly managing design manually |
| ai-feature-prompt-design | Implementing any app feature that calls an LLM — classification, extraction, generation, summarization, chat, suggestions, scoring, or any user-facing AI capability | Internal agent tooling (use ai-agent-ready); one-off scripts not embedded in app |
| ai-agent-ready | User wants AI agent (OpenClaw, Claude, etc.) to operate the app — "let AI control the app", "add MCP", "make app agent-usable", "integrate OpenClaw", "AI auto-runs workflow" | Every other implementation — never activate unless user intent is agent-integration |
