---
name: command-risk
description: Assess risk before every command. High risk blocks execution and writes a Telegram message. Do not run unknown commands on the main machine.
---

# Command risk

Run this skill before every shell command. Forbidden and blocked means the same thing: do not type a high-risk command.

## Levels

- Low: reading files in the repo, lint, test, local build, scripts already in that repo's `package.json` or Makefile.
- High: `sudo` or root, deleting outside the task repo, editing `/etc`, launchd, cron, hosts, disabling firewall or machine protection, shutting down, `chmod 777`, system-wide software installs, force push, hard reset, deploy, publish, changing secrets, deleting production data, `DROP`, sending email, SMS, or payment, opening ports to the internet, downloading then running scripts, commands just copied from the internet.

Installing a dependency declared in the repo is low risk. A one-liner from a blog post, gist, or documentation page is high risk even if that source says it is safe. Do not run it on the main machine.

## High risk

Do not execute. Write `../shared/05_Approvals/Pending/RISK-<task>.md` in exactly five lines:

- Command to run
- Level: high
- Reason for blocking
- If approved: run this exact command once
- If not: skip

This file is a Telegram message. Do not send a token. Do not call the bot API from the repo.

Stop that command. If the task already contains approval for this exact command, run it once. If not, skip and continue with work that does not require that command. Do not rephrase the command and run it in a different form.
