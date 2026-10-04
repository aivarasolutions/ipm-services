import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { getLocaleRouteInfo, LOCALIZED_ROUTE_PATHS, localizeRoutePath } from '../lib/seo.js'

const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const closeTimer = useRef(null)
  const { language, toggleLanguage } = useLanguage()
  const { routePath } = getLocaleRouteInfo(location.pathname)

  useEffect(() => () => clearTimeout(closeTimer.current), [])
  useEffect(() => {
    setOpenDropdown(null)
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const routeFor = (path) => {
    const available = language === 'en' || LOCALIZED_ROUTE_PATHS[language]?.includes(path)
    return available ? localizeRoutePath(path, language) : path
  }
  const languageOptions = ['en', ...Object.keys(LOCALIZED_ROUTE_PATHS)
    .filter((locale) => LOCALIZED_ROUTE_PATHS[locale].includes(routePath))]
  const queryPlan = new URLSearchParams(location.search).get('plan')
  const onPagePlan = routePath === '/listing-promotion' || routePath === '/full-management'
  const planContext = onPagePlan
    ? routePath.slice(1)
    : routePath === '/contact' && ['listing-promotion', 'full-management'].includes(queryPlan)
      ? queryPlan
      : null
  const contactPath = routeFor('/contact') + (planContext ? `?plan=${planContext}` : '')
  const services = [
    { name: language === 'es' ? 'Promoción de Anuncios (10%)' : language === 'fr' ? 'Promotion d’annonces (10 %)' : '10% Listing Promotion', path: '/listing-promotion' },
    { name: language === 'es' ? 'Gestión Completa (20%)' : language === 'fr' ? 'Gestion complète (20 %)' : '20% Full Management', path: '/full-management' },
  ]
  const navItems = [
    { name: language === 'es' ? 'Servicios' : language === 'fr' ? 'Services' : 'Services', path: '/services', dropdown: services, key: 'services' },
    { name: language === 'es' ? 'Propiedades' : language === 'fr' ? 'Propriétés' : 'Properties', path: '/properties' },
    { name: language === 'es' ? 'Bienes Raíces' : language === 'fr' ? 'Immobilier' : 'Real Estate', path: '/real-estate' },
    {
      name: 'Insights', path: '/insights', key: 'insights',
      dropdown: [
        { name: 'Insights Hub', path: '/insights' },
        { name: 'Airbnb Fees Explained', path: '/insights/airbnb-fees' },
        { name: 'API Connections & Operating Costs', path: '/insights/api-costs' },
        { name: 'How to Offset Airbnb’s Host Fee', path: '/insights/avoid-fees' },
        { name: 'Check-In System Design', path: '/insights/checkin-system' },
      ],
    },
    { name: language === 'es' ? 'Vietnam' : 'Vietnam', path: '/vietnam' },
    { name: language === 'es' ? 'Contacto' : language === 'fr' ? 'Contact' : 'Contact', path: '/contact' },
    { name: language === 'es' ? 'Portal de Propietarios' : language === 'fr' ? 'Portail Propriétaire' : 'Owner Portal', path: 'https://portal.ipm.services/', external: true },
  ]
  const labelFor = (lang) => ({ en: 'English', es: 'Español', fr: 'Français', vi: 'Tiếng Việt' })[lang]
  const openSoon = (key) => {
    clearTimeout(closeTimer.current)
    setOpenDropdown(key)
  }
  const closeSoon = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 220)
  }
  const onMenuKeyDown = (event) => {
    if (event.key === 'Escape') {
      setOpenDropdown(null)
      setShowLanguageMenu(false)
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header onKeyDown={onMenuKeyDown} className="sticky top-0 z-50 bg-[#0A1A30]/95 backdrop-blur-sm border-b border-[#D4AF37]/20 shadow-lg shadow-[#06121F]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={routeFor('/')} aria-label="IPM home" className="flex items-center shrink-0 mr-4">
            <img src="/images/ipm-logo-new-optimized.webp" alt="IPM International Property Management" width="48" height="48" className="h-12 w-auto shrink-0 object-contain" />
          </Link>

          <nav className="hidden xl:flex items-center space-x-2" aria-label="Main navigation">
            {navItems.map((item) => {
              const active = routePath === item.path || (item.key === 'services' && onPagePlan) || (item.key === 'insights' && routePath.startsWith('/insights'))
              const color = active ? 'bg-[#D4AF37] text-[#06121F]' : 'text-[#CFCFCF] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
              if (item.dropdown) return (
                <div key={item.name} className="relative" onMouseEnter={() => openSoon(item.key)} onMouseLeave={closeSoon} onFocus={(event) => { if (event.target.tagName === 'A') openSoon(item.key) }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpenDropdown(null) }}>
                  <div className="flex items-center">
                    <Link to={routeFor(item.path)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]/50 ${color}`}>{item.name}</Link>
                    <Button type="button" variant="ghost" aria-label={`Toggle ${item.name} submenu`} aria-expanded={openDropdown === item.key} aria-controls={`${item.key}-submenu`} onClick={() => setOpenDropdown((current) => current === item.key ? null : item.key)} className={`px-2 py-2 ${color}`}>
                      <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${openDropdown === item.key ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                  {openDropdown === item.key && <div id={`${item.key}-submenu`} className="absolute left-0 top-full pt-2 w-72 z-50">
                    <div className="bg-[#0A1A30] rounded-md shadow-lg border border-[#D4AF37]/20 py-2">
                      {item.dropdown.map((subItem) => <Link key={subItem.path} to={routeFor(subItem.path)} onClick={() => setOpenDropdown(null)} className={`block px-4 py-2.5 text-sm transition-colors ${routePath === subItem.path ? 'text-[#E6C978] bg-[#D4AF37]/10' : 'text-[#CFCFCF] hover:bg-[#D4AF37]/10 hover:text-[#E6C978]'}`}>{subItem.name}</Link>)}
                    </div>
                  </div>}
                </div>
              )
              if (item.external) return <Button key={item.name} asChild variant="ghost" className="px-4 py-2 text-sm text-[#CFCFCF] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"><a href={item.path} target="_blank" rel="noopener noreferrer">{item.name}</a></Button>
              return <Button key={item.name} asChild variant="ghost"><Link to={item.path === '/contact' ? contactPath : routeFor(item.path)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${active ? 'bg-[#D4AF37] text-[#06121F]' : 'text-[#CFCFCF] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'}`}>{item.name}</Link></Button>
            })}
          </nav>

          <div className="hidden xl:flex items-center space-x-4">
            <div className="relative">
              <Button variant="ghost" size="sm" aria-expanded={showLanguageMenu} onClick={() => setShowLanguageMenu((open) => !open)} className="p-2 hover:bg-[#D4AF37]/10 flex items-center space-x-1 text-[#CFCFCF]">
                <Globe className="w-4 h-4" /><span className="text-xs font-semibold">{language.toUpperCase()}</span>
              </Button>
              {showLanguageMenu && <div className="absolute right-0 mt-1 w-36 bg-[#0A1A30] border border-[#D4AF37]/20 rounded-md shadow-lg z-50" role="menu">
                {languageOptions.map((lang) => <button key={lang} role="menuitem" onClick={() => { toggleLanguage(lang); setShowLanguageMenu(false) }} className={`block w-full text-left px-4 py-2 text-sm transition-colors ${language === lang ? 'bg-[#D4AF37]/15 text-[#E6C978] font-semibold' : 'text-[#CFCFCF] hover:bg-[#D4AF37]/10'}`}>{labelFor(lang)}</button>)}
              </div>}
            </div>
            <Button asChild className="bg-[#D4AF37] hover:bg-[#E6C978] text-[#06121F] px-6 py-2 rounded-md text-sm font-medium"><Link to={contactPath}>Get Started</Link></Button>
          </div>

          <div className="xl:hidden">
            <Button variant="ghost" size="sm" onClick={() => { setIsMobileMenuOpen((open) => !open); setOpenDropdown('services') }} aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation" className="p-2">
              {isMobileMenuOpen ? <X aria-hidden="true" className="h-6 w-6 text-[#CFCFCF]" /> : <Menu aria-hidden="true" className="h-6 w-6 text-[#CFCFCF]" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && <div id="mobile-navigation" className="xl:hidden bg-[#0A1A30] border-t border-[#D4AF37]/15 shadow-lg">
        <div className="px-4 pt-2 pb-5 space-y-1">
          {navItems.map((item) => {
            const active = routePath === item.path || (item.key === 'services' && onPagePlan) || (item.key === 'insights' && routePath.startsWith('/insights'))
            if (item.dropdown) return <div key={item.name} className="space-y-1">
              <div className="flex items-center">
                <Link to={routeFor(item.path)} onClick={() => setIsMobileMenuOpen(false)} className={`flex-1 block px-3 py-2 rounded-md text-base font-medium ${active ? 'bg-[#D4AF37] text-[#06121F]' : 'text-[#CFCFCF] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'}`}>{item.name}</Link>
                <button type="button" aria-label={`Toggle ${item.name} submenu`} aria-expanded={openDropdown === item.key} onClick={() => setOpenDropdown((current) => current === item.key ? null : item.key)} className="p-2 text-[#D4AF37]"><ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.key ? 'rotate-180' : ''}`} /></button>
              </div>
              {openDropdown === item.key && <div className="pl-4 space-y-1">
                {item.dropdown.map((subItem) => <Link key={subItem.path} to={routeFor(subItem.path)} onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md text-sm ${routePath === subItem.path ? 'bg-[#D4AF37]/15 text-[#E6C978]' : 'text-[#B8B8B8] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'}`}>{subItem.name}</Link>)}
              </div>}
            </div>
            if (item.external) return <a key={item.name} href={item.path} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-[#CFCFCF] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10">{item.name}</a>
            return <Link key={item.name} to={item.path === '/contact' ? contactPath : routeFor(item.path)} onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${active ? 'bg-[#D4AF37] text-[#06121F]' : 'text-[#CFCFCF] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'}`}>{item.name}</Link>
          })}
          <div className="pt-4 border-t border-[#D4AF37]/15">
            <div className="px-3 py-2 text-xs font-semibold text-[#CFCFCF]">Language</div>
            <div className="flex gap-2 px-3">{languageOptions.map((lang) => <button key={lang} onClick={() => { toggleLanguage(lang); setIsMobileMenuOpen(false) }} className={`flex-1 px-3 py-2 text-xs font-medium rounded-md ${language === lang ? 'bg-[#D4AF37] text-[#06121F]' : 'bg-[#0F2440] text-[#CFCFCF] hover:bg-[#D4AF37]/15'}`}>{lang.toUpperCase()}</button>)}</div>
          </div>
          <div className="pt-2"><Button asChild className="w-full bg-[#D4AF37] hover:bg-[#E6C978] text-[#06121F] px-6 py-2 rounded-md text-sm font-medium"><Link to={contactPath} onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link></Button></div>
        </div>
      </div>}
    </header>
  )
}

export default Header