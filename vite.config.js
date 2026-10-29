import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Served from the root of mahirabdullah.dev (see public/CNAME).
  base: '/',
  server: {
    port: 5174,
  },
}));
