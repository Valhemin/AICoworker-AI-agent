# Definition of Done

Use this checklist proportional to task size. **Small tasks (bug fix, single file, minor change):** check only "All Tasks" + any directly relevant section. **API/backend tasks:** add the API section. **UI tasks:** add UI + Accessibility sections. **Full feature:** run all sections.

Do not run every item on every response — apply what's relevant. Skip a section explicitly rather than silently.

---

## All Tasks

- [ ] All spec acceptance criteria satisfied (each criterion verified, not assumed)
- [ ] No regressions: existing tests pass (or failures are pre-existing and documented)
- [ ] Build passes (compile/lint/typecheck — whichever apply)
- [ ] No TODOs left in changed files unless explicitly deferred below
- [ ] Suggestions & Improvements section from spec addressed or explicitly deferred with reason
- [ ] Changed files summarized in completion output

---

## Product & UX

- [ ] Happy path works end-to-end
- [ ] Loading, empty, error, and permission states implemented — not just happy path
- [ ] User-facing copy is actionable and meaningful (no "Error occurred", no raw exception text)
- [ ] Destructive actions have guard / confirmation / undo where appropriate
- [ ] Flow matches user goal — not just technically correct

---

## API / Backend Tasks

- [ ] Happy path tested: correct status code + response body schema asserted
- [ ] Edge cases tested (minimum 8 — drawn from the api-testing skill):
  - [ ] Invalid input → 400, error identifies bad field
  - [ ] Missing required fields → 400, error names missing field
  - [ ] Auth absent → 401
  - [ ] Auth present but insufficient permission → 403
  - [ ] Unexpected content-type → 400 or 415, not 500
  - [ ] Boundary values (min/max length, 0, negative, empty string)
  - [ ] Null / empty payload → meaningful error, not 500
  - [ ] Rate limit (if applicable) → 429 + Retry-After header
- [ ] Error handling on every code path (no unhandled exceptions reaching the client)
- [ ] Input validation at all trust boundaries (not just inside business logic)
- [ ] Auth enforced on every protected route (verified — not assumed from middleware)
- [ ] Logging present on critical paths (request received, error thrown, external call made)
- [ ] New env vars documented in `.env.example` with placeholder values and comments
- [ ] No secrets or credentials in changed files

---

## UI / Frontend Tasks

*(Apply only when a UI task was explicitly requested.)*

- [ ] Visual QA: rendered output matches design/spec intent
- [ ] Accessibility checked: keyboard navigable, ARIA roles correct, contrast passes
- [ ] Responsive tested: layout holds at mobile, tablet, and desktop breakpoints
- [ ] No console errors in the browser during normal use flows
- [ ] Reduced motion respected if animations added
- [ ] Text scaling does not break layout

---

## Accessibility & Locale

*(Apply when UI changes or i18n is in scope.)*

- [ ] All interactive elements keyboard-reachable and operable
- [ ] Focus visible on all interactive elements
- [ ] Screen-reader labels present (aria-label, aria-describedby, role)
- [ ] Color not used as sole signal for meaning
- [ ] No UI text hard-coded if project uses i18n
- [ ] Dates, numbers, and currency use locale-aware formatting

---

## Security & Privacy

- [ ] Input validated at all trust boundaries
- [ ] Authorization verified server-side on every protected route/action
- [ ] No secrets, credentials, or PII in source, logs, or API responses
- [ ] New dependencies audited (`npm audit` / `pip audit`)
- [ ] No PII sent to analytics, crash reporters, or AI APIs without stripping
- [ ] Any new data collected has an identified deletion/retention path

---

## Reliability

- [ ] All network calls have explicit timeouts
- [ ] Error states shown to user — no silent failures, no infinite spinners
- [ ] Retry logic present only on idempotent operations
- [ ] Offline or dependency-down behavior defined (graceful degradation or clear error)
- [ ] Race conditions in concurrent UI actions handled (debounce, cancel, disable-on-submit)

---

## Code Quality & Testing

- [ ] Lint passes
- [ ] Typecheck passes
- [ ] All existing tests pass
- [ ] Core business logic has at least one unit test
- [ ] Bug fixes include a regression test when feasible
- [ ] No dead code or unused imports introduced
- [ ] Code is testable by design (deps injected, pure functions extracted, no hidden globals)
- [ ] Independent review completed (`requesting-code-review`) — reviewer received only spec + diff, not implementer's chat. Result: PASS or all FAIL findings addressed.

---

## Performance & Observability

- [ ] No obvious performance regression (unbounded list, N+1 query, blocking main thread)
- [ ] AI/cloud API calls are not inside loops without caching or batching
- [ ] Error paths are logged with sufficient context to debug
- [ ] No sensitive data in logs
- [ ] Cost-bearing operations (AI calls, cloud storage writes) have a metric or log entry

---

## Data & Persistence

*(Apply when schema, migrations, or storage are touched.)*

- [ ] Migration is backward-compatible with currently deployed version
- [ ] No destructive migration (drop column, rename) without a multi-step deploy plan
- [ ] Critical writes use transactions or have a compensating action
- [ ] Cache invalidation strategy defined (not just "cache it")
- [ ] Any new storage key or table has a retention/deletion path

---

## Documentation & Delivery

- [ ] `README.md`, `AGENTS.md`, or `.env.example` updated if setup/env/API changed
- [ ] Migration or release notes written if schema or public behavior changed
- [ ] Final summary includes: files changed, tests run, risks, and follow-ups
- [ ] No deploy, push, merge, package publish, or destructive migration run without explicit user approval

---

## Multi-User Features

*(Apply only when `multi-user-production` skill was activated.)*

- [ ] Tenant isolation tested — one tenant cannot read or write another's data
- [ ] Authorization enforced server-side — not just hidden in UI
- [ ] Cross-tenant access explicitly rejected (test exists)
- [ ] Duplicate / concurrent requests do not create duplicate data
- [ ] Rate-limit behavior verified for auth endpoints and resource-intensive operations
- [ ] Backup and recovery path documented
- [ ] Capacity assumptions approved or explicitly marked `Status: Proposed, not approved`
- [ ] Permission matrix updated
- [ ] Audit log covers all sensitive actions
- [ ] No secrets or PII in logs
- [ ] Multi-user artifact docs not stale

---

## Requirement Traceability

*(Apply for any feature with defined acceptance criteria.)*

- [ ] Every acceptance criterion has a stable ID (e.g. AC-001)
- [ ] Each task references the AC(s) it satisfies
- [ ] Each AC maps to at least one test file or manual verification step
- [ ] `validation.md` contains an evidence table for all ACs

---

## Artifact Drift

*(Apply when code changes touch a surface listed in rules-architect/02.)*

- [ ] All related docs checked for staleness
- [ ] Any stale artifact updated or explicitly noted as out-of-scope with reason

---

## Execution Contract

- [ ] Definition of Ready was met before implementation started
- [ ] Applicability matrix was consulted — N/A items noted with reason
- [ ] Source-of-truth conflicts were surfaced, not silently resolved
- [ ] `.agent/state.json` updated (if project uses it)
- [ ] Platform test matrix checked for any cross-platform claim

---

## 95%+ Production-Ready Definition

Work is production-ready when **all applicable sections above are checked**, OR each unchecked item has an explicit deferral entry:

```
DEFERRED: [item] — reason: [why] — follow-up: [ticket/note]
```

Do not claim production-ready if: a critical acceptance criterion lacks evidence, tests fail without documented pre-existing cause, auth is unverified, env vars are undocumented, a destructive action was taken without explicit approval, or a required artifact is stale without a noted deferral.

See also: `rules/04-production-readiness-gate.md` for final status output format.
