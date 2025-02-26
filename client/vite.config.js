import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://reciperadar-app.onrender.com",
      routes: ["/", "/about", "/recipes", "/contact"],
    }),
  ],
  server: {
    port: process.env.PORT || 5173,
    host: '0.0.0.0',
  },
  define: {
    'process.env': {},
  },
});