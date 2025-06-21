/*
  Ana Sayfa Bileşeni - Profesyonel Tarot Uygulaması Tasarımı
  Bu sayfa uygulamanın giriş noktasıdır. Kullanıcıları karşılayan profesyonel
  tarot temalı mobil uyumlu ana sayfa tasarımını içerir.
*/

import BottomNavigation from '@/components/layout/BottomNavigation'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Ana içerik alanı */}
      <main className="flex-1 px-6 py-8">
        
        {/* Üst başlık ve logo */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">✨</div>
          <h1 className="text-2xl font-bold text-amber-400 mb-2">
            büşbüşkimki
          </h1>
          <p className="text-gray-400 text-sm">
            Discover your path through the cards
          </p>
        </div>

        {/* Karşılama kartı */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-8">
          <h2 className="text-amber-400 text-lg font-semibold mb-3">
            Welcome to Your Journey
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            The cards hold ancient wisdom waiting to guide you. Choose a spread below to begin your reading.
          </p>
        </div>

        {/* Hızlı okuma seçenekleri */}
        <div className="mb-8">
          <h3 className="text-amber-400 text-lg font-semibold mb-4">
            Quick Readings
          </h3>
          
          <div className="space-y-4">
            {/* Günlük Rehberlik */}
            <Link href="/a-tarot" className="block">
              <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 flex items-center space-x-4 hover:bg-slate-700/30 transition-all duration-300">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <span className="text-amber-400">☀️</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">Daily Guidance</h4>
                  <p className="text-gray-400 text-sm">Single card for today's energy</p>
                  <p className="text-amber-400 text-xs font-medium">1 card</p>
                </div>
              </div>
            </Link>

            {/* Geçmiş, Şimdi, Gelecek */}
            <Link href="/a-tarot" className="block">
              <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 flex items-center space-x-4 hover:bg-slate-700/30 transition-all duration-300">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-purple-400">🌙</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">Past, Present, Future</h4>
                  <p className="text-gray-400 text-sm">Classic three-card reading</p>
                  <p className="text-purple-400 text-xs font-medium">3 cards</p>
                </div>
              </div>
            </Link>

            {/* Celtic Cross */}
            <Link href="/a-tarot" className="block">
              <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 flex items-center space-x-4 hover:bg-slate-700/30 transition-all duration-300">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400">⭐</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">Celtic Cross</h4>
                  <p className="text-gray-400 text-sm">Complete life situation analysis</p>
                  <p className="text-blue-400 text-xs font-medium">10 cards</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Tüm yayılımları görüntüle butonu */}
        <div className="mb-8">
          <Link href="/a-tarot" className="block">
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-xl p-4 text-center hover:from-amber-500 hover:to-amber-400 transition-all duration-300">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-slate-900 font-semibold">View All Spreads</span>
                <span className="text-slate-900">⭐</span>
              </div>
            </div>
          </Link>
        </div>

      </main>

      {/* Alt navigasyon */}
      <BottomNavigation />
    </div>
  )
}
