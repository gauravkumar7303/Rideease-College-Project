// 'use client'

// import { useState } from 'react'
// import { 
//   FaTimes, 
//   FaCalendarAlt, 
//   FaMapMarkerAlt, 
//   FaUser, 
//   FaCreditCard, 
//   FaCheckCircle,
//   FaArrowLeft,
//   FaArrowRight
// } from 'react-icons/fa'
// import { toast } from 'react-toastify'

// export default function BookingModal({ vehicle, isOpen, onClose }) {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [bookingData, setBookingData] = useState({
//     pickupDate: '',
//     returnDate: '',
//     pickupLocation: '',
//     returnLocation: '',
//     withDriver: false,
//     paymentMethod: 'upi'
//   })

//   if (!isOpen) return null

//   const steps = [
//     { number: 1, title: 'Dates', icon: <FaCalendarAlt /> },
//     { number: 2, title: 'Location', icon: <FaMapMarkerAlt /> },
//     { number: 3, title: 'Payment', icon: <FaCreditCard /> },
//     { number: 4, title: 'Confirm', icon: <FaCheckCircle /> }
//   ]

//   const handleNext = () => {
//     if (currentStep < 4) {
//       setCurrentStep(currentStep + 1)
//     } else {
//       handleConfirm()
//     }
//   }

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   const handleConfirm = () => {
//     toast.success('Booking confirmed successfully!')
//     onClose()
//   }

//   const handleInputChange = (field, value) => {
//     setBookingData(prev => ({
//       ...prev,
//       [field]: value
//     }))
//   }

//   const calculateTotal = () => {
//     const days = bookingData.returnDate && bookingData.pickupDate ? 
//       Math.ceil((new Date(bookingData.returnDate) - new Date(bookingData.pickupDate)) / (1000 * 60 * 60 * 24)) : 1
//     return vehicle.price * days + (bookingData.withDriver ? 500 * days : 0) + 300
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b">
//           <h2 className="text-2xl font-semibold">Book {vehicle?.brand} {vehicle?.model}</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-lg"
//           >
//             <FaTimes />
//           </button>
//         </div>

//         {/* Steps Indicator */}
//         <div className="px-6 py-4 border-b">
//           <div className="flex justify-between">
//             {steps.map((step) => (
//               <div key={step.number} className="flex flex-col items-center">
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
//                   step.number === currentStep 
//                     ? 'bg-[--color-primary-600] text-white' 
//                     : step.number < currentStep 
//                     ? 'bg-green-500 text-white' 
//                     : 'bg-gray-200 text-gray-500'
//                 }`}>
//                   {step.number === currentStep ? step.icon : step.number}
//                 </div>
//                 <span className="text-sm">{step.title}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {currentStep === 1 && (
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Select Dates</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Pickup Date & Time
//                   </label>
//                   <input
//                     type="datetime-local"
//                     value={bookingData.pickupDate}
//                     onChange={(e) => handleInputChange('pickupDate', e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Return Date & Time
//                   </label>
//                   <input
//                     type="datetime-local"
//                     value={bookingData.returnDate}
//                     onChange={(e) => handleInputChange('returnDate', e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Select Location</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Pickup Location
//                   </label>
//                   <select
//                     value={bookingData.pickupLocation}
//                     onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent"
//                   >
//                     <option value="">Select location</option>
//                     <option value="delhi-cp">Delhi - Connaught Place</option>
//                     <option value="delhi-aerocity">Delhi - Aerocity</option>
//                     <option value="gurugram-cybercity">Gurugram - Cyber City</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Return Location
//                   </label>
//                   <select
//                     value={bookingData.returnLocation}
//                     onChange={(e) => handleInputChange('returnLocation', e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent"
//                   >
//                     <option value="same">Same as Pickup</option>
//                     <option value="delhi-cp">Delhi - Connaught Place</option>
//                     <option value="delhi-aerocity">Delhi - Aerocity</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}

//           {currentStep === 3 && (
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
//               <div className="space-y-4">
//                 <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="upi"
//                     checked={bookingData.paymentMethod === 'upi'}
//                     onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
//                     className="w-5 h-5 text-[--color-primary-600]"
//                   />
//                   <div>
//                     <div className="font-semibold">UPI Payment</div>
//                     <div className="text-gray-600 text-sm">Instant payment with UPI apps</div>
//                   </div>
//                 </label>
//                 <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="card"
//                     checked={bookingData.paymentMethod === 'card'}
//                     onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
//                     className="w-5 h-5 text-[--color-primary-600]"
//                   />
//                   <div>
//                     <div className="font-semibold">Credit/Debit Card</div>
//                     <div className="text-gray-600 text-sm">Pay with your card</div>
//                   </div>
//                 </label>
//               </div>
//             </div>
//           )}

//           {currentStep === 4 && (
//             <div className="text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FaCheckCircle className="text-green-500 text-2xl" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Confirm Booking</h3>
//               <p className="text-gray-600 mb-6">
//                 Total Amount: <span className="font-bold text-[--color-primary-600]">₹{calculateTotal()}</span>
//               </p>
//               <p className="text-gray-500 text-sm">
//                 By confirming, you agree to our terms and conditions
//               </p>
//             </div>
//           )}

//           {/* Pricing Summary */}
//           <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//             <div className="flex justify-between items-center">
//               <div>
//                 <div className="font-semibold">{vehicle?.brand} {vehicle?.model}</div>
//                 <div className="text-sm text-gray-600">₹{vehicle?.price}/day</div>
//               </div>
//               <div className="text-lg font-bold text-[--color-primary-600]">
//                 ₹{calculateTotal()}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="p-6 border-t">
//           <div className="flex justify-between">
//             <button
//               onClick={handlePrevious}
//               disabled={currentStep === 1}
//               className={`px-6 py-3 rounded-lg font-medium ${
//                 currentStep === 1 
//                   ? 'text-gray-400 cursor-not-allowed' 
//                   : 'text-[--color-primary-600] hover:bg-[--color-primary-50]'
//               }`}
//             >
//               <FaArrowLeft className="inline mr-2" />
//               Previous
//             </button>
            
//             <button
//               onClick={handleNext}
//               className="bg-[--color-primary-600] text-white px-8 py-3 rounded-lg font-medium hover:bg-[--color-primary-700] transition-colors"
//             >
//               {currentStep === 4 ? 'Confirm Booking' : 'Continue'}
//               {currentStep < 4 && <FaArrowRight className="inline ml-2" />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  FaTimes,
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
import { bookingAPI } from '@/Src/utils/api'
import { getCurrentUser, isAuthenticated } from '@/Src/utils/auth'

export default function BookingModal({ vehicle, isOpen, onClose }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  
  const [bookingData, setBookingData] = useState({
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
    if (isOpen && isAuthenticated()) {
      const currentUser = getCurrentUser()
      setUser(currentUser)
      setBookingData(prev => ({
        ...prev,
        personalDetails: {
          ...prev.personalDetails,
          name: currentUser?.name || '',
          email: currentUser?.email || '',
          phone: currentUser?.phone || ''
        }
      }))
    }
  }, [isOpen])

  if (!isOpen || !vehicle) return null

  const steps = [
    { number: 1, title: 'Dates & Location', icon: <FaCalendarAlt /> },
    { number: 2, title: 'Rental Type', icon: <FaCarSide /> },
    { number: 3, title: 'Personal Details', icon: <FaIdCard /> },
    { number: 4, title: 'Payment', icon: <FaCreditCard /> },
    { number: 5, title: 'Confirm', icon: <FaCheckCircle /> }
  ]

  const handleNext = async () => {
    if (!await validateCurrentStep()) return
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      handleConfirmBooking()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
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
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
        }
        return true
      
      default:
        return true
    }
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

  const calculateTotal = () => {
    const days = bookingData.returnDate && bookingData.pickupDate 
      ? Math.ceil((new Date(bookingData.returnDate) - new Date(bookingData.pickupDate)) / (1000 * 60 * 60 * 24))
      : 1
    
    const baseAmount = vehicle.pricePerDay * days
    const driverCharge = bookingData.rentalType === 'withDriver' ? 500 * days : 0
    const insuranceCharges = 200 * days
    const serviceFee = 100
    const deliveryCharges = bookingData.pickupAddress ? 150 : 0
    
    return {
      days,
      baseAmount,
      driverCharge,
      insuranceCharges,
      serviceFee,
      deliveryCharges,
      total: baseAmount + driverCharge + insuranceCharges + serviceFee + deliveryCharges
    }
  }

  const handleConfirmBooking = async () => {
    setIsLoading(true)
    
    try {
      const total = calculateTotal()
      
      const bookingPayload = {
        vehicleId: vehicle._id,
        customerId: user?._id,
        ownerId: vehicle.owner?._id,
        bookingType: bookingData.rentalType === 'withDriver' ? 'with_driver' : 'self_drive',
        pickupDate: bookingData.pickupDate,
        returnDate: bookingData.returnDate,
        pickupLocation: bookingData.pickupLocation,
        returnLocation: bookingData.returnLocation || bookingData.pickupLocation,
        deliveryAddress: bookingData.pickupAddress,
        totalDays: total.days,
        baseAmount: total.baseAmount,
        driverCharges: total.driverCharge,
        insuranceCharges: total.insuranceCharges,
        serviceFee: total.serviceFee,
        deliveryCharges: total.deliveryCharges,
        totalAmount: total.total,
        securityDeposit: vehicle.securityDeposit,
        paymentMethod: bookingData.paymentMethod,
        customerDetails: bookingData.personalDetails,
        driverRequested: bookingData.rentalType === 'withDriver',
        driverHours: bookingData.driverHours,
        driverLanguage: bookingData.driverLanguage
      }

      console.log('📦 Creating booking:', bookingPayload)
      
      // Call your booking API here
      // const response = await bookingAPI.create(bookingPayload)
      
      // For now, save to localStorage
      const bookings = JSON.parse(localStorage.getItem('rideease_bookings') || '[]')
      const newBooking = {
        id: `RE${Date.now().toString().slice(-8)}`,
        ...bookingPayload,
        vehicle: {
          name: `${vehicle.brand} ${vehicle.model}`,
          type: vehicle.vehicleType,
          image: vehicle.images?.[0]?.data
        },
        status: 'confirmed',
        bookingDate: new Date().toISOString()
      }
      bookings.push(newBooking)
      localStorage.setItem('rideease_bookings', JSON.stringify(bookings))
      
      toast.success('Booking confirmed successfully!')
      
      setTimeout(() => {
        onClose()
        router.push('/profile?tab=bookings')
      }, 1500)
      
    } catch (error) {
      console.error('❌ Booking error:', error)
      toast.error('Failed to confirm booking. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const total = calculateTotal()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-semibold">Book Your Vehicle</h2>
            <p className="text-gray-600 text-sm mt-1">
              {vehicle.brand} {vehicle.model} • ₹{vehicle.pricePerDay}/day
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Steps Indicator */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                  step.number === currentStep 
                    ? 'bg-blue-600 text-white shadow-lg scale-110' 
                    : step.number < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.number < currentStep ? <FaCheckCircle /> : step.icon}
                </div>
                <span className="text-xs text-center hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Dates & Location */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Select Dates & Location</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={bookingData.pickupDate}
                    onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={bookingData.returnDate}
                    onChange={(e) => handleInputChange('returnDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={bookingData.pickupDate || new Date().toISOString().slice(0, 16)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Location *
                  </label>
                  <select
                    value={bookingData.pickupLocation}
                    onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select pickup location</option>
                    <option value="delhi-cp">Delhi - Connaught Place</option>
                    <option value="delhi-aerocity">Delhi - Aerocity</option>
                    <option value="gurugram-cybercity">Gurugram - Cyber City</option>
                    <option value="gurugram-sector29">Gurugram - Sector 29</option>
                    <option value="noida-sector62">Noida - Sector 62</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Location
                  </label>
                  <select
                    value={bookingData.returnLocation}
                    onChange={(e) => handleInputChange('returnLocation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Same as Pickup</option>
                    <option value="delhi-cp">Delhi - Connaught Place</option>
                    <option value="delhi-aerocity">Delhi - Aerocity</option>
                    <option value="gurugram-cybercity">Gurugram - Cyber City</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Rental Type */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Select Rental Type</h3>
              
              <div className="space-y-4">
                {/* Self Drive */}
                <div 
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    bookingData.rentalType === 'self' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    handleInputChange('rentalType', 'self')
                    handleInputChange('withDriver', false)
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      bookingData.rentalType === 'self' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <FaKey className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">Self Drive</h4>
                        {bookingData.rentalType === 'self' && (
                          <span className="text-green-600 text-sm">Selected</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Drive the vehicle yourself</p>
                    </div>
                  </div>
                </div>

                {/* With Driver */}
                <div 
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    bookingData.rentalType === 'withDriver' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    handleInputChange('rentalType', 'withDriver')
                    handleInputChange('withDriver', true)
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      bookingData.rentalType === 'withDriver' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <FaUserShield className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">With Professional Driver</h4>
                        {bookingData.rentalType === 'withDriver' && (
                          <span className="text-green-600 text-sm">Selected</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Relax while our expert driver drives</p>
                      
                      {bookingData.rentalType === 'withDriver' && (
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Driver Hours</label>
                            <select
                              value={bookingData.driverHours}
                              onChange={(e) => handleInputChange('driverHours', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value="8">8 hours</option>
                              <option value="12">12 hours</option>
                              <option value="24">24 hours</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Language</label>
                            <select
                              value={bookingData.driverLanguage}
                              onChange={(e) => handleInputChange('driverLanguage', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value="hindi">Hindi</option>
                              <option value="english">English</option>
                              <option value="both">Hindi & English</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Personal Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Personal Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={bookingData.personalDetails.name}
                    onChange={(e) => handlePersonalDetailsChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={bookingData.personalDetails.phone}
                    onChange={(e) => handlePersonalDetailsChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter DL number"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Payment Method</h3>
              
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={bookingData.paymentMethod === 'upi'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <FaGooglePay className="text-2xl text-blue-600" />
                  <div>
                    <div className="font-semibold">UPI Payment</div>
                    <div className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</div>
                  </div>
                </label>

                {bookingData.paymentMethod === 'upi' && (
                  <div className="ml-12">
                    <input
                      type="text"
                      value={bookingData.upiId}
                      onChange={(e) => handleInputChange('upiId', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="username@upi"
                    />
                  </div>
                )}

                <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={bookingData.paymentMethod === 'card'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <FaCard className="text-2xl text-red-500" />
                  <div>
                    <div className="font-semibold">Credit/Debit Card</div>
                    <div className="text-sm text-gray-600">Visa, Mastercard, RuPay</div>
                  </div>
                </label>

                {bookingData.paymentMethod === 'card' && (
                  <div className="ml-12 space-y-4">
                    <input
                      type="text"
                      value={bookingData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Card Number"
                      maxLength="16"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="month"
                        value={bookingData.cardExpiry}
                        onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="password"
                        value={bookingData.cardCvv}
                        onChange={(e) => handleInputChange('cardCvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="CVV"
                        maxLength="3"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-green-500 text-3xl" />
              </div>
              
              <h3 className="text-2xl font-semibold mb-4">Confirm Your Booking</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg text-left mb-6">
                <h4 className="font-semibold mb-4">Booking Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle:</span>
                    <span className="font-medium">{vehicle.brand} {vehicle.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{total.days} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pickup:</span>
                    <span className="font-medium">{new Date(bookingData.pickupDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rental Type:</span>
                    <span className="font-medium capitalize">{bookingData.rentalType}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total Amount:</span>
                      <span className="text-blue-600">₹{total.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                By confirming, you agree to our terms and conditions
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t sticky bottom-0 bg-white">
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                currentStep === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:bg-blue-50 border border-gray-300'
              }`}
            >
              <FaArrowLeft />
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={isLoading}
              className={`bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  {currentStep === 5 ? 'Confirm Booking' : 'Continue'}
                  {currentStep < 5 && <FaArrowRight />}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}