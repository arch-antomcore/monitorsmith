import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'gsap/ScrollTrigger': path.resolve(__dirname, './src/vendor/gsap/ScrollTrigger.js'),
      'gsap/ScrollToPlugin': path.resolve(__dirname, './src/vendor/gsap/ScrollToPlugin.js'),
      'gsap/CustomEase': path.resolve(__dirname, './src/vendor/gsap/CustomEase.js'),
      'gsap/Flip': path.resolve(__dirname, './src/vendor/gsap/Flip.js'),
      'gsap': path.resolve(__dirname, './src/vendor/gsap/index.js'),
    },
  },
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('vendor/gsap')) return 'vendor-gsap'
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react-dom') || id.includes('/react/')) return 'vendor-react'
          if (id.includes('framer-motion')) return 'vendor-motion'
          return undefined
        },
      },
    },
  },
})
