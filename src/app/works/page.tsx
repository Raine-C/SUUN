import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { getAllWorks } from '@/lib/contentful'
import type { WorkCard } from '@/types/contentful'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '訂製展示' }

async function loadWorks(): Promise<WorkCard[]> {
  try { return await getAllWorks() } catch { return [] }
}

export default async function WorksPage() {
  const works = await loadWorks()

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <section className="relative h-[400px] md:h-[604px] bg-[#1C1A17] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#030081]/60 to-[#01002D]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,14,12,0.7)] to-transparent" />
          <div className="absolute bottom-12 md:bottom-24 left-4 md:left-16 max-w-[90vw] md:max-w-[400px]">
            <p className="font-inter font-medium text-[12px] tracking-[3px] uppercase text-[#AFD9F2] mb-4">AW 2026 · 訂製展示</p>
            <h1 className="font-shippori text-[40px] md:text-[64px] tracking-[-0.5px] leading-[1.1] text-white mb-6 md:mb-8">每一件，<br />只為你而生</h1>
            <p className="font-inter font-light text-[13px] md:text-[14px] leading-[1.8] text-[rgba(255,255,255,0.6)]">所有作品均為個人全手工訂製，不量產、不複製，每件西服都是獨一無二的存在。</p>
          </div>
        </section>

        <section className="bg-[#FBF9FF] min-h-screen">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row">
            {/* Mobile filter strip */}
            <div className="lg:hidden px-4 pt-6 pb-4 border-b border-[#D9D9EC]">
              <div className="flex flex-wrap gap-2">
                {['全部', '西裝外套', '大衣外套', '禮服', '休閒'].map((cat) => (
                  <button key={cat} className="px-3 py-1 border border-[#D4C6FC] text-[#5F5971] font-inter text-[11px] hover:bg-[#D4C6FC] transition-colors">{cat}</button>
                ))}
              </div>
            </div>

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-[284px] shrink-0 px-16 py-16 border-r border-[#D9D9EC]">
              <div className="sticky top-28">
                <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#3D4C55] mb-4">類型</p>
                <div className="flex flex-col mb-10">
                  {['全部作品', '西裝外套', '大衣外套', '禮服系列', '休閒西裝'].map((cat) => (
                    <div key={cat} className="flex items-center justify-between py-3 border-b border-[#D9D9EC] last:border-0">
                      <span className="font-inter text-[15px] text-[#01002D]">{cat}</span>
                    </div>
                  ))}
                </div>
                <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#3D4C55] mb-4">布料</p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {['全部', '羊毛', '法蘭絨', '斜紋布', '亞麻', '喀什米爾'].map((f) => (
                    <button key={f} className="px-3 py-1 border border-[#D4C6FC] text-[#5F5971] font-inter text-[11px] hover:bg-[#D4C6FC] transition-colors">{f}</button>
                  ))}
                </div>
                <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#3D4C55] mb-4">季節</p>
                <div className="flex flex-col">
                  {['全年', '春夏', '秋冬'].map((s) => (
                    <div key={s} className="py-3 border-b border-[#D9D9EC] last:border-0">
                      <span className="font-inter text-[15px] text-[#01002D]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="flex-1 px-4 md:px-16 py-8 md:py-16">
              <p className="font-inter text-[15px] text-[#5F5971] mb-6 md:mb-8">共 {works.length || 9} 件作品</p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16">
                {works.length > 0 ? works.map((work) => (
                  <Link key={work.id} href={`/works/${work.slug}`} className="group">
                    <div className="relative aspect-[2/3] bg-[#D9D9EC] overflow-hidden mb-4 md:mb-6">
                      {work.heroImageUrl && <Image src={work.heroImageUrl} alt={work.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                      {work.badge && (
                        <div className="absolute top-3 left-3 md:top-5 md:left-5 px-3 py-1 bg-[#FBF9FF]">
                          <span className="font-inter font-medium text-[10px] tracking-[2px] uppercase text-[#01002D]">{work.badge}</span>
                        </div>
                      )}
                    </div>
                    <p className="font-inter text-[11px] tracking-[2px] uppercase text-[#5F5971] mb-2">{work.category}</p>
                    <h3 className="font-cormorant text-[20px] md:text-[24px] tracking-[0.5px] text-[#01002D] mb-1">{work.title}</h3>
                    <p className="font-inter text-[11px] md:text-[12px] tracking-[1.5px] uppercase text-[#9EC3DA] mb-3">{work.subtitle}</p>
                  </Link>
                )) : Array.from({ length: 9 }).map((_, i) => (
                  <div key={i}>
                    <div className="relative aspect-[2/3] bg-[#D9D9EC] mb-4 md:mb-6" />
                    <div className="h-4 bg-[#D9D9EC] w-20 mb-2 rounded" />
                    <div className="h-6 bg-[#D9D9EC] w-32 rounded" />
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
