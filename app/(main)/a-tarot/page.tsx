/*
  Ana Tarot Sayfası - Modüler Tasarım
  Bu sayfa farklı tarot açılımları için özel bileşenleri dinamik olarak yükler.
  Her açılımın kendine özel tasarımı ve animasyonları vardır.
*/

'use client'

import { useState } from 'react'
import BottomNavigation from '@/components/layout/BottomNavigation'
import DailyGuidance from '@/components/specific/tarot/DailyGuidance'
import PastPresentFuture from '@/components/specific/tarot/PastPresentFuture'
import Celtics from '@/components/specific/tarot/Celtics'
import { TarotCard } from '@/lib/a-tarot-helpers'

// Tarot açılım türleri - modüler bileşenlerle
const tarotSpreads = [
  {
    id: 'daily',
    name: 'Daily Guidance',
    description: 'Single card for today\'s energy and focus',
    cardCount: 1,
    component: DailyGuidance,
    icon: '☀️',
    color: 'amber'
  },
  {
    id: 'past-present-future',
    name: 'Past, Present, Future',
    description: 'Three card reading for time perspective',
    cardCount: 3,
    component: PastPresentFuture,
    icon: '🌙',
    color: 'purple'
  },
  {
    id: 'love-triangle',
    name: 'Love Triangle',
    description: 'Relationship insights and guidance',
    cardCount: 3,
    component: null, // Henüz oluşturulmadı
    icon: '💖',
    color: 'pink'
  },
  {
    id: 'career-path',
    name: 'Career Path',
    description: 'Professional guidance and opportunities',
    cardCount: 4,
    component: null, // Henüz oluşturulmadı
    icon: '💼',
    color: 'blue'
  },
  {
    id: 'celtic-cross',
    name: 'Celtic Cross',
    description: 'Complete life situation analysis',
    cardCount: 10,
    component: Celtics,
    icon: '🔮',
    color: 'purple'
  }
]

export default function TarotPage() {
  const [selectedSpread, setSelectedSpread] = useState('daily')
  const [lastReading, setLastReading] = useState<{
    cards: TarotCard[]
    interpretation: string
    spreadId: string
  } | null>(null)

  const currentSpread = tarotSpreads.find(s => s.id === selectedSpread)
  const CurrentComponent = currentSpread?.component

  const handleReadingComplete = (cards: TarotCard[], interpretation: string) => {
    setLastReading({
      cards,
      interpretation,
      spreadId: selectedSpread
    })
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'amber':
        return 'bg-amber-500 text-slate-900'
      case 'purple':
        return 'bg-purple-500 text-white'
      case 'pink':
        return 'bg-pink-500 text-white'
      case 'blue':
        return 'bg-blue-500 text-white'
      case 'green':
        return 'bg-green-500 text-white'
      case 'purple':
        return 'bg-purple-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="flex flex-col min-h-screen pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Ana içerik alanı */}
      <main className="flex-1 px-6 py-8">
        
        {/* Üst başlık */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-amber-400 mb-2">
            Tarot Açılımları
          </h1>
          <p className="text-gray-400 text-sm">
            Bir açılım seçerek ruhani yolculuğuna başla
          </p>
        </div>

        {/* Açılım seçenekleri - yatay scroll */}
        <div className="mb-8">
          <div className="flex space-x-3 overflow-x-auto pb-4">
            {tarotSpreads.map((spread) => (
              <button
                key={spread.id}
                onClick={() => setSelectedSpread(spread.id)}
                disabled={!spread.component}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2
                  ${selectedSpread === spread.id 
                    ? getColorClasses(spread.color)
                    : spread.component 
                      ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' 
                      : 'bg-slate-800 text-gray-500 cursor-not-allowed opacity-50'
                  }
                `}
              >
                <span>{spread.icon}</span>
                <span>{spread.name}</span>
                {!spread.component && <span className="text-xs">(Yakında)</span>}
              </button>
            ))}
          </div>
          
          {/* Seçilen açılımın açılması yazısı */}
          {currentSpread && (
            <div className="text-left mt-3 px-2">
              <p className="text-gray-400 text-sm">
                {currentSpread.name} açılması
              </p>
            </div>
          )}
        </div>

        {/* Dinamik bileşen alanı */}
        <div className="mb-8">
          {CurrentComponent ? (
            <CurrentComponent onComplete={handleReadingComplete} />
          ) : currentSpread ? (
            // Henüz oluşturulmamış bileşenler için placeholder
            <div className="text-center py-16">
              <div className="text-6xl mb-4">{currentSpread.icon}</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {currentSpread.name}
              </h3>
              <p className="text-gray-400 mb-6">
                {currentSpread.description}
              </p>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <p className="text-amber-400 font-medium mb-2">
                  🚧 Bu açılım henüz geliştirilme aşamasında
                </p>
                <p className="text-gray-400 text-sm">
                  Yakında {currentSpread.cardCount} kartlık özel tasarımla sizlerle!
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Son okuma özeti */}
        {lastReading && lastReading.spreadId === selectedSpread && (
          <div className="mb-8">
            <div className="bg-slate-800/30 border border-slate-600 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <span className="text-amber-400 text-sm">📜</span>
                </div>
                <div>
                  <p className="text-amber-400 font-medium text-sm">Son Okuma</p>
                  <p className="text-gray-400 text-xs">
                    {lastReading.cards.length} kart çekildi
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {lastReading.cards.map((card, index) => (
                  <div key={card.id} className="text-center">
                    <div className="w-8 h-10 bg-amber-500/20 border border-amber-500/40 rounded text-xs flex items-center justify-center mb-1">
                      🃏
                    </div>
                    <p className="text-amber-400 text-xs truncate w-8">
                      {card.nameTr}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Alt navigasyon */}
      <BottomNavigation />
    </div>
  )
}
