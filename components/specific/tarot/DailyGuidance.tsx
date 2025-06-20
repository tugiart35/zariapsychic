/*
  Daily Guidance Tarot Bileşeni - Celtic Cross Spread
  Modern ve responsive tasarım ile hem web hem mobil uyumlu
  10 kartlı Celtic Cross yayılımı - Klasik tarot yayılımı
*/

'use client'

import { useState } from 'react'
import { drawCardsForSpread, interpretReading, TarotCard } from '@/lib/a-tarot-helpers'

interface DailyGuidanceProps {
  onComplete?: (cards: TarotCard[], interpretation: string) => void
}

export default function DailyGuidance({ onComplete }: DailyGuidanceProps) {
  const [isReading, setIsReading] = useState(false)
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([])
  const [interpretation, setInterpretation] = useState<string>('')
  const [showCards, setShowCards] = useState(false)

  const handleDrawCards = async () => {
    setIsReading(true)
    setShowCards(false)
    
    try {
      // 10 kart çek (Celtic Cross)
      const cards = drawCardsForSpread('celtic-cross')
      
      // Kart çekme animasyonu için bekle
      setTimeout(() => {
        setDrawnCards(cards)
        setShowCards(true)
      }, 2000)
      
      // Yorumlama animasyonu için bekle
      setTimeout(() => {
        const reading = interpretReading(cards, 'celtic-cross')
        setInterpretation(reading)
        
        // Parent'a bildir
        onComplete?.(cards, reading)
        
        setIsReading(false)
      }, 4000)
      
    } catch (error) {
      console.error('Celtic Cross hatası:', error)
      setIsReading(false)
    }
  }

  // Celtic Cross kart pozisyonları ve açıları
  const cardPositions = [
    { 
      id: 1, 
      className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10", 
      title: "Mevcut Durum",
      rotation: "rotate-0",
      size: "w-16 h-24 sm:w-20 sm:h-28"
    },
    { 
      id: 2, 
      className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20", 
      title: "Meydan Okuma",
      rotation: "rotate-90",
      size: "w-16 h-24 sm:w-20 sm:h-28"
    },
    { 
      id: 3, 
      className: "absolute top-8 left-1/2 transform -translate-x-1/2", 
      title: "Uzak Geçmiş",
      rotation: "rotate-0",
      size: "w-16 h-24 sm:w-20 sm:h-28"
    },
    { 
      id: 4, 
      className: "absolute bottom-8 left-1/2 transform -translate-x-1/2", 
      title: "Olası Gelecek",
      rotation: "rotate-0",
      size: "w-16 h-24 sm:w-20 sm:h-28"
    },
    { 
      id: 5, 
      className: "absolute top-12 left-8 sm:left-12", 
      title: "Üst Bilinç",
      rotation: "-rotate-45",
      size: "w-16 h-24 sm:w-20 sm:h-28"
    },
    { 
      id: 6, 
      className: "absolute top-12 right-8 sm:right-12", 
      title: "Yakın Gelecek",
      rotation: "rotate-45",
      size: "w-16 h-24 sm:w-20 sm:h-28"
    },
    { 
      id: 7, 
      className: "absolute top-1/2 left-8 sm:left-12 transform -translate-y-1/2", 
      title: "İç Güç",
      rotation: "-rotate-45",
      size: "w-16 h-24 sm:w-20 sm:h-28"
    },
    { 
      id: 8, 
      className: "absolute top-1/2 right-8 sm:right-12 transform -translate-y-1/2", 
      title: "Dış Etki",
      rotation: "rotate-45",
      size: "w-16 h-24 sm:w-20 sm:h-28"
    },
    { 
      id: 9, 
      className: "absolute bottom-12 left-8 sm:left-12", 
      title: "Umut ve Korku",
      rotation: "-rotate-45",
      size: "w-16 h-24 sm:w-20 sm:h-28"
    },
    { 
      id: 10, 
      className: "absolute bottom-12 right-8 sm:right-12", 
      title: "Sonuç",
      rotation: "rotate-45",
      size: "w-16 h-24 sm:w-20 sm:h-28"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Arkaplan fil görseliyle benzer efekt */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/40 via-gray-700/20 to-gray-900/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-gray-800/10 to-black/50"></div>
      </div>
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
            Tarot Falı
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Celtic Cross Yayılımı - 10 Kart
          </p>
        </div>

        {/* Celtic Cross Layout */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="relative aspect-square max-w-lg mx-auto h-[400px] sm:h-[500px] lg:h-[600px]">
            
            {cardPositions.map((position) => {
              const card = drawnCards[position.id - 1]
              const isVisible = showCards && card
              
              return (
                <div
                  key={position.id}
                  className={`${position.className} transition-all duration-1000 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-50 scale-90'
                  }`}
                >
                  {/* Kart */}
                  <div className={`
                    ${position.size} ${position.rotation} 
                    border-2 rounded-lg flex flex-col items-center justify-center
                    transition-all duration-500 hover:scale-105
                    ${isVisible 
                      ? 'border-amber-400 bg-gradient-to-br from-amber-500/20 to-orange-500/20 shadow-xl shadow-amber-500/30' 
                      : 'border-gray-500 bg-gray-800/50'
                    }
                  `}>
                    
                    {/* Kart Numarası */}
                    <div className="absolute -top-2 -left-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs transform -rotate-0">
                      {position.id}
                    </div>
                    
                    {/* Kart İçeriği */}
                    {isReading ? (
                      <div className="animate-pulse">
                        <span className="text-lg sm:text-xl">✨</span>
                      </div>
                    ) : isVisible ? (
                      <div className="text-center p-1">
                        <span className="text-lg sm:text-xl mb-1 block">🃏</span>
                        <div className="text-[8px] sm:text-[10px] text-amber-400 font-semibold leading-tight">
                          {card.nameTr.length > 12 ? card.nameTr.substring(0, 12) + '...' : card.nameTr}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-1">
                        <span className="text-lg sm:text-xl mb-1 block opacity-50">🃏</span>
                        <div className="text-[8px] text-gray-500 leading-tight">
                          {position.title}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Yükleme Durumu */}
        {isReading && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-amber-500/30 text-center">
              <div className="space-y-4">
                <div className="text-4xl animate-spin">🔮</div>
                <div className="text-amber-400 font-semibold">Kartlar Okunuyor...</div>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Yorum Alanı */}
        {interpretation && !isReading && (
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 border border-amber-500/30 rounded-2xl p-6 backdrop-blur shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-lg flex items-center justify-center">
                  <span className="text-amber-400">📜</span>
                </div>
                <h4 className="text-amber-400 font-bold text-lg">Celtic Cross Yorumu</h4>
              </div>
              
              <div className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {interpretation}
              </div>
            </div>
          </div>
        )}

        {/* Ana Buton */}
        <div className="max-w-md mx-auto mt-8">
          <button
            onClick={handleDrawCards}
            disabled={isReading}
            className={`
              w-full rounded-2xl p-4 sm:p-5 font-bold text-base sm:text-lg
              transition-all duration-300 transform active:scale-95
              ${isReading 
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400 shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105'
              }
            `}
          >
            <div className="flex items-center justify-center space-x-3">
              <span>
                {isReading 
                  ? 'Kartlar Okunuyor...' 
                  : drawnCards.length > 0 
                    ? 'Yeni Celtic Cross Falı' 
                    : 'Celtic Cross Falına Başla'
                }
              </span>
              <span className="text-xl">
                {isReading ? '⏳' : '🔮'}
              </span>
            </div>
          </button>
        </div>

        {/* Alt Bilgi */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs sm:text-sm">
            10 kartlı Celtic Cross yayılımı • Detaylı analiz • Profesyonel yorumlama
          </p>
        </div>

      </div>
    </div>
  )
}

// Özel animasyon stilleri için Tailwind config'e eklenmesi gereken keyframes
// @keyframes shimmer {
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// }

// @keyframes fadeIn {
//   0% { opacity: 0; transform: translateY(20px); }
//   100% { opacity: 1; transform: translateY(0); }
// } 