---
name: idea-evaluate
description: Evaluate an idea's real market potential, risks, and growth path. Produces a structured report with a scored verdict before committing to build or price.
---

TRIGGER: any idea submitted for evaluation — "có nên làm cái này không", "đánh giá ý tưởng này", "tiềm năng của X ra sao"
OUTPUT: detailed — idea-evaluate.md with working definition, demand signals, 4-track risk, competitive landscape, growth path, 6-dimension score, verdict
SKIP: product already live → use `founder-next-moves` instead

---

# Idea Evaluate

Use BEFORE `idea-fit`. This skill answers "is this worth pursuing?" with evidence. `idea-fit` then answers "who pays and how much?" if the verdict is PURSUE.

**Source frameworks**: YC/Paul Graham, Sequoia Capital, Antler Vietnam validation playbook, 2025 micro-SaaS validation research (Agrahri/Edmired), alodev.vn Vietnam market demand data.

---

## Step 0 — Working Definition (before any research)

State the sharpest version of the idea in one paragraph:
- What does this do, exactly?
- Who is the **primary user** — specific role, not "everyone" or "businesses"
- What does the user do **differently** after using it? (outcome, not feature)
- What is explicitly **NOT in scope**?

If the input is vague, propose the sharpest interpretation and mark it: *"Working definition — confirm before proceeding."*

**Anti-pattern check** (PG/YC): Is this a "sitcom idea" — something that sounds plausible when pitched to friends but no one actually wants badly enough to pay? Common tells:
- Friends say "yeah, maybe I could see using that" → weak signal
- No one is already hacking a workaround for this problem → suspect
- The problem only exists if you imagine a certain type of user who doesn't actually exist yet

---

## Step 1 — Spawn `browser` for each research task below

Do NOT rely on memory for market data. Spawn `browser` per query. For every fact:
- Write the source URL and date
- No source → write `no public source`
- Inferences get the label **[inference]**
- Never estimate numbers (market size, user counts, revenue) without a source

---

## Step 2 — Demand Signals

The core question: **are people already in pain, or is this pain you invented?**

### 2A. Workaround signal (strongest evidence of real demand)
Look for "bizarre behavior" (PG): people hacking together their own solutions signal real pain.

Search in order:
1. **Reddit/Facebook groups** — search `"[problem keyword] site:reddit.com"` and `"[problem] frustrating"` — read complaint threads, not just mentions
2. **G2/Capterra 1-star reviews** — find the category leader and read 50 lowest reviews. You're looking for the same complaint repeated across reviewers — not one-off issues
3. **Pricing backlash events** — has a competitor recently raised prices and triggered a migration wave? This is one of the strongest demand signals for a new entrant
4. **YouTube tutorial comments** — comments on "how to do X manually" videos often reveal buyers who want automation

Rate each signal:
| Source | Finding | Signal strength |
|---|---|---|
| Reddit/community complaints | ... | STRONG / WEAK / NONE |
| Competitor 1-star reviews (repeated themes) | ... | STRONG / WEAK / NONE |
| Existing workarounds / DIY cobbling | ... | STRONG / WEAK / NONE |
| Pricing backlash event | ... | STRONG / WEAK / NONE |
| YouTube/tutorial comments | ... | STRONG / WEAK / NONE |

STRONG = multiple independent sources confirming the same pain. WEAK = one source or inferred. NONE = searched and found nothing.

**Red flag**: if no one is doing a workaround, that's not an untapped market — it's likely not a real problem.

### 2B. "Why now?" — the timing question
(Sequoia: "Nature hates a vacuum — why hasn't this been built before?")

Write one specific change that makes this idea viable NOW but not 2–3 years ago. Examples of real catalysts: AI APIs becoming affordable, a platform reaching critical user mass, regulation change, large incumbent raising prices, remote work normalizing a workflow, new developer tooling enabling what was previously too expensive to build.

If you cannot find a credible "why now": write that explicitly — it doesn't kill the idea, but it raises the question of why no one else has built it.

### 2C. Market direction
Is the underlying problem growing, stable, or shrinking?

Search Google Trends for the core problem keyword over 5 years. Note direction (up/flat/down) and any recent inflection. Identify one macro trend that helps and one that could hurt.

### 2D. Market size — only if a source exists
Do NOT estimate. If a credible report (CB Insights, Gartner, Statista, industry publication) has a figure, cite it with date. Otherwise write: "no public source found."

**Vietnam-specific note** (alodev.vn research, 2025): In most Vietnamese business categories, search volume for "hire someone to do it" exceeds search volume for "tools to do it myself" by a large margin. If this is a Vietnam-primary market, explicitly check whether the target buyer typically outsources this task or buys software for it. Selling self-serve SaaS to Vietnamese SMBs means competing against the habit of hiring a person, not just competing against other software.

---

## Step 3 — Competitive Landscape

Map three layers (Edmired framework):
1. **Direct competitors** — products solving the exact same problem for the same customer
2. **Indirect competitors** — different approach to the same job-to-be-done
3. **DIY alternatives** — spreadsheets, manual process, hiring a person, cobbling tools together

For each direct competitor, find:
- How many users / revenue signal (or "no public source")
- Pricing model
- Top complaint from reviews (their weakest point)
- What moat they have (data, network effects, switching cost, brand, regulatory)

**Positioning gap analysis**: What gap exists that no competitor occupies?
- Underserved segment (e.g., incumbents target enterprise, opportunity in SMB)
- Workflow integration (competitors solve in isolation; you embed into existing workflow)
- Speed/simplicity (existing solutions work but take 10× longer)
- Platform-native (competitors built for old platform; you build AI-first, mobile-first, or API-first)
- Geographic/language gap (global tool with no local adaptation)

**Red flags**:
- Lots of well-funded competitors with network effects → very hard to win
- Zero competitors → not an untapped market, probably not a real problem (or a regulatory wall)
- Feature parity with incumbent is the plan → no moat

**Defensibility check**: What would it take for Google, Notion, or the local market leader to add this as a feature? If the answer is "one sprint," that is a critical risk.

---

## Step 4 — Risk Assessment (4-track framework)

Do not conflate the four tracks. A positive result on one does not validate the others.

### Track A: Value risk — Will people actually want this?
- Is this a **painkiller** (workflow blocked without it, willing to pay) or a **vitamin** (nice-to-have, easy to drop)?
- Have real buyers expressed demand, or only friends and family ("the friends and family trap")?
- Would buyers want a crude early version today, or do they need a polished product before they'd try it?

Rating: HIGH / MEDIUM / LOW. Write the specific evidence.

### Track B: Usability risk — Can users get value without hand-holding?
- How much setup or learning is required before the user sees the first result?
- Does this require a behavior change from the user's current habit?
- Who is the technically weakest user in the target segment, and can they use this?

Rating: HIGH / MEDIUM / LOW.

### Track C: Feasibility risk — Can you build and operate this?
- What is the hardest single technical component? Does it depend on third-party APIs or data you don't control?
- What happens if that component fails or the API raises prices 10×?
- What is the ongoing operational load per customer per month?
- Can a small team (1–3 people) operate this at 100 customers?

Rating: HIGH / MEDIUM / LOW.

### Track D: Viability risk — Can this be a sustainable business?
- What is the realistic acquisition channel? (Not "SEO and word of mouth" — be specific: which community, which platform, what content type)
- What is distribution risk? Can you reach buyers without a large marketing budget?
- For Vietnam market: Is this buyer segment accustomed to paying for software, or do they prefer "người làm hộ"?
- At what customer count does this become self-sustaining? Is that achievable for a small team in the first year?

Rating: HIGH / MEDIUM / LOW.

**Risk summary**:
| Track | Rating | Key reason | Cheapest test |
|---|---|---|---|
| Value | H/M/L | one sentence | landing page / interview |
| Usability | H/M/L | one sentence | prototype session / concierge |
| Feasibility | H/M/L | one sentence | engineering spike / API mock |
| Viability | H/M/L | one sentence | one paying customer / pilot |

---

## Step 5 — Growth Opportunities

Write only what is grounded in the research above. No speculative expansion.

### 5A. Natural expansion path (v2, v3)
After the first version works, what do the same customers pay for next? Write 2 paths maximum. Each: what it adds, which pain it solves, why it's reachable from v1.

### 5B. Adjacent segments
1–2 customer segments with the same problem. What changes to reach them?
- REACHABLE: same distribution channel, minor product change
- STRETCH: requires new channel or significantly different product

### 5C. Defensibility flywheel
Does any of the following apply — and HOW specifically?
- **Network effect**: product improves as more users join → describe the mechanism
- **Data flywheel**: more usage → better output → more usage → describe the loop
- **Switching cost**: customers hard to move after N months → describe what creates lock-in
- **None identified** → write this honestly. Not every good product has a moat on day 1.

### 5D. Defensibility timeline
At what point (month 6 / year 1 / year 2) does the product become meaningfully hard to copy? What needs to happen to reach that point?

---

## Step 6 — Confidence Score (6 dimensions)

Score each dimension 1–5. Sum for verdict threshold.

| Dimension | 1 | 3 | 5 |
|---|---|---|---|
| **Problem severity** | Mild inconvenience | Regular frustration | Workflow-blocking, people pay workarounds |
| **Demand evidence** | Anecdotal / friends said yes | Community complaints found | Pricing backlash, active workarounds, pre-sales |
| **Competitive gap** | Crowded, no clear angle | Some room to differentiate | Clear unserved niche with no funded player |
| **Market direction** | Shrinking / unclear | Stable | Growing trend + clear "why now" catalyst |
| **Execution feasibility** | Requires large team or capital | Possible with 2–3 people | Solo-buildable MVP in <4 weeks |
| **Founder-market fit** | No domain knowledge | Adjacent experience | Deep personal experience with the problem |

**Total → Verdict threshold**:
- **24–30**: PURSUE — strong signal across dimensions
- **18–23**: PURSUE SMALL SLICE — real opportunity but meaningful unknowns; test before committing
- **12–17**: CONDITIONAL — significant gaps; identify the weakest dimension and test it first
- **< 12**: DO NOT PURSUE — too many fundamental unknowns

---

## Step 7 — Verdict

Choose exactly one: **PURSUE** / **PURSUE SMALL SLICE** / **CONDITIONAL** / **DO NOT PURSUE**

Write the verdict block:

```
Score: [X/30]
Verdict: [PURSUE / PURSUE SMALL SLICE / CONDITIONAL / DO NOT PURSUE]

Key strength: [the one finding that most supports pursuing this]
Key risk: [the one thing that could kill this]
Biggest assumption: [the belief that MUST be true for this to work — not obviously true]

Fastest test: [the cheapest experiment that would confirm or kill the biggest assumption]
  — e.g., "Write a 1-page landing page targeting [segment], run [channel], target [metric] in [timeframe]"
  — e.g., "Do 5 interviews with [specific role] asking about [specific workaround] — stop if no workaround found"
  — e.g., "Offer a manual concierge version at [price] to [specific list], need 3 paid responses in 2 weeks"

Next step:
  PURSUE → run `idea-fit` for pricing and build decision
  PURSUE SMALL SLICE → [describe the slice] → after slice validated, run `idea-fit`
  CONDITIONAL → [describe the one test to run] → reassess after result
  DO NOT PURSUE → [describe what would need to change to reverse this verdict]
```

---

## Output rules

Write to `../shared/01_Projects/<domain>/<project-name>/idea-evaluate.md`. Domain is `giai-phap-so` or `media`. Two sections: `## Vietnamese` then `## English`.

- No invented numbers
- No marketing language ("revolutionary", "game-changing" forbidden)
- Inferences labeled **[inference]**
- Facts sourced with URL + date
- Scoring rationale visible — show the score for each dimension, not just the total
- Negative verdicts are as valuable as positive ones — explain WHY so the CEO can reassess assumptions later
