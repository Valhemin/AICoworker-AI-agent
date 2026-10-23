#!/usr/bin/env node
/**
 * resolve-dials.mjs — resolve DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY
 *
 * Usage:
 *   node resolve-dials.mjs                       → resolve and persist to state
 *   node resolve-dials.mjs --source design.md    → read only from DESIGN.md (Phase 7 Taste)
 *   node resolve-dials.mjs --print               → print resolved dials, do not persist
 *   node resolve-dials.mjs --v 7 --m 5 --d 4    → user-specified override
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const flagVal = (f) => { const i = args.indexOf(f); return i !== -1 ? args[i + 1] : null; };

const root = (() => {
  let dir = process.cwd();
  const { dirname } = await import('path');
  while (true) {
    if (existsSync(resolve(dir, 'package.json')) || existsSync(resolve(dir, '.git'))) return dir;
    const parent = dirname(dir);
    if (parent === dir) return process.cwd();
    dir = parent;
  }
})();

const STATE_SCRIPT = resolve(import.meta.dirname, 'state.mjs');

// Product-type presets (Variance / Motion / Density)
const PRESETS = {
  'b2b dashboard':      [4, 3, 8],
  'developer tool':     [5, 4, 7],
  'consumer saas':      [6, 5, 5],
  'landing page':       [7, 6, 4],
  'creative portfolio': [9, 8, 3],
  'regulated':          [3, 2, 6],
  'documentation':      [4, 2, 6],
};

const KEYWORD_MAP = {
  // Variance signals
  high_variance: ['creative', 'portfolio', 'agency', 'editorial', 'bold', 'expressive', 'landing'],
  low_variance:  ['dashboard', 'admin', 'analytics', 'enterprise', 'regulated', 'compliance', 'b2b', 'developer'],
  // Motion signals
  high_motion:   ['landing', 'portfolio', 'marketing', 'campaign', 'animation', 'gsap'],
  low_motion:    ['dashboard', 'data', 'admin', 'accessibility', 'regulated', 'documentation'],
  // Density signals
  high_density:  ['dashboard', 'data', 'analytics', 'admin', 'developer', 'tool', 'crm'],
  low_density:   ['landing', 'portfolio', 'editorial', 'blog', 'marketing'],
};

function readDesignMdDials(projectRoot) {
  const designPath = resolve(projectRoot, 'DESIGN.md');
  if (!existsSync(designPath)) return null;
  const content = readFileSync(designPath, 'utf8');
  const section = content.match(/## Agent Design Controls([\s\S]*?)(?=##|$)/)?.[1] || '';
  const v = section.match(/DESIGN_VARIANCE\s*:\s*(\d+)/)?.[1];
  const m = section.match(/MOTION_INTENSITY\s*:\s*(\d+)/)?.[1];
  const d = section.match(/VISUAL_DENSITY\s*:\s*(\d+)/)?.[1];
  if (v && m && d) return { DESIGN_VARIANCE: +v, MOTION_INTENSITY: +m, VISUAL_DENSITY: +d };
  return null;
}

function readProductMd(projectRoot) {
  const p = resolve(projectRoot, 'PRODUCT.md');
  if (!existsSync(p)) return '';
  return readFileSync(p, 'utf8').toLowerCase();
}

function inferFromKeywords(text) {
  let v = 6, m = 5, d = 5;

  // Check presets first (exact phrase match)
  for (const [preset, [pv, pm, pd]] of Object.entries(PRESETS)) {
    if (text.includes(preset)) return { DESIGN_VARIANCE: pv, MOTION_INTENSITY: pm, VISUAL_DENSITY: pd, source: 'preset' };
  }

  // Keyword inference
  const score = (keys, text) => keys.filter(k => text.includes(k)).length;
  const hi_v = score(KEYWORD_MAP.high_variance, text);
  const lo_v = score(KEYWORD_MAP.low_variance, text);
  if (hi_v > lo_v) v = 7; else if (lo_v > hi_v) v = 4;

  const hi_m = score(KEYWORD_MAP.high_motion, text);
  const lo_m = score(KEYWORD_MAP.low_motion, text);
  if (hi_m > lo_m) m = 7; else if (lo_m > hi_m) m = 3;

  const hi_d = score(KEYWORD_MAP.high_density, text);
  const lo_d = score(KEYWORD_MAP.low_density, text);
  if (hi_d > lo_d) d = 7; else if (lo_d > hi_d) d = 3;

  return { DESIGN_VARIANCE: v, MOTION_INTENSITY: m, VISUAL_DENSITY: d, source: 'inferred' };
}

// --- Priority chain ---

let result = null;
let source = 'default';

// 1. User-specified flags
const uv = flagVal('--v'), um = flagVal('--m'), ud = flagVal('--d');
if (uv && um && ud) {
  result = { DESIGN_VARIANCE: +uv, MOTION_INTENSITY: +um, VISUAL_DENSITY: +ud };
  source = 'user';
}

// 2. DESIGN.md (always read if --source design.md or no user flags)
if (!result) {
  const designDials = readDesignMdDials(root);
  if (designDials) {
    result = designDials;
    source = 'design.md';
  }
}

// If --source design.md flag: stop here, do not fall through to presets
if (flag('--source') && flagVal('--source') === 'design.md' && !result) {
  console.error('DESIGN.md has no Agent Design Controls section. Run Phase 4 bridge first.');
  process.exit(1);
}

// 3–4. PRODUCT.md inference
if (!result) {
  const productText = readProductMd(root);
  if (productText) {
    result = inferFromKeywords(productText);
    source = result.source;
    delete result.source;
  }
}

// 5. Default
if (!result) {
  result = { DESIGN_VARIANCE: 6, MOTION_INTENSITY: 5, VISUAL_DENSITY: 5 };
  source = 'default';
}

result.source = source;

// Clamp to 1–10
result.DESIGN_VARIANCE  = Math.max(1, Math.min(10, result.DESIGN_VARIANCE));
result.MOTION_INTENSITY = Math.max(1, Math.min(10, result.MOTION_INTENSITY));
result.VISUAL_DENSITY   = Math.max(1, Math.min(10, result.VISUAL_DENSITY));

if (flag('--print')) {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

// Persist to state
try {
  execSync(`node ${STATE_SCRIPT} set dials.DESIGN_VARIANCE ${result.DESIGN_VARIANCE}`, { cwd: root, stdio: 'pipe' });
  execSync(`node ${STATE_SCRIPT} set dials.MOTION_INTENSITY ${result.MOTION_INTENSITY}`, { cwd: root, stdio: 'pipe' });
  execSync(`node ${STATE_SCRIPT} set dials.VISUAL_DENSITY ${result.VISUAL_DENSITY}`, { cwd: root, stdio: 'pipe' });
  execSync(`node ${STATE_SCRIPT} set dials.source ${source}`, { cwd: root, stdio: 'pipe' });
  execSync(`node ${STATE_SCRIPT} phase resolveDials done`, { cwd: root, stdio: 'pipe' });
} catch (e) {
  console.error('Warning: could not persist dials to state:', e.message);
}

console.log(`\nResolved dials (source: ${source}):`);
console.log(`  DESIGN_VARIANCE  = ${result.DESIGN_VARIANCE}`);
console.log(`  MOTION_INTENSITY = ${result.MOTION_INTENSITY}`);
console.log(`  VISUAL_DENSITY   = ${result.VISUAL_DENSITY}\n`);
