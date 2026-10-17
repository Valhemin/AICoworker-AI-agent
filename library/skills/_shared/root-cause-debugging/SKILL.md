---
name: root-cause-debugging
description: "a bug is reported, a test fails for an unclear reason, or behavior diverges from expected output"
---

TRIGGER: a bug is reported, a test fails for an unclear reason, or behavior diverges from expected output
OUTPUT: detailed — failure signal, hypotheses tested with verdicts, root cause confirmed, fix applied with verification
SKIP: known-category bugs where a more specific skill applies (flaky-test-debugging, concurrency-debugging, etc.)

---

# Root Cause Debugging

## When to Use

Use when: a bug is reported, a test fails for an unclear reason, or behavior diverges from expected output. Use this before proposing any fix — diagnose first, fix after root cause is confirmed.

Use for bugs and failing behavior.

## Process

1. Reproduce or narrow — confirm exact failure signal (error, stack, log line).
2. Trace the code path from symptom to origin.
3. Form hypotheses ranked by likelihood.
4. Test one hypothesis at a time — rule in or out with evidence. A result you saw is an observation. A cause you inferred is not an observation.
5. Fix the root cause, not the symptom; smallest safe diff.
6. Add regression coverage when practical.
7. Verify the original failure path is resolved.

## Output Contract

Output contract: see rules-debug/01.
