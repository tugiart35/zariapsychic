/*
  Tailwind CSS Konfigürasyon Dosyası
  Bu dosya Tailwind CSS'in hangi dosyaları tarayacağını ve 
  hangi özel stilleri kullanacağını belirler.
*/

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Özel renkler - mistik tema
      colors: {
        'mystik-purple': {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        'mystik-indigo': {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        }
      },
      // Özel animasyonlar
      animation: {
        'mystical-pulse': 'mystical-pulse 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'scaleIn': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        'mystical-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.6), 0 0 40px rgba(168, 85, 247, 0.3)' 
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fadeIn': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slideUp': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scaleIn': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      // Özel fontlar
      fontFamily: {
        'mystik': ['Cinzel', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      // Özel spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}

export default config
