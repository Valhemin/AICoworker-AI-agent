# AICoworker

Công ty nhỏ gồm hai mảng: `giai-phap-so` và `media`. Mục tiêu là có người trả tiền, hoặc dừng ý tưởng trước khi làm. Bạn tự bán. Doanh thu nằm ở hệ thống khác, không nằm ở các agent này.

Chi tiết vận hành: `shared/00_System/OPERATING.md`. File mẫu agent: `openclaw.agents.example.json5`. Điền id model vào đó rồi merge vào `~/.openclaw/openclaw.json`. Không ghi API key vào repo.

## Ai chốt khi design vướng

Bạn không phải chọn hộ.

- Gu, màu, chữ trên màn hình, trạng thái: `designer` chọn một phương án và ghi giả định trong `DESIGN.md`.
- Cách làm không code được: `architect` cắt bớt hành vi. `designer` sửa design cho khớp.
- Đổi giá hoặc đổi người trả tiền: chỉ `ceo`, trước khi `idea-fit.md` kết luận làm.

`implement` không bịa hướng nhìn mới. Nó báo một xung đột cho `architect`.

## Hai vòng rồi dừng

Một vấn đề chỉ được đẩy qua lại hai lần. Lần thứ ba không xảy ra.

Vòng 2 vẫn không xong thì agent đang giữ việc ghi:

`shared/05_Approvals/Pending/BLOCKED-<domain>-<ten-du-an>.md`

Năm dòng: vấn đề, đã thử ở vòng 1, đã thử ở vòng 2, quyết định cần bạn, đường dẫn file.

Telegram để bạn gắn sau. Ba loại file trong `shared/05_Approvals/Pending/` là tin gửi vào chat của bạn. `DONE-` là báo xong, năm dòng. `RISK-` là lệnh bị chặn. `BLOCKED-` là kẹt sau hai vòng. OpenClaw nhận bot ở `channels.telegram` trong `~/.openclaw/openclaw.json`. Không để bot token trong repo này.

## Token

Mỗi agent một skill cho bước hiện tại. Task giao đi chỉ có mục tiêu, đường dẫn, số vòng, và chữ `chạy full` nếu bạn đã viết. Không gửi lịch sử chat và không dán nội dung file.

Input là đúng file skill nêu. File dài thì đọc đúng mục, không đọc cả file. Không quét repo, không quét `shared`, không đọc catalog.

File đầu ra giữ đủ mọi mục skill yêu cầu. Chat chỉ năm dòng. Không cắt file cho vừa một hạn chữ.

Mặc định agent dừng và gợi ý một bước tiếp. Bạn viết `chạy full` thì chuỗi tự chạy bước tiếp. Gửi, đăng, trả tiền, render trả phí, deploy, và lệnh rủi ro vẫn dừng để duyệt.

Xong việc thì xóa `draft`, `notes`, `tmp`.

## Rule và skill

`OPERATING.md` không vào prompt. Rule ngắn nằm trong `AGENTS.md` và `TOOLS.md` của từng agent. Phiên được giao chỉ thấy hai file đó.

Index skill là danh sách OpenClaw đưa vào phiên chính: tên, một dòng mô tả, đường dẫn. Mỗi agent chỉ thấy skill trong allowlist của mình. Phiên được giao không thấy danh sách, nên task ghi đường dẫn skill.

File mẫu đúng schema máy này: `openclaw.agents.example.json5`. Model để trống thì agent dùng model mặc định đang cài.

## Model

Điền tên model. 9router lo phần nối. Cột đầu chạy hằng ngày. Hết cột thì sang cột kế. Hết ba cột thì Copilot Student Auto, rồi Gemma 4 12B.

Codex qua Plus chỉ có GPT-6.1 Sol, GPT-6 Sol, GPT-6 Luna. GPT-5.6 trở xuống không còn trên đường đăng nhập này. `GPT-6.1 Sol` lỗi thì đổi thành GPT-6 Sol.

Cursor Pro gồm Grok 4.7, Grok 4.6 và Composer 2.5. Grok là model của Cursor, không phải provider riêng. Grok 4.7 cho code khó. Composer 2.5 cho việc rẻ.

Claude Team dùng Sonnet 5.5 và Haiku 5.5. Sonnet 5 và Haiku 4.5 là fallback khi tên mới chưa hiện trên 9router. Opus 5.5 chỉ khi Sonnet 5.5 cho kết quả không dùng được.

Antigravity Pro dùng Gemini 4 Argon và Gemini 3.8 Flash. Argon chạy ở app hoặc CLI, không có trong IDE. Muse Spark 1.3 chỉ thêm sau fallback code khi balance quà hiện trong 9router. Không bật bản Contributor.

Gemma 4 12B giữ bản Q4, context quanh 16k. Chỉ cho `office`, `application`, `support`, `developer-work` khi các gói hết lượt.

| Agent | Chạy mặc định | Fallback 1 | Fallback 2 |
|---|---|---|---|
| `ceo` | Claude Sonnet 5.5 | GPT-6 Sol | Claude Sonnet 5 |
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
