import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { BOOKING_GUARANTEE_VISIBLE } from '../lib/bookingGuarantee'
import { bookingGuaranteeContent } from './bookingGuaranteeContent'

export default function BookingGuaranteePromo({ language = 'en', placement = 'home' }) {
  if (!BOOKING_GUARANTEE_VISIBLE || (language !== 'en' && language !== 'es')) return null
  const t = bookingGuaranteeContent[language]
  const spanish = language === 'es'
  const detailPath = spanish ? '/es/booking-guarantee' : '/booking-guarantee'
  const signupPath = `${spanish ? '/es/listing-promotion' : '/listing-promotion'}${placement === 'listing' ? '#listing-promotion' : ''}`
  const imageName = placement === 'listing' ? 'listing-promotion' : 'empty-nights'
  const image = `/images/booking-guarantee/${language}-${imageName}.webp`

  return (
    <section className="relative overflow-hidden border-y border-[#D4AF37]/30 bg-[#0A1A30] px-5 py-12 sm:px-8 sm:py-16" aria-labelledby={`booking-promo-${placement}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[minmax(0,1fr)_190px] lg:gap-14">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.17em] text-[#F2D98D]">
            <ShieldCheck size={14} aria-hidden="true" /> {t.draft}
          </p>
          <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#D4AF37]">{t.eyebrow}</p>
          <h2 id={`booking-promo-${placement}`} className="max-w-3xl font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.7rem]">
            {t.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#D5DCE5]">{t.promoBody}</p>
          <p className="mt-4 max-w-3xl border-l-2 border-[#D4AF37] pl-4 text-sm leading-relaxed text-[#F2D98D]">{t.disclosureShort}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={signupPath} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#D4AF37] px-5 py-3 text-sm font-extrabold tracking-wide text-[#06121F] transition-colors hover:bg-[#F2D98D]">
              {t.list}<ArrowRight size={16} aria-hidden="true" />
            </a>
            <Link to={detailPath} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#D4AF37]/55 px-5 py-3 text-sm font-bold text-[#F2D98D] transition-colors hover:bg-[#D4AF37]/10">
              {placement === 'home' ? t.learn : t.fullTerms}<ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <img
          src={image}
          alt={t.headline}
          width="160"
          height="200"
          loading="lazy"
          className="mx-auto h-[200px] w-[160px] object-contain md:mr-0"
        />
      </div>
    </section>
  )
}
