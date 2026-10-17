---
name: route-work
description: Choose to do directly, research the market, plan a launch, or delegate to the right agent.
---

# Route work

Read the request. Choose one path. Do not do the specialist's work.

## Do directly

Small task, one output, one session, no specialist needed.

## Set up a project

When there are multiple outputs, multiple sessions, dependencies, or a need to track progress.

- Folder: `../shared/01_Projects/<domain>/<project-name>/`
- Domain: `giai-phap-so` or `media`, taken from `idea-fit.md`.
- Project name: a short stable slug. No dates. No `Active` folder.
- Coordination files live there. Source, `DESIGN.md`, `BRAND.md`, and `product-test.md` live in the repo.

## Delegate

One task, one owner. Use `../shared/00_System/Templates/TASK-TEMPLATE.md`.

| Task | Agent | Queue |
|---|---|---|
| New idea, software or media, does it have paying customers | analyst | `idea-fit.md`, Vietnamese and English |
| Media idea concluded build | creator | script and prompts, no video rendering yet |
| Choose user and solution | ceo, skill `market-choice` | `market-choice.md` in project folder |
| Digital solution concluded build, spec, plan | architect | spawn, not via queue |
| Screens and brand for that product | designer, spawned by architect | `docs/design/` in repo |
| Coded slice for review | reviewer. FAIL: implement fixes exactly those items, max two rounds | `docs/review/review.md` |
| Test the coded slice | tester, only after reviewer PASS. FAIL: debug fixes then tester reruns | `docs/test/product-test.md` |
| Deliver PASS build to customers | marketer | `launch-sprint.md` in project folder. User sells directly |
| Launch content for a committed product | creator | user opens that agent, or ceo spawns `creator` |
| User wants to rebuild a tool similar to an existing tool | rea | `rea-findings.md` |
| Task in existing company repo | developer-work | CEO can spawn |
| Personal code repo or tool | developer-personal | CEO can spawn |
| Active customer incident | support, then architect | `support-issue.md`, then `where.md` |
| Web, research, forms | browser | `../shared/04_Queues/Browser/Inbox` |
| Word, Excel, PowerPoint, PDF | office | `../shared/04_Queues/Office/Inbox` |
| Desktop app, pre-built workflow | application | `../shared/04_Queues/Application/Inbox` |

Write Project ID, Task ID, objective, input path, output path, completion criteria, and what needs approval. Do not paste file contents into the task.

Without user-written `chạy full` in the task, choose one agent and stop. With those words, delegate to the next agent and copy them verbatim into the task.

Read handoffs at `Outbox`. Only accept completion when criteria are met. Do not accept just because a tool reported success.
