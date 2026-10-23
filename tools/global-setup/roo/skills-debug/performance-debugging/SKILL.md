TRIGGER: specific slow behavior is reported or measured — slow page load, API response, renders, or test suite with a concrete symptom
OUTPUT: compact — baseline measured, hot paths inspected with cost, bottleneck identified, before/after numbers after fix
SKIP: without a concrete measured symptom; do not trigger automatically or optimize without a baseline

---

# Performance Debugging

## Process

1. Define the symptom precisely: what is slow, by how much, under what conditions.
2. Measure — get a baseline number before touching anything (time, flame chart, query plan).
3. Identify likely hot paths — don't guess, profile or instrument.
4. Narrow to the bottleneck — see categories below.
5. Patch the narrowest root cause only.
6. Measure again — confirm improvement with numbers.

## Bottleneck categories

| Category | Signals | First tool |
|---|---|---|
| DB query | Slow API, N+1 logs, full table scan | EXPLAIN / query plan |
| Blocking I/O | High wait time, low CPU | async audit, connection pool |
| Large payload | Slow transfer, high memory | payload size, compression |
| Rendering | Jank, dropped frames, layout thrash | browser profiler / devtools |
| Missing cache | Same computation repeated per request | cache hit rate |
| AI/LLM latency | Slow AI feature, high TTFT | prompt size, streaming, model tier |
| AI/LLM cost | Unexpected token spend | token count per call, cache hit rate |
| Rate limit | 429s, throttled responses | request rate vs limit |

Do not optimize without a baseline. Do not rewrite broad scope to solve a narrow bottleneck.

## Output Contract

Output contract: see rules-debug/01.

- **Symptom**: what is slow, measured baseline.
- **Paths inspected**: each with measured cost or "unable to measure — reason."
- **Bottleneck identified / best hypothesis**: with evidence.
- **Fix applied** (if any): change + before/after numbers.
- **Next step** if not resolved.
