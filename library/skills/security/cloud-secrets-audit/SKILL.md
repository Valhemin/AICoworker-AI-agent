---
name: cloud-secrets-audit
description: Audit repository, environment configs, git history, and cloud settings for credential leaks and open storage.
---

TRIGGER: before first commit/release of a project, during dependency/infrastructure upgrade, or periodic security posture check
OUTPUT: detailed — secrets-audit.md with detected patterns, risk severity, and remediation steps
SKIP: projects with zero external API/cloud integration and no environment variables

---

# Cloud & Secrets Security Audit

Detect API key leaks, hardcoded credentials, open buckets, and unquarantined `.env` files. Adapted from `agency-agents/security` SecOps methodology.

## Input

Read before starting:
- Root repository files, `.gitignore`, `.env.example`
- Git commit log history for accidental credential commits

---

## Step 1 — Local & Git Credential Scan

Scan repository with ripgrep for known secret patterns:

1. **High-Entropy Tokens**: `sk-`, `ghp_`, `xoxb-`, `AKIA`, private keys (`-----BEGIN PRIVATE KEY-----`).
2. **Environment File Discipline**: Verify `.env`, `.env.local`, `.env.production` are strictly listed in `.gitignore`.
3. **Commit History Check**: Ensure credentials were not committed in past commits (even if deleted in HEAD).

---

## Step 2 — Cloud & Storage Misconfiguration Check

Verify infrastructure surface:

1. **Storage Bucket ACL**: Ensure S3 / R2 / Supabase storage buckets holding user data are marked PRIVATE, not public read.
2. **Database Direct Exposure**: Database connection strings must not be directly reachable via public internet without IP allowlist or VPN/tunnel.
3. **IAM Least Privilege**: API service roles have only required permissions (e.g. read-only where write is not needed).

---

## Step 3 — Remediation & Severity Gate

Classify findings:
- `CRITICAL`: Live production API key / private key in git. Action: **REVOKE KEY IMMEDIATELY** in provider dashboard, rotate, purge git history.
- `HIGH`: Unquarantined `.env` file tracked by git. Action: Remove from cache (`git rm --cached`), add to `.gitignore`.
- `MEDIUM`: Over-permissive CORS header (`*`) on authenticated endpoints.
- `LOW`: `.env.example` contains realistic-looking dummy values.

---

## Write

Write `../shared/01_Projects/<domain>/<project-name>/secrets-audit.md` or `shared/07_Evidence/secrets-audit.md`.

Format:
- `## Vietnamese` findings and remediation checklist
- `## English` findings and remediation checklist

End with one next step.
