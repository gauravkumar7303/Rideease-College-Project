// app/auth/page.js - COMPLETE FIXED VERSION
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaPhone, 
  FaGoogle,
  FaFacebook,
  FaApple,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaArrowLeft
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { authAPI } from '@/Src/utils/api'
import { isAuthenticated } from '@/Src/utils/auth'

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showOTPVerification, setShowOTPVerification] = useState(false)
  const [otpEmail, setOtpEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)
  const [verificationSuccess, setVerificationSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'customer'
  })

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      console.log('✅ User already logged in, redirecting to home')
      router.push('/')
    }
  }, [router])

  // Start OTP timer countdown
  const startOtpTimer = () => {
    setOtpTimer(60)
    const interval = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLogin) {
      await handleLogin()
    } else {
      await handleRegister()
    }
  }

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      console.log('🔐 Attempting login for:', formData.email)
      
      const result = await authAPI.login({
        email: formData.email,
        password: formData.password
      })

      toast.success('Login successful!')
      console.log('✅ Login successful:', result)
      
      // Save user data to localStorage
      if (result.user && result.token) {
        localStorage.setItem('rideease_user', JSON.stringify(result.user))
        localStorage.setItem('rideease_token', result.token)
        console.log('✅ User saved to localStorage:', result.user)
      }
      
      // Redirect to home page immediately
      router.push('/')
      
    } catch (error) {
      console.error('❌ Login error:', error)
      toast.error(error.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    console.log('👤 Attempting registration...')
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (formData.phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number')
      return
    }

    setIsLoading(true)
    try {
      console.log('📤 Sending registration data to API:', formData)
      
      const result = await authAPI.register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        userType: formData.userType
      })

      console.log('✅ Registration API response:', result)
      toast.success('Registration successful! Check your email for OTP.')
      
      // Show OTP in development mode
      if (process.env.NODE_ENV === 'development' && result._debug?.otp) {
        console.log('🔑 DEV MODE - OTP:', result._debug.otp)
        toast.info(`🔐 DEV OTP: ${result._debug.otp}`, {
          autoClose: 10000,
        })
      }
      
      setOtpEmail(formData.email)
      setShowOTPVerification(true)
      startOtpTimer()
    } catch (error) {
      console.error('💥 Registration error:', error)
      toast.error(error.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }

    setOtpLoading(true)
    try {
      console.log('🔑 Verifying OTP for:', otpEmail)
      console.log('🔢 OTP entered:', otp)
      
      const result = await authAPI.verifyEmail(otpEmail, otp)
      
      console.log('✅ Verification API response:', result)

      if (result.success) {
        setVerificationSuccess(true)
        toast.success('Email verified successfully! You can now login.')
        
        // Clear OTP verification screen after success
        setTimeout(() => {
          setShowOTPVerification(false)
          setOtp('')
          setOtpTimer(0)
          setVerificationSuccess(false)
          
          // Switch to login screen
          setIsLogin(true)
          setFormData({
            name: '',
            email: otpEmail,
            phone: '',
            password: '',
            confirmPassword: '',
            userType: 'customer'
          })
          
          toast.success('✅ Please login with your credentials.')
        }, 2000)
      }
    } catch (error) {
      console.error('❌ OTP verification error:', error)
      toast.error(error.message || 'OTP verification failed. Please try again.')
    } finally {
      setOtpLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setOtpLoading(true)
    try {
      console.log('🔄 Resending OTP to:', otpEmail)
      
      const result = await authAPI.resendOTP(otpEmail)
      
      console.log('✅ Resend OTP response:', result)
      
      if (process.env.NODE_ENV === 'development' && result._debug?.otp) {
        console.log('🔑 DEV MODE - New OTP:', result._debug.otp)
        toast.info(`🔐 DEV OTP: ${result._debug.otp}`, {
          autoClose: 10000,
        })
      }

      toast.success('New OTP sent to your email')
      setOtp('')
      startOtpTimer()
    } catch (error) {
      console.error('❌ Resend OTP error:', error)
      toast.error(error.message || 'Failed to resend OTP. Please try again.')
    } finally {
      setOtpLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // OTP Verification Modal
  if (showOTPVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Back button */}
            <button
              onClick={() => {
                setShowOTPVerification(false)
                setOtp('')
                setOtpTimer(0)
              }}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <FaArrowLeft className="mr-2" />
              Back to Sign Up
            </button>

            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${verificationSuccess ? 'bg-green-500' : 'bg-green-100'} rounded-full mb-4 transition-all duration-500`}>
                <FaCheckCircle className={`text-3xl ${verificationSuccess ? 'text-white' : 'text-green-500'}`} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                {verificationSuccess ? 'Email Verified!' : 'Verify Email'}
              </h1>
              <p className="text-gray-600 mt-2">
                {verificationSuccess 
                  ? 'Your email has been successfully verified.'
                  : `We sent an OTP to ${otpEmail}`
                }
              </p>
            </div>

            {!verificationSuccess ? (
              <>
                <form onSubmit={(e) => { e.preventDefault(); handleVerifyOTP(); }} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Enter 6-digit OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength="6"
                      placeholder="000000"
                      className="w-full px-4 py-4 text-center text-2xl tracking-widest border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={otpLoading || otp.length !== 6}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {otpLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </span>
                    ) : 'Verify OTP'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  {otpTimer > 0 ? (
                    <p className="text-sm text-gray-600">
                      Didn't receive OTP? Resend in{' '}
                      <span className="font-semibold text-blue-600">{otpTimer}s</span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResendOTP}
                      disabled={otpLoading}
                      className="text-sm text-blue-600 font-semibold hover:underline disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center">
                <button
                  onClick={() => {
                    setShowOTPVerification(false)
                    setIsLogin(true)
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <img
              src="/assets/logos/logo.png"
              alt="RideEase logo"
              className="w-15 h-15 object-cover rounded-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">RideEase</h1>
          <p className="text-gray-600 mt-2">Your trusted ride rental partner</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Toggle */}
          <div className="flex mb-8">
            <button
              className={`flex-1 py-3 font-semibold transition-all ${
                isLogin 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-3 font-semibold transition-all ${
                !isLogin 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                {/* User Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    I want to join as:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'customer', label: 'Customer', icon: '👤' },
                      { value: 'driver', label: 'Driver', icon: '🚗' },
                      { value: 'owner', label: 'Owner', icon: '🏢' }
                    ].map((type) => (
                      <div
                        key={type.value}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.userType === type.value 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('userType', type.value)}
                      >
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <div className="font-medium text-sm">{type.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter 10-digit phone number"
                      maxLength="10"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={isLogin ? 'Enter your password' : 'Create a password (min. 6 characters)'}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                  />
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                  )}
                </div>
              </div>
            )}

            {/* Forgot Password */}
            {isLogin && (
              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Terms */}
            {!isLogin && (
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-5 h-5 text-blue-600 rounded mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Bottom Text */}
          <div className="mt-8 text-center text-sm text-gray-600">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}