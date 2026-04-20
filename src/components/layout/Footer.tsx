import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-[#0F0E0C] border-t border-[#1E1D19]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 md:pb-16">
          <div>
            <p className="font-shippori text-[28px] tracking-[4px] uppercase text-[#FBF9FF] mb-3">SUUN</p>
            <p className="font-inter text-[11px] tracking-[3px] uppercase text-[#AFD9F2] mb-5">Est. 2019 · 手工訂製西服 · TAIPEI</p>
            <p className="font-inter font-light text-[13px] leading-[22px] text-[#FBF9FF]">如長夜後的曙光，帶來溫暖和希望</p>
          </div>
          <div>
            <p className="font-inter font-medium text-[10px] tracking-[3px] uppercase text-[#AFD9F2] mb-6">服務項目</p>
            <div className="flex flex-col gap-3">
              {[['訂製展示', '/works'], ['訂製流程', '/#process'], ['職人誌', '/journal']].map(([label, href]) => (
                <Link key={href} href={href} className="font-inter font-light text-[13px] text-[#FBF9FF] hover:text-[#AFD9F2] transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-inter font-medium text-[10px] tracking-[3px] uppercase text-[#AFD9F2] mb-6">關於曙溫</p>
            <div className="flex flex-col gap-3">
              {[['品牌故事', '/#about'], ['布料附料', '/#fabric'], ['客戶反饋', '/#reviews']].map(([label, href]) => (
                <Link key={href} href={href} className="font-inter font-light text-[13px] text-[#FBF9FF] hover:text-[#AFD9F2] transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-inter font-medium text-[10px] tracking-[3px] uppercase text-[#AFD9F2] mb-6">工作室</p>
            <div className="flex flex-col gap-3">
              <p className="font-inter font-light text-[13px] text-[#FBF9FF]">台北市中正區同安街110號</p>
              <p className="font-inter font-light text-[13px] text-[#FBF9FF]">星期一~星期六 10:00–17:00</p>
            </div>
          </div>
        </div>
        <div className="border-t border-[rgba(251,249,255,0.3)] pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-[12px] text-[#F7FBFE]">© 2026 SUUN E DESIGN. All rights reserved.</p>
          <div className="flex items-center gap-8">
            {['Facebook', 'Instagram', 'Threads'].map((s) => (
              <a key={s} href="#" className="font-inter text-[12px] text-[#F7FBFE] hover:text-[#AFD9F2] transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
