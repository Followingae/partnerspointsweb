import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Partners Points - Business Loyalty Platform',
    short_name: 'Partners Points',
    description: 'Reward smarter, not cheaper. Replace blanket discounts with points that bring customers back—while you only pay on redeemed sales.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a2540',
    categories: ['business', 'finance', 'shopping'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.png', 
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  }
}