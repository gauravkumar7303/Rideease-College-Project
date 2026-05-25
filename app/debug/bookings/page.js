'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/Src/utils/auth';

export default function DebugBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      fetchBookings(currentUser._id);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchBookings = async (customerId) => {
    try {
      const res = await fetch(`/api/bookings?customerId=${customerId}`);
      const data = await res.json();
      console.log('📊 Bookings from DB:', data);
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 mt-20">
      <h1 className="text-2xl font-bold mb-4">📊 Database Bookings Debug</h1>
      
      {!user ? (
        <div className="bg-yellow-100 p-4 rounded-lg">
          <p>⚠️ Please login to see your bookings</p>
          <a href="/auth" className="text-blue-600 underline">Login here</a>
        </div>
      ) : (
        <>
          <div className="bg-green-100 p-4 rounded-lg mb-6">
            <p><strong>Logged in as:</strong> {user.name} ({user.email})</p>
            <p><strong>User ID:</strong> {user._id}</p>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Bookings in Database ({bookings.length})</h2>
          
          {bookings.length === 0 ? (
            <div className="bg-yellow-50 p-8 text-center rounded-lg">
              <p>No bookings found in database for this user.</p>
              <p className="text-sm text-gray-500 mt-2">Try booking a vehicle first!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold">Booking ID: {booking.bookingId}</p>
                      <p>Vehicle: {booking.vehicle?.brand} {booking.vehicle?.model}</p>
                      <p>Type: {booking.bookingType}</p>
                      <p>Status: <span className="text-green-600">{booking.status}</span></p>
                      <p>Total Amount: ₹{booking.totalAmount}</p>
                      <p className="text-sm text-gray-500">Created: {new Date(booking.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Database ID:</p>
                      <code className="text-xs">{booking._id}</code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}