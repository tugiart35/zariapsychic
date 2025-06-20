/*
  Alt Navigasyon Bileşeni
  Bu bileşen mobil cihazlarda alt kısımda sabit duran navigasyon çubuğunu oluşturur.
  Tarot, numeroloji ve profil sayfalarına hızlı erişim sağlar.
*/

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Navigasyon öğeleri - her öğe bir sayfa
const navigationItems = [
  {
    name: 'Ana Sayfa',
    href: '/',
    icon: '🏠',
    activeIcon: '🏡'
  },
  {
    name: 'Tarot',
    href: '/a-tarot',
    icon: '🃏',
    activeIcon: '🔮'
  },
  {
    name: 'Numeroloji',
    href: '/b-numerology',
    icon: '🔢',
    activeIcon: '✨'
  },
  {
    name: 'Profil',
    href: '/profile',
    icon: '👤',
    activeIcon: '🌟'
  }
]

export default function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-purple-500/20">
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex flex-col items-center justify-center px-3 py-2 rounded-lg
                transition-all duration-300 min-w-0 flex-1
                ${isActive 
                  ? 'text-purple-400 bg-purple-500/10 mystical-glow' 
                  : 'text-gray-400 hover:text-purple-300 hover:bg-purple-500/5'
                }
              `}
            >
              <span className="text-xl mb-1">
                {isActive ? item.activeIcon : item.icon}
              </span>
              <span className="text-xs font-medium truncate">
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 