---
name: customer-retention
description: Audit customer onboarding friction and churn signals. Convert user feedback into product priorities.
---

TRIGGER: first 10 customers onboarded, a customer cancels or stops usage, or recurring feedback pattern observed
OUTPUT: detailed — customer-retention.md with friction points, churn risk rating, and routed product improvements
SKIP: pre-launch products; general bug reports (use customer-issue instead)

---

# Customer Retention & Onboarding

Monitor product adoption, early churn signs, and feed customer reality back to CEO and Analyst. Adapted from `agency-agents/support` and customer success methodology.

## Input

Read before starting:
- `idea-fit.md` — target user job-to-be-done and expected value
- Existing `faq.md` and `support-issue.md` files
- Customer interview notes, onboarding tickets, or cancellation remarks

---

## Step 1 — Onboarding Health Check

Evaluate user path from signup to "first value" (Aha moment):

1. **Time-to-Value (TTV)**: Did user reach primary outcome within 5 minutes of first run?
2. **Setup Friction**: Where did user stop, hesitate, or ask support during initial setup?
3. **Usage Velocity**: Did user return within 48 hours for a second action?

---

## Step 2 — Churn Risk Classification

Classify risk level for affected user or cohort:

- **HIGH (Immediate Churn)**: Paid user stopped active usage > 7 days or expressed cancellation intent. Root cause: promised outcome not delivered, or fatal workflow blocker.
- **MEDIUM (At Risk)**: User active but repeated errors/confusion encountered. Value perceived but friction high.
- **LOW (Healthy)**: Active regular usage, minor feature inquiry or polishing request.

---

## Step 3 — Feedback Loop Routing

Do not leave feedback in support silo:

1. **Product flaw / Missing step**: Route concrete improvement to `analyst` to re-evaluate `idea-fit` / product scope.
2. **Documentation gap**: Call `user-faq` to immediately add clarity.
3. **Pricing / Value mismatch**: Route to `ceo` and `sales` if price does not match realized value.

---

## Write

Write `../shared/01_Projects/<domain>/<project-name>/customer-retention.md`.

Format:
- `## Vietnamese` findings and recommended actions
- `## English` findings and recommended actions

End with one next step.
