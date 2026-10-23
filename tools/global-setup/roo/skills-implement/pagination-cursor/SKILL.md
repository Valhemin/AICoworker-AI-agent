---
name: pagination-cursor
description: Cursor-based and offset pagination — backend implementation, API contract, and frontend integration. Use when adding list/collection endpoints or infinite scroll.
---

TRIGGER: adding a list endpoint, implementing infinite scroll or load more, or migrating from offset to cursor pagination
OUTPUT: detailed — pagination type chosen, cursor encoding, DB indexes, max limit, frontend integration, edge cases
SKIP: single-item endpoints or small fixed result sets that will never need pagination

---


## When to Use

Use when: adding a list endpoint, implementing "load more" / infinite scroll, migrating from offset to cursor pagination, or implementing search results with pagination.

## Cursor vs Offset — Choose Before Building

| | Cursor | Offset |
|---|---|---|
| Stable results under inserts | Yes | No — items shift |
| Random page access | No | Yes |
| Large dataset performance | Good (index seek) | Degrades (OFFSET N scans) |
| Default choice | Yes for feeds, activity, infinite scroll | Only when user needs page N access |

Default to cursor pagination unless the UX explicitly requires "jump to page N."

## Backend — Cursor Pagination

### Request Shape

```
GET /api/resource?limit=20&cursor=<opaque_token>
```

- `limit` — max items per page. Enforce a server-side cap (e.g., max 100).
- `cursor` — opaque to client. Encode internally as base64(JSON) or an encrypted value. Never expose raw DB IDs or timestamps as cursors — they leak schema and are gameable.
- No `cursor` = first page.

### Response Shape

```json
{
  "data": [...],
  "pagination": {
    "nextCursor": "<token or null>",
    "hasMore": true,
    "limit": 20
  }
}
```

- `nextCursor` is `null` when there are no more results.
- Never include `totalCount` unless explicitly required — it is expensive and often wrong under concurrent writes.

### Implementation Rules

- **Fetch `limit + 1` rows.** If you get `limit + 1` results, trim the last and set `hasMore: true`. Avoids a COUNT query.
- **Index on the cursor column.** The column used for cursor ordering must be indexed. Composite index if filtering.
- **Consistent sort order.** Add a tiebreaker (e.g., `(created_at, id)`) so results are stable when timestamps collide.
- **Cursor must encode sort column value + ID.** Example: `{ createdAt: "2024-01-15T10:00:00Z", id: "uuid" }` → base64.
- **Validate cursor on decode.** Return 400 if cursor is malformed. Do not 500.

## Backend — Offset Pagination (when required)

```
GET /api/resource?page=1&pageSize=20
```

- Cap `pageSize` server-side.
- `page` is 1-indexed in the API (convert to 0-indexed offset internally).
- Response includes `totalCount`, `page`, `pageSize`, `totalPages`.
- Add DB index on sort column. Large offsets are slow — document the limit.

## Frontend Integration

### Infinite Scroll / Load More

- Store `nextCursor` from the last response.
- On "load more": send `?cursor=<nextCursor>`.
- Append results to existing list — do not replace.
- Show loading state during fetch. Disable "load more" button while loading.
- When `hasMore` is false: hide or disable the trigger.
- Handle empty first page: show empty state, not a spinner forever.

### Error States

- Network error mid-scroll: show error + retry button. Do not lose already-loaded items.
- Stale cursor (item deleted): server should return 400 with message. Client resets to first page with user notification.

## API Testing Checklist (run `api-testing` skill after implementation)

| Case | Expected |
|---|---|
| First page (no cursor) | 200, `data` array, `nextCursor` set if more exist |
| Valid cursor, middle page | 200, correct next slice, `nextCursor` updated |
| Last page | 200, `hasMore: false`, `nextCursor: null` |
| Malformed cursor | 400 with error message |
| `limit` over max | 400 or silently capped — document which |
| `limit=0` | 400 |
| Empty collection | 200, `data: []`, `hasMore: false` |

## Output Contract

Document:
- Pagination type chosen (cursor/offset) and reason.
- Cursor encoding scheme.
- DB indexes added.
- Max `limit` enforced.
- Frontend: how `nextCursor` is stored and used.
- Edge cases handled (empty, last page, stale cursor).
