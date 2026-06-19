import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)

  const [showInsightsDropdown, setShowInsightsDropdown] = useState(false)

  const navItems = [
    { name: 'Services', path: '/services', color: 'bg-[#D4AF37] text-[#06121F]' },
    { name: 'Properties', path: '/properties', color: 'bg-[#D4AF37] text-[#06121F]' },
    { name: 'Real Estate', path: '/real-estate', color: 'bg-[#D4AF37] text-[#06121F]' },
    { 
      name: 'Insights', 
      path: '/insights', 
      color: 'bg-[#D4AF37] text-[#06121F]',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Insights Hub', path: '/insights' },
        { name: 'Airbnb Fees Explained', path: '/insights/airbnb-fees' },
        { name: 'API Connections & Hidden Costs', path: '/insights/api-costs' },
        { name: 'How to Avoid the 15.5% Fee', path: '/insights/avoid-fees' },
        { name: 'Check-In System Design', path: '/insights/checkin-system' },
        { name: 'IPM Video Library', path: '/insights/video-library' },
        { name: '🏠 Charlotte Owner Proposal', path: '/proposal/charlotte-downhaul' },
        { name: '🌊 Tampa Owner Proposal', path: '/proposal/tampa-audrey' },
        { name: '🏡 Charlotte Timberbrook Proposal', path: '/proposal/charlotte-timberbrook' },
        { name: '🌊 St. Augustine Proposal', path: '/proposal/staugustine-crossroad' },
        { name: '🏠 Tegucigalpa Launch Checklist', path: '/insights/tegucigalpa-checklist' }
      ]
    },
    { name: 'Contact', path: '/contact', color: 'bg-[#D4AF37] text-[#06121F]' },
    { name: 'Owner Portal', path: 'https://portal.ipm.services/', color: 'bg-[#D4AF37] text-[#06121F]', external: true }
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#0A1A30]/95 backdrop-blur-sm border-b border-[#D4AF37]/20 shadow-lg shadow-[#06121F]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 mr-4">
            <img
              src="/images/ipm-logo-new.png"
              alt="IPM International Property Management"
              className="h-12 w-auto shrink-0 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              if (item.hasDropdown) {
                const isActive = location.pathname.startsWith(item.path)
                return (
                  <div 
                    key={item.name} 
                    className="relative"
                    onMouseEnter={() => setShowInsightsDropdown(true)}
                    onMouseLeave={() => setShowInsightsDropdown(false)}
                  >
                    <Link to={item.path}>
                      <Button
                        variant="ghost"
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:ring-[#D4AF37]/40 focus-visible:ring-offset-0 ${
                          isActive
                            ? item.color
                            : 'text-[#CFCFCF] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
                        }`}
                      >
                        {item.name} ▾
                      </Button>
                    </Link>
                    {showInsightsDropdown && (
                      <div className="absolute left-0 mt-2 w-64 bg-[#0A1A30] rounded-md shadow-lg border border-[#D4AF37]/20 py-2 z-50">
                        {item.dropdownItems.map((subItem) => (
                          <Link 
                            key={subItem.path} 
                            to={subItem.path}
                            className="block px-4 py-2 text-sm text-[#CFCFCF] hover:bg-[#D4AF37]/10 hover:text-[#E6C978] transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              if (item.external) {
                return (
                  <a key={item.name} href={item.path} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      className="px-4 py-2 rounded-md text-sm font-medium transition-colors text-[#CFCFCF] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                    >
                      {item.name}
                    </Button>
                  </a>
                )
              }
              return (
                <Link key={item.name} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:ring-[#D4AF37]/40 focus-visible:ring-offset-0 ${
                      location.pathname === item.path
                        ? item.color
                        : 'text-[#CFCFCF] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
                    }`}
                  >
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Music Controls & Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="p-2 hover:bg-[#D4AF37]/10 flex items-center space-x-1 text-[#CFCFCF]"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-semibold">{language.toUpperCase()}</span>
              </Button>
              {showLanguageMenu && (
                <div className="absolute right-0 mt-1 w-32 bg-[#0A1A30] border border-[#D4AF37]/20 rounded-md shadow-lg z-50">
                  {['en', 'es', 'fr'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        toggleLanguage(lang);
                        setShowLanguageMenu(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === lang
                          ? 'bg-[#D4AF37]/15 text-[#E6C978] font-semibold'
                          : 'text-[#CFCFCF] hover:bg-[#D4AF37]/10'
                      }`}
                    >
                      {lang === 'en' && 'English'}
                      {lang === 'es' && 'Español'}
                      {lang === 'fr' && 'Français'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/contact">
              <Button className="bg-[#D4AF37] hover:bg-[#E6C978] text-[#06121F] px-6 py-2 rounded-md text-sm font-medium">
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
                <X className="h-6 w-6 text-[#CFCFCF]" />
              ) : (
                <Menu className="h-6 w-6 text-[#CFCFCF]" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0A1A30] border-t border-[#D4AF37]/15 shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const isActive = item.hasDropdown ? location.pathname.startsWith(item.path) : location.pathname === item.path
              
              if (item.hasDropdown) {
                return (
                  <div key={item.name} className="space-y-1">
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[#D4AF37] text-[#06121F]'
                          : 'text-[#CFCFCF] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
                      }`}
                    >
                      {item.name}
                    </Link>
                    <div className="pl-4 space-y-1">
                      {item.dropdownItems.slice(1).map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                            location.pathname === subItem.path
                              ? 'bg-[#D4AF37]/15 text-[#E6C978]'
                              : 'text-[#B8B8B8] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }
              
              if (item.external) {
                return (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-[#CFCFCF] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  >
                    {item.name}
                  </a>
                )
              }
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#06121F]'
                      : 'text-[#CFCFCF] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
            {/* Mobile Language Selector */}
            <div className="pt-4 border-t border-[#D4AF37]/15 mb-4">
              <div className="px-3 py-2 text-xs font-semibold text-[#CFCFCF] mb-2">Language</div>
              <div className="flex gap-2 px-3">
                {['en', 'es', 'fr'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      toggleLanguage(lang);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                      language === lang
                        ? 'bg-[#D4AF37] text-[#06121F]'
                        : 'bg-[#0F2440] text-[#CFCFCF] hover:bg-[#D4AF37]/15'
                    }`}
                  >
                    {lang === 'en' && 'EN'}
                    {lang === 'es' && 'ES'}
                    {lang === 'fr' && 'FR'}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile CTA Button */}
            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full bg-[#D4AF37] hover:bg-[#E6C978] text-[#06121F] px-6 py-2 rounded-md text-sm font-medium">
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
