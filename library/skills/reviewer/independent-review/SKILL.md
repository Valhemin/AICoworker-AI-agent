---
name: independent-review
description: Review a code slice against its spec and catch real bugs — auth, ownership, data access, error handling, secrets, test coverage — before tester runs.
---

TRIGGER: implement has finished a code slice and it needs review before tester runs
OUTPUT: detailed — review.md listing every real finding with file + evidence, or explicit PASS if none found
SKIP: bug fixes that tester already pinpointed — those go to debug directly

---

# Independent Review

**Critical rule**: Do not use the implementer's own self-review as evidence of correctness. Read the code independently. Read only: the spec, the changed files, and their tests.

---

## Preparation

1. List every changed file from the implementer's report.
2. Read the spec (requirements or task description) — not the implementer's summary of it.
3. Read the changed files directly. Do not accept "I added auth" as evidence — find the auth check in the code.

---

## Review checklist

Work through every section. Skip a section only if it provably does not apply — write the skip reason.

If the slice changes auth, input, sessions, files, payments, or a public web response, also apply `web-security-assurance`. A missing CRITICAL or HIGH control is FAIL.

If the slice is a website or desktop app that collects personal data or sells to consumers, also apply `product-legal-compliance`. A missing in-product page or function is FAIL. A missing OWNER ACTION filing is a note, not a FAIL, unless the spec said the filing was already done and the UI fakes a government badge.

If personal data is stored, also apply `consent-and-erasure`. FAIL when a purpose has no stored row, an optional purpose is pre-ticked, export omits data the product stores, or delete only hides the UI or only clears the device.

### 1. Spec compliance

- Does the code do exactly what the spec requires — no more, no less?
- Extra features not in spec → **FAIL** (scope creep introduces untested risk)
- Missing features from spec → **FAIL**
- Acceptance criteria: check each one — is it actually implemented, or just implied?

### 2. Authentication and authorization (highest risk)

Look at every entry point (route handler, IPC handler, API function) that the changed code exposes:

**Auth presence**:
- Is there a `requireAuth` middleware / `Depends(get_current_user)` / `requireAuth` guard before business logic runs?
- Is it possible to reach the business logic without a valid session? (Check middleware order — auth must come before route logic, not after)
- Token/session expiry: is it validated, or only presence checked?

**Ownership enforcement**:
- Every query that retrieves user data: does it scope to the current user's ID?
- Pattern to flag: `findById(input.id)` without also filtering by `userId` or `ownerId`
- Pattern to flag: admin check that can be bypassed by passing a different user ID in the body

```
// RED FLAG — anyone authenticated can read any order
const order = await db.orders.findById(req.body.orderId)

// CORRECT — scoped to the authenticated user
const order = await db.orders.findFirst({ where: { id: req.body.orderId, userId: req.user.id } })
```

**Role checks**:
- If the spec requires a role (admin, owner, verified user): is it enforced in code, or assumed?
- Role checks in UI only (not server-side) → **FAIL**

### 3. Input validation

- Is there Zod / Pydantic / equivalent validation at every entry point?
- Is `.safeParse()` / `safeParse` used with error handling, or `.parse()` which throws uncaught?
- Are all fields validated — including optional fields that become non-optional in certain states?
- Is there a size/length limit on text and file inputs? (Missing limit = DoS vector)
- URL parameters (path params, query params): are they validated before use?

### 4. Data access and queries

**N+1 detection** — the most common performance bug:

```
// RED FLAG — query inside a loop
const orders = await getOrders()
for (const order of orders) {
  order.user = await getUser(order.userId)  // N queries for N orders
}

// CORRECT — one query with join or include
const orders = await db.orders.findMany({ include: { user: true } })
```

Look for: `await` inside `for`, `forEach`, `map` with async callbacks.

**SQL injection** (raw queries only):

```
// RED FLAG — string concatenation
db.query(`SELECT * FROM users WHERE name = '${input.name}'`)

// CORRECT — parameterized
db.query('SELECT * FROM users WHERE name = $1', [input.name])
```

**Soft delete**: if the spec requires data to be deletable but recoverable, is `deletedAt` set rather than a hard delete?

**Transaction completeness**: if multiple writes must succeed together, are they wrapped in a transaction? Missing transaction = partial-write bug under failure.

### 5. Error handling

- Is there a named error class for every failure mode (NotFoundError, ValidationError, UnauthorizedError)?
- Is there a single error-handler middleware / exception handler that maps these to HTTP status codes?
- Does any route handler return a raw `Error` object or stack trace in the response body?
- Does the code catch errors from external services and wrap them in a named class?
- Are errors logged with a correlation/request ID?

```
// RED FLAG — raw error in response
res.status(500).json({ error: err.message, stack: err.stack })

// RED FLAG — silent swallow
try { await riskyOp() } catch (e) {}

// CORRECT — named error, logged, mapped
try {
  await riskyOp()
} catch (err) {
  logger.error({ requestId, err }, 'risky-op.failed')
  throw new ExternalServiceError('risky-op', err)
}
```

### 6. Secrets and credentials

Check every changed file for:
- Hardcoded API keys, tokens, passwords, connection strings → **FAIL**
- `process.env.SECRET` read directly in a non-config file → flag (should go through `config.ts`)
- Any secret printed in a log line → **FAIL**
- In Electron: credentials in `electron-store` or `localStorage` → **FAIL** (must use keychain)

### 7. Electron-specific (only if Electron files changed)

- `nodeIntegration: false` and `contextIsolation: true` in every `new BrowserWindow()` → if either is missing or `true`/`false` is wrong → **FAIL**
- `preload.ts`: does `contextBridge.exposeInMainWorld` expose only specific typed functions? If it exposes the full `ipcRenderer` object → **FAIL**
- IPC handlers in main: do they return `{ ok: true/false, ... }` never throw? Throwing causes untyped rejection in renderer → **FAIL**
- Asset paths: are they using `app.getAppPath()` or `app.getPath()` — not raw `__dirname` for paths that must survive packaging?

### 8. Next.js / Server Actions (only if Next.js files changed)

- Server Actions: is `const session = await auth(); if (!session) redirect('/login')` the FIRST thing in every mutation?
- Client components with `'use client'`: do they access any env var without `NEXT_PUBLIC_` prefix? This will silently be `undefined` in the browser → **FAIL**
- Route Handlers: is `dynamic = 'force-dynamic'` set where the response must not be cached?
- After a mutation: is `revalidatePath` or `revalidateTag` called? Missing → stale data shown to user

### 9. Test coverage

- Is there at least one test for the primary changed behavior?
- Are there tests for the auth failure case (401) and the ownership failure case (403 or 404)?
- Are there tests for the input validation failure case (400 with field-level error)?
- Tests that mock the thing being tested (mocking the service itself in a service test) → **FAIL**
- Tests that use `test.only` or `.skip` without a reason → flag

### 10. API contract (if spec defines one)

- Does the response shape match the spec? Extra fields in response = usually OK; missing required fields = **FAIL**
- Does the HTTP status code match what the spec says?
- Are error response shapes consistent with the rest of the API (`{ code, message }` format)?

---

## Result format

Write `docs/review/review.md` in the reviewed repo.

**If issues found:**

```markdown
# Review — [feature name] — FAIL

## Findings

### [Section name] — [FAIL / RISK]
File: `path/to/file.ts`, line ~N
Issue: [What is wrong]
Evidence: [Quote the actual code]
Required fix: [What must change]

### [Next finding]
...

## Next step
`implement` must fix the items marked FAIL before this feature can proceed to tester.
After fixes: re-review the changed sections only.
```

**If no issues found:**

```markdown
# Review — [feature name] — PASS

All sections reviewed. No issues found.

Sections skipped: [section name — reason it doesn't apply]

## Next step
`tester` may proceed.
```

---

## Escalation

- First review: FAIL → implement fixes exactly the listed items
- Second review: FAIL on same items → write `../shared/05_Approvals/Pending/BLOCKED-<feature>.md` (5 lines: feature, issue, what was tried, risk if shipped, decision needed) and stop
- PASS → next step is tester

Do not edit product code. Do not adjust tests to make them pass.
