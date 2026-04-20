import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { getArticleBySlug, getAllArticles, getRecentArticles } from '@/lib/contentful'
import { notFound } from 'next/navigation'
import type { ArticleCard } from '@/types/contentful'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const articles = await getAllArticles()
    return articles.map((a) => ({ slug: a.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const article = await getArticleBySlug(slug)
    if (!article) return { title: '職人誌' }
    const f = article.fields as Record<string, unknown>
    return { title: String(f.title ?? '職人誌') }
  } catch {
    return { title: '職人誌' }
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params

  let title = '如何挑選適合的布料'
  let author = 'Evan Huang'
  let authorTitle = '曙溫 SUUN 主理人 · 首席裁縫師'
  let publishedDate = '2026 年 3 月 12 日'
  let readingTime = 8
  let tags: string[] = ['布料', '工藝', '訂製指南']
  let heroImageUrl = ''
  let relatedArticles: ArticleCard[] = []

  try {
    const article = await getArticleBySlug(slug)
    if (!article) notFound()
    const f = article.fields as Record<string, unknown>
    title = String(f.title ?? title)
    author = String(f.author ?? author)
    authorTitle = String(f.authorTitle ?? authorTitle)
    publishedDate = f.publishedDate
      ? new Date(String(f.publishedDate)).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
      : publishedDate
    readingTime = Number(f.readingTime ?? readingTime)
    tags = Array.isArray(f.tags) ? f.tags.map(String) : tags
    const img = f.heroImage as { fields?: { file?: { url?: string } } } | undefined
    const url = img?.fields?.file?.url ?? ''
    heroImageUrl = url ? (url.startsWith('//') ? `https:${url}` : url) : ''
    relatedArticles = await getRecentArticles(3)
  } catch {
    // use defaults
  }

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <section className="relative h-[400px] md:h-[644px] bg-[#1C1A17] overflow-hidden">
          {heroImageUrl
            ? <Image src={heroImageUrl} alt={title} fill className="object-cover opacity-60" />
            : <div className="absolute inset-0 bg-gradient-to-br from-[#030081]/50 to-[#01002D]/80" />
          }
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(1,0,45,0.8)] to-transparent" />
          <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[860px] px-4 text-center">
            <p className="font-inter font-medium text-[12px] tracking-[4px] uppercase text-[#AFD9F2] mb-6">職人誌 · Artisan Journal</p>
            <h1 className="font-shippori text-[32px] md:text-[52px] tracking-[-0.5px] leading-[1.2] text-white">{title}</h1>
          </div>
        </section>

        <div className="bg-[#FBF9FF] border-b border-[#D9D9EC]">
          <div className="max-w-[860px] mx-auto px-4 md:px-0 py-8 md:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-0">
            <div className="flex items-center gap-5">
              <div className="w-[52px] h-[52px] rounded-full bg-[#D9D9EC] shrink-0" />
              <div>
                <p className="font-inter text-[10px] tracking-[2px] uppercase text-[#9EC3DA] mb-1">作者 Author</p>
                <p className="font-inter font-medium text-[16px] text-[#01002D]">{author}</p>
                <p className="font-inter text-[13px] text-[#9EC3DA]">{authorTitle}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5 md:gap-8">
              <div>
                <p className="font-inter text-[10px] tracking-[2px] uppercase text-[#9EC3DA] mb-1">發佈日期</p>
                <p className="font-inter font-medium text-[14px] text-[#01002D]">{publishedDate}</p>
              </div>
              <div>
                <p className="font-inter text-[10px] tracking-[2px] uppercase text-[#9EC3DA] mb-1">閱讀時間</p>
                <p className="font-inter font-medium text-[14px] text-[#01002D]">{readingTime} 分鐘</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 border border-[#D4C6FC] font-inter text-[11px] text-[#5F5971]">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <article className="bg-[#FBF9FF]">
          <div className="max-w-[1440px] mx-auto flex">
            <aside className="hidden lg:block w-[260px] shrink-0 px-16 py-16">
              <div className="sticky top-28">
                <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#3D4C55] mb-6">文章分類</p>
                <nav className="flex flex-col">
                  {['布料的語言', '認識布料', '產地與品牌', '給初次訂製者'].map((s) => (
                    <a key={s} href="#" className="py-3 font-inter text-[14px] text-[#5F5971] border-b border-[#D9D9EC] hover:text-[#030074] transition-colors">{s}</a>
                  ))}
                </nav>
              </div>
            </aside>
            <div className="flex-1 px-4 md:px-16 py-10 md:py-16 max-w-full lg:max-w-[720px]">
              <div className="space-y-8 font-inter font-light text-[15px] leading-[1.9] text-[#3D4C55]">
                <blockquote className="font-shippori text-[20px] md:text-[24px] leading-[1.6] text-[#01002D] border-l-4 border-[#D4C6FC] pl-6 md:pl-8 py-4 mb-10 md:mb-12">
                  「布料是西裝的靈魂。在你決定版型之前，先學會聆聽一匹布的語言。」
                </blockquote>
                <h2 className="font-shippori text-[26px] md:text-[32px] text-[#01002D] mt-10 md:mt-12 mb-6">布料的語言</h2>
                <p>許多第一次訂製西裝的客人，來到工作室時最常問的問題是：「我應該選什麼顏色？」這個問題本身沒有錯，但在色彩之前，有一個更根本的問題需要先回答：你選的是什麼布料？</p>
                <p>布料的選擇是訂製過程中影響最深遠的一個決定。它決定了西裝的垂感、耐久性、穿著季節，以及最終呈現在你身上的整體氣質。</p>
                <div className="relative aspect-[21/9] bg-[#D9D9EC] my-10" />
                <h2 className="font-shippori text-[26px] md:text-[32px] text-[#01002D] mt-10 md:mt-12 mb-6">認識布料</h2>
                <p>在曙溫工作室，我們主要使用四類布料：精紡羊毛（Worsted Wool）、法蘭絨（Flannel）、斜紋布（Tweed）與亞麻（Linen）。</p>
              </div>
            </div>
          </div>
        </article>

        <section className="bg-[#FBF9FF] border-t border-[#D9D9EC] px-4 md:px-16 py-14 md:py-20">
          <div className="flex items-end justify-between mb-10 md:mb-12">
            <h2 className="font-shippori text-[32px] md:text-[42px] text-[#01002D]">職人誌精選</h2>
            <Link href="/journal" className="font-inter font-medium text-[11px] tracking-[2px] uppercase text-[#5F5971] border-b border-[#D4C6FC] pb-[1px] hover:text-[#030074] transition-colors">查看所有文章</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {relatedArticles.length > 0 ? relatedArticles.map((a) => (
              <Link key={a.id} href={`/journal/${a.slug}`} className="group">
                <div className="relative aspect-[3/2] bg-[#D9D9EC] overflow-hidden mb-5 md:mb-6">
                  {a.heroImageUrl && <Image src={a.heroImageUrl} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />}
                </div>
                <p className="font-inter text-[11px] tracking-[2px] uppercase text-[#9EC3DA] mb-2">{a.category}</p>
                <h3 className="font-shippori text-[20px] md:text-[22px] leading-[1.4] text-[#01002D] group-hover:text-[#030074] transition-colors">{a.title}</h3>
              </Link>
            )) : ['一件好西裝，如何讓它陪你走過二十年', '格紋紳士 The Savile', '西裝版型入門'].map((t, i) => (
              <div key={i}>
                <div className="relative aspect-[3/2] bg-[#D9D9EC] mb-5 md:mb-6" />
                <h3 className="font-shippori text-[20px] md:text-[22px] leading-[1.4] text-[#01002D]">{t}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
