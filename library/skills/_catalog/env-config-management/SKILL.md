---
name: env-config-management
description: "adding environment variables, secrets, feature flags, or any value that differs between dev/staging/prod"
---

TRIGGER: adding environment variables, secrets, feature flags, or any value that differs between dev/staging/prod
OUTPUT: compact — var names added, validation location, .env.example updated, deployment steps required
SKIP: hardcoded values that are genuinely static across all environments and contain no secrets

---

# Env Config Management

Use when: adding environment variables, secrets, feature flags, or any value that differs between dev/staging/prod.

## Rules

- **Never hardcode** config values that differ by environment (URLs, keys, limits, flags). Use env vars.
- **Never commit secrets** — `.env` files with real values must be in `.gitignore`. Only `.env.example` with placeholder values is committed.
- **Validate at startup** — if a required env var is missing, fail fast with a clear error naming the missing var. Do not fail silently mid-request.
- **Document every var** — add each new var to `.env.example` with a comment describing its purpose and expected format.

## Adding a New Config Value

1. Decide the correct scope: env var (secret / environment-specific) vs config file (static, committed) vs feature flag (runtime toggle).
2. Add to `.env.example` with a descriptive comment and placeholder value.
3. Add validation at the app config/init layer (not at the call site).
4. Use the value through a typed config module — do not call `process.env.FOO` scattered across business logic.
5. Update any deployment docs, CI secrets config, or infra-as-code that needs the new var.

## Feature Flags

- Gate new or risky behavior behind a flag during rollout.
- Flags default to `false` / off. Explicit opt-in required.
- Remove the flag and dead code path once the rollout is complete. Flags are not permanent.
- Document the flag: what it enables, when to turn it on, when to delete it.

## Security

- Treat any env var containing `KEY`, `SECRET`, `TOKEN`, `PASSWORD`, `CREDENTIAL`, or `DSN` as a secret.
- Secrets must not appear in logs, error messages, API responses, or client-side bundles.
- Rotate secrets that may have been accidentally logged or committed.

## Output Contract

When adding config vars, list:
- Var name(s) added.
- Where validation lives.
- `.env.example` updated: yes/no.
- Deployment step required (CI secret, infra var, etc.): yes/no + what.
