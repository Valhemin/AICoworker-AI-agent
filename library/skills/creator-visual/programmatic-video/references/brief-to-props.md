# Script / brief → props

Map the approved script (from `screenwriting` / `creative-brief` / `hook-retention`) to props. Use only facts in the script; no invented metrics.

| genre_id | Script element | props field |
|----------|----------------|-------------|
| product-ad | product name / one-line promise / 2-4 benefit beats / CTA line | `productName` / `tagline` / `features[]` / `cta` |
| ui-tutorial | video title / one beat per UI action (title + one sentence + screenshot file) | `title` / `steps[]{title,body,screenshot}`; `secondsPerStep` = VO seconds per beat |
| quote-short | the line / source | `quote` / `attribution` |
| data-chart | headline / unit / real data rows | `title` / `unit` / `series[]{label,value}` |
| captioned-social | spoken footage | `videoSrc` + `captions[]` from `captions.md` |

Brand: `accent`, `background`, `text` (+ `track` data-chart, `ctaText` product-ad) from `docs/design/BRAND.md`; check contrast.
Duration: see `templates/README.md` table. Features beyond ~4 or steps whose text wraps >3 lines → split into a second video.
Write the filled props into PLAN.md and `props.json` before preview.
