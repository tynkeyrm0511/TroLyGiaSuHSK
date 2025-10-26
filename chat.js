// Chat functionality using Coze API
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const charCount = document.getElementById('charCount');
const statusElement = document.getElementById('status');

// Generate unique user ID
const userId = localStorage.getItem('userId') || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
localStorage.setItem('userId', userId);

let conversationId = null;
let isProcessing = false;

// Auto-resize textarea
messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
    charCount.textContent = `${this.value.length}/2000`;
});

// Handle form submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = messageInput.value.trim();
    if (!message || isProcessing) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    messageInput.value = '';
    messageInput.style.height = 'auto';
    charCount.textContent = '0/2000';
    
    // Send to API
    await sendMessage(message);
});

// Add message to chat UI
function addMessage(content, role) {
    const messageGroup = document.createElement('div');
    messageGroup.className = `message-group ${role}`;
    
    const avatar = document.createElement('div');
    avatar.className = `${role}-avatar`;
    avatar.textContent = role === 'user' ? '👤' : '🤖';
    
    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${role}-message`;
    
    // Format content (preserve line breaks, links, etc)
    bubble.innerHTML = formatMessage(content);
    
    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = new Date().toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    bubble.appendChild(time);
    messageGroup.appendChild(avatar);
    messageGroup.appendChild(bubble);
    chatMessages.appendChild(messageGroup);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Format message content
function formatMessage(text) {
    // Convert line breaks to <br>
    text = text.replace(/\n/g, '<br>');
    
    // Convert URLs to links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    text = text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
    
    return text;
}

// Show typing indicator
function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.id = 'typingIndicator';
    typing.className = 'typing-indicator';
    typing.innerHTML = `
        <div class="bot-avatar">🤖</div>
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

// Send message to API
async function sendMessage(message) {
    isProcessing = true;
    sendButton.disabled = true;
    statusElement.textContent = 'Đang xử lý...';
    showTypingIndicator();
    
    try {
        // Determine API endpoint
        const isNetlify = window.location.hostname.includes('netlify.app');
        const apiEndpoint = isNetlify ? '/.netlify/functions/chat' : '/.netlify/functions/chat';
        
        console.log('Calling API:', apiEndpoint);
        
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                user_id: userId,
                conversation_id: conversationId
            })
        });
        
        console.log('Response status:', response.status);
        
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Non-JSON response:', text);
            throw new Error('Server trả về dữ liệu không hợp lệ. Vui lòng thử lại sau.');
        }
        
        const data = await response.json();
        console.log('Response data:', data);
        
        removeTypingIndicator();
        
        if (!response.ok) {
            throw new Error(data.error || `Lỗi ${response.status}: ${data.message || 'Không thể kết nối với AI'}`);
        }
        
        // Update conversation ID
        if (data.conversation_id) {
            conversationId = data.conversation_id;
        }
        
        // Extract bot response
        let botReply = 'Xin lỗi, tôi không thể trả lời lúc này.';
        
        if (data.messages && data.messages.length > 0) {
            // Find the last assistant message
            const assistantMessages = data.messages.filter(m => m.role === 'assistant');
            if (assistantMessages.length > 0) {
                botReply = assistantMessages[assistantMessages.length - 1].content;
            }
        } else if (data.content) {
            botReply = data.content;
        } else if (data.reply) {
            botReply = data.reply;
        }
        
        addMessage(botReply, 'bot');
        statusElement.textContent = 'Sẵn sàng hỗ trợ';
        
    } catch (error) {
        removeTypingIndicator();
        console.error('Error details:', error);
        
        let errorMessage = error.message;
        
        // User-friendly error messages
        if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Không thể kết nối với server. Vui lòng kiểm tra kết nối internet.';
        } else if (error.message.includes('NetworkError')) {
            errorMessage = 'Lỗi mạng. Vui lòng thử lại.';
        } else if (error.message.includes('JSON')) {
            errorMessage = 'Lỗi xử lý dữ liệu từ server. Backend chưa được cấu hình đúng.';
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <strong>❌ Lỗi:</strong> ${errorMessage}<br>
            <small>Tip: Đảm bảo đã deploy lên Netlify và cấu hình Environment Variables</small>
        `;
        chatMessages.appendChild(errorDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        statusElement.textContent = 'Có lỗi xảy ra';
        
        setTimeout(() => {
            statusElement.textContent = 'Sẵn sàng hỗ trợ';
        }, 3000);
    } finally {
        isProcessing = false;
        sendButton.disabled = false;
        messageInput.focus();
    }
}

// Handle Enter key (Shift+Enter for new line)
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
});

// Focus input on load
messageInput.focus();
