import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { getWorkBySlug, getAllWorks } from '@/lib/contentful'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const works = await getAllWorks()
    return works.map((w) => ({ slug: w.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const work = await getWorkBySlug(slug)
    if (!work) return { title: '作品' }
    const f = work.fields as Record<string, unknown>
    return { title: String(f.title ?? '作品') }
  } catch {
    return { title: '作品' }
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params

  let title = 'The Savile'
  let subtitle = 'Two-button Lounge Suit'
  let season = 'AW 2026'
  let fabric = 'Loro Piana Super 150s'
  let fabricOrigin = '義大利 Biella'
  let cut = 'Slim English'
  let heroImageUrl = ''

  try {
    const work = await getWorkBySlug(slug)
    if (!work) notFound()
    const f = work.fields as Record<string, unknown>
    title = String(f.title ?? title)
    subtitle = String(f.subtitle ?? subtitle)
    season = String(f.season ?? season)
    fabric = String(f.fabric ?? fabric)
    fabricOrigin = String(f.fabricOrigin ?? fabricOrigin)
    cut = String(f.cut ?? cut)
    const img = f.heroImage as { fields?: { file?: { url?: string } } } | undefined
    const url = img?.fields?.file?.url ?? ''
    heroImageUrl = url ? (url.startsWith('//') ? `https:${url}` : url) : ''
  } catch {
    // use defaults
  }

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <section className="grid grid-cols-2 min-h-[866px]">
          <div className="relative bg-[#D9D9EC] overflow-hidden">
            {heroImageUrl
              ? <Image src={heroImageUrl} alt={title} fill className="object-cover" />
              : <div className="absolute inset-0 bg-gradient-to-b from-[#D9D9EC] to-[#BFB2E3]" />
            }
            <div className="absolute top-8 left-8 px-3 py-1 bg-[rgba(251,249,255,0.9)]">
              <span className="font-inter font-medium text-[10px] tracking-[2px] uppercase text-[#01002D]">{season}</span>
            </div>
          </div>
          <div className="bg-[#FBF9FF] flex flex-col justify-center px-20 py-16">
            <p className="suun-label mb-5">訂製西裝 · Bespoke</p>
            <h1 className="font-cormorant font-light text-[56px] tracking-[-0.5px] text-[#01002D] mb-3">{title}</h1>
            <p className="font-inter text-[13px] tracking-[1.5px] uppercase text-[#9EC3DA] mb-10">{subtitle}</p>
            <div className="w-12 h-[1px] bg-[#D4C6FC] mb-10" />
            <div className="font-inter font-light text-[14px] leading-[1.9] text-[#3D4C55] max-w-[400px] mb-10">
              <p>A masterwork of understated precision. {title} is constructed using traditional Savile Row methods adapted for the modern discerning gentleman.</p>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 border border-[#D9D9EC] p-8 mb-10">
              {[['布料 Fabric', fabric], ['產地 Origin', fabricOrigin], ['版型 Cut', cut], ['季節', '全年 All Season']].map(([label, value]) => (
                <div key={label}>
                  <p className="font-inter text-[10px] tracking-[1.5px] uppercase text-[#9EC3DA] mb-2">{label}</p>
                  <p className="font-inter font-medium text-[14px] text-[#01002D]">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/#booking" className="btn-primary block text-center w-full">預約訂製 — Begin Your Commission</Link>
              <Link href="/#booking" className="block text-center py-4 font-inter font-medium text-[11px] tracking-[2px] uppercase text-[#5F5971] hover:text-[#030074] transition-colors">諮詢詳情 Enquire</Link>
              <p className="text-center font-inter font-light text-[12px] text-[#9EC3DA]">每件均為個人手工訂製 · Every piece is made exclusively for you</p>
            </div>
          </div>
        </section>

        <section className="bg-[#D9D9EC] py-24 text-center">
          <p className="suun-label mb-4">職人製</p>
          <h2 className="font-shippori text-[64px] tracking-[-0.5px] leading-[1.1] text-[#01002D] mb-10">開始你的<br />{title} 訂製旅程</h2>
          <div className="flex items-center justify-center gap-8">
            <Link href="/#booking" className="btn-primary">預約訂製諮詢 · Book a Consultation</Link>
            <Link href="/works" className="font-inter font-medium text-[11px] tracking-[2px] uppercase text-[#5F5971] hover:text-[#030074] transition-colors">瀏覽其他作品</Link>
          </div>
          <p className="font-inter font-light text-[13px] text-[#9EC3DA] mt-8">工作室地址：台北市中正區同安街 110 號 · 星期一~星期六 10:00–17:00</p>
        </section>
      </main>
      <Footer />
    </>
  )
}
