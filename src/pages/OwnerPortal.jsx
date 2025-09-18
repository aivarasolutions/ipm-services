import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff,
  BarChart3,
  Calendar,
  DollarSign,
  Home,
  MessageSquare,
  FileText,
  Settings,
  Bell,
  TrendingUp,
  Users,
  Star
} from 'lucide-react'
import { Link } from 'react-router-dom'

const OwnerPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulate login - in real app, this would authenticate with backend
    if (loginData.email && loginData.password) {
      setIsLoggedIn(true)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const dashboardStats = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: "Monthly Revenue",
      value: "$12,450",
      change: "+15.3%",
      changeType: "positive"
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: "Occupancy Rate",
      value: "82%",
      change: "+5.2%",
      changeType: "positive"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Total Bookings",
      value: "24",
      change: "+8 this month",
      changeType: "positive"
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      title: "Average Rating",
      value: "4.9",
      change: "Excellent",
      changeType: "neutral"
    }
  ]

  const recentBookings = [
    {
      guest: "Sarah Johnson",
      dates: "Sep 20-25, 2025",
      property: "Luxury Beachfront Resort",
      amount: "$2,125",
      status: "Confirmed"
    },
    {
      guest: "Michael Chen",
      dates: "Sep 18-22, 2025",
      property: "Tulum Penthouse",
      amount: "$1,950",
      status: "Check-in Today"
    },
    {
      guest: "Emma Rodriguez",
      dates: "Sep 15-20, 2025",
      property: "Lake Norman Retreat",
      amount: "$1,350",
      status: "Currently Staying"
    }
  ]

  const quickActions = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "View Analytics",
      description: "Detailed performance reports"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Manage Calendar",
      description: "Block dates and availability"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Guest Messages",
      description: "Communicate with guests"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Financial Reports",
      description: "Monthly statements and payouts"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Property Settings",
      description: "Update property information"
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Notifications",
      description: "Alerts and updates"
    }
  ]

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Owner Portal Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your property management dashboard
            </p>
          </div>
          
          <Card className="mt-8">
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={loginData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Link to="/contact">
                    <Button variant="outline" className="w-full">
                      Contact Us to Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Need help? Contact our support team at{' '}
              <a href="tel:+13104000032" className="text-blue-600 hover:text-blue-500">
                +1 310-400-0032
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
              <p className="text-gray-600">Welcome back, Property Owner</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-gray-600'}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{booking.guest}</p>
                        <p className="text-sm text-gray-600">{booking.dates}</p>
                        <p className="text-sm text-gray-600">{booking.property}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{booking.amount}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'Check-in Today' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex-shrink-0 text-blue-600">
                        {action.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{action.title}</p>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Revenue Chart Placeholder */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Revenue Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Revenue chart would be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OwnerPortal

