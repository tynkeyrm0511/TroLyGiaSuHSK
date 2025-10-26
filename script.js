let chatClient = null;

function initChat() {
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
