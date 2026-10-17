# Young User Standard

Default audience for all projects unless stated otherwise.
Age range: 16–30. Native mobile. Short attention. High taste. Zero tolerance for clunky.

This is not a style guide. It is a behavioral contract — what the product must do to earn and keep attention.

---

## The Core Principle

**First impression = 3 seconds.** If a user doesn't immediately understand what the product does and why it's for them, they leave. Not to try again. Just leave.

The UI must:
1. Show value before asking for anything (no sign-up wall, no tutorial gate)
2. Feel native to the device (not a web page crammed into a phone)
3. Respond to every interaction instantly (tap → visual feedback in ≤100ms)
4. Look like something they'd screenshot and share

---

## Content: Voice & Copy

### Tone
- Casual, warm, direct. Brand is a friend, not a company.
- "Nothing here yet" → not "No data available"
- "Try it now!" → not "Start using this feature"
- "Oops, connection is weak" → not "Connection failed (ERR_NETWORK)"
- Never sound like a manual. Never sound like a legal document.

### Copy Rules (non-negotiable)
- **Button text = verb + outcome**, not verb alone.
  - "Create project" ✓ — "Submit" ✗ — "OK" ✗
  - "View results" ✓ — "Continue" ✗
- **Error messages = what + why + what next** (3 parts, 1 sentence each max)
  - "Image too large. Limit is 10MB. Try compressing it." ✓
  - "Upload failed." ✗
- **Empty states = invitation, not absence**
  - "Nothing here yet — add your first one?" ✓
  - "No data available." ✗
- **Loading states = progress, not waiting**
  - "Searching..." / "Almost there..." ✓
  - "Loading..." ✗
- **Onboarding tooltips ≤ 8 words.** If it needs more, the UI is wrong.
- **Placeholder text ≠ label.** Never use placeholder as the only label.
- **Headlines**: punchy, ≤6 words. Subtext: ≤15 words. If longer, cut.

### Banned Copy (AI tells — instant uninstall)
- "Welcome to [App Name]!" (opener)
- "Seamlessly", "Effortlessly", "Powerful", "Robust", "Cutting-edge"
- "Please enter your [field]" as label text
- "An error has occurred. Please try again."
- "This feature is coming soon."
- Any sentence starting with "In order to..."

---

## Interaction: Feel & Responsiveness

### The 100ms Rule
Every tap/click must produce visual feedback within 100ms — even if the operation takes 3 seconds.
- Button: pressed state (scale 0.97, brightness dim) at tap, not at response
- Toggle: flip immediately, rollback only on explicit server error
- List item: highlight row instantly, then navigate

### Optimistic UI (default everywhere)
Update the UI before the server confirms. Rollback only on error.
- Like/bookmark: flip icon immediately
- Delete: remove row immediately (with undo toast)
- Form submit: show success state, then patch if server fails
- **Exception**: financial transactions, irreversible destructive actions → wait for confirm

### Gesture-Native (mobile)
- **Swipe right**: go back / dismiss / mark done (context-dependent, but always swipe-right = "positive")
- **Swipe left**: delete / archive / reject
- **Pull down**: refresh
- **Long press**: context menu / multi-select
- **Pinch**: zoom (if content supports it)
- Never use double-tap as primary action (it conflicts with zoom)
- All gestures must have a tap fallback (accessibility)

### Haptics (mobile native apps)
- Light: successful small action (like, toggle, swipe-dismiss)
- Medium: important confirmation (post, send)
- Heavy: destructive action warning (delete, clear all)
- Error: short buzz on failure
- Do not overuse — silence is fine for passive events

---

## Visual: Style Direction

### Kill These Patterns (AI defaults — never use)
These are the tells. They signal "made by AI, not by a designer":
- **3 equal-width feature cards in a row** — the most overused layout in existence
- **Hero with big headline left, paragraph floating right** — split-header antipattern
- **Inter + #8B5CF6 (AI purple) + white card on gray** — the default AI palette
- **Gradient button on white card** with rounded-16px — seen on 10,000 SaaS sites
- **Dashboard with 4 metric cards at top + table below** — default admin template
- **Sidebar nav + top header + content area** — tired layout for apps that could be bottom-nav
- **Zigzag left-right-left-right** feature sections — more than 2 zigzags = lazy
- **"Trusted by 500+ companies" logo wall** with gray placeholder logos
- **Floating action button (FAB) center-bottom** — overused, conflicts with iPhone home gesture
- Beige + brass "premium consumer" palette
- Fraunces or Instrument Serif as display font
- Generic stock photos of people smiling at laptops

### Architecture Patterns That Actually Work for Young Users

**Instead of dashboard → try:**

| Boring | Fresh |
|---|---|
| Dashboard with cards + table | **Feed / timeline** — content comes to user, not user hunts for data |
| Left sidebar nav | **Bottom tab bar** (mobile) or **command palette** (desktop/web) — faster, thumb-native |
| Form → submit → result | **Inline live preview** — see result as you type |
| List page → detail page → edit page | **Expandable cards** or **sheet overlays** — stay in context |
| Modal for everything | **Inline editing** + **bottom sheet** (mobile) / **popover** (web) |
| Empty state with no action | **Guided first-run** — the empty state IS the onboarding |
| Settings page | **Contextual settings** — settings live next to the feature they affect |
| Separate "help" section | **Progressive disclosure tooltips** + inline explainers at first use |
| Tabbed navigation with 6+ tabs | **Contextual nav** that changes based on what user is doing |
| Search as a page | **Universal search bar** always accessible (Cmd+K on desktop, top of screen mobile) |

**Layout archetypes that feel fresh:**
- **Bento grid** — variable cell sizes, visual variety, shows relationship between pieces
- **Scroll-driven narrative** — content reveals on scroll, like a story (landing/onboarding)
- **Card drawer** — stack of cards, swipe to navigate between them (Tinder/Duolingo pattern)
- **Split-view with live preview** — left: controls, right: real-time result
- **Floating island UI** — content-aware mini toolbar that appears contextually (like iOS Dynamic Island)
- **Command-first** — primary action is always one keystroke/tap away regardless of where user is

### Hierarchy Without Boredom
- **Scale contrast**: mix one massive element with small — not all medium
- **Weight contrast**: one ultra-bold headline, light body — not all Regular
- **Space contrast**: tight clusters of content, then breathing room — not uniform grid
- **Color contrast**: mostly neutral, one accent that earns its brightness

---

## Animation & Motion

### Philosophy
Motion = communication. Every animation tells the user something about the UI:
- **Expand**: content belongs inside this container
- **Slide from right**: you went deeper in a hierarchy
- **Fade + scale up**: this thing appeared from nothing
- **Slide up from bottom**: sheet/modal coming from below
- **Shake**: wrong input, try again

If an animation can be removed without losing meaning → remove it.

### Library Selection by Platform

**Web (React/Next.js):**
| Use case | Library | Why |
|---|---|---|
| Page transitions, layout animations, gesture | **Motion (Framer Motion)** | Best React integration, GPU-accelerated, reduced-motion built-in |
| Scroll-driven animations | **GSAP + ScrollTrigger** | Industry standard, precise control |
| Number counters, data viz transitions | **react-spring** or **Motion** | Physics-based, feels natural |
| Micro-interactions (hover, press) | **Motion** `whileHover`/`whileTap` | Declarative, no boilerplate |
| Toast / notification entrance | **Sonner** | Opinionated, beautiful defaults |

**Mobile (React Native):**
| Use case | Library | Why |
|---|---|---|
| Screen transitions, layout | **React Native Reanimated** | Runs on UI thread, no JS jank |
| Gesture-driven animations | **Reanimated + react-native-gesture-handler** | Native feel |
| Lottie (JSON animations) | **lottie-react-native** | Use for empty states, success, loading |
| Spring physics | **Reanimated withSpring** | No extra dep, built-in |

**Desktop (Electron/Tauri):**
| Use case | Library | Why |
|---|---|---|
| UI animations | **Motion (Framer Motion)** | Same as web, works in Electron renderer |
| Native window animations | OS-native (don't fight it) | Electron: use `BrowserWindow` animate options |
| Loading/progress | **Sonner** + custom CSS | Lightweight |

**Python GUI (Tkinter/PyQt/CustomTkinter):**
| Use case | Approach |
|---|---|
| Transitions | `after()` timer + manual interpolation, or **CustomTkinter** built-in |
| Lottie/modern animation | Switch to **Electron + web renderer** if animation matters this much |

### Duration Rules
| Interaction | Duration | Easing |
|---|---|---|
| Micro (button press, toggle) | 80–120ms | ease-out |
| Navigation (page/tab switch) | 200–280ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Sheet/modal enter | 300–380ms | spring (stiffness 300, damping 30) |
| Sheet/modal exit | 200–250ms | ease-in (exits faster than enters) |
| Scroll-triggered reveal | 400–600ms | ease-out |
| Success celebration | 600–800ms | spring overshoot OK here |

### What NOT to Animate
- `width`, `height`, `top`, `left`, `margin`, `padding` — always use `transform` instead
- Page background color
- Font size
- Anything that causes layout reflow

### Reduced Motion
Every animation must have a static fallback:
```css
@media (prefers-reduced-motion: reduce) {
  /* collapse to instant state change or simple fade */
}
```
Never skip this. Some users get motion sickness.

---

## Dark Mode

Default for young users — not optional.

### Implementation
- **System-first**: respect `prefers-color-scheme` by default
- **Manual toggle**: always provide — top-right or in profile/settings
- **No mid-page inversion**: one theme per page. Dark nav + light content = broken

### Color token structure (implement from day 1):
```css
:root {
  --color-bg: #FFFFFF;
  --color-surface: #F5F5F5;
  --color-text: #1A1A1A;
  --color-text-muted: #6B7280;
  --color-border: #E5E7EB;
}

[data-theme="dark"] {
  --color-bg: #0A0A0A;
  --color-surface: #1A1A1A;
  --color-text: #F5F5F5;
  --color-text-muted: #9CA3AF;
  --color-border: #2D2D2D;
}
```

- Never hardcode `#FFFFFF` or `#000000` in components — always use tokens
- Primary accent color: **keep same hue, adjust lightness** for dark mode (not a new color)
- Shadows in dark mode: use **inner glow / border** instead of drop shadows (shadows don't work on dark)
- Images: don't invert. Use `mix-blend-mode` for decorative images if needed.

---

## Perceived Performance

### Skeleton vs Spinner
| When | Use |
|---|---|
| Layout shape is known (cards, list rows, profile) | **Skeleton** — shows structure immediately |
| Duration unknown, no layout to predict | **Spinner** — but max 3 seconds before showing "taking longer..." |
| In-place content update (filter, search) | **Blur/dim existing content** while loading, then swap — no flash |
| Background sync | **No indicator** — silent, optimistic, badge when done |

### Skeleton rules:
- Match exact shape of the content it replaces (height, width, border-radius)
- Animate with shimmer/wave, not pulse (wave feels more alive)
- Never show skeleton for < 300ms — just show content directly (use suspense threshold)

### Time perception tricks:
- Start animation the instant user taps — don't wait for network
- Show partial content as it arrives (streaming) over blank wait
- Progress bar for known-duration operations (upload, export)
- "Almost there..." message if >3s — breaks the silence, feels alive
- Celebrate completion — micro-animation on success (checkmark draw, confetti for big wins)

---

## First-Run & Onboarding

### Rule: No Tutorial Gates
Never require users to complete a tutorial before using the app.
Let them explore. Surface help at the moment of need, not upfront.

### Pattern: Guided Empty States
The empty state IS the onboarding. When a user first opens a feature with no data:
1. **Show what it looks like when full** (greyed-out example content)
2. **One clear CTA** to create the first item
3. **Why it's useful** — 1 sentence max
4. No bullet lists. No feature tours.

```
┌─────────────────────────────────────┐
│   [greyed-out preview of a card]    │
│                                     │
│   Your projects will appear here    │
│   Create your first to get started  │
│                                     │
│        [+ Create project]           │
└─────────────────────────────────────┘
```

### Progressive Feature Discovery
- Feature tooltip on first encounter only — never again after dismissed
- "New" badge on features (disappears after viewed)
- Contextual tip when user is about to make a common mistake
- Never show more than 1 tooltip at a time

### Value Before Sign-Up
- Let user do something real before asking for account
- Guest mode / try without login → convert after they've seen value
- If sign-up required: show exactly what they unlock after (not generic "create account")

---

## Mobile-First Execution

### Thumb Zone (iPhone 15 Pro reference, 393pt wide)
```
┌─────────────────────────────────┐
│     ⚠ Hard to reach (stretch)   │  ← avoid primary actions here
│                                 │
│     ✓ Reachable (one thumb)     │  ← ideal for secondary content
│                                 │
│     ✓✓ Easy zone (natural)      │  ← primary actions, nav, CTAs
│  [←] [○] [□]  ← bottom bar      │
└─────────────────────────────────┘
```
- Primary CTAs → bottom 40% of screen
- Destructive actions → top (requires deliberate reach = accidental prevention)
- Navigation → bottom tab bar, max 5 items
- Search → tap top bar to bring keyboard up from bottom (not a separate page)

### Bottom Sheet over Modal
Modal = interrupts flow, covers content, feels desktop.
Bottom sheet = natural on mobile, dismissible with swipe, shows context behind it.

Use bottom sheet for: quick actions, confirmations, form entry, filters, share.
Use full-screen modal only for: multi-step flows, camera/media, immersive content.

### Safe Areas
Always respect `safe-area-inset-*` on iOS. Nothing gets cut off by notch or home indicator.
```css
padding-bottom: env(safe-area-inset-bottom);
padding-top: env(safe-area-inset-top);
```

---

## Anti-Patterns Checklist

Before declaring UI done, confirm NONE of these exist:

**Content:**
- [ ] Any banned copy phrase (seamless, powerful, welcome to...)
- [ ] Button text is a single word with no outcome ("Submit", "OK", "Next")
- [ ] Error message with no next step
- [ ] Empty state with no CTA
- [ ] Placeholder used as label

**Visual:**
- [ ] 3 equal-width cards in a row as primary layout
- [ ] AI-purple (#8B5CF6) as only accent on white
- [ ] Split-header hero (headline left, paragraph right)
- [ ] Dashboard with 4 metric cards + table = entire app
- [ ] Sidebar + header + content (desktop web app that could use command palette)
- [ ] Generic stock photos of people using laptops/phones

**Interaction:**
- [ ] No feedback within 100ms of tap/click
- [ ] Spinner where skeleton would work
- [ ] Modal where bottom sheet would work (mobile)
- [ ] Hover-only interactions (no touch fallback)
- [ ] Animation with no `prefers-reduced-motion` fallback
- [ ] Tutorial gate before user can do anything

**Dark Mode:**
- [ ] Hardcoded `#FFFFFF` or `#000000` in any component
- [ ] Dark mode not implemented or untested
- [ ] Different primary color in dark mode (should be same hue, adjusted L)

Self-check before every feature: **"Would a 20-year-old open this, immediately get it, and want to keep using it?"** If unsure → simplify.
