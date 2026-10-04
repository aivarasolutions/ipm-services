import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { useLanguage } from '../contexts/LanguageContext'
import { getOwnerFaqItems } from '../lib/ownerFaq'

export default function OwnerFaqSection({ plan }) {
  const { language } = useLanguage()
  const locale = language === 'es' ? 'es' : 'en'
  const items = getOwnerFaqItems(locale, plan)
  const copy = locale === 'es'
    ? {
        heading: 'Preguntas frecuentes de propietarios',
        link: 'Ver todas las preguntas frecuentes',
      }
    : {
        heading: 'Owner questions, answered',
        link: 'Explore all frequently asked questions',
      }

  return (
    <section
      lang={locale}
      aria-labelledby="owner-faq-heading"
      className="border-y border-[#D4AF37]/20 bg-[#F8F5EF] px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#A57F1D]">
              IPM · {locale === 'es' ? 'PROPIETARIOS' : 'PROPERTY OWNERS'}
            </p>
            <h2 id="owner-faq-heading" className="font-display text-2xl font-bold tracking-tight text-[#0A1A30] sm:text-3xl">
              {copy.heading}
            </h2>
          </div>
          <Link
            to={locale === 'es' ? '/es/faq' : '/faq'}
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#735713] underline decoration-[#D4AF37]/60 underline-offset-4 transition-colors hover:text-[#0A1A30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B28B25] focus-visible:ring-offset-4"
          >
            {copy.link}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item, index) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="group overflow-hidden rounded-xl border border-[#0F2440]/10 bg-white text-[#0A1A30] shadow-[0_4px_18px_rgba(6,18,31,0.045)] transition-[border-color,box-shadow] duration-200 data-[state=open]:border-[#D4AF37]/55 data-[state=open]:shadow-[0_8px_26px_rgba(6,18,31,0.09)]"
            >
              <AccordionTrigger className="gap-4 px-5 py-5 text-left text-base font-semibold leading-snug text-[#0A1A30] no-underline hover:no-underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37] [&>svg]:size-5 [&>svg]:text-[#B28B25] sm:px-7 sm:py-6">
                <span className="flex min-w-0 items-start gap-4">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 font-display text-xs font-semibold tracking-[0.12em] text-[#B28B25]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pl-12 text-[15px] leading-7 text-[#334155] sm:px-7 sm:pb-6 sm:pl-[4.25rem] sm:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}