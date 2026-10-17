# Skill theo role

OpenClaw vẫn đọc mọi `SKILL.md` dưới `library/skills`, rồi allowlist của từng agent lọc phần được thấy.

- `<role>/` chứa skill chỉ role đó dùng.
- `_shared/` chứa skill dùng từ hai role trở lên.
- `_catalog/` chứa skill chưa gán. Không nằm allowlist nên không vào prompt.

Thêm skill mới vào folder của role sẽ dùng nó. Nếu role thứ hai cũng cần, chuyển sang `_shared/`.
