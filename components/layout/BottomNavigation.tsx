/*
  Alt Navigasyon Bileşeni - Profesyonel Tasarım
  Bu bileşen mobil cihazlarda alt kısımda sabit duran navigasyon çubuğunu oluşturur.
  Görseldeki tasarıma uygun olarak düzenlenmiştir.
*/

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Navigasyon öğeleri - görseldeki tasarıma uygun
const navigationItems = [
  {
    name: 'Tarot',
    href: '/a-tarot',
    icon: '⭐',
    activeIcon: '⭐'
  },
  {
    name: 'Numerology',
    href: '/b-numerology',
    icon: '📊',
    activeIcon: '📊'
  },
  {
    name: 'Anasayfa',
    href: '/',
    icon: '💛',
    activeIcon: '💛'
  },
  {
    name: 'Hakkında',
    href: '/hakkinda',
    icon: '💙',
    activeIcon: '💙'
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: '👤',
    activeIcon: '👤'
  },
  {
    name: 'History',
    href: '/history',
    icon: '📋',
    activeIcon: '📋'
  }
]

export default function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-700">
      <div className="flex items-center justify-around h-16 px-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex flex-col items-center justify-center px-2 py-2 rounded-lg
                transition-all duration-300 min-w-0 flex-1
                ${isActive 
                  ? 'text-amber-400' 
                  : 'text-gray-500 hover:text-gray-300'
                }
              `}
            >
              <span className="text-lg mb-1">
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