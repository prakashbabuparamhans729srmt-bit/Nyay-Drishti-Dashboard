import type { MetadataRoute } from 'next'

/**
 * @fileOverview PWA Manifest configuration for NyayDrishti.
 * This file enables the "Install" feature on mobile and desktop devices.
 */

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'न्यायदृष्टि - न्यायिक डैशबोर्ड',
    short_name: 'न्यायदृष्टि',
    description: 'Proactive Judicial System Monitoring and Analysis Dashboard - A to Z Neural Flow Activated',
    start_url: '/',
    display: 'standalone',
    background_color: '#070707',
    theme_color: '#07F1D6',
    icons: [
      {
        src: 'https://picsum.photos/seed/nyaylogo/192/192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'https://picsum.photos/seed/nyaylogo/512/512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
