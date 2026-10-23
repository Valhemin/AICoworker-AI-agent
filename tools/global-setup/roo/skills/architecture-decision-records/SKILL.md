---
name: architecture-decision-records
description: Document architectural and technology decisions in a structured ADR format. Captures context, chosen option, rejected alternatives, and trade-offs. Prevents "why did we do this?" archaeology later.
---

TRIGGER: comparing technologies or patterns, recording a significant architectural choice, or user says 'document why we chose X' or 'ADR for this'
OUTPUT: detailed — structured ADR with context, decision, alternatives considered with pros/cons, consequences
SKIP: trivial naming/formatting choices, single-file implementation details, or quick recommendations without a permanent record needed

---


# Architecture Decision Records

## When to Use

**YES — fire this skill when:**
- User says "record this decision", "document why we chose X", "ADR for this"
- Comparing two or more technologies, patterns, or approaches ("X vs Y")
- A significant architectural choice was just made (framework, DB schema, auth strategy, API design, testing strategy, infra pattern)
- User says "we decided to use X" with implied rationale worth preserving
- Starting a new project or major feature where foundational choices are being set

**NO — skip this skill when:**
- Trivial naming or formatting choices (variable names, code style tweaks)
- Implementation detail, not architectural (how to write a specific loop)
- The decision is already well-documented elsewhere and user isn't asking to record it
- Pure bug fix with no design choice involved

## When NOT to Use

- Refactoring or cleanup tasks with no design decision
- The user just wants a quick recommendation, not a permanent record
- Single-file or single-function scope changes

---

## Workflow

1. **Detect** — identify explicit ("use X instead of Y") or implicit (framework selection, schema design, auth strategy) decision signals
2. **Gather context** — ask for constraints, requirements, or alternatives considered if not stated
3. **Draft ADR** — follow the structure below
4. **Present draft** — show to user before writing to disk
5. **Write on approval only** — create file, update index

## ADR Format

```markdown
# ADR-{N}: {Title}

**Status:** proposed | accepted | deprecated | superseded by ADR-{M}
**Date:** YYYY-MM-DD

## Context

What situation prompted this decision? What forces are at play?

## Decision

What was decided. State it directly.

## Alternatives Considered

| Option | Pros | Cons | Why Rejected |
|--------|------|------|--------------|
| Alt A  | ...  | ...  | ...          |
| Alt B  | ...  | ...  | ...          |

## Consequences

- What becomes easier
- What becomes harder
- What is now a constraint
```

## File Layout

```
docs/adr/
  README.md          # index table: ADR # | Title | Status | Date
  template.md        # blank copy of the format above
  0001-use-postgres.md
  0002-api-versioning.md
  ...
```

Index table format in `README.md`:

| # | Title | Status | Date |
|---|-------|--------|------|
| 0001 | Use PostgreSQL | accepted | 2026-01-10 |

## What Merits an ADR

**Yes:** technology picks, architectural patterns, API design, data modeling, infrastructure choices, security strategy, testing approach, process decisions that affect the whole team.

**No:** trivial naming, formatting, one-file implementation details.

## Lifecycle

```
proposed → accepted
accepted → deprecated       (no longer relevant)
accepted → superseded       (link to newer ADR)
```

When superseding, update the old ADR's status and link forward.

## Rules

- Number sequentially, zero-padded to 4 digits
- Don't backfill undated decisions — date them as "discovered YYYY-MM-DD"
- Keep each section short; honesty about trade-offs beats completeness theater
- Always include rejected alternatives — the "why not X" is as valuable as the "why Y"
