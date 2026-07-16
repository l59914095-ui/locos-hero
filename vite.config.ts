import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base = nombre del repo para GitHub Pages de proyecto
export default defineConfig({
  base: '/locos-hero/',
  plugins: [react()],
})
