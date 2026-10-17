---
name: stack-selection
description: "Choose the right tech stack for a new project based on goal, team, timeline, and scale. Produces a stack decision with ranked options and rationale."
---

TRIGGER: new project with no stack decided, or user asks "what stack should I use", "which framework fits", "best stack for [X]"
OUTPUT: compact — recommended stack with tier ranking, key reasons, tradeoffs, and decision record
SKIP: project already has a defined stack; stack is a hard constraint from the user

---

## Step 0 — Extract decision inputs from brief

Read `00-brief.md` (or ask if missing). Extract:

| Input | Why it matters |
|---|---|
| **Ship goal** | MVP to validate → bias speed. Production scale → bias stability. |
| **Team size & expertise** | Solo dev → fewer moving parts. Team → community + hiring pool matters. |
| **Primary platform** | Web / mobile / desktop / backend-only / CLI |
| **Scale expectation** | <1k users → anything works. 100k+ → runtime perf and DB choice matter. |
| **Realtime needs** | WebSocket/live data → narrows backend choices. |
| **Deployment target** | Serverless / VPS / edge / app store / self-hosted |
| **AI features** | Yes → prefer Python ecosystem or TypeScript with good SDK support. |
| **Budget/cost constraint** | Affects hosting, managed services, OSS vs paid. |
| **Existing codebase** | Must integrate → match language/ecosystem. |

---

## Step 1 — Classify timeline mode

**MVP / validate fast** — user wants to ship in days to weeks:
- Minimize setup, config, and boilerplate
- Prefer batteries-included frameworks
- Prefer managed services over self-hosted
- Tradeoff: less control, vendor lock-in acceptable at this stage
- Signal phrases: "ship nhanh", "MVP", "validate idea", "prototype", "just get it working"

**Production / scale** — user wants stability, performance, team growth:
- Prefer proven, well-documented stacks with large hiring pools
- Prefer explicit over magic (easier to debug, onboard)
- Managed services still OK but evaluate lock-in seriously
- Signal phrases: "production", "scale", "team will grow", "long-term", "enterprise"

**Both** (MVP that will evolve) — default for most real projects:
- Pick a stack that's fast to start AND can grow
- Avoid stacks with known migration ceilings
- Flag which choices are "OK for now but upgrade when X"

---

## Step 2 — Search current recommendations (REQUIRED)

Do not rely on training data for specific library versions or ecosystem health.

Search: `"[platform] stack recommendation 2026"` and `"[framework] vs [alternative] 2026"`

Check:
- Is the framework still actively maintained?
- Community size trend (growing/stable/shrinking)?
- Known breaking changes or deprecations coming?
- Any strong community consensus shift since 2024?

---

## Step 3 — Build tier ranking

Rank options as **Top pick / Viable / Avoid for this case**. Never list options flat without a winner.

For each tier, state:
- What it is (1 line)
- Why it fits (or doesn't) for THIS project's specific inputs
- Key tradeoff

Output format:

```
## Stack Recommendation

**Mode: [MVP / Production / Both]**

### ⭐ Top pick
[Stack name + versions]
Why: [reason tied to THIS project's inputs — not generic praise]
Tradeoff: [what you give up]

### Viable alternatives
**[Option B]** — Good if [specific condition]. Tradeoff: [what changes].
**[Option C]** — Good if [specific condition]. Tradeoff: [what changes].

### Avoid for this project
**[Option D]** — [Specific reason it's wrong for these inputs, not globally bad].

---
## Decision record (save to 00-brief.md under Tech Constraints)
Stack: [chosen stack]
Reason: [top 2 inputs that drove the decision]
Acceptable lock-in: [what managed services are accepted and why]
Upgrade path: [what to reconsider when project reaches [milestone/scale]]
```

---

## Common patterns by project type (verify currency before applying)

These are starting points — search Step 2 before committing.

| Project type | MVP bias | Production bias |
|---|---|---|
| Web app (consumer) | Next.js / Nuxt + Supabase/PlanetScale | Next.js / Remix + Postgres + Redis |
| Mobile app | Expo (React Native) | React Native bare / Flutter |
| SaaS dashboard | Next.js + Prisma + Auth library | Same + separate API service |
| AI-featured app | Next.js + Vercel AI SDK / Python FastAPI | Python FastAPI + queue (Celery/BullMQ) |
| API-only backend | Hono / Fastify / Express | Go Fiber / NestJS / FastAPI |
| Real-time app | Supabase Realtime / Pusher | Elixir Phoenix / Node + Socket.io |
| CLI tool | Node (tsx) / Python | Go / Rust |
| Desktop app | Tauri / Electron | Tauri |

**These rows will go stale — always verify in Step 2.**

---

## Output contract

- Recommended stack with versions
- Decision record written to `00-brief.md`
- Explicit mode (MVP / production / both)
- Top 3 reasons the pick fits THIS project
- Upgrade path flagged if MVP shortcuts were taken
- New repos: apply the layers from `code-structure`. Repos with an existing tree: document that the existing tree is preserved.
