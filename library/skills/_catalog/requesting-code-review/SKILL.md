---
name: requesting-code-review
description: "Review a completed slice before continuing."
---

TRIGGER: after completing an implementation slice and handing off to another person or agent for review — produces a review request artifact for an external reviewer
OUTPUT: compact — review findings per dimension, block/fix/risk classification
SKIP: trivial formatting or comment-only changes with no logic impact

---


Use after each meaningful implementation slice.

Review dimensions:
- spec/acceptance compliance
- correctness and edge cases
- type safety and error handling
- security/privacy
- performance and maintainability
- tests/verification coverage
- UI/accessibility/responsiveness when relevant

Block progress on critical issues. Fix high-confidence issues immediately; record uncertain ones as risks.
