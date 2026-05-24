'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FaSearch, 
  FaStar, 
  FaCar, 
  FaMotorcycle,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaChevronRight,
  FaTag,
  FaHeadset,
  FaUserFriends,
  FaQuoteRight,
  FaApple,
  FaGooglePlay,
  FaCarSide,
  FaTruck,
  FaCouch,
  FaBolt,
  FaGasPump,
  FaCogs,
  FaTachometerAlt,
  FaCalendarAlt,
  FaGift,
  FaAward,
  FaTrophy,
  FaMedal
} from 'react-icons/fa'
import { isAuthenticated, getCurrentUser } from '@/Src/utils/auth'
import { vehicleAPI } from '@/Src/utils/api'

export default function HomePage() {
  const router = useRouter()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [user, setUser] = useState(null)
  const [currentImage, setCurrentImage] = useState(0)
  
  // Images array for transition
  const heroImages = [
    {
      id: 'car',
      url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920',
      alt: 'Luxury Car'
    },
    {
      id: 'bike',
      url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1920',
      alt: 'Motorcycle'
    },
    {
      id: 'sports',
      url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1920',
      alt: 'Sports Car'
    },
    {
      id: 'luxury-bike',
      url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1920',
      alt: 'Luxury Bike'
    }
  ]

  // Auto transition effect - changes image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change every 5 seconds
    
    return () => clearInterval(interval)
  }, [heroImages.length])

  // Premium Brands
  const premiumBrands = [
    { name: 'Mercedes-Benz', icon: 'MB' },
    { name: 'BMW', icon: 'BMW' },
    { name: 'Audi', icon: 'A' },
    { name: 'Porsche', icon: 'P' },
    { name: 'Lexus', icon: 'L' },
    { name: 'Jaguar', icon: 'J' }
  ]

  // Car Categories (Bikes bhi add kiya)
  const vehicleCategories = [
    { name: 'SUV', icon: <FaCar className="text-3xl" />, count: 24 },
    { name: 'Sedan', icon: <FaCarSide className="text-3xl" />, count: 18 },
    { name: 'Hatchback', icon: <FaCar className="text-3xl" />, count: 15 },
    { name: 'Electric', icon: <FaBolt className="text-3xl" />, count: 12 },
    { name: 'Sports Bike', icon: <FaMotorcycle className="text-3xl" />, count: 20 },
    { name: 'Cruiser', icon: <FaMotorcycle className="text-3xl" />, count: 15 }
  ]

  // Rental Offers
  const rentalOffers = [
    {
      id: 1,
      title: 'Weekend Special',
      description: '20% off on all bikes',
      discount: '20% OFF',
      validTill: 'March 31, 2024',
      icon: <FaMotorcycle className="text-4xl" />,
      color: 'from-emerald-500 to-emerald-700'
    },
    {
      id: 2,
      title: 'Long Term Rental',
      description: '30% off on monthly rentals',
      discount: '30% OFF',
      validTill: 'April 15, 2024',
      icon: <FaCalendarAlt className="text-4xl" />,
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 3,
      title: 'First Ride',
      description: 'Free upgrade for new users',
      discount: 'FREE UPGRADE',
      validTill: 'Limited time',
      icon: <FaGift className="text-4xl" />,
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: 4,
      title: 'Group Booking',
      description: '15% off on 2+ vehicles',
      discount: '15% OFF',
      validTill: 'May 1, 2024',
      icon: <FaUserFriends className="text-4xl" />,
      color: 'from-orange-500 to-orange-700'
    }
  ]

  // Awards & Achievements
  const awards = [
    {
      id: 1,
      title: 'Best Bike Rental Service 2024',
      organization: 'Auto India Awards',
      date: 'January 2024',
      icon: <FaTrophy className="text-4xl" />,
      color: 'text-yellow-500'
    },
    {
      id: 2,
      title: 'Customer Excellence Award',
      organization: 'Delhi NCR Business',
      date: 'December 2023',
      icon: <FaAward className="text-4xl" />,
      color: 'text-emerald-500'
    },
    {
      id: 3,
      title: 'Top Rated Mobility Platform',
      organization: 'Google Reviews 2023',
      date: 'November 2023',
      icon: <FaMedal className="text-4xl" />,
      color: 'text-blue-500'
    },
    {
      id: 4,
      title: 'Safe Ride Certification',
      organization: 'Road Safety Council',
      date: 'October 2023',
      icon: <FaShieldAlt className="text-4xl" />,
      color: 'text-purple-500'
    }
  ]

  // Mock vehicles (Cars & Bikes)
  const featuredVehicles = [
    // Cars
    {
      _id: '1',
      brand: 'Volkswagen',
      model: 'Golf GTD 2.0 TDI',
      pricePerDay: 498.25,
      rating: 4.96,
      reviews: 572,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=500',
      vehicleType: 'car',
      fuel: 'Diesel',
      transmission: 'Automatic',
      hp: '184 HP'
    },
    {
      _id: '2',
      brand: 'Audi',
      model: 'A3 1.6 TDI S line',
      pricePerDay: 498.25,
      rating: 4.96,
      reviews: 572,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=500',
      vehicleType: 'car',
      fuel: 'Diesel',
      transmission: 'Automatic',
      hp: '150 HP'
    },
    {
      _id: '3',
      brand: 'Mercedes-Benz',
      model: 'C220d',
      pricePerDay: 498.25,
      rating: 4.96,
      reviews: 572,
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=500',
      vehicleType: 'car',
      fuel: 'Diesel',
      transmission: 'Automatic',
      hp: '194 HP'
    },
    // Bikes
    {
      _id: '4',
      brand: 'Royal Enfield',
      model: 'Classic 350',
      pricePerDay: 99.99,
      rating: 4.95,
      reviews: 389,
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=500',
      vehicleType: 'bike',
      fuel: 'Petrol',
      transmission: 'Manual',
      hp: '20 HP'
    },
    {
      _id: '5',
      brand: 'KTM',
      model: 'Duke 390',
      pricePerDay: 129.99,
      rating: 4.92,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=500',
      vehicleType: 'bike',
      fuel: 'Petrol',
      transmission: 'Manual',
      hp: '43 HP'
    },
    {
      _id: '6',
      brand: 'Harley Davidson',
      model: 'Iron 883',
      pricePerDay: 299.99,
      rating: 4.98,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=500',
      vehicleType: 'bike',
      fuel: 'Petrol',
      transmission: 'Manual',
      hp: '50 HP'
    }
  ]

  // Upcoming Events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Summer Ride Festival',
      date: 'April 15-20, 2024',
      location: 'Delhi NCR',
      image: 'https://images.unsplash.com/photo-1603584173870-7c9b3d9a8b9c?auto=format&fit=crop&w=500',
      description: 'Special discounts on all bikes and cars',
      type: 'offer'
    },
    {
      id: 2,
      title: 'RideEase Award Ceremony',
      date: 'May 5, 2024',
      location: 'Gurugram',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=500',
      description: 'Celebrating our 10,000th customer milestone',
      type: 'award'
    },
    {
      id: 3,
      title: 'Monsoon Discounts',
      date: 'June - July 2024',
      location: 'All Locations',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=500',
      description: 'Up to 25% off on long term rentals',
      type: 'offer'
    }
  ]

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Software Engineer',
      comment: 'Best bike rental experience! The Royal Enfield was in perfect condition.',
      rating: 5,
      avatar: 'RS',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Priya Singh',
      role: 'Business Analyst',
      comment: 'Great selection of bikes and cars. The support team was very helpful.',
      rating: 5,
      avatar: 'PS',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Amit Verma',
      role: 'Marketing Manager',
      comment: 'Excellent service and competitive prices for both cars and bikes.',
      rating: 4,
      avatar: 'AV',
      image: 'https://randomuser.me/api/portraits/men/46.jpg'
    }
  ]

  // Fetch vehicles
  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      const response = await vehicleAPI.getAll({})
      if (response.success && response.vehicles.length > 0) {
        setVehicles(response.vehicles)
      } else {
        setVehicles(featuredVehicles)
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      setVehicles(featuredVehicles)
    } finally {
      setLoading(false)
    }
  }

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const auth = isAuthenticated()
      if (auth) {
        const currentUser = getCurrentUser()
        setUser(currentUser)
      } else {
        setUser(null)
      }
      setIsCheckingAuth(false)
    }
    checkAuth()
  }, [])

  const handleBookNow = (vehicleId) => {
    if (!isAuthenticated()) {
      router.push('/auth')
      return
    }
    router.push(`/vehicles/${vehicleId}`)
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar is separate component */}

      {/* Hero Section - With Auto Image Transition (No Buttons) */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 pt-40 pb-32 overflow-hidden">
        {/* Background Images with Auto Transition */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div 
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image.url} 
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80"></div>
        </div>
        
        {/* Image Indicators (Small Dots - No Click) */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImage ? 'bg-emerald-500 w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        
        <div className="section-padding max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              Rent <span className="text-emerald-400">Cars & Bikes</span>
            </h1>
            
            <p className="text-2xl text-gray-300 mb-12 max-w-3xl">
              Find your perfect ride from our extensive collection of premium vehicles. 
              Choose from thousands of cars, bikes, and luxury vehicles.
            </p>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Vehicle Type</label>
                  <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>All Vehicles</option>
                    <option>Cars</option>
                    <option>Bikes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Brand</label>
                  <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>All Brands</option>
                    <option>Mercedes-Benz</option>
                    <option>BMW</option>
                    <option>Audi</option>
                    <option>Royal Enfield</option>
                    <option>KTM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Model</label>
                  <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>All Models</option>
                    <option>C-Class</option>
                    <option>3 Series</option>
                    <option>Classic 350</option>
                    <option>Duke 390</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Price Range</label>
                  <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>All Prices</option>
                    <option>$0 - $100</option>
                    <option>$100 - $300</option>
                    <option>$300 - $500</option>
                    <option>$500+</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2">
                    <FaSearch className="text-lg" />
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Sign up prompt */}
            {!user && (
              <div className="mt-10 flex items-center gap-6">
                <span className="text-xl text-gray-300">New to RideEase?</span>
                <button 
                  onClick={() => router.push('/auth')}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Create an account
                </button>
                <span className="text-gray-400">or</span>
                <button 
                  onClick={() => router.push('/auth')}
                  className="text-white hover:text-emerald-300 transition-colors font-medium"
                >
                  Sign in
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Premium Brands Row */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="section-padding max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Premium Brands</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {premiumBrands.map((brand, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-emerald-600">{brand.icon}</span>
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-emerald-600 transition-colors">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Most Searched Vehicles */}
      <section className="py-16 bg-gray-50">
        <div className="section-padding max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Most Searched Vehicles</h2>
          <p className="text-xl text-gray-600 text-center mb-12">The world's leading car & bike brands</p>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(vehicles.length > 0 ? vehicles : featuredVehicles).slice(0, 6).map((vehicle) => (
                <div 
                  key={vehicle._id} 
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                >
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={vehicle.image} 
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vehicle.vehicleType === 'car' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {vehicle.vehicleType === 'car' ? '🚗 Car' : '🏍️ Bike'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    
                    <div className="flex items-center gap-4 mb-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <FaGasPump className="text-emerald-600" />
                        <span className="text-sm">{vehicle.fuel}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCogs className="text-emerald-600" />
                        <span className="text-sm">{vehicle.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaTachometerAlt className="text-emerald-600" />
                        <span className="text-sm">{vehicle.hp}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500">Starting from</span>
                        <span className="text-2xl font-bold text-emerald-600 ml-2">
                          ${vehicle.pricePerDay}
                          <span className="text-sm font-normal text-gray-500">/day</span>
                        </span>
                      </div>
                      <button 
                        onClick={() => handleBookNow(vehicle._id)}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Browse by Type */}
      <section className="py-16 bg-white">
        <div className="section-padding max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Browse by Type</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Find your perfect vehicle category</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {vehicleCategories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 group"
              >
                <div className="text-emerald-600 mb-3 flex justify-center group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                <p className="text-gray-500 text-sm">{category.count} vehicles</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Offers Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
        <div className="section-padding max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Special Rental Offers</h2>
          <p className="text-xl text-center text-emerald-100 mb-12">Exclusive deals on bikes & cars</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rentalOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${offer.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  {offer.icon}
                </div>
                <div className="inline-block px-3 py-1 bg-emerald-500 rounded-full text-sm font-bold mb-3">
                  {offer.discount}
                </div>
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-emerald-100 mb-3">{offer.description}</p>
                <p className="text-sm text-emerald-200">Valid till: {offer.validTill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Achievements Section */}
      <section className="py-16 bg-white">
        <div className="section-padding max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Our Achievements</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Recognition for excellence in service</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award) => (
              <div
                key={award.id}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center group"
              >
                <div className={`${award.color} mb-4 flex justify-center group-hover:scale-110 transition-transform`}>
                  {award.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{award.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{award.organization}</p>
                <p className="text-emerald-600 font-medium text-sm">{award.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="section-padding max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Real reviews from real customers</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-gray-600">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events & Awards */}
      <section className="py-16 bg-white">
        <div className="section-padding max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Upcoming Events & Awards</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Stay updated with latest offers and achievements</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.type === 'offer' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.type === 'offer' ? '🎁 Offer' : '🏆 Award'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="flex items-center gap-4 mb-3 text-gray-600 text-sm">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-emerald-600" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-emerald-600" />
                      {event.location}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <button className="text-emerald-600 font-medium hover:underline flex items-center gap-1">
                    Learn More
                    <FaChevronRight className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}