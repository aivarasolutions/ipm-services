import { Link } from 'react-router-dom'

export default function FurnishingServiceLink({ language = 'en', overview = false }) {
  if (!['en', 'es'].includes(language)) return null
  const spanish = language === 'es'
  return (
    <section className="border-t border-[#D4AF37]/20 bg-[#F8F5EF] py-10 text-[#292D2D]">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 sm:px-8 md:flex-row md:items-center lg:px-12">
        <div className="max-w-2xl">
          <h2 className={`${overview ? 'text-2xl' : 'text-lg'} font-semibold`}>{spanish ? 'Amoblamiento y Acondicionamiento de Propiedades' : 'Property Furnishing & Setup'}</h2>
          <p className="mt-2 leading-relaxed text-[#565D5A]">{spanish ? 'Desde la selección de muebles hasta la preparación final, IPM ayuda a los propietarios a transformar sus espacios en alojamientos atractivos y funcionales.' : 'From furniture selection to guest-ready presentation, IPM helps property owners transform their spaces into attractive, functional short-term rentals.'}</p>
          <p className="mt-2 text-sm text-[#707574]">{spanish ? 'Servicio independiente de pago. No requiere contratar gestión de propiedades.' : 'A paid standalone service. Property management enrollment is not required.'}</p>
        </div>
        <Link className="inline-flex min-h-12 shrink-0 items-center justify-center rounded border border-[#A8874E] px-5 py-3 font-semibold hover:bg-[#EEE5D4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8874E]" to={`${spanish ? '/es' : ''}/services/property-furnishing-setup`}>{spanish ? 'Conocer el Servicio' : 'Explore Furnishing Services'}</Link>
      </div>
    </section>
  )
}
