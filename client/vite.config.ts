import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Generate unique hashes for chunks to use with CSP
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    },
    // Ensure CSS is extracted to separate files
    cssCodeSplit: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://ironhexwebsite-production.up.railway.app',
        changeOrigin: true,
        secure: false
      }
    },
    // Add CSP headers in development
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval'", // Vite HMR requires unsafe-eval in dev
        "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com",
        "font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        "connect-src 'self' ws://localhost:5173 http://localhost:8000 https://api.ironhex-tech.com https://ironhexwebsite-production.up.railway.app",
        "frame-src 'self' https://www.google.com https://maps.google.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; ')
    }
  }
})
