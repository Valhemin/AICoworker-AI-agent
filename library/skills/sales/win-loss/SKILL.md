---
name: win-loss
description: Analyze a deal that just closed (win or loss). Find patterns to improve. Feed results back into value prop and objection map.
---

# Win-loss

Use after every deal closes: customer just signed or just said no.

Sources: TheCraigHewitt sales-skills, LeadMagic founder-sales. Do not copy code.

## Input

- The deal-brief file for this deal.
- Outcome: WIN or LOSS.
- User's brief summary: what happened in the end.

## Analysis questions

**If WIN:**
- What factor was most decisive? (price, feature, timing, relationship, demo?)
- What did the champion do to sell internally?
- Which question did you answer best?
- How many days from first meeting to signing? Can it be shortened?

**If LOSS:**
- What factor was most decisive? (price, competitor, insufficient pain, no trigger, never reached the buyer?)
- At what point were the four deal factors actually already blank without you noticing?
- What could you have done differently?
- Was this customer actually outside the real ICP from the start?

## Write `../shared/03_Brand/<project-name>/win-loss-log.md`

Add one new entry:
```
## <Deal name> — WIN / LOSS — <YYYY-MM-DD>
- Deciding factor: ...
- Lesson: ...
- Updates needed:
  - [ ] sales-context.md (ICP, proof points)
  - [ ] objection-map.md (new objection)
  - [ ] value-prop (VP that did not work)
```

## After writing

- Pattern repeating (3+ LOSS with same reason) → suggest reviewing `value-prop` or `sales-context`.
- WIN driven by a specific VP → suggest moving that VP to the front.
- LOSS because the buyer was never reached → suggest approaching the buyer earlier in `discovery-prep`.
