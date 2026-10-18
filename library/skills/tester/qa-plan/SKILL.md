---
name: qa-plan
description: Build test requirements and a risk-prioritized test case table from the brief. Inspect the real UI. Do not write test code yet.
---

TRIGGER: feature spec or brief exists and is approved, ready to plan what to test before writing Playwright tests
OUTPUT: detailed — requirements file, test case table with risk tags, coverage rationale, clarification items
SKIP: bug fix that tester already has a failing test for — go directly to qa-run after the fix

---

# QA Plan

**Ask everything in one message** when receiving the brief (do not ask one by one): Which sprint? What are the unclear items from the brief — character limits, error copy, what happens on success, data that must exist beforehand, time rules, dependent features, risk if broken? If already answered this session, do not ask again.

---

## Step 1 — Risk-based triage (do this before writing any test cases)

Not all features have equal risk. Spend testing effort where failure hurts most.

Rate the feature's risk level:

**High risk** (test everything, add to @smoke):
- Handles money, subscriptions, or billing
- Controls access to other users' data
- Auth flows: login, logout, token expiry, role escalation
- Data writes that cannot be undone (delete, overwrite)
- External API integrations where failure blocks the user's core workflow

**Medium risk** (test happy path + main edge cases):
- Data display and filtering
- Form submissions with validation
- Status changes and state transitions
- Notifications, emails triggered by user action

**Low risk** (happy path only unless time permits):
- Static content display
- UI cosmetic changes
- Minor layout adjustments

Write the risk level and the primary reason before listing test cases.

---

## Step 2 — Inspect the real UI

1. Read `knowledge/<system>/<feature>.md` if it exists — reuse information already surveyed.
2. Open the real UI. Write:
   - Fields, buttons, labels exactly as they appear (copy the text, don't paraphrase)
   - Locators (priority: role > label > test-id)
   - What happens after each action (redirect, toast, modal, in-place update)
   - Brief deviates from UI: write it in Needs Clarification — do not conclude which side is right
3. Write observations immediately to `knowledge/<system>/<feature>.md` with today's date.

---

## Step 3 — Write requirements

Write `requirements/<system>/<feature>.md`. Unanswered items: write `UNCLEAR`. Do not fill in guessed values.

One screen or several linked screens. Web pages: write each URL. Desktop windows: write how to open the app — no URL.

---

## Step 4 — Test case table

Write `testcases/<system>/<feature>.md`. ID format `TC-<FEATURE>-001`. Issued IDs do not change and are not reused.

Required columns: `TC-ID` | `Title` | `Steps` | `Expected` | `Risk tag` | `Result` | `Notes`

- `Result` column starts as `Not run`
- `Risk tag`: `@smoke` (broken = product cannot be used immediately) or `@regression` (broken = degraded but workaround exists)

### Seven mandatory test groups

Cover all that apply. Groups that do not apply: write the reason.

**Group 1 — Main flow (@smoke)**
The user's primary job: start to finish, no errors. This is the minimal test that proves the feature works. Always exists.

**Group 2 — Missing required fields**
For each required field: submit with it empty. Expected: field-level error message appears (not just form-level). Error copy must be real text from the spec, not "Error".

**Group 3 — Wrong format / boundary values**
For text fields: too short, too long (at the character limit, and one over). For numbers: at min, at max, one below min, one above max. For emails/URLs: invalid format. For dates: past dates, future dates if restricted.

**Group 4 — Auth and access control** (always include if feature has any auth)
- Access without being logged in: should redirect to login or return 401
- Access with a valid session but as the wrong user (if resource is user-owned): should return 404 or 403 — not the other user's data
- Access with expired token: should redirect to login
- If roles exist: try accessing as a role that should NOT have access

**Group 5 — Special states**
- Empty state: what does the feature show when there is no data yet?
- Loading state: does the UI show loading feedback while async operations run?
- Concurrent actions: what happens if the user clicks the submit button twice quickly?
- Session expiry mid-flow: what happens if the token expires between page load and form submit?

**Group 6 — Network / service error** (only when the UI shows this)
- API returns 500: does the UI show an error message (not a blank screen or spinner stuck)?
- API returns 429 (rate limited): does the UI notify the user?
- Network timeout: does the UI recover gracefully?

**Group 7 — Access permissions / data isolation**
Already covered in Group 4, but add these for multi-tenant or multi-role features:
- Can user A see user B's data by modifying the URL or request?
- Can a lower-role user perform a higher-role action by modifying the request?

---

## Step 5 — Coverage summary

After writing the table, write a short summary:

```
Total: [N] cases
@smoke: [N] (these must pass before any release)
@regression: [N]
High-risk groups covered: [list]
Skipped groups: [group — reason]
Suggested additions (outside spec): [TC-IDs tagged [suggested]]
```

---

## Step 6 — Self-check

Before reporting:
- Every row in `Steps` column is non-empty, including ❌ cases
- Every row in `Expected` column has the exact expected text or behavior — not "error shows"
- @smoke cases would, if failing, prevent a user from completing the main flow
- Auth test cases exist if the feature has any user-specific data

---

## Next step

Table not approved by tester lead or CEO: do not write tests yet.

When approved:
- Web pages → `qa-write`
- Desktop windows → `qa-desktop`
- Desktop does not call `qa-figma`

End with total case count, @smoke count, @regression count, cases from brief, cases suggested. End with one next step.
