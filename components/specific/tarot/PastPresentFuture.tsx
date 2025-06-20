/*
  Past, Present, Future Tarot Bileşeni
  Bu bileşen üç kart çekerek zaman perspektifi açılımı yapar.
  Geçmiş, şimdi ve gelecek için özel tasarım.
*/

'use client'

import { useState } from 'react'
import { drawCardsForSpread, interpretReading, TarotCard } from '@/lib/a-tarot-helpers'

interface PastPresentFutureProps {
  onComplete?: (cards: TarotCard[], interpretation: string) => void
}

export default function PastPresentFuture({ onComplete }: PastPresentFutureProps) {
  const [isReading, setIsReading] = useState(false)
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([])
  const [interpretation, setInterpretation] = useState<string>('')
  const [currentStep, setCurrentStep] = useState(0)

  const positions = [
    { name: 'Geçmiş', nameTr: 'Geçmiş', icon: '⏪', color: 'blue' },
    { name: 'Şimdi', nameTr: 'Şimdi', icon: '⏸️', color: 'purple' },
    { name: 'Gelecek', nameTr: 'Gelecek', icon: '⏩', color: 'green' }
  ]

  const handleDrawCards = async () => {
    setIsReading(true)
    setCurrentStep(0)
    
    try {
      // Üç kart çek
      const cards = drawCardsForSpread('past-present-future')
      
      // Kartları tek tek göster (animasyon için)
      for (let i = 0; i < cards.length; i++) {
        setCurrentStep(i + 1)
        await new Promise(resolve => setTimeout(resolve, 800))
      }
      
      setDrawnCards(cards)
      
      // Yorumla
      const reading = interpretReading(cards, 'past-present-future')
      setInterpretation(reading)
      
      // Parent'a bildir
      onComplete?.(cards, reading)
      
      setIsReading(false)
      
    } catch (error) {
      console.error('Past Present Future hatası:', error)
      setIsReading(false)
    }
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'from-blue-900/30 to-indigo-900/30',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          button: 'bg-blue-500/20'
        }
      case 'purple':
        return {
          bg: 'from-purple-900/30 to-violet-900/30',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          button: 'bg-purple-500/20'
        }
      case 'green':
        return {
          bg: 'from-green-900/30 to-emerald-900/30',
          border: 'border-green-500/30',
          text: 'text-green-400',
          button: 'bg-green-500/20'
        }
      default:
        return {
          bg: 'from-gray-900/30 to-slate-900/30',
          border: 'border-gray-500/30',
          text: 'text-gray-400',
          button: 'bg-gray-500/20'
        }
    }
  }

  return (
    <div className="space-y-6">
      {/* Özel başlık */}
      <div className="text-center">
        <div className="text-4xl mb-3">🌙</div>
        <h2 className="text-xl font-semibold text-purple-400 mb-2">
          Geçmiş, Şimdi, Gelecek
        </h2>
        <p className="text-gray-400 text-sm">
          Zaman çizelgenizde yolculuk yapın
        </p>
      </div>

      {/* Üç kart alanı - yatay dizilim */}
      <div className="grid grid-cols-3 gap-3">
        {positions.map((position, index) => {
          const colors = getColorClasses(position.color)
          const card = drawnCards[index]
          const isActive = isReading && currentStep > index
          const isCompleted = !isReading && card
          
          return (
            <div key={position.name} className="space-y-2">
              {/* Pozisyon etiketi */}
              <div className="text-center">
                <div className={`text-2xl mb-1`}>{position.icon}</div>
                <p className={`text-xs font-medium ${colors.text}`}>
                  {position.nameTr}
                </p>
              </div>
              
              {/* Kart alanı */}
              <div className={`aspect-[3/4] bg-gradient-to-br ${colors.bg} rounded-xl flex items-center justify-center border ${colors.border} p-2`}>
                {isActive ? (
                  <div className="text-center">
                    <div className="animate-pulse">
                      <div className={`w-12 h-16 bg-gradient-to-br ${colors.bg} border border-current rounded-lg flex items-center justify-center`}>
                        <span className="text-lg">✨</span>
                      </div>
                    </div>
                  </div>
                ) : isCompleted ? (
                  <div className="text-center">
                    <div className={`w-12 h-16 ${colors.button} border border-current rounded-lg flex items-center justify-center mb-2`}>
                      <span className="text-lg">🃏</span>
                    </div>
                    <p className={`text-xs font-medium ${colors.text} truncate`}>
                      {card.nameTr}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className={`w-12 h-16 ${colors.button} border border-current rounded-lg flex items-center justify-center opacity-50`}>
                      <span className="text-lg">{position.icon}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* İlerleme çubuğu */}
      {isReading && (
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      )}

      {/* Özel bilgi kartı */}
      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
            <span className="text-purple-400 text-sm">🌙</span>
          </div>
          <div>
            <p className="text-purple-400 font-medium text-sm">Past, Present, Future</p>
            <p className="text-gray-400 text-xs">3 kart • Beginner seviye</p>
          </div>
        </div>
      </div>

      {/* Yorum alanı */}
      {interpretation && !isReading && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <h4 className="text-purple-400 font-semibold mb-3">Zaman Yolculuğu</h4>
          <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
            {interpretation}
          </div>
        </div>
      )}

      {/* Çekme butonu */}
      <button
        onClick={handleDrawCards}
        disabled={isReading}
        className={`
          w-full rounded-xl p-4 font-semibold transition-all duration-300
          ${isReading 
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-500 hover:to-pink-400'
          }
        `}
      >
        <div className="flex items-center justify-center space-x-2">
          <span>{isReading ? 'Kartlar çekiliyor...' : drawnCards.length > 0 ? 'Yeni Okuma' : 'Zaman Yolculuğuna Başla'}</span>
          <span>{isReading ? '⏳' : '🌙'}</span>
        </div>
      </button>
    </div>
  )
} 