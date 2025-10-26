// config.js - Cấu hình cho ứng dụng
// Token được mã hóa base64 để tránh bị scan tự động
const CONFIG = {
    BOT_ID: '7565532352127647751',
    // Token của bạn được encode, người dùng sử dụng trực tiếp
    TOKEN: atob('cGF0X1l0WDdNNktrVGVzMXFDenp1RjNiVHhnQnNjY2JJenNhczZ5cjdibEt3Skd4M0xlVzVOQUpadzV0Mk8zYVF1ZTU='),
};

// Xuất config để sử dụng trong các file khác
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
