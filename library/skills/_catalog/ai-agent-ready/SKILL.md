---
name: ai-agent-ready
description: "Design and implement apps so an AI agent (Claude, OpenClaw, or any MCP client) can interact with them — expose actions as MCP tools, build..."
---

TRIGGER: user intent matches ANY of these (semantic, not exact phrase):
- "let AI interact with the app", "let AI operate the app", "AI agent controls the app"
- "add MCP server", "expose tools to the agent", "integrate MCP"
- "OpenClaw can use this app", "Claude computer use with the app", "agent automation"
- "let AI run the workflow", "can AI use this app"
- Explicitly adding MCP server, tool definitions, or accessibility-for-agents

OUTPUT: MCP server layer, tool definitions, accessibility annotations, agent contract doc
SKIP: every other implementation — never activate unless intent matches above

---

## Step 0 — Research Before Implementing (mandatory)

MCP SDK changes fast. Before writing any code, fetch current docs:

```
1. Use Context7: resolve "@modelcontextprotocol/sdk" → get current API
2. Check npm: current version of @modelcontextprotocol/sdk
3. If adding Electron integration: check contextBridge + preload patterns for current Electron version
4. If HTTP transport: confirm OAuth 2.1 flow for current SDK version
```

Do NOT implement from memory or from this skill's code samples alone — verify SDK API against live docs first. Code samples here show patterns, not exact current API signatures.

---

## Overview

Goal: an AI agent should be able to drive your app programmatically — the same way a user does visually — without screen-scraping or brittle UI automation.

Two interaction layers to implement:

```
Layer 1 — Intent API (MCP tools)
  AI agent calls named tools with structured params.
  App executes and returns structured result.
  Best for: workflows, data ops, commands, state queries.

Layer 2 — UI Automation (Computer Use / Accessibility)
  AI agent reads the UI via accessibility tree + screenshots.
  Clicks, types, scrolls like a user.
  Best for: visual QA, testing, tasks with no Intent API yet.
```

Prefer Layer 1 for any operation you build intentionally.
Fall back to Layer 2 for legacy UI or exploratory tasks.

---

## Layer 1 — Intent API via MCP

### Architecture

```
App
├── src/
│   └── ... (normal app code)
└── mcp-server/
    ├── index.ts          ← MCP server entrypoint
    ├── tools/
    │   ├── index.ts      ← register all tools
    │   ├── [domain].ts   ← one file per domain
    └── schemas/
        └── [domain].ts   ← Zod schemas shared with app
```

The MCP server is a **thin adapter** — it translates tool calls into calls to your existing service layer. It does not contain business logic. Business logic stays in the app.

```
Agent → MCP tool call → Mcp server → App service layer → DB/state
                                     ↑
                             same code the UI calls
```

### MCP Server Setup

```typescript
// mcp-server/index.ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { registerAllTools } from './tools/index.js'

const server = new McpServer({
  name: 'your-app-mcp',
  version: '1.0.0',
})

registerAllTools(server)

const transport = new StdioServerTransport()
await server.connect(transport)
```

For Electron: run MCP server in main process, expose via stdio or HTTP.
For web app: run as a sidecar Node process or embed in the backend.
For mobile: MCP server runs on the user's machine (desktop companion) or backend.

### Tool Design Rules

**One tool = one intent.** Don't make a generic "do_action" tool.

```typescript
// ✓ Good — specific, predictable
server.tool('create_project', 'Create a new project', {
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  template: z.enum(['blank', 'api', 'fullstack']).default('blank'),
}, async ({ name, description, template }) => {
  const project = await projectService.create({ name, description, template })
  return { content: [{ type: 'text', text: JSON.stringify(project) }] }
})

// ✗ Bad — too generic, agent can't reason about it
server.tool('perform_action', 'Do something', {
  action: z.string(),
  params: z.any(),
}, ...)
```

**Tool naming convention:** `verb_noun` in snake_case.
- `create_project`, `list_projects`, `delete_project`
- `get_user`, `update_user_settings`
- `run_task`, `cancel_task`, `get_task_status`

**Tool descriptions must be agent-readable** — describe *when to use*, *what it does*, *what it returns*:
```typescript
// ✓
'List all projects for the current user. Returns id, name, status, created_at. Use this before create_project to check for duplicates.'

// ✗
'Get projects'
```

**Always return structured data**, not formatted strings:
```typescript
// ✓
return { content: [{ type: 'text', text: JSON.stringify({ id, name, status }) }] }

// ✗
return { content: [{ type: 'text', text: `Project "${name}" created successfully!` }] }
```

**Schema-validate all inputs** with Zod — reuse the same schemas from your app's validation layer. An agent sending bad params should get a clear error, not a 500.

### Tool Categories to Expose

For each domain in your app, expose this standard set:

| Pattern | Tools |
|---|---|
| CRUD resource | `list_X`, `get_X`, `create_X`, `update_X`, `delete_X` |
| Long-running op | `start_X`, `get_X_status`, `cancel_X`, `get_X_result` |
| Query/search | `search_X`, `filter_X` |
| App state | `get_app_state`, `get_current_user`, `get_settings` |
| Navigation (web/Electron) | `navigate_to`, `get_current_route` |
| File ops (desktop) | `open_file`, `save_file`, `list_directory` |

### Error Handling for Agents

Agents need machine-readable errors, not human messages:

```typescript
// In every tool handler:
try {
  const result = await service.doSomething(params)
  return { content: [{ type: 'text', text: JSON.stringify({ ok: true, data: result }) }] }
} catch (err) {
  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        ok: false,
        error: {
          code: err.code || 'UNKNOWN_ERROR',   // machine-readable
          message: err.message,                 // human-readable
          retryable: err.retryable ?? false,    // agent can decide to retry
        }
      })
    }],
    isError: true,
  }
}
```

### Authentication for MCP

- MCP server runs locally (stdio) → inherit app session, no extra auth needed.
- MCP server runs over HTTP → **OAuth 2.1** (2026 standard, replaces API keys). Scope credentials to minimum needed permissions at startup, not per-call.
- Never expose destructive tools (delete, reset, export all data) without an auth check.
- Scope tools to current user — never allow cross-user operations via MCP.
- Use `PreToolUse` hooks to gate destructive calls (`delete_*`, `reset_*`, `clear_*`) independently from read calls — agents should be able to read freely but need explicit permission to mutate.

### Agent Contract Document

After building the MCP server, create `MCP_AGENT_CONTRACT.md` at project root:

```markdown
# MCP Agent Contract

## Server
- Transport: stdio | http (port XXXX)
- Start: `node mcp-server/index.js`

## Available Tools

### Projects
- `list_projects` — list all projects for current user
- `create_project(name, template?)` — create new project
- `delete_project(id)` — ⚠️ destructive, requires confirmation

## Conventions
- All timestamps: ISO 8601
- All IDs: UUID v4
- Errors: `{ ok: false, error: { code, message, retryable } }`

## Limitations
- Max 100 results per list call
- Rate limit: 60 tool calls / minute
```

---

## Layer 2 — UI Automation (Accessibility-Native)

When the agent needs to interact via UI (Computer Use / Playwright / OpenClaw), the app must be built so the accessibility tree is machine-readable.

### Accessibility Tree Requirements

Every interactive element needs:
```tsx
// ✓ Agent can find and click this unambiguously
<button
  aria-label="Delete project: My Website"
  data-testid="delete-project-btn"
  data-action="delete-project"
  data-entity-id={project.id}
>
  Delete
</button>

// ✗ Agent has to guess by position or text
<div onClick={handleDelete}>Delete</div>
```

Rules:
- `aria-label` on all interactive elements — include entity name/ID where relevant ("Save project: Invoice App", not just "Save")
- `data-testid` on all key UI elements — stable, not based on index or text
- `data-action` attribute for machine-readable action names — agents use this to build action maps
- `role` attribute where semantic HTML isn't sufficient
- `aria-disabled` instead of removing element when disabled — agent needs to know it exists but is unavailable
- `aria-live` regions for async updates — agent needs to know when content changed

### Semantic Structure

```tsx
// Wrap major app sections with landmarks
<main role="main" aria-label="Project list">
  <section aria-label="Active projects">
    {projects.map(p => (
      <article
        key={p.id}
        aria-label={`Project: ${p.name}`}
        data-entity-type="project"
        data-entity-id={p.id}
        data-entity-status={p.status}
      >
        ...
      </article>
    ))}
  </section>
</main>
```

Agent can now query: "find all articles with data-entity-type=project and data-entity-status=active" — without parsing visual layout.

### State Visibility

Make app state visible to the agent via DOM attributes, not just visually:

```tsx
// Agent can read app state without screenshots
<div
  data-app-state="ready"        // ready | loading | error
  data-user-id={user.id}
  data-current-route={route}
  data-feature-flags={JSON.stringify(flags)}
  id="app-root"
/>
```

### Electron-Specific

For Electron apps with OpenClaw / Computer Use:

```typescript
// main.ts — expose app state to accessibility tree via IPC
ipcMain.handle('get-app-state', () => ({
  currentWindow: win.webContents.getURL(),
  isReady: appState.isReady,
  userId: session.userId,
}))

// Preload — surface MCP server connection info
contextBridge.exposeInMainWorld('mcpInfo', {
  port: MCP_PORT,
  transport: 'http',
})
```

Use `accessibilityIdentifier` on macOS native controls. Set `automationId` on Windows for UI Automation.

---

## Layer 3 — Observability for Agents

The agent needs feedback on what happened after each action.

### Pagination — Agent Must Know More Exists

Common failure: list tools return first page silently, agent assumes it got everything → incomplete answers.

Every list/search tool must signal pagination explicitly:

```typescript
server.tool('list_projects', '...', { cursor: z.string().optional(), limit: z.number().default(20).max(100) },
async ({ cursor, limit }) => {
  const { items, nextCursor, total } = await projectService.list({ cursor, limit })
  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        items,
        pagination: {
          hasMore: !!nextCursor,
          nextCursor: nextCursor ?? null,
          total,                          // total count so agent can plan
          returnedCount: items.length,
        }
      })
    }]
  }
})
```

Agent reads `hasMore: true` → calls again with `cursor` → never silently truncates.

### MCP Observability (multi-server setups)

If the app exposes 3+ tools or runs alongside other MCP servers, add a thin logging proxy:

```typescript
// Wrap every tool handler with correlation logging
function withAudit(toolName: string, handler: Function) {
  return async (params: any) => {
    const correlationId = crypto.randomUUID()
    const start = Date.now()
    try {
      const result = await handler(params)
      logger.info('mcp_tool_call', {
        correlationId, tool: toolName,
        durationMs: Date.now() - start,
        userId: currentSession.userId,
        status: 'ok',
      })
      return result
    } catch (err) {
      logger.error('mcp_tool_error', {
        correlationId, tool: toolName,
        durationMs: Date.now() - start,
        userId: currentSession.userId,
        errorCode: err.code,
        status: 'error',
      })
      throw err
    }
  }
}
```

Never log params verbatim — sanitize PII (userId ok, email/token not ok).

### Action Receipts

Every state-changing tool call returns enough info for the agent to verify success:

```typescript
// After create_project:
{
  ok: true,
  data: {
    id: 'proj_abc123',
    name: 'My App',
    status: 'active',
    createdAt: '2026-07-31T10:00:00Z',
    // enough for agent to confirm and reference in next steps
  }
}
```

### App Events via MCP (optional, for complex workflows)

For long-running operations, expose a status-poll or server-sent events tool:

```typescript
server.tool('poll_task_status', 'Poll a background task status', {
  taskId: z.string(),
}, async ({ taskId }) => {
  const task = await taskQueue.getStatus(taskId)
  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        taskId,
        status: task.status,           // pending | running | done | failed
        progress: task.progress,       // 0–100
        result: task.result ?? null,
        error: task.error ?? null,
        retryAfterMs: task.status === 'running' ? 2000 : null,
      })
    }]
  }
})
```

---

## Security for Agent-Exposed APIs

Agent-accessible tools are an attack surface — apply extra hardening:

- **Never expose admin-level tools** via MCP unless the user has explicitly enabled it.
- **Destructive tools** (`delete_*`, `reset_*`, `clear_*`): require a `confirm: true` param — agent must explicitly pass it, preventing accidental destruction.
  ```typescript
  server.tool('delete_all_projects', '...', {
    confirm: z.literal(true),  // agent must explicitly pass confirm: true
  }, ...)
  ```
- **Rate-limit MCP endpoints** separately from app endpoints — an agent can call faster than a human.
- **Audit log** every MCP tool call: `{ tool, params (sanitized), userId, timestamp, result_code }`.
- **Read-only mode:** expose a `get_*` / `list_*` / `search_*` tier that works without auth for demos. All mutations require auth.
- **Validate that inputs from agents are still sanitized** — an agent can be prompt-injected. Treat MCP input as untrusted, same as user input.

---

## Checklist Before Marking AI-Agent-Ready

- [ ] MCP server starts and lists tools correctly (`npx @modelcontextprotocol/inspector`)
- [ ] Every tool has a description an agent can reason from
- [ ] All inputs Zod-validated, errors return `{ ok: false, error: { code, message, retryable } }`
- [ ] Destructive tools require `confirm: true`
- [ ] MCP server scoped to current user — no cross-user ops possible
- [ ] `MCP_AGENT_CONTRACT.md` written at project root
- [ ] All interactive UI elements have `aria-label` + `data-testid` + `data-action`
- [ ] Key entities have `data-entity-type` + `data-entity-id` attributes
- [ ] App root exposes `data-app-state`
- [ ] Rate limiting on MCP endpoints
- [ ] MCP tool calls audit-logged
- [ ] Tested with MCP Inspector or a real agent call
