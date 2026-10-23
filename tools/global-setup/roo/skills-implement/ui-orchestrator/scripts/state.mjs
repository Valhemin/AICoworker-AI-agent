#!/usr/bin/env node
/**
 * state.mjs — read/write .ui-orchestrator/state.json
 *
 * Usage:
 *   node state.mjs get [key]          → print full state or a dot-path value
 *   node state.mjs set <key> <value>  → set a dot-path key (value auto-typed)
 *   node state.mjs init <projectName> → create initial state if missing
 *   node state.mjs phase <name> <status> [reason]  → update a phase record
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { createHash } from 'crypto';

const SCHEMA_VERSION = '1.0.0';

function stateDir(projectRoot) {
  return resolve(projectRoot, '.ui-orchestrator');
}

function statePath(projectRoot) {
  return resolve(stateDir(projectRoot), 'state.json');
}

function findProjectRoot(start = process.cwd()) {
  // Walk up to find package.json or .git as root marker
  let dir = resolve(start);
  while (true) {
    if (existsSync(resolve(dir, 'package.json')) || existsSync(resolve(dir, '.git'))) {
      return dir;
    }
    const parent = dirname(dir);
    if (parent === dir) return process.cwd(); // fallback
    dir = parent;
  }
}

function readState(projectRoot) {
  const p = statePath(projectRoot);
  if (!existsSync(p)) return null;
  return JSON.parse(readFileSync(p, 'utf8'));
}

function writeState(projectRoot, state) {
  const dir = stateDir(projectRoot);
  mkdirSync(dir, { recursive: true });
  state.provenance = state.provenance || {};
  state.provenance.lastUpdated = new Date().toISOString();
  writeFileSync(statePath(projectRoot), JSON.stringify(state, null, 2));
}

function initState(projectRoot, projectName) {
  const existing = readState(projectRoot);
  if (existing) return existing;
  const state = {
    schemaVersion: SCHEMA_VERSION,
    projectName,
    projectRoot,
    productContextDone: false,
    designApproved: false,
    tasteMode: 'constrained',
    dials: { DESIGN_VARIANCE: 6, MOTION_INTENSITY: 5, VISUAL_DENSITY: 5, source: 'default' },
    phases: {
      preflight:      { status: 'pending' },
      productContext: { status: 'pending' },
      resolveDials:   { status: 'pending' },
      uiproRun:       { status: 'pending' },
      bridge:         { status: 'pending' },
      designLock:     { status: 'pending' },
      implement:      { status: 'pending' },
      taste:          { status: 'pending' },
      qa:             { status: 'pending' },
    },
    provenance: {},
  };
  writeState(projectRoot, state);
  return state;
}

// Dot-path accessor
function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function setPath(obj, path, value) {
  const keys = path.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (cur[keys[i]] == null) cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  // Auto-type the value
  if (value === 'true') value = true;
  else if (value === 'false') value = false;
  else if (!isNaN(Number(value)) && value !== '') value = Number(value);
  cur[keys[keys.length - 1]] = value;
}

export function hashFile(filePath) {
  if (!existsSync(filePath)) return null;
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}

// CLI
const [,, cmd, ...args] = process.argv;
const root = findProjectRoot();

if (cmd === 'init') {
  const name = args[0] || 'project';
  const s = initState(root, name);
  console.log(JSON.stringify(s, null, 2));

} else if (cmd === 'get') {
  const state = readState(root);
  if (!state) { console.error('No state file found. Run: node state.mjs init <name>'); process.exit(1); }
  if (args[0]) {
    const val = getPath(state, args[0]);
    console.log(val === undefined ? 'undefined' : JSON.stringify(val));
  } else {
    console.log(JSON.stringify(state, null, 2));
  }

} else if (cmd === 'set') {
  const [key, value] = args;
  if (!key || value === undefined) { console.error('Usage: state.mjs set <key> <value>'); process.exit(1); }
  const state = readState(root) || initState(root, 'project');
  setPath(state, key, value);
  writeState(root, state);
  console.log(`set ${key} = ${JSON.stringify(getPath(state, key))}`);

} else if (cmd === 'phase') {
  const [name, status, reason] = args;
  if (!name || !status) { console.error('Usage: state.mjs phase <name> <status> [reason]'); process.exit(1); }
  const state = readState(root) || initState(root, 'project');
  if (!state.phases[name]) state.phases[name] = {};
  state.phases[name].status = status;
  if (status === 'done' || status === 'skipped') {
    state.phases[name].completedAt = new Date().toISOString();
  }
  if (reason) state.phases[name].skippedReason = reason;
  writeState(root, state);
  console.log(`phase ${name} → ${status}${reason ? ` (${reason})` : ''}`);

} else {
  console.error('Commands: init | get [key] | set <key> <value> | phase <name> <status> [reason]');
  process.exit(1);
}
