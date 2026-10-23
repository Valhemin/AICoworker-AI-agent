"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const BEGIN = "/* aicoworker-policy-notice */";
const END = "/* /aicoworker-policy-notice */";
const ANCHOR = 'const { pathToFileURL } = require("url");';

function repoHook() {
  return path.join(__dirname, "hook.js");
}

function findCustomServer() {
  if (process.env.NINEROUTER_CUSTOM_SERVER) return process.env.NINEROUTER_CUSTOM_SERVER;
  const candidates = [];
  try {
    const root = execFileSync("npm", ["root", "-g"], { encoding: "utf8" }).trim();
    candidates.push(path.join(root, "9router", "app", "custom-server.js"));
  } catch {
    /* npm root is optional */
  }
  const nvm = path.join(os.homedir(), ".nvm", "versions", "node");
  if (fs.existsSync(nvm)) {
    for (const version of fs.readdirSync(nvm)) {
      candidates.push(path.join(nvm, version, "lib", "node_modules", "9router", "app", "custom-server.js"));
    }
  }
  return candidates.find((file) => fs.existsSync(file)) || candidates[0] || "";
}

function snippet() {
  const hook = repoHook().replace(/\\/g, "/");
  return [
    BEGIN,
    "try {",
    `  require(${JSON.stringify(hook)}).install();`,
    "} catch (error) {",
    '  console.error("[aicoworker-policy-notice]", error && error.message ? error.message : error);',
    "}",
    END,
  ].join("\n");
}

function strip(source) {
  const start = source.indexOf(BEGIN);
  const end = source.indexOf(END);
  if (start === -1 || end === -1 || end < start) return source;
  const after = end + END.length;
  const leading = source.slice(0, start).replace(/\n$/, "");
  const trailing = source.slice(after).replace(/^\n/, "");
  return `${leading}\n${trailing}`.replace(/^\n/, "");
}

function apply(source) {
  const cleaned = strip(source);
  const anchorAt = cleaned.indexOf(ANCHOR);
  if (anchorAt === -1) {
    throw new Error(`Không thấy mốc ${ANCHOR} trong custom-server.js. Bản 9router này khác file đã biết; chưa sửa gì.`);
  }
  const insertAt = anchorAt + ANCHOR.length;
  const rest = cleaned.slice(insertAt).replace(/^\n/, "");
  return `${cleaned.slice(0, insertAt)}\n${snippet()}\n${rest}`;
}

function main() {
  const revert = process.argv.includes("--revert");
  const check = process.argv.includes("--check");
  const target = findCustomServer();
  if (!target || !fs.existsSync(target)) {
    console.error("Không tìm thấy app/custom-server.js của 9router.");
    process.exit(1);
  }
  const source = fs.readFileSync(target, "utf8");
  const present = source.includes(BEGIN);
  if (check) {
    console.log(present ? `đã gắn: ${target}` : `chưa gắn: ${target}`);
    process.exit(present ? 0 : 2);
  }
  const next = revert ? strip(source) : apply(source);
  if (next === source) {
    console.log(revert ? `không có móc để gỡ: ${target}` : `móc đã ở đúng chỗ: ${target}`);
    return;
  }
  fs.writeFileSync(target, next);
  console.log(`${revert ? "đã gỡ" : "đã gắn"} ${target}`);
  console.log("Khởi động lại 9router để móc có hiệu lực.");
}

if (require.main === module) main();

module.exports = { apply, strip, snippet, findCustomServer };
