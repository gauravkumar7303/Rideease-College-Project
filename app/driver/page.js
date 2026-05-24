/*app/driver/page.js*/
'use client'

import { useState, useEffect } from 'react'
import { 
  FaCar, 
  FaUser, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaPhone,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaRupeeSign,
  FaChartLine,
  FaBell,
  FaWallet
} from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function DriverPortal() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [driverData, setDriverData] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 9876543210',
    rating: 4.8,
    totalEarnings: 125400,
    completedRides: 345,
    available: true,
    currentLocation: 'Delhi - Connaught Place',
    vehicle: {
      type: 'car',
      brand: 'Hyundai',
      model: 'Creta SX',
      license: 'DL8C AB1234'
    }
  })

  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: 'Gaurav Kumar',
      pickup: 'Delhi - Connaught Place',
      destination: 'Gurugram - Cyber City',
      time: '10:00 AM',
      date: '2024-11-05',
      status: 'upcoming',
      amount: 1500,
      customerPhone: '+91 9876543210'
    },
    {
      id: 2,
      customerName: 'Priya Sharma',
      pickup: 'Delhi - Aerocity',
      destination: 'Noida - Sector 62',
      time: '2:30 PM',
      date: '2024-11-05',
      status: 'upcoming',
      amount: 2200,
      customerPhone: '+91 9876543211'
    },
    {
      id: 3,
      customerName: 'Amit Patel',
      pickup: 'Gurugram - Sector 29',
      destination: 'Delhi - CP',
      time: 'Yesterday, 5:00 PM',
      date: '2024-11-04',
      status: 'completed',
      amount: 1800,
      rating: 5,
      customerPhone: '+91 9876543212'
    }
  ])

  const [earnings, setEarnings] = useState([
    { month: 'Oct 2024', amount: 28500, rides: 42 },
    { month: 'Sep 2024', amount: 32400, rides: 48 },
    { month: 'Aug 2024', amount: 29800, rides: 45 },
    { month: 'Jul 2024', amount: 26700, rides: 40 }
  ])

  const handleStatusChange = (bookingId, status) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status } : booking
    ))
    toast.success(`Booking ${status === 'accepted' ? 'accepted' : 'rejected'}!`)
  }

  const handleAvailabilityToggle = () => {
    setDriverData(prev => ({
      ...prev,
      available: !prev.available
    }))
    toast.success(`You are now ${!driverData.available ? 'available' : 'unavailable'}`)
  }

  const calculateTodayEarnings = () => {
    return bookings
      .filter(b => b.date === '2024-11-05' && b.status === 'completed')
      .reduce((sum, b) => sum + b.amount, 0)
  }

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming')
  const completedBookings = bookings.filter(b => b.status === 'completed')

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Driver Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <FaUser className="text-3xl" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{driverData.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-300" />
                    <span className="font-semibold">{driverData.rating}</span>
                    <span className="opacity-80">({driverData.completedRides} rides)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCar />
                    <span>{driverData.vehicle.brand} {driverData.vehicle.model}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm opacity-90">
                  <FaMapMarkerAlt />
                  <span>Currently at: {driverData.currentLocation}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleAvailabilityToggle}
                className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${driverData.available ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
              >
                {driverData.available ? <FaCheckCircle /> : <FaTimesCircle />}
                {driverData.available ? 'Available' : 'Unavailable'}
              </button>
              <div className="text-center">
                <div className="text-2xl font-bold">₹{calculateTodayEarnings()}</div>
                <div className="text-sm opacity-80">Today's Earnings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['dashboard', 'bookings', 'earnings', 'schedule'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === tab ? 'bg-[--color-primary-600] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'dashboard' && (
              <>
                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold text-blue-600">₹{driverData.totalEarnings}</div>
                      <FaWallet className="text-2xl text-blue-500" />
                    </div>
                    <div className="text-gray-600">Total Earnings</div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold text-green-600">{driverData.completedRides}</div>
                      <FaCar className="text-2xl text-green-500" />
                    </div>
                    <div className="text-gray-600">Completed Rides</div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold text-purple-600">{upcomingBookings.length}</div>
                      <FaCalendarAlt className="text-2xl text-purple-500" />
                    </div>
                    <div className="text-gray-600">Upcoming Rides</div>
                  </div>
                </div>

                {/* Upcoming Bookings */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-6">Upcoming Rides</h2>
                  <div className="space-y-4">
                    {upcomingBookings.slice(0, 3).map(booking => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaUser className="text-blue-600" />
                              </div>
                              <div>
                                <div className="font-semibold">{booking.customerName}</div>
                                <div className="text-sm text-gray-500">{booking.date} • {booking.time}</div>
                              </div>
                            </div>
                            <div className="space-y-2 mt-3">
                              <div className="flex items-center gap-2 text-sm">
                                <FaMapMarkerAlt className="text-green-500" />
                                <span>Pickup: {booking.pickup}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <FaMapMarkerAlt className="text-red-500" />
                                <span>Drop: {booking.destination}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-3">
                            <div className="text-xl font-bold text-[--color-primary-600]">
                              ₹{booking.amount}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleStatusChange(booking.id, 'accepted')}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleStatusChange(booking.id, 'rejected')}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                              >
                                Decline
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {completedBookings.slice(0, 3).map(booking => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <FaCheckCircle className="text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold">{booking.customerName}</div>
                            <div className="text-sm text-gray-500">
                              {booking.pickup} → {booking.destination}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[--color-primary-600]">₹{booking.amount}</div>
                          <div className="text-sm text-gray-500">{booking.time}</div>
                          {booking.rating && (
                            <div className="flex items-center gap-1 justify-end">
                              <FaStar className="text-yellow-400" />
                              <span>{booking.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">All Bookings</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Route</th>
                        <th className="text-left py-3 px-4">Date & Time</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(booking => (
                        <tr key={booking.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="font-medium">{booking.customerName}</div>
                            <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm">{booking.pickup}</div>
                            <div className="text-sm text-gray-500">to {booking.destination}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div>{booking.date}</div>
                            <div className="text-sm text-gray-500">{booking.time}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-[--color-primary-600]">₹{booking.amount}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                                View
                              </button>
                              {booking.status === 'upcoming' && (
                                <>
                                  <button 
                                    onClick={() => handleStatusChange(booking.id, 'accepted')}
                                    className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                                  >
                                    Accept
                                  </button>
                                  <button 
                                    onClick={() => handleStatusChange(booking.id, 'rejected')}
                                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                                  >
                                    Decline
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Earnings</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <div className="text-4xl font-bold text-[--color-primary-600] mb-2">
                      ₹{driverData.totalEarnings}
                    </div>
                    <div className="text-gray-600">Total Earnings</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      ₹{calculateTodayEarnings()}
                    </div>
                    <div className="text-gray-600">Today's Earnings</div>
                  </div>
                </div>

                {/* Earnings Chart */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Monthly Earnings</h3>
                  <div className="space-y-4">
                    {earnings.map((month, index) => (
                      <div key={month.month} className="flex items-center gap-4">
                        <div className="w-24 text-sm text-gray-600">{month.month}</div>
                        <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                            style={{ width: `${(month.amount / 40000) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-20 text-right font-medium">₹{month.amount}</div>
                        <div className="w-16 text-sm text-gray-500">{month.rides} rides</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-2">UPI Payment</div>
                      <div className="text-gray-600 text-sm mb-3">rajesh.kumar@upi</div>
                      <button className="text-sm text-[--color-primary-600] hover:text-[--color-primary-800]">
                        Change UPI ID
                      </button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-2">Bank Account</div>
                      <div className="text-gray-600 text-sm mb-3">HDFC Bank • • • • 4321</div>
                      <button className="text-sm text-[--color-primary-600] hover:text-[--color-primary-800]">
                        Update Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Schedule</h2>
                <div className="space-y-6">
                  {/* Calendar View */}
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-lg font-semibold">November 2024</div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded">←</button>
                        <button className="px-3 py-1 border rounded">Today</button>
                        <button className="px-3 py-1 border rounded">→</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-medium py-2">
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-20 border rounded-lg p-2 ${i + 1 === 5 ? 'bg-blue-50 border-blue-200' : ''}`}
                        >
                          <div className="text-sm font-medium">{i + 1}</div>
                          {i + 1 === 5 && (
                            <div className="mt-1 space-y-1">
                              <div className="text-xs bg-blue-100 text-blue-800 px-1 rounded">2 rides</div>
                              <div className="text-xs bg-green-100 text-green-800 px-1 rounded">₹3000</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Set Availability */}
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Set Weekly Availability</h3>
                    <div className="grid grid-cols-7 gap-2 mb-6">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <div key={day} className="text-center">
                          <div className="font-medium mb-2">{day}</div>
                          <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only" />
                            <span className="relative">
                              <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
                              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-6"></span>
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Time
                        </label>
                        <input type="time" defaultValue="08:00" className="w-full p-2 border rounded" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Time
                        </label>
                        <input type="time" defaultValue="20:00" className="w-full p-2 border rounded" />
                      </div>
                    </div>
                    <button className="mt-6 w-full bg-[--color-primary-600] text-white py-3 rounded-lg font-medium hover:bg-[--color-primary-700]">
                      Save Schedule
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6">Quick Stats</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">4.8</div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <FaStar key={star} className="text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-gray-600">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">98%</div>
                  <div className="text-gray-600">Acceptance Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">24min</div>
                  <div className="text-gray-600">Avg. Response Time</div>
                </div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6">Vehicle Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Vehicle</div>
                  <div className="font-medium">{driverData.vehicle.brand} {driverData.vehicle.model}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">License Plate</div>
                  <div className="font-medium">{driverData.vehicle.license}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Vehicle Type</div>
                  <div className="font-medium capitalize">{driverData.vehicle.type}</div>
                </div>
                <button className="w-full mt-4 border border-[--color-primary-600] text-[--color-primary-600] py-2 rounded-lg hover:bg-[--color-primary-50]">
                  Update Vehicle Info
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <FaBell />
                Notifications
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-sm">New booking request</div>
                  <div className="text-xs text-gray-600">10 minutes ago</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-sm">Payment received</div>
                  <div className="text-xs text-gray-600">2 hours ago</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-sm">Weekly report ready</div>
                  <div className="text-xs text-gray-600">1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}