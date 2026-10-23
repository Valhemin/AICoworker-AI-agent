TRIGGER: a test passes sometimes and fails other times without code changes or CI shows inconsistent results for the same commit
OUTPUT: compact — categories checked with verdicts, leading hypothesis, fix with 10-run verification pass count
SKIP: consistently failing tests (use root-cause-debugging instead)

---

# Flaky Test Debugging

## When to Use

Use when: a test fails intermittently (passes sometimes, fails other times without code changes), failure rate varies by run order or environment, or CI shows inconsistent results for the same commit.

Use for non-deterministic failures.

## Look For

- Time assumptions (fixed delays, `Date.now()` comparisons).
- Async race conditions (unresolved promises, missing `await`).
- Shared state (globals, module-level caches not reset between tests).
- Order dependencies (tests that assume prior test ran first).
- Network/filesystem dependence (real I/O in unit tests).
- Randomness and missing cleanup (temp files, DB rows, event listeners).

## Process

1. Capture exact failure signal — error, assertion diff, timeout.
2. Check if failure is consistent or intermittent (run 5x).
3. Inspect each category above — rule each in or out.
4. Stabilize behavior; do not simply increase timeouts.
5. Verify: run the test 10x after fix — all must pass.

## Output Contract

Output contract: see rules-debug/01.

- **Categories checked**: each with verdict.
