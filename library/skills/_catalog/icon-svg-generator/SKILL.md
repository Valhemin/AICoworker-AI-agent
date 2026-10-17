---
name: icon-svg-generator
description: "Generate high-quality SVG app icons, favicons, launcher icons, and brand marks using a render-verify-fix loop. Produces crisp, scalable output across all..."
---

TRIGGER: user requests icon, logo, app icon, favicon, launcher icon, splash icon, brand mark, PWA icon, store listing graphic, or any visual identity asset
OUTPUT: detailed — SVG source + rendered PNG variants + platform-wired build config
SKIP: photo-realistic images or illustrations requiring raster AI generation; existing icon system already in place and only needs resizing

---

# Icon & SVG Generator

## Core problem this skill solves

AI generates ugly icons because it writes SVG once and never sees the result. This skill enforces a **render → inspect → fix loop** until the icon looks right.

---

## Step 0 — Gather intent (ask these, then proceed)

1. **Type** — app icon / favicon / logo / brand mark / illustration? (different workflows below)
2. **Platform targets** — web favicon / PWA / iOS / Android / macOS / Electron / all?
3. **Style** — flat geometric / outlined / filled / gradient / duotone / 3D-ish?
4. **Concept** — what should the icon *mean* or *show*? (a letter, an abstract shape, a metaphor?)
5. **Colors** — brand hex values, or generate a palette?
6. **Output format** — SVG only / also PNG at specific sizes?

If user says "just make something good" — pick a clean geometric approach and proceed.

---

## Step 0.5 — Concept validation (REQUIRED before writing any SVG)

**Bad icons come from unclear concepts, not bad code.** Before writing a single SVG tag:

### 1. Generate 3 concept directions (REQUIRED — pick the most interesting one)

Before committing to any concept, generate **3 distinct visual directions** for the same idea. Then pick the one with the most personality.

For each direction, describe it in one sentence using geometric primitives + spatial relationships:

Example for "AI assistant" icon:
> A) "Rounded square background with a minimal spark/bolt centered" — safe, generic  
> B) "Abstract brain outline formed by two interlocking arcs, one line thinner — creates depth with just 2 paths" — interesting  
> C) "Circuit node cluster: 1 large circle dominant, 3 small satellite circles connected by thin lines — implies network intelligence" — distinctive ✓

**Choose the direction with the most visual character** — not the safest one. The generic option (circle + checkmark, square + text, plain letter) is almost always wrong. Ask: *would this icon stand out in an App Store row, or blend in?*

If all 3 directions feel generic → brainstorm metaphors. A "finance" app doesn't have to be a dollar sign. It could be a balance scale, a growing bar, a leaf (growth), an arrow threading through a gap (precision). The metaphor is the creative work — the SVG is just execution.

If concept is unclear → describe it in one sentence using only geometric primitives and spatial relationships. Too vague = will produce clutter.

### 2. Count the elements
- **Icons: maximum 3 elements.** 1 dominant shape + 1 accent + 1 optional detail. More = cluttered.
- **Logos: maximum 4 elements** (background + 1-2 shapes + optional text/lettermark).

If your concept needs more than 3 elements to communicate → it's too complex. Drop the least important element.

### 3. Look up reference icons (web search)
Before drawing, search for how established icon libraries handle this concept:
- Search: `"[concept] icon svg heroicons"` or `"[concept] icon tabler"` or `"[concept] SF symbols"`
- Understand the visual shorthand used (e.g. "search" = magnifying glass, "settings" = gear, "AI" = circuit nodes or spark)
- **You don't copy — you understand the visual convention**, then execute your own version

### 4. Visual anchor rule
Every icon must have **one dominant shape that occupies 60–70% of the canvas**. Everything else is secondary and should be visually lighter (thinner stroke, smaller size, lower opacity, or negative space cutout).

If after drafting the SVG no single shape clearly dominates → restart with a simpler concept.

### Logo workflow (different from icon)
Logos need brand personality, not just geometry. Before designing:
1. Ask: 3 words that describe the brand personality (e.g. "fast, minimal, professional")
2. Choose logo type: **lettermark** (initial letters, most reliable) / **wordmark** (styled text) / **logomark** (abstract symbol) / **combination**
3. For lettermarks — use path data (outlined text), not `<text>` elements. More reliable across platforms.
4. For abstract symbols — pick a single metaphor that maps to the brand's core value, then apply the 3-element max rule.

---

---

## Step 1 — Design quality

### Squint test
Blur your eyes — icon must still be readable as a blob. Run mentally before SVG, literally after each render. If it fails, simplify.

### Visual hierarchy
One dominant shape (60–70% canvas, highest contrast) → one accent (20–30%, secondary color or cutout) → one optional detail (max 10%, never competes). Two shapes equal in weight = cluttered. Fix: make one bigger, bolder, or higher contrast.

### Negative space
Cut accent INTO dominant shape via `clip-path` or boolean subtract — a circle with a star cut out reads better than stacked shapes. Minimum padding 12% all sides (≥62px at 512px). Don't fill every area.

### Optical compensation
Circles look smaller than same-size squares → make circles ~5% larger. Triangles look low → shift up 3–4%. Optical center is above mathematical center → shift composition up ~2–3%.

### Color harmony
Proven schemes: (1) monochromatic + white cutout — most reliable; (2) analogous (adjacent on color wheel + light neutral); (3) deep/muted background + one saturated accent. Formula: background lightness ≤ 40% OR ≥ 90%; foreground contrast ≥ 4.5:1. Avoid 3+ saturated colors at equal brightness; gradient background + gradient foreground simultaneously; similar hue + similar lightness.

### Geometry and gradients
Use geometric primitives (circle, rect, path, polygon) — never freehand paths. Canvas: `512×512` `viewBox="0 0 512 512"`. Min stroke weight: 24px. Corner radius `rx="112"` for iOS-style. Gradients: 2–3 stops max, light from top-left, white highlight at 0% `stop-opacity: 0.15–0.25`. Shadow: `feDropShadow dx="0" dy="6" stdDeviation="12" flood-opacity="0.2"`, tinted to background, never pure black.

See **Appendix — Style consistency table** for per-style stroke/fill/gradient/depth reference.

---

## Step 2 — SVG structure template

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- gradients, filters here -->
  </defs>

  <!-- Background layer -->
  <rect width="512" height="512" rx="112" ry="112" fill="url(#bg-gradient)" />

  <!-- Icon shape layers -->

  <!-- Highlight overlay (optional) -->
  <rect width="512" height="256" rx="112" ry="112" fill="white" opacity="0.06" />
</svg>
```

`rx="112"` gives the standard iOS-style rounded rect at 512px (22% radius).

---

## Step 3 — Render-verify-fix loop (REQUIRED)

Do NOT claim the icon is done after writing SVG once.

### Loop:

1. **Write** the SVG to `icon-draft.svg`
2. **Render** — use Playwright MCP or Chrome DevTools MCP to open and screenshot it:
   ```
   Open file:///<absolute-path>/icon-draft.svg in browser, screenshot at 512×512
   ```
   If MCP unavailable: write a minimal HTML wrapper and ask user to open it, OR use Python:
   ```python
   # ponytail: headless render; upgrade to playwright if MCP available
   import subprocess
   subprocess.run(["open", "icon-draft.svg"])  # macOS preview
   ```
3. **Inspect** — look at the screenshot. Check:
   - [ ] Shapes are crisp, not blurry or aliased
   - [ ] Proportions look correct at full size
   - [ ] Colors look good (not muddy, not too bright)
   - [ ] Would this read at 32×32? (mentally squint)
   - [ ] Is there enough padding? Does it fit circular mask?
4. **Fix** — edit `icon-draft.svg`, re-render
5. **Repeat** until all checks pass — minimum 2 iterations, maximum 6

### Small-size check (mandatory before finalizing):

Render at 32×32 and 16×16. If the icon becomes unreadable:
- Simplify — remove details, increase stroke weight
- Consider a letterform or single bold shape for small sizes

---

## Step 4 — Export to platform sizes

Once SVG is approved, generate PNG variants:

| Platform | Sizes needed |
|---|---|
| Web favicon | 16, 32, 48 |
| PWA | 192, 512 (maskable: add 10% safe zone) |
| iOS | 20, 29, 40, 60, 76, 83.5, 1024 (App Store) |
| Android | 48, 72, 96, 144, 192 (+ adaptive foreground 432×432) |
| macOS | 16, 32, 64, 128, 256, 512, 1024 |
| Electron | 16, 32, 48, 64, 128, 256, 512 |
| Windows | 16, 24, 32, 48, 64, 128, 256 |

**Export command (Node, if sharp available):**
```js
import sharp from 'sharp'
const sizes = [16, 32, 48, 192, 512]
for (const s of sizes) {
  await sharp('icon-draft.svg').resize(s, s).png().toFile(`icon-${s}.png`)
}
```

**Export command (Python, if cairosvg available):**
```python
import cairosvg
for s in [16, 32, 48, 192, 512]:
    cairosvg.svg2png(url="icon-draft.svg", write_to=f"icon-{s}.png", output_width=s, output_height=s)
```

**If neither available:** Inkscape CLI (`inkscape --export-png=...`) or ask user to export from browser.

---

## Step 5 — Wire into build system

| Project type | Config to update |
|---|---|
| Web / Next.js | `app/favicon.ico`, `app/icon.png`, `<link rel="icon">` in layout |
| PWA | `manifest.json` → `icons` array |
| React Native (Expo) | `app.json` → `icon`, `splash`; run `npx expo prebuild` |
| React Native (bare) | `android/app/src/main/res/`, `ios/AppName/Images.xcassets/` |
| Flutter | `pubspec.yaml` + `flutter_launcher_icons` package |
| Electron | `build.icon` in `package.json`; `build/icons/` dir |
| Tauri | `tauri.conf.json` → `bundle.icon` |
| macOS / iOS native | Xcode `Assets.xcassets/AppIcon.appiconset/` |

---

## Anti-patterns to avoid

**Creativity failures:**
- Do NOT default to the first, safest concept — "rounded square + letter initial" is the most overused icon in existence. It's a last resort, not a starting point.
- Do NOT reuse the same visual formula across every icon (circle + inner symbol). Vary the approach: sometimes the background is the design, sometimes it's a standalone mark with no background, sometimes it's two interlocking shapes.
- Do NOT confuse "simple" with "boring." Simple = few elements, each doing clear work. Boring = no visual tension, no personality, no distinctive quality. A monochromatic icon with strong shape character beats a rainbow gradient on a plain letter.
- Do NOT pick the same blue/purple gradient for every AI-related icon — it's become the "generic tech" cliché of 2024–2026. Find a palette that fits *this* product.

**Technical failures:**
- Do NOT use `<text>` elements for letterform icons — they render differently per OS. Use path data for letters if needed.
- Do NOT clip icon content to the exact canvas edge — always leave padding.
- Do NOT use more than 3 gradient stops in simple flat icons — more reads as muddy.
- Do NOT skip the render loop claiming "SVG looks right in code" — it almost never does.
- Do NOT use emoji as icon source — they are not scalable or brand-controlled.
- Do NOT stack 4+ shapes of equal visual weight — produces the "lines and colors tangled together" problem. Establish hierarchy first.

---

## Done checklist

- [ ] SVG renders crisply at 512×512
- [ ] Reads at 32×32 (simplified if needed)
- [ ] No pure black or pure white
- [ ] Correct padding for circular mask
- [ ] PNG variants exported for all target platforms
- [ ] Wired into build config
- [ ] Source `icon.svg` committed to repo

---

## Appendix — Style consistency table

| Style | Strokes | Fill | Gradient | Depth |
|---|---|---|---|---|
| Flat | None or 0px | Solid | No | No shadow |
| Outlined | 24–32px, rounded caps | None or light | No | No shadow |
| Filled + shadow | None | Solid | Optional 2-stop | feDropShadow |
| Glassmorphism | 1px light border | Semi-transparent | Subtle radial | blur filter |
| 3D-ish | None | Gradient 3-stop | Yes, top-left light | feDropShadow tinted |

Don't mix styles — outlined strokes on a filled gradient icon = inconsistent.
