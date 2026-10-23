---
name: clarification-loop
description: Ask high-impact clarification questions with recommendations and write decisions back to the spec.
---

TRIGGER: a gap materially changes scope, architecture, data model, security, or UX direction and no reasonable assumption exists
OUTPUT: compact — single question with recommendation, alternatives, impact if wrong; decision encoded back to spec immediately
SKIP: minor gaps resolvable by assumption; max 3 questions then assume and proceed

---


Clarification must reduce downstream rework, not collect preferences.

## Default behavior

Assume and proceed. Before asking any question, ask: "Can I make a reasonable assumption here and keep going?" If yes, record `ASSUMPTION: [topic] — [value] — [rationale]` and continue. Do not ask.

## Question rules

Only ask when:
- The gap materially changes scope, architecture, data model, security, UX direction, or acceptance criteria.
- No reasonable default exists in the domain.
- Getting it wrong would require a destructive rewrite.

Format:
```
**Q[N]: [topic]**
My recommendation: [option] — [brief rationale]
Alternatives: [other options, why rejected]
Impact if wrong: [what breaks or must be rewritten]
Accept with: "yes" / "recommended"
```

- Ask one question at a time.
- Max 3 in a run (not 5 — higher cap was enabling loop behavior).
- After limit is reached: record remaining gaps as `ASSUMPTION:` and proceed. Do not re-ask.
- **Always include proactive suggestions in the same response as a question.** Never use clarification as an excuse to defer suggestions. If you have a `## Suggestions & Improvements` section ready, include it alongside the question — never after.

## After each answer

Encode the decision into the spec immediately: `DECISION: [topic] — [value] — [from: user clarification]`. Do not leave decisions only in chat.
