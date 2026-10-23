---
name: command-risk
description: Assess risk before every command. Block high-risk commands and write a Telegram-style approval file. Never run unknown commands on the main machine.
---

# Command risk

Run this skill before every shell command. Block and stop are the same action: do not type a high-risk command.

## Levels

- **Low**: read files in the repo, lint, test, local build, scripts already present in the repo's `package.json` or Makefile.
- **High**: `sudo` or root, delete outside the task's repo, modify `/etc`, launchd, cron, hosts, disable firewall or security software, shut down the machine, `chmod 777`, install software system-wide, force push, hard reset, deploy, publish, change secrets, delete production data, `DROP`, send email/SMS/payment, open port to the internet, download-then-execute a script, any command just copied from the internet.

Installing a dependency declared in the repo is low. A one-liner from a blog post, gist, or docs page is high — even if that source calls it safe. Do not run it on the main machine.

## High-risk action

Do not execute. Write `../shared/05_Approvals/Pending/RISK-<task>.md` with exactly five lines:

- Command intended to run
- Level: high
- Why it was blocked
- If approved: run this exact command once
- If not approved: skip it

This file is the Telegram message. Do not send a token or call the bot API from the repo.

Stop that command. If an explicit approval for this exact command exists in the task, run it once. If not, skip it and continue with the parts that do not need it. Do not rephrase the command and run it in a different form.
