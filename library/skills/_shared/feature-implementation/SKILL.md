---
name: feature-implementation
description: "building any feature from a spec or set of acceptance criteria"
---

TRIGGER: building any feature from a spec or set of acceptance criteria
OUTPUT: detailed — files changed, API test results, verification command and result, known gaps and follow-ups
SKIP: small single-file fixes without a spec; use direct implementation and incremental-self-review instead

---

# Feature Implementation

Primary orchestrator skill. Use when building any feature from a spec.

## Non-Negotiable Defaults

- **Run to 95%+ production-ready.** Do not stop after one scope.
- **Never pause mid-implementation to ask permission to continue.** If blocked by a genuine blocker (missing credentials, missing information only the user can provide, environment failure), report and stop. Difficulty, complexity, and uncertainty are not blockers.
- **API tests are default after any backend/API work.** No explicit user request needed → run `api-testing` skill.
- **Research before building when uncertain.** If integrating an external API or unsure of correct approach → run `research-before-implement` skill first.

## Orchestration Map

This skill coordinates the following skills — invoke them at the indicated steps:

| Skill | When to invoke |
|---|---|
| `research-before-implement` | Before writing code when: external API, unfamiliar library, or pattern is unclear |
| `api-integration-workflow` | When adding/modifying calls to an external API or third-party service |
| `error-handling-patterns` | For every new endpoint, service, or async operation — not optional |
| `api-testing` | DEFAULT after any backend/API implementation — happy path + edge cases |
| `db-migration-workflow` | When the feature requires schema changes |
| `env-config-management` | When new env vars, secrets, or feature flags are introduced |
| `observability-setup` | When starting a new service, or when logger/health check/error tracker is not yet present |
| `tdd-red-green-refactor` | When test infrastructure exists and the logic is non-trivial |
| `web-security-assurance` | When the scope adds or changes a web entry point, API, session, upload, payment, or the server a desktop app calls |
| `product-legal-compliance` | When the scope is a website or desktop app that collects personal data, sells, or ships to Vietnam or a named market |
| `data-privacy-compliance` | When the scope stores, shows, or sends personal data — classify fields before coding retention or deletion |
| `consent-and-erasure` | When the scope collects personal data — store a consent row per purpose and a real server export and delete |
| `incremental-self-review` | After each scope before moving to the next |
| `verification-before-completion` | Before final completion report |
| `browser-testing-workflow` | Only when user explicitly asks for E2E or UI testing |

## Implementation Loop

1. **Map all acceptance criteria** to discrete code scopes. List them explicitly before writing a single line of code.
2. **Research gate** — if any scope involves an external API, unfamiliar library, or unclear pattern → run `research-before-implement` first.
2b. **Design gate** — if a scope changes a screen, flow, or form, run `follow-design` before writing UI. Missing `docs/design/` stops the UI scope. Backend scope may continue.
2c. **SEO gate** — if a scope is a public web page and the task is not from `developer-work`, run `web-seo` while implementing that page.
2d. **Structure gate** — run `code-structure` before adding a new module. Follow the repo. Do not open a second layout.
2e. **Security gate** — if the scope adds or changes an entry point in the `web-security-assurance` trigger, run that skill before calling the scope done. Open CRITICAL or HIGH controls block the scope.
2f. **Legal gate** — if the scope is a public site, account, sale, or desktop app in the `product-legal-compliance` trigger, add the pages or in-app functions that skill marks in product. List OWNER ACTION filings in the completion output. Do not claim the product is certified. If the scope stores personal data, run `data-privacy-compliance` for the field inventory and `consent-and-erasure` for the consent row, export, and server delete.
3. **Implement one coherent scope.**
4. **Run `incremental-self-review`** — do not skip.
5. **Run focused verification** — typecheck, lint, tests. Record command and result.
6. **Fix issues** before moving to the next scope.
7. **Continue to the next scope immediately** — no pause, no permission request between scopes.
8. **After backend/API work: run `api-testing` skill** — mandatory, no exception.
9. **Repeat until ALL acceptance criteria are satisfied.**
10. **Run `verification-before-completion`** before the final report.

## Scope Self-Review Checklist (via `incremental-self-review`)

Per scope before advancing:
- Correctness and acceptance criteria match
- Type safety / schema safety
- Error handling (use `error-handling-patterns` for every error site)
- Security / privacy
- Performance
- Backward compatibility
- Tests and docs
- Accessibility/responsive when relevant

## Delivery Contract

A scope is complete when: code written + self-reviewed + verification run + result recorded. Not before.

## Partial Completion Protocol

When genuinely blocked, report ALL of:
- **Completed:** scopes/files done with verification status
- **Blocked:** exact task, error or missing input verbatim
- **Attempted:** what was tried to unblock
- **Next action:** one concrete next step

Never return without this structure when blocked.

## Completion Output

At task end:
- Files changed and behavior added
- API test results (if backend work was done)
- Verification command and result (pass / partial / fail with details)
- Known gaps or risks
- Follow-up items

Never write "done", "complete", or "production-ready" without evidence from `verification-before-completion`.
