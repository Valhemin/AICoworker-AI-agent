---
name: competitor-watch
description: Update a competitor card. Use when you need to know what a competitor just did, changed in pricing, or released.
---

# Competitor watch

Use when CEO or marketer wants updated information on a specific competitor.

## Input

- Competitor name or URL.
- Product name (to read `../shared/03_Brand/<project-name>/profile.md`).

## Steps

1. Spawn `browser` to open the competitor's page. Get: current price, newest feature with description, homepage message.
2. Read the existing competitor card in `../shared/03_Brand/<project-name>/profile.md` if it exists.
3. Compare with own `profile.md`: what are they doing that is not present here? Where are they weaker?

## Write

Update or create the competitor section in `../shared/03_Brand/<project-name>/profile.md`, under `## Competitors`. For each competitor:

```
### <Competitor name>
- URL: <url>
- Price: <number if known, source, date checked>
- Main message: <sentence from their homepage>
- Recent feature: <summary>
- Weakness vs. us: <observable and arguable observation, no subjective judgment>
- Source: <URL, date>
```

Do not fabricate prices or figures. No source: write `no public source`. Do not write subjective opinions.

After writing: suggest updating `audience-channel.md` if their messaging has changed.
