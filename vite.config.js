import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Almax Sales Tracker',
        short_name: 'Almax',
        description: 'Almax Professional Painters Tools — Sales Rep App',
        theme_color: '#0099D6',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: '/almax-logo.png', sizes: '192x192', type: 'image/png' },
          { src: '/almax-logo.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
  server: {
    host: true,
  },
})
