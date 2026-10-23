"use strict";

const http = require("http");
const {
  analyzeJson,
  buildJsonNotice,
  createSseRewriter,
  isChatPath,
  responseFormat,
  readModel,
} = require("./policy-notice");

const MARK = Symbol("aicoworkerPolicyNotice");
let installed = false;

function toBuffer(chunk) {
  if (chunk == null) return Buffer.alloc(0);
  if (Buffer.isBuffer(chunk)) return chunk;
  if (chunk instanceof Uint8Array) return Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
  return Buffer.from(String(chunk));
}

function headerValue(headers, name) {
  if (!headers) return "";
  if (Array.isArray(headers)) {
    for (let i = 0; i < headers.length; i += 2) {
      if (String(headers[i]).toLowerCase() === name) return String(headers[i + 1] || "");
    }
    return "";
  }
  return String(headers[name] || headers[name.toLowerCase()] || "");
}

function parseWriteHead(args) {
  const code = Number(args[0]) || 200;
  if (typeof args[1] === "string") return { code, message: args[1], headers: args[2] };
  return { code, message: undefined, headers: args[1] };
}

function requestModel(req) {
  const chunks = [];
  let size = 0;
  const origEmit = req.emit;
  req.emit = function emit(event, ...args) {
    if (event === "data" && size <= 1024 * 1024) {
      const buf = toBuffer(args[0]);
      size += buf.length;
      chunks.push(buf);
    }
    return origEmit.call(this, event, ...args);
  };
  return () => {
    if (!chunks.length) return "";
    try {
      return readModel(JSON.parse(Buffer.concat(chunks).toString("utf8")));
    } catch {
      return "";
    }
  };
}

function arm(req, res) {
  if (!req || !res || res[MARK] || !isChatPath(req.url)) return;
  res[MARK] = true;
  const format = responseFormat(req.url);
  const modelOf = requestModel(req);
  const origWriteHead = res.writeHead;
  const origWrite = res.write;
  const origEnd = res.end;
  let mode = "";
  let statusCode = 200;
  let statusMessage;
  let headHeaders;
  const jsonChunks = [];
  let rewriter = null;
  let sseStarted = false;

  function contentType() {
    return headerValue(headHeaders, "content-type") || String(res.getHeader("content-type") || "");
  }

  function sendHead(code, headers) {
    if (headers) return origWriteHead.call(res, code, headers);
    if (statusMessage !== undefined) return origWriteHead.call(res, code, statusMessage, headHeaders);
    if (headHeaders !== undefined) return origWriteHead.call(res, code, headHeaders);
    return origWriteHead.call(res, code);
  }

  function startSse() {
    if (sseStarted) return;
    sseStarted = true;
    mode = "sse";
    rewriter = createSseRewriter(format, modelOf());
    sendHead(statusCode);
  }

  res.writeHead = function writeHead(...args) {
    const parsed = parseWriteHead(args);
    statusCode = parsed.code;
    statusMessage = parsed.message;
    headHeaders = parsed.headers;
    if (/event-stream/i.test(contentType())) {
      startSse();
      return res;
    }
    mode = mode || "json";
    return res;
  };

  res.write = function write(chunk, encoding, callback) {
    const cb = typeof encoding === "function" ? encoding : callback;
    const bytes = toBuffer(chunk);
    const text = bytes.toString("utf8");
    if (!mode) {
      if (/^\s*data:/.test(text) || /event-stream/i.test(contentType())) startSse();
      else mode = "json";
    }
    if (!sseStarted && jsonChunks.length === 0 && /^\s*data:/.test(text) && !/json/i.test(contentType())) {
      mode = "";
      startSse();
    }
    if (mode === "sse") {
      if (!sseStarted) startSse();
      const out = rewriter.push(text);
      if (!out) {
        if (typeof cb === "function") cb();
        return true;
      }
      return origWrite.call(res, out, "utf8", cb);
    }
    jsonChunks.push(bytes);
    if (typeof cb === "function") cb();
    return true;
  };

  res.end = function end(chunk, encoding, callback) {
    let data = chunk;
    let cb = callback;
    if (typeof chunk === "function") {
      data = undefined;
      cb = chunk;
    } else if (typeof encoding === "function") {
      cb = encoding;
    }
    if (data) res.write(data);
    if (!headHeaders && res.statusCode) statusCode = res.statusCode;
    if (mode === "sse") {
      if (!sseStarted) startSse();
      const out = rewriter.finish();
      if (out) return origEnd.call(res, out, "utf8", cb);
      return origEnd.call(res, cb);
    }
    const raw = Buffer.concat(jsonChunks).toString("utf8");
    const decision = analyzeJson(statusCode, raw, modelOf());
    if (!decision) {
      if (!res.headersSent) sendHead(statusCode);
      return origEnd.call(res, raw, "utf8", cb);
    }
    const body = buildJsonNotice(format, decision.model || modelOf());
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": Buffer.byteLength(body),
    };
    sendHead(200, headers);
    return origEnd.call(res, body, "utf8", cb);
  };
}

function install() {
  if (installed) return;
  installed = true;
  const origEmit = http.Server.prototype.emit;
  http.Server.prototype.emit = function emit(event, ...args) {
    if (event === "request") arm(args[0], args[1]);
    return origEmit.call(this, event, ...args);
  };
}

module.exports = { install, arm };
