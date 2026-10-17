---
name: mcp-connect
description: Attach an MCP server to OpenClaw, probe it, and report connected only when the probe passes.
---

# MCP connect

Config lives at `~/.openclaw/openclaw.json`, in the `mcp.servers` block. Do not write secrets into repo files.

Stdio:

```json5
mcp: {
  servers: {
    name: { command: "uvx", args: ["server-package"], enabled: true }
  }
}
```

HTTP: add `url` plus `transport: "streamable-http"` or `"sse"`.

1. Name the server; do not use `__proto__`.
2. Add `toolFilter` if the server has write tools or cost-incurring tools.
3. Run `openclaw mcp doctor name --probe` or `openclaw mcp probe name`.
4. Probe fails: report the exact error. Do not say connected.
5. Probe passes: list the visible tools and stop at WAITING REVIEW before enabling write tools on production.

`enabled: false` keeps the definition without connecting. After changing config, run `openclaw mcp reload`.
