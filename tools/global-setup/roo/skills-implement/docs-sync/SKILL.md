TRIGGER: after implementation changes public behavior, APIs, setup, environment variables, UX flows, configuration, or operational procedures
OUTPUT: compact — changed docs listed with what was updated, any intentionally skipped docs noted
SKIP: internal refactors with no observable behavior change for users or integrators

---

# Docs Sync

Use after implementation changes public behavior, APIs, setup, environment variables, UX flows, configuration, or operational procedures.

## Workflow

- Identify docs/spec/tasks/checklists affected by the code change.
- Update only the smallest necessary docs.
- Keep docs aligned with actual implementation, not intended implementation.
- Mark tasks/checklist items complete only after the code and verification are complete.
- Add migration/rollback notes when behavior or data shape changes.

## Output

Mention changed docs and any docs intentionally skipped.
