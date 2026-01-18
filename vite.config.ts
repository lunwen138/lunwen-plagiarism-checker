import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/lunwen-plagiarism-checker/',
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    emptyOutDir: true,
  },
})