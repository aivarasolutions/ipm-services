import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  DollarSign, 
  BarChart3,
  Star,
  Clock,
  Users
} from 'lucide-react'

// Import property images
import luxuryBeachfront from '../assets/luxury_beachfront_resort.webp'
import tulumPenthouse from '../assets/stunning_tulum_penthouse.webp'
import lakeNorman from '../assets/lake_norman_retreat.webp'

const Home = () => {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    // Load properties data
    fetch('/properties.json')
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error('Error loading properties:', error))
  }, [])

  const stats = [
    {
      icon: Building2,
      number: '30+',
      label: 'Properties Managed'
    },
    {
      icon: TrendingUp,
      number: '75-85%',
      label: 'Average Occupancy'
    },
    {
      icon: Star,
      number: '10+',
      label: 'Years Experience'
    },
    {
      icon: Clock,
      number: 'Always',
      label: '24/7 Support'
    }
  ]

  const services = [
    {
      icon: BarChart3,
      title: 'Multi-Platform Optimization',
      description: 'List your property on Airbnb, Booking.com, and Expedia to maximize exposure and reach all travelers, not just one market'
    },
    {
      icon: Shield,
      title: '24/7 Support & Maintenance',
      description: 'Round-the-clock property care and guest support to ensure seamless experiences'
    },
    {
      icon: TrendingUp,
      title: 'Revenue Optimization',
      description: 'Maintain 75-85% occupancy rates year-round through strategic pricing and marketing'
    },
    {
      icon: DollarSign,
      title: 'Monthly Payouts',
      description: 'Reliable monthly payments with detailed reporting and transparent financial statements'
    }
  ]

  const propertyImages = {
    'luxury-beachfront-resort': luxuryBeachfront,
    'stunning-tulum-penthouse': tulumPenthouse,
    'lake-norman-retreat': lakeNorman
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Elevating Property Management
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Maximize your ROI with our comprehensive vacation rental management. 
            We specialize in large family properties and waterfront locations, 
            maintaining 75-85% occupancy rates year-round.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/owner-portal">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                <Users className="mr-2 h-5 w-5" />
                Owner Portal Login
              </Button>
            </Link>
            <Link to="/properties">
              <Button variant="outline" className="border-2 border-gray-300 px-8 py-3 text-lg">
                View Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive property management solutions designed to maximize your rental income
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our portfolio of luxury vacation rentals in prime locations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.slice(0, 3).map((property) => (
              <Card key={property.slug} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-12 relative">
                  <img
                    src={propertyImages[property.slug]}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {property.location} • {property.guests} guests
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Maximize Your Property's Potential?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join 30+ property owners who trust IPM to manage their vacation rentals. 
            Get started today and see the difference professional management makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Schedule Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg border-2 border-white">
                Property Evaluation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

