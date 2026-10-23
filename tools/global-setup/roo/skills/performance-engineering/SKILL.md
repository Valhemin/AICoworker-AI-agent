TRIGGER: slow paths, rendering issues, heavy queries, or scale-sensitive features with a measured or expected performance problem
OUTPUT: compact — hot path inspected, avoidable work, query/index, caching, re-render/bundle, before/after measurement
SKIP: without profiling data or a measured baseline — never optimize blindly

---

# Performance Engineering

Use for slow paths, rendering issues, heavy queries, or scale-sensitive features.

Inspect:
- Hot path and expected data volume.
- Avoidable repeated work.
- Query/index behavior.
- Caching boundaries.
- Frontend re-rendering and bundle size.
- Measurement before/after when possible.
