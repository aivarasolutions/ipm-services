import { Star, Award, ExternalLink } from 'lucide-react'

const ReviewsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Guest Reviews & Recognition
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what our guests are saying about their exceptional experiences with IPM properties.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Airbnb Profile Info */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="bg-[#FF5A5F] p-3 rounded-full mr-4">
                <Star className="h-8 w-8 text-white fill-current" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Airbnb Superhost</h3>
                <p className="text-gray-600">Trusted for 10+ Years</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Overall Rating</span>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="ml-1 font-bold text-gray-900">4.8+ Average</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Total Reviews</span>
                <span className="font-bold text-gray-900">100+ Reviews</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Properties Listed</span>
                <span className="font-bold text-gray-900">30+ Active Listings</span>
              </div>
            </div>

            <a 
              href="https://www.airbnb.com/users/show/48180961" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#FF5A5F] hover:bg-[#E04A4F] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Our Airbnb Profile
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>

          {/* Achievements & Recognition */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Superhost Status</h4>
                <p className="text-gray-600">
                  Earned and maintained Airbnb Superhost status for over 10 years, demonstrating 
                  exceptional hospitality and guest satisfaction.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Outstanding Reviews</h4>
                <p className="text-gray-600">
                  Our guests consistently praise our attention to detail, property cleanliness, 
                  and responsive communication throughout their stays.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Professional Management</h4>
                <p className="text-gray-600">
                  Recognized for our professional approach to property management and guest 
                  relations across multiple international markets.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Review Highlights */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            What Our Guests Are Saying
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic mb-3">
                "Exceptional property management and outstanding guest experience. 
                The attention to detail was impressive!"
              </p>
              <p className="text-sm text-gray-500">Recent Guest Review</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic mb-3">
                "Professional service from start to finish. The property exceeded 
                all expectations. Highly recommended!"
              </p>
              <p className="text-sm text-gray-500">Recent Guest Review</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic mb-3">
                "Seamless booking process and amazing property. The team was 
                responsive and helpful throughout our stay."
              </p>
              <p className="text-sm text-gray-500">Recent Guest Review</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection