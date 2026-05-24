'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  FaFilter, 
  FaTimes, 
  FaMotorcycle, 
  FaStar, 
  FaMapMarkerAlt,
  FaGasPump,
  FaCogs,
  FaTachometerAlt,
  FaCheckCircle,
  FaChevronDown,
  FaSearch,
  FaChevronRight,
  FaGift,
  FaShieldAlt,
  FaClock
} from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

export default function BikesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [bikes, setBikes] = useState([])
  const [filteredBikes, setFilteredBikes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(0)
  const locations = ['Delhi NCR', 'Gurugram', 'Noida', 'Faridabad']
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
    rating: true,
    features: true
  })
  const [filters, setFilters] = useState({
    brand: [],
    priceRange: [],
    rating: null,
    features: []
  })

  // Auto transition for location
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation((prev) => (prev + 1) % locations.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Enhanced bike data with more details
    const bikeData = [
      {
        id: 1,
        type: 'bike',
        brand: 'Royal Enfield',
        model: 'Classic 350',
        price: 800,
        location: 'Delhi, CP',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=500',
        features: ['350cc', 'Petrol', 'Cruiser', 'ABS'],
        available: true,
        verified: true,
        delivery: 'Free',
        fuel: 'Petrol',
        transmission: 'Manual',
        hp: '20 HP',
        reviews: 245,
        discount: '15% off',
        insurance: 'Included'
      },
      {
        id: 2,
        type: 'bike',
        brand: 'KTM',
        model: 'Duke 390',
        price: 1200,
        location: 'Gurugram, Cyber City',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=500',
        features: ['390cc', 'Petrol', 'Sports', 'ABS'],
        available: true,
        verified: true,
        delivery: 'Free',
        fuel: 'Petrol',
        transmission: 'Manual',
        hp: '43 HP',
        reviews: 389,
        discount: '10% off',
        insurance: 'Included'
      },
      {
        id: 3,
        type: 'bike',
        brand: 'Honda',
        model: 'Activa 125',
        price: 500,
        location: 'Delhi, Rohini',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=500',
        features: ['125cc', 'Petrol', 'Scooter'],
        available: true,
        verified: true,
        delivery: '₹50',
        fuel: 'Petrol',
        transmission: 'CVT',
        hp: '8 HP',
        reviews: 567,
        discount: '20% off',
        insurance: 'Included'
      },
      {
        id: 4,
        type: 'bike',
        brand: 'Yamaha',
        model: 'R15 V4',
        price: 1100,
        location: 'Gurugram, Sector 29',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1599744357807-5d5d6005d8c3?auto=format&fit=crop&w=500',
        features: ['155cc', 'Petrol', 'Sports', 'Slipper Clutch'],
        available: true,
        verified: true,
        delivery: 'Free',
        fuel: 'Petrol',
        transmission: 'Manual',
        hp: '18 HP',
        reviews: 312,
        discount: '5% off',
        insurance: 'Included'
      },
      {
        id: 5,
        type: 'bike',
        brand: 'Bajaj',
        model: 'Pulsar NS200',
        price: 900,
        location: 'Delhi, Dwarka',
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1606297051491-e6b4b6e8e9d0?auto=format&fit=crop&w=500',
        features: ['200cc', 'Petrol', 'Street', 'ABS'],
        available: true,
        verified: true,
        delivery: 'Free',
        fuel: 'Petrol',
        transmission: 'Manual',
        hp: '24 HP',
        reviews: 198,
        discount: '12% off',
        insurance: 'Included'
      },
      {
        id: 6,
        type: 'bike',
        brand: 'TVS',
        model: 'Apache RR 310',
        price: 1500,
        location: 'Gurugram, Golf Course Road',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1591633210435-6c6d8b5c6d5e?auto=format&fit=crop&w=500',
        features: ['310cc', 'Petrol', 'Sports', 'Race Tuned'],
        available: true,
        verified: true,
        delivery: 'Free',
        fuel: 'Petrol',
        transmission: 'Manual',
        hp: '34 HP',
        reviews: 156,
        discount: '8% off',
        insurance: 'Included'
      },
      {
        id: 7,
        type: 'bike',
        brand: 'Suzuki',
        model: 'Gixxer SF 250',
        price: 1300,
        location: 'Delhi, Saket',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1606297051491-e6b4b6e8e9d0?auto=format&fit=crop&w=500',
        features: ['250cc', 'Petrol', 'Sports', 'Oil Cooled'],
        available: true,
        verified: true,
        delivery: 'Free',
        fuel: 'Petrol',
        transmission: 'Manual',
        hp: '26 HP',
        reviews: 134,
        discount: '10% off',
        insurance: 'Included'
      },
      {
        id: 8,
        type: 'bike',
        brand: 'Kawasaki',
        model: 'Ninja 300',
        price: 2200,
        location: 'Gurugram, Cyber City',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=500',
        features: ['300cc', 'Petrol', 'Sports', 'ABS'],
        available: true,
        verified: true,
        delivery: 'Free',
        fuel: 'Petrol',
        transmission: 'Manual',
        hp: '39 HP',
        reviews: 89,
        discount: '5% off',
        insurance: 'Included'
      }
    ]
    
    setBikes(bikeData)
    setFilteredBikes(bikeData)
    setLoading(false)

    const brand = searchParams.get('brand')
    if (brand) {
      setFilters(prev => ({ ...prev, brand: [brand] }))
    }
  }, [searchParams])

  useEffect(() => {
    applyFilters()
  }, [filters])

  const applyFilters = () => {
    let result = [...bikes]

    if (filters.brand.length > 0) {
      result = result.filter(bike => filters.brand.includes(bike.brand))
    }

    if (filters.priceRange.length > 0) {
      result = result.filter(bike => {
        return filters.priceRange.some(range => 
          bike.price >= range.min && bike.price <= range.max
        )
      })
    }

    if (filters.rating) {
      result = result.filter(bike => bike.rating >= filters.rating)
    }

    if (filters.features.length > 0) {
      result = result.filter(bike => {
        return filters.features.every(feature => {
          if (feature === 'free_delivery') return bike.delivery === 'Free'
          if (feature === 'verified') return bike.verified
          if (feature === 'abs') return bike.features.includes('ABS')
          return true
        })
      })
    }

    setFilteredBikes(result)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'brand' || filterType === 'features' || filterType === 'priceRange') {
        const current = prev[filterType]
        const exists = current.find(item => 
          typeof item === 'object' ? item.min === value.min : item === value
        )
        
        if (exists) {
          return {
            ...prev,
            [filterType]: current.filter(item => 
              typeof item === 'object' ? item.min !== value.min : item !== value
            )
          }
        } else {
          return {
            ...prev,
            [filterType]: [...current, value]
          }
        }
      } else {
        return {
          ...prev,
          [filterType]: prev[filterType] === value ? null : value
        }
      }
    })
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const clearFilters = () => {
    setFilters({
      brand: [],
      priceRange: [],
      rating: null,
      features: []
    })
  }

  const handleBookNow = (bikeId) => {
    // Check if user is logged in (you can add your auth logic here)
    router.push(`/booking?vehicle=${bikeId}`)
  }

  const activeFiltersCount = Object.values(filters).reduce((count, filter) => {
    if (Array.isArray(filter)) {
      return count + filter.length
    }
    return count + (filter ? 1 : 0)
  }, 0)

  const BRANDS = {
    bikes: [
      'Royal Enfield', 'KTM', 'Honda', 'Yamaha', 'Bajaj', 
      'TVS', 'Hero', 'Suzuki', 'Kawasaki', 'BMW'
    ]
  }

  const FILTER_OPTIONS = {
    priceRanges: [
      { label: 'Under ₹500', min: 0, max: 500 },
      { label: '₹500 - ₹1000', min: 500, max: 1000 },
      { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
      { label: '₹2000 - ₹3000', min: 2000, max: 3000 },
      { label: 'Above ₹3000', min: 3000, max: 10000 }
    ],
    ratings: [
      { label: '4.5 & above', value: 4.5 },
      { label: '4.0 & above', value: 4.0 },
      { label: '3.5 & above', value: 3.5 }
    ],
    features: [
      { label: 'Free Delivery', value: 'free_delivery' },
      { label: 'Company Verified', value: 'verified' },
      { label: 'ABS', value: 'abs' },
      { label: 'Insurance Included', value: 'insurance' }
    ]
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar is separate component */}

      {/* Hero Section with Location Transition */}
      <section className="relative bg-gradient-to-br from-emerald-900 to-emerald-800 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1920" 
            alt="Bikes Hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="section-padding max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Rent Bikes in{' '}
              <span className="relative inline-block min-w-[200px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentLocation}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-0 text-emerald-300 whitespace-nowrap"
                  >
                    {locations[currentLocation]}
                  </motion.span>
                </AnimatePresence>
                {/* Invisible placeholder to maintain width */}
                <span className="opacity-0">{locations[currentLocation]}</span>
              </span>
            </h1>
            
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Choose from 100+ verified bikes with damage protection and free delivery
            </p>

            {/* Location Indicators */}
            <div className="flex justify-center gap-2 mb-6">
              {locations.map((location, index) => (
                <button
                  key={location}
                  onClick={() => setCurrentLocation(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentLocation 
                      ? 'bg-emerald-400 w-4' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-300" />
                  <input
                    type="text"
                    placeholder="Search by bike name or brand..."
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <select className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option className="text-gray-900">All Locations</option>
                  {locations.map(loc => (
                    <option key={loc} className="text-gray-900">{loc}</option>
                  ))}
                </select>
                <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                  Search
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span className="text-emerald-100">4.8/5 (2.5k+ reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-emerald-300" />
                <span className="text-emerald-100">50+ locations</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-emerald-300" />
                <span className="text-emerald-100">100% verified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="section-padding max-w-7xl mx-auto">
          {/* Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <FaFilter />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="bg-white text-emerald-600 px-2 py-0.5 rounded-full text-sm font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                <span className="text-gray-600">
                  <span className="font-semibold text-gray-900">{filteredBikes.length}</span> bikes available
                </span>
              </div>
              
              <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {filters.brand.map(brand => (
                <span key={brand} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                  {brand}
                  <button
                    onClick={() => handleFilterChange('brand', brand)}
                    className="ml-2 hover:text-emerald-900"
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.priceRange.map(range => (
                <span key={range.label} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                  {range.label}
                  <button
                    onClick={() => handleFilterChange('priceRange', range)}
                    className="ml-2 hover:text-emerald-900"
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.rating && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                  {filters.rating}+ Rating
                  <button
                    onClick={() => handleFilterChange('rating', filters.rating)}
                    className="ml-2 hover:text-emerald-900"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium ml-2"
              >
                Clear all
              </button>
            </motion.div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block lg:w-80">
              <div className="sticky top-28 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  >
                    Clear all
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Price Range */}
                  <div className="border-b border-gray-100 pb-6">
                    <button
                      onClick={() => toggleSection('price')}
                      className="w-full flex justify-between items-center mb-3"
                    >
                      <h4 className="font-semibold text-lg">Price Range</h4>
                      <FaChevronDown className={`transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.price && (
                      <div className="space-y-2 mt-3">
                        {FILTER_OPTIONS.priceRanges.map((range) => (
                          <label key={range.label} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <input
                              type="checkbox"
                              checked={filters.priceRange.some(r => r.label === range.label)}
                              onChange={() => handleFilterChange('priceRange', range)}
                              className="w-4 h-4 text-emerald-600 rounded"
                            />
                            <span className="text-gray-700">{range.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Brand */}
                  <div className="border-b border-gray-100 pb-6">
                    <button
                      onClick={() => toggleSection('brand')}
                      className="w-full flex justify-between items-center mb-3"
                    >
                      <h4 className="font-semibold text-lg">Brand</h4>
                      <FaChevronDown className={`transition-transform ${expandedSections.brand ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.brand && (
                      <div className="space-y-2 mt-3 max-h-60 overflow-y-auto">
                        {BRANDS.bikes.map((brand) => (
                          <label key={brand} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <input
                              type="checkbox"
                              checked={filters.brand.includes(brand)}
                              onChange={() => handleFilterChange('brand', brand)}
                              className="w-4 h-4 text-emerald-600 rounded"
                            />
                            <span className="text-gray-700">{brand}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="border-b border-gray-100 pb-6">
                    <button
                      onClick={() => toggleSection('rating')}
                      className="w-full flex justify-between items-center mb-3"
                    >
                      <h4 className="font-semibold text-lg">Rating</h4>
                      <FaChevronDown className={`transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.rating && (
                      <div className="space-y-2 mt-3">
                        {FILTER_OPTIONS.ratings.map((rating) => (
                          <label key={rating.label} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <input
                              type="radio"
                              name="rating"
                              checked={filters.rating === rating.value}
                              onChange={() => handleFilterChange('rating', rating.value)}
                              className="w-4 h-4 text-emerald-600"
                            />
                            <span className="flex items-center text-gray-700">
                              <FaStar className="text-yellow-400 mr-1" />
                              {rating.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="border-b border-gray-100 pb-6">
                    <button
                      onClick={() => toggleSection('features')}
                      className="w-full flex justify-between items-center mb-3"
                    >
                      <h4 className="font-semibold text-lg">Features</h4>
                      <FaChevronDown className={`transition-transform ${expandedSections.features ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.features && (
                      <div className="space-y-2 mt-3">
                        {FILTER_OPTIONS.features.map((feature) => (
                          <label key={feature.label} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <input
                              type="checkbox"
                              checked={filters.features.includes(feature.value)}
                              onChange={() => handleFilterChange('features', feature.value)}
                              className="w-4 h-4 text-emerald-600 rounded"
                            />
                            <span className="text-gray-700">{feature.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={clearFilters}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters Modal */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/50 lg:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  <motion.div
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    exit={{ x: -300 }}
                    className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-6 h-full overflow-y-auto">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold">Filters</h3>
                        <button
                          onClick={() => setShowFilters(false)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      
                      {/* Mobile Filter Content */}
                      <div className="space-y-6">
                        {/* Price Range */}
                        <div className="border-b border-gray-100 pb-6">
                          <button
                            onClick={() => toggleSection('price')}
                            className="w-full flex justify-between items-center mb-3"
                          >
                            <h4 className="font-semibold text-lg">Price Range</h4>
                            <FaChevronDown className={`transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
                          </button>
                          {expandedSections.price && (
                            <div className="space-y-2 mt-3">
                              {FILTER_OPTIONS.priceRanges.map((range) => (
                                <label key={range.label} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                                  <input
                                    type="checkbox"
                                    checked={filters.priceRange.some(r => r.label === range.label)}
                                    onChange={() => handleFilterChange('priceRange', range)}
                                    className="w-4 h-4 text-emerald-600 rounded"
                                  />
                                  <span>{range.label}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Brand */}
                        <div className="border-b border-gray-100 pb-6">
                          <button
                            onClick={() => toggleSection('brand')}
                            className="w-full flex justify-between items-center mb-3"
                          >
                            <h4 className="font-semibold text-lg">Brand</h4>
                            <FaChevronDown className={`transition-transform ${expandedSections.brand ? 'rotate-180' : ''}`} />
                          </button>
                          {expandedSections.brand && (
                            <div className="space-y-2 mt-3">
                              {BRANDS.bikes.map((brand) => (
                                <label key={brand} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                                  <input
                                    type="checkbox"
                                    checked={filters.brand.includes(brand)}
                                    onChange={() => handleFilterChange('brand', brand)}
                                    className="w-4 h-4 text-emerald-600 rounded"
                                  />
                                  <span>{brand}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="border-b border-gray-100 pb-6">
                          <button
                            onClick={() => toggleSection('rating')}
                            className="w-full flex justify-between items-center mb-3"
                          >
                            <h4 className="font-semibold text-lg">Rating</h4>
                            <FaChevronDown className={`transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`} />
                          </button>
                          {expandedSections.rating && (
                            <div className="space-y-2 mt-3">
                              {FILTER_OPTIONS.ratings.map((rating) => (
                                <label key={rating.label} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                                  <input
                                    type="radio"
                                    name="rating-mobile"
                                    checked={filters.rating === rating.value}
                                    onChange={() => handleFilterChange('rating', rating.value)}
                                    className="w-4 h-4 text-emerald-600"
                                  />
                                  <span className="flex items-center">
                                    <FaStar className="text-yellow-400 mr-1" />
                                    {rating.label}
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Features */}
                        <div className="border-b border-gray-100 pb-6">
                          <button
                            onClick={() => toggleSection('features')}
                            className="w-full flex justify-between items-center mb-3"
                          >
                            <h4 className="font-semibold text-lg">Features</h4>
                            <FaChevronDown className={`transition-transform ${expandedSections.features ? 'rotate-180' : ''}`} />
                          </button>
                          {expandedSections.features && (
                            <div className="space-y-2 mt-3">
                              {FILTER_OPTIONS.features.map((feature) => (
                                <label key={feature.label} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                                  <input
                                    type="checkbox"
                                    checked={filters.features.includes(feature.value)}
                                    onChange={() => handleFilterChange('features', feature.value)}
                                    className="w-4 h-4 text-emerald-600 rounded"
                                  />
                                  <span>{feature.label}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={clearFilters}
                          className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bikes Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : filteredBikes.length > 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredBikes.map((bike, index) => (
                    <motion.div
                      key={bike.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={bike.image} 
                          alt={`${bike.brand} ${bike.model}`}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                            🏍️ BIKE
                          </span>
                          {bike.discount && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                              {bike.discount}
                            </span>
                          )}
                        </div>
                        {bike.verified && (
                          <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            ✓ Verified
                          </div>
                        )}
                      </div>
                      
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {bike.brand} {bike.model}
                          </h3>
                          <div className="flex items-center">
                            <FaStar className="text-yellow-400 text-sm mr-1" />
                            <span className="font-semibold">{bike.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <FaMapMarkerAlt className="text-emerald-500 text-sm" />
                          <span className="text-sm text-gray-600">{bike.location}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-xs text-gray-500">{bike.reviews} reviews</span>
                        </div>

                        {/* Specs */}
                        <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <FaGasPump className="text-emerald-500" />
                            <span>{bike.fuel}</span>
                          </div>
                          <div className="w-px h-4 bg-gray-200"></div>
                          <div className="flex items-center gap-1">
                            <FaCogs className="text-emerald-500" />
                            <span>{bike.transmission}</span>
                          </div>
                          <div className="w-px h-4 bg-gray-200"></div>
                          <div className="flex items-center gap-1">
                            <FaTachometerAlt className="text-emerald-500" />
                            <span>{bike.hp}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-2xl font-bold text-emerald-600">
                              ₹{bike.price}
                              <span className="text-sm text-gray-500 font-normal ml-1">/day</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                              <FaCheckCircle className="text-emerald-500" />
                              {bike.delivery}
                            </div>
                          </div>
                          <button 
                            onClick={() => handleBookNow(bike.id)}
                            className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaMotorcycle className="text-gray-400 text-4xl" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">No bikes found</h3>
                  <p className="text-gray-600 mb-6">Try changing your filters or search criteria</p>
                  <button
                    onClick={clearFilters}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-800">
        <div className="section-padding max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Special Bike Offers</h2>
          <p className="text-emerald-100 mb-8">Exclusive deals on your favorite bikes</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <FaGift className="text-4xl text-emerald-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Weekend Special</h3>
              <p className="text-emerald-100">20% off on all bikes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <FaClock className="text-4xl text-emerald-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Long Term Rental</h3>
              <p className="text-emerald-100">30% off on monthly rentals</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <FaShieldAlt className="text-4xl text-emerald-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Free Insurance</h3>
              <p className="text-emerald-100">On all first bookings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Quick Links */}
      <section className="py-12 bg-white">
        <div className="section-padding max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Popular Bike Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {BRANDS.bikes.map(brand => (
              <button
                key={brand}
                onClick={() => {
                  handleFilterChange('brand', brand)
                  if (window.innerWidth < 1024) {
                    setShowFilters(false)
                  }
                }}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  filters.brand.includes(brand)
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{brand}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}