import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Run `wrangler dev` alongside `npm run dev` to serve /api/* locally
    // (see pnp-web/worker/index.js) — Vite proxies API calls to it.
    proxy: {
      '/api': 'http://127.0.0.1:8787',
    },
  },
})
