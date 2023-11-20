/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/configs/vitestSetup.ts'],
    reporters: ['default', 'vitest-sonar-reporter'],
    // @ts-ignore
    sonarReporterOptions: { silent: true },
    outputFile: 'sonar-report.xml',
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
  },
})
