TRIGGER: Zoo/Roo config, MCP servers, .roomodes, rules, skills, tool permissions, or model routing appears broken rather than project code
OUTPUT: compact — config files inspected, failure category identified, fix applied with verification
SKIP: application bugs in the project being built; only use when the harness execution environment itself is wrong

---

# Harness Config Debugging

## When to Use

Use when: the agent harness itself (Zoo/Roo config, MCP servers, `.roomodes`, rules, skills, tool permissions, model routing) appears broken — not when the project code has a bug. If behavior is wrong inside the agent's execution environment rather than in the application being built, use this skill.

Use when Zoo/Roo, MCP, memory, tool permissions, model routing, or agent behavior itself appears broken.

## Workflow

1. Separate project bug from harness/config bug — check if the same behavior occurs outside the harness.
2. Inspect only relevant config: `.roomodes`, `.roo/mcp.json`, `.roo/rules*`, `.roo/skills*`, `.rooignore`, env vars referenced by MCPs.
3. Check MCP availability and disabled/enabled state.
4. Identify failure category: command path, package install, env var, auth, timeout, permission, or prompt/rule conflict.
5. Propose the smallest config fix and rollback plan.
6. Verify: trigger the original failing behavior after fix — confirm resolved.

Do not rewrite the entire setup to solve a single MCP/config failure.

## Output Contract

Output contract: see rules-debug/01.

- **Config inspected**: files checked, relevant values found.
- **Failure category**: identified or narrowed.
