import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Award, 
  Globe, 
  TrendingUp, 
  Shield, 
  Heart,
  CheckCircle
} from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Reliability',
      description: 'We build lasting relationships with property owners through transparent communication and consistent results.'
    },
    {
      icon: TrendingUp,
      title: 'Excellence in Service',
      description: 'Our commitment to excellence drives us to continuously improve and exceed expectations.'
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'Every property is unique, and we tailor our services to meet your specific needs and goals.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'With properties across multiple destinations, we bring international expertise to local markets.'
    }
  ]

  const achievements = [
    { number: '30+', label: 'Properties Under Management' },
    { number: '85%', label: 'Average Occupancy Rate' },
    { number: '10+', label: 'Years of Experience' },
    { number: '24/7', label: 'Support Available' }
  ]

  const services = [
    'Full-service property management',
    'Multi-platform listing optimization',
    'Professional photography and marketing',
    'Guest communication and support',
    'Maintenance and housekeeping coordination',
    'Revenue optimization and pricing strategy',
    'Financial reporting and monthly payouts',
    'Legal compliance and insurance management'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About IPM</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              International Property Management is a leading vacation rental management company 
              specializing in luxury properties across prime destinations. We combine local expertise 
              with global standards to maximize your property's potential.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded with a vision to revolutionize vacation rental management, IPM has grown 
                from managing a handful of properties to becoming a trusted partner for luxury 
                property owners across multiple destinations.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our journey began with a simple belief: every property owner deserves professional 
                management that maximizes returns while maintaining the highest standards of guest 
                experience. Today, we manage over 30 properties with an average occupancy rate of 
                75-85% year-round.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We specialize in large family properties and waterfront locations, understanding 
                the unique challenges and opportunities these premium properties present. Our team 
                combines deep local knowledge with cutting-edge technology to deliver exceptional results.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {achievement.number}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {achievement.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Do</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We provide comprehensive vacation rental management services that take the hassle 
                out of property ownership while maximizing your investment returns.
              </p>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Why Choose IPM?</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-2">
                  <Award className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Proven track record with 75-85% occupancy rates</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Users className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Dedicated team of hospitality professionals</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Globe className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span>Multi-platform presence for maximum exposure</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Shield className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span>24/7 support and emergency response</span>
                </li>
              </ul>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 w-full">
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Partner with IPM?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join our growing family of satisfied property owners and start maximizing 
            your rental income today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Schedule Consultation
              </Button>
            </Link>
            <Link to="/properties">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg border-2 border-white">
                View Our Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

