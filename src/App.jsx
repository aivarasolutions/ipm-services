import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import './real-estate-styles.css'
import './audio-styles.css'

// Keep the homepage in the initial bundle; load other pages only when visited.
import Home from './pages/Home'
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Properties = lazy(() => import('./pages/Properties'))
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const OwnerPortal = lazy(() => import('./pages/OwnerPortal'))
const RealEstate = lazy(() => import('./pages/RealEstate'))
const RealEstateDetail = lazy(() => import('./pages/RealEstateDetail'))
const LocationGuide = lazy(() => import('./pages/LocationGuide'))
const News = lazy(() => import('./pages/News'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'))
const Insights = lazy(() => import('./pages/Insights'))
const AirbnbFees = lazy(() => import('./pages/insights/AirbnbFees'))
const ApiCosts = lazy(() => import('./pages/insights/ApiCosts'))
const AvoidFees = lazy(() => import('./pages/insights/AvoidFees'))
const CheckinSystem = lazy(() => import('./pages/insights/CheckinSystem'))
const CharlotteProposal = lazy(() => import('./pages/CharloetteProposal'))
const TampaProposal = lazy(() => import('./pages/TampaProposal'))
const TimberbrookProposal = lazy(() => import('./pages/TimberbrookProposal'))
const StAugustineProposal = lazy(() => import('./pages/StAugustineProposal'))
const TegucigalpaChecklist = lazy(() => import('./pages/TegucigalpaChecklist'))
const Vietnam = lazy(() => import('./pages/Vietnam'))
const Onboarding = lazy(() => import('./pages/Onboarding'))

// Import components
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LeadPopup from './components/LeadPopup'
import RouteStructuredData from './components/RouteStructuredData'
import RouteSeo from './components/RouteSeo'
import { AudioProvider } from './contexts/AudioContext'
import { LanguageProvider } from './contexts/LanguageContext'

const STANDALONE_ROUTES = ['/proposal/charlotte-downhaul', '/proposal/tampa-audrey', '/proposal/charlotte-timberbrook', '/proposal/staugustine-crossroad', '/insights/tegucigalpa-checklist', '/onboarding', '/es/onboarding'];

function AppLayout() {
  const location = useLocation();
  const isStandalone = STANDALONE_ROUTES.includes(location.pathname);

  if (isStandalone) {
    return (
      <>
        <RouteSeo />
        <Suspense fallback={<div className="min-h-[70vh] bg-[#06121F]" />}>
        <Routes>
          <Route path="/proposal/charlotte-downhaul" element={<CharlotteProposal />} />
          <Route path="/proposal/tampa-audrey" element={<TampaProposal />} />
          <Route path="/proposal/charlotte-timberbrook" element={<TimberbrookProposal />} />
          <Route path="/proposal/staugustine-crossroad" element={<StAugustineProposal />} />
          <Route path="/insights/tegucigalpa-checklist" element={<TegucigalpaChecklist />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/es/onboarding" element={<Onboarding />} />
        </Routes>
        </Suspense>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#06121F] flex flex-col">
      <ScrollToTop />
      <RouteSeo />
      <RouteStructuredData />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[70vh] bg-[#06121F]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<PropertyDetail />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/real-estate/:slug" element={<RealEstateDetail />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/airbnb-fees" element={<AirbnbFees />} />
          <Route path="/insights/api-costs" element={<ApiCosts />} />
          <Route path="/insights/avoid-fees" element={<AvoidFees />} />
          <Route path="/insights/checkin-system" element={<CheckinSystem />} />
          <Route path="/news" element={<News />} />
          <Route path="/vietnam" element={<Vietnam />} />
          <Route path="/location-guide" element={<LocationGuide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/owner-portal" element={<OwnerPortal />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          {['es', 'fr'].flatMap((locale) => [
            <Route key={`${locale}-home`} path={`/${locale}/`} element={<Home />} />,
            <Route key={`${locale}-about`} path={`/${locale}/about`} element={<About />} />,
            <Route key={`${locale}-services`} path={`/${locale}/services`} element={<Services />} />,
            <Route key={`${locale}-properties`} path={`/${locale}/properties`} element={<Properties />} />,
            <Route key={`${locale}-real-estate`} path={`/${locale}/real-estate`} element={<RealEstate />} />,
            <Route key={`${locale}-insights`} path={`/${locale}/insights`} element={<Insights />} />,
            <Route key={`${locale}-news`} path={`/${locale}/news`} element={<News />} />,
            <Route key={`${locale}-contact`} path={`/${locale}/contact`} element={<Contact />} />,
          ])}
          <Route path="/vi/vietnam" element={<Vietnam />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <LeadPopup />
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#06121F] px-6 text-center text-white">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F2D98D]">IPM International Property Management</p>
        <h1 className="mb-4 font-display text-4xl font-bold">Page not found</h1>
        <p className="mb-8 max-w-xl text-[#C9D2DE]">The page you requested is not available.</p>
        <a href="/" className="inline-flex rounded-lg bg-[#D4AF37] px-6 py-3 font-bold text-[#06121F] hover:bg-[#F2D98D]">Return home</a>
      </div>
    </div>
  );
}

function App() {
  const basename = import.meta.env.BASE_URL;

  return (
    <Router basename={basename}>
      <LanguageProvider>
        <AudioProvider>
          <AppLayout />
        </AudioProvider>
      </LanguageProvider>
    </Router>
  )
}

export default App

