import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    clearMocks: true,

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'src/components/**/*.{jsx,js}',
        'src/services/**/*.js',
        'src/utils/**/*.js',
        'src/context/**/*.{jsx,js}',
      ],
      exclude: ['src/main.jsx', 'src/test/**', 'src/data/**'],
    },
  },
})
