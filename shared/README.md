# Dữ liệu chung

Đây là chỗ để file việc. Không phải prompt của agent.

Đường dẫn dưới đây tính từ thư mục `workspaces/<agent>` là `../shared/...`.

- `00_System/OPERATING.md` — cách giao việc, cổng test, và ngân sách token.
- `00_System/Templates` — mẫu task, plan, handoff, duyệt.
- `01_Projects/<domain>/<ten-du-an>/` — hồ sơ một dự án. Domain là `giai-phap-so` hoặc `media`. Source code nằm ở repo ghi trong `repo.txt`.
- `04_Queues/Browser`, `Office`, `Application` — mỗi hàng có Inbox, Working, Outbox, Failed.
- `05_Approvals/Pending` — xin duyệt trước khi gửi, đăng, xóa, trả tiền, hoặc ghi production.
- `07_Evidence` — ảnh và bằng chứng theo agent.
- `08_Downloads-Quarantine` — file tải từ internet. Không chạy file ở đây.
- `09_Logs` — log workflow desktop.

Không lưu mật khẩu, API key, token, cookie, OTP, hoặc thông tin thẻ.

Không quét cả cây này. Đọc đúng task được giao.

Bốn cửa vào: `ceo` cho sản phẩm và vận hành, `developer-work` cho repo công ty, `developer-personal` cho repo cá nhân, `creator` cho nội dung.
