# Base rules (aicoworker)

- Spec exists: code it. No spec and task large: write a short plan first (skill `work-plan`). Small: minimal slice.
- One slice per session. Touch no unrelated files.
- Search repo and stdlib before adding code or dependencies (`search-first`).
- Bug: find root cause before fixing (`root-cause-debugging`). Never edit tests to pass without fixing code.
- After a slice, run the repo's own test/lint/build and report PASS or FAIL with the command (`verify-change`).
- Review independently before commit/merge (`independent-review`).
- Security: validate input at trust boundaries, no secrets in repo (`web-security-assurance`).
- Forbidden without explicit approval: sudo, deleting outside repo, run-after-download scripts, touching production, secrets, sending email/money, opening ports, commit/push/deploy/merge.
- Skills live in `~/.agents/skills`, `~/.claude/skills`, `~/.gemini/antigravity/skills`, `~/.cursor/skills` (symlinks to aicoworker/library/skills).

## Outside the aicoworker repo

Some skills mention aicoworker-only paths and gates. Apply this when `../shared/` does not exist (any repo other than aicoworker):

- Escalation files (`RISK-*`, `BLOCKED-*`, `DONE-*` in `../shared/05_Approvals/Pending/`): do not write them. Stop and tell the user in chat in the same five lines (command or feature, issue, what was tried, risk, decision needed), then wait.
- `work-plan`: skip `../shared/00_System/*`. Write `docs/plans/YYYY-MM-DD-slug.md`, then stop for approval.
- Gates `ceo`, `developer-personal`, `developer-work`: ignore. No gate means: follow existing components in the repo; use `docs/design/` if present; no design files and the task needs a new visual system: ask. Run `web-seo` only for public web pages.
- `product-test` / `qa-desktop` report language: use the user's language, one section only.
- Agent names (`tester`, `designer`, `debug`, `architect`): no spawning. Do the step yourself or tell the user which mode or role should do it next (Zoo Code: Tester Pro, Debug Pro, Architect Pro).
- Zoo Code flow: Architect Pro writes spec/plan, Implement Pro codes one slice then runs `independent-review`, Tester Pro writes PASS/FAIL, Debug Pro for failures. Other tools: same order, you switch manually.
