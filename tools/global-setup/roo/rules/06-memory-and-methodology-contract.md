# Memory and Methodology Contract

Memory is a tool, not a source of truth.

Use AgentMemory to recall and store stable engineering context only:
- project conventions and architecture decisions
- accepted tradeoffs and rejected alternatives
- recurring bugs, gotchas, and debugging notes
- durable user/project preferences
- handoff summaries and release notes

Before acting on memory, verify the current repository files and docs. Code, tests, docs, and user instructions override memory.

Never store secrets, credentials, API keys, tokens, private keys, personal sensitive data, customer data, or unreleased confidential business data unless the user explicitly asks and the storage location is approved.

Use Superpowers skills by default: `brainstorming-design-refinement` when goal is ambiguous, `writing-plans-superpowers` before large implementation, `tdd-red-green-refactor` when tests are practical, `verification-before-completion` before claiming done.

## AI Cost Optimization

Match model tier to task complexity:

| Task type | Model tier |
|---|---|
| Formatting, rename, simple edit | Haiku (cheapest) |
| Single-file logic, bug fix, test | Sonnet (default) |
| Architecture, cross-file refactor, planning | Sonnet / Opus |
| Deep analysis, security audit, novel problem | Opus |

Cache aggressively:
- Do NOT re-read files you just read in the same session. Edit/Write track file state.
- Batch related reads into one parallel call rather than sequential.
- Prefer `grep`/`find` over full file reads for symbol lookup.
- Cache AI responses for identical prompts (same prompt + same context = same result).

Avoid token waste:
- No redundant recaps or trailing summaries in agent responses.
- Prefer targeted edits (Edit tool) over full rewrites (Write tool) — smaller context.
- One `grep` before opening a file to confirm it contains what you need.
- Consolidate parallel tool calls — `Read A + Read B` in one message, not two.

Cost red flags: reading the same file twice in a turn, calling a search tool after already finding the answer, restating prior context verbatim, running full test suite on a one-line typo fix.
