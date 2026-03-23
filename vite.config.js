import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  base: '/cards3/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,woff,woff2,ttf,ico,svg,png,avif}'],
        navigateFallback: '/cards3/index.html',
        navigateFallbackDenylist: [/^\/cards3\/repo\//],
        mode: 'development',
      },
      manifest: {
        name: 'Cards',
        short_name: 'Cards',
        description: 'Flashcards para aprender',
        theme_color: '#584592',
        background_color: '#f1f5f9',
        display: 'fullscreen',
        start_url: '/cards3/',
        scope: '/cards3/',
        icons: [
          {
            src: '/cards3/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/cards3/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
