---
name: research-before-implement
description: "unsure of correct API/library method, evaluating dependency A vs B, or verifying framework behavior before writing implementation code — NOT searching for..."
---

TRIGGER: unsure of correct API/library method, evaluating dependency A vs B, or verifying framework behavior before writing implementation code — NOT searching for existing patterns in the project (use search-first)
OUTPUT: compact — concrete implementation decision with rationale, confidence level, risks, assumptions noted
SKIP: when the project already has a clear established pattern for the task (check project code first)

---

# Research Before Implement

Use when: starting an integration, unsure of correct API/library method, evaluating dependency A vs B, checking if a pattern already exists in the project, or verifying current framework behavior before writing code.

## Search Order (non-negotiable)

1. **Project patterns first** — search existing modules, services, utilities, tests. If the project already does this, reuse it.
2. **Official docs via Context7** — `resolve-library-id` → `get-library-docs`. Covers most framework/library questions without a web search.
3. **Web search (Tavily or Brave)** — for recent releases, migration notes, community workarounds, or when Context7 lacks coverage.

Do not skip to step 3 when step 1 or 2 would answer the question.

Commands taken from documentation or blog posts are high risk. Do not run on the main machine. Call `command-risk`.

## Minimum Depth

- At least **2 independent sources** before committing to an approach.
- At least **2 search queries with different keywords** before concluding "not found."
- For API/library usage: official doc + one real-world usage pattern (project code, official example, or verified community usage).

## Decision Mandate

Research must end with a **concrete implementation decision**, not a list of options.

Output format:
```
Decision: [what to use / how to do it]
Rationale: [why — sources used, tradeoffs]
Confidence: high / medium / low
Risks: [specific unknowns or version concerns]
```

## When No Clear Answer Exists

If sources conflict or no authoritative answer is found:
- State what was searched and what was found.
- Pick the **safest reversible approach**: prefer existing project patterns over new deps, prefer well-typed over loosely typed, prefer fewer side effects.
- Document the assumption with a `// ponytail:` comment naming what to revisit and when.
- Never block implementation — make a call and proceed.

## Never Block on Research

Research is time-boxed to what's needed to make a call. If a decision is possible with current evidence, make it. Do not keep searching when a reasonable path is clear.

## Output Contract

Before writing implementation code, emit:
- Sources inspected (project files, docs, search results).
- Decision and rationale.
- Any assumptions made and where they're documented.

No source available and the task is rebuilding a similar tool: that is the `rea` agent, not this skill. Do not infer mechanism from file names.
