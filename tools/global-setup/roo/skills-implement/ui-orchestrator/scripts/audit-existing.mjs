#!/usr/bin/env node
/**
 * audit-existing.mjs — analyze existing project UI before targeted fixes
 *
 * Usage:
 *   node audit-existing.mjs --phase extract   → extract current design tokens from codebase
 *   node audit-existing.mjs --phase audit     → run Impeccable + validate-design, produce audit-report.md
 *   node audit-existing.mjs --phase all       → extract then audit
 */

import { execSync, spawnSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { resolve, extname, relative } from 'path';
import { createHash } from 'crypto';

const args = process.argv.slice(2);
const phase = args[args.indexOf('--phase') + 1] || 'all';

const root = (() => {
  let dir = process.cwd();
  const { dirname } = await import('path');
  while (true) {
    if (existsSync(resolve(dir, 'package.json')) || existsSync(resolve(dir, '.git'))) return dir;
    const p = dirname(dir);
    if (p === dir) return process.cwd();
    dir = p;
  }
})();

const STATE_SCRIPT    = resolve(import.meta.dirname, 'state.mjs');
const VALIDATE_SCRIPT = resolve(import.meta.dirname, 'validate-design.mjs');
const UI_DIR          = resolve(root, '.ui-orchestrator');
const EXTRACTED_JSON  = resolve(UI_DIR, 'extracted-design.json');
const AUDIT_REPORT    = resolve(UI_DIR, 'audit-report.md');
const DESIGN_PATH     = resolve(root, 'DESIGN.md');

mkdirSync(UI_DIR, { recursive: true });

function run(cmd, opts = {}) {
  try { return execSync(cmd, { encoding: 'utf8', cwd: root, stdio: 'pipe', ...opts }); }
  catch (e) { return e.stdout || e.stderr || ''; }
}

// ──────────────────────────────────────────────
// PHASE: EXTRACT
// ──────────────────────────────────────────────

async function extract() {
  console.log('\n=== Phase A1: Extract Current Design System ===\n');

  const extracted = {
    colors: new Set(),
    cssVars: {},
    tailwindColors: {},
    fontFamilies: new Set(),
    fontSizes: new Set(),
    spacingValues: new Set(),
    componentPatterns: [],
    hardcodedHex: [],
  };

  // 1. Try Impeccable extract
  const impeccableOut = run('npx --yes impeccable extract 2>/dev/null');
  if (impeccableOut && !impeccableOut.includes('not found') && !impeccableOut.includes('error')) {
    console.log('✓ Impeccable extract ran');
  }

  // 2. Scan Tailwind config for color tokens
  const twConfigPaths = ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.mjs'];
  for (const p of twConfigPaths) {
    const full = resolve(root, p);
    if (existsSync(full)) {
      const content = readFileSync(full, 'utf8');
      const colorMatches = content.match(/'[a-z]+':\s*['"]#[0-9a-fA-F]{3,8}['"]/g) || [];
      for (const m of colorMatches) {
        const [k, v] = m.split(':').map(s => s.trim().replace(/['"]/g, ''));
        extracted.tailwindColors[k] = v;
      }
      console.log(`✓ Tailwind config scanned: ${colorMatches.length} color entries`);
    }
  }

  // 3. Scan CSS for custom properties
  const cssFiles = findFiles(root, ['.css', '.scss'], ['node_modules', '.git', 'dist', 'build', '.next']);
  for (const f of cssFiles.slice(0, 20)) {
    const content = readFileSync(f, 'utf8');
    const varMatches = content.matchAll(/--([a-z][\w-]+)\s*:\s*([^;}\n]+)/g);
    for (const m of varMatches) {
      extracted.cssVars[`--${m[1]}`] = m[2].trim();
    }
    const fontMatches = content.matchAll(/font-family\s*:\s*([^;}\n]+)/g);
    for (const m of fontMatches) extracted.fontFamilies.add(m[1].trim().replace(/['"]/g, ''));
  }
  console.log(`✓ CSS scanned: ${Object.keys(extracted.cssVars).length} CSS vars, ${extracted.fontFamilies.size} font families`);

  // 4. Grep hardcoded hex colors in source
  const hexGrep = run(
    `grep -rn --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" --include="*.css" --include="*.scss" -E '#[0-9a-fA-F]{6}' ${resolve(root, 'src')} 2>/dev/null || true`
  );
  const hexRe = /#([0-9a-fA-F]{6})/g;
  const hexCounts = {};
  let hm;
  while ((hm = hexRe.exec(hexGrep)) !== null) {
    const h = `#${hm[1].toLowerCase()}`;
    hexCounts[h] = (hexCounts[h] || 0) + 1;
  }
  extracted.hardcodedHex = Object.entries(hexCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([hex, count]) => ({ hex, count }));
  console.log(`✓ Hardcoded hex found: ${extracted.hardcodedHex.length} unique values`);

  // 5. Detect font sizes from Tailwind classes
  const srcGrep = run(
    `grep -roh --include="*.tsx" --include="*.jsx" 'text-[a-z0-9]+' ${resolve(root, 'src')} 2>/dev/null | sort | uniq -c | sort -rn | head -20 || true`
  );
  const textClasses = srcGrep.split('\n').filter(Boolean).map(l => l.trim().split(/\s+/).pop());
  extracted.fontSizes = textClasses;

  // Serialize sets for JSON
  const out = {
    colors: [...extracted.colors],
    cssVars: extracted.cssVars,
    tailwindColors: extracted.tailwindColors,
    fontFamilies: [...extracted.fontFamilies],
    fontSizes: extracted.fontSizes,
    hardcodedHex: extracted.hardcodedHex,
    extractedAt: new Date().toISOString(),
  };

  writeFileSync(EXTRACTED_JSON, JSON.stringify(out, null, 2));
  console.log(`\n✓ Extracted design data → ${EXTRACTED_JSON}`);

  // 6. If no DESIGN.md: generate draft from extracted data
  if (!existsSync(DESIGN_PATH)) {
    console.log('\nNo DESIGN.md found — generating draft from extracted data...');
    generateDraftDesignMd(out);
    console.log(`✓ Draft DESIGN.md created. Review and edit before proceeding.`);
    run(`node ${STATE_SCRIPT} set designApproved false`);
  } else {
    // Compare extracted vs declared — flag drift
    reportDrift(out);
  }

  run(`node ${STATE_SCRIPT} phase extractDesign done`);
  console.log('\nPhase A1 complete. Proceed to Phase A2 (audit).\n');
}

function generateDraftDesignMd(extracted) {
  const topColors = extracted.hardcodedHex.slice(0, 6);
  const colorTable = topColors.length > 0
    ? topColors.map(({ hex, count }) => `| \`--color-unknown-${hex.slice(1)}\` | \`${hex}\` | Found ${count} times — assign role |`).join('\n')
    : '| `--color-primary` | `#3B82F6` | Replace with actual primary |';

  const fontList = extracted.fontFamilies.size > 0
    ? [...extracted.fontFamilies].slice(0, 3).join(', ')
    : 'Not detected — check codebase';

  const cssVarList = Object.entries(extracted.cssVars).slice(0, 10)
    .map(([k, v]) => `- \`${k}\`: \`${v}\``)
    .join('\n') || '- No CSS variables found';

  const content = `# Design System
<!-- DRAFT — generated by ui-orchestrator audit-existing. Review and complete each section. -->
<!-- Sections marked auto-generated will be updated on bridge re-run. User sections are preserved. -->

## Product Mode

Surface mode: **Operate** ← update to match actual product purpose

## Design Intent

*Extracted from existing codebase. Describe the intended design direction here.*

Anti-patterns to avoid:
- Generic AI-purple gradients
- Three equal-width feature cards
- Hardcoded hex values in components

## Agent Design Controls

- DESIGN_VARIANCE: 5
- MOTION_INTENSITY: 4
- VISUAL_DENSITY: 6
- Surface mode: Operate
- Taste activation: constrained

## Color

Detected CSS variables:
${cssVarList}

Hardcoded hex found (assign to tokens or replace):
${topColors.map(({ hex }) => `- \`${hex}\` → assign to a named token`).join('\n') || '- None detected'}

| Token | Value | Usage |
|---|---|---|
${colorTable}

## Typography

Detected font families: ${fontList}

| Token | Value |
|---|---|
| Display / Heading | ${[...extracted.fontFamilies][0] || 'Not detected'} |
| Body / UI | ${[...extracted.fontFamilies][1] || [extracted.fontFamilies][0] || 'Not detected'} |

## Spacing and Density

VISUAL_DENSITY: 6/10 ← adjust after reviewing codebase spacing
Base unit: 8px. Scale: 4/8/12/16/24/32/48/64/96px

## Shape and Elevation

*Document border-radius and shadow values from codebase here.*

## Motion

MOTION_INTENSITY: 4/10 ← adjust after reviewing animations
Duration: 150–300ms. Easing: ease-out.
Honor prefers-reduced-motion.

## Layout

*Document breakpoints and grid structure here.*
Mobile ≤768px / Tablet 768–1280px / Desktop >1280px

## Components

*Document existing component patterns here.*

## Interaction States

All interactive elements must implement: Default / Hover / Focus / Active / Disabled / Loading / Empty / Error

## Responsive Behavior

*Document responsive behavior per component type here.*

## Accessibility

Non-negotiable baseline (WCAG AA):
- Contrast ≥4.5:1 normal text, ≥3:1 large text
- Keyboard navigable, focus visible, semantic HTML
- Form labels visible (not placeholder-only)

## Do and Do Not

**Do:** use CSS variables for all colors, spacing, typography.
**Do not:** hardcode hex, introduce new tokens without updating this file.

## Provenance

- source: audit-existing (extracted from codebase)
- generated_at: ${new Date().toISOString()}
- status: DRAFT — requires human review before approval
`;

  writeFileSync(DESIGN_PATH, content);
}

function reportDrift(extracted) {
  const designContent = readFileSync(DESIGN_PATH, 'utf8');
  const declaredHex = new Set();
  const hexRe = /`#[0-9a-fA-F]{3,8}`/g;
  let m;
  while ((m = hexRe.exec(designContent)) !== null) {
    declaredHex.add(m[0].replace(/`/g, '').toLowerCase());
  }

  const drifted = extracted.hardcodedHex.filter(({ hex }) => !declaredHex.has(hex.toLowerCase()));
  if (drifted.length > 0) {
    console.log(`\n⚠  Design token drift: ${drifted.length} hardcoded colors in code not in DESIGN.md:`);
    for (const { hex, count } of drifted.slice(0, 8)) {
      console.log(`   ${hex} (×${count})`);
    }
  } else {
    console.log('\n✓ No color drift detected — codebase matches DESIGN.md tokens.');
  }
}

// ──────────────────────────────────────────────
// PHASE: AUDIT
// ──────────────────────────────────────────────

async function audit() {
  console.log('\n=== Phase A2: Audit Existing UI ===\n');

  const results = { impeccable: '', validate: '', timestamp: new Date().toISOString() };

  // 1. Impeccable critique
  console.log('Running impeccable critique...');
  results.impeccableCritique = run('npx --yes impeccable critique 2>&1');

  // 2. Impeccable audit
  console.log('Running impeccable audit...');
  results.impeccableAudit = run('npx --yes impeccable audit 2>&1');

  // 3. Impeccable deterministic detector
  console.log('Running impeccable detector...');
  results.impeccableDetector = run('npx --yes impeccable 2>&1');

  // 4. validate-design.mjs
  console.log('Running validate-design...');
  results.validateDesign = run(`node ${VALIDATE_SCRIPT} 2>&1`);

  // 5. Build audit report
  const report = buildAuditReport(results);
  writeFileSync(AUDIT_REPORT, report);
  console.log(`\n✓ Audit report → ${AUDIT_REPORT}`);

  // Print summary
  const criticalCount = (report.match(/### Critical/g) || []).length;
  const majorCount    = (report.match(/### Major/g) || []).length;
  const minorCount    = (report.match(/### Minor/g) || []).length;

  console.log(`\nSummary: ${criticalCount} critical / ${majorCount} major / ${minorCount} minor issue(s)`);
  console.log('\nPresent audit-report.md to user and ask for scope approval (Phase A3).\n');

  run(`node ${STATE_SCRIPT} phase auditExisting done`);
}

function buildAuditReport(results) {
  return `# UI Audit Report

Generated: ${results.timestamp}

## Summary

Review the issues below and choose a fix scope:

1. Fix all critical + major
2. Fix critical only
3. Visual upgrade (Taste overlay)
4. Specific scope (describe below)
5. Full redesign (new design direction)

---

## Impeccable Critique (UX Heuristics)

\`\`\`
${(results.impeccableCritique || 'Not available').slice(0, 3000)}
\`\`\`

## Impeccable Audit (A11y + Perf + Responsive)

\`\`\`
${(results.impeccableAudit || 'Not available').slice(0, 3000)}
\`\`\`

## Deterministic Detector (59 Rules)

\`\`\`
${(results.impeccableDetector || 'Not available').slice(0, 2000)}
\`\`\`

## Design Token Validation

\`\`\`
${(results.validateDesign || 'Not available').slice(0, 2000)}
\`\`\`

---

## Recommended Fix Scope

Based on findings above, the recommended scope is:
- [ ] Fix critical accessibility violations
- [ ] Replace hardcoded hex with DESIGN.md tokens
- [ ] Fix responsive issues (if any)
- [ ] Apply Taste overlay for visual polish (constrained mode)

Approve scope before proceeding to Phase A5.
`;
}

// ──────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────

function findFiles(dir, exts, skipDirs, files = []) {
  try {
    for (const entry of readdirSync(dir)) {
      if (skipDirs.includes(entry)) continue;
      const full = resolve(dir, entry);
      if (statSync(full).isDirectory()) findFiles(full, exts, skipDirs, files);
      else if (exts.includes(extname(entry))) files.push(full);
    }
  } catch {}
  return files;
}

// ──────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────

if (phase === 'extract' || phase === 'all') await extract();
if (phase === 'audit'   || phase === 'all') await audit();
