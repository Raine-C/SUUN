import { createClient } from 'contentful'
import type { WorkCard, ArticleCard } from '@/types/contentful'

function getClient() {
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  })
}

function imgUrl(asset: unknown): string {
  const url = (asset as { fields: { file: { url: string } } })?.fields?.file?.url
  if (!url) return ''
  return url.startsWith('//') ? `https:${url}` : url
}

export async function getAllWorks(): Promise<WorkCard[]> {
  const client = getClient()
  const res = await client.getEntries({ content_type: 'work', order: ['-fields.season' as never] })
  return res.items.map((item) => {
    const f = item.fields as Record<string, unknown>
    return {
      id: item.sys.id,
      title: String(f.title ?? ''),
      subtitle: String(f.subtitle ?? ''),
      slug: String(f.slug ?? ''),
      season: String(f.season ?? ''),
      category: String(f.category ?? ''),
      fabric: String(f.fabric ?? ''),
      fabricOrigin: String(f.fabricOrigin ?? ''),
      composition: String(f.composition ?? ''),
      description: String(f.description ?? ''),
      heroImageUrl: imgUrl(f.heroImage),
      badge: f.badge ? String(f.badge) : undefined,
    }
  })
}

export async function getFeaturedWorks(): Promise<WorkCard[]> {
  const client = getClient()
  const res = await client.getEntries({ content_type: 'work', 'fields.isFeatured': true, limit: 3 } as never)
  return res.items.map((item) => {
    const f = item.fields as Record<string, unknown>
    return {
      id: item.sys.id,
      title: String(f.title ?? ''),
      subtitle: String(f.subtitle ?? ''),
      slug: String(f.slug ?? ''),
      season: String(f.season ?? ''),
      category: String(f.category ?? ''),
      fabric: String(f.fabric ?? ''),
      fabricOrigin: String(f.fabricOrigin ?? ''),
      composition: String(f.composition ?? ''),
      description: String(f.description ?? ''),
      heroImageUrl: imgUrl(f.heroImage),
      badge: f.badge ? String(f.badge) : undefined,
    }
  })
}

export async function getWorkBySlug(slug: string) {
  const client = getClient()
  const res = await client.getEntries({ content_type: 'work', 'fields.slug': slug, limit: 1 } as never)
  return res.items[0] ?? null
}

export async function getAllArticles(): Promise<ArticleCard[]> {
  const client = getClient()
  const res = await client.getEntries({ content_type: 'article', order: ['-fields.publishedDate' as never] })
  return res.items.map((item) => {
    const f = item.fields as Record<string, unknown>
    return {
      id: item.sys.id,
      title: String(f.title ?? ''),
      slug: String(f.slug ?? ''),
      excerpt: String(f.excerpt ?? ''),
      category: String(f.category ?? ''),
      heroImageUrl: imgUrl(f.heroImage),
      publishedDate: String(f.publishedDate ?? ''),
      readingTime: Number(f.readingTime ?? 5),
    }
  })
}

export async function getArticleBySlug(slug: string) {
  const client = getClient()
  const res = await client.getEntries({ content_type: 'article', 'fields.slug': slug, limit: 1 } as never)
  return res.items[0] ?? null
}

export async function getRecentArticles(limit = 3): Promise<ArticleCard[]> {
  const client = getClient()
  const res = await client.getEntries({ content_type: 'article', order: ['-fields.publishedDate' as never], limit })
  return res.items.map((item) => {
    const f = item.fields as Record<string, unknown>
    return {
      id: item.sys.id,
      title: String(f.title ?? ''),
      slug: String(f.slug ?? ''),
      excerpt: String(f.excerpt ?? ''),
      category: String(f.category ?? ''),
      heroImageUrl: imgUrl(f.heroImage),
      publishedDate: String(f.publishedDate ?? ''),
      readingTime: Number(f.readingTime ?? 5),
    }
  })
}
