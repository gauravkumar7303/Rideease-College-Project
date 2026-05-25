// 'use client'

// import { useState, useEffect, use } from 'react'
// import { useRouter } from 'next/navigation'
// import {
//   FaStar,
//   FaMapMarkerAlt,
//   FaGasPump,
//   FaCogs,
//   FaUserFriends,
//   FaSnowflake,
//   FaCalendarAlt,
//   FaShieldAlt,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaArrowLeft,
//   FaHeart,
//   FaShare,
//   FaPhone,
//   FaEnvelope,
//   FaRupeeSign,
//   FaCar,
//   FaMotorcycle
// } from 'react-icons/fa'
// import { toast } from 'react-toastify'
// import { vehicleAPI } from '@/Src/utils/api'
// import { isAuthenticated, getCurrentUser } from '@/Src/utils/auth'
// import BookingModal from '@/Src/components/BookingModal'

// export default function VehicleDetailsPage({ params }) {
//   const router = useRouter()
//   // ✅ Unwrap params using React.use()
//   const { id } = use(params)
  
//   const [vehicle, setVehicle] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [selectedImage, setSelectedImage] = useState(0)
//   const [showBookingModal, setShowBookingModal] = useState(false)
//   const [isFavorite, setIsFavorite] = useState(false)

//   useEffect(() => {
//     if (id) {
//       fetchVehicleDetails(id)
//     } else {
//       console.error('❌ No vehicle ID provided')
//       toast.error('Invalid vehicle ID')
//       setLoading(false)
//     }
//   }, [id])

//   const fetchVehicleDetails = async (vehicleId) => {
//     try {
//       setLoading(true)
//       console.log('📦 Fetching vehicle:', vehicleId)
//       const response = await vehicleAPI.getById(vehicleId)
      
//       console.log('📥 API Response:', response)
      
//       if (response.success) {
//         setVehicle(response.vehicle)
//         console.log('✅ Vehicle loaded:', response.vehicle)
//       } else {
//         toast.error(response.error || 'Vehicle not found')
//       }
//     } catch (error) {
//       console.error('❌ Error fetching vehicle:', error)
//       toast.error('Failed to load vehicle details')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleBookNow = () => {
//     if (!isAuthenticated()) {
//       toast.info('Please login to book a vehicle')
//       router.push('/auth')
//       return
//     }
//     setShowBookingModal(true)
//   }

//   // ✅ Add handleFavorite function
//   const handleFavorite = () => {
//     setIsFavorite(!isFavorite)
//     toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites')
//   }

//   // ✅ Add handleShare function
//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href)
//     toast.success('Link copied to clipboard!')
//   }

//   // ✅ Add getFeatureIcon function
//   const getFeatureIcon = (feature) => {
//     const featureLower = String(feature).toLowerCase()
//     switch(featureLower) {
//       case 'petrol':
//       case 'diesel':
//       case 'electric':
//       case 'cng':
//         return <FaGasPump className="text-gray-600" />
//       case 'manual':
//       case 'automatic':
//         return <FaCogs className="text-gray-600" />
//       case 'ac':
//         return <FaSnowflake className="text-gray-600" />
//       case '5 seater':
//       case '7 seater':
//         return <FaUserFriends className="text-gray-600" />
//       default:
//         return <FaCheckCircle className="text-green-500" />
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   if (!vehicle) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">🚗</div>
//           <h1 className="text-2xl font-bold mb-2">Vehicle Not Found</h1>
//           <p className="text-gray-600 mb-6">The vehicle you're looking for doesn't exist.</p>
//           <button
//             onClick={() => router.push('/')}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className="pt-20 pb-12">
//         <div className="section-padding max-w-7xl mx-auto">
//           {/* Back Button */}
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
//           >
//             <FaArrowLeft />
//             <span>Back</span>
//           </button>

//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Left Column - Images & Details */}
//             <div className="lg:col-span-2">
//               {/* Main Image */}
//               <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
//                 <div className="aspect-[16/9] relative">
//                   <img
//                     src={vehicle.images?.[selectedImage]?.data || '/images/vehicle-placeholder.jpg'}
//                     alt={`${vehicle.brand} ${vehicle.model}`}
//                     className="w-full h-full object-cover"
//                   />
                  
//                   {/* Status Badge */}
//                   <div className="absolute top-4 left-4">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       vehicle.isAvailable 
//                         ? 'bg-green-100 text-green-800' 
//                         : 'bg-red-100 text-red-800'
//                     }`}>
//                       {vehicle.isAvailable ? 'Available' : 'Booked'}
//                     </span>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="absolute top-4 right-4 flex gap-2">
//                     <button
//                       onClick={handleFavorite}
//                       className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
//                     >
//                       <FaHeart className={`${isFavorite ? 'text-red-500' : 'text-gray-400'}`} />
//                     </button>
//                     <button
//                       onClick={handleShare}
//                       className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
//                     >
//                       <FaShare className="text-gray-600" />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Thumbnail Images */}
//               {vehicle.images?.length > 1 && (
//                 <div className="grid grid-cols-5 gap-2 mb-6">
//                   {vehicle.images.map((img, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedImage(index)}
//                       className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
//                         selectedImage === index 
//                           ? 'border-blue-600 shadow-md' 
//                           : 'border-transparent hover:border-gray-300'
//                       }`}
//                     >
//                       <img
//                         src={img.data}
//                         alt={`Thumbnail ${index + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* Vehicle Details */}
//               <div className="bg-white rounded-xl shadow-sm p-6">
//                 <div className="flex justify-between items-start mb-6">
//                   <div>
//                     <h1 className="text-3xl font-bold mb-2">
//                       {vehicle.brand} {vehicle.model}
//                     </h1>
//                     <div className="flex items-center gap-4 text-gray-600">
//                       <span>{vehicle.year}</span>
//                       <span>•</span>
//                       <span className="flex items-center gap-1">
//                         <FaMapMarkerAlt className="text-blue-600" />
//                         {vehicle.location}
//                       </span>
//                       <span>•</span>
//                       <span className="flex items-center gap-1">
//                         <FaStar className="text-yellow-400" />
//                         {vehicle.rating || 'New'}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-3xl font-bold text-blue-600">
//                       ₹{vehicle.pricePerDay}
//                       <span className="text-sm text-gray-500 font-normal">/day</span>
//                     </div>
//                     <div className="text-sm text-gray-500 mt-1">
//                       Security deposit: ₹{vehicle.securityDeposit}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Key Specs */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//                   <div className="p-3 bg-gray-50 rounded-lg text-center">
//                     <div className="text-sm text-gray-600">Fuel Type</div>
//                     <div className="font-semibold capitalize">{vehicle.fuelType || 'N/A'}</div>
//                   </div>
//                   <div className="p-3 bg-gray-50 rounded-lg text-center">
//                     <div className="text-sm text-gray-600">Transmission</div>
//                     <div className="font-semibold capitalize">{vehicle.transmission || 'N/A'}</div>
//                   </div>
//                   <div className="p-3 bg-gray-50 rounded-lg text-center">
//                     <div className="text-sm text-gray-600">Seats</div>
//                     <div className="font-semibold">{vehicle.seats || '2'}</div>
//                   </div>
//                   <div className="p-3 bg-gray-50 rounded-lg text-center">
//                     <div className="text-sm text-gray-600">Registration</div>
//                     <div className="font-semibold">{vehicle.registrationNumber}</div>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 {vehicle.description && (
//                   <div className="mb-6">
//                     <h2 className="text-xl font-semibold mb-3">Description</h2>
//                     <p className="text-gray-600">{vehicle.description}</p>
//                   </div>
//                 )}

//                 {/* Features */}
//                 {vehicle.features?.length > 0 && (
//                   <div>
//                     <h2 className="text-xl font-semibold mb-3">Features</h2>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                       {vehicle.features.map((feature, index) => (
//                         <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
//                           {getFeatureIcon(feature)}
//                           <span className="text-sm capitalize">{feature}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Right Column - Owner Info & Booking */}
//             <div className="space-y-6">
//               {/* Owner Card */}
//               <div className="bg-white rounded-xl shadow-sm p-6">
//                 <h2 className="text-xl font-semibold mb-4">Owner Information</h2>
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-2xl font-bold">
//                     {vehicle.owner?.name?.charAt(0) || 'O'}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg">{vehicle.owner?.name || 'Vehicle Owner'}</h3>
//                     <div className="flex items-center gap-1 text-sm text-gray-600">
//                       <FaStar className="text-yellow-400" />
//                       <span>{vehicle.owner?.rating || '4.8'}</span>
//                       <span>•</span>
//                       <span>{vehicle.totalBookings || 0} trips</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <FaPhone className="text-blue-600" />
//                     <span>{vehicle.owner?.phone || '+91 XXXXXXXX'}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <FaEnvelope className="text-blue-600" />
//                     <span>{vehicle.owner?.email || 'email@example.com'}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Pricing Card */}
//               <div className="bg-white rounded-xl shadow-sm p-6">
//                 <h2 className="text-xl font-semibold mb-4">Pricing Details</h2>
//                 <div className="space-y-3 mb-6">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Daily Rate</span>
//                     <span className="font-semibold">₹{vehicle.pricePerDay}</span>
//                   </div>
//                   <div className="flex justify-between pt-3 border-t">
//                     <span className="text-gray-600">Security Deposit</span>
//                     <span className="font-semibold">₹{vehicle.securityDeposit}</span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleBookNow}
//                   disabled={!vehicle.isAvailable}
//                   className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
//                     vehicle.isAvailable
//                       ? 'bg-blue-600 text-white hover:bg-blue-700'
//                       : 'bg-gray-300 text-gray-600 cursor-not-allowed'
//                   }`}
//                 >
//                   {vehicle.isAvailable ? 'Book Now' : 'Currently Unavailable'}
//                 </button>

//                 <div className="mt-4 text-sm text-gray-500 flex items-center gap-2 justify-center">
//                   <FaShieldAlt className="text-green-500" />
//                   <span>Free cancellation • Insured vehicle</span>
//                 </div>
//               </div>

//               {/* Location Card */}
//               <div className="bg-white rounded-xl shadow-sm p-6">
//                 <h2 className="text-xl font-semibold mb-3">Location</h2>
//                 <p className="text-gray-600 mb-2">{vehicle.address || vehicle.location}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Booking Modal */}
//       <BookingModal
//         vehicle={vehicle}
//         isOpen={showBookingModal}
//         onClose={() => setShowBookingModal(false)}
//       />
//     </>
//   )
// }


'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BookingModal from '@/Src/components/BookingModal';
import { FaStar, FaMapMarkerAlt, FaGasPump, FaCogs, FaUserFriends, FaSnowflake, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';

export default function VehicleDetailPage() {
  const { id } = useParams(); // ✅ URL se vehicle id mil jaayegi
  const router = useRouter();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchVehicle();
    }
  }, [id]);

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching vehicle with ID:', id);
      
      const res = await fetch(`/api/vehicles/${id}`);
      const data = await res.json();
      
      if (data.success) {
        setVehicle(data.vehicle);
        console.log('✅ Vehicle loaded:', data.vehicle.brand, data.vehicle.model);
      } else {
        console.error('❌ Vehicle not found');
      }
    } catch (error) {
      console.error('Error fetching vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Vehicle not found</p>
          <button 
            onClick={() => router.back()}
            className="text-blue-600 hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <FaArrowLeft /> Back to {vehicle.vehicleType === 'car' ? 'Cars' : 'Bikes'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Image */}
          <div className="bg-gray-100 rounded-xl overflow-hidden">
            <img 
              src={vehicle.images?.[0]?.data || (vehicle.vehicleType === 'car' ? '/car-placeholder.jpg' : '/bike-placeholder.jpg')}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Right - Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {vehicle.brand} {vehicle.model} {vehicle.year}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-semibold">{vehicle.rating || 4.5}</span>
                <span className="text-gray-500 ml-1">({vehicle.totalBookings || 0} bookings)</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-1" />
                <span>{vehicle.location}</span>
              </div>
            </div>

            {/* Vehicle Type Badge */}
            <div className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
              style={{ background: vehicle.vehicleType === 'car' ? '#dbeafe' : '#fed7aa', color: vehicle.vehicleType === 'car' ? '#1e40af' : '#92400e' }}
            >
              {vehicle.vehicleType === 'car' ? '🚗 CAR' : '🏍️ BIKE'}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                <FaGasPump className="text-gray-500" />
                <span className="capitalize">{vehicle.fuelType || 'Petrol'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCogs className="text-gray-500" />
                <span className="capitalize">{vehicle.transmission || 'Manual'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUserFriends className="text-gray-500" />
                <span>{vehicle.seats} Seater</span>
              </div>
              <div className="flex items-center gap-2">
                <FaSnowflake className="text-gray-500" />
                <span>AC</span>
              </div>
            </div>

            {/* Features List */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Key Features</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((feature, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {vehicle.description && (
              <p className="text-gray-600 mb-6">{vehicle.description}</p>
            )}

            {/* Registration & Insurance */}
            <div className="border-t pt-4 mb-6">
              <div className="flex gap-4 text-sm text-gray-500">
                <span>🔢 Reg: {vehicle.registrationNumber}</span>
                {vehicle.insuranceValidUntil && (
                  <span>🛡️ Insurance: Valid till {new Date(vehicle.insuranceValidUntil).toLocaleDateString()}</span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="border-t pt-6 mb-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-blue-600">₹{vehicle.pricePerDay}</span>
                <span className="text-gray-500">/ day</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>🔒 Security Deposit: ₹{vehicle.securityDeposit || 5000}</span>
                <span>✅ Insurance included</span>
              </div>
              {vehicle.pricePerWeek && (
                <div className="text-sm text-green-600">
                  Weekly deal: ₹{vehicle.pricePerWeek}/week
                </div>
              )}
            </div>

            {/* Book Button - Yahan se modal khulega with correct vehicle */}
            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Book Now - ₹{vehicle.pricePerDay}/day
            </button>

            {/* Important Notes */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800">
              <p className="font-semibold">📋 Important:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Valid driving license required</li>
                <li>Original ID proof needed at pickup</li>
                <li>Fuel not included in rental price</li>
                <li>Free cancellation up to 24 hours before pickup</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Booking Modal - Sahi vehicle pass ho raha hai */}
      {showBookingModal && (
        <BookingModal 
          vehicle={vehicle}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </>
  );
}