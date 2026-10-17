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

Cột mức là loại model để bạn điền id sau. Cùng một mức vẫn nên là id riêng nếu bạn muốn tách chi phí.

| Agent | Mức | Việc | Input | Output |
|---|---|---|---|---|
| `ceo` | Mạnh nhất | Chọn đường, dừng ý tưởng lỗ | Ý tưởng, `idea-fit.md` | Giao một agent, hoặc file BLOCKED |
| `analyst` | Mạnh, không cần code | Có người trả tiền không | Một ý tưởng, tối đa ba nguồn | `idea-fit.md` |
| `architect` | Mạnh | Spec, hoặc khoanh sự cố | Brief hoặc `support-issue.md` | Plan, hoặc `where.md` |
| `designer` | Mạnh, giỏi thị giác | Gu và trạng thái màn hình | Brief và feedback một vòng | `DESIGN.md`, `interface.md`, `BRAND.md` nếu bán |
| `implement` | Code mạnh nhất | Code theo spec | Spec, `DESIGN.md`, `interface.md` | Code chạy được |
| `reviewer` | Mạnh, không viết code | Soát lát, không tin self-review | Spec và file đã đổi | `docs/review/review.md` |
| `debug` | Code mạnh nhất | Sửa mục FAIL | Biên bản tester hoặc `where.md` | Sửa đúng các mục đó |
| `rea` | Mạnh, đọc bằng chứng | Dựng lại một tool tương tự | Một file local và một hành vi | `rea-findings.md`. Không code sản phẩm |
| `tester` | Code, rẻ hơn implement một bậc | PASS hoặc FAIL, hoặc một bước QA | Tiêu chí, lát đã code, hoặc case | `product-test.md`, hoặc file test trong repo |
| `developer-work` | Rẻ, chỉ điều phối | Yêu cầu hoặc bug repo công ty | Repo và yêu cầu | Tester PASS hoặc BLOCKED |
| `developer-personal` | Code riêng | Sửa repo đang chạy | Repo, design hoặc spec nếu có | Code đã sửa |
| `marketer` | Mạnh, không cần code | Brand profile → kênh → bốn tài sản → lịch nội dung | Giá và bản để đưa ra | `profile.md`, `audience-channel.md`, `launch-sprint.md`, `content-calendar.md` |
| `sales` | Mạnh, không cần code | Chuẩn bị bán + phân tích deal 1-1. Không liên hệ khách | Tên khách/sản phẩm + bối cảnh | Tài liệu chuẩn bị, deal notes, win-loss log |
| `creator` | Mạnh về chữ | Kịch bản, rồi lệnh sản xuất | Đơn đã được phép làm | Kịch bản, sau đó `produce.md` |
| `creator-story` | Mạnh về chữ | Cấu trúc và lời | Brief | Kịch bản |
| `creator-visual` | Mạnh về hình | Ảnh và prompt video | `BRAND.md` | Một ảnh, một prompt video. Chưa render |
| `creator-research` | Rẻ hơn một bậc | Fact | Một câu hỏi | Fact, tách suy đoán |
| `creator-publish` | Rẻ hơn một bậc | Gói đăng, phụ đề, lệnh lồng tiếng | Kịch bản, file local, hoặc các link | `produce.md` và các file đã tải. Chưa render |
| `support` | Rẻ | Ghi sự cố | Khách làm gì, thấy gì | `support-issue.md`, chuyển `architect` |
| `browser` | Rẻ | Đọc, bấm, điền nháp trên trình duyệt có sẵn | Một URL hoặc một task hàng đợi | Handoff ngắn. Không gửi form |
| `office` | Rẻ | File văn phòng | File được giao | File kết quả |
| `application` | Rẻ | App desktop | Workflow đã có | File kết quả |

## Thư mục dự án

`shared/01_Projects/<domain>/<ten-du-an>/`

Domain chỉ có `giai-phap-so` hoặc `media`. Hồ sơ điều phối nằm ở đó. Code, `DESIGN.md`, `interface.md`, `BRAND.md`, và `product-test.md` nằm trong repo ghi ở `repo.txt`.
