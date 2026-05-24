'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaFilter } from 'react-icons/fa'

export default function SearchBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [vehicleType, setVehicleType] = useState('all')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery || location || date || vehicleType !== 'all') {
      let query = ''
      if (searchQuery) query += `q=${encodeURIComponent(searchQuery)}&`
      if (location) query += `location=${encodeURIComponent(location)}&`
      if (date) query += `date=${encodeURIComponent(date)}&`
      if (vehicleType !== 'all') query += `type=${vehicleType}&`
      
      router.push(`/search?${query.slice(0, -1)}`)
    }
  }

  const locations = [
    'Delhi - Connaught Place',
    'Delhi - Aerocity',
    'Gurugram - Cyber City',
    'Gurugram - Sector 29',
    'Noida - Sector 62',
    'Faridabad - Sector 21'
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Main Search */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vehicles by brand, model, or features..."
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-lg"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Location */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaMapMarkerAlt />
            </div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent appearance-none bg-white"
            >
              <option value="">Select Location</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaCalendarAlt />
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent"
            />
          </div>

          {/* Vehicle Type */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaFilter />
            </div>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Vehicles</option>
              <option value="bike">Bikes Only</option>
              <option value="car">Cars Only</option>
              <option value="car-with-driver">Car with Driver</option>
            </select>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setVehicleType('bike')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              vehicleType === 'bike' 
                ? 'bg-[--color-primary-600] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🏍️ Bikes
          </button>
          <button
            type="button"
            onClick={() => setVehicleType('car')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              vehicleType === 'car' 
                ? 'bg-[--color-primary-600] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🚗 Cars
          </button>
          <button
            type="button"
            onClick={() => setVehicleType('car-with-driver')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              vehicleType === 'car-with-driver' 
                ? 'bg-[--color-primary-600] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            👨‍✈️ With Driver
          </button>
          <button
            type="button"
            onClick={() => setLocation('Delhi - Connaught Place')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              location === 'Delhi - Connaught Place' 
                ? 'bg-[--color-primary-600] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📍 Delhi CP
          </button>
          <button
            type="button"
            onClick={() => setLocation('Gurugram - Cyber City')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              location === 'Gurugram - Cyber City' 
                ? 'bg-[--color-primary-600] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📍 Gurugram
          </button>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-[--color-primary-600] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[--color-primary-700] transition-colors flex items-center justify-center gap-3"
        >
          <FaSearch />
          Search Vehicles
        </button>
      </form>

      {/* Popular Searches */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Popular Searches:</h3>
        <div className="flex flex-wrap gap-2">
          {['Royal Enfield Classic 350', 'Hyundai Creta', 'With Driver', 'Under ₹1000', 'Near Me'].map((tag, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSearchQuery(tag)}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}