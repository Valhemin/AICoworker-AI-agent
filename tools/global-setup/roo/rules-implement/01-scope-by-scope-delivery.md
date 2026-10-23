# Implement Pro Scope-by-Scope Delivery

## Reusability & Scalability — Highest Priority

Apply before writing any code. These decisions are expensive to undo later.

### Assess Reuse Before Designing

Before implementing, scan the codebase and assess internally (do not ask the user):
- Does similar logic already exist? → reuse or extend it, don't duplicate.
- Is this a domain concept (user, payment, notification, session)? → belongs in a shared service/module, not inlined in a feature.
- Does this UI pattern appear elsewhere in the app? → extract to shared component, apply everywhere.

If any answer is yes → design for reuse before writing the first line. This is architecture work, not feature work — get it right here.

### Component & Module Design

- **Single responsibility:** one component/module does one thing. A `<UserCard>` renders a user. It does not fetch, does not format dates, does not know about routing.
- **Props over hardcoding:** any value that could differ across usages becomes a prop/param. Never hardcode text, colors, sizes, or behavior that callers might need to vary.
- **Composition over configuration:** prefer small composable pieces over one large configurable component with 20 props. A `<Card>`, `<CardHeader>`, `<CardBody>` composes better than `<Card showHeader showAvatar avatarSize="lg" titleColor="...">`.
- **Colocate what changes together:** files that always change together belong together. Don't split a feature across 5 directories because of a strict layer rule — split by feature first.
- **Extract at second use:** first use = inline. Second use = extract. Don't prematurely abstract, don't wait until the third copy exists.

### Scalability Decisions

Make these decisions at implementation time — retrofitting is 10× more expensive:

| Decision | Rule |
|---|---|
| Data fetching | Use a dedicated data/cache layer from the start — never fetch directly in UI component lifecycle. |
| List rendering | Always paginate or virtualize large lists. No unbounded queries that return all records. |
| Auth | Centralize auth check in one middleware/guard — never scatter auth logic across routes or components. |
| Config / feature flags | Never hardcode environment-specific values. Use env vars + config module. |
| API client | One shared client instance with interceptors (auth header, error handling, retry) — never call the network directly from UI. |
| Error boundaries | Isolate failure at feature level — one broken module should not crash the whole app. |
| Events / side effects | Use event bus or pub/sub for cross-feature side effects — never direct coupling between unrelated modules. |
| Database queries | Write queries extensible with filters, pagination, and sorting from the start. A query returning all records will need rewriting the moment the table grows. |

### Avoid These Scale-Killers

- **God components:** a component > 200 lines that does fetching + logic + rendering → split immediately.
- **Prop drilling > 2 levels:** pass via context, store, or composition — not through 3 layers of intermediaries.
- **Direct DB/API calls in UI components:** always go through a service/repository layer.
- **Hardcoded IDs or magic strings:** use enums, constants, or config. `STATUS.ACTIVE` not `'active'`.
- **Shared mutable global state:** global variables that multiple modules write to = race conditions and impossible-to-trace bugs at scale.
- **N+1 queries:** fetching a list then fetching details for each item in a loop. Batch or join at DB level.
- **Inline styles / one-off CSS:** use design tokens and utility classes. One-off values drift into inconsistency.

### Architecture Gut-Check (run before starting)

Answer these before writing code on any non-trivial feature:

1. If this feature grows 10×, does the data layer still work? (pagination, indexing, caching)
2. If another team adds a similar feature tomorrow, can they reuse what I'm building?
3. If this component is used on 5 different pages, does it still make sense as-is?
4. Is there a hard dependency between this module and another that will make testing painful?
5. Is any business logic leaking into the UI layer?

If any answer is "no" or "unclear" → fix the design before implementing.

## Production-Ready Mandate

**Default target: production-ready (95%+).** Run every task in the spec to completion before stopping. Do not stop after a single scope, a single file, or a "working prototype" unless the user explicitly says to stop or a genuine blocker exists.

A genuine blocker is one of: missing credentials/access, missing information only the user can provide, tool/environment failure, or the user interrupting. Difficulty, uncertainty, or "this part is complex" are NOT blockers — push through.

## Implementation Loop

Use the `executing-plans-batched` skill. **Never stop mid-implementation to ask permission to continue.** Finish, then report. If blocked, report the blocker with full state.

## User-Facing Content

UI text, labels, messages, tooltips, empty states, and error messages are product copy — not code comments. Apply these rules everywhere text appears in the UI:

- **Write for the user, not the dev.** Never expose internal logic, system state, or technical reasons as UI text. Bad: "AI Provider not configured, stopping to avoid quota cost." Good: "Add an API key to get started."
- **Every message must answer one of:** What happened? What can the user do next? Why does this matter to them?
- **Error messages:** user-friendly description + actionable next step. Never raw exception text.
- **Empty states:** explain what goes here + how to populate it. Not just "No data."
- **Loading states:** describe what's happening in user terms. Not "Processing..." — "Finding matching videos..."

### UI Content Standard

**Any time you write, change, or touch UI text — ask: would a real user find this clear, helpful, and fitting for this product?** This applies regardless of what triggered the change (audit, mockup removal, feature implementation, bug fix, anything).

Every visible string must meet all three bars:
- **User-appropriate:** written for the end user of this product, not for a developer. No jargon, no raw DB values, no internal state, no technical reasons.
- **Helpful:** tells the user what they need to know or do. Empty states explain what goes here and how to get started. Errors give a next step. CTAs describe the action, not just "OK" or "Submit".
- **Fitting for the product:** tone, language, and specificity match the project domain and audience. Placeholder copy during implementation must use realistic, domain-appropriate content — not "Lorem ipsum", "Test", "Item 1", or generic text in the wrong language.

If real data for a slot doesn't exist yet → render a proper empty state, not a blank or a raw field value. If a DB field maps to UI text → translate it to a human label before rendering. If a string would embarrass the product if a user saw it → fix it before the task is done.

**Additional content rules:**

- **Microcopy matters:** form labels, placeholders, tooltips, hint text must be written for users — not "Enter value", "Select option", "Input text". Describe what to enter and why: "Display name shown to customers", "Choose the most relevant category".
- **Terminology consistency:** use one term for one concept throughout the UI. Don't mix "order" / "transaction" / "purchase" for the same entity. If the project has established terms, reuse them — don't invent synonyms.
- **Content hierarchy:** headlines carry the main message, subtext supports it. They should not be equal weight or say the same thing twice. Headline = what it is or does. Subtext = why it matters or what to do next.
- **Don't invent feature copy:** if the product's value proposition, feature description, or marketing angle is unclear, ask — don't fill it with generic copy ("Powerful tool for your needs", "Manage everything in one place"). Generic copy is worse than a placeholder because it ships.

## UX Complexity Principle

Default flow must work with zero configuration. Advanced/technical settings belong in a separate layer:

- **Happy path first:** core features must work out-of-the-box with sensible defaults
- **Progressive disclosure:** hide advanced config (API keys, rate limits, technical toggles) behind "Advanced settings" or a gear icon — not in the main flow
- **Never block the main flow** with setup steps that most users don't need
- When implementing a feature: ask "can a first-time user complete this without reading docs?" If no, simplify the default path or add a setup wizard
- **Complex features need inline guidance:** if a feature requires non-obvious input or configuration, add a short description, placeholder text, or tooltip explaining what to do — don't assume the user knows

## UI/UX Consistency

Same feature = same patterns. When a feature has multiple tabs, panels, or sections:

- **Consistent interaction placement:** same action (expand, delete, save, filter) must appear in the same position across all tabs. Never expand-button-top in tab 1 and expand-button-bottom in tab 2.
- **Consistent behavior:** same interaction must produce the same type of result. If tab 1 shows a confirmation dialog before delete, tab 2 must too.
- **Consistent visual hierarchy:** headings, spacing, button styles, icon usage must follow the same pattern across sibling tabs/panels.
- **When you implement a UI pattern in one place, scan for sibling components and apply the same pattern there immediately** — don't leave inconsistencies for later.

## Library-First for Non-Trivial Problems

Before implementing custom logic for non-trivial problems, search for existing open-source solutions:

- **When to search:** parsing, validation, date/time, auth flows, file processing, chart/viz, rich text, drag-and-drop, state machines, animations, data tables, PDF/export, API clients
- **Search via:** Context7 (library docs), web search (current alternatives, bundle size, maintenance status)
- **Evaluate before installing:**
  - Actively maintained? (last commit, open issues, stars)
  - Bundle size acceptable?
  - License compatible?
  - Does it actually solve the problem, or just adjacent?
  - Simpler than writing it ourselves for this scope?
- **If worth installing:** add it, include a brief justification in the implementation output (for developer review/approval) — do not add inline code comments or ADR unless asked
- **If not worth installing:** implement minimal custom solution — not a full reimplementation of the library

Never build from scratch what a well-maintained library handles better. Never install a library without evaluating it first.

## Implementation Confidence Gate

Before implementing, assess feasibility:

- **Confident** → implement directly
- **Uncertain** (undocumented API, unclear limits, conflicting research) → implement the best-available approach, **warn once** with: what's unknown, what could break, what to watch in production. Don't stop — ship with a clear caveat.
- **Hard blocker** (missing credentials only user can provide, tool failure, user interrupt) → stop and report. These are the only valid reasons to halt.

## Validation at the Right Layer

Single source of truth for validation — never duplicate logic across layers:

- **Define once, reuse everywhere:** use a schema library (Zod, Yup, Pydantic, Joi) at the data boundary. The same schema validates API input, populates form errors, and types the response. Never write the same rule twice in different files.
- **Where validation lives:**
  - API/backend: validate every incoming request body, query param, and header at the route layer — before it touches business logic.
  - Frontend form: reuse the same schema (or a shared subset) — never write separate frontend validation rules that can drift from backend.
  - Database: constraints (NOT NULL, UNIQUE, FK) are the last line of defense — not the primary. Don't rely on DB to catch what should be caught earlier.
- **Never validate in UI components.** Validation logic belongs in schemas, hooks, or service layers — not in individual UI components.
- **Type-safety from schema:** generate TypeScript types from Zod/Pydantic schemas — don't hand-write parallel type definitions that can drift.

## State Management Discipline

Choose the right state layer — never reach for global state by default:

- **Local UI state** (modal open, tab, input draft) → component-local state
- **Server/async state** (fetched data, loading, cache) → dedicated data/cache layer. Never fetch directly in UI component lifecycle + local state.
- **Shared client state** (auth user, theme) → minimal global store
- **URL state** (filters, pagination, selected ID) → router/search params — for shareable/bookmarkable views
- **Form state** → form library or controlled state — not ad-hoc `onChange` handlers

Rules:
- Don't duplicate server state in a global store — cache layer already handles it.
- Don't lift state higher than needed — if only one component needs it, keep it local.
- Derived state is not state — compute it, don't store it.

## Race Conditions & Stale Data

Handle concurrency — these are silent production bugs:

- **Debounce + cancel:** search inputs must debounce (200–300ms) AND cancel the previous in-flight request. Without cancellation, a slow request can overwrite a fast one.
- **Stale closures in async callbacks:** if a callback captures state/props at creation time, it may act on outdated values by the time it runs. Use refs for values that async ops need to read at call time, not capture time.
- **Optimistic updates need rollback:** when doing optimistic UI — always implement the rollback path. `onMutate` → `onError` → revert. Half-implemented optimistic updates cause phantom data.
- **Double-submit prevention:** disable submit button / set loading state after first click. Never rely on the user not clicking twice.
- **Concurrent navigation:** if a user navigates away while a fetch is in flight, cancel it. Avoid setState-on-unmounted-component warnings — and actual bugs where stale results land in the wrong view.
- **Last-write-wins for multi-tab:** if the app can be open in multiple tabs, use `localStorage` events or server timestamps to detect conflicts on shared data.

## Logging & Observability

Every error path needs a trace — silent failures are undebuggable in production:

- **Log at error paths, not happy paths.** Don't log every request — log when something goes wrong, and log enough context to reproduce it.
- **Structured logs:** use `{ level, message, context }` format — not free-form strings. Structured logs are queryable; strings are not.
  ```js
  logger.error('payment_failed', { userId, orderId, errorCode, provider })
  // not: console.log('payment failed for user ' + userId)
  ```
- **Never log sensitive data:** no passwords, tokens, credit card numbers, full PII (email, phone, national ID). Log IDs and error codes only.
- **Log at the right level:**
  - `error`: something failed that needs attention
  - `warn`: degraded behavior, recoverable
  - `info`: key business events (user signed up, order placed)
  - `debug`: development detail — disabled in production
- **Frontend errors:** wire a crash reporter (Sentry, Bugsnag, or equivalent) at the error boundary level. Never let uncaught errors vanish silently.
- **Correlation ID:** for any request that spans multiple services or async steps, pass a `requestId` / `traceId` through the chain so logs can be joined.

## Dependency Management

Don't introduce hidden time bombs:

- **Pin versions in production projects:** use exact versions (`"1.2.3"`) not ranges (`"^1.2.3"`) for direct dependencies in apps (not libraries). Ranges mean tomorrow's CI can break with no code change.
- **Check breaking changes before upgrading:** read the changelog. A major version bump (`1.x` → `2.x`) always requires verification. Don't `npm update` blindly.
- **One install per task:** add only what the current task needs. Don't install speculative dependencies "we might use later."
- **License check:** before adding any dependency, confirm the license is compatible with the project (MIT/Apache = generally fine; GPL = check with user).
- **Audit on add:** after installing a new package, run `npm audit` or `pip audit`. Flag any HIGH/CRITICAL findings — don't silently continue.
- **No `latest` tag in package.json** — always resolve to a specific version at install time.

## Release & Deployment Readiness

"Works locally" is not "ready to deploy." Before claiming a feature complete, verify these deployment concerns:

- **Env config:** every new env var must be added to `.env.example` with a placeholder and comment. Never hardcode a value that differs between environments.
- **Feature flags:** features that are risky, partial, or targeting a subset of users must be behind a flag — not a code comment or a TODO. Flag off = safe to deploy without user impact.
- **Migration safety:** any DB migration must be backward-compatible with the currently deployed version during a rolling deploy. Additive changes (new column with default, new table) are safe. Destructive changes (drop column, rename) need a multi-step deploy plan.
- **Rollback plan:** for any migration or config change — state how to undo it. "Drop the table" is not a rollback plan if it destroys user data.
- **Health/readiness check:** if a new service or background job is added, there must be a way to verify it is running (`/health`, log output, metric). An invisible service is an unmonitorable service.
- **No hardcoded environment values in code:** `process.env.NODE_ENV === 'production'` guards are acceptable; hardcoded prod URLs, IDs, or API keys are not.
- **Secret hygiene:** confirm no new secrets appear in source, config files, or build artifacts. All secrets via env vars or secret manager only.
- **Build artifact size:** if a frontend build is involved, confirm the bundle size didn't grow unexpectedly. Large jumps (>20%) need explanation.

When a task adds a new external service, migration, or env var — include the deployment notes explicitly in the completion output, not just the code diff.

**Never do these without explicit user approval — even if technically possible:**
- Deploy to production
- Merge a protected branch
- Publish a package to npm/PyPI/any registry
- Submit a mobile app build to App Store or Play Store
- Run a destructive production migration (drop table, truncate, irreversible data transform)

These require a clear "go ahead" in the current session, scoped to the specific action. A prior approval does not extend to future sessions or similar-but-different actions.

## Environment Strategy

Projects must distinguish environments explicitly. Never bleed one environment's config, credentials, or data into another.

**Required environments for any non-trivial project:**

| Env | Purpose | Rule |
|---|---|---|
| `local` | Developer machine | Must work offline; never uses production credentials |
| `test` | Automated test runs (CI) | Isolated DB/storage; seeded, deterministic, disposable |
| `preview` | Per-PR or per-branch preview deploys | Uses sandbox/mock services; safe to share externally |
| `staging` | Pre-production validation | Production-parity config; real infrastructure, fake data |
| `production` | Live users | Only reaches this via the release gate |

**Rules:**
- Production credentials must never appear in local or test environments — not even in comments or `.env.example`.
- Every environment variable must be documented in `.env.example` with its purpose and where to get the value.
- Feature flags must have a named owner and a cleanup date. Flags are tech debt after 90 days without review.
- Seed data must be safe (no real PII), reproducible, and idempotent (`seed.ts` that can be run multiple times safely).
- Test and preview must use sandbox/mock services for any paid or side-effectful third-party (email, SMS, payments, AI APIs).
- Staging must maintain production parity at the infrastructure level — different data is fine, different architecture is not.

If a project has fewer environments, state which are merged and why (e.g. "preview = staging for this project because deploys are manual"). Don't silently omit.

## Data & Persistence Discipline

Apply when touching database schema, migrations, local storage, cache, or any persistent state.

- **Migration must be backward-compatible** with the currently deployed version during rolling deploys. Additive changes (new column with default, new table) are safe. Destructive changes (drop column, rename, change type) need a multi-step deploy plan.
- **Never drop or truncate data** in a migration without explicit user confirmation and a backup plan. State this as a blocker, not a note.
- **Critical writes need transactions** or a compensating action. A write that partially succeeds and partially fails silently corrupts data.
- **Cache requires an invalidation strategy.** Before caching anything, answer: when does this become stale? How is it evicted? A cache without invalidation is a hidden consistency bug.
- **Every new table or storage key needs a retention path.** How does data get deleted? User-triggered, TTL, admin action? No answer = no-go.
- **Seed and test data must be isolated** from production data paths. Test fixtures that write to the same tables as production are a data corruption risk.
- **Schema changes must be idempotent** where possible (`CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`). Migrations that fail halfway and cannot be re-run safely are operationally dangerous.
- **Database backup is required for any production backend.** Default: automated backup every 4 hours, retain 15 days. Implement with the platform's native scheduler (pg_dump + cron, cloud managed backup, or equivalent). Backup files must be stored outside the primary database host. Before implementing, confirm: backup schedule, retention window, storage path, and restore procedure. If the platform provides managed backup (e.g. RDS automated backups, Supabase PITR), document that it is enabled and configured — do not skip because it "sounds built-in."

## Documentation & Developer Experience

Documentation that lives only in chat is lost. Apply when setup, env, API, or public behavior changes.

- **`.env.example` must be updated** whenever a new environment variable is added — with a placeholder value and a comment explaining what it's for and where to get it.
- **`README.md` or `AGENTS.md` must be updated** if: setup steps change, a new service dependency is added, a new CLI command is introduced, or the architecture changes significantly.
- **API or component contract changes** must be reflected in existing docs (OpenAPI spec, JSDoc, prop types, `docs/api/`) — not just in the code.
- **One-command setup must continue to work** after the change. If it breaks, fix it in the same diff.
- **Never leave a workflow or process that only exists in chat.** If it needs to run again, it needs to be in a file.

## Anti-Deferral Rule

Never return empty-handed. Attempt before escalating. If something cannot be completed, still deliver everything that can be — then report state.

## Partial Completion Protocol

When blocked mid-task, output ALL of:
- Completed: list of scopes/files done with verification status
- Blocked: exact task that failed, the error or missing input verbatim
- Attempted: what was tried to unblock
- Next action: the single most useful next step the user or a follow-up agent can take

## Completion Output Format

At task end (done or blocked), output:
- What was implemented (files changed, behavior added)
- Verification run: command and result (pass / partial / fail with details)
- Known gaps or risks
- Follow-up items if any

Before declaring complete, verify against `rules/05-definition-of-done.md` checklist. Every unchecked item must be explicitly deferred with reason.
