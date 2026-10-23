---
name: agentmemory-forget
description: Remove or correct stale, unsafe, or wrong memory.
---

TRIGGER: a memory is outdated, wrong, project-inappropriate, privacy-sensitive, or contradicts current repo state
OUTPUT: compact — memory deleted with stated reason, corrected safe memory written if useful
SKIP: uncertain or potentially useful memories; only remove when the reason is clear and confirmed

---


Use when a memory is outdated, wrong, project-inappropriate, privacy-sensitive, or contradicts current repo truth.

Before deleting, confirm the reason:
- obsolete decision
- wrong inference
- unsafe/sensitive content
- moved/renamed architecture
- user requested deletion

After forgetting, optionally write a corrected safe memory if useful.
