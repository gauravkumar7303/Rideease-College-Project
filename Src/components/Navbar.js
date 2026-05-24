// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { usePathname, useRouter } from 'next/navigation'
// import { FaBars, FaTimes, FaMotorcycle, FaCar, FaUser, FaHeart, FaShoppingCart, FaBell, FaSignOutAlt } from 'react-icons/fa'
// import { toast } from 'react-toastify'
// import { getCurrentUser, isAuthenticated, logoutUser } from '@/Src/utils/auth'

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [user, setUser] = useState(null)
//   const pathname = usePathname()
//   const router = useRouter()

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // ✅ Get user data from localStorage
//   useEffect(() => {
//     if (isAuthenticated()) {
//       const currentUser = getCurrentUser()
//       setUser(currentUser)
//     } else {
//       setUser(null)
//     }
//   }, [pathname]) // Re-run when pathname changes

//   const handleLogout = () => {
//     logoutUser() // This will clear localStorage and redirect to /auth
//     toast.success('Logged out successfully!')
//     setUser(null)
//     setIsOpen(false)
//   }

//   const navLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'Bikes', href: '/bikes', icon: <FaMotorcycle /> },
//     { name: 'Cars', href: '/cars', icon: <FaCar /> },
//     { name: 'How It Works', href: '#how-it-works' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//   ]

//   // ✅ Get user initials for avatar
//   const getUserInitials = () => {
//     if (!user || !user.name) return 'U'
//     return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
//   }

//   return (
//     <nav className={`fixed w-full z-50 transition-all duration-300 ${
//       scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
//     }`}>
//       <div className="section-padding">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo (replace RE text with image) */}
//           <Link href="/" className="flex items-center space-x-2">
//             <img
//               src="/assets/logos/logo.png"
//               alt="RideEase logo"
//               className="w-10 h-10 object-cover rounded-lg"
//             />
//             <span className="text-2xl font-bold text-gray-900">
//               RideEase
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className={`flex items-center space-x-2 font-medium transition-colors ${
//                   pathname === link.href
//                     ? 'text-blue-600'
//                     : 'text-gray-600 hover:text-blue-600'
//                 }`}
//               >
//                 {link.icon && <span>{link.icon}</span>}
//                 <span>{link.name}</span>
//               </Link>
//             ))}
//           </div>

//           {/* User Actions */}
//           <div className="hidden md:flex items-center space-x-4">
//             {user ? (
//               // ✅ LOGGED IN STATE
//               <>
//                 <button 
//                   className="p-2 text-gray-600 hover:text-blue-600 relative"
//                   onClick={() => toast.info('Favorites feature coming soon!')}
//                 >
//                   <FaHeart className="text-xl" />
//                   <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
//                 </button>

//                 <button 
//                   className="p-2 text-gray-600 hover:text-blue-600 relative"
//                   onClick={() => toast.info('Notifications feature coming soon!')}
//                 >
//                   <FaBell className="text-xl" />
//                   <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
//                 </button>

//                 <Link
//                   href="/profile"
//                   className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
//                     <span className="text-white font-semibold text-sm">
//                       {getUserInitials()}
//                     </span>
//                   </div>
//                   <span className="font-medium hidden lg:inline">
//                     {user.name?.split(' ')[0] || 'User'}
//                   </span>
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center space-x-2 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
//                 >
//                   <FaSignOutAlt />
//                   <span className="hidden lg:inline">Logout</span>
//                 </button>
//               </>
//             ) : (
//               // ✅ LOGGED OUT STATE
//               <>
//                 <Link
//                   href="/auth"
//                   className="text-gray-600 hover:text-blue-600 font-medium"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/auth?signup=true"
//                   className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}

//             <Link
//               href="/booking"
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors ml-2"
//             >
//               Book Now
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 text-gray-600 hover:text-blue-600"
//           >
//             {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden py-4 border-t">
//             <div className="flex flex-col space-y-4">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
//                     pathname === link.href
//                       ? 'bg-blue-50 text-blue-600'
//                       : 'hover:bg-gray-100 text-gray-600'
//                   }`}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {link.icon && <span className="text-lg">{link.icon}</span>}
//                   <span className="font-medium">{link.name}</span>
//                 </Link>
//               ))}
              
//               <div className="pt-4 border-t space-y-3">
//                 {user ? (
//                   // ✅ MOBILE - LOGGED IN
//                   <>
//                     <Link
//                       href="/profile"
//                       className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
//                         <span className="text-white font-semibold text-sm">
//                           {getUserInitials()}
//                         </span>
//                       </div>
//                       <span className="font-medium">{user.name || 'My Profile'}</span>
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center space-x-3 p-2 text-red-600 hover:bg-red-50 rounded-lg w-full"
//                     >
//                       <FaSignOutAlt />
//                       <span>Logout</span>
//                     </button>
//                   </>
//                 ) : (
//                   // ✅ MOBILE - LOGGED OUT
//                   <>
//                     <Link
//                       href="/auth"
//                       className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       <FaUser />
//                       <span>Login / Sign Up</span>
//                     </Link>
//                   </>
//                 )}
                
//                 <Link
//                   href="/booking"
//                   className="bg-blue-600 text-white w-full py-3 rounded-lg font-medium text-center block"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Book Vehicle
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }

// Src/components/Navbar.js
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FaBars, FaTimes, FaMotorcycle, FaCar, FaUser, FaHeart, FaShoppingCart, FaBell, FaSignOutAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { getCurrentUser, isAuthenticated, logoutUser } from '@/Src/utils/auth'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50) // Changed threshold
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isAuthenticated()) {
      const currentUser = getCurrentUser()
      setUser(currentUser)
    } else {
      setUser(null)
    }
  }, [pathname])

  const handleLogout = () => {
    logoutUser()
    toast.success('Logged out successfully!')
    setUser(null)
    setIsOpen(false)
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Bikes', href: '/bikes', icon: <FaMotorcycle /> },
    { name: 'Cars', href: '/cars', icon: <FaCar /> },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const getUserInitials = () => {
    if (!user || !user.name) return 'U'
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'  // Changed from 'bg-white' to 'bg-transparent'
    }`}>
      <div className="section-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">RE</span>
            </div>
            <span className={`text-2xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              RideEase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center space-x-2 font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-emerald-400'
                    : scrolled 
                      ? 'text-gray-600 hover:text-emerald-600'
                      : 'text-white hover:text-emerald-300'
                }`}
              >
                {link.icon && <span>{link.icon}</span>}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button 
                  className={`p-2 relative ${
                    scrolled ? 'text-gray-600 hover:text-emerald-600' : 'text-white hover:text-emerald-300'
                  }`}
                  onClick={() => toast.info('Favorites feature coming soon!')}
                >
                  <FaHeart className="text-xl" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
                </button>

                <button 
                  className={`p-2 relative ${
                    scrolled ? 'text-gray-600 hover:text-emerald-600' : 'text-white hover:text-emerald-300'
                  }`}
                  onClick={() => toast.info('Notifications feature coming soon!')}
                >
                  <FaBell className="text-xl" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
                </button>

                <Link
                  href="/profile"
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                    scrolled 
                      ? 'hover:bg-gray-100' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {getUserInitials()}
                    </span>
                  </div>
                  <span className={`font-medium hidden lg:inline ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  }`}>
                    {user.name?.split(' ')[0] || 'User'}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                    scrolled 
                      ? 'text-red-600 hover:text-red-700 hover:bg-red-50' 
                      : 'text-red-300 hover:text-red-200 hover:bg-white/10'
                  }`}
                >
                  <FaSignOutAlt />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth"
                  className={`font-medium transition-colors ${
                    scrolled ? 'text-gray-600 hover:text-emerald-600' : 'text-white hover:text-emerald-300'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/auth?signup=true"
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}

            <Link
              href="/booking"
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors ml-2"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 transition-colors ${
              scrolled ? 'text-gray-600 hover:text-emerald-600' : 'text-white hover:text-emerald-300'
            }`}
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`md:hidden py-4 border-t ${
            scrolled ? 'border-gray-200' : 'border-white/20'
          }`}>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                    pathname === link.href
                      ? scrolled
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-white/20 text-white'
                      : scrolled
                        ? 'hover:bg-gray-100 text-gray-600'
                        : 'hover:bg-white/10 text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon && <span className="text-lg">{link.icon}</span>}
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}
              
              <div className={`pt-4 border-t ${
                scrolled ? 'border-gray-200' : 'border-white/20'
              } space-y-3`}>
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        scrolled ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-white/10 text-white'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {getUserInitials()}
                        </span>
                      </div>
                      <span className="font-medium">{user.name || 'My Profile'}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`flex items-center space-x-3 p-2 rounded-lg w-full transition-colors ${
                        scrolled 
                          ? 'text-red-600 hover:bg-red-50' 
                          : 'text-red-300 hover:bg-white/10'
                      }`}
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth"
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        scrolled ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-white/10 text-white'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <FaUser />
                      <span>Login / Sign Up</span>
                    </Link>
                  </>
                )}
                
                <Link
                  href="/booking"
                  className="bg-emerald-600 text-white w-full py-3 rounded-lg font-medium text-center block hover:bg-emerald-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Book Vehicle
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}