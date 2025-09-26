import { Link } from 'react-router-dom';
import Container from '../components/Container';
import LeadCaptureForm from '../components/LeadCaptureForm';
import { getRealEstateListings } from '../lib/realEstateData';

const RealEstate = () => {
  const listings = getRealEstateListings();
  const featuredListings = listings.filter(listing => listing.featured).slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium Real Estate Investment Opportunities
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Discover high-ROI properties in Mexico & USA with guaranteed rental management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#listings" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-md font-medium transition-colors">
              View Properties
            </a>
            <a href="#consultation" className="border-2 border-gray-300 hover:border-gray-400 px-8 py-3 text-lg rounded-md font-medium transition-colors">
              Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Buyers Company Information */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Full-Service Real Estate Solutions</h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                <strong>IPM is a buyers company</strong> specializing in connecting international investors with premium real estate opportunities. 
                While we feature our exclusive pre-sale and investment properties below, our professional real estate agents 
                provide access to <strong>all properties available for sale throughout Quintana Roo, Mexico and the United States</strong>.
              </p>
              <p className="text-lg text-gray-600 mt-4 max-w-4xl mx-auto">
                Whether you're interested in our curated investment opportunities or seeking other properties in our markets, 
                our experienced team can help you find and secure the perfect real estate investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Investment Properties - Now First */}
      <section className="py-20 bg-white" id="listings">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Investment Properties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Exclusive pre-sale opportunities with guaranteed management and ROI
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map(listing => (
              <div key={listing.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                    {listing.status}
                  </div>
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{listing.title}</h3>
                  <p className="text-gray-600 mb-4">{listing.location}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      {listing.slug === 'paulus-condos' || listing.slug === 'joshua-condos' || listing.slug === 'ukana-condos' ? 
                        `Starting at $${listing.price.toLocaleString()} USD` : 
                        `$${listing.price.toLocaleString()}`
                      }
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      ROI: {listing.expectedROI}%
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {listing.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.features.map((feature, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/real-estate/${listing.slug}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium text-center block transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition - Without Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Invest with IPM?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for international real estate investment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Guaranteed 8-12% ROI</h3>
              <p className="text-gray-600">Professional management ensures consistent returns with our proven track record</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pre-sale Opportunities</h3>
              <p className="text-gray-600">Access exclusive properties with 20-30% discounts before public release</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Turnkey Solutions</h3>
              <p className="text-gray-600">We handle everything from purchase to rental management</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Prime Locations</h3>
              <p className="text-gray-600">Strategic properties in high-demand vacation and investment areas</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Support</h3>
              <p className="text-gray-600">Full legal assistance for international buyers and investors</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Immediate Income</h3>
              <p className="text-gray-600">Start earning rental income as soon as construction is complete</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-20 bg-white" id="consultation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Investment Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, transparent steps to secure your real estate investment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Consultation</h3>
              <p className="text-gray-600">Free consultation to understand your investment goals and preferences</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Selection</h3>
              <p className="text-gray-600">We present curated properties matching your criteria and budget</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Due Diligence</h3>
              <p className="text-gray-600">Complete legal review, market analysis, and detailed ROI projections</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Purchase & Management</h3>
              <p className="text-gray-600">Handle entire purchase process and provide immediate rental management</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Investing?</h2>
            <p className="text-xl text-gray-600 mb-8">Get your free investment analysis today</p>
            <div className="max-w-lg mx-auto">
              <LeadCaptureForm variant="detailed" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RealEstate;