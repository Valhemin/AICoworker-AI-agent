---
name: continuous-learning-v2
description: Instinct-based learning system. Observes sessions via hooks, creates atomic instincts with confidence scoring, evolves them into skills/commands/agents. Project-scoped to prevent cross-project contamination.
version: 2.1.0
---

TRIGGER: setting up automatic session learning via hooks, configuring instinct-based behavior extraction, or user says 'learn from this session'
OUTPUT: detailed — instinct library configured with hooks, confidence scoring active, evolution path to skills/commands/agents
SKIP: one-off memory notes (use agentmemory-remember) or recalling past sessions (use agentmemory-recall)

---


# Continuous Learning v2.1 — Instinct-Based Architecture

## When to Use

**YES — fire this skill when:**
- Setting up automatic session learning from Claude Code sessions
- Configuring instinct-based behavior extraction via hooks
- Tuning confidence thresholds for learned behaviors
- Reviewing, exporting, or importing instinct libraries
- Evolving instincts into full skills, commands, or agents
- Managing project-scoped vs global instincts
- Promoting instincts from project to global scope
- User says "learn from this session", "remember this pattern", "set up learning"

**NO — skip this skill when:**
- User wants a one-off memory note (use `agentmemory-remember` instead)
- User asks about past sessions (use `agentmemory-recall`)
- No hooks infrastructure is set up and user doesn't want to set it up

## When NOT to Use

- Simple preference notes that don't need confidence scoring or evolution
- Projects where you don't want persistent behavioral changes between sessions
- When the user wants to document a decision, not learn a behavior (use `architecture-decision-records`)

---

## The Instinct Model

An instinct is a small learned behavior:

```yaml
---
id: prefer-functional-style
trigger: "when writing new functions"
confidence: 0.7
domain: "code-style"
source: "session-observation"
scope: project
project_id: "a1b2c3d4e5f6"
project_name: "my-react-app"
---

# Prefer Functional Style

## Action
Use functional patterns over classes when appropriate.

## Evidence
- Observed 5 instances of functional pattern preference
- User corrected class-based approach to functional on 2025-01-15
```

**Properties:**
- **Atomic** — one trigger, one action
- **Confidence-weighted** — 0.3 = tentative, 0.9 = near certain
- **Domain-tagged** — code-style, testing, git, debugging, workflow, etc.
- **Evidence-backed** — tracks what observations created it
- **Scope-aware** — `project` (default) or `global`

## How It Works

```
Session Activity (in a git repo)
      |
      | Hooks capture prompts + tool use (100% reliable)
      | + detect project context (git remote / repo path)
      v
+---------------------------------------------+
|  projects/<project-hash>/observations.jsonl  |
|   (prompts, tool calls, outcomes, project)   |
+---------------------------------------------+
      |
      | Observer agent reads (background)
      v
+---------------------------------------------+
|          PATTERN DETECTION                   |
|   * User corrections -> instinct             |
|   * Error resolutions -> instinct            |
|   * Repeated workflows -> instinct           |
|   * Scope decision: project or global?       |
+---------------------------------------------+
      |
      | Creates/updates
      v
+---------------------------------------------+
|  projects/<project-hash>/instincts/personal/ |
|  instincts/personal/  (GLOBAL)               |
+---------------------------------------------+
      |
      | /evolve clusters + /promote
      v
+---------------------------------------------+
|  evolved/: commands, skills, agents          |
+---------------------------------------------+
```

## Project Detection

1. `CLAUDE_PROJECT_DIR` env var (highest priority)
2. `git remote get-url origin` — hashed for portable project ID
3. `git rev-parse --show-toplevel` — fallback (machine-specific)
4. Global fallback — no project detected

Data stored at `${XDG_DATA_HOME:-~/.local/share}/ecc-homunculus/` (outside `~/.claude` to avoid sensitive-path guard).

## Quick Start

### 1. Enable Observation Hooks

Add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [{"matcher": "*", "hooks": [{"type": "command", "command": "~/.claude/skills/continuous-learning-v2/hooks/observe.sh"}]}],
    "PostToolUse": [{"matcher": "*", "hooks": [{"type": "command", "command": "~/.claude/skills/continuous-learning-v2/hooks/observe.sh"}]}]
  }
}
```

### 2. Initialize Directories

```bash
mkdir -p "${XDG_DATA_HOME:-$HOME/.local/share}/ecc-homunculus"/{instincts/{personal,inherited},evolved/{agents,skills,commands},projects}
```

### 3. Commands

| Command | Description |
|---------|-------------|
| `/instinct-status` | Show all instincts (project + global) with confidence |
| `/evolve` | Cluster related instincts into skills/commands/agents |
| `/instinct-export` | Export instincts (filterable by scope/domain) |
| `/instinct-import <file>` | Import instincts with scope control |
| `/promote [id]` | Promote project instinct to global scope |
| `/projects` | List all known projects and their instinct counts |

## Confidence Scoring

| Score | Meaning | Behavior |
|-------|---------|----------|
| 0.3 | Tentative | Suggested but not enforced |
| 0.5 | Moderate | Applied when relevant |
| 0.7 | Strong | Auto-approved for application |
| 0.9 | Near-certain | Core behavior |

Confidence rises with repeated observation and no corrections. Drops when user explicitly corrects or contradicting evidence appears.

## Scope Decision Guide

| Pattern Type | Scope | Examples |
|-------------|-------|---------|
| Language/framework conventions | project | "Use React hooks", "Follow Django REST patterns" |
| File structure preferences | project | "Tests in `__tests__`/", "Components in src/components/" |
| Security practices | global | "Validate user input", "Sanitize SQL" |
| General best practices | global | "Write tests first", "Always handle errors" |
| Tool workflow preferences | global | "Grep before Edit", "Read before Write" |

## Auto-Promotion Criteria

Same instinct ID appears in 2+ projects with average confidence >= 0.8.

```bash
python3 instinct-cli.py promote --dry-run   # preview
python3 instinct-cli.py promote             # apply
```

## Why Hooks (Not Skills) for Observation

Skills fire ~50-80% of the time based on Claude's judgment. Hooks fire 100% deterministically — every tool call is observed, no patterns missed.

## Privacy

- Observations stay local on your machine
- Project-scoped instincts isolated per project
- Only instincts (patterns) can be exported — not raw observations
- No actual code or conversation content shared
