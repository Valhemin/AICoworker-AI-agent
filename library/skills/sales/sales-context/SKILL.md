---
name: sales-context
description: Set up the sales profile once. Every other sales skill reads this file. Use when starting to sell a new product or when context needs refreshing.
---

# Sales context

Every sales skill reads this file before working. Run once when a product is about to go to market, then update when new evidence arrives.

Main reference sources: TheCraigHewitt/sales-skills (MIT), AIDevGTM/gtm-cofounder (MIT). Do not copy code.

## Input

Read in order:
1. `../shared/01_Projects/<domain>/<project-name>/idea-fit.md` — price, who pays, current alternative.
2. `../shared/03_Brand/<project-name>/profile.md` — positioning, voice, ICP, competitors.
3. `../shared/01_Projects/<domain>/<project-name>/audience-channel.md` — customer group, chosen channel.

If any file is missing, state clearly which file is absent and ask the user to provide that information directly.

## Write `../shared/03_Brand/<project-name>/sales-context.md`

### What the product is (one sentence)
For [who], helps [specific result], instead of having to [old expensive/slow approach].

### ICP (ideal customer profile)
- Who they are: role, industry, company size, or individual.
- How to recognize them: what they are doing, using, or complaining about.
- Who they are NOT: who to exclude.

### Three value props by PSO (Problem → Solution → Outcome)
```
VP-1: [Problem name] → [How the product solves it] → [Measurable or clearly felt result]
VP-2: ...
VP-3: ...
```
Each VP must be backed by real evidence (from idea-fit, beta feedback, or observation). Write the source.

### Proof points
Maximum three. Each one: an observable or past fact, not a promise.
- "Test user X said..."
- "Compared to [old approach], step Y went from ... to ..."

### "Must buy now" picture
What happens to the customer if they do nothing for another 90 days? Use this when a customer delays.

### Price and terms
Taken verbatim from idea-fit.md. Do not change here.

### Common blockers
Who typically says no or slows down the decision? How to recognize them early?

---

After writing: suggest running `value-prop` to check whether the VPs are sharp enough, or `discovery-prep` to prepare for the first meeting.
