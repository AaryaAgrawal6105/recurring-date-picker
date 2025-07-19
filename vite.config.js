import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js'
  },
  server: {
    host: true,
    strictPort: true,
    port: 5173,
    allowedHosts: ['5173-aaryaagrawa-recurringda-xvzg20yi5u1.ws-us120.gitpod.io'], 
  },
});
