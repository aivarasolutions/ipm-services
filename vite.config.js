import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [react(),tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };

  // Development server configuration (for Replit environment)
  if (command === 'serve') {
    config.server = {
      host: '0.0.0.0',
      port: 5000,
      allowedHosts: true,
      hmr: {
        clientPort: 5000,
      },
    };
  }

  // Base URL configuration for different deployment platforms
  // For GitHub Pages, set VITE_BASE_PATH environment variable to your repo name
  // For Vercel/Netlify, it defaults to root path '/'
  const basePath = process.env.VITE_BASE_PATH || '/';
  config.base = basePath;

  return config;
})
