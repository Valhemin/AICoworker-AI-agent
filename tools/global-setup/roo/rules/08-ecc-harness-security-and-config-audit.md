# ECC-inspired Harness Security and Config Audit

Treat agent configuration as executable project infrastructure.

Audit these before trusting or extending them:

- MCP server commands, URLs, headers, env variables, and permissions.
- Agent rules, skills, hooks, scripts, and generated templates.
- Shell commands proposed by the agent, especially those using network, filesystem writes, package managers, curl/bash, or credentials.
- Any workflow that stores memory, writes summaries, updates config, creates branches, creates issues, or sends data externally.

Security rules:

- Never store or expose secrets, tokens, API keys, private keys, customer data, or sensitive personal data in memory, rules, prompts, logs, docs, or reports.
- Never auto-approve new MCPs, hooks, remote scripts, or package install commands without explaining risk and purpose.
- Prefer read-only analysis before config mutation.
- Use the smallest permission surface that completes the task.
- Report skipped or unavailable security checks honestly.

## Agent Permission Tiers

Actions fall into three tiers. Default to the most restrictive tier that applies.

### Auto-allowed (proceed without asking)
- Read source code, docs, config files
- Edit files in the local workspace
- Run lint, typecheck, tests, local build
- Start local dev server
- Create local branch or worktree
- Write draft documentation or draft PR summary

### Needs confirmation (ask before doing)
- Install a new dependency
- Change database schema
- Change CI/CD pipeline config
- Push a branch to remote
- Open a pull request
- Deploy to preview environment
- Access external accounts or services
- Add or change telemetry / analytics
- Choose the primary framework or database for a new project
- Add a paid third-party service
- Add a native dependency (binary, native module)
- Change authentication or authorization model
- Change data retention policy
- Change a public API contract
- Expand scope beyond the agreed MVP

### Prohibited without explicit approval in this session
- Merge any branch
- Deploy to production
- Run a destructive production migration (drop table, truncate, irreversible transform)
- Delete persistent data
- Rotate or revoke credentials
- Publish a package to any registry
- Submit a mobile app to App Store or Play Store
- Publish a desktop release
- Change billing or paid service configuration

Approval in a previous session does not carry over. Each prohibited action requires explicit confirmation in the current conversation, scoped to the exact action being taken.

## MCP Health Check

Run this check at the start of any session where an MCP tool is about to be used. Do NOT silently fail or skip — a broken MCP wastes tokens and produces confusing errors.

### Required env vars per MCP

| MCP | Env var required | How to check |
|---|---|---|
| `tavily` | `TAVILY_API_KEY` | `echo $TAVILY_API_KEY` |
| `github` | `GITHUB_PERSONAL_ACCESS_TOKEN` | `echo $GITHUB_PERSONAL_ACCESS_TOKEN` |
| `brave-search` | `BRAVE_API_KEY` | `echo $BRAVE_API_KEY` |
| `figma-desktop` | *(no key)* — needs Figma Desktop running on port 3845 | `curl -s http://127.0.0.1:3845/sse --max-time 2` |
| `context7` | none | always available |
| `agentmemory` | none | always available |
| `playwright` | none | always available |
| `chrome-devtools` | none | always available |
| `figma` | none in config (uses Figma's OAuth via browser) | attempt a tool call to verify |

### When a required env var is missing

Tell the user immediately. Do not attempt the MCP call — it will fail or return a misleading error.

**Message format:**

> `[mcp-name]` is enabled but `ENV_VAR_NAME` is not set — it won't work until you add it.
>
> **To add the key:** Open your shell profile (`~/.zshrc`, `~/.bashrc`, or `~/.config/fish/config.fish`) and add:
> ```
> export ENV_VAR_NAME="your-key-here"
> ```
> Then reload: `source ~/.zshrc` (or restart the terminal).
>
> **To disable instead:** In `.roo/mcp.json`, set `"disabled": true` for `[mcp-name]`.
>
> Get the key at: [link appropriate to the service]

Key sources:
- `TAVILY_API_KEY` → https://app.tavily.com/home
- `GITHUB_PERSONAL_ACCESS_TOKEN` → GitHub → Settings → Developer settings → Personal access tokens
- `BRAVE_API_KEY` → https://api.search.brave.com/

### When figma-desktop port 3845 is unreachable

> `figma-desktop` needs the Figma Desktop app running. Open Figma Desktop, go to **Plugins → Development → Enable MCP Server**, then retry.
>
> **To disable instead:** Set `"disabled": true` for `figma-desktop` in `.roo/mcp.json`.

### Do not run health check for

- MCPs with `"disabled": true`
- MCPs that have no env var requirement and no local service dependency
- When the user has already confirmed the key is set this session

## Optional external audit:

- For high-risk config changes, the user may run `npx ecc-agentshield scan` manually.
- Do not run auto-fix modes without explicit user approval.
