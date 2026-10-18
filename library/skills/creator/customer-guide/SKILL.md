---
name: customer-guide
description: Write a getting-started guide that takes a new customer from zero to their first meaningful outcome in one session. CEO gate requires bilingual Vietnamese and English.
---

TRIGGER: product has launched or is about to launch, new customer needs to know how to start
OUTPUT: detailed — docs/launch/customer-guide.md, bilingual, covers primary job end-to-end with one common error and recovery
SKIP: internal documentation, API reference, or technical specs — those are not customer guides

---

# Customer Guide

**Core principle**: A good getting-started guide has one job — get the customer to their first real outcome as fast as possible. Not a feature tour. Not a manual. One path, one outcome.

---

## Before writing

Read:
- `idea-fit.md` — what is the primary job the customer hired this product to do?
- `docs/design/interface.md` if it exists — actual UI states and labels
- `docs/launch/` — any existing guide to update rather than rewrite from scratch

Identify:
1. The **primary job** — what does a successful first session look like? (e.g., "sent their first invoice", "recorded their first expense", "published their first post")
2. The **minimum required state** — what must be true before they can do step 1? (account created, a specific setting enabled, data uploaded)
3. The **most common blocker** — what gets in the way for most users before they finish?

---

## Writing principles

**Show the outcome in the first 2 lines.** The customer should know what they'll be able to do by the end before they read step 1.

**Each step = one action + what they see + what they now have.**
- ❌ Weak: "Click the Settings button."
- ✅ Strong: "Click **Settings** (top right) → **Integrations** → paste your API key → click **Save**. You'll see a green ✓ confirming the connection."

**Use the exact label from the UI.** Bold it. Don't paraphrase button names or menu items.

**Maximum 5 steps for the primary path.** If the primary job requires more than 5 steps to explain, the product has an onboarding problem — flag it but write the guide anyway.

**One common error, written as it actually appears.** Not "if you see an error" — write the exact error message or symptom, then the fix.

**No features not needed for the primary job.** The guide is not a feature tour. Features the customer doesn't need today go in a separate advanced section (optional, labeled clearly).

---

## Structure

```markdown
# Getting Started with [Product Name]

**What you'll be able to do after this guide:** [one sentence — the primary outcome]
**Time required:** [honest estimate — 5 minutes, 10 minutes]
**What you need before you start:** [minimum requirements — account, data, setting]

---

## Step 1 — [Action verb + what they're doing]

[One paragraph max: what to click, what to fill in, what they see when done]

Screenshot or description of the success state: [what it looks like when this step is complete]

---

## Step 2 — ...

[Repeat for each step]

---

## Step [N] — [The outcome step]

[This is the payoff step — they've now completed the primary job. Name it clearly.]

✓ **You're done.** You've just [primary outcome in specific terms].

---

## If something goes wrong

**[Exact error message or symptom as it appears]**
This happens when [cause]. Fix: [specific action]. If it still shows: [escalation path — link, contact, or setting].

---

## What to do next (optional)

[2–3 brief suggestions for users who want to go deeper. Not required for the guide to be complete.]
```

---

## `ceo` gate — bilingual requirement

Write `## Vietnamese` section first, then `## English` section with the exact same steps. UI labels that only exist in one language: use the actual label from the interface (don't translate it).

For Vietnamese version:
- Write conversationally — "Bạn click vào..." not formal "Người dùng nhấn vào..."
- Keep step numbers matching between versions
- Common error section: write the error message as it appears in the product (may be in English even for Vietnamese users)

---

## Quality check before writing complete

- [ ] Primary outcome is stated in the first 2 lines
- [ ] Every step has: action + label + success state
- [ ] UI labels are exact (bolded)
- [ ] Maximum 5 steps for primary path
- [ ] One common error with exact symptom and specific fix
- [ ] No feature tour content (features not needed for primary job are removed or in optional section)
- [ ] Vietnamese version matches English step-for-step

Write `docs/launch/customer-guide.md` in the project repo. Do not post externally. End with one next step.
