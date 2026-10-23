TRIGGER: after fixing a bug, to write a targeted test that prevents recurrence by failing on the unfixed code
OUTPUT: compact — test that fails on unfixed code and passes after fix, covering the exact input/output and adjacent edge cases
SKIP: writing tests for new features not previously broken; this skill is only for post-bugfix regression coverage

---

# Regression Test Design

Use after fixing a bug to prevent recurrence.

## Process

1. Identify the exact observable behavior the bug caused (not implementation internals).
2. Write a test that **fails** on the unfixed code and **passes** after the fix.
3. Keep scope narrow — one bug, one test (or one describe block).
4. Prefer testing externally observable behavior over internal implementation.
5. Run the test against the unfixed code to confirm it catches the bug.
6. Run the test against the fixed code to confirm it passes.

## What to Test

- The exact input that triggered the bug.
- The exact wrong output or error that was produced.
- Edge cases adjacent to the bug (off-by-one, empty input, null).

Do not write tests for implementation details that may change. Test the contract.

## Output Contract

Every response must include:
- **Bug reproduced by test**: confirm the test fails before fix.
- **Test passes after fix**: confirm with output.
- **Test code**: final form, ready to commit.
- **Coverage note**: what adjacent cases were added (if any), or "none needed."

Never write a regression test without verifying it catches the original bug.
