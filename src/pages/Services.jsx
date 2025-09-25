import React from 'react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { 
  Building2, 
  TrendingUp, 
  Clock, 
  Globe, 
  Shield, 
  Users, 
  Star,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ReviewsSection from '../components/ReviewsSection'

const Services = () => {
  const services = [
    {
      icon: <Building2 className="h-12 w-12 text-blue-600" />,
      title: "Property Management",
      description: "Complete end-to-end property management services for vacation rentals. We handle everything from guest communications to maintenance coordination.",
      features: [
        "Guest check-in and check-out coordination",
        "Property maintenance and repairs",
        "Cleaning and housekeeping management",
        "Inventory management and restocking",
        "Property inspections and reporting"
      ]
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-blue-600" />,
      title: "Revenue Optimization",
      description: "Maximize your rental income with our data-driven pricing strategies and market analysis. We maintain 75-85% occupancy rates year-round.",
      features: [
        "Dynamic pricing optimization",
        "Market analysis and competitive research",
        "Seasonal rate adjustments",
        "Revenue forecasting and reporting",
        "Performance analytics and insights"
      ]
    },
    {
      icon: <Clock className="h-12 w-12 text-blue-600" />,
      title: "24/7 Support",
      description: "Round-the-clock support for both property owners and guests. Our team is always available to handle any issues that may arise.",
      features: [
        "24/7 guest support hotline",
        "Emergency maintenance coordination",
        "Real-time issue resolution",
        "Multilingual customer service",
        "Owner communication and updates"
      ]
    },
    {
      icon: <Globe className="h-12 w-12 text-blue-600" />,
      title: "Multi-Platform Listing",
      description: "List your property across all major booking platforms to maximize exposure and bookings. We manage listings on Airbnb, Booking.com, Expedia, and more.",
      features: [
        "Airbnb listing optimization",
        "Booking.com and Expedia management",
        "VRBO and HomeAway listings",
        "Direct booking website integration",
        "Channel management and synchronization"
      ]
    }
  ]

  const benefits = [
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "Premium Service Quality",
      description: "White-glove service that exceeds guest expectations and maintains property standards."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Property Protection",
      description: "Comprehensive insurance coverage and security measures to protect your investment."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Expert Team",
      description: "Experienced professionals with deep knowledge of vacation rental management."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Comprehensive vacation rental management services designed to maximize your property's potential and your peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started Today
              </Button>
            </Link>
            <Link to="/properties">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-2 border-white">
                View Our Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Property Management Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From listing optimization to guest services, we handle every aspect of your vacation rental business so you can focus on what matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose IPM?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just property managers – we're your partners in success. Here's what sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proven Results
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Our track record speaks for itself. See how we deliver exceptional results for property owners.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">30+</div>
              <div className="text-lg">Properties Managed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">75-85%</div>
              <div className="text-lg">Average Occupancy</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
              <div className="text-lg">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-lg">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Maximize Your Property's Potential?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join 30+ property owners who trust IPM to manage their vacation rentals. Get started today and see the difference professional management makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Schedule Consultation
              </Button>
            </Link>
            <a href="tel:+13104000032">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-2 border-white">
                <Phone className="h-5 w-5 mr-2" />
                Call +1 310-400-0032
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services

