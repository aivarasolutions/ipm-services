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
- Background music system with user controls
- AI-powered chatbot for instant property assistance
- Bilingual News page (English/Spanish) with vacation rental market updates
- Comprehensive Insights section with 5 educational subpages on Airbnb hosting strategies

## Deployment Configuration
- **Target**: Autoscale (stateless web application)
- **Build Command**: npm run build
- **Start Command**: npm run preview
- **Production Port**: 5000 with 0.0.0.0 host binding

## Recent Changes
### 2025-11-22
- **Added comprehensive Insights section** - Educational content hub for short-term rental hosts
  - Created main Insights hub page with overview and 5 topic cards
  - Built 5 detailed subpages with professional layouts:
    1. Airbnb Fees Explained - Fee model comparisons and host impact analysis
    2. API Connections & Hidden Costs - PMS integration cost breakdown
    3. How to Avoid the 15.5% Fee - Step-by-step guide to reduce Airbnb fees
    4. Check-In System Design (IPM Method) - API-free automation workflows
    5. IPM Video Library - Placeholder sections for future video content
  - Added Insights dropdown menu in header (desktop hover, mobile expandable)
  - All pages include professional CTAs and "Schedule a Call" buttons
  - Responsive design with color-coded sections and modern UI components
  - Integrated with existing React Router navigation structure

### 2025-11-20
- **Enhanced News page with images and executive summary**
  - Added professional stock images to all 4 news articles
  - Created comprehensive executive summary highlighting market impact on vacation rental owners
  - Executive summary includes 5 key takeaways: oversupply crisis, occupancy collapse, revenue impact, regulatory risk, and professional management importance
  - Articles now feature side-by-side layout with images on desktop
  - Bilingual support for executive summary (English/Spanish)
- **Added bilingual News page** - Market updates on Quintana Roo vacation rental industry
- English/Spanish language toggle with complete translations for all content
- Blog-style layout featuring 4 current news articles with summaries
- Links to source articles from Newsday Caribe, El Economista, La Jornada, and Caribe Peninsular
- News tab added to navigation with indigo color scheme
- **Fixed React 19 compatibility** - Upgraded react-day-picker from 8.10.1 to 9.4.5 for React 19 support

### 2025-10-22
- **Successfully integrated IPM chatbot** - Blue chat bubble in bottom-right corner
- Chatbot connects to https://ipm-chatbot.replit.app/api for AI property assistance
- Fixed text wrapping issues in chatbot CSS (messages now display properly at 85% max-width)
- Popup chat window with property expert branding and proper message formatting
- Production build created with working chatbot integration

### 2025-10-15
- Updated homepage hero image with improved title positioning

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