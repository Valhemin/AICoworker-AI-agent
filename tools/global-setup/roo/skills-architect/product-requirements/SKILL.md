---
name: product-requirements
description: Convert business/user requests into implementable, testable requirements.
---

TRIGGER: converting business or user requests into implementable, testable requirements with user stories, FRs, NFRs, and ACs
OUTPUT: detailed — user stories, functional requirements, NFRs with metrics, ACs, out-of-scope, assumptions, suggestions/improvements
SKIP: continuing implementation when requirements are already complete and approved

---

## Assumption-first policy

Fill gaps with reasonable assumptions before writing requirements. Record each as `ASSUMPTION: [topic] — [value] — [rationale]`. Only flag as `NEEDS CLARIFICATION` when the gap is truly blocking (see clarification-loop skill).

## Required sections

- **Goal**: one sentence, outcome-focused, not feature-list-focused.
- **Target users**: specific roles or segments, not "users".
- **User stories**: `As [role], I want [action] so that [outcome]`. Each story gets an ID (`US1`, `US2`, ...).
- **Functional requirements**: numbered, one behavior per line, unambiguous verb (MUST/MUST NOT/SHOULD).
- **Non-functional requirements**: metric + condition format. Example: "API p95 < 300 ms at 500 req/s". Vague NFRs like "must be fast" are rejected.
- **Acceptance criteria**: every requirement gets at least one. Format: Given/When/Then or metric or constraint.
- **Priority**: P0 is the slice that can ship alone. P0 is not every requirement. If everything is P0, cut until the first slice is about a third of the list.
- **Build order**: a short ordered list for `implement`. One library choice only if `stack-selection` has not already locked the stack.
- **Out-of-scope**: explicit list. If nothing is explicitly out-of-scope, add a section stating what reasonable adjacent features are excluded.
- **Assumptions**: all assumptions recorded here in addition to inline.
- **Risks and open questions**: only unresolved CRITICAL gaps. Non-critical gaps resolved by assumption.

## Proactive gap-finding (mandatory, run after drafting)

After drafting requirements, always run this check before declaring READY:

1. **Implied but missing**: scan for requirements that are obviously needed but not stated. Common gaps: authentication, authorization, error states, rate limiting, data retention/deletion, logging, monitoring, email/notification flows, empty states, pagination for lists, mobile/accessibility.
2. **Improvements**: if the stated requirement could be achieved more simply or cheaply, call it out.
3. **Production risks**: what could break under real load, adversarial input, or concurrent access that the spec doesn't address?

Add a `## Suggestions & Improvements` section (see rule 01 for mandatory format). Never omit it.

## Completeness gate

Requirements artifact is READY only when:
- Every functional requirement has at least one testable AC.
- P0 is a shippable slice, not the full list.
- No requirement uses vague qualifiers without a metric (fast, good, easy, seamless).
- Out-of-scope section exists.
- Assumptions section is populated (even "none" if truly none).
- `## Suggestions & Improvements` section exists and is non-empty (or explicitly states "none identified" per category).
- `requirements-quality-checklist` has been run and verdict is READY.
