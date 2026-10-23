---
name: dev-skill-router
description: Dynamic router for software development tasks. Evaluates the task and directs the agent to load exactly one targeted engineering skill.
---

TRIGGER: implementing features, fixing bugs, designing architecture, writing tests, or reviewing code
OUTPUT: compact — exact path of the single matching engineering skill to read and execute
SKIP: media production, business operations, or marketing tasks

---

# Development Skill Router

Read this routing table to identify the single skill needed. **Load only that one SKILL.md into context**.

## Routing Table

| If the task is... | Read only this skill path |
|---|---|
| **1. Khảo sát & Kiến trúc (Planning & Architecture)** | |
| Khảo sát yêu cầu sản phẩm mới, lập brief dự án | `library/skills/architect/new-project-discovery/SKILL.md` |
| Thiết kế kiến trúc kỹ thuật hệ thống, chọn stack | `library/skills/architect/technical-architecture/SKILL.md` |
| Lập kế hoạch thực thi chi tiết, chia nhỏ thành các slice nhỏ | `library/skills/architect/writing-plans-superpowers/SKILL.md` |
| **2. Viết Code Tính Năng (Implementation)** | |
| Xây dựng UI frontend React / Next.js | `library/skills/implement/frontend-react/SKILL.md` |
| Mẫu kiến trúc Next.js App Router (Server components, actions, caching) | `library/skills/implement/nextjs-patterns/SKILL.md` |
| Xây dựng API backend (FastAPI / Express / NestJS), xác thực, phân trang | `library/skills/implement/backend-api/SKILL.md` |
| Tạo và di chuyển schema cơ sở dữ liệu an toàn (Migrations) | `library/skills/_shared/db-migration-workflow/SKILL.md` |
| Tích hợp API bên thứ ba, xử lý webhook | `library/skills/_shared/api-integration-workflow/SKILL.md` |
| Quản lý biến môi trường (.env), feature flags | `library/skills/_shared/env-config-management/SKILL.md` |
| Tự kiểm tra độc lập giữa các slice code | `library/skills/implement/incremental-self-review/SKILL.md` |
| **3. Kiểm Thử & Sửa Lỗi (Testing & Debugging)** | |
| Viết và chạy test Playwright cho web hoặc desktop | `library/skills/tester/product-test/SKILL.md` |
| Viết test API bao phủ happy path, lỗi, auth | `library/skills/_shared/api-testing/SKILL.md` |
| Tìm nguyên nhân gốc rễ và sửa bug hệ thống | `library/skills/debug/root-cause-debugging/SKILL.md` |
| **4. Soát Xét & Nghiệm Thu (Review & Verification)** | |
| Soát xét diff code độc lập so với spec | `library/skills/reviewer/independent-review/SKILL.md` |
| Xác minh chạy test/lint của repo trước khi bàn giao | `library/skills/_shared/verify-change/SKILL.md` |

---

## Execution Rule

1. Check the table above.
2. Select at most **one** target skill path matching the active phase.
3. Call `view_file` on that `<path>/SKILL.md`.
4. Execute according to that skill's instructions.
