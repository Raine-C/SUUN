'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FBF9FF]/95 backdrop-blur-sm border-b border-[#BFB2E3]/50'
          : 'bg-[#FBF9FF] border-b border-[#BFB2E3]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto h-full px-16 flex items-center justify-between">

        {/* Left nav links */}
        <div className="flex items-center gap-10">
          <Link href="/works" className="nav-link">訂製展示</Link>
          <Link href="/#process" className="nav-link">訂製流程</Link>
          <Link href="/#about" className="nav-link">關於曙溫</Link>
        </div>

        {/* Center logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-[3px]">
          <span
            className="font-cormorant text-2xl tracking-[4px] uppercase text-[#01002D]"
            style={{ fontWeight: 600, fontStyle: 'italic', lineHeight: '24px' }}
          >
            SUUN
          </span>
          <span
            className="font-inter text-[9px] tracking-[3px] uppercase text-[#BFB2E3]"
            style={{ fontWeight: 500, fontStyle: 'italic' }}
          >
            Bespoke Tailors · TAIPEI
          </span>
        </Link>

        {/* Right nav links */}
        <div className="flex items-center gap-10">
          <Link href="/journal" className="nav-link">職人誌</Link>
          <Link
            href="/#booking"
            className="nav-link border-b border-[#D4C6FC] pb-[2px]"
          >
            預約製衣
          </Link>
        </div>
      </div>
    </nav>
  )
}
