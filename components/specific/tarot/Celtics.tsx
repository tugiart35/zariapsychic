/*
  Daily Guidance Tarot Bileşeni - Celtic Cross Spread
  Modern ve responsive tasarım ile hem web hem mobil uyumlu
  10 kartlı Celtic Cross yayılımı - Klasik tarot yayılımı
*/

'use client'

import { useState } from 'react'
import { drawCardsForSpread, interpretReading, TarotCard } from '@/lib/a-tarot-helpers'

interface celticsProps {
  onComplete?: (cards: TarotCard[], interpretation: string) => void
}

export default function celtics({ onComplete }: celticsProps) {
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

  // Celtic Cross kart pozisyonları ve açıları - mobil uyumlu
  const cardPositions = [
    { 
      id: 1, 
      className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10", 
      title: "Mevcut Durum",
      rotation: "rotate-0",
      size: "w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28"
    },
    { 
      id: 2, 
      className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20", 
      title: "Meydan Okuma",
      rotation: "rotate-90",
      size: "w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28"
    },
    { 
      id: 3, 
      className: "absolute top-4 sm:top-6 md:top-8 left-1/2 transform -translate-x-1/2", 
      title: "Uzak Geçmiş",
      rotation: "rotate-0",
      size: "w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28"
    },
    { 
      id: 4, 
      className: "absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2", 
      title: "Olası Gelecek",
      rotation: "rotate-0",
      size: "w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28"
    },
    { 
      id: 5, 
      className: "absolute top-8 sm:top-10 md:top-12 left-4 sm:left-6 md:left-8", 
      title: "Üst Bilinç",
      rotation: "-rotate-45",
      size: "w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28"
    },
    { 
      id: 6, 
      className: "absolute top-8 sm:top-10 md:top-12 right-4 sm:right-6 md:right-8", 
      title: "Yakın Gelecek",
      rotation: "rotate-45",
      size: "w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28"
    },
    { 
      id: 7, 
      className: "absolute top-1/2 left-4 sm:left-6 md:left-8 transform -translate-y-1/2", 
      title: "İç Güç",
      rotation: "-rotate-45",
      size: "w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28"
    },
    { 
      id: 8, 
      className: "absolute top-1/2 right-4 sm:right-6 md:right-8 transform -translate-y-1/2", 
      title: "Dış Etki",
      rotation: "rotate-45",
      size: "w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28"
    },
    { 
      id: 9, 
      className: "absolute bottom-8 sm:bottom-10 md:bottom-12 left-4 sm:left-6 md:left-8", 
      title: "Umut ve Korku",
      rotation: "-rotate-45",
      size: "w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28"
    },
    { 
      id: 10, 
      className: "absolute bottom-8 sm:bottom-10 md:bottom-12 right-4 sm:right-6 md:right-8", 
      title: "Sonuç",
      rotation: "rotate-45",
      size: "w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Arka Plan Fotoğrafı */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #374151 50%, #1e293b 75%, #0f172a 100%)`
        }}
      >
        {/* Mistik Desenler Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-transparent to-blue-900/30"></div>
          <div className="absolute inset-0 bg-gradient-conic from-amber-500/10 via-purple-500/10 to-amber-500/10"></div>
        </div>
      </div>
      
      {/* Karanlık Overlay - Kartların belirgin olması için */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]"></div>
      
      <div className="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8">
        
        {/* Celtic Cross Layout - Mobil Uyumlu */}
        <div className="max-w-6xl mx-auto mb-6 sm:mb-8">
          <div className="relative mx-auto">
            {/* Container - Responsive boyutlar */}
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto aspect-square h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              
              {cardPositions.map((position) => {
                const card = drawnCards[position.id - 1]
                const isVisible = showCards && card
                
                return (
                  <div
                    key={position.id}
                    className={`${position.className} transition-all duration-1000 ${
                      isVisible ? 'opacity-100 scale-100' : 'opacity-80 scale-95'
                    }`}
                  >
                    {/* Kart Container */}
                    <div className={`
                      ${position.size} ${position.rotation} 
                      border-2 rounded-lg flex flex-col items-center justify-center
                      transition-all duration-500 hover:scale-105 relative
                      backdrop-blur-sm
                      ${isVisible 
                        ? 'border-amber-400/80 bg-gradient-to-br from-amber-500/30 to-orange-500/30 shadow-xl shadow-amber-500/40' 
                        : 'border-gray-400/60 bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-lg shadow-black/50'
                      }
                    `}>
                      
                      {/* Kart Numarası */}
                      <div className="absolute -top-1.5 -left-1.5 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full flex items-center justify-center text-black font-bold text-[10px] sm:text-xs transform rotate-0 shadow-md">
                        {position.id}
                      </div>
                      
                      {/* Kart İçeriği */}
                      {isReading ? (
                        <div className="animate-pulse">
                          <span className="text-base sm:text-lg md:text-xl">✨</span>
                        </div>
                      ) : isVisible ? (
                        <div className="text-center p-1">
                          <span className="text-base sm:text-lg md:text-xl mb-1 block">🃏</span>
                          <div className="text-[7px] sm:text-[8px] md:text-[10px] text-amber-300 font-semibold leading-tight">
                            {card.nameTr.length > 10 ? card.nameTr.substring(0, 10) + '...' : card.nameTr}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-1">
                          <span className="text-base sm:text-lg md:text-xl mb-1 block opacity-60">🃏</span>
                          <div className="text-[7px] sm:text-[8px] text-gray-400 leading-tight">
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
        </div>

        {/* Yükleme Durumu */}
        {isReading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 p-6 sm:p-8 rounded-3xl border border-amber-500/40 text-center backdrop-blur-md shadow-2xl">
              <div className="space-y-4">
                <div className="text-3xl sm:text-4xl animate-spin">🔮</div>
                <div className="text-amber-400 font-semibold text-sm sm:text-base">Kartlar Okunuyor...</div>
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
          <div className="max-w-4xl mx-auto mt-6 sm:mt-8 px-2">
            <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 border border-amber-500/40 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-500/40 to-orange-500/40 rounded-lg flex items-center justify-center">
                  <span className="text-amber-400 text-sm sm:text-base">📜</span>
                </div>
                <h4 className="text-amber-400 font-bold text-base sm:text-lg">Celtic Cross Yorumu</h4>
              </div>
              
              <div className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line">
                {interpretation}
              </div>
            </div>
          </div>
        )}

        {/* Ana Buton */}
        <div className="max-w-sm sm:max-w-md mx-auto mt-6 sm:mt-8 px-2">
          <button
            onClick={handleDrawCards}
            disabled={isReading}
            className={`
              w-full rounded-2xl p-3 sm:p-4 md:p-5 font-bold text-sm sm:text-base md:text-lg
              transition-all duration-300 transform active:scale-95
              ${isReading 
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105'
              }
            `}
          >
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <span className="text-sm sm:text-base md:text-lg">
                {isReading 
                  ? 'Kartlar Okunuyor...' 
                  : drawnCards.length > 0 
                    ? 'Yeni Celtic Cross Falı' 
                    : 'Celtic Cross Falına Başla'
                }
              </span>
              <span className="text-base sm:text-lg md:text-xl">
                {isReading ? '⏳' : '🔮'}
              </span>
            </div>
          </button>
        </div>

        {/* Alt Bilgi */}
        <div className="text-center mt-4 sm:mt-6 px-2">
          <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm">
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