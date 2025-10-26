// config.js - Cấu hình cho ứng dụng
// ⚠️ QUAN TRỌNG: Đừng commit token thật lên GitHub!
// Khi deploy lên GitHub Pages, token sẽ được load từ GitHub Secrets hoặc nhập thủ công
const CONFIG = {
    BOT_ID: '7565532352127647751',
    // Để trống token khi commit - sẽ hướng dẫn cách thêm token an toàn
    TOKEN: localStorage.getItem('COZE_TOKEN') || 'YOUR_TOKEN_HERE',
};

// Xuất config để sử dụng trong các file khác
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
