---
name: content-calendar
description: Schedule the next four posts for the chosen channel after the launch sprint. Each post has a topic, format, and suggested week.
---

# Content calendar

Use after the launch sprint is done and you want to maintain presence on the chosen channel.

## Required input

- `../shared/01_Projects/<domain>/<project-name>/audience-channel.md` — channel, customer group.
- `../shared/03_Brand/<project-name>/profile.md` — voice, differentiators. If missing, call `brand-profile` first.

## Steps

1. Read channel and customer group from `audience-channel.md`.
2. Read voice and differentiators from `profile.md`.
3. Choose four distinct topics, each serving one of three jobs:
   - Resolves exactly one pain point of the customer group.
   - Shows a real result from a real user or real case.
   - Explains one product differentiator with a concrete example.
4. For each post: topic, format appropriate to the channel (article, short video, image, tutorial), suggested week.
5. Do not place paid ads. Do not self-post.

## Write

`../shared/01_Projects/<domain>/<project-name>/content-calendar.md`

```md
# Content Calendar — <product name>

Channel: <channel>
Customer group: <group>
Updated: <date>

## Post 1 — Week <N>
- Topic: ...
- Format: ...
- Suggested opening: ...

## Post 2 — Week <N+1>
...
```

End with a suggestion: spawn `creator` to write the script for the first post, or stop and wait for approval.

Stop at WAITING REVIEW before posting anything.
