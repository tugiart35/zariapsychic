/*
  Tarot Kartı Carousel Bileşeni
  78 kartlık tam tarot destesini sağa sola kayar şekilde gösteren mobil uyumlu bileşen
  Kartlar tıklandığında animasyonlu hareket eder ve detay gösterir
*/

'use client'

import { useState, useRef, useEffect } from 'react'
import { TarotCard } from '@/lib/a-tarot-helpers'
import { fullTarotDeck } from '@/lib/full-tarot-deck'

interface TarotCarouselProps {
  onCardSelect?: (card: TarotCard) => void
  selectedCard?: TarotCard | null
}

export default function TarotCarousel({ onCardSelect, selectedCard }: TarotCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef(0)

  // Kart seçme fonksiyonu
  const handleCardClick = (card: TarotCard, index: number) => {
    if (isDragging) return
    
    setIsAnimating(true)
    setCurrentIndex(index)
    onCardSelect?.(card)
    
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Sağa kaydırma
  const slideNext = () => {
    if (isAnimating) return
    const nextIndex = (currentIndex + 1) % fullTarotDeck.length
    setCurrentIndex(nextIndex)
  }

  // Sola kaydırma
  const slidePrev = () => {
    if (isAnimating) return
    const prevIndex = currentIndex === 0 ? fullTarotDeck.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
  }

  // Touch/Mouse events for dragging
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setIsDragging(true)
    setDragStart(clientX)
    touchStartRef.current = clientX
  }

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const diff = clientX - touchStartRef.current
    setDragOffset(diff)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    setIsDragging(false)
    
    // Drag threshold for sliding
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        slidePrev()
      } else {
        slideNext()
      }
    }
    
    setDragOffset(0)
  }

  // Kartın pozisyonunu hesaplama
  const getCardStyle = (index: number) => {
    const diff = index - currentIndex
    const offset = isDragging ? dragOffset : 0
    
    // Ana kart (seçili)
    if (diff === 0) {
      return {
        transform: `translateX(${offset}px) scale(1.1) rotateY(0deg)`,
        zIndex: 10,
        opacity: 1
      }
    }
    
    // Sağdaki kartlar
    if (diff > 0) {
      const distance = Math.min(diff, 3)
      return {
        transform: `translateX(${80 * distance + offset}px) scale(${1 - distance * 0.1}) rotateY(-${distance * 15}deg)`,
        zIndex: 10 - distance,
        opacity: Math.max(0.3, 1 - distance * 0.2)
      }
    }
    
    // Soldaki kartlar
    const distance = Math.min(Math.abs(diff), 3)
    return {
      transform: `translateX(${-80 * distance + offset}px) scale(${1 - distance * 0.1}) rotateY(${distance * 15}deg)`,
      zIndex: 10 - distance,
      opacity: Math.max(0.3, 1 - distance * 0.2)
    }
  }

  // Klavye navigasyonu
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') slidePrev()
      if (e.key === 'ArrowRight') slideNext()
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentIndex])

  return (
    <div className="relative w-full h-96 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      
      {/* Başlık */}
      <div className="text-center mb-6 pt-4">
        <h2 className="text-2xl font-bold text-white mb-2">Tarot Kartları</h2>
        <p className="text-gray-400 text-sm">
          {currentIndex + 1} / {fullTarotDeck.length} - {fullTarotDeck[currentIndex]?.nameTr}
        </p>
      </div>

      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="relative h-64 w-full flex items-center justify-center perspective-1000"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        
        {/* Kartlar */}
        {fullTarotDeck.map((card, index) => {
          const isVisible = Math.abs(index - currentIndex) <= 3
          if (!isVisible) return null
          
          return (
            <div
              key={card.id}
              className="absolute w-20 h-32 cursor-pointer select-none transition-all duration-500 ease-out"
              style={getCardStyle(index)}
              onClick={() => handleCardClick(card, index)}
            >
              
              {/* Kart */}
              <div className={`
                w-full h-full rounded-xl border-2 shadow-2xl
                flex flex-col items-center justify-center p-2
                transition-all duration-300 hover:border-amber-400
                ${selectedCard?.id === card.id 
                  ? 'border-amber-400 bg-gradient-to-br from-amber-500/30 to-orange-500/30 shadow-amber-500/50' 
                  : 'border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900'
                }
              `}>
                
                {/* Kart İçeriği */}
                <div className="text-center">
                  
                  {/* Kart Sembolü */}
                  <div className="text-2xl mb-1">
                    {card.suit === 'major' && '⭐'}
                    {card.suit === 'cups' && '🏆'}
                    {card.suit === 'wands' && '🔥'}
                    {card.suit === 'swords' && '⚔️'}
                    {card.suit === 'pentacles' && '💰'}
                  </div>
                  
                  {/* Kart Numarası */}
                  {card.number && (
                    <div className="text-xs text-amber-400 font-bold mb-1">
                      {card.number}
                    </div>
                  )}
                  
                  {/* Kart Adı */}
                  <div className="text-[8px] text-white font-semibold leading-tight">
                    {card.nameTr.length > 12 ? card.nameTr.substring(0, 12) + '...' : card.nameTr}
                  </div>
                  
                </div>
                
                {/* Seçili kart işareti */}
                {selectedCard?.id === card.id && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                    <span className="text-black text-xs">✓</span>
                  </div>
                )}
                
              </div>
            </div>
          )
        })}
        
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center px-8 mt-4">
        
        {/* Sol Buton */}
        <button
          onClick={slidePrev}
          disabled={isAnimating}
          className="w-12 h-12 rounded-full bg-gray-800 border border-gray-600 text-white
                     flex items-center justify-center hover:bg-gray-700 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
        >
          ←
        </button>
        
        {/* Seçili Kart Bilgisi */}
        <div className="flex-1 mx-4 text-center">
          {selectedCard && (
            <div className="bg-gray-800/50 rounded-lg p-2 backdrop-blur-sm">
              <div className="text-amber-400 font-semibold text-sm mb-1">
                {selectedCard.nameTr}
              </div>
              <div className="text-gray-300 text-xs">
                {selectedCard.meaningTr.upright.substring(0, 50)}...
              </div>
            </div>
          )}
        </div>
        
        {/* Sağ Buton */}
        <button
          onClick={slideNext}
          disabled={isAnimating}
          className="w-12 h-12 rounded-full bg-gray-800 border border-gray-600 text-white
                     flex items-center justify-center hover:bg-gray-700 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
        >
          →
        </button>
        
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mt-4 space-x-1">
        {Array.from({ length: Math.min(10, fullTarotDeck.length) }).map((_, index) => {
          const indicatorIndex = Math.floor((index * fullTarotDeck.length) / 10)
          const isActive = Math.abs(currentIndex - indicatorIndex) < fullTarotDeck.length / 10
          
          return (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive ? 'bg-amber-400' : 'bg-gray-600'
              }`}
            />
          )
        })}
      </div>
      
    </div>
  )
} 