TRIGGER: starting a non-trivial feature or utility — check if pattern or package already exists before writing code; NOT evaluating which API/library method to call (use research-before-implement)
OUTPUT: compact — sources searched, existing pattern found or not, concrete decision and rationale
SKIP: trivial well-known tasks where the approach is unambiguous and no existing pattern needs checking

---

# Search First

Use when: starting a non-trivial feature, adding a dependency/integration, writing a new utility, touching framework-specific behavior, or when the solution may already exist in the project or ecosystem.

## Workflow

1. Check project-local patterns first: existing modules, services, components, tests, docs, conventions.
2. If current framework/library behavior matters, research official/current docs with **Context7** (`resolve-library-id` → `get-library-docs`).
3. If Context7 lacks coverage, use **Tavily** or **Brave Search** MCP for recent articles, issues, migration notes.
4. Compare at least two paths when appropriate:
   - Reuse existing project pattern
   - Use a standard library/framework feature
   - Add a dependency
   - Custom implementation
5. Choose the smallest maintainable path with clear tradeoffs.
6. Conclude with a decision — do not stop at "here are some options."

## Minimum Search Depth

- At least **2 search queries** with different keywords before concluding "not found."
- For integration/API topics: at least **2 independent sources** (official doc + one real-world usage example).
- If nothing found after exhausting sources: state explicitly what was searched, then choose safest reversible path.

## Output Contract

Include:
- What was searched or inspected (sources + queries used).
- What current source or repo pattern informed the decision.
- **Decision and rationale** — a concrete recommendation, not just findings.
- Risks, unknowns, and verification plan.

Do not stop at listing options when a decision is possible. Do not invent a solution when research failed — state the gap and choose the safest reversible next step.
