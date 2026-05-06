import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import BookingForm from '@/components/BookingForm'
import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedWorks } from '@/lib/contentful'
import type { WorkCard } from '@/types/contentful'

async function loadFeaturedWorks(): Promise<WorkCard[]> {
  try { return await getFeaturedWorks() } catch { return [] }
}

export default async function HomePage() {
  const featuredWorks = await loadFeaturedWorks()

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative h-screen min-h-[600px] md:min-h-[900px] bg-[#1C1A17] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(15,14,12,0.85)]" />
          <div className="absolute bottom-[10%] left-4 md:left-20 max-w-[90vw] md:max-w-[590px]">
            <h1 className="font-cormorant font-light text-[40px] sm:text-[52px] md:text-[64px] leading-[1.05] tracking-[-1px] text-white mb-6 md:mb-8">
              Dressed for<br />
              <em className="text-[#D4C5FC]">every chapter</em><br />
              of your story
            </h1>
            <p className="font-inter font-light text-[13px] md:text-[14px] leading-[1.8] text-[rgba(255,255,255,0.55)] mb-8 md:mb-10 max-w-[340px]">
              Each suit begins with a conversation and ends with a garment that is entirely, irreducibly yours.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <Link href="/#booking" className="btn-primary">Begin Your Commission</Link>
              <Link href="/works" className="border border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.7)] font-inter font-bold text-[11px] tracking-[2px] uppercase px-7 py-4 hover:border-[rgba(255,255,255,0.5)] hover:text-white transition-all">
                作品集
              </Link>
            </div>
          </div>
        </section>

        {/* Collection */}
        <section className="bg-[#FBF9FF] px-4 md:px-16 py-10 md:py-12">
          <div className="flex items-end justify-between mb-10 md:mb-16">
            <div>
              <p className="suun-label mb-3">AW 2026</p>
              <h2 className="font-shippori text-[36px] md:text-[52px] tracking-[-0.5px] text-[#01002D]">訂製展示</h2>
            </div>
            <Link href="/works" className="font-inter font-medium text-[11px] tracking-[2px] uppercase text-[#5F5971] border-b border-[#D4C6FC] pb-[2px] hover:text-[#030074] transition-colors">
              查看所有訂製
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWorks.length > 0 ? featuredWorks.map((work) => (
              <Link key={work.id} href={`/works/${work.slug}`} className="group relative overflow-hidden">
                <div className="relative aspect-[3/4] bg-[#D9D9EC]">
                  {work.heroImageUrl && <Image src={work.heroImageUrl} alt={work.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                  <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[rgba(3,0,129,0.75)] to-transparent px-7 py-8 flex flex-col justify-end gap-1">
                    <p className="font-cormorant text-[22px] tracking-[0.5px] text-[#FBF9FF]">{work.title}</p>
                    <p className="font-inter text-[11px] tracking-[2px] uppercase text-[#D9D9EC]">{work.subtitle}</p>
                  </div>
                </div>
              </Link>
            )) : ['The Savile', 'The Mayfair', 'The Alderton'].map((name) => (
              <div key={name} className="relative aspect-[3/4] bg-[#D9D9EC]">
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[rgba(3,0,129,0.75)] to-transparent px-7 py-8 flex flex-col justify-end gap-1">
                  <p className="font-cormorant text-[22px] text-[#FBF9FF]">{name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[934px]">
          <div className="relative bg-gradient-to-br from-[#1C1A17] to-[#030081] min-h-[300px] lg:min-h-0" />
          <div id="fabric" className="bg-[#F2EDFE] flex flex-col justify-center px-6 md:px-20 py-16 md:py-24">
            <p className="suun-label mb-6">職人製</p>
            <h2 className="font-shippori text-[36px] md:text-[52px] tracking-[-0.5px] text-[#01002D] leading-[1.1] mb-8 md:mb-10">如何挑選適合的布料</h2>
            <div className="space-y-6 text-[#3D4C55] font-inter font-light text-[14px] leading-[1.9] max-w-[400px]">
              <p>For over a century, we have believed that true tailoring is not merely about clothing the body — it is about expressing the self.</p>
              <p>We do not follow trends. We set a standard that outlasts them.</p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="bg-[#D9D9EC] px-4 md:px-16 py-16 md:py-28">
          <div className="text-center mb-12 md:mb-20">
            <p className="suun-label mb-4">訂製流程</p>
            <h2 className="font-shippori text-[36px] md:text-[52px] tracking-[-0.5px] text-[#01002D] mb-4">量身訂做<br />個人風格</h2>
            <p className="font-inter font-light text-[14px] text-[#030074]">一套完整西裝訂製時間，平均需要 8–12 週完成。</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8">
            {[
              { num: 'I',   title: '需求諮詢', desc: '[待訂]' },
              { num: 'II',  title: '尺寸量身', desc: '[待訂]' },
              { num: 'III', title: '布料挑選', desc: '[待訂]' },
              { num: 'IV',  title: '試衣調整', desc: '[待訂]' },
              { num: 'V',   title: '維修諮詢', desc: '[待訂]' },
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full border border-[#9EC3DA] bg-[#FBF9FF] flex items-center justify-center mb-6">
                  <span className="font-cormorant text-[22px] text-[#4A4558]">{step.num}</span>
                </div>
                <h3 className="font-shippori font-semibold text-[22px] text-[#01002D] mb-4">{step.title}</h3>
                <p className="font-inter font-light text-[13px] leading-[1.7] text-[#3D4C55]">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quote */}
        <section className="bg-[#FBF9FF] py-16 md:py-28 text-center px-4">
          <blockquote className="font-shippori text-[28px] md:text-[42px] tracking-[-0.5px] text-[#01002D] leading-[1.3] mb-8 md:mb-12">
            | 如長夜後的曙光，帶來溫暖和希望 |
          </blockquote>
          <p className="font-shippori text-[15px] md:text-[16px] leading-[2] text-[#01002D] max-w-[580px] mx-auto mb-8">
            曙溫，源自我的名字敘恩的台語 Suun，曙光與溫度的意象，期許品牌能陪伴處在長夜的人，一起走到看見曙光和希望的時候。
          </p>
          <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#3D4C55]">EvAn Huang</p>
          <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#D4C6FC] mt-1">曙溫 SUUN 主理人</p>
        </section>

        {/* Booking */}
        <section id="booking" className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[732px]">
          <div className="relative bg-gradient-to-br from-[#030081] to-[#01002D] min-h-[200px] lg:min-h-0" />
          <div className="bg-[#01002D] flex flex-col justify-center px-6 md:px-20 py-14 md:py-20">
            <p className="font-inter font-medium text-[10px] tracking-[4px] uppercase text-[#AFD9F2] mb-6 md:mb-8">預約製衣</p>
            <h2 className="font-shippori text-[36px] md:text-[52px] tracking-[-0.5px] leading-[1.1] mb-6 md:mb-8">
              <span className="text-white">預約前往</span><br />
              <span className="text-[#D4C6FC]">曙溫 SUUN 工作室</span>
            </h2>
            <div className="font-inter font-light text-[14px] leading-[1.8] text-[rgba(255,255,255,0.5)] mb-8 md:mb-10">
              <p>工作室地址：台北市中正區汀州路二段177號</p>
              <p>開放時間：時段採預約制</p>
            </div>
            <BookingForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
