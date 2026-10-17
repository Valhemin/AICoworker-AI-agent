---
name: canary-watch
description: "Monitor and verify a deployed URL after releases. Checks HTTP endpoints, SSE streams, static assets, console errors, and performance regressions after..."
---

TRIGGER: after deploying to production or staging, or verifying a fix is actually live in the deployed environment
OUTPUT: report — canary report with HTTP status, console errors, performance metrics, API health, static assets per check
SKIP: pre-deploy verification or purely local testing (use browser-testing-workflow instead)

---


# Canary Watch — Post-Deploy Monitoring

## How It Works

Monitors a deployed URL for regressions. Runs in a loop until stopped or until the watch window expires.

### What It Watches

```
1. HTTP Status        — is the page returning 200?
2. Console Errors     — new errors that weren't there before?
3. Network Failures   — failed API calls, 5xx responses?
4. Performance        — LCP/CLS/INP regression vs baseline?
5. Content            — did key elements disappear? (h1, nav, footer, CTA)
6. API Health         — are critical endpoints responding within SLA?
7. Static Assets      — JS, CSS, image, font requests returning 2xx/3xx with expected content types?
8. SSE Streams        — do event-stream endpoints connect and receive initial event or heartbeat?
```

> Prefer sources ≤12 months old when researching performance baselines or browser compatibility for checks.

### Watch Modes

**Quick check** (default): single pass, report results
```
/canary-watch https://myapp.com
```

**Sustained watch**: check every N minutes for M hours
```
/canary-watch https://myapp.com --interval 5m --duration 2h
```

**Diff mode**: compare staging vs production
```
/canary-watch --compare https://staging.myapp.com https://myapp.com
```

### Alert Thresholds

```yaml
critical:  # immediate alert
  - HTTP status != 200
  - Console error count > 5 (new errors only)
  - LCP > 4s
  - API endpoint returns 5xx
  - Static asset returns 4xx/5xx
  - SSE endpoint cannot connect or drops before first heartbeat

warning:   # flag in report
  - LCP increased > 500ms from baseline
  - CLS > 0.1
  - New console warnings
  - Response time > 2x baseline
  - Static asset content type changed unexpectedly
  - SSE heartbeat latency > 2x baseline

info:      # log only
  - Minor performance variance
  - New network requests (third-party scripts added?)
```

### Notifications

When critical threshold is crossed:
- Desktop notification (macOS/Linux)
- Optional: Slack/Discord webhook
- Log to `~/.claude/canary-watch.log`

## Output Format

```markdown
## Canary Report — myapp.com — {timestamp}

### Status: HEALTHY ✓  |  DEGRADED ⚠  |  DOWN ✗

| Check | Result | Baseline | Delta |
|-------|--------|----------|-------|
| HTTP | 200 ✓ | 200 | — |
| Console errors | 0 ✓ | 0 | — |
| LCP | 1.8s ✓ | 1.6s | +200ms |
| CLS | 0.01 ✓ | 0.01 | — |
| API /health | 145ms ✓ | 120ms | +25ms |
| Static assets | 42/42 ✓ | 42/42 | — |
| SSE /events | connected ✓ | connected | +80ms heartbeat |

### Summary: [no regressions | list issues found]
```

## Integration

Pair with:
- `browser-testing-workflow` for pre-deploy verification
- `production-audit` for full production readiness review
- Hooks: add as PostToolUse hook on `git push` to auto-check after deploys
- CI: run in GitHub Actions after deploy step

## Research Note

When fetching documentation for performance budgets, Web Vitals thresholds, or browser API behavior, prefer sources published within the last 12 months. Web Vitals thresholds (LCP, CLS, INP) are updated periodically by Google.
