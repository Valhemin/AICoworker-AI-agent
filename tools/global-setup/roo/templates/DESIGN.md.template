# DESIGN.md

## Purpose

This file defines how UI should be generated for this product.

The goal is not to create a generic clean interface.  
The goal is to create UI that feels specific, intentional, useful, memorable, and production-ready.

The final UI should feel like it was designed by a thoughtful product designer, not assembled from common AI-generated templates.

---

## Product context

Product name: [Product name]  
Product type: [SaaS / dashboard / mobile app / landing page / e-commerce / admin tool / portfolio / marketplace / internal tool]  
Primary audience: [Who uses this product? Be specific.]  
Primary user goal: [What does the user want to accomplish?]  
Business goal: [Sign up / purchase / book / subscribe / manage / publish / learn / explore]  
Brand maturity: [new / growing / established / premium / experimental]  
Core feeling: [trustworthy / sharp / warm / premium / technical / playful / editorial / calm / bold]

The UI must be designed around the actual product context, not around generic startup patterns.

---

## Generation mode

Before designing, choose one mode.

### Mode A: Consistency

Use this when the product already has a direction and the goal is to keep screens visually consistent.

Rules:
- Keep the same visual concept.
- Keep the same color mood.
- Keep the same spacing rhythm.
- Reuse component patterns.
- Do not introduce a new brand direction unless requested.
- Variations should happen through content, layout details, and states.

Expected result:
- Similar UI across multiple runs.
- Strong design system consistency.
- Best for production apps and multi-page products.

### Mode B: Exploration

Use this when the goal is to discover a more original visual direction.

Rules:
- Generate 3 distinct visual concepts before designing.
- Each concept must have a different layout, motif, mood, and interaction style.
- Do not create 3 versions of the same layout with different colors.
- Choose the strongest concept and explain why.
- Commit fully to the chosen concept.

Expected result:
- More different UI across runs.
- More original visual outcomes.
- Best for landing pages, early-stage products, brand exploration, and creative interfaces.

### Mode C: Premium refinement

Use this when improving an existing UI.

Rules:
- Preserve the core information architecture.
- Improve hierarchy, spacing, typography, components, and polish.
- Remove generic decoration.
- Add product-specific details.
- Do not redesign everything unnecessarily.

Expected result:
- Same structure, better execution.
- Best for making an existing design feel more professional.

### Mode D: Experimental

Use this when originality matters more than convention.

Rules:
- Avoid standard SaaS section order.
- Use editorial, immersive, narrative, or asymmetric composition.
- Create one memorable visual device.
- Keep usability and readability intact.
- Do not sacrifice clarity for novelty.

Expected result:
- More surprising UI.
- Higher originality.
- Higher risk.
- Best for creative products, campaigns, portfolios, and brand-heavy pages.

### Mode E: Production

Use this when the design must be implemented immediately.

Rules:
- Use practical layouts and components.
- Keep visuals distinctive but buildable.
- Include responsive behavior.
- Include interaction states.
- Avoid overly complex decorative systems.

Expected result:
- Reliable, clean, usable UI.
- Less experimental.
- Best for real product implementation.

---

## Variation controls

Every UI generation must define these values before designing:

```yaml
variation:
  noveltyLevel: 3        # 1 = safe, 5 = highly original
  consistencyLevel: 3    # 1 = flexible, 5 = strict design system
  density: "medium"      # low / medium / high
  mood: "calm"           # calm / bold / playful / premium / technical / editorial / warm
  layoutRisk: 3          # 1 = conventional, 5 = unconventional
  decorationLevel: 2     # 1 = minimal, 5 = expressive
```

Rules:
- noveltyLevel 1–2: prioritize familiar usability.
- noveltyLevel 3: create a distinct but practical layout.
- noveltyLevel 4–5: create a memorable visual concept and avoid standard templates.
- consistencyLevel 4–5: reuse tokens and components strictly.
- layoutRisk 4–5: avoid centered hero, equal card grids, and predictable SaaS structure.
- decorationLevel 1–2: use subtle detail.
- decorationLevel 4–5: use expressive visuals, but only when connected to the product.

---

## Run behavior

To get similar outputs across multiple runs:

```yaml
mode: "Consistency"
noveltyLevel: 2
consistencyLevel: 5
layoutRisk: 2
decorationLevel: 1
```

To get different and more creative outputs across multiple runs:

```yaml
mode: "Exploration"
noveltyLevel: 4
consistencyLevel: 2
layoutRisk: 4
decorationLevel: 2
```

To improve an existing UI without changing the whole direction:

```yaml
mode: "Premium refinement"
noveltyLevel: 2
consistencyLevel: 4
layoutRisk: 2
decorationLevel: 2
```

The same product context plus Consistency mode should create similar UI.  
The same product context plus Exploration mode should create meaningfully different UI concepts.

---

## Product personality

The product should feel:

- Specific, not generic.
- Confident, not loud.
- Modern, not trend-chasing.
- Human, not sterile.
- Crafted, not over-decorated.
- Useful before beautiful.
- Distinctive without becoming confusing.

Avoid making the product look like a generic AI startup, SaaS landing page, or Tailwind template with different text.

---

## Design principles

### 1. Clarity before decoration

Every screen must answer:

- What is this?
- Who is it for?
- What can the user do here?
- What should the user do next?

Decoration must support comprehension, trust, or emotion.  
Decoration must not compete with the main action.

### 2. Product-specific visual concept

Before generating UI, define one visual concept in a single sentence.

Bad:
- Modern and clean.
- Minimal and professional.
- Futuristic AI interface.

Better:
- A logistics dashboard inspired by shipment labels, route timelines, and operational control rooms.
- A writing tool designed like an editorial desk with margin notes, drafts, and revision layers.
- A finance app structured like a calm ledger with precise rows, balance blocks, and audit-friendly details.

### 3. Avoid generic AI-looking structure

Do not default to:

- Centered hero with gradient headline.
- Three identical feature cards.
- Floating dashboard mockup.
- Purple-blue gradients.
- Random glassmorphism.
- Abstract glowing orbs.
- Vague icons.
- Fake charts.
- Placeholder testimonials.

### 4. Designed density

Use density based on product type.

Marketing page:
- Spacious.
- Persuasive.
- Memorable.
- Strong visual rhythm.

Dashboard:
- Dense but readable.
- Clear hierarchy.
- Decision-oriented.
- Fast to scan.

Mobile app:
- Thumb-friendly.
- Direct.
- Minimal friction.
- Strong primary action.

Admin tool:
- Compact.
- Structured.
- Predictable.
- Efficient.

### 5. Real content only

Avoid placeholder content.

Bad:
- Feature One
- Lorem ipsum
- Smart insights
- Powerful automation
- Seamless experience

Better:
- Review 12 orders waiting for confirmation
- See failed payments before they become churn
- Turn customer messages into prioritized tasks
- Export this month’s payout report
- Compare supplier delays by region

---

## Visual language

### Overall feel

The UI should feel:

- Premium but not cliché.
- Clean but not empty.
- Friendly but not childish.
- Modern but not generic.
- Unique but still usable.

### Composition

Prefer:

- Editorial layouts.
- Left-weighted hero sections.
- Split layouts.
- Asymmetric but disciplined grids.
- Visual anchors.
- Sticky side panels.
- Contextual notes.
- Product-specific diagrams.
- Real interface fragments.
- Varied section rhythm.

Avoid:

- Every section centered.
- Every section full-width.
- Repeated card grids.
- Identical visual rhythm from top to bottom.

### Shape language

Use radius intentionally.

- Small controls: subtle radius.
- Cards: medium radius.
- Large containers: larger radius only when useful.
- Pills: only for tags, status, or compact filters.

Do not make every element overly rounded.

### Texture and depth

Use:

- Hairline borders.
- Subtle shadows.
- Soft background tints.
- Fine dividers.
- Optional grid, paper grain, map line, ledger line, code gutter, or product-specific motif.

Avoid:

- Heavy drop shadows.
- Random background blobs.
- Excessive glassmorphism.
- Neon effects unless brand-approved.

---

## Tokens

```yaml
tokens:
  color:
    background: "#FAF8F3"
    surface: "#FFFFFF"
    surfaceMuted: "#F1EEE7"

    foreground: "#141414"
    foregroundSoft: "#2B2B2B"
    muted: "#6F6A61"
    mutedLight: "#A8A196"

    primary: "#151515"
    primaryForeground: "#FFFFFF"

    accent: "#B86B3E"
    accentSoft: "#EFE0D4"
    accentForeground: "#24120A"

    success: "#2F7D4F"
    successSoft: "#E1F1E7"

    warning: "#B7791F"
    warningSoft: "#F7E9C8"

    danger: "#B42318"
    dangerSoft: "#F8DAD7"

    border: "#DED8CC"
    borderStrong: "#BEB6A8"

    focus: "#111111"

  typography:
    fontSans: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSerif: "Fraunces, Georgia, serif"
    fontMono: "JetBrains Mono, SFMono-Regular, Consolas, monospace"

    scale:
      xs: "0.75rem"
      sm: "0.875rem"
      base: "1rem"
      lg: "1.125rem"
      xl: "1.25rem"
      "2xl": "1.5rem"
      "3xl": "1.875rem"
      "4xl": "2.25rem"
      "5xl": "3rem"
      "6xl": "4rem"

    weight:
      regular: 400
      medium: 500
      semibold: 600
      bold: 700

    lineHeight:
      tight: 1.05
      heading: 1.15
      body: 1.55
      relaxed: 1.7

    letterSpacing:
      tight: "-0.03em"
      normal: "0em"
      wide: "0.04em"

  spacing:
    "2xs": "0.25rem"
    xs: "0.5rem"
    sm: "0.75rem"
    md: "1rem"
    lg: "1.5rem"
    xl: "2rem"
    "2xl": "3rem"
    "3xl": "4rem"
    "4xl": "6rem"
    "5xl": "8rem"

  radius:
    xs: "0.25rem"
    sm: "0.375rem"
    md: "0.75rem"
    lg: "1rem"
    xl: "1.5rem"
    full: "999px"

  shadow:
    sm: "0 1px 2px rgba(20, 20, 20, 0.06)"
    md: "0 8px 24px rgba(20, 20, 20, 0.08)"
    lg: "0 20px 60px rgba(20, 20, 20, 0.12)"

  motion:
    fast: "120ms"
    normal: "200ms"
    slow: "360ms"
    easeOut: "cubic-bezier(0.16, 1, 0.3, 1)"
    easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)"
```

Token rules:
- Tokens are a starting point, not a prison.
- Adjust colors to match product context.
- Do not use the same warm beige palette for every product.
- Keep accessibility and contrast intact.
- Use accent color with restraint.

---

## Typography rules

### Headings

Headings should be expressive but readable.

Rules:
- Use display type only when it improves hierarchy.
- Avoid generic gradient text.
- Prefer strong copy over visual tricks.
- Headlines must be specific to the product.

Bad:
- Build better workflows with AI.

Better:
- Turn every livestream comment into a confirmed order.

### Body text

Rules:
- Keep paragraph width between 55–75 characters.
- Use muted text only for secondary information.
- Avoid long blocks of text.
- Maintain strong contrast.

### Labels and microcopy

Labels must be precise.

Bad:
- Submit
- Manage
- Data
- Item
- Learn more

Better:
- Create workspace
- Review flagged invoices
- Export payout report
- Add supplier
- Compare plans

---

## Layout rules

### Grid

Use a responsive grid:

- Desktop: 12 columns.
- Tablet: 6 columns.
- Mobile: 4 columns.
- Max content width: 1120px–1280px.
- Allow intentional breakout sections when visually meaningful.

### Section rhythm

Avoid repeating the same layout pattern.

Use a mix of:

- Split hero.
- Editorial text block.
- Product UI preview.
- Workflow section.
- Comparison section.
- Timeline.
- Proof section.
- Dense data panel.
- Interactive preview.
- FAQ.
- CTA.

### Mobile behavior

Mobile must be intentionally designed, not just compressed.

Rules:
- Keep the primary action visible.
- Use clear hierarchy.
- Collapse complex visuals into summaries.
- Tap targets must be at least 44px.
- Avoid horizontal scrolling unless intentional.

---

## Component rules

### Buttons

Primary button:
- Use for the main action only.
- High contrast.
- Clear action text.

Secondary button:
- Lower visual weight.
- Used for exploration or comparison.

Tertiary button:
- Text-style.
- Used for low-priority actions.

Avoid multiple primary buttons in one viewport.

### Cards

Cards should have a real purpose.

A good card includes:
- Clear title.
- Useful content.
- Strong hierarchy.
- Meaningful action or takeaway.

Avoid:
- Decorative cards with vague text.
- Identical icon-title-paragraph cards.
- Excessive shadows and radius.

### Navigation

Navigation should be simple and confident.

Rules:
- Use clear labels.
- Show current location.
- Keep top-level items focused.
- Make mobile navigation easy to open, scan, and close.

### Forms

Forms should feel trustworthy.

Rules:
- Use visible labels.
- Do not rely only on placeholders.
- Group related fields.
- Explain sensitive fields.
- Show inline validation.
- Make errors specific.

Bad:
- Invalid input.

Better:
- Enter a valid work email, for example name@company.com.

### Tables and data

For data-heavy UI:

- Align numbers properly.
- Use clear column labels.
- Show time ranges.
- Provide filters when needed.
- Use status labels with text, not color alone.
- Include empty, loading, error, and success states.

### Empty states

Empty states should guide action.

Bad:
- No data found.

Better:
- No invoices need review. New flagged invoices will appear here automatically.

---

## Interaction states

Every interactive component must include:

- Default state.
- Hover state.
- Active state.
- Focus-visible state.
- Disabled state.
- Loading state when relevant.
- Error state when relevant.
- Success state when relevant.

### Hover

Hover should be subtle and purposeful.

Examples:
- Slight background shift.
- Border darkening.
- Small elevation change.
- Reveal secondary action.

Avoid dramatic animations for basic controls.

### Focus

Focus states must be visible and accessible.

Do not remove focus outlines.

### Loading

Loading should preserve layout stability.

Use:
- Skeletons for structured content.
- Button spinners for submitted actions.
- Progress indicators for multi-step flows.

Avoid unnecessary full-page spinners.

### Motion

Motion should help users understand state changes.

Use motion for:
- Revealing contextual UI.
- Page transitions.
- Confirmation.
- Expanding and collapsing content.

Avoid:
- Constant floating animation.
- Slow decorative animation.
- Motion that delays task completion.

Respect `prefers-reduced-motion`.

---

## Accessibility rules

The UI must be usable by default.

Rules:
- Meet WCAG AA contrast.
- Do not rely on color alone.
- Touch targets should be at least 44px.
- Icons need labels or supporting text.
- Forms need real labels.
- Errors must be associated with fields.
- Keyboard navigation must work.
- Focus order must match visual order.
- Modals must trap focus.
- Modals must close with Escape.
- Images need useful alt text unless decorative.
- Motion must respect `prefers-reduced-motion`.

---

## Content rules

### Voice

The writing should be:

- Specific.
- Calm.
- Useful.
- Confident.
- Human.

Avoid inflated marketing language.

Bad:
- Revolutionize your workflow with powerful AI innovation.

Better:
- Turn scattered customer requests into prioritized tasks in one place.

### CTA rules

CTA text must describe the action.

Bad:
- Click here
- Submit
- Get started

Better:
- Create your workspace
- Compare plans
- Review today’s tasks
- Start a 14-day trial

### Proof

Put proof close to claims.

Use:
- Customer quote.
- Real metric.
- Before/after comparison.
- Screenshot detail.
- Workflow example.
- Security note.
- Integration proof.
- Use case.

Avoid fake-sounding testimonials.

---

## Page-specific guidance

### Landing page

Required:
- Specific product promise.
- Product visual that shows actual usage.
- Problem section grounded in real pain.
- Feature section organized by workflow.
- Proof section.
- Pricing or conversion section when relevant.
- FAQ with real objections.
- Footer with trust signals.

Avoid:
- All-in-one platform.
- Boost productivity.
- Seamless experience.
- Fake dashboards with meaningless charts.

### Dashboard

Required:
- Clear page title.
- Main metric or primary task.
- Secondary metrics.
- Recent activity.
- Filters or search when needed.
- Empty/loading/error states.
- Contextual actions near relevant data.

Avoid:
- Decorative charts with no decision value.
- Too many equal-weight cards.
- Metrics without labels or time range.

### Authentication

Required:
- Focused layout.
- Clear form.
- Helpful error states.
- Password manager compatibility.
- Subtle trust signal.

Avoid:
- Overly decorative login screens.
- Distracting marketing panels.

### Settings

Required:
- Clear grouping.
- Predictable labels.
- Save states.
- Separate destructive actions.
- Confirmation for dangerous changes.

Avoid:
- Hiding critical settings.
- Mixing account, billing, team, and security into one unclear page.

---

## Concept diversity

In Exploration mode, create 3 different concepts before choosing one.

Each concept must differ by:

- Layout composition.
- Visual motif.
- Typography mood.
- Color atmosphere.
- Interaction style.
- Section rhythm.

Do not create 3 versions of the same layout with different colors.

Example:

### Concept 1: Editorial operating system

A calm, text-led interface with side notes, structured panels, and dense but readable information.

### Concept 2: Command center

A technical interface with status bars, compact modules, live activity, and operational hierarchy.

### Concept 3: Narrative product tour

A story-driven layout where each section reveals one real user workflow step by step.

Choose the concept that best supports the product goal.

---

## Anti-sameness rule

Before finalizing the UI, check whether the design relies on these overused structures:

- Centered hero with headline, paragraph, and two buttons.
- Three feature cards in a row.
- Large dashboard mockup below the hero.
- Alternating text-image sections.
- Generic testimonial cards.
- Pricing cards with identical structure.
- Abstract gradient background.
- Floating glass panels.
- Icon grid with vague feature names.

If the design uses more than two of these patterns, revise it.

Replace generic structure with product-specific structure.

Examples:
- Finance app: ledger-inspired layout, audit trails, balance blocks.
- Logistics app: tracking timeline, route panels, status checkpoints.
- Writing app: document margins, annotations, draft history.
- Learning app: workbook notes, lesson paths, progress markers.
- Marketplace: discovery grid, filters, seller context, trust signals.
- Developer tool: code gutters, diff highlights, terminal rhythm.
- Healthcare app: calm records, clear next steps, trust-first hierarchy.

---

## Anti-patterns

Do not use:

- Generic purple/blue AI gradients unless explicitly approved.
- Centered hero + three identical cards as the default layout.
- Vague feature names like Smart Insights, Automation, Analytics.
- Emojis as primary icons unless the brand supports it.
- Random glass panels.
- Floating glowing orbs.
- Fake charts with meaningless data.
- Overly rounded everything.
- Placeholder testimonials.
- Lorem ipsum.
- Same card repeated across every section.
- Low-contrast gray text.
- Icons without labels.
- Decorative complexity that reduces clarity.
- UI that looks like a generic Tailwind or SaaS template.

---

## Required output structure

When generating a UI, always produce the work in this order:

### 1. Product interpretation

Explain:
- Who is the user?
- What is their main goal?
- What emotion should the UI create?

### 2. Generation mode and variation

Define:
- Mode.
- noveltyLevel.
- consistencyLevel.
- density.
- mood.
- layoutRisk.
- decorationLevel.

### 3. Visual concept

Define one clear visual concept in a single sentence.

The concept must be specific to the product.  
Do not use generic concepts like “modern and clean”.

### 4. Layout strategy

Explain:
- Page structure.
- Primary action.
- Secondary actions.
- Why the layout fits the product.

### 5. Design system application

Define:
- Colors.
- Typography.
- Spacing.
- Components.
- Interaction states.
- Responsive behavior.

### 6. Final UI

Generate the actual UI.

Rules:
- Use realistic content.
- Avoid placeholders.
- Make the first viewport memorable.
- Keep the design accessible.
- Include states where relevant.

### 7. Self-critique

Before finalizing, identify anything that still feels generic.

Then improve it.

---

## Final generation instruction

When using this design file, follow this instruction:

Before generating the UI, first define a unique visual concept for this product in one sentence.  
Then design around that concept consistently.

The result should be clear, useful, distinctive, and production-ready.

The interface should not feel like a default AI-generated layout.  
It should feel like it belongs to this product and this audience.