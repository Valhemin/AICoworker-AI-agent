"use strict";

const assert = require("node:assert/strict");
const http = require("node:http");
const test = require("node:test");
const { analyzeJson, buildJsonNotice, createSseRewriter, isPolicySignal, noticeText } = require("./policy-notice");
const { apply, strip } = require("./apply");
const { install } = require("./hook");

test("policy signal bỏ qua quota và rate limit", () => {
  assert.equal(isPolicySignal("This request would exceed your account's rate limit"), false);
  assert.equal(isPolicySignal("Individual quota reached. Please upgrade your subscription"), false);
  assert.equal(isPolicySignal("Requested entity was not found."), false);
  assert.equal(isPolicySignal("Output blocked by content filtering policy"), true);
  assert.equal(isPolicySignal('{"finish_reason":"content_filter"}'), true);
});

test("JSON 400 policy được nhận, JSON 429 thì không", () => {
  const blocked = analyzeJson(400, JSON.stringify({ error: { message: "blocked by our usage policy" } }), "cx/gpt-6-luna");
  assert.equal(blocked.model, "cx/gpt-6-luna");
  assert.equal(analyzeJson(429, JSON.stringify({ error: { message: "rate limit exceeded" } })), null);
});

test("JSON 200 content_filter rỗng được nhận, có chữ thì giữ", () => {
  const empty = analyzeJson(200, JSON.stringify({
    model: "cc/claude-sonnet-5-5",
    choices: [{ message: { role: "assistant", content: "" }, finish_reason: "content_filter" }],
  }));
  assert.equal(empty.model, "cc/claude-sonnet-5-5");
  assert.equal(analyzeJson(200, JSON.stringify({
    choices: [{ message: { content: "không làm được phần đó" }, finish_reason: "content_filter" }],
  })), null);
});

test("SSE content_filter không chữ thành câu báo trong chat", () => {
  const rewriter = createSseRewriter("openai", "ag/gemini-3.8-flash");
  const input = [
    `data: ${JSON.stringify({ choices: [{ delta: { role: "assistant" }, finish_reason: null }] })}\n\n`,
    `data: ${JSON.stringify({ choices: [{ delta: {}, finish_reason: "content_filter" }] })}\n\n`,
    "data: [DONE]\n\n",
  ].join("");
  const out = rewriter.push(input) + rewriter.finish();
  assert.match(out, /chính sách nội dung/);
  assert.match(out, /ag\/gemini-3\.8-flash/);
  assert.equal(out.includes("content_filter"), false);
  assert.match(out, /data: \[DONE\]/);
});

test("SSE đã có câu trả lời thì giữ nguyên content_filter", () => {
  const rewriter = createSseRewriter("openai", "cu/grok-4.7");
  const input = [
    `data: ${JSON.stringify({ choices: [{ delta: { content: "đã xong phần được phép" }, finish_reason: null }] })}\n\n`,
    `data: ${JSON.stringify({ choices: [{ delta: {}, finish_reason: "content_filter" }] })}\n\n`,
    "data: [DONE]\n\n",
  ].join("");
  const out = rewriter.push(input) + rewriter.finish();
  assert.match(out, /đã xong phần được phép/);
  assert.match(out, /content_filter/);
  assert.equal(out.includes(noticeText("cu/grok-4.7")), false);
});

test("câu báo Anthropic dùng end_turn", () => {
  const body = JSON.parse(buildJsonNotice("anthropic", "cc/claude-sonnet-5-5"));
  assert.equal(body.stop_reason, "end_turn");
  assert.equal(body.type, "message");
  assert.match(body.content[0].text, /chính sách nội dung/);
});

test("apply gắn đúng mốc rồi gỡ lại y nguyên", () => {
  const source = 'const { pathToFileURL } = require("url");\nconst rest = 1;\n';
  const next = apply(source);
  assert.match(next, /aicoworker-policy-notice/);
  assert.match(next, /hook\.js/);
  assert.equal(strip(next), source);
  assert.equal(apply(next), next);
});

function readReq(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", () => resolve(""));
  });
}

function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server.address().port));
  });
}

function request(port, path, method = "POST") {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: "127.0.0.1", port, path, method }, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString("utf8") }));
    });
    req.on("error", reject);
    req.end(JSON.stringify({ model: "cx/gpt-6-luna", messages: [{ role: "user", content: "ping" }] }));
  });
}

test("hook đổi 400 policy thành câu chat 200 và giữ 429", async () => {
  install();
  const server = http.createServer(async (req, res) => {
    await readReq(req);
    if (req.url.startsWith("/v1/chat/completions")) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: { message: "blocked by our usage policy", type: "invalid_request_error" } }));
      return;
    }
    res.writeHead(429, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: { message: "rate limit exceeded" } }));
  });
  const port = await listen(server);
  try {
    const blocked = await request(port, "/v1/chat/completions");
    assert.equal(blocked.status, 200);
    const parsed = JSON.parse(blocked.body);
    assert.match(parsed.choices[0].message.content, /chính sách nội dung/);
    assert.match(parsed.choices[0].message.content, /cx\/gpt-6-luna/);
    assert.equal(parsed.choices[0].finish_reason, "stop");

    const limited = await request(port, "/v1/other");
    assert.equal(limited.status, 429);
    assert.match(limited.body, /rate limit exceeded/);
  } finally {
    server.close();
  }
});

test("Uint8Array đi qua nguyên văn khi không phải chặn chính sách", async () => {
  install();
  const payload = JSON.stringify({ error: { message: "Missing API key", type: "authentication_error", code: "invalid_api_key" } });
  const server = http.createServer((req, res) => {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(new Uint8Array(Buffer.from(payload)));
  });
  const port = await listen(server);
  try {
    const response = await request(port, "/v1/chat/completions");
    assert.equal(response.status, 401);
    assert.equal(response.body, payload);
  } finally {
    server.close();
  }
});
