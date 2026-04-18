import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'SUUN 曙溫 — 手工訂製西服 · 台北',
    template: '%s — SUUN 曙溫',
  },
  description: '曙溫，台北手工訂製西服品牌。每件西裝從布料選擇到最後縫製，皆親力親為，為你打造獨一無二的訂製旅程。',
  keywords: ['訂製西裝', '手工西服', '台北', '曙溫', 'SUUN', 'Bespoke', '西裝訂製'],
  openGraph: {
    title: 'SUUN 曙溫 — 手工訂製西服 · 台北',
    description: '每件西裝從布料選擇到最後縫製，皆親力親為。',
    url: 'https://2026-suun.vercel.app',
    siteName: 'SUUN 曙溫',
    locale: 'zh_TW',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  )
}
