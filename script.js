let chatClient = null;

function initChat() {
    // Kiểm tra token trước khi khởi tạo
    if (!CONFIG.TOKEN || CONFIG.TOKEN === 'YOUR_TOKEN_HERE') {
        alert('⚠️ Chưa cấu hình token!\n\nVui lòng vào trang Setup để nhập Coze Token.');
        window.location.href = 'setup.html';
        return;
    }

    if (!chatClient) {
        chatClient = new CozeWebSDK.WebChatClient({
            config: {
                bot_id: CONFIG.BOT_ID,
            },
            componentProps: {
                title: 'Trợ Lý Gia Sư HSK',
            },
            auth: {
                type: 'token',
                token: CONFIG.TOKEN,
                onRefreshToken: function () {
                    return CONFIG.TOKEN;
                }
            }
        });
    }
}

// Tự động khởi tạo chat khi trang load (tùy chọn)
// window.addEventListener('load', initChat);
