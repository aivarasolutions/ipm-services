import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import Container from '@/components/Container'
import { MapPin, Plane, Car, Home, Utensils, Camera, Waves, TreePine, Building, CheckCircle, AlertCircle } from 'lucide-react'

const LocationGuide = () => {
  // Form state management
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('loading');
    setErrorMessage('');

    try {
      // Use the current domain for API requests
      const apiUrl = `${window.location.origin}/api/relocation-guide`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionStatus('success');
        // Reset form
        setFormState({
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        });
      } else {
        setSubmissionStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus('error');
      setErrorMessage(`Network error: ${error.message}. Please check your connection and try again.`);
    }
  };

  const locations = [
    {
      id: 'cancun',
      name: 'Cancún',
      subtitle: 'World-Class Resort Destination',
      description: 'International gateway to the Riviera Maya with pristine beaches, vibrant nightlife, and endless entertainment options.',
      highlights: [
        'International Airport (CUN) with direct flights worldwide',
        'Hotel Zone with luxury resorts and beaches',
        'Mayan ruins at El Rey and day trips to Chichen Itza',
        'World-class restaurants and nightlife',
        'Water sports and diving at MUSA underwater museum'
      ],
      livingCost: {
        rent: '$800-2,500 USD/month',
        utilities: '$100-200 USD/month',
        food: '$300-600 USD/month',
        transportation: '$50-150 USD/month'
      },
      neighborhoods: [
        { name: 'Hotel Zone', description: 'Tourist area with beaches, resorts, and entertainment' },
        { name: 'Downtown', description: 'Local culture, markets, and authentic Mexican experience' },
        { name: 'Puerto Juárez', description: 'Residential area with ferry access to Isla Mujeres' },
        { name: 'Zona Hotelera Sur', description: 'Quieter hotel zone area with upscale developments' }
      ],
      keyFeatures: [
        { icon: Plane, title: 'International Airport', description: 'Direct flights to major cities worldwide' },
        { icon: Waves, title: 'Caribbean Beaches', description: 'White sand beaches with crystal clear waters' },
        { icon: Building, title: 'Modern Infrastructure', description: 'Full city amenities and services' },
        { icon: Utensils, title: 'Culinary Scene', description: 'From street food to Michelin-starred restaurants' }
      ]
    },
    {
      id: 'playa-del-carmen',
      name: 'Playa del Carmen',
      subtitle: 'Bohemian Beach Town',
      description: 'Charming coastal town blending Mexican culture with international flair, famous for its pedestrian-friendly Fifth Avenue.',
      highlights: [
        'Famous Fifth Avenue (Quinta Avenida) pedestrian street',
        'Beautiful beaches with beach clubs and cenotes nearby',
        'Ferry access to Cozumel island',
        'Growing expat community and co-working spaces',
        'Perfect base for exploring Riviera Maya attractions'
      ],
      livingCost: {
        rent: '$600-2,000 USD/month',
        utilities: '$80-150 USD/month',
        food: '$250-500 USD/month',
        transportation: '$30-100 USD/month'
      },
      neighborhoods: [
        { name: 'Centro/Quinta Avenida', description: 'Heart of the action with shops, restaurants, and nightlife' },
        { name: 'Playacar', description: 'Upscale gated community with golf course and beach access' },
        { name: 'Colosio', description: 'Local residential area with authentic Mexican lifestyle' },
        { name: 'Ejidal', description: 'Growing area with new developments and local amenities' }
      ],
      keyFeatures: [
        { icon: MapPin, title: 'Central Location', description: 'Easy access to Cancun, Tulum, and Cozumel' },
        { icon: Waves, title: 'Beach Culture', description: 'Laid-back beach lifestyle with vibrant social scene' },
        { icon: Home, title: 'Expat Community', description: 'Growing international community with modern amenities' },
        { icon: Camera, title: 'Cultural Attractions', description: 'Rich Mayan heritage with modern Mexican culture' }
      ]
    },
    {
      id: 'tulum',
      name: 'Tulum',
      subtitle: 'Eco-Luxury Paradise',
      description: 'Ancient Mayan ruins meet eco-luxury resorts in this bohemian paradise known for its stunning cenotes and sustainable tourism.',
      highlights: [
        'Iconic clifftop Mayan ruins overlooking the Caribbean',
        'World-famous cenotes for swimming and diving',
        'Eco-luxury hotels and sustainable tourism focus',
        'Bohemian atmosphere with yoga retreats and wellness centers',
        'Growing food scene with farm-to-table restaurants'
      ],
      livingCost: {
        rent: '$700-2,800 USD/month',
        utilities: '$90-180 USD/month',
        food: '$300-700 USD/month',
        transportation: '$40-120 USD/month'
      },
      neighborhoods: [
        { name: 'Tulum Beach', description: 'Beachfront with eco-hotels and bohemian atmosphere' },
        { name: 'Tulum Pueblo', description: 'Town center with local services and authentic Mexican culture' },
        { name: 'La Veleta', description: 'Rapidly developing area with new condos and amenities' },
        { name: 'Aldea Zama', description: 'Planned community with modern infrastructure and cenote access' }
      ],
      keyFeatures: [
        { icon: TreePine, title: 'Eco-Conscious', description: 'Sustainable development with jungle and beach harmony' },
        { icon: Waves, title: 'Cenotes & Beaches', description: 'Natural swimming holes and pristine Caribbean coastline' },
        { icon: Camera, title: 'Ancient Ruins', description: 'Well-preserved Mayan archaeological site' },
        { icon: Home, title: 'Wellness Focus', description: 'Yoga retreats, spas, and holistic lifestyle' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Riviera Maya Relocation Guide
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover Cancún, Playa del Carmen, and Tulum - Your Gateway to Paradise
            </p>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              Complete relocation and lifestyle guide for Mexico's most sought-after Caribbean destinations. 
              From vibrant resort cities to bohemian beach towns, find your perfect home in paradise.
            </p>
          </div>
        </Container>
      </section>

      {/* PDF Download Form */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Your Complete Relocation Guide
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Download our comprehensive PDF guide with detailed information about relocating to Cancún, Playa del Carmen, and Tulum.
            </p>
            
            <Card className="p-8">
              <CardContent>
                {submissionStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-green-800 font-medium">Success! Check your email.</p>
                      <p className="text-green-600 text-sm">Your relocation guide has been sent to your inbox.</p>
                    </div>
                  </div>
                )}
                
                {submissionStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-red-800 font-medium">Error sending guide</p>
                      <p className="text-red-600 text-sm">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleInputChange}
                        required
                        disabled={submissionStatus === 'loading'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleInputChange}
                        required
                        disabled={submissionStatus === 'loading'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      disabled={submissionStatus === 'loading'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleInputChange}
                      required
                      disabled={submissionStatus === 'loading'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="text-left">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        required
                        disabled={submissionStatus === 'loading'}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:cursor-not-allowed"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to receive the relocation guide and occasional updates about properties and services in Mexico. You can unsubscribe at any time.
                      </span>
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={submissionStatus === 'loading'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {submissionStatus === 'loading' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Guide...
                      </>
                    ) : (
                      'Download Free Relocation Guide (PDF)'
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Your information is secure and will never be shared with third parties.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Quick Comparison */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Comparison</h2>
            <p className="text-lg text-gray-600">Choose your ideal destination</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <Building className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold mb-2">Cancún</h3>
                <p className="text-gray-600 mb-4">International city with modern amenities</p>
                <div className="text-sm text-gray-500">
                  <p>✈️ Major international airport</p>
                  <p>🏨 Resort and hotel zone</p>
                  <p>🌃 Vibrant nightlife</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <Waves className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                <h3 className="text-xl font-bold mb-2">Playa del Carmen</h3>
                <p className="text-gray-600 mb-4">Charming beach town with expat community</p>
                <div className="text-sm text-gray-500">
                  <p>🚶 Walkable downtown area</p>
                  <p>🌍 Growing international community</p>
                  <p>🏖️ Beach clubs and cenotes</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <TreePine className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-2">Tulum</h3>
                <p className="text-gray-600 mb-4">Eco-luxury paradise with ancient ruins</p>
                <div className="text-sm text-gray-500">
                  <p>🏛️ Mayan archaeological site</p>
                  <p>🧘 Wellness and yoga retreats</p>
                  <p>🌿 Sustainable eco-tourism</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Detailed Location Guides */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Detailed Location Guides</h2>
            <p className="text-lg text-gray-600">Everything you need to know about living in paradise</p>
          </div>

          <div className="space-y-16">
            {locations.map((location, index) => (
              <div key={location.id} className={`${index % 2 === 1 ? 'bg-gray-50' : ''} -mx-4 px-4 py-12 rounded-lg`}>
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{location.name}</h3>
                    <p className="text-xl text-blue-600 mb-4">{location.subtitle}</p>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">{location.description}</p>
                  </div>

                  {/* Key Features */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {location.keyFeatures.map((feature, idx) => (
                      <Card key={idx} className="text-center p-4 hover:shadow-md transition-shadow">
                        <CardContent>
                          <feature.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                          <h4 className="font-semibold mb-2">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12">
                    {/* Highlights */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">✨ Location Highlights</h4>
                      <ul className="space-y-3">
                        {location.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Living Costs */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">💰 Average Living Costs</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Rent (1-2 bedroom):</span>
                          <span className="font-semibold">{location.livingCost.rent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Utilities:</span>
                          <span className="font-semibold">{location.livingCost.utilities}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Food & Dining:</span>
                          <span className="font-semibold">{location.livingCost.food}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Transportation:</span>
                          <span className="font-semibold">{location.livingCost.transportation}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Neighborhoods */}
                  <div className="mt-12">
                    <h4 className="text-xl font-bold text-gray-900 mb-6">🏘️ Popular Neighborhoods</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      {location.neighborhoods.map((neighborhood, idx) => (
                        <Card key={idx} className="p-4">
                          <CardContent>
                            <h5 className="font-semibold text-gray-900 mb-2">{neighborhood.name}</h5>
                            <p className="text-gray-600 text-sm">{neighborhood.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Make the Move?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let our local experts help you find the perfect property and navigate your relocation to Mexico's Caribbean coast.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Schedule Consultation
                </Button>
              </Link>
              <Link to="/real-estate">
                <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100">
                  View Properties
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default LocationGuide