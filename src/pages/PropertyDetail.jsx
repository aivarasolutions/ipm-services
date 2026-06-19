import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Users, 
  Bed, 
  Bath,
  Star,
  ArrowLeft,
  Wifi,
  Car,
  Utensils,
  Waves,
  TreePine,
  Home,
  CheckCircle,
  Calendar,
  DollarSign
} from 'lucide-react'

// Import property images
import luxuryBeachfront from '../assets/luxury_beachfront_resort.webp'
import tulumPenthouse from '../assets/stunning_tulum_penthouse.webp'
import lakeNorman from '../assets/lake_norman_retreat.webp'

const PropertyDetail = () => {
  const { slug } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  const propertyImages = {
    'luxury-beachfront-resort': luxuryBeachfront,
    'stunning-tulum-penthouse': tulumPenthouse,
    'lake-norman-retreat': lakeNorman
  }

  const amenityIcons = {
    'Private infinity pool': Waves,
    'Private rooftop pool': Waves,
    'Private Pool': Waves,
    'Direct beach access': Waves,
    'Direct lake access': Waves,
    'WiFi': Wifi,
    'High-speed WiFi': Wifi,
    'Parking space': Car,
    'Parking for multiple cars': Car,
    'Fully equipped kitchen': Utensils,
    'Full kitchen': Utensils,
    'Gourmet kitchen': Utensils,
    'Game room': Home,
    'Fire pit': TreePine
  }

  useEffect(() => {
    // Load property data
    fetch('/properties.json')
      .then(response => response.json())
      .then(data => {
        const foundProperty = data.find(p => p.slug === slug)
        setProperty(foundProperty)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading property:', error)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06121F]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-[#C9D2DE]">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06121F]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Property Not Found</h1>
          <p className="text-[#C9D2DE] mb-6">The property you're looking for doesn't exist.</p>
          <Link to="/properties">
            <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] text-[#06121F] font-bold hover:from-[#F2D98D] hover:to-[#D4AF37]">Back to Properties</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="bg-[#06121F] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/properties" className="flex items-center text-[#D4AF37] hover:text-[#F2D98D]">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Properties
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="h-96 md:h-[500px] relative overflow-hidden">
          <img
            src={propertyImages[property.slug]}
            alt={property.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06121F] via-[#06121F]/70 to-[#06121F]/30"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{property.title}</h1>
                <div className="flex items-center space-x-4 text-lg">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-1 fill-current text-yellow-400" />
                    <span>4.9 (24 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12 bg-[#F8F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mb-8 p-6 bg-white border border-[#0A1A30]/10 shadow-lg shadow-[#06121F]/5 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-[#D4AF37]" />
                  <span className="font-medium text-[#0A1A30]">{property.guests} guests</span>
                </div>
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-[#D4AF37]" />
                  <span className="font-medium text-[#0A1A30]">{property.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-[#D4AF37]" />
                  <span className="font-medium text-[#0A1A30]">{property.bathrooms} bathrooms</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0A1A30] mb-4">About This Property</h2>
                <p className="text-[#334155] leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0A1A30] mb-4">Property Features</h2>
                <div className="flex flex-wrap gap-3">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-[#D4AF37]/15 text-[#0A1A30] border border-[#D4AF37]/30 px-4 py-2 rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0A1A30] mb-4">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity] || CheckCircle
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-[#334155]">{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 bg-white border border-[#0A1A30]/10 shadow-lg shadow-[#06121F]/5">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-[#0A1A30] mb-2">
                      {property.price}
                    </div>
                    <div className="text-[#475569]">per night</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-[#F8F5EF] border border-[#0A1A30]/10 rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-[#D4AF37]" />
                        <span className="font-medium text-[#0A1A30]">Availability</span>
                      </div>
                      <span className="text-green-600 font-medium">{property.availability}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-[#F8F5EF] border border-[#0A1A30]/10 rounded-lg">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-[#D4AF37]" />
                        <span className="font-medium text-[#0A1A30]">Min. Stay</span>
                      </div>
                      <span className="font-medium text-[#0A1A30]">3 nights</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] text-[#06121F] font-bold hover:from-[#F2D98D] hover:to-[#D4AF37] text-lg py-3">
                      Check Availability
                    </Button>
                    <Button variant="outline" className="w-full text-lg py-3 border-2 border-[#D4AF37] text-[#0A1A30] hover:bg-[#D4AF37] hover:text-[#06121F]">
                      Request Information
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#0A1A30]/10 text-center">
                    <p className="text-sm text-[#475569] mb-2">Need help booking?</p>
                    <div className="space-y-2">
                      <a 
                        href="tel:+13104000032" 
                        className="block text-[#D4AF37] hover:text-[#B8941F] font-medium"
                      >
                        Call: +1 310-400-0032
                      </a>
                      <a 
                        href="mailto:info@richaf.global" 
                        className="block text-[#D4AF37] hover:text-[#B8941F] font-medium"
                      >
                        Email: info@richaf.global
                      </a>
                      <a 
                        href="https://wa.me/13104000032" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-[#D4AF37] hover:text-[#B8941F] font-medium"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#06121F] border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Book Your Stay?
          </h2>
          <p className="text-xl text-[#C9D2DE] mb-8 max-w-3xl mx-auto">
            Experience luxury vacation rental management at its finest. Contact us today 
            to check availability and make your reservation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] text-[#06121F] font-bold hover:from-[#F2D98D] hover:to-[#D4AF37] px-8 py-3 text-lg">
                Book Now
              </Button>
            </Link>
            <Link to="/properties">
              <Button className="bg-transparent text-white hover:bg-[#D4AF37]/10 px-8 py-3 text-lg border-2 border-[#D4AF37]/50">
                View More Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PropertyDetail
