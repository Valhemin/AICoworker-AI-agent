---
name: artifact-workflow-sequence
description: "Create or refine spec, plan, tasks, analysis, checklist, and governance artifacts — ending with a READY/BLOCKED handoff verdict."
---

TRIGGER: a project or feature needs structured docs (spec, plan, tasks, analysis) produced before implementation begins
OUTPUT: detailed — spec pack written with all sections, decisions recorded, handoff verdict (READY/BLOCKED)
SKIP: continuing in-progress work that already has specs; use tasks-md-execution or feature-implementation instead

---

## Workflow

1. **Specify**: user/business spec with actors, goals, user stories, functional requirements, NFRs, assumptions, out-of-scope, and measurable success criteria. Use product-requirements skill. No vague ACs.
2. **Clarify**: max 3 high-impact questions using clarification-loop skill. All other gaps resolved as `ASSUMPTION:`. Record everything in the spec, not in chat.
3. **Plan**: architecture decision (committed, not menu), data/API contracts, implementation plan with slices, each with file paths, ACs, and verification commands.
4. **Tasks**: dependency-ordered, user-story-sliced, file-path-specific tasks with `T001` IDs and verification steps per task.
5. **Analyze**: run spec-consistency-analysis. If verdict is `BLOCKED`: fix CRITICAL findings before continuing. Do not skip this step.
6. **Implement readiness**: hand off only when `spec-consistency-analysis` verdict is `READY`. Include in handoff: spec path, task list path, open assumptions, and next agent.

## Gate enforcement

Step 6 is blocked until step 5 produces `READY`. No exceptions. If still blocked after one fix pass, escalate to user with a single explicit question.

## Output discipline

Do not dump raw artifact content in chat. Write files. Summarize: paths written, decisions made, assumptions recorded, remaining open questions (should be zero or one max), and handoff verdict.

If `.specify/` scripts/templates exist, use them. Otherwise write under `docs/specs/<feature-or-project>/`.
