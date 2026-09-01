import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import {
  REAL_ESTATE_SCHEMA_LISTINGS,
  injectStructuredDataIntoHtml,
} from './src/lib/structuredData.js'
import {
  getPropertySlugFromPath,
  getRealEstateSlugFromPath,
  injectSeoMetadataIntoHtml,
} from './src/lib/seo.js'
import { getListing, getListings } from './server/hostawayService.js'

const routeStructuredDataPlugin = () => ({
  name: 'route-source-content',
  transformIndexHtml: {
    order: 'post',
    async handler(html, ctx) {
      const requestedPath = new URL(ctx.originalUrl || ctx.path || '/', 'https://www.ipm.services').pathname
      const pathname = requestedPath === '/index.html' ? '/' : requestedPath
      const options = {}
      const propertySlug = getPropertySlugFromPath(pathname)
      const realEstateSlug = getRealEstateSlugFromPath(pathname)

      if (pathname === '/properties' || propertySlug) {
        try {
          if (pathname === '/properties') {
            options.properties = await getListings()
          } else {
            options.property = await getListing(propertySlug)
          }
        } catch (error) {
          console.warn(`[seo] development property source unavailable for ${pathname}:`, error.message)
        }
      }

      if (realEstateSlug) {
        options.realEstateListing = REAL_ESTATE_SCHEMA_LISTINGS.find((listing) => listing.slug === realEstateSlug)
      }

      const seoHtml = injectSeoMetadataIntoHtml(html, pathname, options) || html
      return injectStructuredDataIntoHtml(
        seoHtml,
        pathname,
        options,
      )
    },
  },
})

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [react(), tailwindcss(), routeStructuredDataPlugin()],
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
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
        '/sitemap.xml': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
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
