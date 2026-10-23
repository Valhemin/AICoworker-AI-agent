#!/usr/bin/env node
/**
 * run-uipro.mjs — execute UI UX Pro Max search.py with resolved dials
 *
 * Reads dials from state.json. Writes:
 *   design-system/<project>/MASTER.md
 *   .ui-orchestrator/uipro-output.json
 *
 * Guard: if state.designApproved = true → exits with code 2 (skip signal).
 */

import { execSync, spawnSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

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

const STATE_SCRIPT = resolve(import.meta.dirname, 'state.mjs');
const OUTPUT_DIR   = resolve(root, '.ui-orchestrator');
const OUTPUT_JSON  = resolve(OUTPUT_DIR, 'uipro-output.json');

function readState() {
  const p = resolve(root, '.ui-orchestrator/state.json');
  if (!existsSync(p)) { console.error('No state.json. Run: node state.mjs init <name>'); process.exit(1); }
  return JSON.parse(readFileSync(p, 'utf8'));
}

function findPython() {
  for (const bin of ['python3', 'python']) {
    try { execSync(`which ${bin}`, { stdio: 'pipe' }); return bin; } catch {}
  }
  return null;
}

function findUiproScript(state) {
  const candidates = [
    process.env.UIPRO_ROOT && resolve(process.env.UIPRO_ROOT, 'scripts/search.py'),
    state.provenance?.uiproRoot && resolve(state.provenance.uiproRoot, 'scripts/search.py'),
    resolve(root, '.claude/skills/ui-ux-pro-max/scripts/search.py'),
    resolve(process.env.HOME || '', '.claude/skills/ui-ux-pro-max/scripts/search.py'),
  ].filter(Boolean);
  return candidates.find(p => existsSync(p)) || null;
}

function buildQuery(state) {
  // Read PRODUCT.md for a distilled query (max 5 keywords + product type)
  const productPath = resolve(root, 'PRODUCT.md');
  if (!existsSync(productPath)) return state.projectName || 'web app';
  const text = readFileSync(productPath, 'utf8');

  // Extract product type and keywords from first 500 chars (most signal-dense section)
  const excerpt = text.slice(0, 500).toLowerCase();
  const typeMatch = excerpt.match(/(?:type|product|category|mode)[:\s]+([^\n,]+)/i);
  const productType = typeMatch?.[1]?.trim() || '';

  // Extract industry/domain keywords
  const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'for', 'and', 'or', 'to', 'of', 'with', 'that', 'this', 'it']);
  const words = excerpt.replace(/[^a-z0-9 ]/g, ' ').split(/\s+/)
    .filter(w => w.length > 3 && !stopWords.has(w))
    .slice(0, 10);

  return [productType, ...words.slice(0, 4)].filter(Boolean).join(' ');
}

// --- Main ---

const state = readState();

// Guard: skip if already approved
if (state.designApproved === true) {
  console.log('⏭  Phase 3 skipped: designApproved = true. No redesign requested.');
  execSync(`node ${STATE_SCRIPT} phase uiproRun skipped "designApproved=true"`, { cwd: root, stdio: 'pipe' });
  process.exit(2);
}

const py = findPython();
if (!py) { console.error('Python 3 not found. Run preflight.'); process.exit(1); }

const uiproScript = findUiproScript(state);
if (!uiproScript) { console.error('UI UX Pro Max script not found. Run preflight.'); process.exit(1); }

const { DESIGN_VARIANCE: v, MOTION_INTENSITY: m, VISUAL_DENSITY: d } = state.dials;
const query = buildQuery(state);
const projectName = state.projectName || 'project';

mkdirSync(OUTPUT_DIR, { recursive: true });

console.log(`\nRunning UI UX Pro Max:`);
console.log(`  query    : "${query}"`);
console.log(`  variance : ${v}  motion: ${m}  density: ${d}`);
console.log(`  output   : ${OUTPUT_JSON}\n`);

const result = spawnSync(py, [
  uiproScript,
  query,
  '--design-system',
  '--persist',
  '--json',
  '--variance', String(v),
  '--motion',   String(m),
  '--density',  String(d),
  '-p', projectName,
  '--output-dir', root,
], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });

if (result.error) { console.error('Spawn error:', result.error.message); process.exit(1); }
if (result.status !== 0) {
  console.error('UI UX Pro Max failed (exit', result.status, ')');
  console.error(result.stderr || result.stdout);
  process.exit(1);
}

// Write JSON output
writeFileSync(OUTPUT_JSON, result.stdout);
console.log(`✓ Output written to ${OUTPUT_JSON}`);

// Update state provenance
try {
  const { createHash } = await import('crypto');
  const hash = createHash('sha256').update(result.stdout).digest('hex');
  execSync(`node ${STATE_SCRIPT} set provenance.inputHash ${hash}`, { cwd: root, stdio: 'pipe' });
  execSync(`node ${STATE_SCRIPT} phase uiproRun done`, { cwd: root, stdio: 'pipe' });
} catch {}

// Sanity check: ensure MASTER.md was created
const masterPath = resolve(root, `design-system/${projectName}/MASTER.md`);
if (existsSync(masterPath)) {
  console.log(`✓ MASTER.md created at design-system/${projectName}/MASTER.md`);
} else {
  console.log('⚠  MASTER.md not found at expected path — check output-dir and project name.');
}

console.log('\nPhase 3 complete. Proceed to bridge (Phase 4).\n');
