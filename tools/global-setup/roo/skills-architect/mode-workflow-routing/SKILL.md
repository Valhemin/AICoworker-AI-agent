---
name: mode-workflow-routing
description: Route work through Lead, Spec, Implement, and Debug modes without relying on mode-native workflows.
---

TRIGGER: routing work to the correct mode (Lead/Spec/Implement/Debug) based on artifact readiness and task type
OUTPUT: compact — selected mode and skill with rationale based on artifact readiness state
SKIP: when the correct mode is already obvious from context

---


Choose the mode/workflow based on artifact readiness:

- No project direction or multi-phase goal: Architect Pro.
- Need initial requirements/spec pack: Architect Pro with artifact-workflow-sequence.
- Spec has high-impact ambiguity: Architect Pro with clarification-loop.
- Need technical plan/research/contracts: Architect Pro with technical-planning-research.
- Need actionable implementation tasks: Architect Pro with task-generation.
- Need consistency check before code: Architect Pro with spec-consistency-analysis.
- Ready to build from tasks/spec: Implement Pro with tasks-md-execution or feature-implementation.
- Tests fail or behavior is unknown: Debug Pro with root-cause-debugging.
- Need diff/MR review: Implement Pro or Architect Pro with structured-review-report.

Do not create a separate command workflow. Keep the selected mode as the source of behavior.
