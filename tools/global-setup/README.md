# Setup toàn máy (Claude, Codex, Antigravity, Cursor)

Dùng skill của repo này ở mọi repo khác trên máy. Không đụng OpenClaw.

```bash
tools/global-setup/install.sh            # dry-run
tools/global-setup/install.sh --apply    # ghi thật
```

Chạy lại an toàn. Không ghi đè file thật. Thêm/bớt skill trong `library/skills` thì chạy lại `--apply`. Di chuyển repo thì cũng chạy lại.

## Kết quả

- Symlink vào `~/.codex/skills`, `~/.agents/skills`, `~/.claude/skills`, `~/.gemini/antigravity/skills`, `~/.cursor/skills`.
- Zoo Code (Roo): skill đọc từ `~/.agents/skills` và `~/.roo/skills`; rule global đọc từ `~/.roo/rules/` (script link `RULES.md` vào đó). Không đọc `CLAUDE.md`. Mode, rule, skill theo mode lấy từ `sources/ZooCodeConfig/copy-this`, đã copy vào `roo/` (bản copy, không tự đồng bộ: cập nhật source thì copy lại rồi `--apply`). Có 4 mode Architect Pro, Implement Pro, Debug Pro, Tester Pro, `rules*`, `skills-architect/implement/debug/tester`, `skills/`, `templates`. Script link vào `~/.roo/` và chỉ chép `custom_modes.yaml` vào globalStorage khi file đó rỗng. `roo/mcp.json` chưa gắn global (MCP global nằm ở `mcp_settings.json`, cần API key); `skills-analyst/creator/marketer/reviewer/...` không có mode tương ứng nên không dùng.
- `RULES.md` append một lần (marker `<!-- aicoworker-base -->`) vào `~/.claude/CLAUDE.md`, `~/.codex/AGENTS.md`, `~/.gemini/GEMINI.md`. Cursor không có file global: dán `RULES.md` vào Settings > Rules.

## Nạp theo nhu cầu

- Tầng 1, trực tiếp: skill trong `CORE` (`install.sh`). Agent thấy tên + mô tả mỗi phiên.
- Tầng 2, `skill-router`: một skill duy nhất đại diện mọi skill còn lại. `skill-router/SKILL.md` do script sinh (đừng sửa tay). Agent gọi router, đọc bảng, rồi chỉ `Read` 1-2 `SKILL.md` khớp.
- Skill hay bị bỏ sót: thêm vào `CORE`, chạy lại `--apply`.

## Phạm vi

Lấy `_shared`, `implement`, `debug`, `reviewer`, `tester`, `architect`, cộng `data-privacy-compliance` từ `_catalog`. Bỏ skill gắn workspace aicoworker (ceo, creator*, sales, marketer, office, support, application, browser, rea, designer) và `creator-knowledge`, `mcp-connect`, `mcp-server-build`, `packaging-distribution`.

Chưa kiểm chứng: Codex và Antigravity có tự nạp `~/.agents/skills` hay không. Đã link trực tiếp vào thư mục của từng tool nên không phụ thuộc điều đó.
