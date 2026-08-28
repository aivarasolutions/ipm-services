import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from './PropertyCard'
import { fetchProperties } from '../services/hostawayApi'

const PropertyGrid = ({ limit }) => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
        <h3 className="mb-3 text-2xl font-bold text-[#0A1A30]">Our live portfolio is temporarily unavailable</h3>
        <p className="mb-6 text-[#475569]">{error || 'Please check back shortly or contact our reservations team.'}</p>
        <Link to="/contact" className="inline-flex rounded-md bg-[#D4AF37] px-6 py-3 font-semibold text-[#06121F] hover:bg-[#F2D98D]">
          Contact Reservations
        </Link>
      </div>
    )
  }

  const visible = limit ? properties.slice(0, limit) : properties
  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
      {visible.map((property) => <PropertyCard key={property.id} property={property} />)}
    </div>
  )
}

export default PropertyGrid