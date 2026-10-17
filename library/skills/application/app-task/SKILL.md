---
name: app-task
description: Run a desktop workflow described in the task, verify the output, then write a handoff.
---

# Application task

Only run when the task has all of: Project ID, Task ID, application, workflow, input, output, environment, completion criteria, and approval requirements.

1. Read the task in `../shared/04_Queues/Application/Inbox`.
2. If the same Task ID already has output, do not re-run. Read the log and report status.
3. Run exactly the stated workflow. If the interface differs from the workflow, stop, take a screenshot, and note the deviation.
4. Logs go to `../shared/09_Logs`. Screenshots go to `../shared/07_Evidence/Application`.
5. Verify that the output file or record is actually present.
6. Write the handoff to `Outbox`.

Do not install software, edit the registry, or click around on production. Retry at most once when certain that no side effect has been created yet.
