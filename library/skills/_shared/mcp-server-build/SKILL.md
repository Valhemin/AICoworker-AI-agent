---
name: mcp-server-build
description: Write a small MCP server with tool schemas and prove one successful call.
---

# MCP server

Use when creating a new MCP server. The `ai-agent-ready` skill opens tools from an existing app — it does not replace this skill.

1. Choose stdio transport unless the task requires HTTP.
2. Declare each tool: name, one-line description, input schema, errors returned.
3. Do not put secrets in code or in the repo.
4. Write one test or one local call for exactly one tool.
5. Run that call. If it fails, report the actual error.
6. Stop at WAITING REVIEW before attaching the server to OpenClaw.

Do not say the server is connected before the `mcp-connect` step.
