# AICoworker

Công ty nhỏ gồm hai mảng: `giai-phap-so` và `media`. Mục tiêu là có người trả tiền, hoặc dừng ý tưởng trước khi làm. Bạn tự bán. Doanh thu nằm ở hệ thống khác, không nằm ở các agent này.

Chi tiết vận hành: `shared/00_System/OPERATING.md`. File mẫu cấu hình: `openclaw.agents.example.json5`. Combo 9router: `9router.combos.example.json` (snapshot một máy — luôn confirm provider rồi chỉnh). Bảng Model = khuyến nghị đủ gói. Không ghi API key / bot token vào repo.

---

## Setup máy mới (checklist đầy đủ)

Dùng checklist này khi clone repo sang máy khác. AI hoặc người đọc README phải làm **hết** các bước — thiếu bước nào thì gateway/skill/model sẽ lệch.

### 0. Clone và đường dẫn

```text
REPO_ROOT = <đường dẫn tuyệt đối tới clone này>
```

Ví dụ macOS: `/Users/you/Code/aicoworker`. Windows: `C:\Users\you\Code\aicoworker`.

Mọi chỗ có `<REPO_ROOT>` trong `openclaw.agents.example.json5` phải thay bằng đường dẫn thật trước khi merge.

### 1. Cài AICoworker

1. Cài và mở [AICoworker](https://aicoworker.app) một lần để tạo `~/.openclaw/openclaw.json` (Windows: `%USERPROFILE%\.openclaw\openclaw.json`).
2. Bật gateway local. Browser CDP của app thường lắng nghe `http://127.0.0.1:9333`.
3. Agent mặc định của app có **id `main`** (không xóa được). Gắn workspace `REPO_ROOT/workspaces/ceo`, đặt tên hiển thị `CEO`. Không tạo thêm agent id `ceo` song song.

### 2. Phụ thuộc hệ thống

| Cần | Việc gì dùng | Gợi ý cài |
|---|---|---|
| Node **18+** trên PATH hệ thống | `exec`, MCP `npx`, skill chạy script | nvm/official installer; **không** chỉ trong `.zshrc` / PowerShell profile |
| `ripgrep` (`rg`) | tìm trong repo / skill | `brew` / `apt` / `winget` |
| `pdftotext` (poppler) | deep-research đọc PDF | `brew install poppler` / `apt install poppler-utils` / tương đương Windows |
| (Tuỳ skill) `yt-dlp` | creator tải video | cài khi task yêu cầu, có duyệt |

Gateway AICoworker **không** load shell profile. Nếu `exec` báo `node not found`, thêm thư mục chứa `node` vào:

```json5
tools: {
  exec: {
    security: "full",
    ask: "off",
    pathPrepend: [
      // ví dụ — chỉnh theo máy
      "/Users/you/.nvm/versions/node/v24.19.0/bin",
      "/Applications/AICoworker.app/Contents/Resources/node/bin", // macOS app bundle
      "/Users/you/.local/bin"
    ]
  }
}
```

### 3. Workspace memory + shared

```bash
# Trong REPO_ROOT — mỗi agent một MEMORY.md (không commit)
for d in workspaces/*/MEMORY.starter.md; do
  dest="${d%.starter.md}.md"
  [ -f "$dest" ] || cp "$d" "$dest"
done
```

Trên Windows PowerShell: copy từng `MEMORY.starter.md` → `MEMORY.md` trong cùng thư mục agent.

Khung `shared/04_Queues`, `05_Approvals`, `07_Evidence`, `08_Downloads-Quarantine`, `09_Logs` đã có `.gitkeep` trong git. Không cần tạo lại trừ khi thiếu.

Không commit: `MEMORY.md`, `workspaces/*/memory/**`, `shared/01_Projects/*` (nội dung), `tmp/` — xem `.gitignore`.

### 4. Merge cấu hình agent + skill

1. Mở `openclaw.agents.example.json5`.
2. Thay toàn bộ `<REPO_ROOT>` bằng đường dẫn máy này.
3. Merge vào `~/.openclaw/openclaw.json`:
   - `skills.load.extraDirs` + `watch: true`
   - `agents.defaults` (compaction bên dưới)
   - `agents.list` (workspace, skills allowlist, subagents)
   - `mcp.servers.rea` nếu dùng agent `rea` (cần mạng lần đầu để `npx` tải package)
4. Giữ id CEO là `main`. Các agent khác giữ id như trong file mẫu (`analyst`, `architect`, …).

### 5. Compaction / memory flush (bắt buộc)

Đã có memory flush: gần đầy cửa sổ → ghi `memory/YYYY-MM-DD.md` → compaction. **Không** đặt `contextWindow` 1M (tốn token từng lượt).

Trong `agents.defaults.compaction`:

```json5
compaction: {
  mode: "safeguard",
  reserveTokensFloor: 20000,
  memoryFlush: {
    enabled: true,
    softThresholdTokens: 4000,
    forceFlushTranscriptBytes: 33554432 // 32MB
  }
}
```

Flush khi token ≥ `contextWindow − 20000 − 4000`.

Trên từng model `agent-*` trong `models.providers` (9router):

| Nhóm | `contextWindow` | Flush ≈ |
|---|---|---|
| Hầu hết agent | `200000` | ~176k |
| `agent-browser`, `agent-creator-research`, `agent-designer` | `256000` | ~232k |

`maxTokens` (output) nên ≥ `16384` cho agent có tool dài.

Gợi ý defaults khác (đã ổn trên máy mẫu, giữ nếu chưa có):

- `agents.defaults.timeoutSeconds`: `3600`
- `agents.defaults.maxConcurrent`: `4`
- `agents.defaults.subagents.maxConcurrent`: `8`
- `agents.defaults.heartbeat.every`: `"60m"`
- `agents.defaults.memorySearch.enabled`: `false` (dùng file `MEMORY.md` / `memory/`, không bắt buộc bật search)

### 6. Browser CDP

```json5
browser: {
  enabled: true,
  evaluateEnabled: true,
  attachOnly: true,
  defaultProfile: "aicoworker",
  profiles: {
    aicoworker: {
      cdpUrl: "http://127.0.0.1:9333",
      driver: "openclaw",
      attachOnly: true
    }
  }
}
```

Mở browser trong AICoworker trước khi agent `browser` chạy CDP.

### 7. 9router + model (khuyến nghị)

1. Cài / chạy 9router.
2. **Confirm với người dùng mọi provider đang có** (không chỉ GPT) — checklist trong mục Model → *Confirm provider*. Đăng nhập 9router đúng những gói đó.
3. Lấy bảng Model khuyến nghị, **thay / bỏ / xếp lại** từng ô theo gói đã confirm (cùng mục Model → *Chỉnh combo theo gói*). `9router.combos.example.json` chỉ là snapshot một máy — không import nguyên xi nếu gói khác.
4. Tạo combo `agent-<id>` (`main` ↔ `agent-ceo`). Trỏ `agents.list[].model.primary` tới `custom-<uuid>/agent-<id>`.
5. **Sau mỗi lần sync catalog:** set lại `contextWindow` 200k/256k (mục 5). Không đặt `1000000`.
6. Đổi gói hoặc catalog có model mới → confirm lại provider rồi cập nhật combo (mục Model → *Khi có model mới*).

Không có 9router: để trống model trong `agents.list` và chọn model mặc định trong UI (vẫn apply compaction + pathPrepend + skill dirs).

### 8. Telegram (DONE / RISK / BLOCKED)

Agent **không** gọi Bot API. Chúng chỉ ghi file năm dòng vào `shared/05_Approvals/Pending/`:

| Prefixo | Khi nào |
|---|---|
| `DONE-` | Việc xong |
| `RISK-` | Lệnh rủi ro cần duyệt |
| `BLOCKED-` | Kẹt sau hai vòng |

CEO (`main`) heartbeat (`workspaces/ceo/HEARTBEAT.md`) đọc các file đó và gửi tóm tắt qua kênh đã gắn (Telegram nếu bật).

Bật Telegram trên máy (token **không** vào git):

1. Tạo bot với [@BotFather](https://t.me/BotFather), copy token.
2. Ghi token một dòng vào `~/.openclaw/credentials/telegram.bot.token` (Windows: `%USERPROFILE%\.openclaw\credentials\telegram.bot.token`). Quyền file chỉ user đọc được.
3. Trong `openclaw.json`:

```json5
channels: {
  telegram: {
    enabled: true,
    dmPolicy: "pairing",          // lần đầu chat bot → lấy mã pair trong log/UI
    tokenFile: "~/.openclaw/credentials/telegram.bot.token", // đường dẫn tuyệt đối trên máy
    groupPolicy: "allowlist"
  }
}
```

4. Restart gateway. Mở chat với bot, làm pairing theo hướng dẫn AICoworker, gắn DM vào agent `main`.
5. Thử: tạo file thử `shared/05_Approvals/Pending/DONE-test-setup.md` (năm dòng) → đợi heartbeat hoặc bảo CEO kiểm Pending.

Tắt: `channels.telegram.enabled: false`. Không bao giờ commit file token.

### 9. Kiểm tra sau setup

1. Restart gateway AICoworker.
2. Chat `main`/CEO: thấy skill allowlist (route-work, …).
3. `exec` chạy được `node -v` và `rg --version`.
4. Một agent đọc được file dưới `REPO_ROOT/library/skills/...`.
5. (Nếu dùng) Browser CDP gắn `9333`; `pdftotext -v` ok cho deep-research.
6. Gần đầy context: có flush vào `workspaces/<agent>/memory/YYYY-MM-DD.md`.

### Không cần tinh chỉnh thêm

Các nút sau **đã tối ưu** cho stack này — không hạ `reserveTokensFloor` dưới 20k, không mở `contextWindow` lên 1M:

- Compaction / memoryFlush như mục 5
- contextWindow cost-aware 200k–256k
- `tools.exec` full + pathPrepend
- Browser attach-only CDP
- timeout / concurrent / heartbeat như trên

---

## Ai chốt khi design vướng

Bạn không phải chọn hộ.

- Gu, màu, chữ trên màn hình, trạng thái: `designer` chọn một phương án và ghi giả định trong `DESIGN.md`.
- Cách làm không code được: `architect` cắt bớt hành vi. `designer` sửa design cho khớp.
- Đổi giá hoặc đổi người trả tiền: chỉ CEO (`main`), trước khi `idea-fit.md` kết luận làm.

`implement` không bịa hướng nhìn mới. Nó báo một xung đột cho `architect`.

## Hai vòng rồi dừng

Một vấn đề chỉ được đẩy qua lại hai lần. Lần thứ ba không xảy ra.

Vòng 2 vẫn không xong thì agent đang giữ việc ghi:

`shared/05_Approvals/Pending/BLOCKED-<domain>-<ten-du-an>.md`

Năm dòng: vấn đề, đã thử ở vòng 1, đã thử ở vòng 2, quyết định cần bạn, đường dẫn file.

Telegram để bạn gắn sau. Ba loại file trong `shared/05_Approvals/Pending/`: `DONE-` báo xong (năm dòng), `RISK-` lệnh bị chặn, `BLOCKED-` kẹt sau hai vòng.

## Token

Mỗi agent một skill cho bước hiện tại. Task giao đi chỉ có mục tiêu, đường dẫn, số vòng, và chữ `chạy full` nếu bạn đã viết. Không gửi lịch sử chat và không dán nội dung file.

Input là đúng file skill nêu. File dài thì đọc đúng mục, không đọc cả file. Không quét repo, không quét `shared`, không đọc catalog.

File đầu ra giữ đủ mọi mục skill yêu cầu. Chat chỉ năm dòng. Không cắt file cho vừa một hạn chữ.

Mặc định agent dừng và gợi ý một bước tiếp. Bạn viết `chạy full` thì chuỗi tự chạy bước tiếp. Gửi, đăng, trả tiền, render trả phí, deploy, và lệnh rủi ro vẫn dừng để duyệt.

Xong việc thì xóa `draft`, `notes`, `tmp`.

## Rule và skill

`OPERATING.md` không vào prompt. Rule ngắn nằm trong `AGENTS.md` và `TOOLS.md` của từng agent. Phiên được giao chỉ thấy hai file đó.

Index skill là danh sách OpenClaw đưa vào phiên chính: tên, một dòng mô tả, đường dẫn. Mỗi agent chỉ thấy skill trong allowlist của mình. Phiên được giao không thấy danh sách, nên task ghi đường dẫn skill.

File mẫu đúng schema: `openclaw.agents.example.json5`. Model để trống thì agent dùng model mặc định đang cài.

## Model

Bảng cuối mục này là **khuyến nghị khi đủ gói** (Claude Team + ChatGPT Plus + Cursor + Antigravity). Máy thật gần như luôn thiếu một vài gói — **luôn confirm rồi mới set**.

9router nối provider; cột 1 chạy hằng ngày; hết lượt sang cột sau; hết combo thì Copilot Student Auto, rồi Gemma 4 12B (local) nếu gắn. Combo tên `agent-<id>` (`main` ↔ `agent-ceo`).

### Confirm provider (bắt buộc)

Hỏi người dùng / kiểm tra 9router trước khi tạo hoặc sửa combo:

| Provider | Có? | Model kỳ vọng khi có |
|---|---|---|
| Claude Team (cc/) | | Sonnet 5.5, Haiku 5.5; fallback Sonnet 5 / Haiku 4.5; Opus 5.5 khi Sonnet không đạt |
| ChatGPT Plus / Codex (cx/) | | GPT-6.1 Sol, GPT-6 Sol, GPT-6 Luna. `6.1 Sol` lỗi → GPT-6 Sol. GPT-5.6- không còn trên đường này |
| Codex Free / không Plus | | Chỉ **GPT-6 Luna** (không Sol / 6.1 Sol) |
| Cursor Pro (cu/) | | Grok 4.7 (code khó), Grok 4.6, Composer 2.5 (rẻ) |
| Antigravity (ag/) | | Gemini 4 Argon, Gemini 3.8 Flash (Argon app/CLI). Muse Spark chỉ khi balance quà — không Contributor |
| Gemma local / Copilot Student | | Chỉ cuối chuỗi hoặc agent rẻ khi hết lượt gói trả phí |

`9router.combos.example.json` = snapshot **một** máy đã confirm (ví dụ không Plus → Luna). Máy khác gói khác → chỉnh lại, không copy nguyên.

### Chỉnh combo theo gói đang có

Lấy bảng khuyến nghị bên dưới, rồi áp dụng (có thể kết hợp nhiều dòng):

| Thiếu / hạn chế | Cách chỉnh |
|---|---|
| Không Claude | Ô Sonnet/Haiku → Gemini Flash hoặc Argon / Grok / GPT (theo gói còn) |
| Không Plus (chỉ Free GPT) | Mọi GPT-6.1 Sol / GPT-6 Sol → **GPT-6 Luna** |
| Không GPT/Codex | Ô GPT → Claude hoặc Gemini / Grok cùng vai trò |
| Không Cursor | Ô Grok / Composer → Claude Sonnet/Haiku hoặc Gemini Flash |
| Không Antigravity | Ô Argon / Flash → Claude hoặc GPT cùng vai trò (designer/visual ưu tiên model thị giác còn lại) |
| Chỉ còn local / Student | Agent nặng tạm dừng hoặc xếp Gemma/Auto cuối; đừng để primary |

Sau khi chỉnh: tạo/cập nhật combo 9router, sync OpenClaw, **set lại** `contextWindow` 200k/256k.

### Khi có model mới hoặc đổi gói

1. Confirm lại **toàn bộ** provider (bảng trên).
2. Cập nhật combo 9router (+ file example nếu muốn giữ snapshot máy này).
3. Sync OpenClaw → set lại `contextWindow`.

| Agent | Chạy mặc định | Fallback 1 | Fallback 2 |
|---|---|---|---|
| `main` (CEO) | Claude Sonnet 5.5 | GPT-6 Sol | Claude Sonnet 5 |
| `analyst` | GPT-6 Sol | Gemini 3.8 Flash | Claude Sonnet 5 |
| `architect` | Claude Sonnet 5.5 | Grok 4.7 | GPT-6.1 Sol |
| `designer` | Gemini 4 Argon | Gemini 3.8 Flash | Claude Sonnet 5.5 |
| `implement` | Grok 4.7 | Claude Sonnet 5.5 | GPT-6.1 Sol |
| `reviewer` | Claude Sonnet 5.5 | GPT-6 Sol | Grok 4.6 |
| `debug` | Claude Sonnet 5.5 | Grok 4.7 | GPT-6.1 Sol |
| `rea` | Claude Sonnet 5.5 | GPT-6 Sol | Gemini 3.8 Flash |
| `tester` | Composer 2.5 | Gemini 3.8 Flash | GPT-6 Luna |
| `developer-work` | Claude Haiku 5.5 | Gemini 3.8 Flash | GPT-6 Luna |
| `developer-personal` | GPT-6.1 Sol | Grok 4.6 | Composer 2.5 |
| `marketer` | Claude Sonnet 5.5 | GPT-6 Sol | Gemini 3.8 Flash |
| `sales` | Claude Sonnet 5.5 | GPT-6 Sol | Gemini 3.8 Flash |
| `creator` | Claude Sonnet 5.5 | GPT-6 Sol | Claude Sonnet 5 |
| `creator-story` | Claude Sonnet 5.5 | GPT-6 Sol | GPT-6 Luna |
| `creator-visual` | Gemini 4 Argon | Gemini 3.8 Flash | Claude Sonnet 5.5 |
| `creator-research` | Gemini 3.8 Flash | GPT-6 Luna | Claude Haiku 5.5 |
| `creator-publish` | Claude Haiku 5.5 | GPT-6 Luna | Gemini 3.8 Flash |
| `support` | Claude Haiku 5.5 | Gemini 3.8 Flash | GPT-6 Luna |
| `browser` | Gemini 3.8 Flash | Claude Haiku 5.5 | GPT-6 Luna |
| `office` | GPT-6 Luna | Claude Haiku 5.5 | Gemma 4 12B |
| `application` | Claude Haiku 5.5 | Gemini 3.8 Flash | Gemma 4 12B |

## Thư mục dự án

`shared/01_Projects/<domain>/<ten-du-an>/`

Domain chỉ có `giai-phap-so` hoặc `media`. Hồ sơ điều phối nằm ở đó. Code, `DESIGN.md`, `interface.md`, `BRAND.md`, và `product-test.md` nằm trong repo ghi ở `repo.txt`.
