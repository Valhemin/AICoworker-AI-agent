---
name: brainstorming-design-refinement
description: Refine rough ideas into a committed, validated design before code.
---

TRIGGER: goal is vague, high-impact, or has multiple reasonable designs needing exploration before a single design is committed
OUTPUT: detailed — single committed design with rationale, rejected alternatives documented, suggestions/improvements section
SKIP: clear well-defined tasks with an obvious implementation path; don't brainstorm what's already decided

---

## Commit-first principle

This skill must end with one committed design, not a list of options for the user to pick from. Internal brainstorming is the process; committed design is the output.

## Workflow

1. **Research first**: before exploring options, verify what actually exists.
   - Does the project already solve this? Check existing code/config.
   - Does a standard solution exist in the ecosystem? Look it up — do not guess.
   - For any API/service in play: check current capabilities, pricing, rate limits. Do not rely on training-data knowledge.
   - Mark any unresolved technical fact as `RESEARCH-NEEDED:` — not `ASSUMPTION:`.
2. **Restate**: goal in one sentence, success criteria in measurable terms.
3. **Constraints**: users, data model implications, system integrations, hard limits.
4. **Explore** (internal, not dumped on user): 2-3 approaches when tradeoffs matter. For each: pros, cons, condition that rules it out.
5. **Commit**: pick one approach. Write `DECISION: [choice] — [rationale] — [rejected: ...]`.
6. **Present**: the committed design in readable chunks. Show the decision, not the deliberation unless asked.
7. **Clarify** (only if needed): max 2 high-impact questions using clarification-loop skill. Assume everything else.
8. **Suggest**: add `## Suggestions & Improvements` section — implied requirements, production risks, cheaper alternatives. Never omit.
9. **Write**: save decisions into the spec pack. Do not leave them in chat.

## Done-definition

Design refinement is DONE when:
- One design is committed, not "it depends".
- Success criteria are measurable.
- Assumptions are recorded.
- Rejected alternatives are documented.
- A spec-pack or plan step is created or updated.

Do not jump to implementation while material design questions remain. Do not present options without committing.
