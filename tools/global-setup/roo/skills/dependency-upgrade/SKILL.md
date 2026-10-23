TRIGGER: adding or upgrading packages
OUTPUT: compact — package manager checked, official docs and compatibility confirmed, peer deps, breaking changes, tests run after install
SKIP: removing packages; use a dedicated audit tool for identifying unused dependencies

---

# Dependency Upgrade

Use when adding or upgrading packages.

Check:
- Existing package manager and lockfile.
- Official install docs and latest compatibility.
- Peer dependencies.
- Bundle/runtime/security impact.
- Migration steps and breaking changes.
- Tests after install/change.
