# International Property Management - Frontend Application

## Overview
This is a React-based Single Page Application (SPA) for International Property Management, a luxury vacation rental management service. The application showcases properties in Playa del Carmen, Tulum, and Lake Norman with comprehensive property management services.

## Project Architecture
- **Frontend**: React 19 with Vite build system
- **UI Framework**: Tailwind CSS with Radix UI components
- **Routing**: React Router DOM for SPA navigation
- **Build Tool**: Vite with modern ES modules
- **Package Manager**: npm (with legacy peer deps for React 19 compatibility)

## Development Setup
- **Development Server**: Configured for Replit environment on port 5000
- **Host Configuration**: 0.0.0.0 with allowedHosts: true for proxy compatibility
- **Hot Module Reload**: Enabled with client port 5000

## Key Features
- Responsive design with modern UI components
- Property showcase with detailed views
- Contact forms with validation
- Owner portal access
- SEO optimized with structured data
- Service pages for property management offerings
- Integrated chatbot widget for instant visitor assistance
- Background music system with user controls

## Deployment Configuration
- **Target**: Autoscale (stateless web application)
- **Build Command**: npm run build
- **Start Command**: npm run preview
- **Production Port**: 5000 with 0.0.0.0 host binding

## Recent Changes
### 2025-10-15
- Integrated IPM chatbot widget (https://ipm-chatbot.replit.app)
- Updated homepage hero image with improved title positioning
- Chatbot configured with light theme, English language, bottom-right position

### 2025-09-18
- Configured Vite for Replit environment compatibility
- Set up development workflow on port 5000
- Resolved React 19 dependency conflicts with --legacy-peer-deps
- Configured deployment settings for production
- Successfully tested build process

## File Structure
- `/src/pages/` - Main application pages (Home, About, Services, Properties, etc.)
- `/src/components/` - Reusable components including UI library
- `/src/assets/` - Static assets (images)
- `/public/` - Public assets and metadata files