import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { getAllWorks } from '@/lib/contentful'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '訂製展示',
  description: '所有作品均為個人全手工訂製，不量產、不複製，每件西服都是獨一無二的存在。',
}

const CATEGORIES = ['全部作品', '西裝外套', '大衣外套', '禮服系列', '休閒西裝']

export default async function WorksPage() {
  let works = []
  try {
    works = await getAllWorks()
  } catch {
    // Contentful not configured — show empty state
  }

  return (
    <>
      <Navigation />
      <main className="pt-20">

        {/* Hero banner */}
        <section className="relative h-[604px] bg-[#1C1A17] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#030081] to-[#01002D] opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,14,12,0.7)] to-transparent" />

          {/* Vertical text decoration */}
          <div className="absolute right-10 top-10 writing-vertical">
            <p className="font-inter font-normal text-[11px] tracking-[3px] uppercase text-[rgba(255,255,255,0.3)]"
               style={{ writingMode: 'vertical-rl' }}>
              AW 2026 Collection
            </p>
          </div>

          <div className="absolute bottom-24 left-16 max-w-[400px]">
            <p className="font-inter font-medium text-[12px] tracking-[3px] uppercase text-[#AFD9F2] mb-4">
              AW 2026 · 訂製展示
            </p>
            <h1 className="font-shippori text-[64px] tracking-[-0.5px] leading-[1.1] text-white mb-8">
              每一件，<br />只為你而生
            </h1>
            <p className="font-inter font-light text-[14px] leading-[1.8] text-[rgba(255,255,255,0.6)] max-w-[393px]">
              所有作品均為個人全手工訂製，不量產、不複製，每件西服都是獨一無二的存在。
            </p>
          </div>
        </section>

        {/* Works grid with sidebar filter */}
        <section className="bg-[#FBF9FF] min-h-screen">
          <div className="max-w-[1440px] mx-auto flex">

            {/* Sidebar */}
            <aside className="w-[220px] shrink-0 px-16 py-16 border-r border-[#D9D9EC]">
              <div className="sticky top-28">
                <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#3D4C55] mb-6">
                  類型
                </p>
                <div className="flex flex-col">
                  {CATEGORIES.map((cat) => (
                    <div key={cat} className="flex items-center justify-between py-3 border-b border-[#D9D9EC] last:border-0">
                      <span className="font-inter text-[15px] text-[#01002D]">{cat}</span>
                    </div>
                  ))}
                </div>

                <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#3D4C55] mt-10 mb-6">
                  布料
                </p>
                <div className="flex flex-wrap gap-2">
                  {['全部', '羊毛', '法蘭絨', '斜紋布', '亞麻', '喀什米爾'].map((fab) => (
                    <button key={fab} className="px-3 py-1 border border-[#D4C6FC] text-[#5F5971] font-inter text-[11px] tracking-[1px] hover:bg-[#D4C6FC] transition-colors">
                      {fab}
                    </button>
                  ))}
                </div>

                <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#3D4C55] mt-10 mb-6">
                  季節
                </p>
                <div className="flex flex-col">
                  {['全年', '春夏', '秋冬'].map((s) => (
                    <div key={s} className="py-3 border-b border-[#D9D9EC] last:border-0">
                      <span className="font-inter text-[15px] text-[#01002D]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1 px-16 py-16">
              <div className="flex items-center justify-between mb-8">
                <p className="font-inter text-[15px] text-[#5F5971]">
                  共 {works.length || 9} 件作品
                </p>
              </div>

              <div className="grid grid-cols-3 gap-x-8 gap-y-16">
                {works.length > 0 ? (
                  works.map((work) => (
                    <Link key={work.id} href={`/works/${work.slug}`} className="group">
                      <div className="relative aspect-[2/3] bg-[#D9D9EC] overflow-hidden mb-6">
                        {work.heroImageUrl && (
                          <Image
                            src={work.heroImageUrl}
                            alt={work.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        {work.badge && (
                          <div className="absolute top-5 left-5 px-3 py-1 bg-[#FBF9FF]">
                            <span className="font-inter font-medium text-[10px] tracking-[2px] uppercase text-[#01002D]">
                              {work.badge}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="px-1">
                        <p className="font-inter font-normal text-[11px] tracking-[2px] uppercase text-[#5F5971] mb-2">{work.category}</p>
                        <h3 className="font-cormorant text-[24px] tracking-[0.5px] text-[#01002D] mb-1">{work.title}</h3>
                        <p className="font-inter text-[12px] tracking-[1.5px] uppercase text-[#9EC3DA] mb-3">{work.subtitle}</p>
                        <div className="flex gap-6">
                          <div>
                            <p className="font-inter text-[10px] tracking-[1px] uppercase text-[#9EC3DA] mb-1">布料</p>
                            <p className="font-inter text-[12px] text-[#3D4C55]">{work.fabric}</p>
                          </div>
                          <div>
                            <p className="font-inter text-[10px] tracking-[1px] uppercase text-[#9EC3DA] mb-1">季節</p>
                            <p className="font-inter text-[12px] text-[#3D4C55]">{work.season}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  // Placeholder items
                  Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="group">
                      <div className="relative aspect-[2/3] bg-[#D9D9EC] mb-6" />
                      <div className="px-1">
                        <p className="font-inter text-[11px] tracking-[2px] uppercase text-[#5F5971] mb-2">西裝外套</p>
                        <div className="h-6 bg-[#D9D9EC] w-32 mb-2 rounded" />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-16">
                <div className="flex items-center gap-4">
                  <button className="w-10 h-10 border border-[#D4C6FC] flex items-center justify-center font-inter text-[13px] text-[#5F5971] bg-[#D4C6FC]">1</button>
                  <button className="w-10 h-10 border border-[#D9D9EC] flex items-center justify-center font-inter text-[13px] text-[#5F5971] hover:border-[#D4C6FC] transition-colors">2</button>
                  <button className="w-10 h-10 border border-[#D9D9EC] flex items-center justify-center font-inter text-[13px] text-[#5F5971] hover:border-[#D4C6FC] transition-colors">3</button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
