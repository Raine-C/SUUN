# SUUN 曙溫 — 網站開發指南

## 技術架構
- **前端**: Next.js 15 (App Router) + TypeScript
- **樣式**: Tailwind CSS（設計系統完整還原）
- **CMS**: Contentful
- **部署**: Vercel

---

## 快速開始

### 1. 安裝依賴
```bash
npm install
```

### 2. 設定環境變數
複製範本並填入你的 Contentful API 金鑰：
```bash
cp .env.local.example .env.local
```

然後編輯 `.env.local`：
```
CONTENTFUL_SPACE_ID=你的_space_id
CONTENTFUL_ACCESS_TOKEN=你的_delivery_api_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=你的_preview_token
```

### 3. 本地開發
```bash
npm run dev
```

瀏覽 http://localhost:3000

---

## Contentful 設定步驟

### 取得 API 金鑰
1. 登入 Contentful → 選擇 `suun` Space
2. **Settings → API keys → Add API key**
3. 複製：
   - Space ID
   - Content Delivery API - access token

### 建立 Content Types

在 Contentful 後台：**Content model → Add content type**

---

### Content Type 1: `work`（作品）

| 欄位名稱 | Field ID | 類型 | 備註 |
|---------|---------|------|------|
| 作品名稱 | `title` | Short text | Required |
| 英文說明 | `subtitle` | Short text | e.g. Two-button Lounge Suit |
| URL Slug | `slug` | Short text | Unique, URL-friendly |
| 季節 | `season` | Short text | e.g. AW 2026 |
| 分類 | `category` | Short text | 西裝外套 / 大衣外套 / 禮服系列 / 休閒西裝 |
| 布料 | `fabric` | Short text | e.g. Loro Piana Super 150s |
| 產地 | `fabricOrigin` | Short text | e.g. 義大利 Biella |
| 版型 | `cut` | Short text | e.g. Slim English |
| 描述 | `description` | Rich text | 作品詳細說明 |
| 主圖 | `heroImage` | Media | 作品封面照 |
| 作品照片 | `images` | Media (many) | 多張照片 |
| 標籤 | `badge` | Short text | 新作 / AW 2026（可選）|
| 首頁展示 | `isFeatured` | Boolean | 是否顯示在首頁 |

---

### Content Type 2: `article`（職人誌文章）

| 欄位名稱 | Field ID | 類型 | 備註 |
|---------|---------|------|------|
| 文章標題 | `title` | Short text | Required |
| URL Slug | `slug` | Short text | Unique |
| 作者 | `author` | Short text | e.g. Evan Huang |
| 作者職稱 | `authorTitle` | Short text | e.g. 曙溫 SUUN 主理人 |
| 發佈日期 | `publishedDate` | Date & time | |
| 閱讀時間 | `readingTime` | Integer | 分鐘數 |
| 分類 | `category` | Short text | 布料選擇 / 版型與剪裁 / 工藝細節 / 西裝保養 / 作品故事 |
| 標籤 | `tags` | Short text (many) | 多個標籤 |
| 摘要 | `excerpt` | Short text | 文章摘要（列表頁使用）|
| 封面圖 | `heroImage` | Media | |
| 正文 | `body` | Rich text | 文章全文 |

---

## 新增第一筆內容

### 新增作品（The Savile）
1. Contentful → **Content → Add entry → work**
2. 填寫：
   - title: `The Savile`
   - subtitle: `Two-button Lounge Suit`
   - slug: `the-savile`
   - season: `AW 2026`
   - category: `西裝外套`
   - fabric: `Loro Piana Super 150s`
   - fabricOrigin: `義大利 Biella`
   - cut: `Slim English`
   - isFeatured: `true`
3. 上傳作品圖片到 heroImage
4. **Publish**

---

## 部署到 Vercel

### 設定環境變數
在 Vercel 專案設定中：
**Settings → Environment Variables**，新增：
```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_token
```

### 自動部署
每次推送到 GitHub main branch，Vercel 會自動部署。

---

## 頁面路由

| 路徑 | 說明 |
|------|------|
| `/` | 首頁 |
| `/works` | 訂製展示列表 |
| `/works/[slug]` | 作品詳情頁 |
| `/journal` | 職人誌列表 |
| `/journal/[slug]` | 文章詳情頁 |

---

## 設計系統色碼

```css
/* SUUN Color System */
--suun-dark-blue-darkest: #01003A
--suun-dark-blue-darker: #01002D
--suun-dark-blue-normal: #030081
--suun-purple-light: #FBF9FF
--suun-purple-normal: #D4C6FC
--suun-purple-normal-hover: #BFB2E3
--suun-baby-blue-normal: #AFD9F2
--suun-baby-blue-darker: #3D4C55
```

## 字型

- **Cormorant Garamond** — 大標題、品牌名稱（英文）
- **Shippori Mincho** — 中文標題、品牌文案
- **Inter** — 導覽列、正文、標籤

---

如有問題，隨時把更新的 Figma 連結貼給 Claude 即可繼續調整！
