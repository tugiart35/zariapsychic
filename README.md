# Mobil Tarot Uygulaması

Bu proje, Next.js 14 ve TypeScript kullanılarak geliştirilmiş modern bir tarot ve numeroloji uygulamasıdır.

## Özellikler

- 🃏 Tarot kartı okuma
- 🔢 Numeroloji hesaplamaları
- 📱 Mobil uyumlu tasarım
- ⚡ Hızlı ve modern arayüz
- 🎨 Tailwind CSS ile güzel tasarım

## Teknolojiler

- **Framework:** Next.js 14
- **Dil:** TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Turbopack

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/kullaniciadi/mobil-tarot-app.git
cd mobil-tarot-app
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Kullanım

### Tarot Kartı Okuma
- Ana sayfada "Tarot Kartı Çek" butonuna tıklayın
- Kartınızı seçin ve yorumunuzu okuyun

### Numeroloji
- Numeroloji sayfasına gidin
- Doğum tarihinizi girin
- Numeroloji hesaplamalarınızı görün

## Proje Yapısı

```
mobil-tarot-app/
├── app/                    # Next.js 14 app router
│   ├── (main)/            # Ana sayfa grupları
│   │   ├── a-tarot/       # Tarot sayfası
│   │   ├── b-numerology/  # Numeroloji sayfası
│   │   └── page.tsx       # Ana sayfa
│   ├── globals.css        # Global stiller
│   └── layout.tsx         # Ana layout
├── components/            # React bileşenleri
│   ├── layout/           # Layout bileşenleri
│   ├── specific/         # Özel bileşenler
│   └── ui/               # UI bileşenleri
├── lib/                  # Yardımcı fonksiyonlar
│   ├── a-tarot-helpers.ts
│   ├── b-numerology-helpers.ts
│   └── utils.ts
└── public/               # Statik dosyalar
    ├── icons/            # İkonlar
    └── images/           # Görseller
```

## Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim

Sorularınız için: [email@example.com](mailto:email@example.com)
