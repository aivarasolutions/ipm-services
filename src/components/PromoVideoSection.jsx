import { Link, useLocation } from 'react-router-dom'
import ClickToPlayVideo from './ClickToPlayVideo'
import { getLocaleRouteInfo } from '../lib/seo.js'

const copy = {
  en: {
    title: 'See How IPM Works',
    description: 'Learn how we help property owners and managers generate more reservations without changing what they already have in place.',
    cta: 'Get Started With IPM',
    href: '/contact',
  },
  es: {
    title: 'Conozca Cómo Funciona IPM',
    description: 'Conozca cómo ayudamos a propietarios y administradores a generar más reservaciones sin cambiar lo que ya tienen funcionando.',
    cta: 'Comenzar con IPM',
    href: '/es/contact',
  },
}

export default function PromoVideoSection({ language, videos }) {
  const { pathname } = useLocation()
  const locale = getLocaleRouteInfo(pathname).locale

  if ((locale !== 'en' && locale !== 'es') || language !== locale || !videos?.length) return null

  const t = copy[locale]
  const availableVideos = Array.isArray(videos) ? videos.slice(0, 2) : []

  return (
    <section
      className="mt-12 border-t border-[#D4AF37]/20 pt-10 sm:mt-14 sm:pt-12"
      aria-labelledby="promo-video-title"
    >
      <div className="mx-auto max-w-4xl">
        <header className="mx-auto mb-7 max-w-2xl text-center sm:mb-9">
          <h3
            id="promo-video-title"
            className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl"
          >
            {t.title}
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#C9D2DE] sm:text-base sm:leading-7">
            {t.description}
          </p>
        </header>

        {availableVideos.length > 0 && (
          <div className="grid grid-cols-1 items-start gap-7 md:grid-cols-2 md:gap-8">
            {availableVideos.map((video, index) => (
              <article
                key={video.id ?? `${locale}-promo-video-${index}`}
                className="group mx-auto w-full md:max-w-[360px]"
              >
                <h4 className="mb-3 text-center text-base font-semibold leading-snug text-[#F2D98D] sm:text-lg">
                  {video.title}
                </h4>
                <div className="rounded-xl transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transform-none">
                  <ClickToPlayVideo video={video} language={locale} />
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:mt-9">
          <Link
            to={t.href}
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#D4AF37]/70 bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#06121F] transition-colors duration-200 hover:border-[#F2D98D] hover:bg-[#F2D98D] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#F2D98D] motion-reduce:transition-none sm:text-base"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}