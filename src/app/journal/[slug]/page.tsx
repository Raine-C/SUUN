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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const article = await getArticleBySlug(params.slug)
    if (!article) return { title: '職人誌' }
    return {
      title: article.fields.title,
      description: article.fields.excerpt,
    }
  } catch {
    return { title: '職人誌' }
  }
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  let article = null
  let relatedArticles = []
  let body = null

  try {
    article = await getArticleBySlug(params.slug)
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
  const category = article?.fields.category ?? '布料選擇'
  const tags = (article?.fields.tags as string[] | undefined) ?? ['布料', '工藝', '訂製指南']
  const heroImageUrl = (article?.fields.heroImage as { fields?: { file?: { url?: string } } } | undefined)?.fields?.file?.url
    ? `https:${(article.fields.heroImage as { fields: { file: { url: string } } }).fields.file.url}`
    : null

  return (
    <>
      <Navigation />
      <main className="pt-20">

        {/* ── Article Hero ─────────────────────────────────────────── */}
        <section className="relative h-[777px] bg-[#1C1A17] overflow-hidden">
          {heroImageUrl ? (
            <Image src={heroImageUrl} alt={title} fill className="object-cover opacity-60" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#030081]/50 to-[#01002D]/80" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(1,0,45,0.8)] to-transparent" />

          {/* Article meta + title */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[860px] text-center">
            <p className="font-inter font-medium text-[12px] tracking-[4px] uppercase text-[#AFD9F2] mb-6">
              職人誌 · Artisan Journal
            </p>
            <h1 className="font-shippori text-[58px] tracking-[-0.5px] leading-[1.15] text-white mb-8">
              {title}
            </h1>
            <p className="font-inter font-light text-[14px] leading-[1.8] text-[rgba(255,255,255,0.6)] max-w-[560px] mx-auto">
              從羊毛到亞麻，從義大利到英國——每一匹布都有其性格，而找到契合你的那一匹，是訂製旅程中最關鍵的一步。
            </p>
          </div>
        </section>

        {/* ── Author + Meta bar ─────────────────────────────────────── */}
        <div className="bg-[#FBF9FF] border-b border-[#D9D9EC]">
          <div className="max-w-[860px] mx-auto py-10 flex items-center justify-between">
            {/* Author */}
            <div className="flex items-center gap-5">
              <div className="w-[52px] h-[52px] rounded-full bg-[#D9D9EC]" />
              <div>
                <p className="font-inter text-[10px] tracking-[2px] uppercase text-[#9EC3DA] mb-1">作者 Author</p>
                <p className="font-inter font-medium text-[16px] text-[#01002D]">{author}</p>
                <p className="font-inter text-[13px] text-[#9EC3DA]">{authorTitle}</p>
              </div>
            </div>

            {/* Meta */}
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
                  <span key={tag} className="px-3 py-1 border border-[#D4C6FC] font-inter text-[11px] tracking-[1px] text-[#5F5971]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Article Body ─────────────────────────────────────────── */}
        <article className="bg-[#FBF9FF]">
          <div className="max-w-[1440px] mx-auto flex">

            {/* Article navigation sidebar */}
            <aside className="w-[260px] shrink-0 px-16 py-16">
              <div className="sticky top-28">
                <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#3D4C55] mb-6">文章分類</p>
                <nav className="flex flex-col gap-0">
                  {['布料的語言', '認識布料', '產地與品牌', '給初次訂製者的建議'].map((section) => (
                    <a key={section} href="#" className="py-3 font-inter text-[14px] text-[#5F5971] border-b border-[#D9D9EC] hover:text-[#030074] transition-colors">
                      {section}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main article content */}
            <div className="flex-1 px-16 py-16 max-w-[720px]">
              {body ? (
                <div className="prose prose-stone prose-lg max-w-none
                  prose-h2:font-shippori prose-h2:text-[32px] prose-h2:text-[#01002D]
                  prose-p:font-inter prose-p:font-light prose-p:text-[15px] prose-p:leading-[1.9] prose-p:text-[#3D4C55]
                  prose-blockquote:border-l-4 prose-blockquote:border-[#D4C6FC] prose-blockquote:font-shippori prose-blockquote:text-[22px]
                ">
                  {body}
                </div>
              ) : (
                // Placeholder content
                <div className="space-y-8 font-inter font-light text-[15px] leading-[1.9] text-[#3D4C55]">
                  <blockquote className="font-shippori text-[24px] leading-[1.6] text-[#01002D] border-l-4 border-[#D4C6FC] pl-8 py-4 mb-12">
                    「布料是西裝的靈魂。在你決定版型之前，先學會聆聽一匹布的語言。」
                  </blockquote>
                  <h2 className="font-shippori text-[32px] text-[#01002D] mt-12 mb-6">布料的語言</h2>
                  <p>許多第一次訂製西裝的客人，來到工作室時最常問的問題是：「我應該選什麼顏色？」這個問題本身沒有錯，但在色彩之前，有一個更根本的問題需要先回答：你選的是什麼布料？</p>
                  <p>布料的選擇是訂製過程中影響最深遠的一個決定。它決定了西裝的垂感、耐久性、穿著季節，以及最終呈現在你身上的整體氣質。</p>

                  <div className="relative aspect-[21/9] bg-[#D9D9EC] my-10">
                    <p className="absolute inset-0 flex items-end justify-center pb-4 font-inter text-[13px] text-[#9EC3DA]">工作室布料室 — 超過 800 種進口布料供選擇</p>
                  </div>

                  <h2 className="font-shippori text-[32px] text-[#01002D] mt-12 mb-6">認識布料</h2>
                  <p>在曙溫工作室，我們主要使用四類布料：精紡羊毛（Worsted Wool）、法蘭絨（Flannel）、斜紋布（Tweed）與亞麻（Linen）。</p>
                  <ul className="list-none space-y-4 border border-[#D9D9EC] p-8">
                    {[
                      { label: '精紡羊毛 Worsted Wool', desc: '表面平滑、光澤細膩，適合商務場合與全年穿著。' },
                      { label: '法蘭絨 Flannel', desc: '觸感柔軟，富有厚度，秋冬首選。顏色多為深灰或炭灰，氣質沉穩內斂。' },
                      { label: '斜紋布 Tweed', desc: '耐磨粗獷，質感豐富，適合休閒與鄉村風格的場合。' },
                      { label: '亞麻 Linen', desc: '夏日必備，透氣輕盈，自然皺摺反而是其特色，適合輕鬆的商務或度假場合。' },
                    ].map(({ label, desc }) => (
                      <li key={label} className="flex gap-4">
                        <span className="text-[#D4C6FC] shrink-0 mt-1">—</span>
                        <span><strong className="font-medium text-[#01002D]">{label}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* ── Related articles ──────────────────────────────────────── */}
        <section className="bg-[#FBF9FF] border-t border-[#D9D9EC] px-16 py-20">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-shippori text-[42px] text-[#01002D]">職人誌精選</h2>
            <Link href="/journal" className="font-inter font-medium text-[11px] tracking-[2px] uppercase text-[#5F5971] border-b border-[#D4C6FC] pb-[1px] hover:text-[#030074] transition-colors">
              查看所有文章
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {relatedArticles.length > 0 ? (
              relatedArticles.map((a) => (
                <Link key={a.id} href={`/journal/${a.slug}`} className="group">
                  <div className="relative aspect-[3/2] bg-[#D9D9EC] overflow-hidden mb-6">
                    {a.heroImageUrl && (
                      <Image src={a.heroImageUrl} alt={a.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                  </div>
                  <p className="font-inter text-[11px] tracking-[2px] uppercase text-[#9EC3DA] mb-2">{a.category}</p>
                  <h3 className="font-shippori text-[22px] leading-[1.4] text-[#01002D] mb-3 group-hover:text-[#030074] transition-colors">{a.title}</h3>
                  <p className="font-inter font-light text-[13px] leading-[1.7] text-[#3D4C55] line-clamp-2 mb-4">{a.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <span className="font-inter text-[12px] text-[#9EC3DA]">
                      {new Date(a.publishedDate).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="text-[#D4C6FC]">·</span>
                    <span className="font-inter text-[12px] text-[#9EC3DA]">{a.readingTime} 分鐘閱讀</span>
                  </div>
                </Link>
              ))
            ) : (
              [
                { title: '一件好西裝，如何讓它陪你走過二十年', cat: '保養指南' },
                { title: '格紋紳士 The Savile — 一件關於精準的作品', cat: '作品故事' },
                { title: '西裝版型入門：合身、修身與英式剪裁的差異', cat: '版型與剪裁' },
              ].map((a, i) => (
                <div key={i} className="group">
                  <div className="relative aspect-[3/2] bg-[#D9D9EC] mb-6" />
                  <p className="font-inter text-[11px] tracking-[2px] uppercase text-[#9EC3DA] mb-2">{a.cat}</p>
                  <h3 className="font-shippori text-[22px] leading-[1.4] text-[#01002D] mb-3">{a.title}</h3>
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
