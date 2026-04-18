import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedWorks, getRecentArticles } from '@/lib/contentful'

export default async function HomePage() {
  // Try to fetch from Contentful, fall back to placeholder if not configured
  let featuredWorks = []
  let recentArticles = []

  try {
    featuredWorks = await getFeaturedWorks()
    recentArticles = await getRecentArticles(2)
  } catch {
    // Contentful not yet configured — use placeholders
  }

  return (
    <>
      <Navigation />
      <main>

        {/* ── Hero Section ───────────────────────────────────────────── */}
        <section className="relative h-screen min-h-[900px] bg-[#1C1A17] overflow-hidden">
          {/* Background image placeholder - replace with actual hero image from Contentful */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(15,14,12,0.85)]" />

          {/* Hero content */}
          <div className="absolute bottom-[12%] left-20 max-w-[590px]">
            <div className="mb-10">
              <h1 className="font-cormorant font-light text-[64px] leading-[1.05] tracking-[-1px] text-white">
                Dressed for<br />
                <em className="text-[#D4C5FC] not-italic" style={{ fontStyle: 'italic' }}>every chapter</em><br />
                of your story
              </h1>
            </div>
            <p className="font-inter font-light text-[14px] leading-[1.8] text-[rgba(255,255,255,0.55)] mb-10 max-w-[340px]">
              Each suit begins with a conversation and ends with a garment that is entirely, irreducibly yours.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/#booking" className="btn-suun-primary inline-block">
                Begin Your Commission
              </Link>
              <Link href="/works" className="btn-suun-outline inline-block">
                View Collection
              </Link>
            </div>
          </div>
        </section>

        {/* ── Collection Preview ─────────────────────────────────────── */}
        <section className="bg-[#FBF9FF] px-16 py-12">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="suun-label mb-3">AW 2026</p>
              <h2 className="font-shippori text-[52px] tracking-[-0.5px] text-[#01002D] leading-[1.1]">
                訂製展示
              </h2>
            </div>
            <Link
              href="/works"
              className="font-inter font-medium text-[11px] tracking-[2px] uppercase text-[#5F5971] border-b border-[#D4C6FC] pb-[2px] hover:text-[#030074] transition-colors"
            >
              查看所有訂製
            </Link>
          </div>

          {/* Works grid */}
          <div className="grid grid-cols-3 gap-0">
            {featuredWorks.length > 0 ? (
              featuredWorks.map((work) => (
                <Link key={work.id} href={`/works/${work.slug}`} className="group relative overflow-hidden">
                  <div className="relative aspect-[3/4] bg-[#D9D9EC]">
                    {work.heroImageUrl && (
                      <Image
                        src={work.heroImageUrl}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    {/* Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[rgba(3,0,129,0.75)] to-transparent px-7 py-8 flex flex-col justify-end gap-1">
                      <p className="font-cormorant text-[22px] tracking-[0.5px] text-[#FBF9FF]">{work.title}</p>
                      <p className="font-inter font-normal text-[11px] tracking-[2px] uppercase text-[#D9D9EC]">{work.subtitle}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // Placeholder cards
              ['The Savile', 'The Mayfair', 'The Alderton'].map((name, i) => (
                <div key={i} className="relative overflow-hidden">
                  <div className="relative aspect-[3/4] bg-[#D9D9EC]">
                    <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[rgba(3,0,129,0.75)] to-transparent px-7 py-8 flex flex-col justify-end gap-1">
                      <p className="font-cormorant text-[22px] tracking-[0.5px] text-[#FBF9FF]">{name}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ── Brand Story / About ────────────────────────────────────── */}
        <section id="about" className="grid grid-cols-2 min-h-[1054px]">
          {/* Left: image */}
          <div className="relative bg-[#1C1A17] overflow-hidden">
            <div className="absolute inset-0 bg-[#030081] opacity-20" />
            {/* Placeholder for studio image */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1C1A17] to-[#030081]" />
          </div>

          {/* Right: text */}
          <div id="fabric" className="bg-[#F2EDFE] flex flex-col justify-center px-20 py-24">
            <p className="suun-label mb-6">職人製</p>
            <h2 className="font-shippori text-[52px] tracking-[-0.5px] text-[#01002D] leading-[1.1] mb-10">
              如何挑選適合的布料
            </h2>
            <div className="space-y-6 text-[#3D4C55] font-inter font-light text-[14px] leading-[1.9] max-w-[400px]">
              <p>
                For over a century, we have believed that true tailoring is not merely about clothing the body — it is about expressing the self. Every seam, every stitch, every grain of cloth is chosen with the singular aim of creating something that feels as natural as a second skin.
              </p>
              <p>
                We do not follow trends. We set a standard that outlasts them.
              </p>
            </div>
          </div>
        </section>

        {/* ── Process Section ────────────────────────────────────────── */}
        <section id="process" className="bg-[#D9D9EC] px-16 py-28">
          <div className="text-center mb-20">
            <p className="suun-label mb-4">訂製流程</p>
            <h2 className="font-shippori text-[52px] tracking-[-0.5px] text-[#01002D] mb-4">
              量身訂做<br />個人風格
            </h2>
            <p className="font-inter font-light text-[14px] text-[#030074]">
              一套完整西裝訂製時間，平均需要 8–12 週完成。
            </p>
          </div>

          <div className="grid grid-cols-4 gap-8">
            {[
              { num: 'I', title: '需求諮詢', desc: 'We begin with a private consultation to understand your style, lifestyle, and every occasion the suit must serve.' },
              { num: 'II', title: '尺寸量身', desc: 'Browse our exclusive cloth room and select from over 3,000 rolls, with guidance from your personal tailor.' },
              { num: 'III', title: '布料挑選', desc: 'Your suit is cut and refined across three meticulous fittings until every line and drape is flawless.' },
              { num: 'IV', title: '試衣調整', desc: 'Hand-finished with horn buttons and your personal label, your suit is delivered in our signature garment case.' },
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

        {/* ── Brand Quote ────────────────────────────────────────────── */}
        <section className="bg-[#FBF9FF] py-28 text-center">
          <blockquote className="font-shippori text-[42px] tracking-[-0.5px] text-[#01002D] leading-[1.3] mb-12">
            | 如長夜後的曙光，帶來溫暖和希望 |
          </blockquote>
          <p className="font-shippori text-[16px] leading-[2] text-[#01002D] max-w-[580px] mx-auto mb-8">
            曙溫，源自我的名字敘恩的台語 Suun，曙光與溫度的意象，期許品牌能陪伴處在長夜的人，一起走到看見曙光和希望的時候。
          </p>
          <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#3D4C55]">EvAn Huang</p>
          <p className="font-inter font-medium text-[12px] tracking-[2px] uppercase text-[#D4C6FC] mt-1">曙溫 SUUN 主理人</p>
        </section>

        {/* ── Booking Section ────────────────────────────────────────── */}
        <section id="booking" className="grid grid-cols-2 min-h-[732px]">
          {/* Left: image */}
          <div className="relative bg-[#030081] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#030081] to-[#01002D]" />
          </div>

          {/* Right: form */}
          <div className="bg-[#01002D] flex flex-col justify-center px-20 py-20">
            <p className="font-inter font-medium text-[10px] tracking-[4px] uppercase text-[#AFD9F2] mb-8">
              預約製衣
            </p>
            <h2 className="font-shippori text-[52px] tracking-[-0.5px] leading-[1.1] mb-8">
              <span className="text-white">預約前往</span><br />
              <span className="text-[#D4C6FC]">曙溫 SUUN 工作室</span>
            </h2>
            <div className="font-inter font-light text-[14px] leading-[1.8] text-[rgba(255,255,255,0.5)] mb-10 whitespace-nowrap">
              <p>工作室地址：台北市中正區同安街 110 號</p>
              <p>開放時間：星期一~星期六，10:00~17:00</p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="希望怎麼稱呼"
                className="input-dark w-full"
              />
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="email"
                  placeholder="Email"
                  className="input-dark"
                />
                <input
                  type="text"
                  placeholder="諮詢項目"
                  className="input-dark"
                />
              </div>
              <input
                type="text"
                placeholder="拜訪工作室日期"
                className="input-dark w-full"
              />
              <button
                type="submit"
                className="btn-suun-primary w-full text-center cursor-pointer"
              >
                送出預約
              </button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
