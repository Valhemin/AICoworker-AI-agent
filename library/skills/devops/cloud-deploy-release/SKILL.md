---
name: cloud-deploy-release
description: Prepare production deployment manifests (Docker Compose, Vercel, Fly.io, VPS Nginx/Caddy), domain configuration, and zero-downtime release/rollback scripts.
---

TRIGGER: product is ready for staging or production release (tester PASS, security audit clean)
OUTPUT: detailed — deploy-plan.md with container/manifest files, health check endpoint, and rollback procedure
SKIP: local-only utilities, internal offline scripts

---

# Cloud Deployment & Release

Prepare production hosting infrastructure and deployment procedures. Adapted from `agency-agents/engineering` Cloud Architect methodology.

## Input

Read before starting:
- `docs/test/product-test.md` — must show all PASS
- `secrets-audit.md` or `appsec-review.md` — zero unmitigated CRITICAL/HIGH findings
- Chosen hosting provider: VPS (Docker + Reverse Proxy), Serverless (Vercel/Cloudflare Pages), or PaaS (Fly.io/Render)

---

## Step 1 — Production Container & Process Architecture

1. **Dockerfile Configuration**:
   - Non-root user execution (`USER appuser`).
   - Clean shutdown: Proper `SIGTERM` handling for graceful connection draining.
   - Minimal image size (< 200MB using Alpine/Distroless).
2. **Reverse Proxy & SSL**:
   - Caddy (automatic Let's Encrypt SSL) or Nginx with modern TLS 1.3 ciphers.
   - HTTP to HTTPS redirection and Security Headers (HSTS, CSP, X-Frame-Options).

---

## Step 2 — Health Check & Environment Injection

1. **Health Check Endpoint**: `/api/health` or `/healthz` returning `200 OK` (verifies DB connection and service liveness).
2. **Runtime Configuration**: Inject runtime variables via environment secrets; disallow committing `.env` files.

---

## Step 3 — Rollback Procedure & Release Plan

Document step-by-step rollback:
1. Fast rollback command (e.g. `docker compose rollback` or `git checkout <previous-tag> && docker compose up -d`).
2. Database migration backward compatibility: never deploy schema changes that break the currently running version (expand-contract pattern).

---

## Write

Write `../shared/01_Projects/<domain>/<project-name>/deploy-plan.md`.

Format:
- `## Vietnamese` deployment instructions, health check URL, and rollback command
- `## English` deployment instructions, health check URL, and rollback command

End with one next step.
