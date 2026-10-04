import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useLanguage } from '../contexts/LanguageContext'
import { OWNER_FAQ_CONTENT } from '../lib/ownerFaq'

const Faq = () => {
  const { language } = useLanguage()
  const locale = language === 'es' ? 'es' : 'en'
  const content = OWNER_FAQ_CONTENT[locale]

  return (
    <div lang={locale} className="min-h-[100dvh] bg-[#06121F]">
      <section className="relative overflow-hidden border-b border-[#D4AF37]/20 bg-gradient-to-br from-[#06121F] via-[#0A1A30] to-[#0F2440] px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-36 h-96 w-96 rounded-full border border-[#D4AF37]/10 sm:-right-16 sm:-top-44 sm:h-[34rem] sm:w-[34rem]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-[#D4AF37]/10 sm:right-8 sm:top-[-7rem] sm:h-[25rem] sm:w-[25rem]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              {content.title}
            </h1>
            <div className="mx-auto mt-7 h-px w-16 bg-[#D4AF37]" />
          </div>
        </div>
      </section>

      <section aria-label={content.title} className="bg-[#F8F5EF] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="space-y-3">
            {content.items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`question-${index + 1}`}
                className="group overflow-hidden rounded-xl border border-[#0F2440]/10 bg-white shadow-[0_4px_18px_rgba(6,18,31,0.045)] transition-[border-color,box-shadow] duration-200 data-[state=open]:border-[#D4AF37]/55 data-[state=open]:shadow-[0_8px_26px_rgba(6,18,31,0.09)]"
              >
                <AccordionTrigger className="gap-4 px-5 py-5 text-left text-base font-semibold leading-snug text-[#0A1A30] no-underline hover:no-underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37] [&>svg]:size-5 [&>svg]:text-[#B28B25] sm:px-7 sm:py-6 sm:text-lg">
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

      <section className="border-t border-[#D4AF37]/20 bg-[#06121F] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 text-center md:flex-row md:justify-between md:gap-10 md:text-left">
          <h2 className="max-w-3xl font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
            {content.cta}
          </h2>
          <Button
            asChild
            className="min-h-12 shrink-0 rounded-md bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] px-8 text-base font-bold text-[#06121F] shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:from-[#F2D98D] hover:to-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#F2D98D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06121F]"
          >
            <Link to={locale === 'es' ? '/es/contact' : '/contact'}>{content.button}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Faq