# Planning and Delegation Discipline

For unclear or high-impact work, refine the design before implementation. Use delegation only when it reduces context load or enables independent work.

## Definition of Ready

A project, feature, or task may only begin implementation when ALL of the following are true. If any are missing — stop, record the blocker or assumption, and produce only discovery artifacts or a scoped spike until resolved.

- [ ] User goal is unambiguous
- [ ] Scope and non-goals are defined
- [ ] Acceptance criteria are testable (Given/When/Then, metric, or constraint form)
- [ ] Core flow, alternate flows, and error flows are identified
- [ ] External dependencies and contract interfaces are known
- [ ] Security and privacy impact has been assessed
- [ ] Data migration impact has been assessed
- [ ] Platform-specific requirements are known
- [ ] No blocking architectural decision is unresolved
- [ ] Test strategy is appropriate for the risk level
- [ ] There is an owner or approval authority
- [ ] Critical assumptions are recorded as `ASSUMPTION:` entries

**If not ready:** do not start implementation. Produce `PROJECT_BRIEF.md` or a spec stub, record what is missing, and surface it to the user.

## Multi-User Readiness Assessment

Run this before architecture design on any project with authenticated users or shared data. Answer each question — do not skip.

- Does the project have multiple user accounts?
- Does it have organizations, workspaces, or tenants?
- Do users share resources with each other?
- Does it have multiple roles or permissions?
- Is data owned per-user or per-tenant (isolation required)?
- Does it have billing, quotas, or usage limits?
- Does it have production availability, backup, or disaster-recovery requirements?

**If any answer is yes → invoke the `multi-user-production` skill before proceeding.**

Do not assume scale. Do not self-apply multi-tenant patterns to a single-user tool. The assessment triggers the skill; the skill defines what to build.

**Do not auto-decide these — mark as `Status: Proposed, not approved` and wait for user confirmation:**
- Whether to use multi-tenancy
- Organization / workspace model
- Role and permission design
- Expected user count and concurrent traffic
- Availability target, RPO, RTO
- Infrastructure budget
- Data residency and retention period
- Billing model and quota design
- Admin access scope
- Compliance requirements

## Project Intake Gate

Before choosing a framework or writing any code on a new project, the following must be known. If any are missing or contradictory — stop and collect them first. Do not proceed to stack selection.

**Required intake fields:**
- Project type (Web, Desktop, Mobile, API, Library, Monorepo)
- Target platform(s)
- Target users and their technical level
- Core problem being solved
- Main usage flows (3–5 user journeys)
- MVP scope — what is in, what is explicitly out
- Auth requirements (none, email/password, SSO, OAuth, magic link)
- Offline requirements (none, read-only cache, full offline-first)
- Data sensitivity level (public, personal, financial, health, minors)
- Expected scale (prototype, <1k users, 10k+, enterprise)
- Budget constraints (hosting, API costs, build time)
- Distribution method (web URL, app store, desktop installer, npm package)
- Deadline or delivery constraint
- Stakeholder or compliance requirements (GDPR, HIPAA, accessibility law)

Record collected answers in `PROJECT_BRIEF.md`. Do not carry them only in chat.

## Stack Decision Discipline

Do not choose a framework because it is popular or familiar to the model. Every stack choice for a new project must be justified in `docs/STACK_DECISION.md` or inline if no doc system exists yet.

Required fields for a stack decision:
- **Chosen stack** with version
- **Alternatives considered** (minimum 2 for major choices)
- **Rationale** — why this one, not the others
- **Platform compatibility** — does it run on all required targets?
- **Ecosystem maturity** — actively maintained, sufficient library coverage
- **Security track record** — known CVEs, last audit
- **Performance profile** — relevant to the use case
- **Bundle / binary size** — acceptable for the distribution method
- **Deployment model** — how it reaches users
- **Cost implications** — license, hosting, runtime cost
- **Exit strategy** — what does migration look like if this choice proves wrong in 2 years
- **Rejected options** with one-line reason each

`ASSUMPTION:` is not acceptable for facts that can be verified (bundle size, license, maintenance status). Look them up.

## Default: assume and commit

Do not stall for preference input. Default behavior:
1. Make a reasonable assumption for every non-critical unknown.
2. Record it as `ASSUMPTION:`.
3. Proceed.

Only ask when a decision meets the clarification-policy threshold (see rule 01).

## Exploration format

When tradeoffs matter, explore 2-3 approaches. Format each as:
```
## Option A: [name]
- Approach: [one sentence]
- Pros: [list]
- Cons: [list]
- Rejects when: [condition that rules this out]
```

Then commit to one:
```
## DECISION: [Option chosen]
Rationale: [why]
Rejected: [what was ruled out and why]
```

Do not present a list of options without committing. Presenting options without a recommendation is a defect.

## Routing Sequence

For a new project or large feature:
1. Build context map and critical unknowns.
2. Delegate Spec work → output lands in `spec/`, `docs/`, or stated plan file.
3. Request consistency analysis before implementation.
4. Delegate Implement Pro by milestone/scope → output is code commits + summary.
5. Delegate Debug Pro only for blockers, failures, regressions → output is root cause + fix.
6. **Synthesize production readiness after each milestone** (see rule 01 Synthesis Mandate).

## Delegation Contract — What Every Subtask Must Include

Each delegated task must specify:
- objective
- relevant context and files
- acceptance criteria
- verification command/check
- expected summary format (see below)
- artifact destination (where output lands)

## Required Summary Format from Every Subagent

Subagents must return:
```
- changed files: [list or "none"]
- checks run: [commands]
- result: pass / fail / partial
- risks: [list or "none"]
- next step: [what architect should do with this output]
```

Architect Pro MUST NOT forward this summary raw to the user. It feeds the synthesis.

## Partial Failure Protocol

If one or more subagents fail or return incomplete results:

1. Record the failure in the synthesis table (status: `failed` or `partial`).
2. Report what was completed and its output.
3. Identify whether the failure blocks downstream tasks.
4. Propose: retry with scoped fix, route to Debug Pro, or defer and proceed on unblocked tasks.
5. Never silently drop a failed subtask from the synthesis.

Do not halt all progress because one subtask failed. Continue unblocked work and surface the failure with a decision.

## Branch / Worktree Discipline

For large branches, keep the parent context clean and request concise summaries.

Use isolated branches/worktrees only when the project policy supports it. Do not create branches/worktrees unless the user approves or the repo convention clearly expects it.

## Plan done-definition

A plan is DONE when:
- One approach is chosen and committed (not "depends on preference")
- Every slice has a file path, acceptance criterion, and a verification step (command or observable)
- Rejected alternatives are recorded
- Rollback notes exist for any destructive or migration step
- A junior engineer or another agent can execute each task without asking follow-up questions

Do not produce decorative docs. A spec is ready only when it meaningfully reduces implementation ambiguity.
