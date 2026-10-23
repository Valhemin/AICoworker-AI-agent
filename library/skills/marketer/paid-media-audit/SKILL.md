---
name: paid-media-audit
description: Audit paid ad copy, creative angle, and landing page conversion readiness before ad spend. Stops before launching or paying.
---

TRIGGER: marketing campaign is preparing paid traffic (Meta, Google, TikTok) or landing page conversion test for a committed product with price and target audience
OUTPUT: detailed — paid-media-audit.md with creative hook score, conversion leak check, and go/no-go recommendation
SKIP: organic-only campaigns; product has no committed pricing; landing page not yet live

---

# Paid Media Audit

Audit ad creatives and landing page readiness before spending budget. Adapted from `agency-agents/paid-media` methodology. Does not connect to ad accounts. Does not spend money.

## Input

Read before starting:
- `idea-fit.md` — committed price (VND + USD) and target buyer
- `launch-sprint.md` — core message and launch assets
- Landing page URL or draft copy

---

## Step 1 — Creative Hook & Angle Check

Score each proposed ad variant (1-5 points, minimum 4 required to pass):

1. **Pattern Interrupt**: First 3 seconds (video) or headline (image/text) stops the scroll without clickbait deceit.
2. **Problem Specificity**: Calls out a concrete pain point or scenario recognized by the target buyer.
3. **Offer Clarity**: States the exact offer or trial without hiding pricing dynamics.
4. **Compliance**: No banned claims, exaggerated guarantees, or policy-violating trigger words.

---

## Step 2 — Landing Page Continuity (Message Match)

Verify message continuity between ad and page:

1. **Headline Match**: The promise in the ad appears in the hero section above the fold.
2. **Single CTA**: One clear primary action (sign up, buy, book demo). No competing distractions.
3. **Speed & Mobile**: Page renders primary copy in under 2.5s on mobile connection.
4. **Proof & Guarantee**: Clear refund/cancellation policy or risk reversal stated visibly.

---

## Step 3 — Budget & Test Boundary

1. Recommend test budget floor: enough for 30-50 clicks per variant to detect signal.
2. State stop-loss criteria: maximum acceptable Cost Per Click (CPC) or Cost Per Acquisition (CPA) before killing the variant.
3. One-line recommendation: `PASS — ready for test spend`, or `FAIL — fix listed leaks before spending`.

---

## Write

Write `../shared/01_Projects/<domain>/<project-name>/paid-media-audit.md`.

Format:
- `## Vietnamese` summary and action items
- `## English` summary and action items

End with one next step.
