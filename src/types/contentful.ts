// Contentful Content Types for SUUN 曙溫

export interface ContentfulWork {
  sys: { id: string }
  fields: {
    title: string                    // 作品名稱，e.g. "The Savile"
    subtitle: string                 // 英文說明，e.g. "Two-button Lounge Suit"
    slug: string                     // URL slug，e.g. "the-savile"
    season: string                   // e.g. "AW 2026" | "全年 All Season"
    category: string                 // "西裝外套" | "大衣外套" | "禮服系列" | "休閒西裝"
    fabric: string                   // 布料名稱，e.g. "Loro Piana Super 150s"
    fabricOrigin: string             // 產地，e.g. "義大利 Biella"
    cut: string                      // 版型，e.g. "Slim English"
    description: unknown             // Rich Text 正文
    heroImage: ContentfulAsset       // 主圖
    images: ContentfulAsset[]        // 作品照片陣列
    badge?: string                   // e.g. "新作" | "AW 2026"
    isFeatured?: boolean             // 是否首頁展示
  }
}

export interface ContentfulArticle {
  sys: { id: string }
  fields: {
    title: string                    // 文章標題
    slug: string                     // URL slug
    author: string                   // 作者名稱，e.g. "Evan Huang"
    authorTitle?: string             // 作者職稱
    publishedDate: string            // ISO date string
    readingTime: number              // 閱讀分鐘數
    category: string                 // "布料選擇" | "版型與剪裁" | "工藝細節" | "西裝保養" | "作品故事"
    tags: string[]                   // 標籤陣列
    excerpt: string                  // 文章摘要
    heroImage: ContentfulAsset       // 封面圖
    body: unknown                    // Rich Text 正文
  }
}

export interface ContentfulHomePage {
  sys: { id: string }
  fields: {
    heroHeadline: string             // Hero 大標
    heroSubtext: string              // Hero 副文
    heroCta: string                  // CTA 按鈕文字
    featuredWorks: ContentfulWork[]  // 首頁精選作品（3件）
    brandQuote: string               // 品牌引言
    brandStory: string               // 品牌故事段落
  }
}

export interface ContentfulStudioInfo {
  sys: { id: string }
  fields: {
    address: string                  // 工作室地址
    openingHours: string             // 開放時間
    phone?: string                   // 電話
    email?: string                   // Email
    googleMapUrl?: string            // Google Map 連結
    instagramUrl?: string
    facebookUrl?: string
    threadsUrl?: string
  }
}

export interface ContentfulAsset {
  sys: { id: string }
  fields: {
    title: string
    file: {
      url: string
      details: {
        size: number
        image?: { width: number; height: number }
      }
      fileName: string
      contentType: string
    }
  }
}

// Simplified types for component props
export interface WorkCard {
  id: string
  title: string
  subtitle: string
  slug: string
  season: string
  category: string
  fabric: string
  fabricOrigin: string
  cut: string
  heroImageUrl: string
  badge?: string
}

export interface ArticleCard {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  heroImageUrl: string
  publishedDate: string
  readingTime: number
}
