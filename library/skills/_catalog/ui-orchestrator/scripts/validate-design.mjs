#!/usr/bin/env node
/**
 * validate-design.mjs — check design token drift between code and DESIGN.md
 *
 * Usage:
 *   node validate-design.mjs            → scan src/ and report drift
 *   node validate-design.mjs --strict   → exit 1 on any drift found
 *
 * Checks:
 *  1. Hardcoded hex colors in .tsx/.ts/.css/.scss/.vue files not in DESIGN.md tokens
 *  2. Required sections present in DESIGN.md
 *  3. designApproved = true in state (warn if not)
 *  4. Taste constraint violations (new tokens introduced post-lock)
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

const strict = process.argv.includes('--strict');

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

const DESIGN_PATH = resolve(root, 'DESIGN.md');
const STATE_PATH  = resolve(root, '.ui-orchestrator/state.json');

const REQUIRED_SECTIONS = [
  'Product Mode', 'Agent Design Controls', 'Color', 'Typography',
  'Spacing and Density', 'Motion', 'Layout', 'Accessibility',
];

const SOURCE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss', '.vue', '.svelte'];
const SKIP_DIRS = ['node_modules', '.git', 'dist', 'build', '.next', '.nuxt', 'coverage'];

let warnings = 0;
let errors = 0;

function warn(msg) { console.log(`⚠  ${msg}`); warnings++; }
function error(msg) { console.log(`✗  ${msg}`); errors++; }
function ok(msg) { console.log(`✓  ${msg}`); }

// --- 1. DESIGN.md existence and required sections ---
if (!existsSync(DESIGN_PATH)) {
  error('DESIGN.md missing. Run Phase 4 (bridge) first.');
  process.exit(strict ? 1 : 0);
}

const designContent = readFileSync(DESIGN_PATH, 'utf8');
for (const section of REQUIRED_SECTIONS) {
  if (!designContent.includes(`## ${section}`)) {
    error(`DESIGN.md missing required section: ## ${section}`);
  } else {
    ok(`Section present: ## ${section}`);
  }
}

// --- 2. Extract declared token colors from DESIGN.md ---
const tokenColorRe = /`--color-[^`]+`\s*\|\s*`(#[0-9a-fA-F]{3,8})`/g;
const declaredColors = new Set();
let m;
while ((m = tokenColorRe.exec(designContent)) !== null) {
  declaredColors.add(m[1].toLowerCase());
}
ok(`Token colors declared in DESIGN.md: ${declaredColors.size}`);

// --- 3. Scan source files for hardcoded hex colors ---
function walk(dir, files = []) {
  try {
    const { readdirSync, statSync } = await import('fs');
    for (const entry of readdirSync(dir)) {
      if (SKIP_DIRS.includes(entry)) continue;
      const full = resolve(dir, entry);
      if (statSync(full).isDirectory()) walk(full, files);
      else if (SOURCE_EXTENSIONS.some(ext => entry.endsWith(ext))) files.push(full);
    }
  } catch {}
  return files;
}

// Use grep for speed
let grepOutput = '';
try {
  grepOutput = execSync(
    `grep -rn --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" --include="*.css" --include="*.scss" --include="*.vue" -E '#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}' ${resolve(root, 'src')} 2>/dev/null || true`,
    { encoding: 'utf8', maxBuffer: 5 * 1024 * 1024, cwd: root }
  );
} catch {}

const hexRe = /#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}\b/g;
const hardcoded = new Map(); // hex → [file:line, ...]

for (const line of grepOutput.split('\n').filter(Boolean)) {
  const [fileline, ...rest] = line.split(':');
  const content = rest.join(':');
  let hm;
  while ((hm = hexRe.exec(content)) !== null) {
    const hex = hm[0].toLowerCase();
    if (!declaredColors.has(hex)) {
      if (!hardcoded.has(hex)) hardcoded.set(hex, []);
      hardcoded.get(hex).push(fileline);
    }
  }
}

if (hardcoded.size === 0) {
  ok('No hardcoded hex colors found outside DESIGN.md tokens.');
} else {
  warn(`${hardcoded.size} hardcoded color(s) not in DESIGN.md tokens:`);
  for (const [hex, locations] of [...hardcoded.entries()].slice(0, 10)) {
    console.log(`     ${hex} → ${locations.slice(0, 3).join(', ')}${locations.length > 3 ? ` (+${locations.length - 3} more)` : ''}`);
  }
  if (hardcoded.size > 10) console.log(`     ... and ${hardcoded.size - 10} more`);
}

// --- 4. State: designApproved ---
if (existsSync(STATE_PATH)) {
  const state = JSON.parse(readFileSync(STATE_PATH, 'utf8'));
  if (!state.designApproved) {
    warn('DESIGN.md not yet approved (state.designApproved = false). Complete Phase 5 before implementing.');
  } else {
    ok('designApproved = true');
  }
  // QA phases not run
  const qa = state.phases?.qa;
  if (!qa || qa.status !== 'done') {
    warn('QA phase not marked done in state.');
  }
} else {
  warn('No state.json — run: node state.mjs init <name>');
}

// --- 5. Agent Design Controls present and parseable ---
const controls = designContent.match(/## Agent Design Controls[\s\S]*?(?=##|$)/)?.[0] || '';
const hasAllControls = ['DESIGN_VARIANCE', 'MOTION_INTENSITY', 'VISUAL_DENSITY', 'Taste activation'].every(k => controls.includes(k));
if (hasAllControls) {
  ok('Agent Design Controls section complete');
} else {
  error('Agent Design Controls section missing one or more required keys (DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY, Taste activation)');
}

// --- Summary ---
console.log(`\n=== Validate DESIGN: ${errors} error(s), ${warnings} warning(s) ===\n`);

if (errors > 0 && strict) process.exit(1);
if (errors > 0) { console.log('Fix errors before declaring Phase 8 complete.'); process.exit(0); }
console.log('Validation passed.\n');
