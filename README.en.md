# AICoworker

A small company with two lines: `giai-phap-so` and `media`. The goal is a paying customer, or stopping a weak idea before the work starts. You sell. Revenue lives in another system, not in these agents.

Operating detail: `shared/00_System/OPERATING.md`. Agent setup for the installed app: `openclaw.agents.example.json5`. Merge that shape into `~/.openclaw/openclaw.json`. Do not put API keys in this repo.

## Who decides a design conflict

You do not have to choose.

- Look, color, on-screen copy, and screen states: `designer` picks one option and records the assumption in `DESIGN.md`.
- A behavior that cannot be built: `architect` cuts it. `designer` updates the design to match.
- Price or buyer changes: only `ceo`, and only before `idea-fit.md` says to build.

`implement` does not invent a new look. It reports one conflict to `architect`.

## Two rounds, then stop

A problem may bounce twice. There is no third round.

If round 2 is still stuck, the agent holding the work writes:

`shared/05_Approvals/Pending/BLOCKED-<domain>-<project>.md`

Five lines: the problem, round 1, round 2, the decision you need to make, and the file path.

Telegram is attached later. Three files in `shared/05_Approvals/Pending/` are the messages: `DONE-` when a step finishes, `RISK-` when a command is blocked, `BLOCKED-` after two failed rounds. The bot is configured at `channels.telegram` in `~/.openclaw/openclaw.json`. Do not store the bot token in this repo.

## Tokens

One skill for the current step. A handed-off task carries the goal, paths, the round number, and the words `chạy full` only if you wrote them. Do not paste chat history or file bodies.

Input is the file that skill names. A long file is read at the named section. Do not scan the repo, `shared`, or a catalog.

The output file keeps every section the skill requires. Chat is five lines. Do not shorten the file to a character cap.

By default the agent stops and suggests one next step. If you write `chạy full`, the chain runs the next step. Sending, posting, paying, paid render, deploy, and high-risk commands still wait for approval.

Delete `draft`, `notes`, and `tmp` when the work is done.

## Rules and skills

`OPERATING.md` is not injected. The short rules live in each agent's `AGENTS.md` and `TOOLS.md`. A spawned session sees only those two files.

The skill index is the list OpenClaw injects into a main session: name, one-line description, and path. Each agent only sees the skills on its allowlist. A spawned session does not see that list, so the task must name the skill path.

The setup file matches the app installed on this machine. Leave `model` unset and the agent uses the machine default.

Using the skills in other repos (Claude, Codex, Antigravity, Cursor): see `tools/global-setup/README.md`.

## Models

The level is the kind of model to fill in later. The same level can still be a separate provider id if you want separate cost.

| Agent | Level | Work | Input | Output |
|---|---|---|---|---|
| `ceo` | Strongest | Choose the path, stop a losing idea | Idea, `idea-fit.md` | One agent, or a BLOCKED file |
| `analyst` | Strong, not a coder | Will someone pay | One idea, at most three sources | `idea-fit.md` |
| `architect` | Strong | Spec, or locate an incident | Brief or `support-issue.md` | Plan, or `where.md` |
| `designer` | Strong, visual | Look and screen states | Brief and one round of feedback | `DESIGN.md`, `interface.md`, `BRAND.md` when selling |
| `implement` | Strongest coder | Code from the spec | Spec, `DESIGN.md`, `interface.md` | Running code |
| `reviewer` | Strong, does not code | Review the slice. Self-review is not evidence | Spec and changed files | `docs/review/review.md` |
| `debug` | Strongest coder | Fix FAIL items | Tester report or `where.md` | Those items fixed |
| `rea` | Strong, evidence | Recreate a similar tool | One local file and one behavior | `rea-findings.md`. No product code |
| `tester` | Coder, a step cheaper | PASS or FAIL, or one QA step | Criteria, a coded slice, or cases | `product-test.md` or test files |
| `developer-work` | Cheap coordinator | Company repo request or bug | Repo and request | Tester PASS or BLOCKED |
| `developer-personal` | Separate coder | Change a live personal repo | Repo, design or spec if any | Changed code |
| `marketer` | Strong, not a coder | Brand profile → channel → four assets → content calendar | Price and something to ship | `profile.md`, `audience-channel.md`, `launch-sprint.md`, `content-calendar.md` |
| `sales` | Strong, not a coder | Prepare and debrief 1-to-1 sales. Does not contact customers | Prospect name/product + context | Prep docs, deal notes, win-loss log |
| `creator` | Strong writer | Script, then production orders | An approved job | Script, then `produce.md` |
| `creator-story` | Strong writer | Structure and words | Brief | Script |
| `creator-visual` | Strong visual | Image and video prompt | `BRAND.md` | One image, one video prompt. No render |
| `creator-research` | A step cheaper | Facts | One question | Facts, separate from guesses |
| `creator-publish` | A step cheaper | Publish pack, subtitles, dub orders | Script, local file, or links | `produce.md` and downloaded files. No render |
| `support` | Cheap | Record an incident | What the customer did and saw | `support-issue.md`, then `architect` |
| `browser` | Cheap | Read, click, and draft in the built-in browser | One URL or a queue task | Short handoff. No form submit |
| `office` | Cheap | Office files | The given file | Result file |
| `application` | Cheap | An existing desktop workflow | Queue workflow | Result file |

## Project folder

`shared/01_Projects/<domain>/<project>/`

Domain is only `giai-phap-so` or `media`. Coordination notes live there. Code, `DESIGN.md`, `interface.md`, `BRAND.md`, and `product-test.md` live in the repo named by `repo.txt`.
