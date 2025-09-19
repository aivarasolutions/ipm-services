import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './real-estate-styles.css'

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

// Import components
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  // Use Vite's BASE_URL for router basename to support GitHub Pages subpath deployment
  const basename = import.meta.env.BASE_URL;

  return (
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/owner-portal" element={<OwnerPortal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

