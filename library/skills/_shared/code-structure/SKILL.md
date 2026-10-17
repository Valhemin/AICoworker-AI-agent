---
name: code-structure
description: Place new code in the correct layer of the repo. If the repo already has a structure, follow it.
---

# Code structure

If the repo already has folders and file conventions, follow them. Do not create a parallel new tree.

If the repo has no structure, use four layers:

- `domain`: business rules. No network, database, file, or framework access.
- `app`: one user-facing job, one file. Calls `domain`. Knows nothing about HTTP or UI.
- `adapters`: HTTP, database, queues, files, and devices. Converts external data into `app` inputs. Login, sessions, and app versioning live here.
- `ui`: screens. Calls `app` or a client. Does not duplicate business rules.

Tests live next to the unit under test, or in `tests/` with the same name. A new task does not add `utils`, `helpers`, or `common`.

Each `app` file has: input, output, one function, and named errors. No framework imports.

Each adapter has: one place to receive external data, one place to call exactly one `app` job, and one place to return named errors. Do not put pricing or permission rules in UI.

Write the directory tree once into `docs/architecture/STRUCTURE.md` when the repo has no such file. Do not rewrite it later.

When done, continue coding. Do not create empty template files.
