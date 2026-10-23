TRIGGER: changing schemas, persistence layers, or migrations — new model needed alongside old data
OUTPUT: compact — existing/new model, migration path, rollback, backfill/default handling, indexes, integrity tests
SKIP: application logic changes that don't touch the data model or persistence layer

---

# Data Model and Migration

Use when changing schemas, persistence, or migrations.

Checklist:
- Existing model and constraints.
- New model and rationale.
- Migration path and rollback path.
- Backfill/default handling.
- Compatibility with old code/data.
- Indexes and query performance.
- Data integrity tests.
