import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Building2 } from 'lucide-react'

const Header = () => {
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/', color: 'bg-green-500 text-white' },
    { name: 'Services', path: '/services', color: 'bg-blue-600 text-white' },
    { name: 'Properties', path: '/properties', color: 'bg-orange-500 text-white' },
    { name: 'Contact', path: '/contact', color: 'bg-gray-600 text-white' },
    { name: 'Owner Portal', path: '/owner-portal', color: 'bg-purple-600 text-white' }
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">IPM</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path}>
                <Button
                  variant="ghost"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? item.color
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link to="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

