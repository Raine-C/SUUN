import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative border-t border-[#1E1D19] bg-[#0F0E0C] overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F0E0C] to-[#01002D] opacity-90" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-16 pt-20 pb-10">
        {/* Main footer content */}
        <div className="grid grid-cols-4 gap-8 pb-16">

          {/* Brand column */}
          <div className="col-span-1">
            <p className="font-shippori text-[28px] tracking-[4px] uppercase text-[#FBF9FF] mb-3">
              SUUN
            </p>
            <p className="font-inter text-[11px] tracking-[3px] uppercase text-[#AFD9F2] mb-5">
              Est. 2019 · 手工訂製西服 · TAIPEI
            </p>
            <p className="font-inter font-light text-[13px] leading-[22px] text-[#FBF9FF]">
              如長夜後的曙光，帶來溫暖和希望
            </p>
          </div>

          {/* 服務項目 */}
          <div>
            <p className="font-inter font-medium text-[10px] tracking-[3px] uppercase text-[#AFD9F2] mb-6">
              服務項目
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/works" className="font-inter font-light text-[13px] text-[#FBF9FF] hover:text-[#AFD9F2] transition-colors">
                訂製展示
              </Link>
              <Link href="/#process" className="font-inter font-light text-[13px] text-[#FBF9FF] hover:text-[#AFD9F2] transition-colors">
                訂製流程
              </Link>
              <Link href="/journal" className="font-inter font-light text-[13px] text-[#FBF9FF] hover:text-[#AFD9F2] transition-colors">
                職人誌
              </Link>
            </div>
          </div>

          {/* 關於曙溫 */}
          <div>
            <p className="font-inter font-medium text-[10px] tracking-[3px] uppercase text-[#AFD9F2] mb-6">
              關於曙溫
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/#about" className="font-inter font-light text-[13px] text-[#FBF9FF] hover:text-[#AFD9F2] transition-colors">
                品牌故事
              </Link>
              <Link href="/#fabric" className="font-inter font-light text-[13px] text-[#FBF9FF] hover:text-[#AFD9F2] transition-colors">
                布料附料
              </Link>
              <Link href="/#reviews" className="font-inter font-light text-[13px] text-[#FBF9FF] hover:text-[#AFD9F2] transition-colors">
                客戶反饋
              </Link>
            </div>
          </div>

          {/* 工作室 */}
          <div>
            <p className="font-inter font-medium text-[10px] tracking-[3px] uppercase text-[#AFD9F2] mb-6">
              工作室
            </p>
            <div className="flex flex-col gap-3">
              <p className="font-inter font-light text-[13px] text-[#FBF9FF]">
                台北市中正區同安街110號
              </p>
              <div>
                <p className="font-inter font-light text-[13px] text-[#FBF9FF]">Google Map 搜尋</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter font-medium text-[13px] text-[#FBF9FF] hover:text-[#AFD9F2] transition-colors"
                >
                  曙温 SUUN e DESIGN 西裝西服訂製
                </a>
              </div>
              <a
                href="mailto:contact@suun.tw"
                className="font-inter font-light text-[13px] text-[#FBF9FF] hover:text-[#AFD9F2] transition-colors"
              >
                Contact SUUN
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(251,249,255,0.3)] pt-5 flex items-center justify-between">
          <p className="font-inter text-[12px] text-[#F7FBFE]">
            © 2026 SUUN E DESIGN. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="font-inter text-[12px] text-[#F7FBFE] hover:text-[#AFD9F2] transition-colors">Facebook</a>
            <a href="#" className="font-inter text-[12px] text-[#F7FBFE] hover:text-[#AFD9F2] transition-colors">Instagram</a>
            <a href="#" className="font-inter text-[12px] text-[#F7FBFE] hover:text-[#AFD9F2] transition-colors">Threads</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
