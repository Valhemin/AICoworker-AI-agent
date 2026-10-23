---
name: ai-feature-prompt-design
description: Design production-quality prompts for AI-powered app features. Covers prompt architecture, output contracts, context injection, cost discipline, input/output processing, reliability, security, and eval fixtures. Use before wiring any LLM call into application code.
---

TRIGGER: implementing any app feature that calls an LLM — classification, extraction, generation, summarization, rewriting, analysis, chat, suggestions, validation, scoring, or any user-facing AI capability
OUTPUT: detailed — system prompt, user prompt template, output JSON schema, cost strategy, retry/fallback pattern, and eval fixture set
SKIP: internal agent tooling; one-off scripts not embedded in the app; pure retrieval with no LLM call

---

## Done checklist

- [ ] Feature contract defined (input / output / caller / latency / volume / failure mode / language)
- [ ] System prompt separated from user prompt in code
- [ ] Precise role defined (not "helpful assistant")
- [ ] Output JSON schema defined with error/fallback shape and schema version
- [ ] Negative constraints used for critical rules
- [ ] Output length explicitly capped in prompt
- [ ] Few-shot examples in system prompt (different patterns, at least one edge case)
- [ ] Context injected is minimal and relevant only (no full-profile bloat)
- [ ] Long inputs truncated before API call
- [ ] Prompt injection patterns detected and rejected
- [ ] Output sanitized before rendering in UI
- [ ] Hallucination guard for factual extraction features
- [ ] Token budget estimated (system < 2000, user < 2000, output < 1000)
- [ ] Prompt caching enabled and cache hits verified in logs
- [ ] Batch strategy applied for bulk operations (> 10 items)
- [ ] Retry + timeout + fallback value implemented
- [ ] Per-user rate limit in place
- [ ] PII stripped from input and never logged
- [ ] Prompt stored in versioned file (not inline)
- [ ] Eval fixtures created (min 5 cases incl. injection test, min 80% pass)
- [ ] Observability logging wired (tokens, latency, cache hit, version, needs_review)

---

# AI Feature Prompt Design

## Step 0 — Define the feature contract

Fill this before writing any prompt:

| Field | Question |
|---|---|
| **Feature name** | What is this AI call for? (e.g. "summarize support ticket") |
| **Input** | What data goes in? (text, JSON, image URL, document chunk?) |
| **Output** | Exact shape the app needs? (string / JSON / array / score 0–1?) |
| **Caller** | Who uses the output? (UI display / backend processing / another LLM) |
| **Latency budget** | Acceptable p95? (< 1s / < 3s / async background OK) |
| **Volume** | Calls per day/month? (affects caching ROI and batch strategy) |
| **Failure mode** | When LLM fails? (fallback value / degraded UI / error state) |
| **Sensitive data** | PII, credentials, or private user content in input? |
| **Language** | Match user locale or fixed? |

---

## Step 1 — Prompt architecture

- Separate system prompt (stable, cacheable: role/task/schema/rules/examples) from user prompt (dynamic per-call: only what changes)
- Never put user input in the system prompt — user content stays in the user turn
- Everything stable → system prompt (cached, priced once); everything variable → user prompt (priced per call)

---

## Step 2 — Prompt quality

- Role precision beats vague framing: "senior support analyst for SaaS billing" > "helpful assistant"; negative constraints beat positive: "DO NOT exceed 3 sentences" > "be concise"
- Always cap output length in the prompt; add a `"reasoning"` field for complex tasks (log then discard in app)
- Enforce explicit uncertainty: "If confidence < 0.5 set needs_review: true; if ambiguous, explain in error field — do not guess"

---

## Step 3 — Output schema design

- Always define an error/fallback shape: `{"result": null, "error": "reason"}`; flat over nested; enum over free text; confidence score on every classification
- Cap arrays in prompt ("max 5 items"); add `"schema_version": "1"` to every response; handle both during rollout
- Validate every response — parse function returns fallback on failure, never crashes app:

```typescript
function parseAIResponse<T>(raw: string, fallback: T): T {
  try {
    const p = JSON.parse(raw)
    if (p.error) { console.warn('[ai] error:', p.error); return fallback }
    return p as T
  } catch { console.error('[ai] parse failed:', raw.slice(0, 200)); return fallback }
}
```

---

## Step 4 — Context injection and input preprocessing

**Context:**
- Inject only the fields this prompt's task requires — not a full user profile
- Summarize long documents before injecting (separate cheap call); truncate at a safe limit with a warning log
- Multi-turn chat: keep last N turns only (`conversationHistory.slice(-10)`) — full history multiplies cost linearly

**Input preprocessing (before the API call):**
- Strip HTML, normalize whitespace, truncate to `MAX_INPUT_CHARS` before sending
- Skip empty inputs — return `fallbackResult` without calling the API
- Prompt injection: treat all user input as untrusted, inject into user turn only; structural system/user separation is the primary defense; add a cheap classifier gate when injection risk is high (a regex list rots and flags legitimate input)

---

## Step 5 — Output postprocessing and failure analysis

- Sanitize before rendering in UI (`DOMPurify.sanitize(result.text)`)
- Business rule validation: low confidence + non-unknown label → flag `needs_review`
- Hallucination guard for extraction: verify extracted entities actually appear in `sourceText`; filter out any that don't
- Route `needs_review` outputs to a human review queue; return `status: 'pending_review'` to caller

---

## Step 6 — Reliability

```typescript
async function callWithRetry(fn: () => Promise<string>, max = 3): Promise<string> {
  for (let i = 0; i < max; i++) {
    try { return await fn() }
    catch (e: any) {
      if (e.status === 429 || e.status >= 500) { await new Promise(r => setTimeout(r, 2 ** i * 1000)); continue }
      throw e  // 4xx: don't retry
    }
  }
  throw new Error('AI call failed after max retries')
}

const result = await Promise.race([
  callWithRetry(() => callAI(input)),
  new Promise<never>((_, rej) => setTimeout(() => rej(new Error('timeout')), 8000))
]).then(raw => parseAIResponse(raw, DEFAULT_RESULT)).catch(() => DEFAULT_RESULT)
```

---

## Step 7 — Cost patterns

**Token budget:** system prompt < 1000 tokens (hard max 2000); user prompt < 500 (hard max 2000); output < 300 (hard max 1000). `1 token ≈ 4 chars` English.

**Prompt caching:** system prompt is identical across calls — always cache it (~10% cost at cache hit). Adapt for your provider:

```typescript
// Anthropic SDK example — cache_control on system prompt
const response = await client.messages.create({
  system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
  messages: [{ role: 'user', content: userPrompt }]
})
// Verify: response.usage.cache_read_input_tokens > 0
```

**Batch over loop:** for > 10 items, join with `---` separators into one call, or use provider Batch API (~50% discount, async). Track `output_value / total_tokens` — high input/output ratio → investigate context bloat.

---

## Step 8 — Security, versioning, evals, observability

**Security:** user input → user prompt only (never interpolate into system prompt). Strip PII before sending. Never log full prompt content — log metadata only. Enforce per-user rate limit at gateway/middleware.

**Versioning:** store prompts in `prompts/<feature>.ts` with a `version` field. Review prompt diffs in PRs like code changes. Feature-flag between versions during rollout.

**Evals:** `ai-evals/<feature>/fixtures.json` — min 5 cases (typical, edge case, injection attempt). Gate: 80% pass before shipping. Re-run after any prompt change.

**Observability:**
```typescript
logger.info('ai_call', {
  feature, prompt_version: PROMPT.version,
  input_tokens: response.usage.input_tokens, output_tokens: response.usage.output_tokens,
  cache_hit: (response.usage.cache_read_input_tokens ?? 0) > 0,
  latency_ms: Date.now() - t0, success: !result.error, needs_review: result.needs_review ?? false
})
// Alert: error rate > 5%/5min; p95 latency > 3× baseline; cache hit < 70%
```

---

## Prompt template — copy and fill

```
SYSTEM:
You are a [precise role] for [product name]. Your job is to [one-sentence task].

## Output format
Always respond with valid JSON. No text outside the JSON object. No markdown fences.
{ "result": "[description]", "confidence": 0.0, "error": null }
On failure: {"result": null, "confidence": 0, "error": "reason"}

## Rules
- DO NOT exceed [N] sentences in "result"
- NEVER add information not present in [INPUT]
- If input is empty or insufficient: return error shape
- Language: [fixed / "match the input language"]

## Examples
Input: "[typical example]"
Output: {"result": "...", "confidence": 0.93, "error": null}

Input: "[edge case]"
Output: {"result": null, "confidence": 0, "error": "input too vague"}

---
USER:
[CONTEXT]
{{context_summarized}}

[INPUT]
{{user_input}}
```
