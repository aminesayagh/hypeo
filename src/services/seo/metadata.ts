import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hypeo',
  description: "Hypeo est la première plateforme de marketing d'influence alimentée par l'IA, conçue pour la région MENA et au-delà. Elle connecte les marques, les agences et les créateurs grâce à des outils intelligents qui simplifient la collaboration, la gestion des campagnes et le suivi des performances.",
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '16x16 32x32',
        type: 'image/x-icon',
      },
      {
        url: '/hypeo_logo_square.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/favicon.ico',
    apple: [
      {
        url: '/hypeo_logo_square.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/hypeo_logo_square.svg',
        color: '#E0F74E',
      },
    ],
  },
}
