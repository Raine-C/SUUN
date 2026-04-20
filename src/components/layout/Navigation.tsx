'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#FBF9FF]/95 backdrop-blur-sm' : 'bg-[#FBF9FF]'} border-b border-[#BFB2E3]`}>
      <div className="max-w-[1440px] mx-auto h-20 px-4 md:px-16 flex items-center justify-between relative">
        {/* Desktop left */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/works" className="nav-link">訂製展示</Link>
          <Link href="/#process" className="nav-link">訂製流程</Link>
          <Link href="/#about" className="nav-link">關於曙溫</Link>
        </div>

        {/* Logo */}
        <Link href="/" className="md:absolute md:left-1/2 md:-translate-x-1/2 flex flex-col items-center gap-[3px]">
          <span className="font-cormorant text-2xl tracking-[4px] uppercase text-[#01002D] font-semibold italic">SUUN</span>
          <span className="font-inter text-[9px] tracking-[3px] uppercase text-[#BFB2E3] font-medium italic">Bespoke Tailors · TAIPEI</span>
        </Link>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/journal" className="nav-link">職人誌</Link>
          <Link href="/#booking" className="nav-link border-b border-[#D4C6FC] pb-[2px]">預約製衣</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-[#01002D] transition-all duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#01002D] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#01002D] transition-all duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#FBF9FF] border-t border-[#BFB2E3] px-6 py-6 flex flex-col gap-5">
          {[['訂製展示', '/works'], ['訂製流程', '/#process'], ['關於曙溫', '/#about'], ['職人誌', '/journal'], ['預約製衣', '/#booking']].map(([label, href]) => (
            <Link key={href} href={href} className="nav-link" onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}
