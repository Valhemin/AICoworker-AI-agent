---
name: harness-audit
description: Audit an external agent pack, MCP catalog, or hook system before adoption to decide integrate, port, reference, or reject.
---

TRIGGER: before adopting a new external agent pack, MCP catalog, hook system, or major rule/skill update
OUTPUT: compact — audit dimensions assessed, recommendation (integrate directly / port as rule-skill / keep as reference / reject)
SKIP: minor individual skill or rule additions that don't change the overall harness structure

---

# Harness Audit

## Audit Dimensions

- Does it duplicate existing mode/rule/skill behavior?
- Does it require a runtime not present in Zoo/Roo?
- Does it add commands when the project is mode-native?
- Does it require hooks or shell automation with elevated risk?
- Does it add many tools/MCPs that increase context cost?
- Can the useful core be ported into a small rule/skill instead?

## Recommendation Format

- Integrate directly.
- Port as rule/skill.
- Keep as optional reference.
- Reject / do not install.

Prefer small mode-native ports over wholesale imports.
