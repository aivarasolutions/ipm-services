import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from './PropertyCard'
import { fetchProperties } from '../services/hostawayApi'
import { useLanguage } from '../contexts/LanguageContext'

const PropertyGrid = ({ limit }) => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { language } = useLanguage()

  useEffect(() => {
    let active = true
    fetchProperties()
      .then((items) => active && setProperties(items))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading properties">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl bg-white shadow-md">
            <div className="aspect-[4/3] animate-pulse bg-slate-200" />
            <div className="space-y-3 p-5"><div className="h-4 animate-pulse rounded bg-slate-200" /><div className="h-7 animate-pulse rounded bg-slate-200" /></div>
          </div>
        ))}
      </div>
    )
  }

  if (error || properties.length === 0) {
    return (
      <div className="rounded-2xl border border-[#D4AF37]/30 bg-white p-10 text-center shadow-md">
        <h3 className="mb-3 text-2xl font-bold text-[#0A1A30]">
          {language === 'es' ? 'Las propiedades no están disponibles en este momento' : language === 'fr' ? 'Les propriétés ne sont pas disponibles pour le moment' : 'Properties are temporarily unavailable'}
        </h3>
        <p className="mx-auto mb-6 max-w-xl text-[#475569]">
          {language === 'es' ? 'Vuelve a intentarlo más tarde o consulta nuestras propiedades en el sitio de reservas.' : language === 'fr' ? 'Réessayez plus tard ou consultez nos propriétés sur le site de réservation.' : 'Please try again shortly, or browse our properties on the booking site.'}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://book.richaf.global/"
            className="inline-flex rounded-md bg-[#D4AF37] px-6 py-3 font-semibold text-[#06121F] transition-colors hover:bg-[#F2D98D]"
          >
            {language === 'es' ? 'Ver todas las propiedades' : language === 'fr' ? 'Voir toutes les propriétés' : 'Browse all properties'}
          </a>
          <Link to="/contact" className="inline-flex rounded-md border border-[#0A1A30]/15 px-6 py-3 font-semibold text-[#0A1A30] transition-colors hover:bg-[#F7F5F0]">
            {language === 'es' ? 'Contactar con reservas' : language === 'fr' ? 'Contacter les réservations' : 'Contact Reservations'}
          </Link>
        </div>
      </div>
    )
  }

  const visible = limit ? properties.slice(0, limit) : properties
  const backupMode = properties.some((property) => property.bookingFallback === true)
  const backupNotice = {
    en: {
      title: 'Saved property details',
      text: 'We’re showing saved property details while our live listing information is unavailable. Please check current prices and availability on the hosted booking site.',
      browse: 'Browse all properties',
    },
    es: {
      title: 'Detalles guardados de las propiedades',
      text: 'Mostramos los detalles guardados mientras la información actualizada no está disponible. Consulta los precios y la disponibilidad actuales en el sitio de reservas.',
      browse: 'Ver todas las propiedades',
    },
    fr: {
      title: 'Détails des propriétés enregistrés',
      text: 'Les détails enregistrés sont affichés pendant l’indisponibilité des informations en direct. Vérifiez les tarifs et disponibilités actuels sur le site de réservation.',
      browse: 'Voir toutes les propriétés',
    },
  }[language] || {
    title: 'Saved property details',
    text: 'We’re showing saved property details while our live listing information is unavailable. Please check current prices and availability on the hosted booking site.',
    browse: 'Browse all properties',
  }

  return (
    <>
      {backupMode && (
        <aside className="mb-7 flex flex-col gap-4 rounded-2xl border border-[#D4AF37]/35 bg-[#FBF8EF] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6" role="status">
          <div>
            <h3 className="mb-1 font-display text-lg font-bold text-[#0A1A30]">{backupNotice.title}</h3>
            <p className="max-w-3xl text-sm leading-relaxed text-[#475569]">{backupNotice.text}</p>
          </div>
          <a
            href="https://book.richaf.global/"
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#06121F] transition-colors hover:bg-[#F2D98D]"
          >
            {backupNotice.browse}
          </a>
        </aside>
      )}
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((property) => <PropertyCard key={property.id} property={property} />)}
      </div>
    </>
  )
}

export default PropertyGrid