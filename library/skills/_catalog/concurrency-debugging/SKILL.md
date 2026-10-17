---
name: concurrency-debugging
description: "bug is intermittent under load or a race condition, deadlock, or lost update between async/parallel operations is suspected"
---

TRIGGER: bug is intermittent under load or a race condition, deadlock, or lost update between async/parallel operations is suspected
OUTPUT: detailed — taxonomy classification, shared state trace, ordering scenario, fix applied with verification run count
SKIP: UI button interaction order bugs (use click-path-audit instead)

---

# Concurrency / Race Condition Debugging

Use for bugs caused by timing, ordering, or shared state between concurrent operations: async/await races, thread safety, parallel request side effects, mutex deadlocks, event ordering bugs.

For UI interaction races (button click order), use `click-path-audit`. This skill covers backend async, multi-thread, and multi-process concurrency.

## When to Use

- Bug reproduces intermittently and failure rate increases under load.
- Two operations produce correct output individually but wrong output when concurrent.
- State is correct immediately after write but wrong milliseconds later.
- Deadlock: process hangs indefinitely with no error.
- Log ordering shows events arriving out of expected sequence.
- "Works in dev" (sequential) but fails in prod (concurrent load).

## Concurrency Bug Taxonomy

| Category | Symptoms | Common Causes |
|---|---|---|
| **Race condition** | Intermittent wrong value | Read-modify-write without atomic guarantee |
| **TOCTOU** | Validation passes, then state changes before action | Check then act without holding the lock/transaction |
| **Async ordering** | Callbacks/promises resolve in wrong order | Missing `await`, `.then` chains with side effects |
| **Deadlock** | Process hangs, no progress | Two locks acquired in inconsistent order |
| **Stale read** | Reads old value despite recent write | Cache not invalidated, connection pool serving stale state, eventual consistency lag |
| **Lost update** | Write overwrites another concurrent write | No optimistic locking, no DB transaction, no CAS |
| **Double execution** | Operation runs twice | Missing idempotency key, duplicate events, retry without deduplication |

## Process

### 1. Reproduce Under Load
- Increase concurrency until failure rate is measurable (>1 in 10 runs).
- Record exact failure signal: wrong value, deadlock, error, assertion fail.
- If failure is 100% intermittent: add structured logging with timestamps and operation IDs.

### 2. Classify
- Map the symptom to the taxonomy above.
- Identify: which shared state is involved, which operations access it, what the ordering assumption is.

### 3. Trace the Ordering
- Draw (or list) the concurrent timeline: Op A step 1, Op B step 1, Op A step 2, Op B step 2...
- Identify the ordering that causes the bug vs the ordering that succeeds.
- Confirm this ordering is actually possible (not blocked by existing locks).

### 4. Identify the Missing Guarantee

Ask for each shared access:
- **Atomicity**: is the read-modify-write a single atomic operation?
- **Visibility**: is a write visible to other threads/processes before they read?
- **Ordering**: do operations that must happen before X actually complete before X starts?
- **Idempotency**: if the operation runs twice, is the outcome the same?

### 5. Apply the Right Fix

| Missing guarantee | Fix |
|---|---|
| Atomicity | DB transaction, atomic DB operation (`UPDATE WHERE`), mutex, `compare-and-swap` |
| Visibility | Remove caching layer, use consistent reads, invalidate on write |
| Ordering | `await`, `Promise.all`, explicit synchronization, queue |
| Idempotency | Add idempotency key, deduplicate at entry point, make handler re-runnable |
| Deadlock | Enforce consistent lock acquisition order, use `try-acquire` with timeout, reduce lock scope |

Prefer DB-level guarantees over application-level locks when possible. Prefer removing shared state over synchronizing it.

### 6. Verify Under Load
- Apply fix and run the same concurrent load that reproduced the bug.
- Run N iterations (at minimum 20) to confirm failure rate drops to 0.
- Do not declare fixed after a single pass — concurrency bugs require statistical confirmation.

## Output Contract

Output contract: see rules-debug/01.

- **Taxonomy category**: from the table, with reasoning.
- **Shared state involved**: the specific variable, record, cache, or resource.
- **Ordering traced**: the concurrent timeline that causes the failure.
- **Missing guarantee**: atomicity / visibility / ordering / idempotency / other.
