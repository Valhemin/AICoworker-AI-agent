---
name: github-workflow
description: PR/issue management and code search using GitHub MCP. Enable MCP before use.
---

TRIGGER: PR creation, issue tracking, code search, or repository management via GitHub MCP
OUTPUT: compact — PR or issue created/reviewed with structured body, CI status checked, reviewers/labels added
SKIP: local git operations not requiring GitHub API; never force-push to main/master via MCP

---

## MCP Requirement

Enable `github` MCP before use (disabled by default). Requires `GITHUB_PERSONAL_ACCESS_TOKEN` env var.

## Capabilities

| Action | Use when |
|---|---|
| Create PR | Feature branch ready for review |
| Review PR | Code review requested |
| Search code | Find patterns across organization repos |
| Manage issues | Create, update, close, or triage issues |
| Check CI status | Verify Actions workflows pass |
| Browse repo | Explore branches, commits, file contents |

## PR Workflow

### Creating a PR
1. Verify branch is pushed and up-to-date with remote.
2. Create PR with clear title (<70 chars) and structured body:
   - Summary (1-3 bullets).
   - What changed and why.
   - Test plan.
   - Breaking changes (if any).
3. Add reviewers, labels, and milestone if applicable.
4. Link related issues.

### Reviewing a PR
1. Read PR description and linked issues for context.
2. Review diff file-by-file.
3. Focus on: correctness, edge cases, security, test coverage.
4. Leave actionable comments with specific suggestions.
5. Approve, request changes, or comment with summary.

## Issue Workflow

1. Check existing issues before creating duplicates.
2. Use labels for categorization (bug, feature, enhancement).
3. Include reproduction steps for bugs.
4. Link to related PRs and issues.

## Safety

- Never force-push to main/master via MCP.
- Never close issues without resolution or explanation.
- Review PR diff before approving — do not auto-approve.
