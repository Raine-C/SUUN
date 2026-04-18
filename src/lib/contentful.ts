import { createClient } from 'contentful'
import type { ContentfulWork, ContentfulArticle, WorkCard, ArticleCard } from '@/types/contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

function getImageUrl(asset: { fields: { file: { url: string } } } | undefined): string {
  if (!asset) return ''
  const url = asset.fields.file.url
  return url.startsWith('//') ? `https:${url}` : url
}

// ─── Works ────────────────────────────────────────────────────────────────────

export async function getAllWorks(): Promise<WorkCard[]> {
  const entries = await client.getEntries<ContentfulWork['fields']>({
    content_type: 'work',
    order: ['-fields.season', 'fields.title'],
  })

  return entries.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    subtitle: item.fields.subtitle,
    slug: item.fields.slug,
    season: item.fields.season,
    category: item.fields.category,
    fabric: item.fields.fabric,
    fabricOrigin: item.fields.fabricOrigin,
    cut: item.fields.cut,
    heroImageUrl: getImageUrl(item.fields.heroImage as Parameters<typeof getImageUrl>[0]),
    badge: item.fields.badge,
  }))
}

export async function getFeaturedWorks(): Promise<WorkCard[]> {
  const entries = await client.getEntries<ContentfulWork['fields']>({
    content_type: 'work',
    'fields.isFeatured': true,
    limit: 3,
  })

  return entries.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    subtitle: item.fields.subtitle,
    slug: item.fields.slug,
    season: item.fields.season,
    category: item.fields.category,
    fabric: item.fields.fabric,
    fabricOrigin: item.fields.fabricOrigin,
    cut: item.fields.cut,
    heroImageUrl: getImageUrl(item.fields.heroImage as Parameters<typeof getImageUrl>[0]),
    badge: item.fields.badge,
  }))
}

export async function getWorkBySlug(slug: string) {
  const entries = await client.getEntries<ContentfulWork['fields']>({
    content_type: 'work',
    'fields.slug': slug,
    limit: 1,
  })

  return entries.items[0] || null
}

// ─── Articles ─────────────────────────────────────────────────────────────────

export async function getAllArticles(): Promise<ArticleCard[]> {
  const entries = await client.getEntries<ContentfulArticle['fields']>({
    content_type: 'article',
    order: ['-fields.publishedDate'],
  })

  return entries.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: item.fields.excerpt,
    category: item.fields.category,
    heroImageUrl: getImageUrl(item.fields.heroImage as Parameters<typeof getImageUrl>[0]),
    publishedDate: item.fields.publishedDate,
    readingTime: item.fields.readingTime,
  }))
}

export async function getArticleBySlug(slug: string) {
  const entries = await client.getEntries<ContentfulArticle['fields']>({
    content_type: 'article',
    'fields.slug': slug,
    limit: 1,
  })

  return entries.items[0] || null
}

export async function getRecentArticles(limit = 3): Promise<ArticleCard[]> {
  const entries = await client.getEntries<ContentfulArticle['fields']>({
    content_type: 'article',
    order: ['-fields.publishedDate'],
    limit,
  })

  return entries.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: item.fields.excerpt,
    category: item.fields.category,
    heroImageUrl: getImageUrl(item.fields.heroImage as Parameters<typeof getImageUrl>[0]),
    publishedDate: item.fields.publishedDate,
    readingTime: item.fields.readingTime,
  }))
}
