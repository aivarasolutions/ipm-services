import { Link } from 'react-router-dom'
import { Bath, BedDouble, MapPin, Star, Users } from 'lucide-react'

const PropertyCard = ({ property }) => (
  <Link
    to={`/properties/${property.slug}`}
    className="group overflow-hidden rounded-2xl border border-[#0A1A30]/10 bg-white text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E4DC]">
      {(property.images?.[0]?.url || property.thumbnailUrl) ? (
        <img
          src={property.images?.[0]?.url || property.thumbnailUrl}
          alt={property.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-[#475569]">Photo coming soon</div>
      )}
      {property.rating && (
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#06121F]/90 px-3 py-1.5 text-sm font-semibold text-white">
          <Star className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
          {property.rating.toFixed(1)}
        </div>
      )}
    </div>
    <div className="p-5">
      <div className="mb-2 flex items-center gap-1.5 text-sm text-[#64748B]">
        <MapPin className="h-4 w-4 text-[#D4AF37]" />
        <span>{property.location || 'Location available when booking'}</span>
      </div>
      <h3 className="mb-4 min-h-[3.25rem] font-display text-xl font-bold leading-snug text-[#0A1A30]">
        {property.name}
      </h3>
      <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-[#E2E8F0] pt-4 text-sm text-[#475569]">
        <span className="flex items-center gap-1"><Users className="h-4 w-4" />{property.guests}</span>
        <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" />{property.bedrooms} bd</span>
        <span className="flex items-center gap-1"><Bath className="h-4 w-4" />{property.bathrooms} ba</span>
      </div>
      <div className="mt-5 font-semibold text-[#B28B17] group-hover:text-[#8E6C0F]">
        View dates & details <span aria-hidden="true">→</span>
      </div>
    </div>
  </Link>
)

export default PropertyCard