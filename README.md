# Trợ Lý Gia Sư HSK

Trang web tích hợp chatbot AI hỗ trợ học tiếng Trung và ôn thi HSK.

## 🚀 Demo

Xem demo tại: `https://<username>.github.io/TroLyGiaSuHSK/`

## ⚙️ Cài Đặt

### 1. Lấy Coze Token

1. Truy cập [Coze API Settings](https://www.coze.com/open/oauth/pats)
2. Tạo Personal Access Token mới
3. Copy token (bắt đầu bằng `pat_...`)

### 2. Cấu Hình Token

Khi mở website lần đầu:
1. Bạn sẽ được chuyển đến trang `setup.html`
2. Nhập Coze Token của bạn
3. Token sẽ được lưu trong localStorage của trình duyệt

## 📁 Cấu Trúc

```
TroLyGiaSuHSK/
├── index.html      # Trang chính
├── setup.html      # Trang cài đặt token
├── styles.css      # CSS styling
├── config.js       # Cấu hình
├── script.js       # Logic chatbot
└── .gitignore      # Bảo vệ file nhạy cảm
```

## 🔒 Bảo Mật

- Token được lưu trong **localStorage** của trình duyệt
- **KHÔNG** commit file `.env` lên GitHub
- Token chỉ tồn tại trên máy người dùng

## 🛠️ Công Nghệ

- HTML5, CSS3, JavaScript
- [Coze Web SDK](https://www.coze.com/)
- GitHub Pages

## 📝 License

MIT License
