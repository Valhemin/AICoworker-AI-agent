---
name: audience-channel
description: Choose the one buyer group and one channel that gives the fastest path to the first paying customer. Commit to one — do not list options.
---

TRIGGER: product has idea-fit.md and market-choice.md, ready to decide where and who to target first
OUTPUT: compact — audience-channel.md with committed buyer group, committed channel, invite sentence, distribution constraint
SKIP: no committed solution in market-choice.md; multiple products with different audiences

---

# Audience Channel

Read before starting:
- `idea-fit.md` — who pays, what they pay, VND + USD price, division
- `market-choice.md` — committed solution, who uses it, what they use instead

---

## Step 1 — Narrow the buyer to one group

The goal is to find the group who has the problem most **acutely**, are **reachable** (you know where they are), and are **willing to pay** (not just interested).

Do not pick the group that feels most obvious. Pick the group most likely to hand you money this month.

Three tests for the right first group:
1. **Urgency**: Are they losing money or time right now because of this problem? ("Nice to have" buyers don't convert.)
2. **Reachability**: Do you know a specific place (community, group, event, contact list) where 50+ of them are? If you have to run ads to find them, they're not reachable yet.
3. **Prior spending**: Have people in this group already paid for anything to solve this problem (even a workaround, a consultant, or a competing tool)?

Write:
- Buyer group: `[Role] at [company type/size] in [geography] who [specific workflow or pain]`
- Example: "Freelance designers in Vietnam who send invoices manually via Zalo or Facebook"
- Example: "HR managers at startups (<50 employees) who track leave in Google Sheets"

**Vietnam-specific check**: Is this buyer group accustomed to paying for software, or do they hire a person for this task? (alodev.vn data: most Vietnamese SMB searches are for "thuê người làm hộ", not "công cụ tự làm"). If they typically hire a person:
- Your pitch must explain why software is better than a person, not just cheaper
- Consider offering as a "managed service" (you handle setup + support) at a higher price point
- Or target a different segment that is already self-serve-software-familiar (startups, digital agencies, tech companies)

---

## Step 2 — Choose one channel (commit, don't list)

### Channel selection framework

For each candidate channel, assess three things:
1. **Where is the buyer group right now?** (specific subreddit, Facebook group name, LinkedIn community, event, email list, Slack workspace)
2. **Do you have a way in that doesn't require paid spend?** (personal network, existing group member, content creator in that space, warm intro)
3. **Has anyone sold something similar in this channel?** (evidence the channel works for this buyer type)

### Channel options by context

**Facebook/Zalo groups (Vietnam SMB, small teams)**
- Best for: accountants, HR, small business owners, freelancers, local industry communities
- Works when: you can join the group as a member (not as an advertiser) and share something genuinely useful
- First message framing: personal story or observation, not a product pitch
- Speed: fastest to first response (days)

**LinkedIn (B2B, SaaS, professional services, international)**
- Best for: startup founders, HR managers, sales teams, operations leads
- Works when: you can write a specific post about the problem the product solves (not the product)
- First post: problem observation → mention you built something → invite DMs
- Speed: medium (1-2 weeks to meaningful engagement)

**Existing warm network / personal contact list**
- Best for: any buyer type if you have direct relationships
- Works for: the first 5-10 customers
- Approach: direct message, not broadcast — "I built something for [their specific problem], can I show you?"
- Speed: fastest to paid (if relationship is warm)

**Content channel (blog, YouTube, newsletter)**
- Best for: long-term distribution, not first customers
- Only start this if you have 3+ paying customers already — don't build content to find your first customer

**Do not choose**: paid ads, cold email to purchased lists, ProductHunt, App Store optimization — these are valid later but wrong for finding the first paying customer.

---

## Step 3 — One invite sentence

Write the one sentence used to open a conversation with a potential buyer.

Formula: `[Acknowledge their current workflow] → [State the specific outcome] → [One action to take]`

Examples:
- "Bạn đang làm báo cáo thuế bằng Excel mỗi tháng? Tôi vừa xây tool tự động hóa bước đó, đang cho dùng thử — có muốn thử không?"
- "If you're still tracking team leave in a spreadsheet, I built something that syncs it automatically — DM me for access."
- "For freelance designers tired of chasing invoices: I built an automated follow-up tool. Free for the first 10 users, DM me."

Rules:
- One sentence only (or two very short ones)
- Must name the buyer's current tool or workflow (not "your current solution")
- CTA is a conversation opener, not a link to a landing page
- `ceo` gate: one Vietnamese version, one English version

---

## Step 4 — Distribution constraint (cost ceiling for this round)

State the maximum spend and time for this channel round:
- Zero-cost version: only organic posts, personal outreach, community participation
- Low-cost version: max [VND or USD amount] for any single channel test (boosted post, paid community access)
- Time limit: [N weeks] before reassessing if no response

**Default**: zero-cost organic for the first round. No ad spend until at least 3 people have tried the product and given feedback.

---

## Output

Write `../shared/01_Projects/<domain>/<project-name>/audience-channel.md`:

```markdown
# Audience Channel — <product name>

## Buyer group
[Role] at [context] who [specific pain/workflow]

## Why this group first
[urgency + reachability + prior spending evidence]

## Channel
[Channel name] — [specific location within channel: group name, community, list]

## Why this channel
[Evidence the buyer group is there + why organic works here]

## Invite sentence
Vietnamese: [one sentence]
English: [one sentence]

## Distribution constraint
[zero-cost / max VND/USD] — reassess after [N weeks]

## Next step
run `launch-sprint` to prepare the four assets and channel copy
```

End with one next step.
