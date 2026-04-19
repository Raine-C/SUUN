import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'SUUN 曙溫 — 手工訂製西服 · 台北', template: '%s — SUUN 曙溫' },
  description: '台北手工訂製西服品牌，每件西裝從布料選擇到最後縫製，皆親力親為。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  )
}
