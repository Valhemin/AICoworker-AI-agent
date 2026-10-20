# HEARTBEAT.md

Mỗi nhịp heartbeat:

1. Liệt kê file mới trong `../shared/05_Approvals/Pending/` khớp `DONE-*`, `RISK-*`, `BLOCKED-*` (chỉ file chưa xử lý trong phiên này).
2. Nếu có: đọc tối đa năm dòng mỗi file, gửi tóm tắt cho người dùng (kênh Telegram/DM nếu đang gắn; không thì trả trong chat heartbeat). Không gọi Bot API thô — dùng kênh OpenClaw/`message` nếu có.
3. Không xóa/đổi tên file Pending. Không spawn agent khác trong heartbeat.
4. Không có việc: trả lời `HEARTBEAT_OK`.
