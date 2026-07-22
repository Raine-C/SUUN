import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles } from '@/lib/contentful'
import type { ArticleCard } from '@/types/contentful'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '職人誌' }
export const revalidate = 60

async function loadArticles(): Promise<ArticleCard[]> {
  try { return await getAllArticles() } catch { return [] }
}

const PLACEHOLDER_ARTICLES = [
  { title: '西裝版型入門：合身、修身與英式剪裁的差異', cat: '版型與剪裁', date: '2026 年 2 月 8 日', time: 6 },
  { title: '一件好西裝，如何讓它陪你走過二十年', cat: '西裝保養', date: '2026 年 1 月 20 日', time: 5 },
  { title: '格紋紳士 The Savile — 一件關於精準的作品', cat: '作品故事', date: '2025 年 12 月 5 日', time: 7 },
  { title: '手工訂製的意義：為什麼我們仍然堅持一針一線', cat: '工藝細節', date: '2025 年 11 月 18 日', time: 9 },
]

export default async function JournalPage() {
  const articles = await loadArticles()

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <section className="relative h-[400px] md:h-[644px] bg-[#1C1A17] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#030081]/60 to-[#01002D]/80" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="font-inter font-medium text-[12px] tracking-[4px] uppercase text-[#AFD9F2] mb-6">職人誌 · Artisan Journal</p>
            <h1 className="font-shippori text-[36px] md:text-[64px] tracking-[-0.5px] leading-[1.15] text-white mb-6">關於西服的<br />一切知識與美學</h1>
            <p className="font-inter font-light text-[13px] md:text-[14px] leading-[1.8] text-[rgba(255,255,255,0.6)] max-w-[476px]">由主理人記錄，從布料選擇到版型哲學，帶你深入訂製西服的世界。</p>
          </div>
        </section>

        <section className="bg-[#FBF9FF]">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row">
            {/* Mobile tag strip */}
            <div className="lg:hidden px-4 pt-6 pb-4 border-b border-[#D9D9EC]">
              <div className="flex flex-wrap gap-2">
                {['全部', '布料', '工藝', '版型', '保養', '作品'].map((tag) => (
                  <button key={tag} className="px-3 py-1 border border-[#D4C6FC] text-[#5F5971] font-inter text-[12px] hover:bg-[#D4C6FC] transition-colors">{tag}</button>
                ))}
              </div>
            </div>

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-[320px] shrink-0 px-16 py-16 border-r border-[#D9D9EC]">
              <div className="sticky top-28">
                <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#3D4C55] mb-4">搜尋文章</p>
                <div className="relative mb-10">
                  <input type="text" placeholder="輸入關鍵字…" className="w-full border border-[#D9D9EC] px-4 py-3 font-inter text-[14px] text-[#01002D] placeholder:text-[#9EC3DA] focus:outline-none focus:border-[#D4C6FC]" />
                </div>
                <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#3D4C55] mb-4">文章主題</p>
                <div className="flex flex-col mb-10">
                  {[['全部文章', 12], ['布料選擇', 4], ['版型與剪裁', 3], ['工藝細節', 2], ['西裝保養', 2], ['作品故事', 1]].map(([label, count]) => (
                    <div key={label} className="flex items-center justify-between py-3 border-b border-[#D9D9EC] last:border-0 cursor-pointer group">
                      <span className="font-inter text-[15px] text-[#01002D] group-hover:text-[#030074] transition-colors">{label}</span>
                      <span className="font-inter text-[12px] text-[#9EC3DA]">{count}</span>
                    </div>
                  ))}
                </div>
                <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#3D4C55] mb-4">標籤</p>
                <div className="flex flex-wrap gap-2">
                  {['布料', '工藝', '版型', '保養', '訂製指南', '作品', '季節'].map((tag) => (
                    <button key={tag} className="px-3 py-1 border border-[#D4C6FC] text-[#5F5971] font-inter text-[12px] hover:bg-[#D4C6FC] transition-colors">{tag}</button>
                  ))}
                </div>
              </div>
            </aside>

            <div className="flex-1 px-4 md:px-16 py-8 md:py-16">
              <p className="font-inter text-[15px] text-[#5F5971] mb-8 md:mb-10">共 {articles.length || 12} 篇文章</p>
              <div className="flex flex-col gap-10 md:gap-12">
                {articles.length > 0 ? articles.map((article) => (
                  <Link key={article.id} href={`/journal/${article.slug}`} className="group flex flex-col sm:flex-row gap-6 md:gap-10 pb-10 md:pb-12 border-b border-[#D9D9EC] last:border-0">
                    <div className="relative w-full sm:w-[280px] h-[200px] sm:h-[210px] shrink-0 bg-[#D9D9EC] overflow-hidden">
                      {article.heroImageUrl && <Image src={article.heroImageUrl} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                    </div>
                    <div className="flex flex-col justify-between flex-1 py-1 md:py-2">
                      <div>
                        <p className="font-inter font-medium text-[11px] tracking-[2px] uppercase text-[#9EC3DA] mb-3">{article.category}</p>
                        <h2 className="font-shippori text-[22px] md:text-[28px] leading-[1.3] text-[#01002D] mb-4 group-hover:text-[#030074] transition-colors">{article.title}</h2>
                        <p className="font-inter font-light text-[14px] leading-[1.8] text-[#3D4C55] line-clamp-2">{article.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        <span className="font-inter text-[13px] text-[#9EC3DA]">{new Date(article.publishedDate).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="text-[#D4C6FC]">·</span>
                        <span className="font-inter text-[13px] text-[#9EC3DA]">{article.readingTime} 分鐘閱讀</span>
                      </div>
                    </div>
                  </Link>
                )) : PLACEHOLDER_ARTICLES.map((a, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-6 md:gap-10 pb-10 md:pb-12 border-b border-[#D9D9EC] last:border-0">
                    <div className="w-full sm:w-[280px] h-[200px] sm:h-[210px] shrink-0 bg-[#D9D9EC]" />
                    <div className="flex flex-col justify-between flex-1 py-1 md:py-2">
                      <div>
                        <p className="font-inter font-medium text-[11px] tracking-[2px] uppercase text-[#9EC3DA] mb-3">{a.cat}</p>
                        <h2 className="font-shippori text-[22px] md:text-[28px] leading-[1.3] text-[#01002D] mb-4">{a.title}</h2>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-inter text-[13px] text-[#9EC3DA]">{a.date}</span>
                        <span className="text-[#D4C6FC]">·</span>
                        <span className="font-inter text-[13px] text-[#9EC3DA]">{a.time} 分鐘閱讀</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
