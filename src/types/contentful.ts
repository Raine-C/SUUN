export interface WorkCard {
  id: string
  title: string
  subtitle: string
  slug: string
  season: string
  category: string
  fabric: string
  fabricOrigin: string
  composition: string
  description: string
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
