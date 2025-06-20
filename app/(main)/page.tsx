/*
  Ana Sayfa Bileşeni
  Bu sayfa uygulamanın giriş noktasıdır. Kullanıcıları karşılayan mistik tarot temalı
  mobil uyumlu ana sayfa tasarımını içerir. Bottom navigation ile birlikte çalışır.
*/

import BottomNavigation from '@/components/layout/BottomNavigation'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* Ana içerik alanı - bottom navigation için padding */}
      <main className="flex-1 px-4 py-6">
        
        {/* Karşılama başlığı */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            🔮 Mystik Tarot
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Ruhani rehberlik ve iç görü için
            <br />
            mistik dünyaya hoş geldiniz
          </p>
        </div>

        {/* Günlük mesaj kartı */}
        <div className="mystical-border bg-slate-800/50 p-6 mb-8 mystical-glow">
          <div className="text-center">
            <div className="text-3xl mb-3 floating">🌙</div>
            <h2 className="text-xl font-semibold mb-3 text-purple-300">
              Günün Mesajı
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              &quot;Evrenin sırları, sabırlı kalplerde açığa çıkar. 
              Bugün iç sesinizi dinleyin ve sezgilerinize güvenin.&quot;
            </p>
          </div>
        </div>

        {/* Hızlı erişim kartları */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {/* Tarot kartı */}
          <Link href="/a-tarot" className="block">
            <div className="mystical-border bg-gradient-to-r from-purple-900/50 to-indigo-900/50 p-6 card-hover">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">🃏</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-purple-300">
                    Tarot Falı
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Kartlarınızı çekin ve geleceğinizi keşfedin
                  </p>
                </div>
                <div className="text-purple-400">→</div>
              </div>
            </div>
          </Link>

          {/* Numeroloji kartı */}
          <Link href="/b-numerology" className="block">
            <div className="mystical-border bg-gradient-to-r from-indigo-900/50 to-blue-900/50 p-6 card-hover">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">🔢</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-blue-300">
                    Numeroloji
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Sayıların gizli anlamlarını öğrenin
                  </p>
                </div>
                <div className="text-blue-400">→</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Mistik öğeler */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 mystical-border bg-slate-800/30">
            <div className="text-2xl mb-2">⭐</div>
            <p className="text-xs text-gray-400">Burçlar</p>
          </div>
          <div className="text-center p-4 mystical-border bg-slate-800/30">
            <div className="text-2xl mb-2">🌙</div>
            <p className="text-xs text-gray-400">Ay Fazları</p>
          </div>
          <div className="text-center p-4 mystical-border bg-slate-800/30">
            <div className="text-2xl mb-2">🔮</div>
            <p className="text-xs text-gray-400">Kristaller</p>
          </div>
        </div>

        {/* Motivasyon metni */}
        <div className="text-center">
          <p className="text-gray-400 text-sm italic">
            &quot;Her gün yeni bir başlangıçtır, 
            <br />
            her kart yeni bir fırsattır.&quot;
          </p>
        </div>

      </main>

      {/* Alt navigasyon */}
      <BottomNavigation />
    </div>
  )
}
