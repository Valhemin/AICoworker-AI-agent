# Code Quality Contract — All Modes

Apply these rules whether implementing a new feature, fixing a bug, or refactoring.

## Consistency

New code must match the style, patterns, and conventions already present in the codebase:

- **Match the existing style:** same naming conventions (camelCase/snake_case), same import order, same file structure pattern. Never introduce a new convention that conflicts with what's already there.
- **Match the existing abstractions:** if the project has a `useApi` hook, use it — don't write a raw `fetch`. If it has an error boundary pattern, use it.
- **Match the data shapes:** reuse existing types, interfaces, and models. Don't create parallel types for the same domain entity.
- **Spot inconsistency proactively:** if you notice the surrounding code already violates one of these rules, flag it and fix it in the same diff (DRY Sweep applies here too).

## No Dead Code

Code that serves no purpose is a liability — it confuses readers and rots:

- **Remove:** unreachable code, commented-out code blocks, unused imports, unused variables/functions/types, empty catch blocks that swallow errors silently, no-op functions.
- **Don't leave it with a comment** like `// TODO: remove later` — remove it now.
- **Exception:** code guarded by a feature flag that is actively used, or test fixtures — keep with a clear comment explaining why.
- **When fixing a bug:** scan the fix area for dead code and remove it in the same diff. Don't leave it for later.

## DRY — Extract When Used 2+ Times

Duplication is the root of inconsistency:

- **Logic:** if the same logic block appears (or will appear) in 2+ places, extract it to a shared utility/hook/function before finishing the task.
- **UI components:** if a UI pattern appears 2+ times with slight variations, extract to a component with props.
- **Constants/strings:** magic values used 2+ times belong in a named constant.
- **Where to put utils:** match project conventions (`utils/`, `lib/`, `helpers/`, or domain-specific folder). One responsibility per util — no "mega-util" files.

## Maintainability

Code is read far more often than written:

- **Names over comments:** choose names that eliminate the need for a comment. A comment that explains WHAT the code does is a sign the name is wrong.
- **No surprise side effects:** functions do what their name says and nothing else.
- **Predictable structure:** new files follow the project's folder conventions. No one-off structures unless justified.
- **Explicit over clever:** a clear if-else beats a clever ternary chain. Readability is a feature.

## Testability by Design

Write code that can be tested — not code that happens to pass tests. Untestable architecture is a defect discovered too late.

- **Pure functions over side-effectful code:** logic that transforms inputs to outputs without touching global state, I/O, or time is inherently testable. Extract it.
- **Inject dependencies, don't import them directly:** if a module `import`s the DB client, clock, or HTTP client at the top level — tests can't replace them. Accept them as constructor/function params instead.
- **Separate side effects from logic:** fetch data → pass to pure function → write result. The pure middle step is the only part that needs complex testing.
- **No `new Date()` or `Math.random()` deep in logic:** pass the current time and random seed as parameters so tests can control them.
- **Small units with one responsibility:** a 300-line function that does fetching, transformation, validation, and writing is impossible to unit-test. Split it before finishing.
- **Observable state:** functions that mutate internal state with no observable output cannot be tested. Expose what changed, or return the new state.
- **Avoid `private` that hides testable logic:** if logic is complex enough to need testing, it shouldn't be buried inside a private method with no seam. Extract to a testable unit.
- **Test seams over test-specific code:** create testability through architecture (dependency injection, pure functions, interfaces), not by adding `if (env === 'test')` branches.

The bar: after finishing an implementation, you must be able to point to at least one runnable assertion that would catch a regression in the core logic — without mocking the entire world.

## For Bug Fixes Specifically

A bug fix that introduces dead code, duplicates logic, or breaks consistency is a worse fix even if it makes the test pass:

- Fix the bug with the minimal correct change.
- Don't copy-paste logic from elsewhere — use the shared util, or extract one.
- Don't silence errors to make the symptom disappear — fix the root cause.
- After applying the fix, check: does the surrounding code now have dead imports or unused variables introduced by the change? Clean them up.
