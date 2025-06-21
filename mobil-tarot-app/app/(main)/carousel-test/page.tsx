/*
  Tarot Carousel Test Sayfası
  78 kartlık tarot carousel bileşenini test etmek için
  Sağa sola kayar kartların çalışmasını kontrol eder
*/

'use client'

import { useState } from 'react'
import TarotCarousel from '@/components/specific/tarot/TarotCarousel'
import { TarotCard } from '@/lib/a-tarot-helpers'

export default function CarouselTestPage() {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null)

  const handleCardSelect = (card: TarotCard) => {
    setSelectedCard(card)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      
      {/* Header */}
      <div className="text-center py-8 px-4">
        <h1 className="text-4xl font-bold text-white mb-2">
          78 Tarot Kartı Carousel
        </h1>
        <p className="text-gray-400 text-lg">
          Sağa sola kayar şekilde tüm kartları görüntüleyin
        </p>
      </div>

      {/* Carousel */}
      <div className="px-4">
        <TarotCarousel 
          onCardSelect={handleCardSelect}
          selectedCard={selectedCard}
        />
      </div>

      {/* Seçili Kart Detayı */}
      {selectedCard && (
        <div className="mx-4 mt-8 p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-amber-400 mb-2">
              {selectedCard.nameTr}
            </h3>
            <p className="text-gray-300 text-sm">
              {selectedCard.name} - {selectedCard.suit.toUpperCase()}
              {selectedCard.number && ` ${selectedCard.number}`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Düz Anlamı */}
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/50">
              <h4 className="text-green-400 font-semibold mb-2 flex items-center">
                <span className="mr-2">⬆️</span>
                Düz Anlamı
              </h4>
              <p className="text-gray-300 text-sm">
                {selectedCard.meaningTr.upright}
              </p>
            </div>

            {/* Ters Anlamı */}
            <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/50">
              <h4 className="text-red-400 font-semibold mb-2 flex items-center">
                <span className="mr-2">⬇️</span>
                Ters Anlamı
              </h4>
              <p className="text-gray-300 text-sm">
                {selectedCard.meaningTr.reversed}
              </p>
            </div>
          </div>

          {/* Anahtar Kelimeler */}
          <div className="mt-4">
            <h4 className="text-amber-400 font-semibold mb-2">
              Anahtar Kelimeler
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedCard.keywordsTr.map((keyword, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Kullanım Talimatları */}
      <div className="mx-4 mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
        <h3 className="text-blue-400 font-semibold mb-2">
          Nasıl Kullanılır?
        </h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Kartları sağa sola çekerek kaydırabilirsiniz</li>
          <li>• Ok tuşları ile klavyeden gezinebilirsiniz</li>
          <li>• Karta tıklayarak detaylarını görebilirsiniz</li>
          <li>• Alttaki ok butonları ile de ileri geri gidebilirsiniz</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-500 text-sm">
        <p>Mobil Uyumlu Tarot Uygulaması - 78 Kart Destesi</p>
      </div>
      
    </div>
  )
} 