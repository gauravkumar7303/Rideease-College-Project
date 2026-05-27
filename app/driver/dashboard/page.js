// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function DriverDashboard() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     // ✅ Try both key names
//     let token = localStorage.getItem('auth-token') || localStorage.getItem('rideease_token');
//     let userStr = localStorage.getItem('user') || localStorage.getItem('rideease_user');
    
//     console.log('🔍 Dashboard check:', { 
//       hasToken: !!token, 
//       hasUser: !!userStr,
//       tokenKey: localStorage.getItem('auth-token') ? 'auth-token' : (localStorage.getItem('rideease_token') ? 'rideease_token' : 'none')
//     });
    
//     if (!token || !userStr) {
//       console.log('❌ No auth, redirecting to login');
//       router.push('/auth');
//       return;
//     }
    
//     try {
//       const parsedUser = JSON.parse(userStr);
//       console.log('👤 User from storage:', parsedUser);
      
//       if (parsedUser.role !== 'driver') {
//         console.log('❌ Not a driver, role:', parsedUser.role);
//         router.push('/');
//         return;
//       }
      
//       setUser(parsedUser);
//       setLoading(false);
//     } catch (err) {
//       console.error('Parse error:', err);
//       router.push('/auth');
//     }
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-500">Loading driver dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="h-16"></div>
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <h1 className="text-3xl font-bold text-blue-600 mb-4">🚗 Driver Dashboard</h1>
          
//           <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
//             <p className="text-green-800 font-medium">✅ Welcome, {user?.name}!</p>
//             <p className="text-green-700 mt-1">Email: {user?.email}</p>
//             <p className="text-green-700">Role: {user?.role}</p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-6">
//             <div className="border rounded-lg p-4 text-center">
//               <p className="text-2xl font-bold text-blue-600">0</p>
//               <p className="text-gray-500">Total Trips</p>
//             </div>
//             <div className="border rounded-lg p-4 text-center">
//               <p className="text-2xl font-bold text-green-600">₹0</p>
//               <p className="text-gray-500">Total Earnings</p>
//             </div>
//             <div className="border rounded-lg p-4 text-center">
//               <p className="text-2xl font-bold text-yellow-600">5.0 ★</p>
//               <p className="text-gray-500">Rating</p>
//             </div>
//           </div>
          
//           <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//             <p className="text-blue-800">📌 Full driver dashboard coming soon!</p>
//             <button
//               onClick={() => {
//                 localStorage.clear();
//                 window.location.href = '/auth';
//               }}
//               className="mt-4 text-sm text-red-600 hover:underline"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DriverDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // ✅ Try both key names
    let token = localStorage.getItem('auth-token') || localStorage.getItem('rideease_token');
    let userStr = localStorage.getItem('user') || localStorage.getItem('rideease_user');
    
    console.log('🔍 Dashboard check:', { 
      hasToken: !!token, 
      hasUser: !!userStr,
      tokenKey: localStorage.getItem('auth-token') ? 'auth-token' : (localStorage.getItem('rideease_token') ? 'rideease_token' : 'none')
    });
    
    if (!token || !userStr) {
      console.log('❌ No auth, redirecting to login');
      router.push('/auth');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userStr);
      console.log('👤 User from storage:', parsedUser);
      
      // ✅ Check BOTH role and userType (for compatibility)
      const isDriver = parsedUser.role === 'driver' || parsedUser.userType === 'driver';
      
      if (!isDriver) {
        console.log('❌ Not a driver - role:', parsedUser.role, 'userType:', parsedUser.userType);
        router.push('/');
        return;
      }
      
      setUser(parsedUser);
      setLoading(false);
    } catch (err) {
      console.error('Parse error:', err);
      router.push('/auth');
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading driver dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-16"></div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">🚗 Driver Dashboard</h1>
          
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-green-800 font-medium">✅ Welcome, {user?.name}!</p>
            <p className="text-green-700 mt-1">Email: {user?.email}</p>
            <p className="text-green-700">Phone: {user?.phone}</p>
            <p className="text-green-700">Role: {user?.role || user?.userType}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">0</p>
              <p className="text-gray-500">Total Trips</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">₹0</p>
              <p className="text-gray-500">Total Earnings</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">5.0 ★</p>
              <p className="text-gray-500">Rating</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">📌 Your driver dashboard is ready!</p>
            <p className="text-blue-600 text-sm mt-2">You will see assigned rides here when customers book with driver.</p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/auth';
              }}
              className="mt-4 text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}