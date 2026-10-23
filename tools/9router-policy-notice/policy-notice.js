"use strict";

const STRONG_POLICY = /content[_\s-]?filter|content[_\s-]?policy|usage polic|content filtering|prohibited_content|output blocked by|prompt blocked|safety system|blocked by (?:our |the )?(?:content |usage )?polic/i;
const BENIGN_FAILURE = /rate[_ ]limit|too many requests|insufficient_quota|quota reached|billing|payment required|unauthorized|invalid api key|not[_ ]found|model_not_found|context length|overloaded|timeout/i;

function noticeText(model) {
  const where = model ? ` (model: ${model})` : "";
  return `Provider đã chặn câu này vì chính sách nội dung${where}. Đổi hoặc thu hẹp yêu cầu rồi gửi lại. Cùng câu này không được chuyển sang model khác.`;
}

function isPolicySignal(text) {
  const raw = String(text || "");
  if (!raw.trim()) return false;
  if (BENIGN_FAILURE.test(raw) && !STRONG_POLICY.test(raw)) return false;
  return STRONG_POLICY.test(raw);
}

function extractErrorText(value) {
  if (!value || typeof value !== "object") return "";
  const error = value.error;
  if (typeof error === "string") return error;
  if (error && typeof error === "object") {
    return String(error.message || error.type || "");
  }
  return String(value.message || "");
}

function extractFinish(value) {
  if (!value || typeof value !== "object") return "";
  const choice = Array.isArray(value.choices) ? value.choices[0] : null;
  return String(choice?.finish_reason || value.stop_reason || value.finish_reason || "");
}

function extractVisibleText(value) {
  if (!value || typeof value !== "object") return "";
  const choice = Array.isArray(value.choices) ? value.choices[0] : null;
  const message = choice?.message || choice?.delta || null;
  if (typeof message?.content === "string") return message.content;
  if (Array.isArray(value.content)) {
    return value.content
      .map((block) => (block && typeof block.text === "string" ? block.text : ""))
      .join("");
  }
  if (typeof value.content === "string") return value.content;
  return "";
}

function readModel(value) {
  if (!value || typeof value !== "object") return "";
  if (typeof value.model === "string" && value.model) return value.model;
  return "";
}

function analyzeJson(status, raw, fallbackModel) {
  let parsed = null;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = null;
  }
  const model = readModel(parsed) || fallbackModel || "";
  const finish = extractFinish(parsed).toLowerCase();
  const visible = extractVisibleText(parsed);
  if ((finish === "content_filter" || finish === "refusal") && !visible.trim()) {
    return { model };
  }
  if (status >= 400) {
    const errorText = extractErrorText(parsed) || raw;
    if (isPolicySignal(errorText)) return { model };
  }
  return null;
}

function openaiJson(model, text) {
  return {
    id: "chatcmpl-policy-notice",
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: model || "policy-notice",
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: text },
        finish_reason: "stop",
      },
    ],
  };
}

function anthropicJson(model, text) {
  return {
    id: "msg_policy_notice",
    type: "message",
    role: "assistant",
    model: model || "policy-notice",
    content: [{ type: "text", text }],
    stop_reason: "end_turn",
    stop_sequence: null,
    usage: { input_tokens: 0, output_tokens: 0 },
  };
}

function buildJsonNotice(format, model) {
  const text = noticeText(model);
  const body = format === "anthropic" ? anthropicJson(model, text) : openaiJson(model, text);
  return JSON.stringify(body);
}

function sseEvent(payload) {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

function openaiSseNotice(model) {
  const text = noticeText(model);
  const created = Math.floor(Date.now() / 1000);
  const base = {
    id: "chatcmpl-policy-notice",
    object: "chat.completion.chunk",
    created,
    model: model || "policy-notice",
  };
  return (
    sseEvent({
      ...base,
      choices: [{ index: 0, delta: { role: "assistant", content: text }, finish_reason: null }],
    }) +
    sseEvent({
      ...base,
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    })
  );
}

function anthropicSseNotice(model) {
  const text = noticeText(model);
  const message = anthropicJson(model, text);
  return [
    `event: message_start\ndata: ${JSON.stringify({ type: "message_start", message: { ...message, content: [] } })}\n\n`,
    `event: content_block_start\ndata: ${JSON.stringify({ type: "content_block_start", index: 0, content_block: { type: "text", text: "" } })}\n\n`,
    `event: content_block_delta\ndata: ${JSON.stringify({ type: "content_block_delta", index: 0, delta: { type: "text_delta", text } })}\n\n`,
    `event: content_block_stop\ndata: ${JSON.stringify({ type: "content_block_stop", index: 0 })}\n\n`,
    `event: message_delta\ndata: ${JSON.stringify({ type: "message_delta", delta: { stop_reason: "end_turn", stop_sequence: null }, usage: { output_tokens: 1 } })}\n\n`,
    `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}\n\n`,
  ].join("");
}

function buildSseNotice(format, model) {
  return format === "anthropic" ? anthropicSseNotice(model) : openaiSseNotice(model);
}

function parseSseBlock(block) {
  const data = [];
  for (const line of block.split(/\r?\n/)) {
    if (line.startsWith("data:")) data.push(line.slice(5).trim());
  }
  return data.join("\n");
}

function sseDeltaText(payload) {
  if (!payload || typeof payload !== "object") return "";
  const choice = Array.isArray(payload.choices) ? payload.choices[0] : null;
  const delta = choice?.delta || choice?.message;
  if (typeof delta?.content === "string") return delta.content;
  if (payload?.delta?.type === "text_delta" && typeof payload.delta.text === "string") return payload.delta.text;
  if (payload?.type === "content_block_delta" && typeof payload.delta?.text === "string") return payload.delta.text;
  return "";
}

function sseFinish(payload) {
  const choice = Array.isArray(payload?.choices) ? payload.choices[0] : null;
  return String(choice?.finish_reason || payload?.delta?.stop_reason || payload?.stop_reason || "");
}

function createSseRewriter(format, model) {
  let pending = "";
  let sawText = false;
  let needNotice = false;
  let closed = false;
  const noticeModel = model || "";

  function consume(block) {
    if (closed) return "";
    const data = parseSseBlock(block);
    if (!data) return `${block}\n\n`;
    if (data === "[DONE]") {
      if (needNotice && !sawText) {
        closed = true;
        return `${buildSseNotice(format, noticeModel)}data: [DONE]\n\n`;
      }
      return `${block}\n\n`;
    }
    let payload = null;
    try {
      payload = JSON.parse(data);
    } catch {
      return `${block}\n\n`;
    }
    const text = sseDeltaText(payload);
    if (text.trim()) sawText = true;
    const finish = sseFinish(payload).toLowerCase();
    const errorText = extractErrorText(payload);
    const policy = finish === "content_filter" || finish === "refusal" || isPolicySignal(errorText) || isPolicySignal(data);
    if (policy && !sawText) {
      needNotice = true;
      if (errorText || payload.type === "error" || payload.error) {
        closed = true;
        return `${buildSseNotice(format, noticeModel)}data: [DONE]\n\n`;
      }
      return "";
    }
    return `${block}\n\n`;
  }

  return {
    push(chunk) {
      pending += chunk;
      let out = "";
      let splitAt = pending.search(/\r?\n\r?\n/);
      while (splitAt !== -1) {
        const sep = pending.slice(splitAt).match(/^\r?\n\r?\n/)?.[0].length || 2;
        const block = pending.slice(0, splitAt);
        pending = pending.slice(splitAt + sep);
        out += consume(block);
        if (closed) {
          pending = "";
          break;
        }
        splitAt = pending.search(/\r?\n\r?\n/);
      }
      return out;
    },
    finish() {
      if (closed) return "";
      let out = "";
      if (pending.trim()) {
        out += consume(pending);
        pending = "";
      }
      if (!closed && needNotice && !sawText) {
        closed = true;
        out += `${buildSseNotice(format, noticeModel)}data: [DONE]\n\n`;
      }
      return out;
    },
  };
}

function isChatPath(url) {
  const path = String(url || "").split("?")[0];
  return path === "/v1/chat/completions" || path === "/v1/messages" || path === "/v1/responses";
}

function responseFormat(url) {
  return String(url || "").split("?")[0] === "/v1/messages" ? "anthropic" : "openai";
}

module.exports = {
  noticeText,
  isPolicySignal,
  analyzeJson,
  buildJsonNotice,
  buildSseNotice,
  createSseRewriter,
  isChatPath,
  responseFormat,
  readModel,
};
