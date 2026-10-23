---
name: production-audit
description: Local-evidence production readiness audit for shipped apps, pre-launch reviews, post-merge checks, and "what breaks in prod?" questions. No external audit services or data sharing.
---

TRIGGER: user asks 'is this production-ready', 'what would break in prod', pre-launch review, or post-merge risk pass
OUTPUT: report — score/100, blockers, high-value fixes, evidence checked, evidence missing, next action
SKIP: during active implementation or for formal compliance audit (engineering triage only, not regulatory)

---


# Production Audit

## How It Works

Build the audit from local and user-authorized evidence only. Do not run unpinned remote code, upload repository contents to third-party services, or call external scanners unless the user explicitly approves that specific tool and data flow.

**Order:**

1. Establish the release surface
2. Read recent changes and current branch state
3. Inspect runtime, auth, data, payment, background-job, AI, and deployment boundaries that exist in the repo
4. Check CI, tests, migrations, environment documentation, and rollback path
5. Produce a short ship/block recommendation with specific fixes

## Evidence Checklist

Start with cheap local signals:

```bash
git status --short --branch
git log --oneline --decorate -20
git diff --stat origin/main...HEAD
```

Then inspect the project-specific surface:

- Package scripts, CI workflows, release scripts, Docker files, deployment manifests
- API routes, webhooks, auth middleware, background workers, cron jobs, database migrations
- Environment variable documentation and startup checks
- Observability hooks, error reporting, logs, health checks, dashboards
- Rollback, seed, migration, and backfill instructions
- E2E coverage for the user paths that matter most

If a deployed URL is in scope, use browser or HTTP checks only against that URL. Avoid credentialed actions unless the user supplies a safe test account.

## Risk Lenses

### Security and Auth

- Public vs API vs admin routes clearly separated?
- Auth and authorization enforced server-side?
- Secrets out of client bundles, logs, example output, and committed files?
- Rate limits, CSRF protections, CORS policy, upload validation present where needed?
- AI/agent surface defended against prompt injection and tool abuse?

### Data Integrity

- Migrations run forward cleanly with rollback or recovery plan?
- Destructive migrations, backfills, data imports staged safely?
- Database policies and service-role boundaries match tenancy model?
- Retries idempotent for writes, jobs, and webhook handlers?

### Payments and Webhooks

- Webhook signatures verified before parsing trusted payload fields?
- Each payment/subscription/fulfillment webhook idempotent?
- Replay, duplicate delivery, and out-of-order delivery handled?
- Test-mode and live-mode credentials separated?

### Operations

- App starts from clean checkout using documented commands?
- Required env vars named, validated, and fail-fast?
- Health check proves dependencies are reachable?
- Deploy, rollback, and incident-owner paths documented?
- Logs useful without leaking secrets or PII?

### User Experience

- Launch-critical paths covered on desktop and mobile?
- Forms usable on mobile without input zoom, layout overlap, or blocked submission?
- Loading, empty, error, and permission-denied states communicate clearly?
- Support or recovery path when critical operation fails?

## Scoring

| Band | Score | Meaning |
|------|-------|---------|
| Blocked | 0–49 | Do not ship until top risks are fixed |
| Risky | 50–69 | Ship only behind small rollout or internal beta |
| Launchable With Caveats | 70–84 | Ship if owners accept listed risks |
| Strong | 85–100 | No obvious launch blockers from available evidence |

**Cap at 69** if any of:
- Auth or authorization missing on sensitive data
- Payment/fulfillment webhooks not idempotent
- Required migrations cannot run safely
- Secrets exposed in client bundles, logs, or committed files
- No rollback path for high-impact release

**Cap at 84** if CI is not green or launch-critical path was not tested end-to-end.

## Output Format

Lead with one sentence:

```text
Production audit: 76/100, launchable with caveats, with webhook idempotency and rollback docs as the two risks to fix before public launch.
```

Then list:

- **Blockers**: must-fix items before deploy
- **High-value fixes**: next improvements to raise the score
- **Evidence checked**: files, commands, CI, deployed URL, or PRs inspected
- **Evidence missing**: what would change confidence if provided
- **Next action**: one concrete fix or verification step

Keep strengths short. The useful answer is remaining risk and next action.

## Example

User: "is this ready to ship?"

```text
Production audit: 68/100, risky, because Stripe webhooks are verified but not idempotent and there is no rollback note for the pending migration.

Blockers:
- Add idempotency for `checkout.session.completed` before fulfilling orders.
- Write and test the rollback path for `20260511_add_billing_state.sql`.

High-value fixes:
- Add health check verifying database and payment-provider reachability.
- Add one E2E path for upgrade, webhook fulfillment, and billing-page refresh.

Evidence checked:
- `api/stripe/webhook.ts`
- `db/migrations/20260511_add_billing_state.sql`
- GitHub Actions run for the release branch

Next action: Want me to patch webhook idempotency first?
```

## Anti-Patterns

- Running `npx <package>@latest` or remote scanners as the default audit path
- Uploading source, secrets, customer data, or private topology to external services without explicit approval
- Producing a score without naming the evidence checked
- Treating green CI as production readiness
- Ending with a generic "let me know what you want to do"

## Research Note

When researching security patterns, deployment best practices, or regulatory requirements, prefer sources published within the last 12 months. Standards and tooling in this space evolve quickly.

## See Also

- Skill: `canary-watch` (live post-deploy monitoring)
- Skill: `finishing-development-branch` (pre-merge readiness gate)
