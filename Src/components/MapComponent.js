// 'use client'

// import { useEffect, useRef } from 'react'

// export default function MapComponent({ locations = [] }) {
//   const mapRef = useRef(null)
//   const googleMapRef = useRef(null)

//   useEffect(() => {
//     // This is a placeholder for Google Maps integration
//     // In production, you would initialize Google Maps here
    
//     const initMap = () => {
//       // Mock map initialization
//       const mapElement = mapRef.current
//       if (mapElement) {
//         // For demo purposes, we'll just show a static image
//         // In real implementation, initialize Google Maps API
//         console.log('Map would be initialized here with locations:', locations)
//       }
//     }

//     // Load Google Maps script
//     const loadGoogleMaps = () => {
//       if (!window.google) {
//         const script = document.createElement('script')
//         script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`
//         script.async = true
//         script.defer = true
//         script.onload = initMap
//         document.head.appendChild(script)
//       } else {
//         initMap()
//       }
//     }

//     // For demo, we'll just simulate map loading
//     const timer = setTimeout(() => {
//       console.log('Map loaded (simulated)')
//     }, 1000)

//     return () => clearTimeout(timer)
//   }, [locations])

//   return (
//     <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
//       <div 
//         ref={mapRef} 
//         className="w-full h-64 md:h-96 relative"
//       >
//         {/* Static map image for demo */}
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center">
//           <div className="text-center">
//             <div className="text-4xl mb-4">🗺️</div>
//             <div className="text-gray-600 font-semibold">Interactive Map</div>
//             <p className="text-gray-500 text-sm mt-2">
//               Google Maps integration will show here
//             </p>
            
//             {/* Mock locations */}
//             <div className="mt-6 grid grid-cols-2 gap-4">
//               {locations.slice(0, 4).map((location, index) => (
//                 <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
//                   <div className="font-medium">{location.name}</div>
//                   <div className="text-sm text-gray-500">{location.address}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Map Controls */}
//       <div className="p-4 bg-white border-t">
//         <div className="flex flex-wrap gap-3">
//           <button className="px-4 py-2 bg-[--color-primary-600] text-white rounded-lg text-sm">
//             My Location
//           </button>
//           <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
//             Pickup Points
//           </button>
//           <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
//             Service Areas
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'

import { useEffect, useRef, useState } from 'react'
import { FaMapMarkerAlt, FaLocationArrow, FaSearch } from 'react-icons/fa'

export default function MapComponent({ 
  onLocationSelect, 
  userLocation, 
  pickupLocation,
  returnLocation,
  showSearch = true 
}) {
  const mapRef = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [mapType, setMapType] = useState('pickup') // 'pickup' or 'return'

  const locations = [
    { id: 1, name: 'Connaught Place', address: 'Delhi', lat: 28.6304, lng: 77.2177, type: 'pickup' },
    { id: 2, name: 'Aerocity', address: 'Delhi', lat: 28.5555, lng: 77.0950, type: 'pickup' },
    { id: 3, name: 'Cyber City', address: 'Gurugram', lat: 28.4961, lng: 77.0883, type: 'pickup' },
    { id: 4, name: 'Sector 29', address: 'Gurugram', lat: 28.4800, lng: 77.0667, type: 'pickup' },
    { id: 5, name: 'Sector 62', address: 'Noida', lat: 28.6292, lng: 77.3742, type: 'pickup' }
  ]

  const handleLocationClick = (location) => {
    setSelectedLocation(location)
    if (onLocationSelect) {
      onLocationSelect(`${location.name}, ${location.address}`, `${location.name}, ${location.address}`, mapType)
    }
  }

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            name: 'My Location',
            address: 'Current Location',
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setSelectedLocation(location)
          if (onLocationSelect) {
            onLocationSelect('current', 'Current Location', mapType)
          }
        },
        (error) => {
          alert('Unable to get your location. Please enable location services.')
        }
      )
    }
  }

  const filteredLocations = locations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-full flex flex-col">
      {/* Map Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`px-4 py-2 rounded-lg cursor-pointer ${mapType === 'pickup' ? 'bg-[--color-primary-600] text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setMapType('pickup')}>
              Pickup
            </div>
            <div className={`px-4 py-2 rounded-lg cursor-pointer ${mapType === 'return' ? 'bg-[--color-primary-600] text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setMapType('return')}>
              Return
            </div>
          </div>
          {selectedLocation && (
            <div className="text-sm text-gray-600">
              Selected: <span className="font-semibold">{selectedLocation.name}</span>
            </div>
          )}
        </div>
        <button
          onClick={handleCurrentLocation}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <FaLocationArrow />
          Use Current Location
        </button>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-gray-100">
        {/* Mock Interactive Map */}
        <div className="absolute inset-0">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, #000 1px, transparent 1px),
                linear-gradient(to bottom, #000 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />

          {/* User Location Marker */}
          {userLocation && (
            <div className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: '50%', top: '50%' }}>
              <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center text-white">
                <FaLocationArrow />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs bg-white px-2 py-1 rounded shadow">
                Your Location
              </div>
            </div>
          )}

          {/* Location Markers */}
          {locations.map((location, index) => {
            // Calculate positions for markers
            const left = 20 + (index * 20) % 80
            const top = 20 + Math.floor(index / 3) * 30
            
            return (
              <div
                key={location.id}
                className={`absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125 ${selectedLocation?.id === location.id ? 'z-10' : ''}`}
                style={{ left: `${left}%`, top: `${top}%` }}
                onClick={() => handleLocationClick(location)}
              >
                <div className={`w-full h-full rounded-full flex items-center justify-center ${selectedLocation?.id === location.id ? 'bg-red-500 text-white' : 'bg-white text-red-500 border-2 border-red-500'}`}>
                  <FaMapMarkerAlt className={selectedLocation?.id === location.id ? 'text-white' : 'text-red-500'} />
                </div>
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap text-xs px-2 py-1 rounded shadow transition-all ${selectedLocation?.id === location.id ? 'bg-red-500 text-white visible' : 'bg-white text-gray-700 invisible opacity-0 hover:visible hover:opacity-100'}`}>
                  {location.name}
                </div>
              </div>
            )
          })}

          {/* Roads */}
          <div className="absolute w-4/5 h-1 bg-gray-400 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute w-1 h-4/5 bg-gray-400 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Loading Overlay */}
        {!mapLoaded && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[--color-primary-600] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-gray-600">Loading map...</div>
            </div>
          </div>
        )}

        {/* Selected Location Info */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FaMapMarkerAlt className="text-red-500" />
                  <h3 className="font-semibold">{selectedLocation.name}</h3>
                </div>
                <p className="text-gray-600 text-sm">{selectedLocation.address}</p>
              </div>
              <button
                onClick={() => {
                  if (onLocationSelect) {
                    onLocationSelect(selectedLocation.name, `${selectedLocation.name}, ${selectedLocation.address}`, mapType)
                  }
                }}
                className="px-4 py-2 bg-[--color-primary-600] text-white rounded-lg hover:bg-[--color-primary-700]"
              >
                Select {mapType === 'pickup' ? 'Pickup' : 'Return'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Location List */}
      <div className="border-t bg-white">
        <div className="p-4">
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent"
            />
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedLocation?.id === location.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
                onClick={() => handleLocationClick(location)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedLocation?.id === location.id ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <FaMapMarkerAlt />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm text-gray-500">{location.address}</div>
                  </div>
                  <div className="text-xs px-2 py-1 bg-gray-100 rounded">
                    {location.type === 'pickup' ? 'Pickup' : 'Both'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}