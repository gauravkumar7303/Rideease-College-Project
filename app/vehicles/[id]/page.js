'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import {
  FaStar,
  FaMapMarkerAlt,
  FaGasPump,
  FaCogs,
  FaUserFriends,
  FaSnowflake,
  FaCalendarAlt,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaPhone,
  FaEnvelope,
  FaRupeeSign,
  FaCar,
  FaMotorcycle
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { vehicleAPI } from '@/Src/utils/api'
import { isAuthenticated, getCurrentUser } from '@/Src/utils/auth'
import BookingModal from '@/Src/components/BookingModal'

export default function VehicleDetailsPage({ params }) {
  const router = useRouter()
  // ✅ Unwrap params using React.use()
  const { id } = use(params)
  
  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (id) {
      fetchVehicleDetails(id)
    } else {
      console.error('❌ No vehicle ID provided')
      toast.error('Invalid vehicle ID')
      setLoading(false)
    }
  }, [id])

  const fetchVehicleDetails = async (vehicleId) => {
    try {
      setLoading(true)
      console.log('📦 Fetching vehicle:', vehicleId)
      const response = await vehicleAPI.getById(vehicleId)
      
      console.log('📥 API Response:', response)
      
      if (response.success) {
        setVehicle(response.vehicle)
        console.log('✅ Vehicle loaded:', response.vehicle)
      } else {
        toast.error(response.error || 'Vehicle not found')
      }
    } catch (error) {
      console.error('❌ Error fetching vehicle:', error)
      toast.error('Failed to load vehicle details')
    } finally {
      setLoading(false)
    }
  }

  const handleBookNow = () => {
    if (!isAuthenticated()) {
      toast.info('Please login to book a vehicle')
      router.push('/auth')
      return
    }
    setShowBookingModal(true)
  }

  // ✅ Add handleFavorite function
  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites')
  }

  // ✅ Add handleShare function
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  // ✅ Add getFeatureIcon function
  const getFeatureIcon = (feature) => {
    const featureLower = String(feature).toLowerCase()
    switch(featureLower) {
      case 'petrol':
      case 'diesel':
      case 'electric':
      case 'cng':
        return <FaGasPump className="text-gray-600" />
      case 'manual':
      case 'automatic':
        return <FaCogs className="text-gray-600" />
      case 'ac':
        return <FaSnowflake className="text-gray-600" />
      case '5 seater':
      case '7 seater':
        return <FaUserFriends className="text-gray-600" />
      default:
        return <FaCheckCircle className="text-green-500" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h1 className="text-2xl font-bold mb-2">Vehicle Not Found</h1>
          <p className="text-gray-600 mb-6">The vehicle you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="pt-20 pb-12">
        <div className="section-padding max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2">
              {/* Main Image */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
                <div className="aspect-[16/9] relative">
                  <img
                    src={vehicle.images?.[selectedImage]?.data || '/images/vehicle-placeholder.jpg'}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      vehicle.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {vehicle.isAvailable ? 'Available' : 'Booked'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={handleFavorite}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <FaHeart className={`${isFavorite ? 'text-red-500' : 'text-gray-400'}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <FaShare className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Thumbnail Images */}
              {vehicle.images?.length > 1 && (
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {vehicle.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-blue-600 shadow-md' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img.data}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Vehicle Details */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {vehicle.brand} {vehicle.model}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span>{vehicle.year}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-blue-600" />
                        {vehicle.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        {vehicle.rating || 'New'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      ₹{vehicle.pricePerDay}
                      <span className="text-sm text-gray-500 font-normal">/day</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Security deposit: ₹{vehicle.securityDeposit}
                    </div>
                  </div>
                </div>

                {/* Key Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Fuel Type</div>
                    <div className="font-semibold capitalize">{vehicle.fuelType || 'N/A'}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Transmission</div>
                    <div className="font-semibold capitalize">{vehicle.transmission || 'N/A'}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Seats</div>
                    <div className="font-semibold">{vehicle.seats || '2'}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Registration</div>
                    <div className="font-semibold">{vehicle.registrationNumber}</div>
                  </div>
                </div>

                {/* Description */}
                {vehicle.description && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Description</h2>
                    <p className="text-gray-600">{vehicle.description}</p>
                  </div>
                )}

                {/* Features */}
                {vehicle.features?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Features</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {vehicle.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          {getFeatureIcon(feature)}
                          <span className="text-sm capitalize">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Owner Info & Booking */}
            <div className="space-y-6">
              {/* Owner Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Owner Information</h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {vehicle.owner?.name?.charAt(0) || 'O'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{vehicle.owner?.name || 'Vehicle Owner'}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <FaStar className="text-yellow-400" />
                      <span>{vehicle.owner?.rating || '4.8'}</span>
                      <span>•</span>
                      <span>{vehicle.totalBookings || 0} trips</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaPhone className="text-blue-600" />
                    <span>{vehicle.owner?.phone || '+91 XXXXXXXX'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaEnvelope className="text-blue-600" />
                    <span>{vehicle.owner?.email || 'email@example.com'}</span>
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Pricing Details</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Rate</span>
                    <span className="font-semibold">₹{vehicle.pricePerDay}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="text-gray-600">Security Deposit</span>
                    <span className="font-semibold">₹{vehicle.securityDeposit}</span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  disabled={!vehicle.isAvailable}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
                    vehicle.isAvailable
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {vehicle.isAvailable ? 'Book Now' : 'Currently Unavailable'}
                </button>

                <div className="mt-4 text-sm text-gray-500 flex items-center gap-2 justify-center">
                  <FaShieldAlt className="text-green-500" />
                  <span>Free cancellation • Insured vehicle</span>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-3">Location</h2>
                <p className="text-gray-600 mb-2">{vehicle.address || vehicle.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        vehicle={vehicle}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </>
  )
}