---
name: environment-config-debugging
description: "bug only reproduces in one environment or behavior changed with no code changes since last working deploy"
---

TRIGGER: bug only reproduces in one environment or behavior changed with no code changes since last working deploy
OUTPUT: detailed — environment diff table, root diff identified, fix applied in broken environment
SKIP: code logic bugs that reproduce consistently in all environments

---

# Environment / Config Debugging

Use for "works on my machine" bugs, environment-specific failures, missing env vars, secrets not loaded, config drift between dev/staging/prod, and deployment-time breakage with no code change.

## When to Use

- Bug only reproduces in one environment (local / CI / staging / prod).
- Worked in last deploy, broken now — no code change.
- Missing or wrong env var produces silent wrong behavior (not a clear crash).
- Service connects to wrong DB, cache, or external API in one environment.
- Docker/K8s/serverless deployment behaves differently than local run.
- Secret present in `.env` locally but not in deployed environment.

## Process

### 1. Establish the Environment Boundary
- Confirm: does the bug reproduce in environment A but not B?
- If yes: the cause is a difference between A and B, not a logic bug.
- List all environmental axes that differ: OS, runtime version, env vars, secrets, network topology, deployed config files, feature flags, infrastructure (DB version, cache version, queue).

### 2. Diff the Environments

For each axis, compare A vs B:

| Axis | How to check |
|---|---|
| Env vars | Print sorted env in both environments (redact secrets) |
| Runtime version | `node --version`, `python --version`, language runtime |
| Dependency versions | `package-lock.json`, `poetry.lock`, `go.sum`, installed packages |
| Config files | Deploy-time config, `app.config.ts`, `settings.py`, mounted volumes |
| Infrastructure | DB version, Redis version, queue type, TLS cert, region |
| Feature flags | Flag service state for the environment |
| Network | DNS resolution, internal hostname routing, firewall rules |

### 3. Classify the Diff

| Category | Example |
|---|---|
| **Missing env var** | `DATABASE_URL` set locally, absent in prod |
| **Wrong env var value** | `API_BASE_URL` points to staging in prod |
| **Secret not injected** | Secret manager not configured for the deployment |
| **Version mismatch** | Node 18 locally, Node 20 in CI — behavior differs |
| **Config file drift** | `nginx.conf` different between environments |
| **Feature flag divergence** | Flag on in staging, off in prod |
| **Infrastructure difference** | Postgres 14 locally, Postgres 16 in prod — query planner differs |
| **Network topology** | Service resolves to different IP in K8s vs local |

### 4. Confirm the Root Diff
- Narrow to the single diff that explains the bug.
- Verify by temporarily making B match A (safe in staging; avoid in prod unless reversible).
- If not safe to change B: simulate the diff in A by setting A to B's value.

### 5. Fix Minimally
- Correct the config source (not the consuming code) unless the code is mis-reading a present value.
- For missing secrets: add to the secret manager, not to source code.
- For version mismatches: pin to consistent versions across environments.
- For config drift: codify config in version control (IaC, `.env.example`, Helm values).

### 6. Verify in Both Environments
- Confirm fix in the broken environment.
- Confirm working environment still works (fix did not introduce a new diff).

## Output Contract

Output contract: see rules-debug/01.

- **Environments compared**: e.g., "local (works) vs staging (fails)."
- **Axes checked**: each with diff status (same / different / unable to check).
- **Root diff identified**: the specific variable, value, version, or config (or "not yet identified").
- **Diff category**: from the classification table.

## Security Notes

When printing env vars for comparison:
- Redact all values containing "secret", "key", "token", "password", "credential", "auth".
- Print only the key name and whether the value is present/absent (not the value itself).
- Never log secrets to files or output that persists.
