---
name: launch-sprint
description: Prepare four launch assets and the core message to sell a committed product. Stops before posting or paying.
---

TRIGGER: product has passed tester (or first version ready), has a price from idea-fit.md, and a channel from audience-channel.md
OUTPUT: detailed — launch-sprint.md with core message, 4 assets checklist, channel-specific copy, one distribution action
SKIP: product not yet tested; no committed price; no channel chosen

---

# Launch Sprint

Read before starting:
- `idea-fit.md` — committed price (VND + USD), target buyer, selling unit
- `audience-channel.md` — primary channel, customer group
- `market-choice.md` if it exists — what problem is solved, what the buyer currently uses instead

---

## Step 1 — Core message (the hardest part)

Write the one sentence the buyer needs to read to understand why to switch.

**Formula**: `[Specific customer] can now [specific outcome] without [the thing they hate doing]`

Examples of weak vs strong messages:

| Weak (feature-led) | Strong (outcome-led) |
|---|---|
| "AI-powered task manager with smart reminders" | "Freelancers in Vietnam close client projects 40% faster without chasing overdue invoices" |
| "All-in-one business software" | "Kế toán nhỏ lẻ tự nộp báo cáo thuế mà không cần thuê thêm người" |
| "Real-time collaboration platform" | "Remote teams at startups finish weekly standups in under 10 minutes" |

Rules for the message:
- Name the buyer specifically (not "businesses" or "everyone")
- State the outcome, not the feature
- Include the relief: "without [the painful thing]"
- `ceo` gate: one Vietnamese sentence + one English sentence
- No adjectives like "powerful", "smart", "easy", "revolutionary"

**Test your message**: Show it to someone who doesn't know the product. If they say "that sounds like something I need" → good. If they say "interesting" or "sounds useful" → rewrite.

---

## Step 2 — Four launch assets

Every asset must exist before launch. Missing one: delegate — do not combine or skip.

### Asset 1 — Brand mark / logo
Take from `docs/design/BRAND.md`. Not present → spawn `designer`. Do not create a logo yourself.

### Asset 2 — Getting-started guide (digital solutions only)
Spawn `creator`, skill `customer-guide`. The guide answers: how do I try it in the first 5 minutes? Media products skip this if a script already exists.

### Asset 3 — One ad image
Spawn `creator`. Creator delegates to `creator-visual`, skill `brand-visual`.

Image principles (brief the creator with these):
- Shows the outcome, not the interface
- One clear focal point — not a collage
- Text on image: max 7 words
- Must work as a thumbnail at 200×200px (test this)

### Asset 4 — One short video (60–90 seconds max)
Same `creator-visual` from `BRAND.md`. Brief: show the before (pain), the action (using the product), the after (outcome). No feature tour. No voiceover that reads the UI labels.

For media products: use the existing script, do not render yet.

---

## Step 3 — Channel-specific copy

Write the actual post/message copy for the primary channel. Not a template — write the real text that will be sent, pending approval.

### Facebook / Zalo group (Vietnam primary channels)

```
Pattern: Hook (the pain) → Evidence (why now) → Call to action

Hook options:
- "Bạn đang [pain point] mỗi tuần?"
- "Hầu hết [customer type] đang [inefficient thing] — đây là cách [outcome]"
- Open with a number: "43% [customer type] nói [problem] là thứ tốn thời gian nhất"

Body (3–5 lines max):
- What changed: one specific thing the product does
- Social proof or urgency: real number (beta users, waitlist, discount window)
- Link or contact method

CTA: one action only. "Nhắn tin để dùng thử" OR "Xem demo tại link" — not both.
```

**Vietnam market specifics** (from alodev.vn research + Antler Vietnam):
- Vietnamese SMBs buy from people they trust, not landing pages. Include a personal note or story in the first launch message.
- "Nhắn tin" (message us) converts better than "Sign up" for the first wave.
- Pilot offer works better than a free trial for business software: "Dùng thử 30 ngày, tôi hỗ trợ setup tận nơi."
- Price anchoring: always state what they currently pay (time or money) before your price.

### LinkedIn / Twitter / X (international or B2B)

```
Pattern: Observation → Product → Proof → CTA

Opening: a specific observation or data point relevant to the buyer
1-sentence product description (your core message from Step 1)
One concrete result (real number from beta, or the design intention)
One CTA: link or "DM me for early access"

Keep under 280 characters for Twitter. LinkedIn: max 3 paragraphs.
```

### Email (to existing list or warm leads)

```
Subject line options (A/B test these):
- "[Specific pain] — we fixed it"
- "For [customer type] who [do the painful thing]"
- Personal: "Quick question about [their workflow]"

Body structure:
1. One sentence: why this is relevant to them specifically
2. One sentence: what the product does
3. One sentence: why now (what changed, limited access, etc.)
4. CTA: one action with a deadline or constraint

PS line: often the most-read part of an email. Use it for social proof or urgency.

Length: under 150 words. Every extra sentence reduces reply rate.
```

---

## Step 4 — Distribution actions

Write one specific action that puts the product in front of buyers this week. Not a strategy — one action.

Examples:
- "Post the Facebook group message in [specific group name] on [day]"
- "Send the email to [N] warm leads from [source]"
- "Comment with the product link on [specific thread/post about the problem]"

Estimate: how many people will see this? How many are likely buyers? What's the expected response at 1% conversion?

---

## Step 5 — Success metrics for this sprint

Write what counts as a successful launch sprint in 14 days:
- Minimum: [N] people tried the product or contacted about it
- Target: [N] paying customers or committed pilots
- Signal to stop and rethink: fewer than [N] responses after [N] impressions

These numbers should come from `idea-fit.md` pricing and unit economics.

---

## Output

Write `../shared/01_Projects/<domain>/<project-name>/launch-sprint.md`.

`ceo` gate: two sections `## Vietnamese` then `## English` for all customer-facing copy.

**Stop at WAITING REVIEW before any posting, payment, or sending.** Do not self-post. Do not place ads. This file is a queue for the CEO to review and approve.

End with one next step.
