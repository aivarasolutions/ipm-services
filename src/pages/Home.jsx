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

// Airbnb Widget Components
const AirbnbWidget = ({ id, href, description }) => {
  return (
    <div 
      className="airbnb-embed-frame" 
      data-id={id}
      data-view="home" 
      data-hide-price="true" 
      style={{width: '450px', height: '300px', margin: 'auto'}}
    >
      <a 
        href={href}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        View On Airbnb
      </a>
      <a 
        href={href}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {description}
      </a>
    </div>
  );
};

const AirbnbSection = () => {
  useEffect(() => {
    // Load Airbnb embed script
    const script = document.createElement('script');
    script.src = 'https://www.airbnb.com/embeddable/airbnb_jssdk';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://www.airbnb.com/embeddable/airbnb_jssdk"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const properties = [
    {
      id: "1347342374342049672",
      href: "https://www.airbnb.com/rooms/1347342374342049672?guests=1&adults=1&s=66&source=embed_widget",
      description: "Home in Mooresville · ★4.79 · 3 bedrooms · 5 beds · 3 baths"
    },
    {
      id: "1471379203731591914",
      href: "https://www.airbnb.com/rooms/1471379203731591914?guests=1&adults=1&s=66&source=embed_widget",
      description: "Villa in Playa del Carmen · ★5.0 · 2 bedrooms · 2 beds · 2 baths"
    },
    {
      id: "797383249287358281",
      href: "https://www.airbnb.com/rooms/797383249287358281?guests=1&adults=1&s=66&source=embed_widget",
      description: "Rental unit in Playa del Carmen · ★4.75 · 3 bedrooms · 6 beds · 3 baths"
    },
    {
      id: "1360603145357884662",
      href: "https://www.airbnb.com/rooms/1360603145357884662?guests=1&adults=1&s=66&source=embed_widget",
      description: "Treehouse in Playa del Carmen · ★5.0 · 1 bedroom · 3 beds · 1 bath"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {properties.map((property, index) => (
        <div key={property.id} className="flex justify-center">
          <AirbnbWidget 
            id={property.id}
            href={property.href}
            description={property.description}
          />
        </div>
      ))}
    </div>
  );
};

const Home = () => {

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


  return (
    <div className="min-h-screen">
      {/* Hero Image Section */}
      <section className="w-full">
        <img 
          src="/ipm-hero.png" 
          alt="IPM Hero"
          className="w-full h-auto object-cover"
          style={{ maxHeight: '100vh' }}
        />
      </section>

      {/* Elevating Property Management Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem' }}>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our exceptional vacation rental properties available for booking directly through Airbnb.
            </p>
          </div>
          <AirbnbSection />
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

