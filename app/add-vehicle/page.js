/* app/add-vehicle/page.js */
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  FaCar,
  FaMotorcycle,
  FaCamera,
  FaImage,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaUpload,
  FaTimes,
  FaFileAlt
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { vehicleAPI } from '@/Src/utils/api'
import { getCurrentUser, isAuthenticated } from '@/Src/utils/auth'

export default function AddVehiclePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [user, setUser] = useState(null)

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error('Please login to list your vehicle')
      router.push('/auth')
      return
    }
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [router])

  const [vehicleData, setVehicleData] = useState({
    // Step 1: Basic Info
    vehicleType: 'car',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    registrationNumber: '',
    fuelType: 'petrol',
    transmission: 'automatic',
    seats: 5,
    
    // Step 2: Features & Pricing
    features: ['ac', 'music', 'airbags'],
    pricePerDay: 0,
    pricePerWeek: 0,
    pricePerMonth: 0,
    securityDeposit: 5000,
    
    // Step 3: Location & Availability
    location: '',
    address: '',
    latitude: '',
    longitude: '',
    availableFrom: '',
    availableTo: '',
    
    // Step 4: Documents
    rcBookImage: null,
    insuranceImage: null,
    insuranceValidUntil: '',
    description: ''
  })

  const featuresList = [
    { id: 'ac', label: 'Air Conditioning', icon: '❄️' },
    { id: 'music', label: 'Music System', icon: '🎵' },
    { id: 'airbags', label: 'Airbags', icon: '🛡️' },
    { id: 'gps', label: 'GPS Navigation', icon: '🗺️' },
    { id: 'bluetooth', label: 'Bluetooth', icon: '📱' },
    { id: 'camera', label: 'Reverse Camera', icon: '📷' },
    { id: 'sunroof', label: 'Sunroof', icon: '🌞' },
    { id: 'leather', label: 'Leather Seats', icon: '💺' }
  ]

  const handleInputChange = (field, value) => {
    setVehicleData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFeatureToggle = (featureId) => {
    setVehicleData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + images.length > 10) {
      toast.error('Maximum 10 images allowed')
      return
    }
    
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          data: reader.result,
          name: file.name,
          isPrimary: prev.length === 0 // First image is primary
        }])
      }
      reader.readAsDataURL(file)
    })
    
    toast.success(`${files.length} image(s) added`)
  }

  const handleDocumentUpload = (field, e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setVehicleData(prev => ({
        ...prev,
        [field]: reader.result
      }))
      toast.success(`${field === 'rcBookImage' ? 'RC Book' : 'Insurance'} uploaded successfully`)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const setPrimaryImage = (id) => {
    setImages(prev => prev.map(img => ({
      ...img,
      isPrimary: img.id === id
    })))
    toast.success('Primary image updated')
  }

  const calculateWeeklyPrice = (daily) => daily * 7 * 0.9 // 10% discount
  const calculateMonthlyPrice = (daily) => daily * 30 * 0.8 // 20% discount

  const handlePriceChange = (field, value) => {
    const price = parseFloat(value) || 0
    handleInputChange(field, price)
    
    if (field === 'pricePerDay') {
      handleInputChange('pricePerWeek', calculateWeeklyPrice(price))
      handleInputChange('pricePerMonth', calculateMonthlyPrice(price))
    }
  }

  const validateStep = () => {
    switch(step) {
      case 1:
        if (!vehicleData.brand || !vehicleData.model || !vehicleData.year) {
          toast.error('Please fill all required fields')
          return false
        }
        if (!vehicleData.registrationNumber) {
          toast.error('Registration number is required')
          return false
        }
        return true
      case 2:
        if (vehicleData.pricePerDay <= 0) {
          toast.error('Please set a valid price per day')
          return false
        }
        if (images.length < 2) {
          toast.error('Please upload at least 2 vehicle images')
          return false
        }
        return true
      case 3:
        if (!vehicleData.location || !vehicleData.address) {
          toast.error('Please provide location details')
          return false
        }
        return true
      case 4:
        if (!vehicleData.rcBookImage) {
          toast.error('Please upload RC Book')
          return false
        }
        if (!vehicleData.insuranceImage) {
          toast.error('Please upload Insurance Certificate')
          return false
        }
        if (!vehicleData.insuranceValidUntil) {
          toast.error('Please enter insurance expiry date')
          return false
        }
        return true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (!validateStep()) return
    if (step < 4) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep()) return
    
    setLoading(true)
    try {
      // Prepare vehicle data for API
      const vehiclePayload = {
        owner: user?._id,
        vehicleType: vehicleData.vehicleType,
        brand: vehicleData.brand,
        model: vehicleData.model,
        year: parseInt(vehicleData.year),
        registrationNumber: vehicleData.registrationNumber,
        rcBookImage: vehicleData.rcBookImage,
        insuranceImage: vehicleData.insuranceImage,
        insuranceValidUntil: vehicleData.insuranceValidUntil,
        fuelType: vehicleData.fuelType,
        transmission: vehicleData.transmission,
        seats: vehicleData.seats,
        features: vehicleData.features,
        images: images.map(img => ({
          data: img.data,
          isPrimary: img.isPrimary || false
        })),
        location: vehicleData.location,
        latitude: vehicleData.latitude ? parseFloat(vehicleData.latitude) : null,
        longitude: vehicleData.longitude ? parseFloat(vehicleData.longitude) : null,
        address: vehicleData.address,
        pricePerDay: vehicleData.pricePerDay,
        pricePerWeek: vehicleData.pricePerWeek,
        pricePerMonth: vehicleData.pricePerMonth,
        securityDeposit: vehicleData.securityDeposit,
        availableFrom: vehicleData.availableFrom,
        availableTo: vehicleData.availableTo,
        description: vehicleData.description,
        isAvailable: true,
        isVerified: false // Will be verified by admin
      }

      console.log('📤 Submitting vehicle:', vehiclePayload)
      
      // Call API to create vehicle
      const response = await vehicleAPI.create(vehiclePayload)
      
      console.log('✅ Vehicle created:', response)
      toast.success('Vehicle listed successfully! It will be verified by our team.')
      
      // Reset form and redirect
      setTimeout(() => {
        router.push('/profile?tab=vehicles')
      }, 2000)
      
    } catch (error) {
      console.error('❌ Failed to list vehicle:', error)
      toast.error(error.message || 'Failed to list vehicle. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Vehicle Details' },
    { number: 2, title: 'Photos & Pricing' },
    { number: 3, title: 'Location' },
    { number: 4, title: 'Documents' }
  ]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative">
            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center relative z-10 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all ${
                  s.number === step 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : s.number < step 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {s.number < step ? <FaCheckCircle /> : s.number}
                </div>
                <span className={`text-sm font-medium ${s.number === step ? 'text-blue-600' : 'text-gray-500'}`}>
                  {s.title}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
          {/* Step 1: Vehicle Details */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Vehicle Details</h2>
              
              <div className="space-y-6">
                {/* Vehicle Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Vehicle Type *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${vehicleData.vehicleType === 'car' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => handleInputChange('vehicleType', 'car')}
                    >
                      <div className="flex flex-col items-center">
                        <FaCar className="text-4xl mb-3 text-gray-600" />
                        <div className="font-semibold">Car</div>
                      </div>
                    </div>
                    <div
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${vehicleData.vehicleType === 'bike' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => handleInputChange('vehicleType', 'bike')}
                    >
                      <div className="flex flex-col items-center">
                        <FaMotorcycle className="text-4xl mb-3 text-gray-600" />
                        <div className="font-semibold">Bike</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand *
                    </label>
                    <input
                      type="text"
                      value={vehicleData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Hyundai, Honda, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model *
                    </label>
                    <input
                      type="text"
                      value={vehicleData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Creta, City, etc."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year *
                    </label>
                    <select
                      value={vehicleData.year}
                      onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {Array.from({ length: 20 }, (_, i) => {
                        const year = new Date().getFullYear() - i
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registration No. *
                    </label>
                    <input
                      type="text"
                      value={vehicleData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="DL01AB1234"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuel Type
                    </label>
                    <select
                      value={vehicleData.fuelType}
                      onChange={(e) => handleInputChange('fuelType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="electric">Electric</option>
                      <option value="cng">CNG</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transmission
                    </label>
                    <select
                      value={vehicleData.transmission}
                      onChange={(e) => handleInputChange('transmission', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                  {vehicleData.vehicleType === 'car' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seats
                      </label>
                      <select
                        value={vehicleData.seats}
                        onChange={(e) => handleInputChange('seats', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={2}>2 Seater</option>
                        <option value={4}>4 Seater</option>
                        <option value={5}>5 Seater</option>
                        <option value={7}>7 Seater</option>
                        <option value={8}>8 Seater</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Step 2: Photos & Pricing */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Photos & Pricing</h2>
              
              <div className="space-y-8">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Vehicle Photos * (Min. 2, Max. 10)
                  </label>
                  
                  {/* Upload Button */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6 hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="vehicle-images"
                    />
                    <label htmlFor="vehicle-images" className="cursor-pointer">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCamera className="text-2xl text-blue-600" />
                      </div>
                      <div className="text-lg font-medium mb-2">Click to upload photos</div>
                      <p className="text-gray-500 text-sm">
                        Upload clear photos from different angles
                      </p>
                      <div className="mt-4 text-sm text-gray-600">
                        Supports JPG, PNG • Max 5MB each
                      </div>
                    </label>
                  </div>

                  {/* Image Preview */}
                  {images.length > 0 && (
                    <div className="mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="font-medium">Uploaded Photos ({images.length}/10)</div>
                        <div className="text-sm text-gray-500">
                          Click on image to set as primary
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image) => (
                          <div key={image.id} className="relative group">
                            <div 
                              className={`aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer border-2 ${image.isPrimary ? 'border-blue-600' : 'border-transparent'}`}
                              onClick={() => setPrimaryImage(image.id)}
                            >
                              <img 
                                src={image.data} 
                                alt={image.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {image.isPrimary && (
                              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                Primary
                              </div>
                            )}
                            <button
                              onClick={() => removeImage(image.id)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <FaTimes className="text-xs" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Features
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {featuresList.map((feature) => (
                      <div
                        key={feature.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${vehicleData.features.includes(feature.id) ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => handleFeatureToggle(feature.id)}
                      >
                        <div className="text-2xl mb-2">{feature.icon}</div>
                        <div className="text-sm font-medium">{feature.label}</div>
                        {vehicleData.features.includes(feature.id) && (
                          <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                            <FaCheckCircle />
                            Selected
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <h3 className="text-lg font-semibold mb-6">Set Your Pricing</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <FaRupeeSign className="text-gray-500" />
                        <div className="font-semibold">Daily Rate</div>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          min="0"
                          value={vehicleData.pricePerDay}
                          onChange={(e) => handlePriceChange('pricePerDay', e.target.value)}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                      <div className="mt-2 text-sm text-gray-500">Base price per day</div>
                    </div>
                    
                    <div className="border rounded-lg p-6 bg-blue-50">
                      <div className="flex items-center gap-2 mb-4">
                        <FaRupeeSign className="text-blue-600" />
                        <div className="font-semibold text-blue-600">Weekly Rate</div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        ₹{vehicleData.pricePerWeek}
                      </div>
                      <div className="mt-2 text-sm text-gray-500">Save 10%</div>
                    </div>
                    
                    <div className="border rounded-lg p-6 bg-green-50">
                      <div className="flex items-center gap-2 mb-4">
                        <FaRupeeSign className="text-green-600" />
                        <div className="font-semibold text-green-600">Monthly Rate</div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        ₹{vehicleData.pricePerMonth}
                      </div>
                      <div className="mt-2 text-sm text-gray-500">Save 20%</div>
                    </div>
                  </div>
                </div>

                {/* Security Deposit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Security Deposit (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      min="0"
                      value={vehicleData.securityDeposit}
                      onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="5000"
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Refundable amount held for damages
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-600" />
                Location Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Location *
                  </label>
                  <select
                    value={vehicleData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a location</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Noida">Noida</option>
                    <option value="Faridabad">Faridabad</option>
                    <option value="Ghaziabad">Ghaziabad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complete Address *
                  </label>
                  <textarea
                    value={vehicleData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter complete address with landmark"
                    rows="4"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available From
                    </label>
                    <input
                      type="date"
                      value={vehicleData.availableFrom}
                      onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available To
                    </label>
                    <input
                      type="date"
                      value={vehicleData.availableTo}
                      onChange={(e) => handleInputChange('availableTo', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min={vehicleData.availableFrom || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={vehicleData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add any additional details about your vehicle"
                    rows="3"
                  />
                </div>
              </div>
            </>
          )}

          {/* Step 4: Documents */}
          {step === 4 && (
            <>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <FaFileAlt className="text-blue-600" />
                Documents & Verification
              </h2>
              
              <div className="space-y-8">
                {/* RC Book Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Registration Certificate (RC) *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleDocumentUpload('rcBookImage', e)}
                      className="hidden"
                      id="rc-book"
                    />
                    <label htmlFor="rc-book" className="cursor-pointer">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaUpload className="text-blue-600" />
                      </div>
                      <div className="font-medium mb-1">
                        {vehicleData.rcBookImage ? 'RC Book Uploaded!' : 'Upload RC Book'}
                      </div>
                      <p className="text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      {vehicleData.rcBookImage && (
                        <div className="mt-2 text-xs text-green-600 flex items-center justify-center gap-1">
                          <FaCheckCircle />
                          Uploaded successfully
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Insurance Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Insurance Certificate *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleDocumentUpload('insuranceImage', e)}
                      className="hidden"
                      id="insurance"
                    />
                    <label htmlFor="insurance" className="cursor-pointer">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaUpload className="text-green-600" />
                      </div>
                      <div className="font-medium mb-1">
                        {vehicleData.insuranceImage ? 'Insurance Uploaded!' : 'Upload Insurance'}
                      </div>
                      <p className="text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      {vehicleData.insuranceImage && (
                        <div className="mt-2 text-xs text-green-600 flex items-center justify-center gap-1">
                          <FaCheckCircle />
                          Uploaded successfully
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Insurance Expiry */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Valid Until *
                  </label>
                  <input
                    type="date"
                    value={vehicleData.insuranceValidUntil}
                    onChange={(e) => handleInputChange('insuranceValidUntil', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Your vehicle must have valid insurance
                  </p>
                </div>

                {/* Summary */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-4">Listing Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="font-medium">{vehicleData.brand} {vehicleData.model} ({vehicleData.year})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration:</span>
                      <span className="font-medium">{vehicleData.registrationNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily Rate:</span>
                      <span className="font-medium">₹{vehicleData.pricePerDay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{vehicleData.location}</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-bold">
                        <span>Security Deposit:</span>
                        <span className="text-blue-600">₹{vehicleData.securityDeposit}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-5 h-5 text-blue-600 rounded mt-1"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I confirm that all information provided is accurate and I am the rightful owner of this vehicle. 
                    I understand that RideEase will verify the documents and my vehicle will be listed after verification.
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              step === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-blue-600 hover:bg-blue-50 border border-gray-300'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={step === 4 ? handleSubmit : handleNext}
            disabled={loading}
            className={`px-8 py-3 rounded-lg font-medium flex items-center gap-2 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : step === 4 ? (
              <>
                <FaUpload />
                List Vehicle
              </>
            ) : (
              'Next Step'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}