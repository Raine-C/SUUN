import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { getWorkBySlug, getAllWorks } from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  try {
    const works = await getAllWorks()
    return works.map((w) => ({ slug: w.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const work = await getWorkBySlug(params.slug)
    if (!work) return { title: '作品' }
    return {
      title: work.fields.title,
      description: `${work.fields.title} — ${work.fields.subtitle}，${work.fields.fabric}，${work.fields.season}`,
    }
  } catch {
    return { title: '作品' }
  }
}

export default async function WorkDetailPage({ params }: { params: { slug: string } }) {
  let work = null
  let description = null

  try {
    work = await getWorkBySlug(params.slug)
    if (!work) notFound()
    description = work.fields.description
      ? documentToReactComponents(work.fields.description as Parameters<typeof documentToReactComponents>[0])
      : null
  } catch {
    // Show placeholder UI if Contentful not configured
  }

  // Fallback placeholder data for preview
  const title = work?.fields.title ?? 'The Savile'
  const subtitle = work?.fields.subtitle ?? 'Two-button Lounge Suit'
  const season = work?.fields.season ?? 'AW 2026'
  const fabric = work?.fields.fabric ?? 'Loro Piana Super 150s'
  const fabricOrigin = work?.fields.fabricOrigin ?? '義大利 Biella'
  const cut = work?.fields.cut ?? 'Slim English'
  const heroImageUrl = (work?.fields.heroImage as { fields?: { file?: { url?: string } } } | undefined)?.fields?.file?.url
    ? `https:${(work.fields.heroImage as { fields: { file: { url: string } } }).fields.file.url}`
    : null

  return (
    <>
      <Navigation />
      <main className="pt-20">

        {/* ── Hero: Product + Details ──────────────────────────────── */}
        <section className="grid grid-cols-2 min-h-[866px]">

          {/* Left: hero image */}
          <div className="relative bg-[#D9D9EC] overflow-hidden">
            {heroImageUrl ? (
              <Image src={heroImageUrl} alt={title} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-[#D9D9EC] to-[#BFB2E3]" />
            )}
            {/* Season badge */}
            <div className="absolute top-8 left-8 px-3 py-1 bg-[rgba(251,249,255,0.9)]">
              <span className="font-inter font-medium text-[10px] tracking-[2px] uppercase text-[#01002D]">{season}</span>
            </div>
          </div>

          {/* Right: product info */}
          <div className="bg-[#FBF9FF] flex flex-col justify-center px-20 py-16">
            <p className="suun-label mb-5">訂製西裝 · Bespoke</p>

            <h1 className="font-cormorant font-light text-[56px] tracking-[-0.5px] text-[#01002D] mb-3">
              {title}
            </h1>

            <p className="font-inter font-normal text-[13px] tracking-[1.5px] uppercase text-[#9EC3DA] mb-10">
              {subtitle}
            </p>

            {/* Divider */}
            <div className="w-12 h-[1px] bg-[#D4C6FC] mb-10" />

            {/* Description */}
            <div className="font-inter font-light text-[14px] leading-[1.9] text-[#3D4C55] max-w-[400px] mb-10">
              <p>A masterwork of understated precision. {title} is constructed using traditional Savile Row methods adapted for the modern discerning gentleman.</p>
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 border border-[#D9D9EC] p-8 mb-10">
              <div>
                <p className="font-inter text-[10px] tracking-[1.5px] uppercase text-[#9EC3DA] mb-2">布料 Fabric</p>
                <p className="font-inter font-medium text-[14px] text-[#01002D]">{fabric}</p>
              </div>
              <div>
                <p className="font-inter text-[10px] tracking-[1.5px] uppercase text-[#9EC3DA] mb-2">產地 Origin</p>
                <p className="font-inter font-medium text-[14px] text-[#01002D]">{fabricOrigin}</p>
              </div>
              <div>
                <p className="font-inter text-[10px] tracking-[1.5px] uppercase text-[#9EC3DA] mb-2">版型 Cut</p>
                <p className="font-inter font-medium text-[14px] text-[#01002D]">{cut}</p>
              </div>
              <div>
                <p className="font-inter text-[10px] tracking-[1.5px] uppercase text-[#9EC3DA] mb-2">季節</p>
                <p className="font-inter font-medium text-[14px] text-[#01002D]">全年 All Season</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4">
              <Link href="/#booking" className="btn-suun-primary block text-center w-full">
                預約訂製 — Begin Your Commission
              </Link>
              <Link href="/#booking" className="block text-center py-4 font-inter font-medium text-[11px] tracking-[2px] uppercase text-[#5F5971] hover:text-[#030074] transition-colors">
                諮詢詳情 Enquire
              </Link>
              <p className="text-center font-inter font-light text-[12px] text-[#9EC3DA]">
                每件均為個人手工訂製 · Every piece is made exclusively for you
              </p>
            </div>
          </div>
        </section>

        {/* ── Craftsmanship Section ────────────────────────────────── */}
        <section className="grid grid-cols-2 min-h-[1000px] px-16 py-28">

          {/* Left: text */}
          <div className="pr-20">
            <p className="suun-label mb-6">工藝細節 Craftsmanship</p>
            <h2 className="font-shippori text-[52px] tracking-[-0.5px] leading-[1.2] text-[#01002D] mb-8">
              每一針，<br />都是承諾
            </h2>
            <div className="font-inter font-light text-[14px] leading-[1.9] text-[#3D4C55] mb-6">
              <p>{title} is constructed using traditional Savile Row methods, adapted for the modern gentleman who demands both refinement and practicality.</p>
            </div>
            <div className="font-inter font-light text-[14px] leading-[1.9] text-[#3D4C55] mb-12">
              <p>We source our canvases from Italy, our linings from France, and our buttons from the finest natural horn suppliers in the world.</p>
            </div>

            {/* Process steps */}
            <div className="space-y-8">
              {[
                { num: '01', title: '第一道工法', desc: 'Horsehair and linen canvas sewn directly to the chest piece, creating a living structure that molds to the wearer over time.' },
                { num: '02', title: '第二道工法', desc: 'Each lapel is hand-rolled and padded by our master tailors, giving it the distinctive soft roll that defines a true bespoke garment.' },
                { num: '03', title: '第三道工法', desc: 'Natural horn buttons, each unique in grain and tone, hand-sewn with a shank to ensure they sit correctly for decades.' },
                { num: '04', title: '第四道工法', desc: 'Each suit carries a personal label embroidered with your name and the date of completion — a mark of provenance.' },
              ].map((step) => (
                <div key={step.num} className="flex gap-6 pb-8 border-b border-[#D9D9EC] last:border-0">
                  <span className="font-cormorant text-[22px] text-[#9EC3DA] shrink-0 w-8">{step.num}</span>
                  <div>
                    <h4 className="font-inter font-medium text-[15px] text-[#01002D] mb-2">{step.title}</h4>
                    <p className="font-inter font-light text-[13px] leading-[1.8] text-[#3D4C55]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: detail images */}
          <div className="grid grid-rows-2 gap-4 pl-4">
            <div className="relative bg-[#D9D9EC] overflow-hidden" />
            <div className="relative bg-[#BFB2E3] overflow-hidden" />
          </div>
        </section>

        {/* ── Rich Text / Story ────────────────────────────────────── */}
        {description && (
          <section className="bg-[#FBF9FF] py-20">
            <div className="max-w-[720px] mx-auto px-8 prose prose-stone">
              {description}
            </div>
          </section>
        )}

        {/* ── CTA Section ──────────────────────────────────────────── */}
        <section className="bg-[#D9D9EC] py-24 text-center">
          <p className="suun-label mb-4">職人製</p>
          <h2 className="font-shippori text-[64px] tracking-[-0.5px] leading-[1.1] text-[#01002D] mb-6">
            開始你的<br />{title} 訂製旅程
          </h2>
          <p className="font-inter font-light text-[14px] leading-[1.8] text-[#3D4C55] max-w-[500px] mx-auto mb-12">
            每件 {title} 都從一次私密的面談開始。我們會了解你的生活方式、穿著場合，以及你對這件西裝的一切期待。
          </p>
          <div className="flex items-center justify-center gap-8">
            <Link href="/#booking" className="btn-suun-primary inline-block">
              預約訂製諮詢 · Book a Consultation
            </Link>
            <Link href="/works" className="font-inter font-medium text-[11px] tracking-[2px] uppercase text-[#5F5971] hover:text-[#030074] transition-colors">
              瀏覽其他作品
            </Link>
          </div>
          <p className="font-inter font-light text-[13px] text-[#9EC3DA] mt-8">
            工作室地址：台北市中正區同安街 110 號 · 星期一~星期六 10:00–17:00
          </p>
        </section>

      </main>
      <Footer />
    </>
  )
}
