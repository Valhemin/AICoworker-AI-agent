# Cách làm việc

Nguyên tắc người dùng thắng thói quen của từng agent. File này là bản để người đọc. OpenClaw không inject file này.

Phiên chính nhận `AGENTS.md`, `SOUL.md`, `TOOLS.md`, `IDENTITY.md`, `USER.md`, `HEARTBEAT.md`, và `MEMORY.md` nếu có. Phiên được giao chỉ nhận `AGENTS.md` và `TOOLS.md`. Rule muốn agent tuân theo phải nằm trong hai file đó.

Phiên chính còn nhận danh sách skill được phép: tên, một dòng mô tả, và đường dẫn. Đó là index. Agent đọc đúng một file skill khi làm bước đó. Phiên được giao không nhận danh sách này, nên task phải ghi đường dẫn skill.

## Đầu ra code

Việc liên quan code phải chạy được trên đường vừa làm, xử lý lỗi của đường đó, và có test của lát vừa đổi. Không thêm tính năng ngoài yêu cầu để cho đủ đẹp. Không để `TODO` chặn đúng việc được giao.

Bug hoặc thay đổi nhỏ, khoảng một hành vi và vài file, làm thẳng. Không viết plan.

Việc lớn hơn:

1. Viết plan theo `00_System/Templates/PLAN-TEMPLATE.md`.
2. Để plan trong repo được giao, tại `docs/plans/YYYY-MM-DD-slug.md`.
3. Code tới mức chạy được.
4. Chạy test của lát đó.
5. Dừng. Trạng thái `WAITING REVIEW`. Người dùng duyệt những gì đã làm.
6. Chưa có yêu cầu thì không commit và không push.

## Ai làm gì

- `ceo`: hai mảng, giải pháp số và media. Mọi ý tưởng mới qua `analyst`. Không làm thì dừng. Giải pháp số đi tiếp sang code. Media đi tiếp sang kịch bản. Sản phẩm đã chạy thì `founder-next-moves`. Việc lặp lại thì `founder-sop`. Có người trả tiền là mục tiêu.
- `analyst`: một ý tưởng, một giá hai thị trường, một kết luận, và mảng `giải pháp số` hoặc `media`. Được spawn `creator-research` để nghiên cứu thị trường sâu hơn nếu cần.
- `developer-work`: nhận yêu cầu hoặc bug của repo công ty. Gọi `architect`, `implement`, `debug`, `tester`. Gọi `rea` chỉ khi task là dựng lại một tool tương tự một tool đã có. Không gọi `web-seo`. Xong khi tester PASS.
- `rea`: agent độc lập. Đọc một hành vi của tool đã có, ghi quy tắc để viết bản của mình. Không sửa bug. Không chép mã decompile. Không code sản phẩm.
- `developer-personal`: thêm, sửa, fix repo đang chạy. Được gọi `architect`, `implement`, `debug`, `tester`, và skill `web-seo`. Nhận design, spec, nội dung SEO nếu có. Sản phẩm mới từ ý tưởng tới bán thì mở cửa `ceo`.
- `architect`: plan và spec kỹ thuật. Gọi `designer` chỉ khi task thuộc `ceo`.
- `designer`: `DESIGN.md`, `interface.md`, và với cửa `ceo` thì `BRAND.md`. Qua `design-check` rồi mới giao code. Không viết code.
- `implement`: code theo plan hoặc spec đã có. Code mới theo `code-structure`. Giao diện thì gọi `follow-design`. Trang public thì gọi `web-seo`. Rồi `reviewer`. Reviewer PASS thì `tester`. Reviewer FAIL thì `implement` sửa đúng các mục đó, tối đa hai vòng. Tester FAIL thì `debug` sửa các mục đó và tester chạy lại.
- `reviewer`: soát spec với file đã đổi. Không đọc chat của người viết code. Không sửa code. PASS thì `tester`. FAIL thì trả `implement`.
- `tester`: PASS hoặc FAIL theo tiêu chí. Web dùng Playwright. Cửa sổ desktop dùng `qa-desktop`. Được viết test. Không sửa code sản phẩm. FAIL sản phẩm thì đưa biên bản cho `debug`.
- `debug`: sửa đúng các mục FAIL của tester, hoặc bug đã tái hiện. Không viết plan.
- `support`: sự cố của khách. Lỗi kỹ thuật thì chuyển `architect`. Không biết dùng thì gọi `user-faq` rồi spawn `creator` viết hướng dẫn nếu chưa có. Cùng câu hỏi lần hai thì cập nhật FAQ trước.
- `marketer`: sản phẩm mới thì `brand-profile` trước, rồi `audience-channel`, rồi `launch-sprint`. Sau launch thì `content-calendar` cho bốn bài tiếp theo. Đối thủ thay đổi thì `competitor-watch`. Không đăng, không trả tiền, không đổi giá. Không bán.
- `sales`: chuẩn bị và phân tích bán hàng 1-1. Bắt đầu sản phẩm mới thì `sales-context` → `value-prop` → `objection-handling`. Trước mỗi buổi gặp thì `discovery-prep`. Sau buổi gặp thì `deal-brief`. Gần close thì `deal-close`. Sau khi xong deal thì `win-loss`. Không liên hệ khách hàng. Không gửi email. Không đổi giá.
- `browser`, `office`, `application`: việc vận hành đúng hàng đợi. Không viết plan code.
- `creator`: xưởng media. Show mới đi `creator-story` rồi hình rồi `opencreator-handoff`. Video local hoặc các link trong task đi thẳng `creator-publish`. Có link thì tải hết trước. Thiếu `yt-dlp` thì xin duyệt rồi mới cài. Chưa render.
- `developer-personal`: viết MCP server bằng `mcp-server-build`, gắn vào OpenClaw bằng `mcp-connect`. Task MCP của repo công ty do `implement` làm hai skill đó.

Agent được phép bác một chi tiết trong yêu cầu khi chi tiết đó làm hỏng đầu ra. Phải nêu cách làm thay thế và làm cách đó. Không được bỏ cả yêu cầu.

## Phòng ban

Chỗ trống model nằm trong `openclaw.agents.example.json5`. Điền id provider theo cột loại model.

| Phòng | Agent | Loại model | Vào | Ra |
|---|---|---|---|---|
| Điều hành | `ceo` | phán đoán mạnh nhất | Ý tưởng phần mềm hoặc media | Làm hoặc không làm. Đúng phòng nhận việc |
| Chiến lược | `analyst` | mạnh, không cần code | Một ý tưởng | `idea-fit.md`: làm, lát nhỏ, hoặc không làm. Mảng và giá |
| Chiến lược | `architect` | mạnh | Brief, hoặc `support-issue.md` | Spec để code, hoặc `where.md` rồi giao `debug` |
| Thiết kế | `designer` | mạnh, giỏi thị giác | Sản phẩm cửa CEO | `DESIGN.md` và `BRAND.md` |
| Kỹ thuật | `developer-work` | rẻ, chỉ điều phối | Yêu cầu hoặc bug, kèm repo công ty | Tester PASS |
| Kỹ thuật | `developer-personal` | code riêng | Repo đang chạy. Design, spec, chữ SEO nếu có | Code đã sửa, tester PASS khi có tiêu chí |
| Kỹ thuật | `implement` | code mạnh nhất | Spec hoặc yêu cầu đã rõ | Code chạy được |
| Kỹ thuật | `reviewer` | mạnh, không viết code | Spec và file đã đổi | PASS hoặc FAIL. Không sửa code |
| Kỹ thuật | `tester` | code, có thể rẻ hơn implement | Tiêu chí, lát đã code, hoặc case | PASS hoặc FAIL. Được viết test |
| Kỹ thuật | `debug` | code mạnh nhất | Biên bản FAIL của tester, hoặc bug đã tái hiện | Các mục đó đã sửa |
| Kỹ thuật | `rea` | mạnh, đọc bằng chứng | Tool đã có và một hành vi cần dựng lại | `rea-findings.md`. Không sửa bug |
| Thị trường | `marketer` | mạnh, không cần code | Giá và bản để đưa ra | Brand profile → kênh → bốn tài sản → lịch nội dung. Chưa đăng |
| Thị trường | `sales` | mạnh, không cần code | Khách tiềm năng cụ thể, hoặc sản phẩm mới cần hồ sơ bán | Tài liệu chuẩn bị, deal notes, bài học |
| Chăm sóc | `support` | rẻ hơn | Sự cố của khách | Lỗi kỹ thuật → architect. Không biết dùng → user-faq + creator |
| Thị trường | `creator` | mạnh về chữ | Ý tưởng media đã được kết luận làm, hoặc đơn tài sản của sản phẩm đã chốt | Kịch bản, prompt, hướng dẫn. Chưa file video |
| Thị trường | `creator-research` | rẻ hơn một bậc | Câu hỏi cần nguồn | Fact, tách khỏi suy đoán |
| Thị trường | `creator-story` | mạnh về chữ | Brief | Kịch bản |
| Thị trường | `creator-visual` | mạnh về hình | `BRAND.md` | Một ảnh và một video ngắn |
| Thị trường | `creator-publish` | rẻ hơn một bậc | Kịch bản đã có | `produce.md` hoặc gói đăng. Chưa render |
| Vận hành | `browser` | rẻ | Việc cần mở web | File hoặc tóm tắt trong hàng đợi |
| Vận hành | `office` | rẻ | Word, Excel, PDF | File trong hàng đợi |
| Vận hành | `application` | rẻ | Workflow app desktop | File trong hàng đợi |

Chưa có phòng nhân sự, kế toán, hay sales. Bạn tự bán. Doanh thu sẽ do hệ thống quản lí riêng, không nằm trong các agent này.

## Thư mục dự án

Mỗi dự án một thư mục: `01_Projects/<domain>/<ten-du-an>/`.

- Domain chỉ có `giai-phap-so` hoặc `media`.
- Tên dự án là slug ổn định. Không gắn ngày. Không dùng `Active`.
- Trong đó: `idea-fit.md`, `market-choice.md`, kịch bản, `launch-sprint.md`, `support-issue.md`, `where.md`. Có code thì thêm `repo.txt` một dòng đường dẫn repo.
- Source, design, và biên bản test nằm trong repo, không copy vào đây.
- Task công ty và repo cá nhân không tạo dự án mới ở đây, trừ khi task đã ghi domain và tên.

## Dọn file

Khi việc xong, xóa nháp, bản trùng, và ghi chú không nằm trong đầu ra đã hẹn. Không để `draft`, `notes`, `tmp`. Designer chỉ để lại `DESIGN.md`, `interface.md`, và `BRAND.md` nếu sản phẩm bán. Không copy cả spec vào thư mục shared.

## Memory

Mỗi role một workspace, nên memory không dùng chung.

- `MEMORY.md`: vài sự kiện còn hiệu lực. OpenClaw đưa file này vào phiên chính của đúng role.
- `memory/YYYY-MM-DD.md`: nhật ký ngày, cũng chỉ trong workspace đó.
- Phiên được giao việc không nhận memory. Sự kiện cần cho việc đó phải nằm trong task.
- Không ghi secret. Không đọc memory của role khác.

## Token

Mỗi agent chỉ đọc một skill cho bước hiện tại. Không đặt hạn ký tự.

- Input là đúng file skill của bước đó nêu tên. File dài thì đọc đúng mục skill nêu, không đọc phần còn lại. Thiếu một fact thì mở đúng file chứa fact đó.
- Không quét repo, không quét `shared`, không đọc catalog, không đọc lại file task đã ghi là xong.
- Kết quả lệnh chỉ đọc file tóm tắt mà skill nêu. Không đọc log, trace, hay báo cáo HTML.
- Task giao đi có mục tiêu, đường dẫn đầu vào, đường dẫn đầu ra, số vòng, và chữ `chạy full` nếu người dùng đã viết. Không dán nội dung file. Không dán lịch sử chat.
- File đầu ra giữ đủ mọi mục skill yêu cầu. Thiếu fact thì ghi thiếu trong mục đó.
- Chat đúng năm dòng: kết quả, đường dẫn, đã kiểm tra gì, đang chờ, một bước tiếp. Không dán log, diff, hay nguyên file.
- Agent con trả về năm dòng đó. Agent cha không đọc lại nguyên file trừ khi skill bước sau nêu tên file đó.

## Xong một bước

Mặc định dừng sau đầu ra của mình. Gợi ý một bước tiếp đúng yêu cầu. Không spawn bước đó.

Người dùng viết `chạy full` trong yêu cầu thì được spawn đúng một bước tiếp trong pipeline đã biết, và chép nguyên chữ `chạy full` vào task con. Không tự thêm chữ này. Agent ở giữa không ghi tin Telegram. Agent dừng lại ghi một tin.

Dù có `chạy full` vẫn dừng để duyệt: gửi, đăng, trả tiền, render trả phí, deploy, publish, merge, và lệnh mức cao.

Tin xong là `05_Approvals/Pending/DONE-<agent>-<viec>.md`, năm dòng: agent, kết quả một câu, đường dẫn đầu ra, bước tiếp, đang chờ hoặc đã chạy tiếp. File này là tin Telegram. Không gọi API bot. Không ghi secret.

## Quyết và dừng

Hệ thống tự chọn. Không hỏi người dùng cho chi tiết hình, kỹ thuật, hoặc chữ.

- Hình, gu, trạng thái màn hình: `designer` chốt một phương án.
- Không làm được vì kỹ thuật: `architect` cắt bớt hành vi, rồi `designer` sửa file design cho khớp.
- Đổi giá hoặc đổi người trả tiền: chỉ `ceo`, và chỉ khi `idea-fit.md` chưa kết luận làm.
- Một vấn đề tối đa hai vòng. Vòng 2 vẫn không xong thì dừng.
- File dừng: `05_Approvals/Pending/BLOCKED-<domain>-<ten-du-an>.md`. Năm dòng: vấn đề, vòng 1, vòng 2, quyết định cần người, đường dẫn file. File này là hàng gửi Telegram. Không spawn lần ba.

## Xóa và việc khó hoàn tác

Khi xóa file hoặc dữ liệu local trong phạm vi yêu cầu, báo cáo cùng lúc: đã xóa gì, vì sao, ảnh hưởng gì.

Gửi, đăng, trả tiền, deploy production, merge, publish vẫn dừng để duyệt đúng việc đó. Không lấy duyệt của việc này cho việc khác.

Không lưu mật khẩu, API key, token, cookie, OTP, hoặc private key vào file workspace.

## Lệnh trên máy chính

Trước mỗi lệnh, đánh giá rủi ro. Mức thấp là đọc, lint, test, build local, và script đã có trong repo. Mức cao là sudo, xóa ngoài repo, lệnh vừa lấy từ internet, tải script rồi chạy, đụng production, secret, gửi mail hoặc tiền, mở port, tắt bảo vệ máy.

Mức cao bị cấm và bị chặn: không thực thi. Ghi `05_Approvals/Pending/RISK-<viec>.md` năm dòng: lệnh, mức cao, vì sao, chạy gì nếu duyệt, bỏ qua nếu không. File này là tin Telegram. Có duyệt đúng lệnh thì chạy một lần. Không duyệt thì bỏ qua.
