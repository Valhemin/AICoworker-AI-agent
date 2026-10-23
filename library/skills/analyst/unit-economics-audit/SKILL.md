---
name: unit-economics-audit
description: Audit real delivery cost (LLM API, cloud infrastructure, third-party services) against selling price to verify margin and runway.
---

TRIGGER: product reaches live beta/production, changes LLM model or infrastructure provider, or monthly operational review
OUTPUT: detailed — unit-economics.md with COGS breakdown, gross margin per unit, and break-even customer count
SKIP: early idea stage without prototype (use idea-fit instead); zero external service cost projects

---

# Unit Economics Audit

Calculate actual Cost of Goods Sold (COGS) and financial sustainability for software or media products. Adapted from `agency-agents/finance` methodology.

## Input

Read before starting:
- `idea-fit.md` — committed price (VND/USD) and delivery cost hypothesis
- Active infrastructure bills or token usage logs (OpenAI/Anthropic/Gemini API, hosting, DB)

---

## Step 1 — Per-Unit COGS Breakdown

Calculate direct variable costs to serve 1 active user (or 1 media asset):

1. **Model / Inference API**: Token count per typical user journey × API price per 1M tokens. Include prompt caching savings if configured.
2. **Compute & Storage**: Cloud server, serverless functions, database rows per active user.
3. **Third-party Services**: Email, SMS, authentication, payment gateway fees (e.g. 2-3% + fixed fee).
4. **Total COGS**: Sum of direct variable cost per unit.

---

## Step 2 — Margin & Viability Gate

1. **Gross Margin**: `(Selling Price − Unit COGS) / Selling Price × 100%`.
   - Software target: > 70% gross margin.
   - Flag as `DANGER` if gross margin < 50% due to heavy unoptimized LLM queries.
2. **Break-Even Volume**: Fixed overhead (domain, base subscriptions) / Gross Profit per unit.
3. **Loss-making Triggers**: Document thresholds (e.g. user making > 50 heavy queries/day turns unit negative).

---

## Step 3 — Optimization Recommendation

If margin is below target:
- Model downgrade/routing (e.g. switch simple reasoning to Flash/haiku).
- Prompt truncation and output token limits.
- Rate limits or tiered usage caps.

---

## Write

Write `../shared/01_Projects/<domain>/<project-name>/unit-economics.md`.

Format:
- `## Vietnamese` financial breakdown and risk alert
- `## English` financial breakdown and risk alert

End with one next step.
