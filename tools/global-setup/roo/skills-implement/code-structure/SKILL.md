---
name: code-structure
description: Place new code in the correct layer of the repo. If the repo already has a structure, follow it.
---

# Code structure

If the repo already has directories and file types, follow them. Do not create a parallel new tree.

If the repo has no structure, use four layers:

- `domain`: business rules. No network, database, file, or framework reads.
- `app`: one user action, one file. Calls `domain`. Knows nothing about HTTP or UI.
- `adapters`: HTTP, database, queues, files, and devices. Converts external data into `app` inputs. Auth, session, and app versioning live here.
- `ui`: screens. Calls `app` or a client. Does not copy business rules.

Tests live beside the unit under test, or in `tests/` with the same name. A new task does not add `utils`, `helpers`, or `common`.

Each `app` task file must have: input, output, one function, and named errors. No framework imports.

Each adapter must have: a place to receive external data, a call to exactly one `app` task, and a place to return named errors. No pricing rules or permission logic in the UI.

Document the directory tree once in `docs/architecture/STRUCTURE.md` when that file does not exist. Do not rewrite it on subsequent changes.

When done, continue coding. Do not create empty template files.
