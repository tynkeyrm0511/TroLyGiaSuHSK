# 🎓 Trợ Lý Gia Sư HSK

Chatbot AI thông minh hỗ trợ học tiếng Trung và luyện thi HSK, được xây dựng với Coze API và Netlify Functions.

## 🚀 Demo Live

**🌐 Website:** https://merry-alfajores-924937.netlify.app

## ✨ Tính Năng

- 💬 **Chat AI thông minh** - Trợ lý ảo hỗ trợ học tiếng Trung 24/7
- 📚 **Luyện từ vựng HSK** - Học từ vựng theo cấp độ HSK1-6
- ✍️ **Luyện viết** - Hướng dẫn viết chữ Hán và cấu trúc câu
- 🗣️ **Luyện hội thoại** - Rèn luyện kỹ năng giao tiếp
- 📖 **Ôn thi HSK** - Bài tập và tips chinh phục kỳ thi
- 📱 **Responsive Design** - Tối ưu cho cả desktop và mobile

## �️ Công Nghệ

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Netlify Serverless Functions (Node.js)
- **API:** Coze API v3
- **Deployment:** Netlify
- **Version Control:** Git/GitHub

## 📁 Cấu Trúc Project

```
TroLyGiaSuHSK/
├── index.html              # Landing page
├── chat.html               # Chat interface
├── styles.css              # Landing page styles
├── chat-styles.css         # Chat UI styles
├── script.js               # Landing page logic
├── chat.js                 # Chat logic & API calls
├── netlify/
│   └── functions/
│       └── chat.js         # Serverless function (API proxy)
├── netlify.toml            # Netlify configuration
├── package.json            # Dependencies
├── .env                    # Environment variables (local)
├── .gitignore              # Git ignore rules
└── README.md               # Documentation
```

## 🚀 Development

### Prerequisites

- Node.js 18+
- npm hoặc yarn
- Coze API Token

### 1. Clone Repository

```bash
git clone https://github.com/tynkeyrm0511/TroLyGiaSuHSK.git
cd TroLyGiaSuHSK
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Tạo file `.env` trong thư mục root:

```env
COZE_TOKEN=pat_your_token_here
BOT_ID=your_bot_id_here
```

**Lấy Coze Token:**
1. Truy cập [Coze API Settings](https://www.coze.com/open/oauth/pats)
2. Tạo Personal Access Token
3. Copy token (bắt đầu bằng `pat_...`)

**Lấy Bot ID:**
1. Vào [Coze Bot Dashboard](https://www.coze.com/space/)
2. Mở bot của bạn
3. Copy Bot ID từ URL hoặc Settings

### 4. Run Local Development

```bash
npm run dev
```

Website sẽ chạy tại: `http://localhost:8888`

## 📦 Deployment

### Deploy lên Netlify

#### Option 1: Deploy qua CLI

```bash
# Login Netlify
npx netlify-cli login

# Deploy production
npx netlify-cli deploy --prod

# Set environment variables
npx netlify-cli env:set COZE_TOKEN "pat_your_token"
npx netlify-cli env:set BOT_ID "your_bot_id"
```

#### Option 2: Deploy qua GitHub

1. Vào [Netlify Dashboard](https://app.netlify.com)
2. Click **"Import from Git"**
3. Chọn repository `TroLyGiaSuHSK`
4. Configure settings:
   - **Build command:** (để trống)
   - **Publish directory:** `.`
   - **Functions directory:** `netlify/functions`
5. Vào **Site settings → Environment variables**
6. Thêm:
   - `COZE_TOKEN` = `pat_your_token`
   - `BOT_ID` = `your_bot_id`
7. Deploy!

## 🔒 Bảo Mật

- ✅ Token được lưu trong **Environment Variables** (không commit lên Git)
- ✅ API calls được proxy qua **Netlify Functions** (ẩn token khỏi client)
- ✅ `.env` file được ignore bởi `.gitignore`
- ✅ CORS headers được configure đúng cách

## 🐛 Troubleshooting

### Bot không trả lời

1. Kiểm tra Console (F12) xem có lỗi gì không
2. Verify environment variables đã set đúng chưa:
   ```bash
   npx netlify-cli env:list
   ```
3. Kiểm tra Netlify Function logs:
   ```
   https://app.netlify.com/projects/your-site/logs/functions
   ```

### Local dev không chạy

1. Đảm bảo đã cài đặt dependencies:
   ```bash
   npm install
   ```
2. Kiểm tra file `.env` có đúng format không
3. Dùng Node.js version 18+:
   ```bash
   node --version
   ```

## � API Documentation

### Coze Chat API v3

**Endpoint:** `https://api.coze.com/v3/chat`

**Request:**
```json
{
  "bot_id": "your_bot_id",
  "user_id": "unique_user_id",
  "stream": false,
  "additional_messages": [{
    "role": "user",
    "content": "message",
    "content_type": "text"
  }]
}
```

**Response:** Polling required cho `status: "in_progress"`

Xem thêm: [Coze API Docs](https://www.coze.com/docs/developer_guides/coze_api_overview)

## 📝 License

MIT License - Free to use and modify!

## 👨‍� Author

**Hoang Nguyen**
- GitHub: [@tynkeyrm0511](https://github.com/tynkeyrm0511)
- Website: https://merry-alfajores-924937.netlify.app

## 🙏 Credits

- [Coze AI Platform](https://www.coze.com/) - AI Chatbot Framework
- [Netlify](https://www.netlify.com/) - Deployment & Serverless Functions
