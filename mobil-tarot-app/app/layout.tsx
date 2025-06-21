/*
  Ana Layout Dosyası
  Bu dosya tüm sayfaların ortak yapısını belirler.
  Metadata, font ayarları ve genel HTML yapısı burada tanımlanır.
*/

import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mystik Tarot - Ruhani Rehberlik',
  description: 'Tarot kartları ve numeroloji ile ruhani rehberlik. Geleceğinizi keşfedin, iç sesinizi dinleyin.',
  keywords: 'tarot, numeroloji, falcılık, ruhani, rehberlik, mistik',
  authors: [{ name: 'Mystik Tarot' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#6366f1',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="tr" className="h-full">
      <head>
        {/* Mobil uyumluluk için viewport ayarları */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        {/* PWA desteği için manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="h-full overflow-x-hidden">
        {/* Ana içerik wrapper - mobil öncelikli */}
        <div className="min-h-full flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
