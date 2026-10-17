---
name: release-to-users
description: Take a committed idea to a sellable build. Stop before posting or collecting payment.
---

# Release to users

Complete only the phases that are missing. Customer-facing artifacts at the `ceo` gate always include Vietnamese first then English.

1. `idea-fit.md` concludes build or small slice, with VND and USD prices. Missing: delegate to `analyst`. Conclusion is do-not-build: stop.
2. `market-choice.md`. Missing: call `market-choice`.
3. Spec sufficient to code. Missing: delegate to `architect`. UI requires `docs/design/DESIGN.md` and `BRAND.md`.
4. A coded build. Missing: stop and state that `implement` is needed.
5. `docs/test/product-test.md` all PASS. FAIL: delegate those items to `debug`, then have `tester` rerun.
6. Technical gate: call `release-readiness`. Rollback and open risks included.
7. Channel and four assets: delegate to `marketer`. User sells directly.

Media division skips the code and tester steps. Needs a script, then `marketer`.

Deploy, open for sale, or public posting requires approval for the exact task. State is `WAITING REVIEW` until then.

Write `../shared/01_Projects/<domain>/<project-name>/release-plan.md` with two sections `## Vietnamese` and `## English`. End with one next step.
