---
name: billing-bookkeeping
description: Track client deal billing milestones, payment statuses (Unpaid/Paid), and reconcile project deliverable costs.
---

TRIGGER: a client deal is won, milestone payment is due, or monthly project billing reconciliation is requested
OUTPUT: detailed — billing-tracker.md with payment milestone schedule, invoice draft data, and collection status
SKIP: pre-deal sales discussions (use sales-context instead); free/internal projects

---

# Billing & Bookkeeping

Track customer billing milestones, payment verification, and cost reconciliation. Adapted from `agency-agents/finance` bookkeeping methodology.

## Input

Read before starting:
- `../shared/01_Projects/<domain>/<project-name>/deal-brief.md` or customer agreement
- Committed deliverables and milestone payment schedule

---

## Step 1 — Milestone Billing Schedule

Document contract milestones:
1. **Deposit / Upfront**: Percentage (e.g. 30–50%) required before project kickoff.
2. **Delivery / Acceptance**: Payment upon tester PASS and customer sign-off.
3. **Maintenance / Retainer**: Monthly recurring payment date and grace period.

---

## Step 2 — Invoice Draft Preparation

Prepare data for invoice generation (stops before sending):
- Client entity name, tax code/address, contact email.
- Deliverable description, quantity, agreed unit price (VND or USD).
- Bank transfer instructions and payment deadline (Net 7 / Net 15).

---

## Step 3 — Reconciliation & Accounts Receivable Aging

Classify payment state:
- `PAID`: Funds confirmed received.
- `DUE`: Milestone achieved, invoice sent, within payment term.
- `OVERDUE`: Past payment deadline. Flag to `sales` or `ceo` for collection follow-up.

---

## Write

Write `../shared/01_Projects/<domain>/<project-name>/billing-tracker.md`.

Format:
- `## Vietnamese` billing log and invoice details
- `## English` billing log and invoice details

End with one next step.
