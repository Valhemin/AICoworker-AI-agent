---
name: product-telemetry-tracking
description: Design event tracking schema (view, signup, activate, pay, churn), implement privacy-friendly analytics (PostHog, Plausible, GA4), and build funnel drop-off reports.
---

TRIGGER: product reaches public launch, redesigned onboarding flow, or conversion funnel tracking is requested
OUTPUT: detailed — telemetry-schema.md with event nomenclature, tracking code snippet, and funnel conversion baseline
SKIP: internal CLI utilities, backend batch processors without user interface

---

# Product Telemetry & Analytics

Design and implement end-to-end event tracking and conversion funnel measurement. Adapted from `agency-agents/product` Product Ops methodology.

## Input

Read before starting:
- `idea-fit.md` — target user action that defines successful value delivery ("Aha" moment)
- Application routes, signup flow, and checkout steps

---

## Step 1 — Standard Event Taxonomy

Define standardized events using `[Object] [Action]` naming:

1. **Top-of-Funnel**: `page_view`, `cta_click` (properties: `page_url`, `utm_source`, `utm_campaign`).
2. **Onboarding**: `user_signup_started`, `user_signup_completed` (properties: `auth_method`).
3. **Core Activation ("Aha" moment)**: `project_created`, `file_exported`, `first_task_run` (properties: `duration_seconds`).
4. **Monetization**: `checkout_viewed`, `payment_succeeded`, `subscription_cancelled` (properties: `plan_tier`, `value_amount`, `currency`).

---

## Step 2 — Privacy & Compliance Guard

1. **Zero PII in Analytics**: Strictly forbid sending raw passwords, email addresses, credit card numbers, or Vietnamese national IDs in event properties.
2. **Consent & Cookieless Option**: Prioritize lightweight, privacy-focused analytics (Plausible / PostHog self-hosted) where cookie consent banners can be avoided.

---

## Step 3 — Funnel Drop-off Analysis

Document the conversion funnel:
`Landing Visit (100%)` → `Signup (X%)` → `Core Activation (Y%)` → `Paid Conversion (Z%)`.
Highlight the single biggest drop-off stage for `marketer` and `designer` to optimize.

---

## Write

Write `../shared/01_Projects/<domain>/<project-name>/telemetry-schema.md`.

Format:
- `## Vietnamese` event taxonomy, installation instructions, and funnel baseline
- `## English` event taxonomy, installation instructions, and funnel baseline

End with one next step.
