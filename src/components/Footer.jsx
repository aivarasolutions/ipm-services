import { Link } from 'react-router-dom'
import { Building2, Instagram, Facebook, Linkedin } from 'lucide-react'

const Footer = () => {
  const services = [
    'Property Management',
    'Revenue Optimization',
    '24/7 Support',
    'Multi-Platform Listing'
  ]

  const locations = [
    'Playa del Carmen',
    'Tulum',
    'Cancun',
    'Lake Norman'
  ]

  const contact = [
    '24/7 Support Available',
    'DM for Inquiries',
    'Property Evaluations',
    'Owner Portal Access'
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">IPM</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              International Property Management - Elevating vacation rental experiences worldwide.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/ipm.promotion" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/61554061650450/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/107691694/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to="/services" 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Locations</h3>
            <ul className="space-y-2">
              {locations.map((location, index) => (
                <li key={index}>
                  <Link 
                    to="/properties" 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {location}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="tel:+13104000032" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  24/7 Support Available
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@richaf.global" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  DM for Inquiries
                </a>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Property Evaluations
                </Link>
              </li>
              <li>
                <a 
                  href="https://wa.me/13104000032" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Owner Portal Access
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 International Property Management. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

