let chatClient = null;

function initChat() {
    // Add loading animation
    const button = document.querySelector('.chat-button');
    const originalText = button.textContent;
    button.textContent = '⏳ Đang khởi động...';
    button.style.pointerEvents = 'none';
    
    if (!chatClient) {
        setTimeout(() => {
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
            
            // Reset button after chat opens
            setTimeout(() => {
                button.textContent = originalText;
                button.style.pointerEvents = 'auto';
            }, 1000);
        }, 300);
    } else {
        button.textContent = originalText;
        button.style.pointerEvents = 'auto';
    }
}

// Add sparkle effect on page load
function createSparkles() {
    const container = document.querySelector('.container');
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(sparkle);
    }
}

// Initialize sparkles when page loads
window.addEventListener('load', () => {
    createSparkles();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});
