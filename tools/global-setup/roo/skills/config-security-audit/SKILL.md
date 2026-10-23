TRIGGER: adding or changing MCP config, agent rules, CI workflows, env handling, auth, deploy config, hooks, or shell automation
OUTPUT: report — risk level (LOW/MEDIUM/HIGH/CRITICAL), findings with evidence, required fixes, safe optional improvements
SKIP: pure application code changes with no config, automation, or secret handling involved

---

# Config Security Audit

Use when adding or changing MCP config, agent rules, package scripts, CI, env handling, auth, deploy config, hooks, or any automation with shell/network/file-system access.

## Audit Checklist

- Are commands deterministic and scoped?
- Does any command execute remote code or install packages? If yes, is the source trusted?
- Are secrets referenced through environment variables rather than hard-coded?
- Are secrets excluded by `.rooignore`, `.gitignore`, and docs policy?
- Does the config grant more permissions than needed?
- Could prompt injection from a repo file, URL, issue, or MCP response cause unsafe actions?
- Are external API calls limited to intended services?
- Is there a rollback path?

## Output

Return:

- Risk level: LOW / MEDIUM / HIGH / CRITICAL.
- Findings with evidence.
- Required fixes.
- Safe optional improvements.
- What was not checked and why.

Do not auto-fix high-risk configuration without explicit user approval.
