#!/usr/bin/env bash
# Link dev skills from this repo into global skill dirs of Claude, Codex, Antigravity, Cursor.
# Default dry-run. Use --apply to write. Never overwrites existing non-symlink entries.
# ponytail: symlinks only; repo move breaks links -> rerun with --apply. Rules file is append-once.
set -euo pipefail
APPLY=0; [ "${1:-}" = "--apply" ] && APPLY=1
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SK="$ROOT/library/skills"
# Only CORE skills go global (each skill costs its name+description in every session's context).
# Everything else is reached through skill-router (generated index, read on demand).
CORE=" search-first root-cause-debugging verify-change work-plan build-fix-loop tdd-red-green-refactor independent-review security-threat-model web-security-assurance error-handling-patterns product-legal-compliance consent-and-erasure "
# Skill groups usable in any repo. Excluded: ceo, creator*, sales, marketer, office, support, application, browser, rea, designer, _catalog.
GROUPS_=(_shared implement debug reviewer tester architect)
# Role-specific skills skipped even inside groups (need aicoworker workspace layout).
SKIP=" creator-knowledge mcp-connect mcp-server-build packaging-distribution "
TARGETS=("$HOME/.roo/skills" "$HOME/.codex/skills" "$HOME/.agents/skills" "$HOME/.claude/skills" "$HOME/.gemini/antigravity/skills" "$HOME/.cursor/skills")
run(){ if [ $APPLY = 1 ]; then "$@"; else echo "DRY: $*"; fi; }

seen=" "
list=(); rest=()
for g in "${GROUPS_[@]}"; do
  for d in "$SK/$g"/*/; do
    n="$(basename "$d")"
    [ -f "$d/SKILL.md" ] || continue
    case "$SKIP" in *" $n "*) continue;; esac
    case "$seen" in *" $n "*) echo "DUP name $n, skipped $d"; continue;; esac
    seen="$seen$n "
    case "$CORE" in *" $n "*) list+=("${d%/}");; *) rest+=("${d%/}");; esac
  done
done
# Router: one registered skill whose index lists every non-core skill; agent Reads only the matching SKILL.md.
R="$ROOT/tools/global-setup/skill-router"
if [ $APPLY = 1 ]; then
  mkdir -p "$R"
  {
    echo '---'; echo 'name: skill-router'
    echo 'description: Use when the task may need a specialized dev skill not already listed (frontend, backend, db migration, QA/testing, architecture, planning, SEO, Electron, API integration, observability). Read the index, then Read only the matching SKILL.md.'
    echo '---'; echo
    echo "Pick at most 1-2 skills below matching the task. Entry = path under $SK/ ; Read only that <path>/SKILL.md (and references/ if needed). Do not read the rest."; echo
    for s in "${rest[@]}"; do
      d="$(sed -n 's/^description: *//p' "$s/SKILL.md" | head -1 | cut -c1-90)"
      echo "- ${s#$SK/}: $d"
    done
  } > "$R/SKILL.md"
fi
list+=("$R" "$SK/_catalog/data-privacy-compliance")
echo "${#list[@]} registered, ${#rest[@]} via router"

for t in "${TARGETS[@]}"; do
  run mkdir -p "$t"
  for l in "$t"/*; do
    [ -L "$l" ] || continue
    case "$(readlink "$l")" in "$SK"/*) case "$CORE $(basename "$R")" in *" $(basename "$l") "*) ;; *) run rm "$l";; esac;; esac
  done
  for s in "${list[@]}"; do
    dest="$t/$(basename "$s")"
    if [ -L "$dest" ]; then run ln -sfn "$s" "$dest"
    elif [ -e "$dest" ]; then echo "KEEP existing $dest"
    else run ln -s "$s" "$dest"; fi
  done
done

# Global rules: marker block replaced on every run (edit RULES.md, rerun). Cursor has no global rules file: paste RULES.md in Settings > Rules.
MARK="<!-- aicoworker-base -->"; END="<!-- /aicoworker-base -->"
for f in "$HOME/.claude/CLAUDE.md" "$HOME/.codex/AGENTS.md" "$HOME/.gemini/GEMINI.md"; do
  if [ $APPLY = 1 ]; then
    mkdir -p "$(dirname "$f")"; touch "$f"
    python3 - "$f" "$ROOT/tools/global-setup/RULES.md" "$MARK" "$END" <<'PY'
import sys,re
f,r,m,e=sys.argv[1:]
t=open(f).read(); body=open(r).read().rstrip('\n')
blk=f"{m}\n{body}\n{e}\n"
if m in t:
    i=t.index(m); j=t.find(e,i)
    j = j+len(e)+1 if j!=-1 else len(t)
    t=t[:i]+blk+t[j:]
else:
    t=t.rstrip('\n')+('\n\n' if t.strip() else '')+blk
open(f,'w').write(t)
PY
  else echo "DRY: update rules block in $f"; fi
done

# Zoo Code / Roo: global rules, modes, mode skills. Source: sources/ZooCodeConfig/copy-this copied into roo/.
# Reads ~/.roo/*, not CLAUDE.md. Project .roomodes/.roo override these.
RR="$ROOT/tools/global-setup/roo"
run mkdir -p "$HOME/.roo/skills"
for l in "$HOME"/.roo/rules*/* "$HOME"/.roo/skills/*; do [ -L "$l" ] && [ ! -e "$l" ] && run rm "$l"; done
for d in rules rules-architect rules-implement rules-debug; do
  run mkdir -p "$HOME/.roo/$d"
  for f in "$RR/$d"/*; do run ln -sfn "$f" "$HOME/.roo/$d/$(basename "$f")"; done
done
run ln -sfn "$ROOT/tools/global-setup/RULES.md" "$HOME/.roo/rules/99-aicoworker-base.md"
# Mode skills only for the 3 defined modes (other skills-<slug> dirs are ignored by Zoo Code).
for d in skills-architect skills-implement skills-debug skills-tester; do
  [ -L "$HOME/.roo/$d" ] || [ ! -e "$HOME/.roo/$d" ] && run ln -sfn "$RR/$d" "$HOME/.roo/$d" || echo "KEEP $HOME/.roo/$d"
done
# Generic skills from the config: add per skill, never replace existing names (core skills keep library/ source).
for s in "$RR"/skills/*/; do n="$(basename "$s")"; [ -e "$HOME/.roo/skills/$n" ] || run ln -s "${s%/}" "$HOME/.roo/skills/$n"; done
[ -e "$HOME/.roo/templates" ] && [ ! -L "$HOME/.roo/templates" ] || run ln -sfn "$RR/templates" "$HOME/.roo/templates"
# Global modes: only when the file is empty/absent (never overwrite user modes).
MF="$HOME/Library/Application Support/Code/User/globalStorage/zoocodeorganization.zoo-code/settings/custom_modes.yaml"
if [ ! -s "$MF" ] || grep -q 'customModes: \[\]' "$MF" || grep -q 'slug: tester' "$MF"; then run mkdir -p "$(dirname "$MF")"; run cp "$RR/custom_modes.yaml" "$MF"; else echo "KEEP existing modes $MF"; fi
