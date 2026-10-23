---
name: technical-architecture
description: Design a concrete, committed system or feature architecture — not a list of options.
---

TRIGGER: designing a system or feature architecture with committed technology decisions before implementation
OUTPUT: detailed — modules/boundaries, data flow with error paths, API contracts, state management, security, performance, trade-offs, rollback
SKIP: small single-file tasks; never produce architecture options without committing to one

---

## Research phase (mandatory before committing)

Before exploring options, verify the tools you plan to use:
- For every library, framework, or SaaS in scope: check current docs, version, and known limitations. Do not rely on training-data knowledge alone — look it up.
- For every external API: verify endpoints, auth model, rate limits, pricing tier needed. Use `api-service-research` skill if comparing multiple providers.
- For any performance target: find a reference benchmark or comparable system — do not invent numbers.
- Record source and date for every verified technical fact. Mark any unverified claim as `RESEARCH-NEEDED:`.

Do not write `ASSUMPTION:` for facts that can be looked up. Look them up first.

## Commit rule

This skill must produce one committed architecture, not a menu. Explore options internally, then commit:
```
## ARCHITECTURE DECISION: [topic]
Chosen: [approach]
Rationale: [why]
Rejected: [alternatives and why ruled out]
```

If multiple valid architectures exist, pick the one that minimizes operational complexity unless requirements dictate otherwise.

## Required sections

- **Current architecture context**: what exists now, what this design integrates with.
- **Proposed modules and boundaries**: component names, responsibilities, what they do NOT own.
- **Data flow**: sequence or data-flow diagram (text/mermaid acceptable). Must show error paths, not just happy path.
- **API/service contracts**: method, inputs, outputs, error codes. Not "TBD".
- **State management**: where state lives, how it propagates, what triggers re-render or cache invalidation.
- **Security and permissions**: auth model, trust boundaries, what is rejected and how.
- **Performance**: p95 target, bottleneck prediction, mitigation.
- **Trade-offs and rejected alternatives**: required even if only one option was viable.
- **Rollback strategy**: how to revert if this architecture is deployed and fails.

## Done-definition

Architecture is READY when:
- One architecture is committed (not "option A or B depending on needs").
- Every module has defined inputs, outputs, and boundaries.
- Error paths are specified (not just success paths).
- Security model is explicit.
- A junior engineer can implement from this doc without architectural guesswork.
