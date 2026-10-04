import ListingPromotionSection from '../components/ListingPromotionSection'
import { useLanguage } from '../contexts/LanguageContext'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ListingPromotion() {
  const { language, toggleLanguage } = useLanguage()
  const spanish = language === 'es'
  return (
    <div lang={language} className="min-h-screen bg-[#06121F]">
      <div className="bg-[#0A1A30] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <Link to={spanish ? '/es/full-management' : '/full-management'} className="inline-flex items-center gap-2 text-sm font-semibold text-[#F2D98D] hover:text-white transition-colors">
            {spanish ? 'Ver Gestión Completa 20%' : 'Explore 20% Full Management'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <div className="flex items-center gap-2" aria-label={spanish ? 'Cambiar idioma' : 'Switch language'}>
            <button type="button" onClick={() => toggleLanguage('en')} aria-pressed={!spanish} className={`px-3 py-1.5 rounded border text-xs font-semibold tracking-wide ${!spanish ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F2D98D]' : 'border-white/15 text-[#C9D2DE] hover:border-[#D4AF37]/60'}`}>English</button>
            <button type="button" onClick={() => toggleLanguage('es')} aria-pressed={spanish} className={`px-3 py-1.5 rounded border text-xs font-semibold tracking-wide ${spanish ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F2D98D]' : 'border-white/15 text-[#C9D2DE] hover:border-[#D4AF37]/60'}`}>Español</button>
          </div>
        </div>
      </div>
      <ListingPromotionSection
        language={language}
        source="10% Promotion Page — Listing Promotion (10%)"
        headingLevel="h1"
        showVideos
      />
    </div>
  )
}