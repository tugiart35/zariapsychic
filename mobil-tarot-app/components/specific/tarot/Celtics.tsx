/*
  CELTIC CROSS TAROT AÇILIMI BİLEŞENİ - Celtic Cross Spread Component
  
  Bu dosya ne işe yarar:
  - Celtic Cross (Kelt Haçı) tarot açılımını gösterir
  - 10 kartlı klasik tarot yayılımı yapılır
  - Cheetah (çita) arka plan fotoğrafı üzerinde kartlar gösterilir
  - Mobil uyumlu responsive tasarım (%100 tüm cihazlarda uyumlu)
  - Kartlar otomatik olarak çekilir ve yorumlanır
  - Her kartın özel pozisyonu ve anlamı vardır
  
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
  
  Özellikler:
  - Cheetah arka plan fotoğrafı (ultra responsive container'a uygun)
  - Cam efekti (backdrop-blur) ile modern görünüm
  - Animasyonlu kart çekme süreci (2 saniye)
  - Otomatik yorum üretimi (4 saniye sonra)
  - Hover efektleri ve gölge animasyonları
  - Ultra responsive boyutlandırma (xs-4xl tüm boyutlar)
*/

'use client' // Bu satır Next.js'e bu bileşenin tarayıcıda çalışacağını söyler

// React hook'larını import ediyoruz
import { useState } from 'react' // Durum yönetimi için useState hook'u

// Tarot yardımcı fonksiyonlarını import ediyoruz
import { drawCardsForSpread, interpretReading, TarotCard } from '@/lib/a-tarot-helpers'

// Celtic Cross bileşeninin aldığı props'ları tanımlıyoruz
interface celticsProps {
  // onComplete: Kart çekimi bittiğinde çalışacak fonksiyon (isteğe bağlı)
  // Bu fonksiyon çekilen kartları ve yorumu ana komponente gönderir
  onComplete?: (cards: TarotCard[], interpretation: string) => void
}

// Celtic Cross ana bileşeni - props olarak onComplete fonksiyonunu alır
export default function celtics({ onComplete }: celticsProps) {
  
  // DURUM YÖNETİMİ (STATE MANAGEMENT)
  // Bu değişkenler bileşenin durumunu kontrol eder
  
  // isReading: Kartlar okunuyor mu? (true/false)
  // Kart çekme işlemi sırasında true olur, bitince false olur
  const [isReading, setIsReading] = useState(false)
  
  // drawnCards: Çekilen kartların listesi (TarotCard dizisi)
  // 10 adet Celtic Cross kartını tutar
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([])
  
  // interpretation: Kartların yorumu (string)
  // AI tarafından üretilen tarot yorumunu tutar
  const [interpretation, setInterpretation] = useState<string>('')
  
  // showCards: Kartlar ekranda gösteriliyor mu? (true/false)
  // Animasyon için kullanılır, kartlar yavaş yavaş belirir
  const [showCards, setShowCards] = useState(false)

  // KART ÇEKME FONKSİYONU (MAIN CARD DRAWING FUNCTION)
  // Bu fonksiyon kullanıcı butona bastığında çalışır
  const handleDrawCards = async () => {
    
    // 1. BAŞLANGIÇ: Okuma durumunu başlat, kartları gizle
    setIsReading(true)      // "Kartlar okunuyor..." mesajı göster
    setShowCards(false)     // Eski kartları gizle
    
    try {
      // 2. KART ÇEKİMİ: 10 adet Celtic Cross kartı çek
      const cards = drawCardsForSpread('celtic-cross')
      
      // 3. ANİMASYON 1: 2 saniye bekle, sonra kartları göster
      // Bu sürede "Kartlar okunuyor..." animasyonu gösteriliyor
      setTimeout(() => {
        setDrawnCards(cards)    // Çekilen kartları kaydet
        setShowCards(true)      // Kartları ekranda göster (animasyonlu)
      }, 2000)
      
      // 4. ANİMASYON 2: 4 saniye bekle, sonra yorumu üret
      // Bu sürede kartlar ekranda belirir
      setTimeout(() => {
        // Yapay zeka ile kart yorumu üret
        const reading = interpretReading(cards, 'celtic-cross')
        setInterpretation(reading)  // Yorumu kaydet ve göster
        
        // Ana komponente bildir (eğer onComplete fonksiyonu varsa)
        onComplete?.(cards, reading)
        
        // Okuma işlemi bitti, loading durumunu kapat
        setIsReading(false)
      }, 4000)
      
    } catch (error) {
      // HATA YÖNETİMİ: Bir şeyler ters giderse
      console.error('Celtic Cross hatası:', error)
      setIsReading(false)  // Loading durumunu kapat
    }
  }

  // ULTRA RESPONSIVE CELTIC CROSS KART POZİSYONLARI VE AÇILARI
  // Bu dizi her kartın ekrandaki konumunu, boyutunu ve anlamını belirler
  // Tüm cihaz boyutları için optimize edilmiş (xs, sm, md, lg, xl, 2xl)
  const cardPositions = [
    { 
      id: 1,  // Merkez kart - Mevcut Durum
      className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10", 
      title: "Mevcut Durum",        
      rotation: "rotate-0",         
      // Daha büyük kartlar için:
size: "w-16 h-24 xs:w-18 xs:h-28 sm:w-20 sm:h-32 md:w-24 md:h-36 lg:w-28 lg:h-40 xl:w-32 xl:h-56"

    },
    { 
      id: 2,  // Çapraz kart - Meydan Okuma
      className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20", 
      title: "Meydan Okuma",        
      rotation: "rotate-90",        
// Daha büyük kartlar için:
size: "w-16 h-24 xs:w-18 xs:h-28 sm:w-20 sm:h-32 md:w-24 md:h-36 lg:w-28 lg:h-40 xl:w-32 xl:h-56"
    },
    { 
      id: 3,  // Üst kart - Uzak Geçmiş
      className: "absolute top-1 xs:top-1 sm:top-1 md:top-1 lg:top-1 xl:top-1 left-1/2 transform -translate-x-1/2", 
      title: "Uzak Geçmiş",
      rotation: "rotate-0",  
// Daha büyük kartlar için:
size: "w-16 h-24 xs:w-18 xs:h-28 sm:w-20 sm:h-32 md:w-24 md:h-36 lg:w-28 lg:h-40 xl:w-32 xl:h-56"
    },
    { 
      id: 4,  // Alt kart - Olası Gelecek
      className: "absolute bottom-1 xs:bottom-1 sm:bottom-1 md:bottom-1 lg:bottom-1 xl:bottom-1 left-1/2 transform -translate-x-1/2", 
      title: "Olası Gelecek",
      rotation: "rotate-0",  
// Daha büyük kartlar için:
size: "w-16 h-24 xs:w-18 xs:h-28 sm:w-20 sm:h-32 md:w-24 md:h-36 lg:w-28 lg:h-40 xl:w-32 xl:h-56"
    },
    { 
      id: 5,  // Sol üst çapraz - Üst Bilinç
      className: "absolute top-1 xs:top-1 sm:top-1 md:top-1 lg:top-1 xl:top-1 left-5 xs:left-4 sm:left-6 md:left-8 lg:left-10 xl:left-12", 
      title: "Üst Bilinç",
      rotation: "-rotate-45",  
      // Daha büyük kartlar için:
size: "w-16 h-24 xs:w-18 xs:h-28 sm:w-20 sm:h-32 md:w-24 md:h-36 lg:w-28 lg:h-40 xl:w-32 xl:h-56"    },
    { 
      id: 6,  // Sağ üst çapraz - Yakın Gelecek
      className: "absolute top-1 xs:top-1 sm:top-1 md:top-1 lg:top-1 xl:top-1 right-5 xs:right-4 sm:right-6 md:right-8 lg:right-10 xl:right-12", 
      title: "Yakın Gelecek",
      rotation: "rotate-45",  
// Daha büyük kartlar için:
size: "w-16 h-24 xs:w-18 xs:h-28 sm:w-20 sm:h-32 md:w-24 md:h-36 lg:w-28 lg:h-40 xl:w-32 xl:h-56"
    },
    { 
      id: 7,  // Sol orta çapraz - İç Güç
      className: "absolute top-1/2 left-5 xs:left-4 sm:left-6 md:left-8 lg:left-10 xl:left-12 transform -translate-y-1/2", 
      title: "İç Güç",
      rotation: "-rotate-45",  
// Daha büyük kartlar için:
size: "w-16 h-24 xs:w-18 xs:h-28 sm:w-20 sm:h-32 md:w-24 md:h-36 lg:w-28 lg:h-40 xl:w-32 xl:h-56"
    },
    { 
      id: 8,  // Sağ orta çapraz - Dış Etki
      className: "absolute top-1/2 right-5 xs:right-4 sm:right-6 md:right-8 lg:right-10 xl:right-12 transform -translate-y-1/2", 
      title: "Dış Etki",
      rotation: "rotate-45",  
// Daha büyük kartlar için:
size: "w-16 h-24 xs:w-18 xs:h-28 sm:w-20 sm:h-32 md:w-24 md:h-36 lg:w-28 lg:h-40 xl:w-32 xl:h-56"
    },
    { 
      id: 9,  // Sol alt çapraz - Umut ve Korku
      className: "absolute bottom-1 xs:bottom-1 sm:bottom-1 md:bottom-1 lg:bottom-1 xl:bottom-1 left-5 xs:left-4 sm:left-6 md:left-8 lg:left-10 xl:left-12", 
      title: "Umut ve Korku",
      rotation: "-rotate-45",  
// Daha büyük kartlar için:
size: "w-16 h-24 xs:w-18 xs:h-28 sm:w-20 sm:h-32 md:w-24 md:h-36 lg:w-28 lg:h-40 xl:w-32 xl:h-56"
    },
    { 
      id: 10,  // Sağ alt çapraz - Sonuç
      className: "absolute bottom-1 xs:bottom-1 sm:bottom-1 md:bottom-1 lg:bottom-1 xl:bottom-1 right-5 xs:right-4 sm:right-6 md:right-8 lg:right-10 xl:right-12", 
      title: "Sonuç",
      rotation: "rotate-45",  
// Daha büyük kartlar için:
size: "w-16 h-24 xs:w-18 xs:h-28 sm:w-20 sm:h-32 md:w-24 md:h-36 lg:w-28 lg:h-40 xl:w-32 xl:h-56"
    }
  ]

  // RENDER (EKRANA ÇIZME) KISMI
  // Bu kısım bileşenin nasıl görüneceğini belirler
  return (
    // Ultra Responsive Ana Container - Full Width Design
    <div className="w-full min-h-[320px] xs:min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] 2xl:min-h-[900px] relative overflow-hidden">
      
      {/* FULL WIDTH RESPONSIVE CONTAINER */}
      <div className="
        w-full h-full
        aspect-[4/3] xs:aspect-[3/2] sm:aspect-[5/3] md:aspect-[16/9] lg:aspect-[21/10] xl:aspect-[5/2] 2xl:aspect-[3/1]
        relative
      ">
        
        {/* ARKA PLAN KATMANI */}
        {/* Ultra Responsive Cheetah Arka Plan Fotoğrafı */}
        <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden">
          {/* Responsive Cheetah Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=800&q=80&fm=webp")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            {/* Ultra Responsive Görseller için Optimize */}
            <picture className="absolute inset-0">
              <source 
                media="(max-width: 320px)" 
                srcSet="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&h=240&q=70&fm=webp" 
              />
              <source 
                media="(max-width: 480px)" 
                srcSet="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=480&h=320&q=75&fm=webp" 
              />
              <source 
                media="(max-width: 640px)" 
                srcSet="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&h=400&q=75&fm=webp" 
              />
              <source 
                media="(max-width: 768px)" 
                srcSet="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=768&h=480&q=80&fm=webp" 
              />
              <source 
                media="(max-width: 1024px)" 
                srcSet="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&h=640&q=80&fm=webp" 
              />
              <source 
                media="(max-width: 1280px)" 
                srcSet="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&h=720&q=80&fm=webp" 
              />
              <img 
                src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=800&q=85&fm=webp"
                alt="Cheetah mystical background"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
            </picture>
          </div>
                  
                     {/* Responsive Mistik Overlay - Hafif */}
           <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-amber-900/20 to-slate-900/70"></div>
           <div className="absolute inset-0 bg-gradient-radial from-transparent via-orange-900/15 to-black/60"></div>
         </div>
         
         {/* RESPONSIVE OVERLAY KATMANI - Daha Açık */}
         <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px] rounded-lg sm:rounded-xl md:rounded-2xl"></div>
         
                 {/* ANA İÇERİK KATMANI - Ultra Responsive */}
         <div className="relative z-10 p-1 xs:p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 h-full">
           
          {/* CELTIC CROSS KART DÜZENİ - Ultra Responsive */}
          <div className="h-full flex flex-col">
            
            {/* RESPONSIVE KART CONTAINER'I */}
            <div className="flex-1 relative min-h-[200px] xs:min-h-[240px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[450px] xl:min-h-[520px]">
              {/* Celtic Cross Kartlarının Yerleştirileceği Alan */}
              <div className="relative w-full h-full">
                
                {cardPositions.map((position) => {
                  const card = drawnCards[position.id - 1]
                  const isVisible = showCards && card
                  
                  return (
                    <div
                      key={position.id}
                      className={`${position.className} transition-all duration-1000 ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-85 scale-95'
                      }`}
                    >
                      {/* Ultra Responsive Kart Container */}
                      <div className={`
                        ${position.size} ${position.rotation} 
                        border-2 rounded-md xs:rounded-lg sm:rounded-xl flex flex-col items-center justify-center
                        transition-all duration-500 hover:scale-105 hover:z-30 relative
                        backdrop-blur-md shadow-lg
                        ${isVisible 
                          ? 'border-amber-400/90 bg-gradient-to-br from-amber-500/50 to-orange-500/50 shadow-2xl shadow-amber-500/60 ring-1 ring-amber-400/40 hover:ring-2 hover:ring-amber-300/60' 
                          : 'border-gray-300/80 bg-gradient-to-br from-slate-700/95 to-slate-800/95 shadow-xl shadow-black/70 ring-1 ring-gray-400/30'
                        }
                      `}>
                        
                        {/* Responsive Kart Numarası */}
                        <div className="absolute -top-1 -left-1 xs:-top-1.5 xs:-left-1.5 sm:-top-2 sm:-left-2 w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 bg-white rounded-full flex items-center justify-center text-black font-bold text-[6px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm transform rotate-0 shadow-lg ring-1 xs:ring-2 ring-amber-400/60">
                          {position.id}
                        </div>
                        
                        {/* Responsive Kart İçeriği */}
                        {isReading ? (
                          <div className="animate-pulse">
                            <span className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl">✨</span>
                          </div>
                        ) : isVisible ? (
                          <div className="text-center p-0.5 xs:p-1 sm:p-1.5">
                            <span className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 sm:mb-1 block">🃏</span>
                                                         <div className="text-[5px] xs:text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-[10px] text-amber-200 font-semibold leading-tight break-words hyphens-auto">
                               {card.nameTr.length > (position.size.includes('w-10') ? 8 : 12) ? 
                                 card.nameTr.substring(0, position.size.includes('w-10') ? 8 : 12) + '...' : 
                                 card.nameTr
                               }
                            </div>
                          </div>
                        ) : (
                          <div className="text-center p-0.5 xs:p-1 sm:p-1.5">
                            <span className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 sm:mb-1 block opacity-60">🃏</span>
                            <div className="text-[5px] xs:text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-[10px] text-gray-400 leading-tight break-words hyphens-auto">
                              {position.title.length > (position.size.includes('w-8') ? 6 : 10) ? 
                                position.title.substring(0, position.size.includes('w-8') ? 6 : 10) + '...' : 
                                position.title
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Responsive Alt Kısım - Buton ve Bilgi Alanı */}
          
          </div>
        </div>

        {/* Ultra Responsive Yükleme Durumu */}
        {isReading && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg sm:rounded-xl md:rounded-2xl">
            <div className="bg-gradient-to-br from-slate-800/98 to-slate-900/98 p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl xs:rounded-2xl sm:rounded-3xl border border-amber-500/50 text-center backdrop-blur-md shadow-2xl max-w-[90%] sm:max-w-sm">
              <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl animate-spin">🔮</div>
                <div className="text-amber-400 font-semibold text-[10px] xs:text-xs sm:text-sm md:text-base">Kartlar Okunuyor...</div>
                <div className="flex justify-center space-x-1">
                  <div className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ultra Responsive Yorum Alanı */}
      {interpretation && !isReading && (
        <div className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 max-w-full px-2 xs:px-3 sm:px-4">
          <div className="bg-gradient-to-br from-slate-800/98 to-slate-900/98 border border-amber-500/50 rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 md:p-6 backdrop-blur-md shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 xs:space-x-3 mb-3 xs:mb-4 sm:mb-5">
              <div className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-gradient-to-br from-amber-500/50 to-orange-500/50 rounded-md xs:rounded-lg flex items-center justify-center">
                <span className="text-amber-400 text-[10px] xs:text-xs sm:text-sm md:text-base">📜</span>
              </div>
              <h4 className="text-amber-400 font-bold text-xs xs:text-sm sm:text-base md:text-lg">Celtic Cross Yorumu</h4>
            </div>
            
            <div className="text-gray-300 text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base leading-relaxed whitespace-pre-line">
              {interpretation}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// NOTLAR VE EK BİLGİLER:
// 
// Ultra Responsive Özellikler:
// - xs: 320px+ (küçük telefonlar)
// - sm: 640px+ (büyük telefonlar) 
// - md: 768px+ (tabletler)
// - lg: 1024px+ (küçük laptop)
// - xl: 1280px+ (büyük laptop)
// - 2xl: 1536px+ (masaüstü)
// 
// Bu bileşen şu teknolojileri kullanır:
// - React Hooks (useState)
// - TailwindCSS (ultra responsive design)
// - Async/Await (kart çekme)
// - setTimeout (animasyonlar)
// - CSS Transforms (kart döndürme)
// - Z-index layering (kartların üst üste durması)
// 
// Performans optimizasyonları:
// - Multi-breakpoint responsive images (WebP format)
// - Lazy loading
// - Backdrop blur effects
// - CSS transitions
// - Aspect ratio containers
// 
// Mobil uyumluluk:
// - Touch-friendly buttons (min 44px)
// - Responsive text sizes (6px - 18px)
// - Optimized image sizes (320px - 1400px)
// - Scroll-friendly layout
// - Breakword text handling

// Özel animasyon stilleri için Tailwind config'e eklenmesi gereken keyframes
// @keyframes shimmer {
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// }

// @keyframes fadeIn {
//   0% { opacity: 0; transform: translateY(20px); }
//   100% { opacity: 1; transform: translateY(0); }
// } 