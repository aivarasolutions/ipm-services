import { Link } from 'react-router-dom'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { bookingGuaranteeContent } from './bookingGuaranteeContent'
import { BOOKING_GUARANTEE_VISIBLE } from '../lib/bookingGuarantee'

export default function BookingGuarantee() {
  const { language, toggleLanguage } = useLanguage()
  if (!BOOKING_GUARANTEE_VISIBLE || (language !== 'en' && language !== 'es')) return null
  const t = bookingGuaranteeContent[language]
  const spanish = language === 'es'
  const signupPath = spanish ? '/es/listing-promotion' : '/listing-promotion'
  const homePath = spanish ? '/es' : '/'

  return (
    <main lang={language} className="min-h-screen bg-[#06121F] text-white">
      <div className="border-b border-[#D4AF37]/20 bg-[#0A1A30]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Link to={homePath} className="text-sm font-semibold text-[#F2D98D] hover:text-white">{spanish ? '← Volver a IPM' : '← Back to IPM'}</Link>
          <div className="flex gap-2" aria-label={spanish ? 'Cambiar idioma' : 'Switch language'}>
            <button type="button" onClick={() => toggleLanguage('en')} aria-pressed={!spanish} className={`rounded border px-3 py-1.5 text-xs font-bold ${!spanish ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F2D98D]' : 'border-white/20 text-[#C9D2DE]'}`}>English</button>
            <button type="button" onClick={() => toggleLanguage('es')} aria-pressed={spanish} className={`rounded border px-3 py-1.5 text-xs font-bold ${spanish ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F2D98D]' : 'border-white/20 text-[#C9D2DE]'}`}>Español</button>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-[#D4AF37]/20 bg-[#0A1A30]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-20">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-[#D4AF37]">{t.eyebrow}</p>
            <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">{t.headline}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#D5DCE5]">{t.subtitle}</p>
            <p className="mt-5 max-w-3xl border-l-2 border-[#D4AF37] pl-4 text-sm leading-relaxed text-[#F2D98D]">{t.disclosure}</p>
            <p className="mt-4 text-sm font-semibold text-white">{t.actual}</p>
            <Link to={signupPath} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-md bg-[#D4AF37] px-6 py-3 text-sm font-extrabold text-[#06121F] hover:bg-[#F2D98D]">
              {t.start}<ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <img src={`/images/booking-guarantee/${language}-main.webp`} alt={t.headline} width="240" height="300" fetchPriority="high" className="mx-auto h-[300px] w-[240px] object-contain lg:mr-0" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20" aria-labelledby="guarantee-steps-title">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#D4AF37]">{t.eyebrow}</p>
          <h2 id="guarantee-steps-title" className="font-display text-3xl font-bold sm:text-4xl">{t.stepsTitle}</h2>
        </div>
        <ol className="grid gap-4 md:grid-cols-2">
          {t.steps.map((step, index) => (
            <li key={step.title} className="flex gap-5 rounded-xl border border-[#D4AF37]/20 bg-[#0A1A30] p-6 sm:p-7">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 font-mono text-sm font-bold text-[#F2D98D]">0{index + 1}</span>
              <div><h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3><p className="text-sm leading-relaxed text-[#C9D2DE]">{step.body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-[#D4AF37]/20 bg-[#0A1A30] px-5 py-14 sm:px-8 sm:py-20" aria-labelledby="guarantee-rules-title">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#D4AF37]">{spanish ? 'TÉRMINOS Y ELEGIBILIDAD' : 'TERMS & ELIGIBILITY'}</p>
            <h2 id="guarantee-rules-title" className="font-display text-3xl font-bold sm:text-4xl">{t.termsTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#C9D2DE]">{t.termsIntro}</p>
          </div>
          <dl className="grid gap-3 md:grid-cols-2">
            {t.rules.map(({ title, body }) => (
              <div key={title} className="rounded-lg border border-[#D4AF37]/20 bg-[#06121F]/50 p-5">
                <dt className="mb-2 flex items-start gap-2 font-bold text-[#F2D98D]"><Check size={16} className="mt-1 shrink-0" aria-hidden="true" />{title}</dt>
                <dd className="pl-6 text-sm leading-relaxed text-[#D5DCE5]">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20" aria-labelledby="guarantee-faq-title">
        <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#D4AF37]">{spanish ? 'RESPUESTAS CLARAS' : 'CLEAR ANSWERS'}</p>
        <h2 id="guarantee-faq-title" className="mb-8 font-display text-3xl font-bold sm:text-4xl">{t.faqTitle}</h2>
        <div className="space-y-3">
          {t.faqs.map(({ q, a }) => (
            <details key={q} className="group rounded-lg border border-[#D4AF37]/20 bg-[#0A1A30] open:border-[#D4AF37]/50">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-white marker:hidden">
                {q}<ChevronDown size={18} className="shrink-0 text-[#D4AF37] transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-[#C9D2DE]">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-[#D4AF37]/20 bg-[#0A1A30] px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold">{t.manualTitle}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#C9D2DE]">{t.manualBody}</p>
            <Link to={t.contactPath} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#F2D98D] underline decoration-[#D4AF37]/50 underline-offset-4 hover:text-white">{t.contact}<ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <Link to={signupPath} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#D4AF37] px-6 py-3 text-sm font-extrabold text-[#06121F] hover:bg-[#F2D98D]">
            {t.list}<ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  )
}
