/*
  MODERN CELTIC CROSS TAROT BİLEŞENİ - Ultra Modern & Mobile Optimized
  
  Bu dosya ne işe yarar:
  - Celtic Cross (Kelt Haçı) tarot açılımını modern tasarımla gösterir
  - 10 kartlı klasik tarot yayılımı yapılır
  - Gerçek tarot kartlarına benzer görsel tasarım
  - Ultra responsive ve mobil uyumlu (%100 tüm cihazlarda uyumlu)
  - Modern animasyonlar ve interaktif deneyim
  - Kart çevirme animasyonları ve hover efektleri
  
  Celtic Cross Kart Pozisyonları:
  1. Mevcut Durum (merkez, dik)
  2. Meydan Okuma (merkez, yatay - üstteki kartın üzerine çapraz)
  3. Uzak Geçmiş (üstte)
  4. Olası Gelecek (altta)
  5. Üst Bilinç (sol üst çapraz)
  6. Yakın Gelecek (sağ üst çapraz)
  7. İç Güç (sol orta çapraz)
  8. Dış Etki (sağ orta çapraz)
  9. Umut ve Korku (sol alt çapraz)
  10. Sonuç (sağ alt çapraz)
  
  Modern Özellikler:
  - Gerçek tarot kartı görünümü
  - Kart çevirme animasyonları
  - Hover efektleri ve glow animasyonları
  - Responsive kart boyutları
  - Modern gradient'lar ve gölgeler
  - Interaktif kart seçimi
  - Smooth transitions
*/

'use client'

import { useState } from 'react'
import { drawCardsForSpread, interpretReading, TarotCard } from '@/lib/a-tarot-helpers'

interface CelticsProps {
  onComplete?: (cards: TarotCard[], interpretation: string) => void
}

export default function Celtics({ onComplete }: CelticsProps) {
  const [isReading, setIsReading] = useState(false)
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([])
  const [interpretation, setInterpretation] = useState<string>('')
  const [showCards, setShowCards] = useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null)
  const [cardFlipStates, setCardFlipStates] = useState<boolean[]>(new Array(10).fill(false))

  const handleDrawCards = async () => {
    setIsReading(true)
    setShowCards(false)
    setSelectedCardIndex(null)
    setCardFlipStates(new Array(10).fill(false))
    
    try {
      const cards = drawCardsForSpread('celtic-cross')
      
      // Kartları tek tek çevir (animasyon için)
      setTimeout(() => {
        setDrawnCards(cards)
        setShowCards(true)
        
        // Kartları sırayla çevir
        cards.forEach((_, index) => {
          setTimeout(() => {
            setCardFlipStates(prev => {
              const newStates = [...prev]
              newStates[index] = true
              return newStates
            })
          }, index * 300)
        })
      }, 1000)
      
      // Yorumlama
      setTimeout(() => {
        const reading = interpretReading(cards, 'celtic-cross')
        setInterpretation(reading)
        onComplete?.(cards, reading)
        setIsReading(false)
      }, 4000)
      
    } catch (error) {
      console.error('Celtic Cross hatası:', error)
      setIsReading(false)
    }
  }

  const handleCardClick = (index: number) => {
    if (!showCards || isReading) return
    setSelectedCardIndex(selectedCardIndex === index ? null : index)
  }

  // Modern Celtic Cross kart pozisyonları
  const cardPositions = [
    { 
      id: 1, 
      className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20", 
      title: "Mevcut Durum",
      description: "Şu anki durumunuz ve enerjiniz",
      rotation: "rotate-0",
      size: "w-16 h-24 xs:w-18 xs:h-28 sm:w-20 sm:h-32 md:w-24 md:h-36 lg:w-28 lg:h-40"
    },
    { 
      id: 2, 
      className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30", 
      title: "Meydan Okuma",
      description: "Karşılaştığınız zorluklar",
      rotation: "rotate-90",
      size: "w-16 h-24 xs:w-18 xs:h-28 sm:w-20 sm:h-32 md:w-24 md:h-36 lg:w-28 lg:h-40"
    },
    { 
      id: 3, 
      className: "absolute top-2 xs:top-3 sm:top-4 md:top-6 lg:top-8 left-1/2 transform -translate-x-1/2", 
      title: "Uzak Geçmiş",
      description: "Geçmişten gelen etkiler",
      rotation: "rotate-0",
      size: "w-14 h-20 xs:w-16 xs:h-24 sm:w-18 sm:h-28 md:w-20 md:h-32 lg:w-24 lg:h-36"
    },
    { 
      id: 4, 
      className: "absolute bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2", 
      title: "Olası Gelecek",
      description: "Potansiyel sonuçlar",
      rotation: "rotate-0",
      size: "w-14 h-20 xs:w-16 xs:h-24 sm:w-18 sm:h-28 md:w-20 md:h-32 lg:w-24 lg:h-36"
    },
    { 
      id: 5, 
      className: "absolute top-8 xs:top-10 sm:top-12 md:top-16 lg:top-20 left-2 xs:left-3 sm:left-4 md:left-6 lg:left-8", 
      title: "Üst Bilinç",
      description: "Bilinçli düşünceleriniz",
      rotation: "-rotate-12",
      size: "w-12 h-18 xs:w-14 xs:h-20 sm:w-16 sm:h-24 md:w-18 md:h-28 lg:w-20 lg:h-32"
    },
    { 
      id: 6, 
      className: "absolute top-8 xs:top-10 sm:top-12 md:top-16 lg:top-20 right-2 xs:right-3 sm:right-4 md:right-6 lg:right-8", 
      title: "Yakın Gelecek",
      description: "Yakın zamanda olacaklar",
      rotation: "rotate-12",
      size: "w-12 h-18 xs:w-14 xs:h-20 sm:w-16 sm:h-24 md:w-18 md:h-28 lg:w-20 lg:h-32"
    },
    { 
      id: 7, 
      className: "absolute top-1/2 left-2 xs:left-3 sm:left-4 md:left-6 lg:left-8 transform -translate-y-1/2", 
      title: "İç Güç",
      description: "İçsel gücünüz ve yetenekleriniz",
      rotation: "-rotate-12",
      size: "w-12 h-18 xs:w-14 xs:h-20 sm:w-16 sm:h-24 md:w-18 md:h-28 lg:w-20 lg:h-32"
    },
    { 
      id: 8, 
      className: "absolute top-1/2 right-2 xs:right-3 sm:right-4 md:right-6 lg:right-8 transform -translate-y-1/2", 
      title: "Dış Etki",
      description: "Çevrenizden gelen etkiler",
      rotation: "rotate-12",
      size: "w-12 h-18 xs:w-14 xs:h-20 sm:w-16 sm:h-24 md:w-18 md:h-28 lg:w-20 lg:h-32"
    },
    { 
      id: 9, 
      className: "absolute bottom-8 xs:bottom-10 sm:bottom-12 md:bottom-16 lg:bottom-20 left-2 xs:left-3 sm:left-4 md:left-6 lg:left-8", 
      title: "Umut ve Korku",
      description: "İç dünyanizdaki duygular",
      rotation: "-rotate-12",
      size: "w-12 h-18 xs:w-14 xs:h-20 sm:w-16 sm:h-24 md:w-18 md:h-28 lg:w-20 lg:h-32"
    },
    { 
      id: 10, 
      className: "absolute bottom-8 xs:bottom-10 sm:bottom-12 md:bottom-16 lg:bottom-20 right-2 xs:right-3 sm:right-4 md:right-6 lg:right-8", 
      title: "Sonuç",
      description: "Nihai sonuç ve öğrenilen dersler",
      rotation: "rotate-12",
      size: "w-12 h-18 xs:w-14 xs:h-20 sm:w-16 sm:h-24 md:w-18 md:h-28 lg:w-20 lg:h-32"
    }
  ]

  const getSuitIcon = (suit: string) => {
    switch (suit) {
      case 'major': return '⭐'
      case 'cups': return '🏆'
      case 'wands': return '🔥'
      case 'swords': return '⚔️'
      case 'pentacles': return '💰'
      default: return '🃏'
    }
  }

  const getSuitColor = (suit: string) => {
    switch (suit) {
      case 'major': return 'from-purple-600 to-indigo-600'
      case 'cups': return 'from-blue-600 to-cyan-600'
      case 'wands': return 'from-red-600 to-orange-600'
      case 'swords': return 'from-gray-600 to-slate-600'
      case 'pentacles': return 'from-yellow-600 to-amber-600'
      default: return 'from-gray-600 to-gray-700'
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-blue-900/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-transparent via-purple-500/5 to-transparent animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full mb-4 shadow-2xl shadow-purple-500/50">
            <span className="text-2xl">🔮</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-2">
            Celtic Cross
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Complete life situation analysis • 10 cards
          </p>
        </div>

        {/* Celtic Cross Layout */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="relative mx-auto">
            <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto aspect-square h-[320px] xs:h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
              
              {cardPositions.map((position, index) => {
                const card = drawnCards[index]
                const isVisible = showCards && card
                const isFlipped = cardFlipStates[index]
                const isSelected = selectedCardIndex === index
                
                return (
                  <div
                    key={position.id}
                    className={`${position.className} transition-all duration-700 ${
                      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                  >
                    {/* Modern Tarot Card */}
                    <div 
                      className={`
                        ${position.size} ${position.rotation} 
                        relative cursor-pointer group
                        transition-all duration-500 hover:scale-110 hover:z-50
                        ${isSelected ? 'z-50 scale-110' : ''}
                      `}
                      onClick={() => handleCardClick(index)}
                    >
                      
                      {/* Card Container with Flip Animation */}
                      <div className={`
                        relative w-full h-full transition-transform duration-700 transform-style-preserve-3d
                        ${isFlipped ? 'rotate-y-180' : ''}
                      `}>
                        
                        {/* Card Back */}
                        <div className="absolute inset-0 w-full h-full backface-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 rounded-xl border-2 border-purple-500/30 shadow-2xl flex items-center justify-center relative overflow-hidden">
                            {/* Mystical Pattern */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent"></div>
                            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-transparent via-purple-300/10 to-transparent animate-spin" style={{animationDuration: '10s'}}></div>
                            
                            {/* Card Back Design */}
                            <div className="relative z-10 text-center">
                              <div className="text-purple-300 text-lg sm:text-xl mb-1">✨</div>
                              <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-purple-300 rounded-full mx-auto"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Card Front */}
                        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                          {isReading ? (
                            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border-2 border-gray-600 shadow-2xl flex items-center justify-center">
                              <div className="animate-pulse">
                                <span className="text-lg sm:text-xl text-gray-400">⏳</span>
                              </div>
                            </div>
                          ) : isVisible && card ? (
                            <div className={`
                              w-full h-full bg-gradient-to-br ${getSuitColor(card.suit)} rounded-xl 
                              border-2 border-white/20 shadow-2xl relative overflow-hidden
                              ${isSelected ? 'ring-4 ring-yellow-400 ring-opacity-75' : ''}
                              group-hover:shadow-3xl group-hover:shadow-purple-500/30
                            `}>
                              
                              {/* Card Glow Effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20"></div>
                              
                              {/* Card Content */}
                              <div className="relative z-10 p-2 sm:p-3 h-full flex flex-col justify-between text-white">
                                
                                {/* Top Section */}
                                <div className="text-center">
                                  <div className="text-lg sm:text-xl mb-1">
                                    {getSuitIcon(card.suit)}
                                  </div>
                                  {card.number && (
                                    <div className="text-xs sm:text-sm font-bold bg-white/20 rounded px-1">
                                      {card.number}
                                    </div>
                                  )}
                                </div>
                                
                                {/* Center Section */}
                                <div className="flex-1 flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="text-2xl sm:text-3xl mb-1">🃏</div>
                                  </div>
                                </div>
                                
                                {/* Bottom Section */}
                                <div className="text-center">
                                  <div className="text-[8px] sm:text-[10px] md:text-xs font-semibold leading-tight bg-black/30 rounded px-1 py-0.5">
                                    {card.nameTr.length > 8 ? card.nameTr.substring(0, 8) + '...' : card.nameTr}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Hover Glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/5 group-hover:to-white/10 transition-all duration-300 rounded-xl"></div>
                            </div>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-gray-600 shadow-2xl flex items-center justify-center opacity-50">
                              <div className="text-center">
                                <div className="text-lg sm:text-xl mb-1 text-gray-500">🃏</div>
                                <div className="text-[8px] sm:text-[10px] text-gray-500 leading-tight">
                                  {position.title}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Position Number Badge */}
                      <div className="absolute -top-2 -left-2 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm shadow-lg z-10">
                        {position.id}
                      </div>
                      
                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="absolute -inset-2 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-xl animate-pulse"></div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Selected Card Details */}
        {selectedCardIndex !== null && drawnCards[selectedCardIndex] && !isReading && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500/40 to-indigo-500/40 rounded-lg flex items-center justify-center">
                  <span className="text-purple-300">🎯</span>
                </div>
                <div>
                  <h4 className="text-purple-300 font-bold text-lg">
                    {cardPositions[selectedCardIndex].title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {cardPositions[selectedCardIndex].description}
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-lg p-4">
                <h5 className="text-yellow-400 font-semibold mb-2">
                  {drawnCards[selectedCardIndex].nameTr}
                </h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {drawnCards[selectedCardIndex].meaningTr.upright}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isReading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 p-8 rounded-3xl border border-purple-500/50 text-center backdrop-blur-md shadow-2xl max-w-sm mx-4">
              <div className="space-y-6">
                <div className="relative">
                  <div className="text-6xl animate-spin">🔮</div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <div className="text-purple-300 font-semibold text-lg mb-2">Kartlar Okunuyor...</div>
                  <div className="text-gray-400 text-sm">Celtic Cross açılımı hazırlanıyor</div>
                </div>
                <div className="flex justify-center space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interpretation */}
        {interpretation && !isReading && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/40 to-indigo-500/40 rounded-xl flex items-center justify-center">
                  <span className="text-purple-300 text-lg">📜</span>
                </div>
                <div>
                  <h4 className="text-purple-300 font-bold text-xl">Celtic Cross Yorumu</h4>
                  <p className="text-gray-400 text-sm">Detaylı analiz ve rehberlik</p>
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-lg p-4 border border-purple-500/20">
                  {interpretation}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="max-w-md mx-auto">
          <button
            onClick={handleDrawCards}
            disabled={isReading}
            className={`
              w-full rounded-2xl p-4 sm:p-5 font-bold text-base sm:text-lg
              transition-all duration-300 transform active:scale-95 relative overflow-hidden
              ${isReading 
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white hover:from-purple-500 hover:via-indigo-500 hover:to-purple-500 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105'
              }
            `}
          >
            {/* Button Glow Effect */}
            {!isReading && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-white/20 to-purple-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            )}
            
            <div className="relative flex items-center justify-center space-x-3">
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

        {/* Info */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs sm:text-sm">
            10 kartlı Celtic Cross yayılımı • Detaylı analiz • Profesyonel yorumlama
          </p>
          <p className="text-purple-400 text-xs mt-2">
            Kartlara tıklayarak detaylarını görüntüleyebilirsiniz
          </p>
        </div>

      </div>
    </div>
  )
}