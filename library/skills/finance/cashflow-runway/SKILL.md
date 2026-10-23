---
name: cashflow-runway
description: Forecast operational burn rate, monthly fixed costs (APIs, servers, tools), and calculate remaining runway months.
---

TRIGGER: monthly financial review, launching a new paid project, or when evaluating team/API expansion
OUTPUT: detailed — cashflow-runway.md with monthly recurring costs (VND/USD), cash balance, and runway projection
SKIP: individual task estimation without company-level cost context

---

# Cashflow & Runway Forecast

Forecast operational runway and maintain cash buffer. Adapted from `agency-agents/finance` FP&A methodology.

## Input

Read before starting:
- List of active subscriptions (LLM API keys, VPS/Hosting, domain names, tool licenses)
- Current available cash reserve (VND/USD)
- Average monthly recurring revenue (MRR) from active customers

---

## Step 1 — Fixed & Variable Burn Rate Breakdown

1. **AI & Cloud Infrastructure**: Monthly API spend (OpenAI/Anthropic/Gemini) + VPS/Cloud hosting + database.
2. **SaaS & Tooling**: GitHub, domain renewals, email marketing, productivity tools.
3. **Total Monthly Burn**: Sum of direct fixed and variable monthly outflow.

---

## Step 2 — Net Burn & Runway Calculation

1. **Net Monthly Burn**: `Total Monthly Burn − Collected Monthly Revenue`.
2. **Runway in Months**: `Current Cash Balance / Net Monthly Burn`.
3. **Runway Alert Classification**:
   - `GREEN`: Runway > 6 months. Safe to experiment and invest.
   - `YELLOW`: Runway 3–6 months. Freeze non-essential subscriptions; accelerate sales.
   - `RED`: Runway < 3 months. Immediate cash preservation mode. Cut unneeded API calls/models.

---

## Step 3 — Optimization Levers

List concrete recommendations:
- High-spend API token optimizations or fallback models.
- Canceling unused subscriptions or downgrading idle VPS instances.

---

## Write

Write `../shared/00_System/Finance/cashflow-runway.md` (or in project folder if project-specific).

Format:
- `## Vietnamese` summary and runway status
- `## English` summary and runway status

End with one next step.
