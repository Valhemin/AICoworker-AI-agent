---
name: ci-cd-pipeline
description: Create and maintain GitHub Actions CI/CD workflows for automated test runs, linting, Docker image building, and deployment triggers.
---

TRIGGER: repository needs automated continuous integration on pull request / push, or automated container build
OUTPUT: detailed — .github/workflows/ci.yml or deploy.yml with build-test-lint stages and artifact publishing
SKIP: scratch scripts, documentation-only repositories

---

# CI/CD Pipeline

Setup automated build, test, and container packaging pipelines. Adapted from `agency-agents/engineering` DevOps methodology.

## Input

Read before starting:
- Package manager files (`package.json`, `go.mod`, `pyproject.toml`, `Cargo.toml`)
- Existing test and build scripts (`npm test`, `npm run build`, etc.)

---

## Step 1 — Workflow Matrix & Environment

1. **Trigger Definition**:
   - `pull_request`: Run lint and tests on PR branches.
   - `push` to `main`: Run tests, build Docker container, trigger staging deployment.
2. **Matrix & Caching**:
   - Use official setup actions (`actions/setup-node`, `actions/setup-python`, etc.).
   - Enable dependency caching (npm/pip/cargo cache) to keep run times under 3 minutes.

---

## Step 2 — Quality Gate Enforcement

1. **Lint & Type Check**: Fail fast if syntax or TypeScript types fail.
2. **Automated Unit & Integration Tests**: Run headless test suite. Upload coverage artifact if configured.
3. **Security Audit**: Include dependency security check (`npm audit --audit-level=high` or equivalent).

---

## Step 3 — Docker Build & Registry Push (Optional)

If project uses containers:
1. Multi-stage Docker build for minimal production image footprint.
2. Docker layer caching via GitHub Actions cache.
3. Use secrets for registry credentials (GitHub Packages / Docker Hub). Never hardcode.

---

## Write

Write `.github/workflows/ci.yml` or `.github/workflows/deploy.yml` directly in the project repository.

Format summary:
- `## Vietnamese` pipeline architecture and trigger events
- `## English` pipeline architecture and trigger events

End with one next step.
