---
name: web-security-assurance
description: "Use when implementing or reviewing a web app, API, or desktop app that talks to a server and the slice touches auth, input, sessions, files, payments, or browser security headers."
---

TRIGGER: implementing or reviewing a web app, HTTP API, or desktop client that calls a server, and the slice touches auth, user input, sessions, files, payments, redirects, or security headers
OUTPUT: assurance note — in-scope OWASP categories, each failing control with file evidence, fixes applied, commands run
SKIP: static content with no forms, accounts, uploads, or network calls. Say skipped and why

---

# Web security assurance

Pre-ship control check for the current slice. Pair with `security-threat-model` for the trust-boundary list. This skill decides which controls must exist in code and what evidence counts.

Checked against OWASP Top 10:2021 and OWASP ASVS Level 1. The defensive skills on [securityskills/skills](https://www.skills.sh/securityskills/skills) (`owasp-top10-analysis`, `secure-code-review`, `jwt-security-review`, `stride-threat-modeling`) are the category map. Do not vendor those files. Rewrite every item as a control the product must satisfy.

## Do not

- Do not install or follow attack skills: `ssrf-hunting`, `bug-bounty-recon`, `pentest-engagement-methodology`, `attack-surface-recon`, `web-security-testing`.
- Do not write exploit payloads, proof-of-concept requests, or scan any host you do not own.
- Do not install `getsentry/skills@security-review`. As of 2026-10-22 its skills.sh audits showed Gen Agent Trust Hub Fail and Socket Fail. Keep only the safe method: trace untrusted input, and report a finding only when attacker-controlled data reaches a sink in the changed code.
- Do not mark the slice done while a CRITICAL or HIGH control in this slice is still missing.
- Do not weaken auth, CSRF, CORS, TLS checks, or password hashing to make a build pass.

## Method

1. List entry points this slice adds or changes: route, server action, webhook, upload, redirect, IPC, WebView bridge.
2. For each one, trace the data: source (body, query, header, file, URL, IPC, webhook) → validation → sink (query, HTML, shell, redirect, outbound fetch, filesystem, token, log).
3. A finding needs all three: attacker-controlled input, a missing control, and a concrete effect. A config constant or framework default is not a finding unless this code sends it to a sink.
4. Open [references/owasp-controls.md](references/owasp-controls.md). Run only the categories the slice touches. Also run the header and dependency rows when the slice ships a web response or changes dependencies.
5. Desktop and Electron IPC, `contextIsolation`, and certificate checks stay in `security-threat-model`. Do not restate them here. If this slice is the server those apps call, the controls in the reference still apply.
6. Fix CRITICAL and HIGH in this slice. Record MEDIUM and LOW as deferred with the file they belong to.

## Evidence

Each control you claim is present needs a file path and the mechanism (schema, parameterized query, cookie flags, header, allowlist). "Handled by the framework" needs the line that turns that framework protection on.

When a dependency file changed, run the repo's existing audit command if one is already in the project (`npm audit`, `pip-audit`, or the equivalent the repo documents). Record the command and result. Do not add a new scanner.

## Output

```
## Web security assurance

Scope: [entry points]
Categories checked: [A0x, ...]
Skipped: [category — why]

[SEVERITY] A0x — missing control
  Where: file:line
  Effect: what a caller can do
  Fix: control to add
  Status: fixed | required-before-ship | deferred

Evidence: [control — file]
Audit: [command and result, or "no dependency change"]
```
