import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  MapPin, 
  Users, 
  Bed, 
  Bath,
  Star,
  Filter
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


const Properties = () => {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Properties</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover our curated collection of luxury vacation rentals in prime destinations. 
              Each property is carefully selected and professionally managed to ensure exceptional experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Airbnb Properties Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover our exceptional vacation rental properties available for booking directly through Airbnb.
          </p>
          <AirbnbSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Don't See What You're Looking For?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            We're constantly adding new properties to our portfolio. Contact us to discuss 
            your specific needs or to learn about upcoming listings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Contact Us
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

export default Properties

