import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useLanguage } from '../contexts/LanguageContext'
import { filterOwnerFaqItems, OWNER_FAQ_CONTENT } from '../lib/ownerFaq'

const Faq = () => {
  const { language } = useLanguage()
  const locale = language === 'es' ? 'es' : 'en'
  const content = OWNER_FAQ_CONTENT[locale]
  const [query, setQuery] = useState('')
  const filteredItems = useMemo(
    () => filterOwnerFaqItems(content.items, query),
    [content.items, query],
  )
  const visibleCategories = content.categories
    .map((category) => ({
      ...category,
      items: filteredItems.filter((item) => item.category === category.id),
    }))
    .filter((category) => category.items.length > 0)
  const copy = locale === 'es'
    ? {
        searchLabel: 'Buscar preguntas frecuentes',
        searchPlaceholder: 'Buscar por tema o palabra clave',
        categoryLabel: 'Explorar por categoría',
        results: (count) => `${count} ${count === 1 ? 'pregunta' : 'preguntas'}`,
        emptyTitle: 'No encontramos preguntas',
        emptyMessage: 'Prueba con otra palabra o frase.',
      }
    : {
        searchLabel: 'Search frequently asked questions',
        searchPlaceholder: 'Search by topic or keyword',
        categoryLabel: 'Browse by category',
        results: (count) => `${count} ${count === 1 ? 'question' : 'questions'}`,
        emptyTitle: 'No questions found',
        emptyMessage: 'Try another word or phrase.',
      }

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
          <div className="mb-8 rounded-xl border border-[#0F2440]/10 bg-white p-5 shadow-[0_4px_18px_rgba(6,18,31,0.045)] sm:p-6">
            <label htmlFor="owner-faq-search" className="mb-2 block text-sm font-semibold text-[#0A1A30]">
              {copy.searchLabel}
            </label>
            <input
              id="owner-faq-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              className="min-h-12 w-full rounded-md border border-[#0F2440]/20 bg-[#F8F5EF] px-4 text-base text-[#0A1A30] outline-none placeholder:text-[#64748B] focus-visible:border-[#B28B25] focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
            />
            <p aria-live="polite" aria-atomic="true" className="mt-3 text-sm text-[#475569]">
              {copy.results(filteredItems.length)}
            </p>
          </div>

          {visibleCategories.length > 0 && (
            <nav aria-label={copy.categoryLabel} className="mb-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#735713]">
                {copy.categoryLabel}
              </p>
              <ul className="flex flex-wrap gap-2">
                {visibleCategories.map((category) => (
                  <li key={category.id}>
                    <a
                      href={`#faq-category-${category.id}`}
                      className="inline-flex min-h-10 items-center rounded-full border border-[#0F2440]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0A1A30] transition-colors hover:border-[#B28B25]/60 hover:bg-[#FFFDF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B28B25] focus-visible:ring-offset-2"
                    >
                      {category.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {visibleCategories.length === 0 ? (
            <div className="rounded-xl border border-[#0F2440]/10 bg-white px-6 py-12 text-center shadow-[0_4px_18px_rgba(6,18,31,0.045)]">
              <h2 className="font-display text-xl font-semibold text-[#0A1A30]">{copy.emptyTitle}</h2>
              <p className="mt-2 text-[#475569]">{copy.emptyMessage}</p>
            </div>
          ) : (
            <div className="space-y-10 sm:space-y-12">
              {visibleCategories.map((category) => (
                <section
                  key={category.id}
                  id={`faq-category-${category.id}`}
                  aria-labelledby={`faq-heading-${category.id}`}
                  className="scroll-mt-28"
                >
                  <h2
                    id={`faq-heading-${category.id}`}
                    className="mb-4 border-b border-[#D4AF37]/45 pb-3 font-display text-xl font-bold tracking-tight text-[#0A1A30] sm:mb-5 sm:text-2xl"
                  >
                    {category.title}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {category.items.map((item, index) => (
                      <AccordionItem
                        key={item.id}
                        value={item.id}
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
                        <AccordionContent className="whitespace-pre-line px-5 pb-5 pl-12 text-[15px] leading-7 text-[#334155] sm:px-7 sm:pb-6 sm:pl-[4.25rem] sm:text-base">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              ))}
            </div>
          )}
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