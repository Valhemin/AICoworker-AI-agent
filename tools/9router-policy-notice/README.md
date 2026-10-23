# Báo chặn chính sách cho 9router

Bản vá nằm trong repo này và đã được gắn vào 9router trên máy này. Sau mỗi lần cập nhật 9router, chạy lại `apply.js` rồi khởi động lại 9router.

Khi provider từ chối vì chính sách nội dung, AICoworker thường dừng im. Móc này đổi đúng phản hồi đó thành một câu trong chat: provider đã chặn, hãy đổi hoặc thu hẹp yêu cầu, và cùng câu đó không được chuyển sang model khác. Quota, rate limit, hết tiền, sai key và model không tồn tại vẫn đi qua như cũ. Combo không bị đổi thứ tự fallback.

## Gắn vào 9router

```bash
node tools/9router-policy-notice/apply.js
```

Lệnh này chỉ chèn một khối `require` vào `app/custom-server.js` của bản cài global, giữa hai mốc `aicoworker-policy-notice`. Logic nằm ở file trong repo, nên sửa câu báo thì sửa ở đây. Sau đó khởi động lại 9router.

`npm install -g 9router` ghi đè `custom-server.js` và làm mất dòng móc. File trong repo vẫn còn. Chạy lại `apply.js` sau mỗi lần cập nhật 9router.

```bash
node tools/9router-policy-notice/apply.js --check
node tools/9router-policy-notice/apply.js --revert
node --test tools/9router-policy-notice/policy-notice.test.js
```

Nếu `custom-server.js` không còn dòng `const { pathToFileURL } = require("url");`, lệnh gắn dừng và không sửa file.
