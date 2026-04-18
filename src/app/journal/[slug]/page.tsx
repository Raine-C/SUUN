import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { getArticleBySlug, getAllArticles, getRecentArticles } from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  try {
    const articles = await getAllArticles()
    return articles.map((a) => ({ slug: a.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params
    const article = await getArticleBySlug(slug)
    if (!article) return { title: '職人誌' }
    return {
      title: article.fields.title,
      description: article.fields.excerpt,
    }
  } catch {
    return { title: '職人誌' }
  }
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let article = null
  let relatedArticles = []
  let body = null

  try {
    article = await getArticleBySlug(slug)
    if (!article) notFound()
    relatedArticles = await getRecentArticles(3)
    body = article.fields.body
      ? documentToReactComponents(article.fields.body as Parameters<typeof documentToReactComponents>[0])
      : null
  } catch {
    // Placeholder UI
  }

  const title = article?.fields.title ?? '如何挑選適合的布料'
  const author = article?.fields.author ?? 'Evan Huang'
  const authorTitle = (article?.fields as { authorTitle?: string } | undefined)?.authorTitle ?? '曙溫 SUUN 主理人 · 首席裁縫師'
  const publishedDate = article?.fields.publishedDate
    ? new Date(article.fields.publishedDate).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
    : '2026 年 3 月 12 日'
  const readingTime = article?.fields.readingTime ?? 8
  const tags = (article?.fields.tags as string[] | undefined) ?? ['布料', '工藝', '訂製指南']
  const heroImageUrl = (article?.fields.heroImage as { fields?: { file?: { url?: string } } } | undefined)?.fields?.file?.url
    ? `https:${(article.fields.heroImage as { fields: { file: { url: string } } }).fields.file.url}`
    : null

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <section className="relative h-[777px] bg-[#1C1A17] overflow-hidden">
          {heroImageUrl ? (
            <Image src={heroImageUrl} alt={title} fill className="object-cover opacity-60" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#030081]/50 to-[#01002D]/80" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(1,0,45,0.8)] to-transparent" />
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[860px] text-center">
            <p className="font-inter font-medium text-[12px] tracking-[4px] uppercase text-[#AFD9F2] mb-6">職人誌 · Artisan Journal</p>
            <h1 className="font-shippori text-[58px] tracking-[-0.5px] leading-[1.15] text-white mb-8">{title}</h1>
          </div>
        </section>

        <div className="bg-[#FBF9FF] border-b border-[#D9D9EC]">
          <div className="max-w-[860px] mx-auto py-10 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-[52px] h-[52px] rounded-full bg-[#D9D9EC]" />
              <div>
                <p className="font-inter text-[10px] tracking-[2px] uppercase text-[#9EC3DA] mb-1">作者 Author</p>
                <p className="font-inter font-medium text-[16px] text-[#01002D]">{author}</p>
                <p className="font-inter text-[13px] text-[#9EC3DA]">{authorTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-10">
              <div>
                <p className="font-inter text-[10px] tracking-[2px] uppercase text-[#9EC3DA] mb-1">發佈日期</p>
                <p className="font-inter font-medium text-[14px] text-[#01002D]">{publishedDate}</p>
              </div>
              <div>
                <p className="font-inter text-[10px] tracking-[2px] uppercase text-[#9EC3DA] mb-1">閱讀時間</p>
                <p className="font-inter font-medium text-[14px] text-[#01002D]">{readingTime} 分鐘</p>
              </div>
              <div className="flex gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 border border-[#D4C6FC] font-inter text-[11px] tracking-[1px] text-[#5F5971]">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <article className="bg-[#FBF9FF]">
          <div className="max-w-[1440px] mx-auto flex">
            <aside className="w-[260px] shrink-0 px-16 py-16">
              <div className="sticky top-28">
                <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#3D4C55] mb-6">文章分類</p>
                <nav className="flex flex-col gap-0">
                  {['布料的語言', '認識布料', '產地與品牌', '給初次訂製者的建議'].map((section) => (
                    <a key={section} href="#" className="py-3 font-inter text-[14px] text-[#5F5971] border-b border-[#D9D9EC] hover:text-[#030074] transition-colors">{section}</a>
                  ))}
                </nav>
              </div>
            </aside>
            <div className="flex-1 px-16 py-16 max-w-[720px]">
              {body ? (
                <div className="prose prose-stone prose-lg max-w-none">{body}</div>
              ) : (
                <div className="space-y-8 font-inter font-light text-[15px] leading-[1.9] text-[#3D4C55]">
                  <blockquote className="font-shippori text-[24px] leading-[1.6] text-[#01002D] border-l-4 border-[#D4C6FC] pl-8 py-4 mb-12">
                    「布料是西裝的靈魂。在你決定版型之前，先學會聆聽一匹布的語言。」
                  </blockquote>
                  <p>許多第一次訂製西裝的客人，來到工作室時最常問的問題是：「我應該選什麼顏色？」這個問題本身沒有錯，但在色彩之前，有一個更根本的問題需要先回答：你選的是什麼布料？</p>
                  <p>布料的選擇是訂製過程中影響最深遠的一個決定。它決定了西裝的垂感、耐久性、穿著季節，以及最終呈現在你身上的整體氣質。</p>
                </div>
              )}
            </div>
          </div>
        </article>

        <section className="bg-[#FBF9FF] border-t border-[#D9D9EC] px-16 py-20">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-shippori text-[42px] text-[#01002D]">職人誌精選</h2>
            <Link href="/journal" className="font-inter font-medium text-[11px] tracking-[2px] uppercase text-[#5F5971] border-b border-[#D4C6FC] pb-[1px] hover:text-[#030074] transition-colors">查看所有文章</Link>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {relatedArticles.length > 0 ? relatedArticles.map((a) => (
              <Link key={a.id} href={`/journal/${a.slug}`} className="group">
                <div className="relative aspect-[3/2] bg-[#D9D9EC] overflow-hidden mb-6">
                  {a.heroImageUrl && <Image src={a.heroImageUrl} alt={a.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                </div>
                <p className="font-inter text-[11px] tracking-[2px] uppercase text-[#9EC3DA] mb-2">{a.category}</p>
                <h3 className="font-shippori text-[22px] leading-[1.4] text-[#01002D] mb-3 group-hover:text-[#030074] transition-colors">{a.title}</h3>
              </Link>
            )) : (
              ['一件好西裝，如何讓它陪你走過二十年', '格紋紳士 The Savile', '西裝版型入門'].map((t, i) => (
                <div key={i}>
                  <div className="relative aspect-[3/2] bg-[#D9D9EC] mb-6" />
                  <h3 className="font-shippori text-[22px] leading-[1.4] text-[#01002D]">{t}</h3>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
