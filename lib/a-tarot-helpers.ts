/*
  Tarot Yardımcı Fonksiyonları
  Bu dosya tarot kartları, açılımları ve okuma işlemleri için
  gerekli fonksiyonları içerir. Backend bağlantısı burada yapılacak.
*/

// Tarot kartları veri yapısı
export interface TarotCard {
  id: number
  name: string
  nameTr: string
  suit: 'major' | 'cups' | 'wands' | 'swords' | 'pentacles'
  number?: number
  meaning: {
    upright: string
    reversed: string
  }
  meaningTr: {
    upright: string
    reversed: string
  }
  keywords: string[]
  keywordsTr: string[]
  imageUrl?: string
}

// Tarot açılım türleri
export interface TarotSpread {
  id: string
  name: string
  nameTr: string
  description: string
  descriptionTr: string
  cardCount: number
  positions: TarotPosition[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

// Kart pozisyonları
export interface TarotPosition {
  id: string
  name: string
  nameTr: string
  description: string
  descriptionTr: string
  x: number
  y: number
}

// Örnek tarot kartları (Major Arcana'dan birkaç tanesi)
export const sampleTarotCards: TarotCard[] = [
  {
    id: 0,
    name: "The Fool",
    nameTr: "Deli",
    suit: "major",
    number: 0,
    meaning: {
      upright: "New beginnings, innocence, spontaneity, free spirit",
      reversed: "Recklessness, taken advantage of, inconsideration"
    },
    meaningTr: {
      upright: "Yeni başlangıçlar, masumiyet, spontanlık, özgür ruh",
      reversed: "Dikkatsizlik, istismar edilme, düşüncesizlik"
    },
    keywords: ["new beginnings", "innocence", "adventure", "potential"],
    keywordsTr: ["yeni başlangıçlar", "masumiyet", "macera", "potansiyel"]
  },
  {
    id: 1,
    name: "The Magician",
    nameTr: "Büyücü",
    suit: "major",
    number: 1,
    meaning: {
      upright: "Manifestation, resourcefulness, power, inspired action",
      reversed: "Manipulation, poor planning, untapped talents"
    },
    meaningTr: {
      upright: "Tezahür, beceriklilik, güç, ilhamlı eylem",
      reversed: "Manipülasyon, kötü planlama, değerlendirilmemiş yetenekler"
    },
    keywords: ["manifestation", "power", "skill", "concentration"],
    keywordsTr: ["tezahür", "güç", "beceri", "konsantrasyon"]
  },
  {
    id: 2,
    name: "The High Priestess",
    nameTr: "Yüksek Rahibe",
    suit: "major",
    number: 2,
    meaning: {
      upright: "Intuition, sacred knowledge, divine feminine, subconscious mind",
      reversed: "Secrets, disconnected from intuition, withdrawal"
    },
    meaningTr: {
      upright: "Sezgi, kutsal bilgi, ilahi dişilik, bilinçaltı",
      reversed: "Sırlar, sezgiden kopukluk, geri çekilme"
    },
    keywords: ["intuition", "mystery", "subconscious", "wisdom"],
    keywordsTr: ["sezgi", "gizem", "bilinçaltı", "bilgelik"]
  }
]

// Tarot açılımları
export const tarotSpreads: TarotSpread[] = [
  {
    id: 'daily',
    name: 'Daily Guidance',
    nameTr: 'Günlük Rehberlik',
    description: 'Single card for today\'s energy and focus',
    descriptionTr: 'Bugünün enerjisi ve odağı için tek kart',
    cardCount: 1,
    difficulty: 'beginner',
    positions: [
      {
        id: 'today',
        name: 'Today\'s Energy',
        nameTr: 'Bugünün Enerjisi',
        description: 'What energy surrounds you today',
        descriptionTr: 'Bugün sizi çevreleyen enerji',
        x: 50,
        y: 50
      }
    ]
  },
  {
    id: 'past-present-future',
    name: 'Past, Present, Future',
    nameTr: 'Geçmiş, Şimdi, Gelecek',
    description: 'Three card reading for time perspective',
    descriptionTr: 'Zaman perspektifi için üç kart okuma',
    cardCount: 3,
    difficulty: 'beginner',
    positions: [
      {
        id: 'past',
        name: 'Past',
        nameTr: 'Geçmiş',
        description: 'Past influences affecting current situation',
        descriptionTr: 'Mevcut durumu etkileyen geçmiş etkileri',
        x: 25,
        y: 50
      },
      {
        id: 'present',
        name: 'Present',
        nameTr: 'Şimdi',
        description: 'Current situation and energies',
        descriptionTr: 'Mevcut durum ve enerjiler',
        x: 50,
        y: 50
      },
      {
        id: 'future',
        name: 'Future',
        nameTr: 'Gelecek',
        description: 'Potential outcome and future direction',
        descriptionTr: 'Potansiyel sonuç ve gelecek yön',
        x: 75,
        y: 50
      }
    ]
  }
]

// Rastgele kart çekme fonksiyonu
export function drawRandomCard(): TarotCard {
  const randomIndex = Math.floor(Math.random() * sampleTarotCards.length)
  return sampleTarotCards[randomIndex]
}

// Birden fazla kart çekme fonksiyonu
export function drawMultipleCards(count: number): TarotCard[] {
  const drawnCards: TarotCard[] = []
  const availableCards = [...sampleTarotCards]
  
  for (let i = 0; i < count && availableCards.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableCards.length)
    const drawnCard = availableCards.splice(randomIndex, 1)[0]
    drawnCards.push(drawnCard)
  }
  
  return drawnCards
}

// Açılım için kart çekme fonksiyonu
export function drawCardsForSpread(spreadId: string): TarotCard[] {
  const spread = tarotSpreads.find(s => s.id === spreadId)
  if (!spread) {
    throw new Error('Açılım bulunamadı')
  }
  
  return drawMultipleCards(spread.cardCount)
}

// Kart yorumlama fonksiyonu (gelecekte AI ile genişletilebilir)
export function interpretCard(card: TarotCard, position?: TarotPosition, isReversed: boolean = false): string {
  const meaning = isReversed ? card.meaningTr.reversed : card.meaningTr.upright
  
  if (position) {
    return `${position.nameTr} pozisyonunda ${card.nameTr} kartı: ${meaning}`
  }
  
  return `${card.nameTr}: ${meaning}`
}

// Tam açılım yorumlama fonksiyonu
export function interpretReading(cards: TarotCard[], spreadId: string): string {
  const spread = tarotSpreads.find(s => s.id === spreadId)
  if (!spread) {
    return 'Açılım bulunamadı'
  }
  
  let interpretation = `${spread.nameTr} Açılımı:\n\n`
  
  cards.forEach((card, index) => {
    const position = spread.positions[index]
    const isReversed = Math.random() < 0.3 // %30 ters çıkma şansı
    interpretation += `${index + 1}. ${interpretCard(card, position, isReversed)}\n\n`
  })
  
  return interpretation
}
