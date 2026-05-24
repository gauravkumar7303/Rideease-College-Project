'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  FaUser, 
  FaIdCard, 
  FaCalendarAlt, 
  FaCar, 
  FaMotorcycle, 
  FaStar,
  FaEdit,
  FaCheck,
  FaTimes,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaHistory,
  FaTrash,
  FaEye,
  FaDownload,
  FaPlus,
  FaRupeeSign,
  FaSignOutAlt,
  FaHeart,
  FaBell,
  FaEnvelope,
  FaCrown,
  FaRocket
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { getCurrentUser, isAuthenticated } from '@/Src/utils/auth'
import { vehicleAPI } from '@/Src/utils/api'

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [vehicles, setVehicles] = useState([])
  const [vehiclesLoading, setVehiclesLoading] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: 'Delhi, India',
    dob: '1998-05-15',
    licenseNumber: 'DL04 20230012345',
    licenseExpiry: '2030-12-31'
  })

  const [bookings, setBookings] = useState([])
  const [activeTab, setActiveTab] = useState('bookings')

  // Check authentication first
  useEffect(() => {
    if (!isAuthenticated()) {
      console.log('❌ Not authenticated, redirecting to login')
      router.push('/auth')
      return
    }

    // Load user data
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setUserData(prev => ({
        ...prev,
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || ''
      }))
      
      // Fetch user's vehicles
      fetchUserVehicles(currentUser._id)
    }

    // Load bookings from localStorage (temporary)
    const savedBookings = JSON.parse(localStorage.getItem('rideease_bookings') || '[]')
    setBookings(savedBookings)
    setLoading(false)
  }, [router])

  // Fetch user's vehicles from database
  const fetchUserVehicles = async (ownerId) => {
    if (!ownerId) return
    
    setVehiclesLoading(true)
    try {
      console.log('📦 Fetching vehicles for owner:', ownerId)
      const response = await vehicleAPI.getOwnerVehicles(ownerId)
      
      console.log('📥 API Response:', response)
      
      if (response.success) {
        setVehicles(response.vehicles || [])
        console.log(`✅ Loaded ${response.vehicles.length} vehicles`)
      }
    } catch (error) {
      console.error('❌ Error fetching vehicles:', error)
      toast.error('Failed to load your vehicles')
    } finally {
      setVehiclesLoading(false)
    }
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Save to localStorage
      localStorage.setItem('rideease_profile', JSON.stringify(userData))
      toast.success('Profile updated successfully!')
    }
    setIsEditing(!isEditing)
  }

  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value
    })
  }

  const handleRating = (bookingId, rating) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, rating } : booking
    ))
    toast.success('Rating submitted!')
  }

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== bookingId))
      toast.success('Booking cancelled successfully!')
    }
  }

  const handleDownloadInvoice = (booking) => {
    toast.success(`Invoice for ${booking.vehicle?.name || 'Vehicle'} downloaded!`)
  }

  const handleEditVehicle = (vehicleId) => {
    router.push(`/edit-vehicle/${vehicleId}`)
  }

  const handleDeleteVehicle = async (vehicleId) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return
    
    try {
      const response = await vehicleAPI.delete(vehicleId)
      if (response.success) {
        toast.success('Vehicle deleted successfully')
        // Refresh vehicles list
        if (user) fetchUserVehicles(user._id)
      }
    } catch (error) {
      toast.error('Failed to delete vehicle')
    }
  }

  const handleViewVehicle = (vehicleId) => {
    router.push(`/vehicles/${vehicleId}`)
  }

  const handleLogout = () => {
    localStorage.removeItem('rideease_user')
    localStorage.removeItem('rideease_token')
    toast.success('Logged out successfully!')
    router.push('/auth')
  }

  const kycStatus = {
    drivingLicense: { status: 'verified', icon: <FaCheck className="text-green-500" /> },
    aadhaarCard: { status: 'verified', icon: <FaCheck className="text-green-500" /> },
    panCard: { status: 'pending', icon: <FaTimes className="text-yellow-500" /> }
  }

  const calculateStats = () => {
    const totalBookings = bookings.length
    const totalSpent = bookings.reduce((sum, b) => sum + (b.total || 0), 0)
    const averageRating = bookings.filter(b => b.rating).length > 0 
      ? (bookings.filter(b => b.rating).reduce((sum, b) => sum + (b.rating || 0), 0) / bookings.filter(b => b.rating).length).toFixed(1)
      : 0
    
    // Vehicle stats
    const totalVehicles = vehicles.length
    const verifiedVehicles = vehicles.filter(v => v.isVerified).length
    const totalEarnings = vehicles.reduce((sum, v) => sum + (v.totalEarnings || 0), 0)
    
    return { totalBookings, totalSpent, averageRating, totalVehicles, verifiedVehicles, totalEarnings }
  }

  const stats = calculateStats()

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'upcoming')
  const completedBookings = bookings.filter(b => b.status === 'completed')
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled')

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  // If not authenticated, don't render anything (redirect happens in useEffect)
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 pt-24 pb-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="section-padding max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* User Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-6"
            >
              <div className="relative">
                <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-4 border-white/50 shadow-xl">
                  <span className="text-5xl font-bold text-white">
                    {userData.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-gray-900 text-xs px-3 py-1.5 rounded-full font-bold shadow-lg flex items-center gap-1">
                  <FaCrown className="text-sm" />
                  {user?.userType?.toUpperCase() || 'USER'}
                </div>
              </div>
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{userData.name || user?.name}</h1>
                <p className="text-emerald-100 flex items-center gap-2 mb-1">
                  <FaEnvelope className="text-emerald-200" />
                  {userData.email || user?.email}
                </p>
                <p className="text-emerald-100 flex items-center gap-2">
                  <FaPhone className="text-emerald-200" />
                  {userData.phone || 'Not provided'}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    Member since {new Date().getFullYear()}
                  </span>
                  {user?.userType === 'owner' && (
                    <span className="bg-emerald-500/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {stats.verifiedVehicles}/{stats.totalVehicles} Verified
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => router.push('/add-vehicle')}
                className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors flex items-center gap-2 shadow-lg"
              >
                <FaPlus />
                List Vehicle
              </button>
              <button
                onClick={handleEditToggle}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors flex items-center gap-2 border border-white/30"
              >
                {isEditing ? <FaCheck /> : <FaEdit />}
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Cards - Moved below hero */}
      <div className="section-padding max-w-7xl mx-auto -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <FaHistory className="text-emerald-600 text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg Rating</p>
                <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <FaStar className="text-yellow-500 text-xl" />
              </div>
            </div>
          </motion.div>

          {user?.userType === 'owner' ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Vehicles</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalVehicles}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FaCar className="text-purple-600 text-xl" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Earnings</p>
                    <p className="text-3xl font-bold text-gray-900">₹{stats.totalEarnings}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FaRupeeSign className="text-green-600 text-xl" />
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Spent</p>
                    <p className="text-3xl font-bold text-gray-900">₹{stats.totalSpent}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FaRupeeSign className="text-blue-600 text-xl" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Member Since</p>
                    <p className="text-3xl font-bold text-gray-900">2024</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FaCalendarAlt className="text-orange-600 text-xl" />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          {['bookings', 'documents', 'vehicles'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab === 'vehicles' && user?.userType === 'owner' 
                ? `My Vehicles (${vehicles.length})` 
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Same as before */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h2 className="text-2xl font-bold mb-6">Booking History</h2>
                
                {/* Booking Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      activeTab === 'bookings' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All ({bookings.length})
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg font-medium ${
                      false ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Upcoming ({upcomingBookings.length})
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg font-medium ${
                      false ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Completed ({completedBookings.length})
                  </button>
                </div>

                {/* Booking List */}
                <div className="space-y-4">
                  {bookings.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">📋</div>
                      <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
                      <p className="text-gray-600 mb-6">Start your first booking today!</p>
                      <button
                        onClick={() => router.push('/')}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
                      >
                        Browse Vehicles
                      </button>
                    </div>
                  ) : (
                    bookings.map((booking) => (
                      <div
                        key={booking.id || Math.random()}
                        className="border rounded-xl p-6 hover:shadow-md transition-shadow"
                      >
                        {/* Booking card content - same as before */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-4">
                            {booking.vehicle?.type === 'car' ? 
                              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <FaCar className="text-2xl text-emerald-600" />
                              </div> : 
                              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <FaMotorcycle className="text-2xl text-emerald-600" />
                              </div>
                            }
                            <div>
                              <div className="font-semibold text-lg">{booking.vehicle?.name || 'Vehicle'}</div>
                              <div className="text-sm text-gray-500">
                                Booking ID: {booking.id || 'N/A'} • {new Date(booking.bookingDate || Date.now()).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'confirmed' || booking.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status || 'confirmed'}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-emerald-500 mt-1" />
                            <div>
                              <div className="text-sm text-gray-600">Pickup</div>
                              <div className="font-medium">{booking.pickupLocation || 'Not specified'}</div>
                              <div className="text-sm text-gray-500">
                                {booking.pickupDate ? new Date(booking.pickupDate).toLocaleString() : 'Date not set'}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-red-500 mt-1" />
                            <div>
                              <div className="text-sm text-gray-600">Return</div>
                              <div className="font-medium">{booking.returnLocation || 'Same as pickup'}</div>
                              <div className="text-sm text-gray-500">
                                {booking.returnDate ? new Date(booking.returnDate).toLocaleString() : 'Date not set'}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t">
                          <div>
                            <div className="text-2xl font-bold text-emerald-600">
                              ₹{booking.total || 0}
                            </div>
                            <div className="text-sm text-gray-500">Total Amount</div>
                          </div>
                          
                          <div className="flex gap-2">
                            {booking.status === 'confirmed' && (
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2 text-sm"
                              >
                                <FaTrash />
                                Cancel
                              </button>
                            )}
                            
                            <button
                              onClick={() => handleDownloadInvoice(booking)}
                              className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 flex items-center gap-2 text-sm"
                            >
                              <FaDownload />
                              Invoice
                            </button>
                            
                            <button
                              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
                            >
                              <FaEye />
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h2 className="text-2xl font-bold mb-6">My Documents</h2>
                
                {/* KYC Status */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-3">
                    <FaShieldAlt className="text-emerald-600" />
                    KYC Status
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries(kycStatus).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3">
                          <FaIdCard className="text-gray-500" />
                          <div>
                            <div className="font-medium capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className={`text-sm ${value.status === 'verified' ? 'text-green-600' : 'text-yellow-600'}`}>
                              {value.status.charAt(0).toUpperCase() + value.status.slice(1)}
                            </div>
                          </div>
                        </div>
                        {value.icon}
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors">
                    Complete KYC Verification
                  </button>
                </div>

                {/* Driving License */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Driving License</h3>
                  <div className="border rounded-xl p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">License Number</div>
                        <div className="font-medium">{userData.licenseNumber}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Expiry Date</div>
                        <div className="font-medium">{userData.licenseExpiry}</div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50">
                        View Document
                      </button>
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                        Upload New
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Vehicles Tab */}
            {activeTab === 'vehicles' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">My Vehicles</h2>
                  <button
                    onClick={() => router.push('/add-vehicle')}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                  >
                    <FaPlus />
                    Add Vehicle
                  </button>
                </div>
                
                {vehiclesLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                  </div>
                ) : vehicles.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚗</div>
                    <h3 className="text-xl font-semibold mb-2">No Vehicles Listed</h3>
                    <p className="text-gray-600 mb-6">Start earning by listing your vehicle for rent</p>
                    <button
                      onClick={() => router.push('/add-vehicle')}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700"
                    >
                      List Your First Vehicle
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {vehicles.map((vehicle) => (
                      <div
                        key={vehicle._id}
                        className="border rounded-xl p-5 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Vehicle Image */}
                          <div className="w-full md:w-32 h-32 bg-gray-100 rounded-xl overflow-hidden">
                            {vehicle.images && vehicle.images.length > 0 ? (
                              <img 
                                src={vehicle.images.find(img => img.isPrimary)?.data || vehicle.images[0]?.data} 
                                alt={`${vehicle.brand} ${vehicle.model}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                {vehicle.vehicleType === 'car' ? 
                                  <FaCar className="text-4xl text-gray-400" /> : 
                                  <FaMotorcycle className="text-4xl text-gray-400" />
                                }
                              </div>
                            )}
                          </div>
                          
                          {/* Vehicle Details */}
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                  {vehicle.brand} {vehicle.model} ({vehicle.year})
                                </h3>
                                <p className="text-sm text-gray-600 font-mono">
                                  {vehicle.registrationNumber}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  vehicle.isVerified 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {vehicle.isVerified ? '✓ Verified' : '⏳ Pending'}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  vehicle.isAvailable 
                                    ? 'bg-emerald-100 text-emerald-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {vehicle.isAvailable ? 'Available' : 'Unavailable'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                              <div className="bg-gray-50 p-2 rounded-lg">
                                <div className="text-xs text-gray-500">Price/Day</div>
                                <div className="font-bold text-emerald-600">₹{vehicle.pricePerDay}</div>
                              </div>
                              <div className="bg-gray-50 p-2 rounded-lg">
                                <div className="text-xs text-gray-500">Location</div>
                                <div className="font-medium text-sm">{vehicle.location}</div>
                              </div>
                              <div className="bg-gray-50 p-2 rounded-lg">
                                <div className="text-xs text-gray-500">Fuel</div>
                                <div className="font-medium text-sm capitalize">{vehicle.fuelType}</div>
                              </div>
                              <div className="bg-gray-50 p-2 rounded-lg">
                                <div className="text-xs text-gray-500">Transmission</div>
                                <div className="font-medium text-sm capitalize">{vehicle.transmission}</div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-4 pt-3 border-t">
                              <div className="text-sm">
                                <span className="font-bold text-emerald-600">₹{vehicle.totalEarnings || 0}</span>
                                <span className="text-gray-600 ml-1">earnings</span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleViewVehicle(vehicle._id)}
                                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1"
                                >
                                  <FaEye /> View
                                </button>
                                <button
                                  onClick={() => handleEditVehicle(vehicle._id)}
                                  className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-1"
                                >
                                  <FaEdit /> Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteVehicle(vehicle._id)}
                                  className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-1"
                                >
                                  <FaTrash /> Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Sidebar - Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FaHistory className="text-emerald-600" />
                  </div>
                  <span className="flex-1 text-left">My Bookings</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                    {bookings.length}
                  </span>
                </button>
                
                <button 
                  onClick={() => router.push('/add-vehicle')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FaCar className="text-emerald-600" />
                  </div>
                  <span className="flex-1 text-left">List Your Vehicle</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                    Earn
                  </span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('documents')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FaIdCard className="text-emerald-600" />
                  </div>
                  <span>My Documents</span>
                </button>

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors mt-4 border border-red-200"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <FaSignOutAlt className="text-red-600" />
                  </div>
                  <span className="text-red-600 font-medium">Logout</span>
                </button>
              </div>
            </motion.div>

            {/* Personal Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-bold mb-4">Personal Info</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="font-medium">{userData.name || 'Not set'}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-xs text-gray-500">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="font-medium">{userData.email || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="font-medium">{userData.phone || 'Not set'}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}