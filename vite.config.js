import { defineConfig } from 'vite'
import process from 'node:process'
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
import { isEducationDocument, renderEducationDocument } from './server/education/render.js'

const routeStructuredDataPlugin = () => ({
  name: 'route-source-content',
  configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      const pathname = new URL(request.url || '/', 'https://www.ipm.services').pathname
      const propertySlug = getPropertySlugFromPath(pathname)
      if (!propertySlug) return next()

      try {
        await getListing(propertySlug)
        return next()
      } catch (error) {
        if (error.status !== 404) return next(error)
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.end('<!doctype html><html lang="en"><head><meta name="robots" content="noindex, nofollow"><title>Page Not Found | IPM</title></head><body><main><h1>Page not found</h1><p>The requested property is not in the current IPM portfolio.</p><a href="/properties">View available properties</a></main></body></html>')
      }
    })
  },
  transformIndexHtml: {
    order: 'post',
    async handler(html, ctx) {
      const requestedPath = new URL(ctx.originalUrl || ctx.path || '/', 'https://www.ipm.services').pathname
      const pathname = requestedPath === '/index.html' ? '/' : requestedPath
      const options = {}
      if (isEducationDocument(pathname)) {
        const locale = pathname.startsWith('/es/') ? 'es' : 'en'
        const slug = pathname.match(/\/learn\/([^/]+)$/)?.[1]
        try {
          if (slug) {
            const response = await fetch(`http://127.0.0.1:3001/api/education/articles/${locale}/${slug}`)
            if (response.ok) {
              const data = await response.json()
              options.educationArticle = data.article
              options.educationAlternates = data.alternates
            }
          } else if (!/^\/(?:sign-in|sign-up|admin)/.test(pathname)) {
            const response = await fetch(`http://127.0.0.1:3001/api/education/catalogue?locale=${locale}`)
            if (response.ok) options.educationCatalogue = await response.json()
            if (pathname.endsWith('/whop')) {
              const whopResponse = await fetch('http://127.0.0.1:3001/api/education/whop')
              if (whopResponse.ok) options.educationWhop = await whopResponse.json()
            }
          }
        } catch { /* App shows the explicit API error; no fake content fallback. */ }
        return renderEducationDocument(html, pathname, options)
      }
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
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react(), tailwindcss({ optimize: false }), routeStructuredDataPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
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
