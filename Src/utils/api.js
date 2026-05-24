// // Src/utils/api.js
// import { getAuthHeaders } from '../utils/auth';

// // API utility functions
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// // Add auth token if available
// const getAuthToken = () => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('rideease_token');
//   }
//   return null;
// };

// // Main API request function
// export async function apiRequest(endpoint, options = {}) {
//   const url = `/api${endpoint}`;
//   const token = getAuthToken();
  
//   const headers = {
//     'Content-Type': 'application/json',
//     ...(token && { 'Authorization': `Bearer ${token}` }),
//     ...getAuthHeaders(),
//     ...options.headers,
//   };

//   try {
//     console.log(`📡 API Request: ${endpoint}`, options.body ? JSON.parse(options.body) : 'No body');
    
//     const response = await fetch(url, {
//       ...options,
//       headers,
//     });

//     const data = await response.json();
    
//     if (!response.ok) {
//       console.error(`❌ API Error (${response.status}):`, data);
//       throw new Error(data.error || 'API request failed');
//     }

//     console.log(`✅ API Success: ${endpoint}`, data);
//     return data;
//   } catch (error) {
//     console.error('🚨 API Request Error:', error);
//     throw error;
//   }
// }

// // File upload API request
// export const uploadFile = async (endpoint, formData) => {
//   const url = `${BASE_URL}${endpoint}`;
//   const token = getAuthToken();

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('File upload failed');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('File Upload Error:', error);
//     throw error;
//   }
// };

// // Auth API functions
// export const authAPI = {
//   register: (userData) => {
//     console.log('📝 AuthAPI Register - Sending data:', userData);
    
//     // Ensure confirmPassword is included
//     const registrationData = {
//       name: userData.name,
//       email: userData.email,
//       phone: userData.phone,
//       password: userData.password,
//       confirmPassword: userData.confirmPassword || userData.password, // IMPORTANT
//       userType: userData.userType || 'customer'
//     };
    
//     console.log('📤 Final registration data:', registrationData);
    
//     return apiRequest('/auth/register', {
//       method: 'POST',
//       body: JSON.stringify(registrationData),
//     });
//   },

//   login: (credentials) => {
//     console.log('🔐 AuthAPI Login:', credentials.email);
//     return apiRequest('/auth/login', {
//       method: 'POST',
//       body: JSON.stringify(credentials),
//     });
//   },

//   verifyEmail: (email, otp) =>
//     apiRequest('/auth/verify-email', {
//       method: 'POST',
//       body: JSON.stringify({ email, otp }),
//     }),

//   resendOTP: (email) =>
//     apiRequest('/auth/resend-otp', {
//       method: 'POST',
//       body: JSON.stringify({ email }),
//     }),

//   logout: () => {
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('rideease_token');
//       localStorage.removeItem('rideease_user');
//     }
//   },
// };

// // Vehicle API functions
// export const vehicleAPI = {
//   getAll: (filters = {}) => {
//     const params = new URLSearchParams(filters).toString();
//     return apiRequest(`/vehicles${params ? `?${params}` : ''}`);
//   },

//   getById: (id) => apiRequest(`/vehicles/${id}`),

//   create: (vehicleData) =>
//     apiRequest('/vehicles', {
//       method: 'POST',
//       body: JSON.stringify(vehicleData),
//     }),

//   update: (id, vehicleData) =>
//     apiRequest(`/vehicles/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(vehicleData),
//     }),

//   delete: (id) =>
//     apiRequest(`/vehicles/${id}`, {
//       method: 'DELETE',
//     }),

//   uploadImages: (vehicleId, formData) =>
//     uploadFile(`/vehicles/${vehicleId}/images`, formData),
// };

// // Booking API functions
// export const bookingAPI = {
//   create: (bookingData) =>
//     apiRequest('/bookings', {
//       method: 'POST',
//       body: JSON.stringify(bookingData),
//     }),

//   getAll: () => apiRequest('/bookings'),

//   getById: (id) => apiRequest(`/bookings/${id}`),

//   cancel: (id) =>
//     apiRequest('/bookings/${id}/cancel', {
//       method: 'POST',
//     }),

//   getUserBookings: () => apiRequest('/bookings/user'),
// };

// // User API functions
// export const userAPI = {
//   getProfile: () => apiRequest('/users/profile'),

//   updateProfile: (userData) =>
//     apiRequest('/users/profile', {
//       method: 'PUT',
//       body: JSON.stringify(userData),
//     }),

//   uploadDocument: (documentType, formData) =>
//     uploadFile(`/users/documents/${documentType}`, formData),
// };

// Src/utils/api.js
import { getAuthHeaders, getToken } from '../utils/auth';

// API utility functions
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Main API request function
export async function apiRequest(endpoint, options = {}) {
  const url = `/api${endpoint}`;
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...getAuthHeaders(),
    ...options.headers,
  };

  try {
    console.log(`📡 API Request: ${endpoint}`);
    
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error(`❌ API Error (${response.status}):`, data);
      throw new Error(data.error || 'API request failed');
    }

    console.log(`✅ API Success: ${endpoint}`);
    return data;
  } catch (error) {
    console.error('🚨 API Request Error:', error);
    throw error;
  }
}

// File upload API request
export const uploadFile = async (endpoint, formData) => {
  const url = `${BASE_URL}${endpoint}`;
  const token = getToken();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    return await response.json();
  } catch (error) {
    console.error('File Upload Error:', error);
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  register: (userData) => {
    console.log('📝 AuthAPI Register - Sending data:', userData);
    
    const registrationData = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      userType: userData.userType || 'customer'
    };
    
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(registrationData),
    });
  },

  login: (credentials) => {
    console.log('🔐 AuthAPI Login:', credentials.email);
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  verifyEmail: (email, otp) =>
    apiRequest('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    }),

  resendOTP: (email) =>
    apiRequest('/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rideease_token');
      localStorage.removeItem('rideease_user');
      window.location.href = '/auth';
    }
  },
};

// Vehicle API functions
// export const vehicleAPI = {
//   getAll: (filters = {}) => {
//     const params = new URLSearchParams(filters).toString();
//     return apiRequest(`/vehicles${params ? `?${params}` : ''}`);
//   },

//   getById: (id) => apiRequest(`/vehicles/${id}`),

//   create: (vehicleData) =>
//     apiRequest('/vehicles', {
//       method: 'POST',
//       body: JSON.stringify(vehicleData),
//     }),

//   update: (id, vehicleData) =>
//     apiRequest(`/vehicles/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(vehicleData),
//     }),

//   delete: (id) =>
//     apiRequest(`/vehicles/${id}`, {
//       method: 'DELETE',
//     }),

//   uploadImages: (vehicleId, formData) =>
//     uploadFile(`/vehicles/${vehicleId}/images`, formData),
// };
// Add to your existing authAPI object in Src/utils/api.js

// Vehicle API functions
// Vehicle API functions
export const vehicleAPI = {
  // POST /api/vehicles - Create new vehicle
  create: (vehicleData) =>
    apiRequest('/vehicles', {
      method: 'POST',
      body: JSON.stringify(vehicleData),
    }),

  // GET /api/vehicles - Get all vehicles (with filters)
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiRequest(`/vehicles${params ? `?${params}` : ''}`);
  },

  // GET /api/vehicles/:id - Get single vehicle
  getById: (id) => apiRequest(`/vehicles/${id}`),

  // PUT /api/vehicles/:id - Update vehicle
  update: (id, vehicleData) =>
    apiRequest(`/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vehicleData),
    }),

  // DELETE /api/vehicles/:id - Delete vehicle
  delete: (id) =>
    apiRequest(`/vehicles/${id}`, {
      method: 'DELETE',
    }),

// Get owner's vehicles
getOwnerVehicles: (ownerId) =>
  apiRequest(`/vehicles?owner=${ownerId}`),
};
// Booking API functions - FIXED
// Booking API functions
export const bookingAPI = {
  create: (bookingData) =>
    apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),

  getAll: () => apiRequest('/bookings'),

  getById: (id) => apiRequest(`/bookings/${id}`),

  getUserBookings: () => apiRequest('/bookings/user'),

  cancel: (id) =>
    apiRequest(`/bookings/${id}/cancel`, {
      method: 'POST',
    }),
};

// User API functions
export const userAPI = {
  getProfile: () => apiRequest('/users/profile'),

  updateProfile: (userData) =>
    apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  uploadDocument: (documentType, formData) =>
    uploadFile(`/users/documents/${documentType}`, formData),
};



