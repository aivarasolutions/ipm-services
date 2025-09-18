import { useState, useEffect } from 'react'
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <Link to="/properties">
            <Button>Back to Properties</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/properties" className="flex items-center text-blue-600 hover:text-blue-700">
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
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-medium">{property.guests} guests</span>
                </div>
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-medium">{property.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-medium">{property.bathrooms} bathrooms</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Features</h2>
                <div className="flex flex-wrap gap-3">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity] || CheckCircle
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {property.price}
                    </div>
                    <div className="text-gray-600">per night</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="font-medium">Availability</span>
                      </div>
                      <span className="text-green-600 font-medium">{property.availability}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="font-medium">Min. Stay</span>
                      </div>
                      <span className="font-medium">3 nights</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                      Check Availability
                    </Button>
                    <Button variant="outline" className="w-full text-lg py-3">
                      Request Information
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t text-center">
                    <p className="text-sm text-gray-600 mb-2">Need help booking?</p>
                    <div className="space-y-2">
                      <a 
                        href="tel:+13104000032" 
                        className="block text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Call: +1 310-400-0032
                      </a>
                      <a 
                        href="mailto:info@richaf.global" 
                        className="block text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Email: info@richaf.global
                      </a>
                      <a 
                        href="https://wa.me/13104000032" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-700 font-medium"
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
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Book Your Stay?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Experience luxury vacation rental management at its finest. Contact us today 
            to check availability and make your reservation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Book Now
              </Button>
            </Link>
            <Link to="/properties">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg border-2 border-white">
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

