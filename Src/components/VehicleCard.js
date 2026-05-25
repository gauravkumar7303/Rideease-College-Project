// //Path: Src/components/VehicleCard.js
// // 'use client'

// // import { FaStar, FaMapMarkerAlt, FaGasPump, FaCogs, FaUserFriends, FaSnowflake } from 'react-icons/fa'
// // import { toast } from 'react-toastify'

// // export default function VehicleCard({ vehicle, onBookNow }) {
// //   const getVehicleIcon = (type) => {
// //     return type === 'car' ? '🚗' : '🏍️'
// //   }

// //   const getFeatureIcon = (feature) => {
// //     switch(feature.toLowerCase()) {
// //       case 'petrol':
// //       case 'diesel':
// //       case 'electric':
// //         return <FaGasPump className="text-gray-500" />
// //       case 'manual':
// //       case 'automatic':
// //         return <FaCogs className="text-gray-500" />
// //       case 'ac':
// //         return <FaSnowflake className="text-gray-500" />
// //       case '5 seater':
// //       case '7 seater':
// //         return <FaUserFriends className="text-gray-500" />
// //       default:
// //         return <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
// //     }
// //   }

// //   const handleFavorite = (e) => {
// //     e.stopPropagation()
// //     toast.success('Added to favorites!')
// //   }

// //   return (
// //     <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
// //       {/* Image Section */}
// //       <div className="relative overflow-hidden">
// //         <img 
// //           src={vehicle.image} 
// //           alt={`${vehicle.brand} ${vehicle.model}`}
// //           className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
// //         />
        
// //         {/* Badges */}
// //         <div className="absolute top-3 left-3">
// //           <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
// //             vehicle.type === 'car' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
// //           }`}>
// //             {getVehicleIcon(vehicle.type)} {vehicle.type.toUpperCase()}
// //           </span>
// //         </div>
        
// //         <div className="absolute top-3 right-3">
// //           <button 
// //             onClick={handleFavorite}
// //             className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center 
// //                      hover:bg-white hover:scale-110 transition-all"
// //           >
// //             ♡
// //           </button>
// //         </div>

// //         {/* Quick View Overlay */}
// //         <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
// //                        transition-opacity duration-300 flex items-center justify-center">
// //           <button 
// //             onClick={() => onBookNow(vehicle.id)}
// //             className="bg-[--color-primary-600] text-white px-6 py-3 rounded-lg hover:bg-[--color-primary-700] transition-colors transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
// //           >
// //             Quick View
// //           </button>
// //         </div>
// //       </div>

// //       {/* Content Section */}
// //       <div className="p-5">
// //         <div className="flex justify-between items-start mb-3">
// //           <div>
// //             <h3 className="text-lg font-bold text-gray-900 group-hover:text-[--color-primary-600] transition-colors">
// //               {vehicle.brand} {vehicle.model}
// //             </h3>
// //             <div className="flex items-center mt-1">
// //               <FaMapMarkerAlt className="text-gray-400 text-sm mr-1" />
// //               <span className="text-sm text-gray-500">{vehicle.location}</span>
// //             </div>
// //           </div>
// //           <div className="flex items-center">
// //             <FaStar className="text-yellow-400 mr-1" />
// //             <span className="font-semibold">{vehicle.rating}</span>
// //           </div>
// //         </div>

// //         {/* Features */}
// //         <div className="flex flex-wrap gap-2 mb-4">
// //           {vehicle.features.slice(0, 3).map((feature, index) => (
// //             <div 
// //               key={index} 
// //               className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-sm"
// //             >
// //               {getFeatureIcon(feature)}
// //               <span className="text-gray-600">{feature}</span>
// //             </div>
// //           ))}
// //           {vehicle.features.length > 3 && (
// //             <span className="text-gray-500 text-sm">
// //               +{vehicle.features.length - 3} more
// //             </span>
// //           )}
// //         </div>

// //         {/* Price & Action */}
// //         <div className="flex justify-between items-center pt-4 border-t">
// //           <div>
// //             <div className="text-2xl font-bold text-[--color-primary-600]">
// //               ₹{vehicle.price}
// //               <span className="text-sm text-gray-500 font-normal">/day</span>
// //             </div>
// //             {vehicle.originalPrice && (
// //               <div className="text-sm text-gray-400 line-through">
// //                 ₹{vehicle.originalPrice}
// //               </div>
// //             )}
// //           </div>
// //           <button 
// //             onClick={() => onBookNow(vehicle.id)}
// //             className="bg-[--color-primary-600] text-white px-6 py-2 rounded-lg hover:bg-[--color-primary-700] transition-colors"
// //           >
// //             Book Now
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// //Path:Src/components/VehicleCard.js
// 'use client';

// import { useRouter } from 'next/navigation';
// import { FaStar, FaMapMarkerAlt, FaGasPump, FaCogs, FaUserFriends, FaSnowflake } from 'react-icons/fa';

// export default function VehicleCard({ vehicle, onBookNow }) {
//   const router = useRouter();

//   const handleCardClick = () => {
//     // ✅ Correct way - vehicle._id se detail page pe jao
//     router.push(`/vehicles/${vehicle._id}`);
//   };

//   const handleBookClick = (e) => {
//     e.stopPropagation(); // Card click ko rokta hai
//     if (onBookNow) {
//       onBookNow(vehicle._id); // ✅ Sahi ID pass kar raha hai
//     } else {
//       router.push(`/vehicles/${vehicle._id}`);
//     }
//   };

//   const getVehicleIcon = (type) => {
//     return type === 'car' ? '🚗' : '🏍️';
//   };

//   return (
//     <div 
//       onClick={handleCardClick}
//       className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group cursor-pointer"
//     >
//       {/* Image Section */}
//       <div className="relative overflow-hidden">
//         <img 
//           src={vehicle.images?.[0]?.data || (vehicle.vehicleType === 'car' ? '/car-placeholder.jpg' : '/bike-placeholder.jpg')} 
//           alt={`${vehicle.brand} ${vehicle.model}`}
//           className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//         />
        
//         {/* Badges */}
//         <div className="absolute top-3 left-3">
//           <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//             vehicle.vehicleType === 'car' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
//           }`}>
//             {getVehicleIcon(vehicle.vehicleType)} {vehicle.vehicleType?.toUpperCase()}
//           </span>
//         </div>

//         {/* Price Badge */}
//         <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-semibold">
//           ₹{vehicle.pricePerDay}/day
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="p-5">
//         <div className="flex justify-between items-start mb-3">
//           <div>
//             <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//               {vehicle.brand} {vehicle.model}
//             </h3>
//             <div className="flex items-center mt-1">
//               <FaMapMarkerAlt className="text-gray-400 text-sm mr-1" />
//               <span className="text-sm text-gray-500">{vehicle.location}</span>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <FaStar className="text-yellow-400 mr-1" />
//             <span className="font-semibold">{vehicle.rating || 4.5}</span>
//           </div>
//         </div>

//         {/* Features */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           {vehicle.features?.slice(0, 3).map((feature, index) => (
//             <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
//               {feature}
//             </span>
//           ))}
//           {vehicle.features?.length > 3 && (
//             <span className="text-xs text-gray-500">+{vehicle.features.length - 3}</span>
//           )}
//         </div>

//         {/* Action */}
//         <div className="flex justify-between items-center pt-4 border-t">
//           <div>
//             <div className="text-sm text-gray-500 line-through">
//               ₹{vehicle.originalPrice}
//             </div>
//           </div>
//           <button 
//             onClick={handleBookClick}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
//           >
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useRouter } from 'next/navigation';
import { FaStar, FaMapMarkerAlt, FaGasPump, FaCogs, FaUserFriends, FaSnowflake } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function VehicleCard({ vehicle, onBookNow }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/vehicles/${vehicle._id}`);
  };

  const handleBookClick = (e) => {
    e.stopPropagation();
    if (onBookNow) {
      onBookNow(vehicle._id);
    } else {
      router.push(`/vehicles/${vehicle._id}`);
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    toast.success('Added to favorites!');
  };

  const getVehicleIcon = (type) => {
    return type === 'car' ? '🚗' : '🏍️';
  };

  const getFeatureIcon = (feature) => {
    const featureLower = feature.toLowerCase();
    if (featureLower === 'petrol' || featureLower === 'diesel' || featureLower === 'electric' || featureLower === 'cng') {
      return <FaGasPump className="text-gray-500" size={12} />;
    }
    if (featureLower === 'manual' || featureLower === 'automatic') {
      return <FaCogs className="text-gray-500" size={12} />;
    }
    if (featureLower === 'ac' || featureLower === 'air conditioning') {
      return <FaSnowflake className="text-gray-500" size={12} />;
    }
    if (featureLower.includes('seater')) {
      return <FaUserFriends className="text-gray-500" size={12} />;
    }
    return null;
  };

  // Get features array from vehicle
  const featuresList = vehicle.features || [];
  
  // Format price display
  const displayPrice = vehicle.pricePerDay || vehicle.price || 0;
  const displayOriginalPrice = vehicle.originalPrice || null;

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img 
          src={vehicle.images?.[0]?.data || (vehicle.vehicleType === 'car' ? '/car-placeholder.jpg' : '/bike-placeholder.jpg')} 
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            vehicle.vehicleType === 'car' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
          }`}>
            {getVehicleIcon(vehicle.vehicleType)} {vehicle.vehicleType?.toUpperCase()}
          </span>
        </div>
        
        {/* Favorite Button */}
        <div className="absolute top-3 right-3">
          <button 
            onClick={handleFavorite}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center 
                     hover:bg-white hover:scale-110 transition-all"
          >
            ♡
          </button>
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                       transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={handleBookClick}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            Quick View
          </button>
        </div>

        {/* Price Badge - Bottom Right */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-semibold backdrop-blur-sm">
          ₹{displayPrice}/day
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {vehicle.brand} {vehicle.model}
            </h3>
            <div className="flex items-center mt-1">
              <FaMapMarkerAlt className="text-gray-400 text-sm mr-1" />
              <span className="text-sm text-gray-500">{vehicle.location}</span>
            </div>
          </div>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="font-semibold">{vehicle.rating || 4.5}</span>
          </div>
        </div>

        {/* Features with Icons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {featuresList.slice(0, 3).map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs"
            >
              {getFeatureIcon(feature)}
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
          {featuresList.length > 3 && (
            <span className="text-gray-500 text-xs">
              +{featuresList.length - 3} more
            </span>
          )}
        </div>

        {/* Price & Action */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              ₹{displayPrice}
              <span className="text-sm text-gray-500 font-normal ml-1">/day</span>
            </div>
            {displayOriginalPrice && (
              <div className="text-sm text-gray-400 line-through">
                ₹{displayOriginalPrice}
              </div>
            )}
          </div>
          <button 
            onClick={handleBookClick}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}