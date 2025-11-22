import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import Insights from './pages/Insights'
import AirbnbFees from './pages/insights/AirbnbFees'
import ApiCosts from './pages/insights/ApiCosts'
import AvoidFees from './pages/insights/AvoidFees'
import CheckinSystem from './pages/insights/CheckinSystem'
import VideoLibrary from './pages/insights/VideoLibrary'

// Import components
import Header from './components/Header'
import Footer from './components/Footer'
import { AudioProvider } from './contexts/AudioContext'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  // Use Vite's BASE_URL for router basename to support GitHub Pages subpath deployment
  const basename = import.meta.env.BASE_URL;

  return (
    <LanguageProvider>
      <AudioProvider>
        <Router basename={basename}>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
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
              <Route path="/insights/video-library" element={<VideoLibrary />} />
              <Route path="/news" element={<News />} />
              <Route path="/location-guide" element={<LocationGuide />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/owner-portal" element={<OwnerPortal />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AudioProvider>
    </LanguageProvider>
  )
}

export default App

