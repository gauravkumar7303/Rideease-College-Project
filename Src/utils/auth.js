// // Utility functions for authentication
// export const isAuthenticated = () => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('rideease_user') !== null
//   }
//   return false
// }

// export const getCurrentUser = () => {
//   if (typeof window !== 'undefined') {
//     const user = localStorage.getItem('rideease_user')
//     return user ? JSON.parse(user) : null
//   }
//   return null
// }

// export const loginUser = (userData) => {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem('rideease_user', JSON.stringify(userData))
//     localStorage.setItem('rideease_token', 'demo-token-' + Date.now())
//   }
// }

// export const logoutUser = () => {
//   if (typeof window !== 'undefined') {
//     localStorage.removeItem('rideease_user')
//     localStorage.removeItem('rideease_token')
//   }
// }

// export const requireAuth = (router) => {
//   if (!isAuthenticated()) {
//     router.push('/auth')
//     return false
//   }
//   return true
// }
// // Add these to your existing auth.js
// export const getToken = () => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('rideease_token');
//   }
//   return null;
// };

// export const getAuthHeaders = () => {
//   const token = getToken();
//   if (!token) return {};
  
//   return {
//     'Authorization': `Bearer ${token}`,
//   };
// };

// export const hasRole = (role) => {
//   const user = getCurrentUser();
//   if (!user) return false;
//   return user.userType === role;
// };
// Utility functions for authentication
// export const isAuthenticated = () => {
//   if (typeof window !== 'undefined') {
//     const user = localStorage.getItem('rideease_user')
//     const token = localStorage.getItem('rideease_token')
//     return !!(user && token) // Returns true if both exist
//   }
//   return false
// }

// export const getCurrentUser = () => {
//   if (typeof window !== 'undefined') {
//     const user = localStorage.getItem('rideease_user')
//     return user ? JSON.parse(user) : null
//   }
//   return null
// }

// export const loginUser = (userData, token) => {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem('rideease_user', JSON.stringify(userData))
//     localStorage.setItem('rideease_token', token)
//   }
// }

// export const logoutUser = () => {
//   if (typeof window !== 'undefined') {
//     localStorage.removeItem('rideease_user')
//     localStorage.removeItem('rideease_token')
//   }
//   // Redirect to auth page
//   window.location.href = '/auth'
// }

// export const requireAuth = (router) => {
//   if (!isAuthenticated()) {
//     router.push('/auth')
//     return false
//   }
//   return true
// }

// export const getToken = () => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('rideease_token')
//   }
//   return null
// }

// export const getAuthHeaders = () => {
//   const token = getToken()
//   if (!token) return {}
  
//   return {
//     'Authorization': `Bearer ${token}`,
//   }
// }

// export const hasRole = (role) => {
//   const user = getCurrentUser()
//   if (!user) return false
//   return user.userType === role
// }

// Utility functions for authentication
export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('rideease_user');
    const token = localStorage.getItem('rideease_token');
    return !!(user && token);
  }
  return false;
};

export const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('rideease_user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const loginUser = (userData, token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('rideease_user', JSON.stringify(userData));
    localStorage.setItem('rideease_token', token);
  }
};

export const logoutUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('rideease_user');
    localStorage.removeItem('rideease_token');
    window.location.href = '/auth';
  }
};

export const requireAuth = (router) => {
  if (!isAuthenticated()) {
    router.push('/auth');
    return false;
  }
  return true;
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('rideease_token');
  }
  return null;
};

export const getAuthHeaders = () => {
  const token = getToken();
  if (!token) return {};
  
  return {
    'Authorization': `Bearer ${token}`,
  };
};

export const hasRole = (role) => {
  const user = getCurrentUser();
  if (!user) return false;
  return user.userType === role;
};