# 🚀 Hướng Dẫn Deploy

## 📝 Tóm Tắt

Project này sử dụng **Netlify Functions** để che giấu Coze API token. Có 2 cách để chạy:

1. **Local Development** - Test với Netlify Dev
2. **Production** - Deploy lên Netlify

---

## 💻 Local Development

### Bước 1: Cài Đặt Dependencies

```bash
cd TroLyGiaSuHSK
npm install
```

### Bước 2: Tạo File Environment Variables

Tạo file `.env` trong thư mục root:

```bash
# .env
COZE_TOKEN=pat_YtX7M6KkTes1qCzzuF3bTxgBsccbIzsas6yr7blKwJGx3LeW5NAJZw5t2O3aQue5
BOT_ID=7565532352127647751
```

**⚠️ Lưu ý:** File `.env` đã được thêm vào `.gitignore`, không bị commit lên Git.

### Bước 3: Chạy Netlify Dev Server

```bash
npm run dev
```

Hoặc:

```bash
netlify dev
```

### Bước 4: Truy Cập

Mở trình duyệt: **http://localhost:8888**

---

## 🌐 Production Deployment

### Option 1: Deploy qua Netlify Dashboard (Dễ nhất)

#### 1. Tạo Tài Khoản Netlify

- Truy cập: https://app.netlify.com/signup
- Đăng ký bằng GitHub

#### 2. Import Repository

1. Click **"Add new site"** → **"Import an existing project"**
2. Chọn **GitHub**
3. Authorize Netlify
4. Chọn repository: `tynkeyrm0511/TroLyGiaSuHSK`
5. Build settings:
   - **Build command:** (để trống)
   - **Publish directory:** `.`
   - **Functions directory:** `netlify/functions`
6. Click **"Deploy site"**

#### 3. Cấu Hình Environment Variables

1. Vào **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Thêm 2 biến:

```
COZE_TOKEN = pat_YtX7M6KkTes1qCzzuF3bTxgBsccbIzsas6yr7blKwJGx3LeW5NAJZw5t2O3aQue5
BOT_ID = 7565532352127647751
```

4. Click **"Save"**

#### 4. Redeploy

1. Vào **Deploys**
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

#### 5. Kiểm Tra

- Site URL: `https://[your-site-name].netlify.app`
- Functions: `https://[your-site-name].netlify.app/.netlify/functions/chat`

---

### Option 2: Deploy qua Netlify CLI

#### 1. Cài Đặt Netlify CLI

```bash
npm install -g netlify-cli
```

#### 2. Login

```bash
netlify login
```

#### 3. Link Repository (Lần đầu)

```bash
cd TroLyGiaSuHSK
netlify init
```

Chọn:
- **Create & configure a new site**
- Team: (chọn team của bạn)
- Site name: (nhập tên hoặc để random)
- Build command: (để trống, nhấn Enter)
- Directory to deploy: `.`
- Functions directory: `netlify/functions`

#### 4. Set Environment Variables

```bash
netlify env:set COZE_TOKEN "pat_YtX7M6KkTes1qCzzuF3bTxgBsccbIzsas6yr7blKwJGx3LeW5NAJZw5t2O3aQue5"
netlify env:set BOT_ID "7565532352127647751"
```

#### 5. Deploy

```bash
netlify deploy --prod
```

---

## 🔍 Troubleshooting

### ❌ Lỗi: `405 Method Not Allowed`

**Nguyên nhân:** Đang chạy file HTML trực tiếp (không qua Netlify Dev)

**Giải pháp:**
```bash
npm run dev
# Mở http://localhost:8888
```

### ❌ Lỗi: `Server configuration error`

**Nguyên nhân:** Chưa cấu hình Environment Variables

**Giải pháp:**
1. Netlify Dashboard → Site → Settings → Environment variables
2. Thêm `COZE_TOKEN` và `BOT_ID`
3. Redeploy site

### ❌ Lỗi: `Failed to get response from AI`

**Nguyên nhân:** Token không hợp lệ hoặc hết hạn

**Giải pháp:**
1. Tạo token mới tại: https://www.coze.com/open/oauth/pats
2. Cập nhật Environment Variable `COZE_TOKEN`
3. Redeploy

### ❌ Lỗi: `Failed to fetch`

**Nguyên nhân:** Function chưa được deploy hoặc CORS issue

**Giải pháp:**
1. Kiểm tra Functions đã deploy: `https://[site].netlify.app/.netlify/functions/chat`
2. Xem logs: Netlify Dashboard → Functions → View logs

---

## 📊 Kiểm Tra Deploy

### 1. Test Homepage

```
https://[your-site].netlify.app/
```

Nên thấy trang chủ với nút "Bắt Đầu Chat Ngay"

### 2. Test Function

```bash
curl -X POST https://[your-site].netlify.app/.netlify/functions/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Xin chào"}'
```

Nên nhận được response JSON từ Coze API

### 3. Test Chat UI

1. Click "Bắt Đầu Chat Ngay"
2. Nhập tin nhắn: "Xin chào"
3. Nên nhận được phản hồi từ AI

---

## 📁 File Structure

```
TroLyGiaSuHSK/
├── index.html              # Trang chủ
├── chat.html               # Trang chat
├── styles.css              # CSS trang chủ
├── chat-styles.css         # CSS chat
├── script.js               # JS trang chủ
├── chat.js                 # JS chat (có mock mode)
├── netlify.toml            # Netlify config
├── package.json            # Dependencies
├── .env                    # Local env (không commit)
├── .gitignore              # Ignore .env
└── netlify/
    └── functions/
        └── chat.js         # Serverless function
```

---

## 🔐 Bảo Mật

✅ Token được lưu trong Environment Variables  
✅ Token không bao giờ expose ra frontend  
✅ File `.env` không được commit  
✅ API proxy che giấu token hoàn toàn  

---

## 📚 Tài Liệu Tham Khảo

- Netlify Functions: https://docs.netlify.com/functions/overview/
- Netlify CLI: https://docs.netlify.com/cli/get-started/
- Coze API: https://www.coze.com/open/docs/developer_guides
- Environment Variables: https://docs.netlify.com/environment-variables/overview/

---

**Made with ❤️ by tynkeyrm0511**
