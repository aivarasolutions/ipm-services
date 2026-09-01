import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import './real-estate-styles.css'
import './audio-styles.css'

// Import pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import Contact from './pages/Contact'
import OwnerPortal from './pages/OwnerPortal'
import RealEstate from './pages/RealEstate'
import RealEstateDetail from './pages/RealEstateDetail'
import LocationGuide from './pages/LocationGuide'
import News from './pages/News'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import Insights from './pages/Insights'
import AirbnbFees from './pages/insights/AirbnbFees'
import ApiCosts from './pages/insights/ApiCosts'
import AvoidFees from './pages/insights/AvoidFees'
import CheckinSystem from './pages/insights/CheckinSystem'
import CharlotteProposal from './pages/CharloetteProposal'
import TampaProposal from './pages/TampaProposal'
import TimberbrookProposal from './pages/TimberbrookProposal'
import StAugustineProposal from './pages/StAugustineProposal'
import TegucigalpaChecklist from './pages/TegucigalpaChecklist'
import Vietnam from './pages/Vietnam'

// Import components
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LeadPopup from './components/LeadPopup'
import RouteStructuredData from './components/RouteStructuredData'
import RouteSeo from './components/RouteSeo'
import { AudioProvider } from './contexts/AudioContext'
import { LanguageProvider } from './contexts/LanguageContext'

const STANDALONE_ROUTES = ['/proposal/charlotte-downhaul', '/proposal/tampa-audrey', '/proposal/charlotte-timberbrook', '/proposal/staugustine-crossroad', '/insights/tegucigalpa-checklist'];

function AppLayout() {
  const location = useLocation();
  const isStandalone = STANDALONE_ROUTES.includes(location.pathname);

  if (isStandalone) {
    return (
      <Routes>
        <Route path="/proposal/charlotte-downhaul" element={<CharlotteProposal />} />
        <Route path="/proposal/tampa-audrey" element={<TampaProposal />} />
        <Route path="/proposal/charlotte-timberbrook" element={<TimberbrookProposal />} />
        <Route path="/proposal/staugustine-crossroad" element={<StAugustineProposal />} />
        <Route path="/insights/tegucigalpa-checklist" element={<TegucigalpaChecklist />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-[#06121F] flex flex-col">
      <ScrollToTop />
      <RouteSeo />
      <RouteStructuredData />
      <Header />
      <main className="flex-1">
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
          <Route path="*" element={<NotFound />} />
        </Routes>
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
    <LanguageProvider>
      <AudioProvider>
        <Router basename={basename}>
          <AppLayout />
        </Router>
      </AudioProvider>
    </LanguageProvider>
  )
}

export default App

