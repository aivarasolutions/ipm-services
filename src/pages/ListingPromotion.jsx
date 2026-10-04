import ListingPromotionSection from '../components/ListingPromotionSection'
import { useLanguage } from '../contexts/LanguageContext'

export default function ListingPromotion() {
  const { language } = useLanguage()
  return (
    <div lang={language} className="min-h-screen bg-[#06121F]">
      <ListingPromotionSection
        language={language}
        source="10% Promotion Page — Listing Promotion (10%)"
        headingLevel="h1"
        showVideos
      />
    </div>
  )
}