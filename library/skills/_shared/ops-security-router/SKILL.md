---
name: ops-security-router
description: Dynamic router for DevOps, cloud security, and financial operations. Evaluates infrastructure or financial needs and routes to exactly one skill.
---

TRIGGER: infrastructure setup, cloud security audit, secrets scan, CI/CD pipeline, backup, or runway analysis
OUTPUT: compact — exact path of the single matching ops/security/finance skill to read and execute
SKIP: feature coding, visual media creation, or sales conversations

---

# Ops, Security & Finance Skill Router

Read this routing table to identify the single skill needed. **Load only that one SKILL.md into context**.

## Routing Table

| If the task is... | Read only this skill path |
|---|---|
| **1. An Ninh Mạng & Bảo Mật (Security)** | |
| Quét rò rỉ API key, file .env trong git, kiểm toán quyền cloud bucket | `library/skills/security/cloud-secrets-audit/SKILL.md` |
| Kiểm toán lỗ hổng AppSec (OWASP, IDOR/BOLA, Auth bypass, SQLi) | `library/skills/security/appsec-pentest-review/SKILL.md` |
| Rà soát kiểm soát an ninh web theo tiêu chuẩn ASVS | `library/skills/_shared/web-security-assurance/SKILL.md` |
| Mô hình hóa mối đe dọa ranh giới tin cậy (STRIDE threat model) | `library/skills/_shared/security-threat-model/SKILL.md` |
| **2. Hạ Tầng & Triển Khai (DevOps & Release)** | |
| Tạo pipeline CI/CD GitHub Actions tự động hóa test và build container | `library/skills/devops/ci-cd-pipeline/SKILL.md` |
| Chuẩn bị manifest deploy (Docker, VPS/Cloud, SSL/Caddy) và rollback | `library/skills/devops/cloud-deploy-release/SKILL.md` |
| Thiết lập sao lưu database tự động (S3/R2) và diễn tập phục hồi DR | `library/skills/devops/database-backup-dr/SKILL.md` |
| **3. Tài Chính & Dòng Tiền (Finance & Runway)** | |
| Dự báo burn-rate hàng tháng (API, VPS, tool) và tính runway còn lại | `library/skills/finance/cashflow-runway/SKILL.md` |
| Quản lý tiến độ thanh toán deal (Deposit/Milestone) và đối soát chi phí | `library/skills/finance/billing-bookkeeping/SKILL.md` |
| Kiểm toán giá vốn (COGS) trực tiếp trên mỗi người dùng / sản phẩm | `library/skills/analyst/unit-economics-audit/SKILL.md` |

---

## Execution Rule

1. Check the table above.
2. Select at most **one** target skill path matching the active phase.
3. Call `view_file` on that `<path>/SKILL.md`.
4. Execute according to that skill's instructions.
