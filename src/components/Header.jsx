import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { useAudio } from '../contexts/AudioContext'

const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isPlaying, volume, toggleMusic, changeVolume } = useAudio()

  const navItems = [
    { name: 'Home', path: '/', color: 'bg-green-500 text-white' },
    { name: 'Services', path: '/services', color: 'bg-blue-600 text-white' },
    { name: 'Properties', path: '/properties', color: 'bg-orange-500 text-white' },
    { name: 'Real Estate', path: '/real-estate', color: 'bg-red-600 text-white' },
    { name: 'News', path: '/news', color: 'bg-indigo-600 text-white' },
    { name: 'Relocation Guide', path: '/location-guide', color: 'bg-teal-600 text-white' },
    { name: 'Contact', path: '/contact', color: 'bg-gray-600 text-white' },
    { name: 'Owner Portal', path: '/owner-portal', color: 'bg-purple-600 text-white' }
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="IPM International Property Management" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path}>
                <Button
                  variant="ghost"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? item.color
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Music Controls & Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Music Controls */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMusic}
                className="p-1 h-8 w-8"
                title={isPlaying ? 'Pause Music' : 'Play Music'}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 text-gray-600" />
                ) : (
                  <Play className="h-4 w-4 text-gray-600" />
                )}
              </Button>
              
              <div className="flex items-center space-x-1">
                {volume === 0 ? (
                  <VolumeX className="h-4 w-4 text-gray-500" />
                ) : (
                  <Volume2 className="h-4 w-4 text-gray-500" />
                )}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => changeVolume(parseFloat(e.target.value))}
                  className="w-16 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  title={`Volume: ${Math.round(volume * 100)}%`}
                />
              </div>
            </div>
            
            <Link to="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Music Controls */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center space-x-4 py-3">
                <Button
                  variant="ghost"
                  onClick={toggleMusic}
                  className="flex items-center space-x-2"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  <span className="text-sm">{isPlaying ? 'Pause' : 'Play'} Music</span>
                </Button>
                
                <div className="flex items-center space-x-2">
                  {volume === 0 ? (
                    <VolumeX className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-gray-500" />
                  )}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => changeVolume(parseFloat(e.target.value))}
                    className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-gray-500 w-8">{Math.round(volume * 100)}%</span>
                </div>
              </div>
            </div>
            
            {/* Mobile CTA Button */}
            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

