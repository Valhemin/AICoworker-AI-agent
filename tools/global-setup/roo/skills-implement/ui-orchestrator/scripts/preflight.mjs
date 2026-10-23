#!/usr/bin/env node
/**
 * preflight.mjs — verify all dependencies before running orchestrator phases
 * Exits 0 = all pass. Exits 1 = one or more fail (lists install commands).
 * Does NOT auto-install anything.
 */

import { execSync } from 'child_process';
import { existsSync, accessSync, constants, mkdirSync } from 'fs';
import { resolve } from 'path';

const root = (() => {
  let dir = process.cwd();
  const path = await import('path');
  while (true) {
    if (existsSync(resolve(dir, 'package.json')) || existsSync(resolve(dir, '.git'))) return dir;
    const parent = path.default.dirname(dir);
    if (parent === dir) return process.cwd();
    dir = parent;
  }
})();

function run(cmd) {
  try { execSync(cmd, { stdio: 'pipe' }); return true; } catch { return false; }
}

function which(bin) {
  return run(`which ${bin} 2>/dev/null || where ${bin} 2>nul`);
}

function getVersion(cmd) {
  try { return execSync(cmd, { stdio: 'pipe' }).toString().trim(); } catch { return null; }
}

// Resolve UIPRO_ROOT
function findUiproRoot() {
  if (process.env.UIPRO_ROOT && existsSync(process.env.UIPRO_ROOT)) return process.env.UIPRO_ROOT;
  const candidates = [
    resolve(root, '.claude/skills/ui-ux-pro-max'),
    resolve(process.env.HOME || '', '.claude/skills/ui-ux-pro-max'),
    resolve(process.env.HOME || '', '.config/claude/skills/ui-ux-pro-max'),
  ];
  return candidates.find(p => existsSync(p)) || null;
}

const checks = [];

// 1. Node.js ≥ 18
const nodeVer = getVersion('node --version');
const nodeMajor = nodeVer ? parseInt(nodeVer.replace('v', '').split('.')[0]) : 0;
checks.push({
  name: 'Node.js ≥ 18',
  pass: nodeMajor >= 18,
  found: nodeVer || 'not found',
  fix: 'Install Node.js 18+: https://nodejs.org or `nvm install 18`',
});

// 2. Python 3
const py = which('python3') ? 'python3' : which('python') ? 'python' : null;
const pyVer = py ? getVersion(`${py} --version`) : null;
const pyMajor = pyVer ? parseInt(pyVer.split(' ')[1]?.split('.')[0]) : 0;
checks.push({
  name: 'Python 3',
  pass: pyMajor >= 3,
  found: pyVer || 'not found',
  fix: 'Install Python 3: https://python.org or `brew install python`',
});

// 3. UI UX Pro Max
const uiproRoot = findUiproRoot();
const uiproScript = uiproRoot ? resolve(uiproRoot, 'scripts/search.py') : null;
checks.push({
  name: 'UI UX Pro Max skill',
  pass: !!uiproRoot && !!uiproScript && existsSync(uiproScript),
  found: uiproRoot || 'not found',
  fix: 'Install: `npm install -g ui-ux-pro-max-cli && uipro init --ai claude` or `npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill`',
  env: uiproRoot ? `UIPRO_ROOT=${uiproRoot}` : undefined,
});

// 4. Impeccable
const impeccableVer = getVersion('npx --yes impeccable --version 2>/dev/null');
checks.push({
  name: 'Impeccable',
  pass: !!impeccableVer,
  found: impeccableVer || 'not found',
  fix: 'Install: `npx skills add https://github.com/pbakaus/impeccable` or `npm install -g impeccable`',
});

// 5. Taste skill
const tasteCheck = run('npx --yes skills list 2>/dev/null | grep -q design-taste-frontend');
checks.push({
  name: 'Taste skill (design-taste-frontend)',
  pass: tasteCheck,
  found: tasteCheck ? 'installed' : 'not found',
  fix: 'Install: `npx skills add https://github.com/Leonxlnx/taste-skill`',
});

// 6. .ui-orchestrator/ writable
const uiDir = resolve(root, '.ui-orchestrator');
let dirWritable = false;
try {
  mkdirSync(uiDir, { recursive: true });
  accessSync(uiDir, constants.W_OK);
  dirWritable = true;
} catch {}
checks.push({
  name: '.ui-orchestrator/ writable',
  pass: dirWritable,
  found: dirWritable ? uiDir : 'not writable',
  fix: `Run: mkdir -p ${uiDir} && chmod 755 ${uiDir}`,
});

// Report
const pass = checks.filter(c => c.pass);
const fail = checks.filter(c => !c.pass);

console.log('\n=== UI Orchestrator Preflight ===\n');
for (const c of checks) {
  const icon = c.pass ? '✓' : '✗';
  console.log(`${icon} ${c.name}${c.found ? ` (${c.found})` : ''}`);
  if (c.env) console.log(`  → ${c.env}`);
}

if (fail.length > 0) {
  console.log('\n--- Fix required ---');
  for (const c of fail) {
    console.log(`\n${c.name}:`);
    console.log(`  ${c.fix}`);
  }
  console.log('\nResolve the above, then re-run preflight.\n');
  process.exit(1);
} else {
  // Write UIPRO_ROOT to state if found
  if (uiproRoot) {
    const { default: { execSync: ex } } = await import('child_process');
    try { ex(`node ${resolve(import.meta.dirname, 'state.mjs')} set provenance.uiproRoot ${uiproRoot}`, { cwd: root, stdio: 'pipe' }); } catch {}
  }
  console.log(`\n✓ All ${pass.length} checks passed. Ready to proceed.\n`);
  process.exit(0);
}
