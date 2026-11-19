# 🌿 NinhBinhTravel — Khám Phá Di Sản & Non Nước Hữu Tình Ninh Bình

[![Vite](https://img.shields.io/badge/Vite-8.1.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-1.168-FF4154?logo=tanstack&logoColor=white)](https://tanstack.com/start)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Sản phẩm tham gia Cuộc thi Xây dựng Mini App bằng Trí tuệ Nhân tạo (AI Mini App Contest).**  
> *Một chuyến đi, ba lớp thời gian: thiên nhiên triệu năm, cố đô nghìn năm và bữa ăn đậm vị hôm nay.*

---

## 🧭 Giới Thiệu Dự Án

**NinhBinhTravel** là ứng dụng Mini App du lịch và ẩm thực cao cấp, định hướng trải nghiệm số hoá cho du khách khám phá vùng đất Cố đô Hoa Lư và Di sản Văn hóa & Thiên nhiên Thế giới Quần thể Danh thắng Tràng An.

Ứng dụng được thiết kế theo trường phái **Luxury Editorial Travel** kết hợp công nghệ **Fullstack React SSR & Server Functions** hiện đại, mang lại tốc độ tải trang cực nhanh, hình ảnh sắc nét, tương tác bản đồ mượt mà và giao diện chuẩn mực quốc tế.

---

## 🎨 Hệ Thống Thiết Kế (Design System)

### 1. Bảng Màu Bản Sắc (Nature-inspired Palette)
- **Deep Forest Green** (`#244B3B`): Sắc xanh thẫm của núi đá vôi ngàn năm và rừng nguyên sinh Cúc Phương.
- **Nature Green** (`#769477`): Sắc xanh dịu mát của đồng bằng và sông nước Tràng An.
- **Warm Cream** (`#F5F1E8`): Sắc kem ấm áp của giấy dó truyền thống và phong cách tạp chí cổ điển.
- **Champagne Gold** (`#D6AD72`): Sắc vàng hoàng gia gợi nhớ kinh đô Hoa Lư và dải lúa chín Tam Cốc.
- **Pure White** (`#FFFFFF`): Độ tương phản thanh lịch, tối giản và tinh tế.

### 2. Typography
- **Tiêu đề lớn & Điểm nhấn**: *Playfair Display* (Serif cổ điển, phân tầng sang trọng).
- **Nội dung & Tương tác**: *Plus Jakarta Sans* (Sans-serif hiện đại, rõ nét, tối ưu đọc tiếng Việt trên mọi thiết bị di động).

---

## 🌟 Các Phân Hệ & Tính Năng Nổi Bật

### 1. 🏞️ Hero Section Điện Ảnh (Cinematic Hero)
- Nền ảnh toàn cảnh Tràng An ngoạn mục, hiệu ứng Ken Burns chuyển động nhẹ nhàng.
- Bảng đếm số ấn tượng (Stats Counter): **2014** (UNESCO), **31 đầm · 48 hang**, **968 – 1010** (Cố đô Hoa Lư), **486 bậc** (Đỉnh Ngọa Long Hang Múa).
- Thanh công cụ tìm kiếm thông minh và bộ lọc trải nghiệm nhanh.

### 2. 🗺️ Bản Đồ Địa Lý Tương Tác 20 Danh Thắng (Interactive Map)
- **Động cơ bản đồ kép linh hoạt**:
  - Tích hợp chuẩn **Google Maps JavaScript API** với bộ màu tùy biến đồng bộ (`#244B3B` & `#D6AD72`).
  - Hỗ trợ chế độ dự phòng thông minh **OpenStreetMap (OSM)** sạch sẽ, không gián đoạn, loại bỏ hoàn toàn các lỗi tile/watermark của nhà cung cấp cũ.
- **20 Điểm du lịch xác thực** với tọa độ GPS chính xác (Tràng An, Tam Cốc, Hang Múa, Bái Đính, Hoa Lư, Thung Nham, Vân Long, Cúc Phương, Đan viện Châu Sơn, Động Am Tiên Tuyệt Tình Cốc, Chùa Duyên Ninh...).
- **Đồng bộ hai chiều**: Nhấn chọn địa điểm bên danh sách sẽ tự động di chuyển bản đồ (`panTo`), mở InfoWindow và ngược lại.
- **Bộ lọc danh mục**: *Tất cả*, *Thiên nhiên*, *Check-in*, *Văn hóa*, *Tâm linh*, *Sinh thái*.

### 3. 🍱 Tạp Chí Ẩm Thực & Thực Đơn Bản Địa (Gastronomy Magazine)
- 10 món đặc sản trứ danh (Dê núi nướng tảng, Cơm cháy chà bông nước sốt dê, Gỏi cá nhệch Kim Sơn, Cá chuối nướng Gang, Xôi trứng kiến Nho Quan, Ốc núi Tam Điệp...).
- Gợi ý thực đơn trọn vẹn theo ngày: Bữa sáng nhẹ nhàng, Bữa trưa di sản, Trà chiều ngắm núi, Bữa tối yến tiệc cố đô.

### 4. 📅 Bốn Mùa Ninh Bình & Lộ Trình Đề Xuất (Itineraries)
- Cẩm nang khám phá theo mùa: Mùa bướm Cúc Phương, Mùa lúa chín Tam Cốc vàng rực, Mùa sen Bích Động, Mùa cúc họa mi và hoa lau cổ kính.
- Lộ trình thiết kế sẵn: **1 Ngày Tinh Hoa**, **2N1Đ Di Sản & Lối Cũ**, **3N2Đ Trọn Vẹn Non Nước**.

### 5. 🌿 Khám Phá Ninh Bình Cùng Chúng Tôi (Discover Section)
- Không gian giới thiệu vẻ đẹp di sản và quảng bá du lịch địa phương Ninh Bình.
- Ba lớp thời gian: Thiên nhiên triệu năm (karst nhiệt đới ngập nước), Cố đô nghìn năm (Hoa Lư 968 – 1010), nét đẹp bản địa và ẩm thực non nước.
- Trình diễn hình ảnh điện ảnh về 3 danh thắng đỉnh cao: Quần thể Tràng An, Tam Cốc – Bích Động và Đỉnh Ngọa Long Hang Múa với các tab chuyển cảnh mượt mà.
- Nút CTA chuyển tiếp thông minh đến danh mục 20 điểm tham quan và lịch trình gợi ý.

### 6. ⚖️ Pháp Lý Bản Quyền & Hình Ảnh Minh Bạch (Media Integrity)
- 100% hình ảnh trong dự án là ảnh thật, đúng địa danh Ninh Bình, được tối ưu định dạng hiện đại **WebP** (dung lượng ≤ 300 KB).
- Cửa sổ **Image Credits Modal** tra cứu công khai: tác giả, giấy phép (CC BY 4.0, CC BY-SA 4.0, CC0 / Public Domain, Unsplash) và link nguồn gốc.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

| Phân hệ | Công nghệ / Thư viện |
|---|---|
| **Core Framework** | React 19, TanStack Start (v1.168), Nitro Engine |
| **Bundler & Build Tool** | Vite 8, Rolldown Runtime |
| **Routing & State** | TanStack Router (File-based Routing), TanStack Query |
| **Styling & UI** | Tailwind CSS v4, Lucide React, Radix UI Primitives, Sonner Toast |
| **Mapping Engine** | Google Maps JavaScript API, Leaflet / OpenStreetMap Fallback |
| **Server Functions** | TanStack `createServerFn` (RPC Bridge), Resend Email Integration |
| **Testing** | Vitest 4, Testing Library |

---

## 🚀 Hướng Dẫn Cài Đặt & Phát Triển Cục Bộ

### 1. Yêu cầu môi trường
- [Node.js](https://nodejs.org/) (phiên bản 18+ trở lên) hoặc [Bun](https://bun.sh/) (khuyến nghị, tốc độ vượt trội).
- Git.

### 2. Clone repository & Cài đặt dependencies
```bash
# Clone source code
git clone https://github.com/congvanvu/ninhbinhtravel.git
cd ninhbinhtravel

# Cài đặt dependencies bằng Bun
bun install

# Hoặc bằng npm
npm install
```

### 3. Cấu hình biến môi trường
Tạo file `.env` từ file mẫu `.env.example`:
```bash
cp .env.example .env
```

Nội dung cấu hình trong `.env`:
```env
# 1. Chatbot RAG "Hướng dẫn viên Ninh Bình" (Server-side ONLY - Không tiền tố VITE_)
SHOPAIKEY_API_KEY=your_shopaikey_key_here
SHOPAIKEY_BASE_URL=https://api.shopaikey.com
CHAT_MODEL=gpt-4o-mini
EMBED_MODEL=text-embedding-3-small
RAG_MIN_SCORE=0.25
DAILY_REQUEST_CAP=300

# 2. Khóa Google Maps API (hiển thị bản đồ vệ tinh & 3D, Client-side)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# 3. Preset triển khai Nitro (tùy chọn: vercel, node-server, cloudflare-module)
NITRO_PRESET=vercel
```

*(Lưu ý: Nếu chưa có Google Maps API key, ứng dụng vẫn hoạt động trơn tru với chế độ bản đồ dự phòng OpenStreetMap. Nếu chưa có model embedding, hệ thống RAG tự động chuyển sang chế độ tìm kiếm theo từ khóa dự phòng).*

### 4. Tạo chỉ mục tri thức RAG (Build RAG Index)
Mỗi khi cập nhật hoặc chỉnh sửa các tài liệu trong thư mục `knowledge/`, bạn có thể tạo lại chỉ mục vector bằng lệnh:
```bash
npm run build:rag
# hoặc
node --env-file=.env scripts/build-index.mjs
```
Chỉ mục kết quả sẽ được ghi vào `src/server/rag/index.json`.

### 5. Khởi chạy máy chủ phát triển (Dev Server)
```bash
# Khởi chạy máy chủ dev tại cổng 3000
bun run dev -- --port 3000

# Hoặc bằng npm
npm run dev
```
Mở trình duyệt tại: `http://localhost:3000`

### 5. Chạy kiểm thử tự động (Unit Tests)
```bash
bun run test
# hoặc
npm run test
```

### 6. Build đóng gói sản phẩm (Production Build)
```bash
bun run build
# hoặc
npm run build
```

---

## 🌐 Hướng Dẫn Triển Khai Lên Vercel (Deployment)

Dự án đã được cấu hình tối ưu sẵn sàng cho nền tảng **Vercel**:

1. Đăng nhập [Vercel Dashboard](https://vercel.com/) và chọn **Add New... -> Project**.
2. Chọn repository **`ninhbinhtravel`** từ tài khoản GitHub.
3. Thiết lập thông số dự án:
   - **Framework Preset**: Chọn `Other` hoặc `Vite`.
   - **Build Command**: `bun run build` (hoặc `vite build`).
   - **Install Command**: `bun install` (hoặc `npm install`).
   - **Output Directory**: `.vercel/output` (Nitro sẽ tự động xuất định dạng Vercel Serverless Function).
4. Thêm các biến môi trường trong phần **Environment Variables**:
   - `SHOPAIKEY_API_KEY`: Khóa API ShopAIKey (server-side, bảo vệ số dư).
   - `SHOPAIKEY_BASE_URL`: `https://api.shopaikey.com`
   - `CHAT_MODEL`: Model trò chuyện (vd: `gpt-4o-mini`).
   - `EMBED_MODEL`: Model embedding (vd: `text-embedding-3-small`).
   - `DAILY_REQUEST_CAP`: `300` (hoặc số lượng tùy chỉnh).
   - `VITE_GOOGLE_MAPS_API_KEY`: Khóa API Google Maps của bạn.
   - `NITRO_PRESET`: `vercel`
5. Nhấn **Deploy** và trải nghiệm sản phẩm trực tiếp!

---

## 🐳 Triển Khai Chạy Ổn Định Bằng Docker / VPS / Node Server

Dự án có sẵn `Dockerfile` đa tầng (multi-stage) tối ưu:
```bash
# Xây dựng Docker image
docker build -t ninhbinh-travel .

# Chạy container liên tục (tự khởi động lại khi crash)
docker run -d \
  --name ninhbinh \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env \
  ninhbinh-travel
```

- **Health check URL**: `http://localhost:3000/api/health` trả `{ "ok": true }` giúp UptimeRobot / Docker giám sát tình trạng sống liên tục mà không làm hao phí token AI.
- **Trang Hướng dẫn viên chuyên biệt**: Có thể truy cập trực tiếp tại `/hdv` hoặc qua nút nổi ở mọi trang.

---

## 👥 Đội Ngũ & Liên Hệ

- **Dự án**: NinhBinhTravel Mini App
- **Email liên hệ**: [congvanvu0000@gmail.com](mailto:congvanvu0000@gmail.com)
- **Bản quyền**: © 2026 NinhBinhTravel. Giữ toàn quyền tác quyền cho cuộc thi AI Mini App.
