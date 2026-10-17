---
name: user-faq
description: Consolidate recurring incidents into a FAQ. Use when the same question appears multiple times or before a new customer onboarding wave.
---

# User FAQ

Use when support has received the same question at least twice, or when CEO is about to onboard a new customer group and wants support documentation ready.

## Input

- Project name and domain.
- List of `support-issue.md` files in `../shared/01_Projects/<domain>/<project-name>/`.

## Steps

1. Read the `support-issue.md` files in the project folder. Group questions and incidents.
2. Classify:
   - **Did not know how to use it** → write a how-to answer, add to FAQ.
   - **Technical bug already fixed** → write status "fixed in version X".
   - **Technical bug not yet fixed** → write "being addressed", do not promise a date.
3. Each FAQ entry: question, short answer (maximum three sentences), steps to follow if needed.

## Write

`../shared/01_Projects/<domain>/<project-name>/faq.md`

```md
# FAQ — <product name>

Updated: <date>

## <Question 1>
<Short answer, max three sentences>

## <Question 2>
...
```

Do not promise features that do not exist. Do not write internal technical details. Do not write prices that are about to change.

After writing: suggest delegating to `creator` with `customer-guide` to write a formal getting-started guide if one does not exist yet.
