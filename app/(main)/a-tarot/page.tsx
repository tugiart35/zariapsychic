/*
  Tarot Sayfası - Profesyonel Tarot Açılımları
  Bu sayfa kullanıcıların farklı tarot açılımlarını seçebileceği ve
  kart çekebileceği ana tarot sayfasıdır. Mobil uyumlu tasarım.
*/

'use client'

import { useState } from 'react'
import BottomNavigation from '@/components/layout/BottomNavigation'
import { drawCardsForSpread, interpretReading, TarotCard } from '@/lib/a-tarot-helpers'

// Tarot açılım türleri
const tarotSpreads = [
  {
    id: 'daily',
    name: 'Daily Guidance',
    description: 'Single card for today\'s energy and focus',
    cardCount: 1,
    isActive: true
  },
  {
    id: 'past-present-future',
    name: 'Past, Present, Future',
    description: 'Three card reading for time perspective',
    cardCount: 3,
    isActive: false
  },
  {
    id: 'love-triangle',
    name: 'Love Triangle',
    description: 'Relationship insights and guidance',
    cardCount: 3,
    isActive: false
  },
  {
    id: 'career-path',
    name: 'Career Path',
    description: 'Professional guidance and opportunities',
    cardCount: 4,
    isActive: false
  },
  {
    id: 'celtic-cross',
    name: 'Celtic Cross',
    description: 'Complete life situation analysis',
    cardCount: 10,
    isActive: false
  },
  {
    id: 'horseshoe',
    name: 'Horseshoe Spread',
    description: 'Seven card spread for life guidance',
    cardCount: 7,
    isActive: false
  }
]

export default function TarotPage() {
  const [selectedSpread, setSelectedSpread] = useState('daily')
  const [isReading, setIsReading] = useState(false)
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([])
  const [interpretation, setInterpretation] = useState<string>('')

  const handleStartReading = async () => {
    setIsReading(true)
    
    try {
      // Kartları çek
      const cards = drawCardsForSpread(selectedSpread)
      setDrawnCards(cards)
      
      // Yorumla
      const reading = interpretReading(cards, selectedSpread)
      setInterpretation(reading)
      
      // Animasyon için biraz bekle
      setTimeout(() => {
        setIsReading(false)
      }, 2000)
      
    } catch (error) {
      console.error('Tarot okuma hatası:', error)
      setIsReading(false)
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
            Bir açılım seçerek yolculuğuna başla
          </p>
        </div>

        {/* Açılım seçenekleri - yatay scroll */}
        <div className="mb-8">
          <div className="flex space-x-3 overflow-x-auto pb-4">
            {tarotSpreads.map((spread) => (
              <button
                key={spread.id}
                onClick={() => setSelectedSpread(spread.id)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedSpread === spread.id 
                    ? 'bg-amber-500 text-slate-900' 
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }
                `}
              >
                {spread.name}
              </button>
            ))}
          </div>
        </div>

        {/* Seçili açılım detayları */}
        {tarotSpreads.map((spread) => (
          spread.id === selectedSpread && (
            <div key={spread.id} className="mb-8">
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-3">
                  {spread.name}
                </h2>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {spread.description}
                </p>
                
                {/* Kart görsel alanı */}
                <div className="relative mb-6">
                  <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center border border-slate-600">
                    {isReading ? (
                      <div className="text-center">
                        <div className="animate-pulse">
                          <div className="w-16 h-24 bg-amber-500/40 border-2 border-amber-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <span className="text-2xl">✨</span>
                          </div>
                        </div>
                        <p className="text-amber-400 text-sm font-medium">
                          Kartın çekiliyor...
                        </p>
                      </div>
                    ) : drawnCards.length > 0 ? (
                      <div className="flex items-center justify-center space-x-4">
                        {drawnCards.map((card, index) => (
                          <div key={card.id} className="text-center">
                            <div className="w-16 h-24 bg-amber-500/20 border-2 border-amber-500 rounded-lg flex items-center justify-center mb-2">
                              <span className="text-xl">🃏</span>
                            </div>
                            <p className="text-amber-400 text-xs font-medium">
                              {card.nameTr}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-24 bg-amber-500/20 border-2 border-amber-500/40 rounded-lg mx-auto mb-4 flex items-center justify-center">
                          <span className="text-2xl">🃏</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Kartın burada görünecek
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Açılım bilgileri */}
                <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
                  <h3 className="text-amber-400 font-semibold mb-3">
                    Açılım Bilgileri
                  </h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Kart Sayısı</p>
                      <p className="text-white font-semibold">{spread.cardCount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Zorluk</p>
                      <p className="text-white font-semibold">
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                          Beginner
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        ))}

                 {/* Yorum alanı */}
        {interpretation && !isReading && (
          <div className="mb-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-amber-400 font-semibold mb-4">
                Kart Yorumu
              </h3>
              <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {interpretation}
              </div>
            </div>
          </div>
        )}

        {/* Okumaya başla butonu */}
        <div className="mb-8">
          <button
            onClick={handleStartReading}
            disabled={isReading}
            className={`
              w-full rounded-xl p-4 text-center font-semibold transition-all duration-300
              ${isReading 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-900 hover:from-amber-500 hover:to-amber-400'
              }
            `}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>{isReading ? 'Okuma Devam Ediyor...' : drawnCards.length > 0 ? 'Yeni Okuma' : 'Okumaya Başla'}</span>
              <span>{isReading ? '⏳' : '✨'}</span>
            </div>
          </button>
        </div>

      </main>

      {/* Alt navigasyon */}
      <BottomNavigation />
    </div>
  )
}
