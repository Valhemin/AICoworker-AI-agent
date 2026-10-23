---
name: growth-marketing-router
description: Dynamic router for marketing, sales, and product analytics tasks. Evaluates the commercial goal and routes to exactly one specialized skill.
---

TRIGGER: marketing planning, ad creative audit, sales prep, objection handling, or funnel analytics
OUTPUT: compact — exact path of the single matching growth/sales skill to read and execute
SKIP: software coding or media production tasks

---

# Growth & Marketing Skill Router

Read this routing table to identify the single skill needed. **Load only that one SKILL.md into context**.

## Routing Table

| If the task is... | Read only this skill path |
|---|---|
| **1. Định Vị & Nội Dung (Marketing & Branding)** | |
| Định vị sản phẩm, chân dung khách hàng cốt lõi | `library/skills/marketer/brand-profile/SKILL.md` |
| Chọn kênh phân phối và nhóm khách hàng chính | `library/skills/marketer/audience-channel/SKILL.md` |
| Lập kế hoạch ra mắt 4 tài sản chính cho sản phẩm cam kết | `library/skills/marketer/launch-sprint/SKILL.md` |
| Lên lịch nội dung 4 bài tiếp theo sau khi ra mắt | `library/skills/marketer/content-calendar/SKILL.md` |
| Theo dõi và phân tích động thái của đối thủ cạnh tranh | `library/skills/marketer/competitor-watch/SKILL.md` |
| **2. Tối Ưu Chuyển Đổi & Quảng Cáo (Performance & CRO)** | |
| Kiểm toán mẫu quảng cáo trả phí (Hook/Angle) và trang landing page | `library/skills/marketer/paid-media-audit/SKILL.md` |
| Cài đặt tracking sự kiện và phân tích phễu chuyển đổi (PostHog/GA4) | `library/skills/marketer/product-telemetry-tracking/SKILL.md` |
| **3. Bán Hàng Trực Tiếp (B2B Sales Execution)** | |
| Chuẩn bị hồ sơ bán hàng sản phẩm mới và định vị giá trị | `library/skills/sales/sales-context/SKILL.md` |
| Chuẩn bị cho buổi gặp khách hàng cụ thể (Discovery prep) | `library/skills/sales/discovery-prep/SKILL.md` |
| Kịch bản xử lý từ chối của khách hàng (Objection handling) | `library/skills/sales/objection-handling/SKILL.md` |
| Tổng kết buổi gặp, chốt deal và phân tích bài học thắng/thua | `library/skills/sales/deal-close/SKILL.md` |

---

## Execution Rule

1. Check the table above.
2. Select at most **one** target skill path matching the active phase.
3. Call `view_file` on that `<path>/SKILL.md`.
4. Execute according to that skill's instructions.
