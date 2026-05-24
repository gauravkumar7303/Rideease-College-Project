'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUser, 
  FaCreditCard, 
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaCar,
  FaMotorcycle,
  FaShieldAlt,
  FaClock,
  FaMobileAlt,
  FaIdCard,
  FaEnvelope,
  FaPhone,
  FaGooglePay,
  FaCreditCard as FaCard,
  FaUniversity,
  FaMapPin,
  FaLocationArrow,
  FaKey,
  FaUserShield,
  FaCarSide
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'

// Dynamic import for Google Maps to avoid SSR issues
const MapComponent = dynamic(() => import('@/Src/components/MapComponent'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
})

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [showMap, setShowMap] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const [bookingData, setBookingData] = useState({
    vehicleId: null,
    vehicleType: '',
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    returnLocation: '',
    pickupAddress: '',
    returnAddress: '',
    withDriver: false,
    rentalType: 'self', // 'self' or 'withDriver'
    driverHours: 8,
    driverLanguage: 'hindi',
    paymentMethod: 'upi',
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    personalDetails: {
      name: '',
      email: '',
      phone: '',
      licenseNumber: '',
      address: '',
      emergencyContact: ''
    }
  })

  useEffect(() => {
    const vehicleId = searchParams.get('vehicle')
    if (vehicleId) {
      setBookingData(prev => ({
        ...prev,
        vehicleId,
        vehicleType: parseInt(vehicleId) > 4 ? 'car' : 'bike'
      }))
    }
    
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.log('Error getting location:', error)
          toast.error('Unable to get your location. Please enable location services.')
        }
      )
    }
  }, [searchParams])

  const steps = [
    { number: 1, title: 'Dates & Location', icon: <FaCalendarAlt />, shortTitle: 'Location' },
    { number: 2, title: 'Rental Type', icon: <FaCarSide />, shortTitle: 'Type' },
    { number: 3, title: 'Personal Details', icon: <FaIdCard />, shortTitle: 'Details' },
    { number: 4, title: 'Payment', icon: <FaCreditCard />, shortTitle: 'Payment' },
    { number: 5, title: 'Confirmation', icon: <FaCheckCircle />, shortTitle: 'Confirm' }
  ]

  const vehicleDetails = {
    name: 'Hyundai Creta SX',
    type: 'car',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=500',
    features: ['Automatic', 'Petrol', '5 Seater', 'AC']
  }

  const handleNext = async () => {
    if (!await validateCurrentStep()) return
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
      
      // Scroll to top on step change
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const validateCurrentStep = async () => {
    switch(currentStep) {
      case 1:
        if (!bookingData.pickupDate || !bookingData.returnDate) {
          toast.error('Please select pickup and return dates')
          return false
        }
        if (new Date(bookingData.pickupDate) > new Date(bookingData.returnDate)) {
          toast.error('Return date must be after pickup date')
          return false
        }
        if (!bookingData.pickupLocation) {
          toast.error('Please select pickup location')
          return false
        }
        return true
      
      case 2:
        if (!bookingData.rentalType) {
          toast.error('Please select rental type')
          return false
        }
        if (bookingData.rentalType === 'withDriver' && !bookingData.withDriver) {
          toast.error('Please confirm driver selection')
          return false
        }
        return true
      
      case 3:
        const { name, email, phone, licenseNumber } = bookingData.personalDetails
        if (!name || !email || !phone || !licenseNumber) {
          toast.error('Please fill all required personal details')
          return false
        }
        if (!/^\d{10}$/.test(phone)) {
          toast.error('Please enter a valid 10-digit phone number')
          return false
        }
        if (!validateEmail(email)) {
          toast.error('Please enter a valid email address')
          return false
        }
        return true
      
      case 4:
        if (bookingData.paymentMethod === 'upi' && !bookingData.upiId) {
          toast.error('Please enter UPI ID')
          return false
        }
        if (bookingData.paymentMethod === 'card') {
          if (!bookingData.cardNumber || !bookingData.cardExpiry || !bookingData.cardCvv) {
            toast.error('Please fill all card details')
            return false
          }
          if (!validateCardNumber(bookingData.cardNumber)) {
            toast.error('Please enter a valid card number')
            return false
          }
        }
        return true
      
      default:
        return true
    }
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateCardNumber = (number) => {
    return /^\d{16}$/.test(number.replace(/\s/g, ''))
  }

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePersonalDetailsChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [field]: value
      }
    }))
  }

  const handleLocationSelect = (location, address, type = 'pickup') => {
    if (type === 'pickup') {
      handleInputChange('pickupLocation', location)
      handleInputChange('pickupAddress', address)
    } else {
      handleInputChange('returnLocation', location)
      handleInputChange('returnAddress', address)
    }
    setShowMap(false)
    toast.success(`${type === 'pickup' ? 'Pickup' : 'Return'} location selected`)
  }

  const calculateTotal = () => {
    const basePrice = vehicleDetails.price
    const days = bookingData.returnDate && bookingData.pickupDate ? 
      Math.ceil((new Date(bookingData.returnDate) - new Date(bookingData.pickupDate)) / (1000 * 60 * 60 * 24)) : 1
    
    const driverCharge = bookingData.rentalType === 'withDriver' ? 500 * days : 0
    const insurance = 200 * days
    const serviceFee = 100
    const deliveryCharge = bookingData.pickupAddress ? 150 : 0
    
    return {
      base: basePrice * days,
      driver: driverCharge,
      insurance,
      serviceFee,
      deliveryCharge,
      total: (basePrice * days) + driverCharge + insurance + serviceFee + deliveryCharge,
      days
    }
  }

  const handleConfirmBooking = async () => {
    if (!await validateCurrentStep()) return
    
    setIsLoading(true)
    
    try {
      // In real app, this would be an API call
      const bookingId = `RE${Date.now().toString().slice(-8)}`
      
      // Save booking to localStorage (temporary)
      const bookings = JSON.parse(localStorage.getItem('rideease_bookings') || '[]')
      const newBooking = {
        id: bookingId,
        ...bookingData,
        vehicle: vehicleDetails,
        total: total.total,
        status: 'confirmed',
        bookingDate: new Date().toISOString(),
        assignedDriver: bookingData.rentalType === 'withDriver' ? {
          name: 'Rajesh Kumar',
          phone: '+91 9876543210',
          rating: 4.8,
          experience: '5 years'
        } : null
      }
      bookings.push(newBooking)
      localStorage.setItem('rideease_bookings', JSON.stringify(bookings))
      
      toast.success(`Booking confirmed! ID: ${bookingId}`)
      
      setTimeout(() => {
        router.push(`/profile?booking=${bookingId}`)
      }, 2000)
      
    } catch (error) {
      toast.error('Failed to confirm booking. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const total = calculateTotal()

  return (
    <div className="pt-20 pb-12 md:pt-24 md:pb-16">
      <div className="section-padding max-w-4xl mx-auto px-4">
        {/* Steps Indicator */}
        <div className="mb-8 md:mb-10">
          <div className="flex justify-between items-center relative">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center relative z-10 flex-1">
                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 md:mb-3 transition-all ${
                  step.number === currentStep 
                    ? 'bg-[--color-primary-600] text-white shadow-lg' 
                    : step.number < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.number < currentStep ? <FaCheckCircle className="text-xs md:text-base" /> : 
                   <span className="text-xs md:text-base">{step.icon}</span>}
                </div>
                <span className={`text-xs md:text-sm font-medium text-center px-1 ${
                  step.number === currentStep 
                    ? 'text-[--color-primary-600] font-semibold' 
                    : step.number < currentStep 
                    ? 'text-green-600' 
                    : 'text-gray-500'
                }`}>
                  <span className="hidden md:inline">{step.title}</span>
                  <span className="md:hidden">{step.shortTitle}</span>
                </span>
              </div>
            ))}
            <div className="absolute top-4 md:top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
          </div>
        </div>

        {/* Vehicle Summary Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
            <img 
              src={vehicleDetails.image} 
              alt={vehicleDetails.name}
              className="w-full sm:w-32 h-40 sm:h-24 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">{vehicleDetails.name}</h3>
                  <div className="flex flex-wrap gap-1 md:gap-2 mt-2">
                    {vehicleDetails.features.map((feature, index) => (
                      <span key={index} className="px-2 md:px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm border border-gray-200">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-xl md:text-2xl font-bold text-[--color-primary-600]">
                  ₹{vehicleDetails.price}<span className="text-xs md:text-sm text-gray-500 font-normal">/day</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaShieldAlt className="text-green-500" />
                  <span>Free cancellation • Full insurance included</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-8 mb-6 md:mb-8 border border-gray-100">
          
          {/* Step 1: Dates & Location */}
          {currentStep === 1 && (
            <>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 flex items-center gap-3">
                <FaCalendarAlt className="text-[--color-primary-600]" />
                Select Dates & Location
              </h2>
              
              {/* Dates Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={bookingData.pickupDate}
                    onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                  {bookingData.pickupAddress && (
                    <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-100">
                      <div className="flex items-start gap-2">
                        <FaMapPin className="text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-blue-700">{bookingData.pickupAddress}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={bookingData.returnDate}
                    onChange={(e) => handleInputChange('returnDate', e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                    min={bookingData.pickupDate || new Date().toISOString().slice(0, 16)}
                  />
                  {bookingData.returnAddress && (
                    <div className="mt-2 p-2 bg-green-50 rounded border border-green-100">
                      <div className="flex items-start gap-2">
                        <FaMapPin className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-green-700">{bookingData.returnAddress}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Location Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">Select Locations</h3>
                    <button
                      type="button"
                      onClick={() => setShowMap(!showMap)}
                      className="flex items-center gap-2 text-sm text-[--color-primary-600] hover:text-[--color-primary-700]"
                    >
                      <FaMapMarkerAlt />
                      {showMap ? 'Hide Map' : 'Use Map'}
                    </button>
                  </div>
                  
                  {showMap ? (
                    <div className="mb-4">
                      <div className="h-64 md:h-96 rounded-lg overflow-hidden border border-gray-300">
                        <MapComponent
                          onLocationSelect={handleLocationSelect}
                          userLocation={userLocation}
                          pickupLocation={bookingData.pickupLocation}
                          returnLocation={bookingData.returnLocation}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Click on the map to select pickup or return location
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pickup Location *
                        </label>
                        <select
                          value={bookingData.pickupLocation}
                          onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                          className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                        >
                          <option value="">Select pickup location</option>
                          <option value="delhi-cp">Delhi - Connaught Place</option>
                          <option value="delhi-aerocity">Delhi - Aerocity</option>
                          <option value="gurugram-cybercity">Gurugram - Cyber City</option>
                          <option value="gurugram-sector29">Gurugram - Sector 29</option>
                          <option value="noida-sector62">Noida - Sector 62</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => setShowMap(true)}
                          className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <FaLocationArrow className="text-xs" />
                          Use current location
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Return Location
                        </label>
                        <select
                          value={bookingData.returnLocation}
                          onChange={(e) => handleInputChange('returnLocation', e.target.value)}
                          className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                        >
                          <option value="same">Same as Pickup</option>
                          <option value="delhi-cp">Delhi - Connaught Place</option>
                          <option value="delhi-aerocity">Delhi - Aerocity</option>
                          <option value="gurugram-cybercity">Gurugram - Cyber City</option>
                          <option value="noida-sector62">Noida - Sector 62</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3 md:mb-4 flex items-center gap-2">
                  <FaCreditCard className="text-gray-500" />
                  Pricing Summary
                </h3>
                <div className="space-y-2 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base rental ({total.days} days × ₹{vehicleDetails.price})</span>
                    <span className="font-medium">₹{total.base}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurance & Protection</span>
                    <span className="font-medium">₹{total.insurance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">₹{total.serviceFee}</span>
                  </div>
                  {total.deliveryCharge > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Charge</span>
                      <span className="font-medium">₹{total.deliveryCharge}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span className="text-[--color-primary-600]">₹{total.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 2: Rental Type */}
          {currentStep === 2 && (
            <>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 flex items-center gap-3">
                <FaCarSide className="text-[--color-primary-600]" />
                Select Rental Type
              </h2>
              
              <div className="space-y-6">
                {/* Self Drive Option */}
                <div className={`p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all ${bookingData.rentalType === 'self' ? 'border-[--color-primary-600] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => {
                    handleInputChange('rentalType', 'self')
                    handleInputChange('withDriver', false)
                  }}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${bookingData.rentalType === 'self' ? 'bg-[--color-primary-100] text-[--color-primary-600]' : 'bg-gray-100 text-gray-500'}`}>
                      <FaKey className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Self Drive</h3>
                          <p className="text-gray-600 mb-3">Drive the vehicle yourself</p>
                        </div>
                        {bookingData.rentalType === 'self' && (
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Selected
                          </div>
                        )}
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="text-green-500" />
                          <span>Full control of the vehicle</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="text-green-500" />
                          <span>Flexible timing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="text-green-500" />
                          <span>Lower cost</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* With Driver Option */}
                <div className={`p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all ${bookingData.rentalType === 'withDriver' ? 'border-[--color-primary-600] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => {
                    handleInputChange('rentalType', 'withDriver')
                    handleInputChange('withDriver', true)
                  }}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${bookingData.rentalType === 'withDriver' ? 'bg-[--color-primary-100] text-[--color-primary-600]' : 'bg-gray-100 text-gray-500'}`}>
                      <FaUserShield className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">With Professional Driver</h3>
                          <p className="text-gray-600 mb-3">Relax while our expert driver takes care of everything</p>
                        </div>
                        {bookingData.rentalType === 'withDriver' && (
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Selected
                          </div>
                        )}
                      </div>
                      
                      {bookingData.rentalType === 'withDriver' && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold mb-3">Driver Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Driver Hours per Day
                              </label>
                              <select
                                value={bookingData.driverHours}
                                onChange={(e) => handleInputChange('driverHours', parseInt(e.target.value))}
                                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                              >
                                <option value="8">8 hours (Standard)</option>
                                <option value="12">12 hours</option>
                                <option value="24">24 hours</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Driver Language
                              </label>
                              <select
                                value={bookingData.driverLanguage}
                                onChange={(e) => handleInputChange('driverLanguage', e.target.value)}
                                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                              >
                                <option value="hindi">Hindi</option>
                                <option value="english">English</option>
                                <option value="both">Hindi & English</option>
                              </select>
                            </div>
                          </div>
                          <div className="mt-4">
                            <h5 className="font-medium mb-2">Included Services:</h5>
                            <ul className="text-sm text-gray-600 space-y-2">
                              <li className="flex items-center gap-2">
                                <FaShieldAlt className="text-green-500 flex-shrink-0" />
                                <span>Verified driver with background check</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <FaClock className="text-green-500 flex-shrink-0" />
                                <span>Professional and punctual service</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <FaUser className="text-green-500 flex-shrink-0" />
                                <span>Knowledge of local routes and traffic</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver Charges Info */}
              {bookingData.rentalType === 'withDriver' && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <FaClock className="text-yellow-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-1">Driver Charges</h4>
                      <p className="text-sm text-yellow-700">
                        ₹500 per day (8 hours included). Additional hours charged at ₹100/hour.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Step 3: Personal Details */}
          {currentStep === 3 && (
            <>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 flex items-center gap-3">
                <FaIdCard className="text-[--color-primary-600]" />
                Personal Details
              </h2>
              
              <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={bookingData.personalDetails.name}
                      onChange={(e) => handlePersonalDetailsChange('name', e.target.value)}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={bookingData.personalDetails.email}
                      onChange={(e) => handlePersonalDetailsChange('email', e.target.value)}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={bookingData.personalDetails.phone}
                      onChange={(e) => handlePersonalDetailsChange('phone', e.target.value)}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                      placeholder="Enter 10-digit phone number"
                      maxLength="10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Driving License Number *
                    </label>
                    <input
                      type="text"
                      value={bookingData.personalDetails.licenseNumber}
                      onChange={(e) => handlePersonalDetailsChange('licenseNumber', e.target.value)}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                      placeholder="Enter DL number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complete Address
                  </label>
                  <textarea
                    value={bookingData.personalDetails.address}
                    onChange={(e) => handlePersonalDetailsChange('address', e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                    placeholder="Enter your complete address"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact Number
                  </label>
                  <input
                    type="tel"
                    value={bookingData.personalDetails.emergencyContact}
                    onChange={(e) => handlePersonalDetailsChange('emergencyContact', e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                    placeholder="Enter emergency contact number"
                    maxLength="10"
                  />
                </div>
              </div>

              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold mb-2 md:mb-3 flex items-center gap-2 text-yellow-800">
                  <FaShieldAlt />
                  Important Notes:
                </h3>
                <ul className="text-sm md:text-base text-yellow-700 space-y-1 md:space-y-2">
                  <li>• Please carry your original driving license during pickup</li>
                  <li>• A security deposit of ₹5,000 will be held (refundable)</li>
                  <li>• Fuel is not included in the rental price</li>
                  <li>• Minimum age for rental: 21 years</li>
                  <li>• Additional charges for extra kilometers</li>
                  <li>• Late return may incur additional charges</li>
                </ul>
              </div>
            </>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 flex items-center gap-3">
                <FaCreditCard className="text-[--color-primary-600]" />
                Payment Method
              </h2>
              
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <label className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={bookingData.paymentMethod === 'upi'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="w-5 h-5 text-[--color-primary-600]"
                  />
                  <div className="flex items-center gap-3">
                    <FaGooglePay className="text-xl text-blue-600" />
                    <div>
                      <div className="font-semibold text-base md:text-lg">UPI Payment</div>
                      <div className="text-gray-600 text-sm md:text-base">Google Pay, PhonePe, Paytm</div>
                    </div>
                  </div>
                </label>

                {bookingData.paymentMethod === 'upi' && (
                  <div className="ml-8 md:ml-12 mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UPI ID *
                    </label>
                    <input
                      type="text"
                      value={bookingData.upiId}
                      onChange={(e) => handleInputChange('upiId', e.target.value)}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                      placeholder="username@upi"
                    />
                  </div>
                )}

                <label className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={bookingData.paymentMethod === 'card'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="w-5 h-5 text-[--color-primary-600]"
                  />
                  <div className="flex items-center gap-3">
                    <FaCard className="text-xl text-red-500" />
                    <div>
                      <div className="font-semibold text-base md:text-lg">Credit/Debit Card</div>
                      <div className="text-gray-600 text-sm md:text-base">Visa, Mastercard, RuPay</div>
                    </div>
                  </div>
                </label>

                {bookingData.paymentMethod === 'card' && (
                  <div className="ml-8 md:ml-12 mt-2 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={bookingData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16))}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                        placeholder="1234 5678 9012 3456"
                        maxLength="16"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="month"
                          value={bookingData.cardExpiry}
                          onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                          className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="password"
                          value={bookingData.cardCvv}
                          onChange={(e) => handleInputChange('cardCvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
                          className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent text-sm md:text-base"
                          placeholder="123"
                          maxLength="3"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <label className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={bookingData.paymentMethod === 'netbanking'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="w-5 h-5 text-[--color-primary-600]"
                  />
                  <div className="flex items-center gap-3">
                    <FaUniversity className="text-xl text-green-600" />
                    <div>
                      <div className="font-semibold text-base md:text-lg">Net Banking</div>
                      <div className="text-gray-600 text-sm md:text-base">All major banks</div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Final Pricing */}
              <div className="p-4 md:p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3 md:mb-4">Final Amount</h3>
                <div className="space-y-2 md:space-y-3 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle Rental ({total.days} days)</span>
                    <span className="font-medium">₹{total.base}</span>
                  </div>
                  {bookingData.rentalType === 'withDriver' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Driver Service ({total.days} days)</span>
                      <span className="font-medium">₹{total.driver}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurance & Protection</span>
                    <span className="font-medium">₹{total.insurance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">₹{total.serviceFee}</span>
                  </div>
                  {total.deliveryCharge > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Charge</span>
                      <span className="font-medium">₹{total.deliveryCharge}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
                    <div className="flex justify-between text-base md:text-lg font-bold">
                      <span>Total Payable</span>
                      <span className="text-[--color-primary-600]">₹{total.total}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Includes all taxes. Security deposit of ₹5,000 will be held separately.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <>
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <FaCheckCircle className="text-green-500 text-2xl md:text-3xl" />
                </div>
                
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">
                  Your booking ID: <span className="font-semibold text-[--color-primary-600]">RE{Date.now().toString().slice(-8)}</span>
                </p>

                <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200 max-w-md mx-auto mb-6 md:mb-8">
                  <h3 className="font-semibold mb-3 md:mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-sm md:text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="font-medium">{vehicleDetails.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pickup Date:</span>
                      <span className="font-medium">
                        {bookingData.pickupDate ? new Date(bookingData.pickupDate).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'To be selected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pickup Location:</span>
                      <span className="font-medium">
                        {bookingData.pickupLocation || 'To be selected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rental Type:</span>
                      <span className="font-medium">
                        {bookingData.rentalType === 'self' ? 'Self Drive' : 'With Driver'}
                      </span>
                    </div>
                    {bookingData.rentalType === 'withDriver' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Driver:</span>
                        <span className="font-medium">Assigned (Rajesh Kumar)</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t mt-2">
                      <span className="text-gray-600 font-semibold">Total Amount:</span>
                      <span className="font-bold text-[--color-primary-600]">₹{total.total}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                  A confirmation email has been sent to <span className="font-semibold">{bookingData.personalDetails.email || 'your email'}</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <button
                    onClick={() => router.push('/')}
                    className="border-2 border-[--color-primary-600] text-[--color-primary-600] px-6 md:px-8 py-2 md:py-3 rounded-lg font-medium hover:bg-[--color-primary-50] transition-colors text-sm md:text-base"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={() => router.push('/profile')}
                    className="bg-[--color-primary-600] text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-medium hover:bg-[--color-primary-700] transition-colors text-sm md:text-base"
                  >
                    View My Bookings
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Navigation Buttons - Fixed at bottom */}
        {currentStep < 5 && (
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-4 md:py-6 -mx-4 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-medium transition-colors text-sm md:text-base ${
                    currentStep === 1 
                      ? 'text-gray-400 cursor-not-allowed opacity-50' 
                      : 'text-[--color-primary-600] hover:bg-[--color-primary-50] border border-gray-300'
                  }`}
                >
                  <FaArrowLeft />
                  <span>Previous</span>
                </button>
                
                <button
                  onClick={currentStep === 4 ? handleConfirmBooking : handleNext}
                  disabled={isLoading}
                  className={`bg-[--color-primary-600] text-white px-6 md:px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm md:text-base shadow-md hover:shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[--color-primary-700]'}`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>{currentStep === 4 ? 'Confirm Booking' : 'Next Step'}</span>
                      {currentStep < 4 && <FaArrowRight />}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}