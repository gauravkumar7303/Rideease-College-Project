// 'use client'

// import { FaShieldAlt, FaUsers, FaMapMarkerAlt, FaAward, FaChartLine, FaHandshake } from 'react-icons/fa'

// export default function AboutPage() {
//   const stats = [
//     { label: 'Happy Customers', value: '10,000+', icon: <FaUsers /> },
//     { label: 'Vehicles Rented', value: '25,000+', icon: <FaChartLine /> },
//     { label: 'Cities Covered', value: '2', icon: <FaMapMarkerAlt /> },
//     { label: 'Service Rating', value: '4.8/5', icon: <FaAward /> },
//   ]

//   const values = [
//     {
//       icon: <FaShieldAlt className="text-3xl" />,
//       title: 'Safety First',
//       description: 'Every vehicle undergoes thorough inspection and verification before delivery'
//     },
//     {
//       icon: <FaHandshake className="text-3xl" />,
//       title: 'Trust & Transparency',
//       description: 'No hidden charges, clear pricing, and honest communication'
//     },
//     {
//       icon: <FaUsers className="text-3xl" />,
//       title: 'Customer Centric',
//       description: '24/7 support and personalized service for every user'
//     },
//   ]

//   return (
//     <div className="pt-24 pb-16">
//       <div className="section-padding">
//         {/* Hero Section */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
//             About <span className="text-[--color-primary-600]">RideEase</span>
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Your trusted bike and car rental platform in Delhi & Gurugram. 
//             Bridging the gap between vehicle owners and renters through company-managed verification.
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
//           {stats.map((stat, index) => (
//             <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
//               <div className="w-12 h-12 bg-[--color-primary-100] rounded-full flex items-center justify-center text-[--color-primary-600] text-xl mx-auto mb-4">
//                 {stat.icon}
//               </div>
//               <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
//               <div className="text-gray-600">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         {/* Mission & Vision */}
//         <div className="grid md:grid-cols-2 gap-12 mb-16">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 mb-6 font-display">Our Mission</h2>
//             <p className="text-gray-600 mb-4">
//               To make vehicle rental accessible, affordable, and safe for everyone in Delhi NCR. 
//               We aim to revolutionize urban mobility through technology and trusted services.
//             </p>
//             <p className="text-gray-600">
//               By providing company-verified vehicles with comprehensive insurance, 
//               we eliminate the trust issues associated with traditional rental services.
//             </p>
//           </div>
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 mb-6 font-display">Our Vision</h2>
//             <p className="text-gray-600 mb-4">
//               To become India's most trusted vehicle rental platform, expanding to 50+ cities 
//               and serving 1 million customers by 2026.
//             </p>
//             <p className="text-gray-600">
//               We envision a future where renting a vehicle is as easy and reliable as 
//               booking a ride-sharing service.
//             </p>
//           </div>
//         </div>

//         {/* Our Values */}
//         <div className="mb-16">
//           <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center font-display">Our Values</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {values.map((value, index) => (
//               <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
//                 <div className="w-16 h-16 bg-[--color-primary-100] rounded-xl flex items-center justify-center text-[--color-primary-600] mb-6">
//                   {value.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
//                 <p className="text-gray-600">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* How We Work */}
//         <div className="bg-gradient-to-r from-[--color-primary-50] to-[--color-primary-100] p-8 rounded-2xl">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-display">How We Ensure Safety</h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             <div className="bg-white p-6 rounded-lg">
//               <div className="text-2xl font-bold text-[--color-primary-600] mb-2">01</div>
//               <h3 className="text-lg font-semibold mb-3">Vehicle Verification</h3>
//               <p className="text-gray-600">Physical inspection of every vehicle by company representatives</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg">
//               <div className="text-2xl font-bold text-[--color-primary-600] mb-2">02</div>
//               <h3 className="text-lg font-semibold mb-3">Document Check</h3>
//               <p className="text-gray-600">RC book, insurance, and PUC verification for all vehicles</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg">
//               <div className="text-2xl font-bold text-[--color-primary-600] mb-2">03</div>
//               <h3 className="text-lg font-semibold mb-3">Damage Protection</h3>
//               <p className="text-gray-600">Comprehensive insurance coverage for every rental</p>
//             </div>
//           </div>
//         </div>

//         {/* Team Info
//         <div className="mt-16 text-center">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Project Team</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             MCA Project by <span className="font-semibold">Gaurav Kumar (2451232556)</span><br />
//             Guided by <span className="font-semibold">Mr. Vishal Dhiman</span><br />
//             Indira Gandhi National Open University, RC Delhi-3
//           </p>
//         </div> */}
//       </div>
//     </div>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import { FaShieldAlt, FaUsers, FaMapMarkerAlt, FaAward, FaChartLine, FaHandshake, FaCar, FaMotorcycle, FaClock, FaStar } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: <FaUsers />, color: 'from-emerald-500 to-emerald-700' },
    { label: 'Vehicles Rented', value: '25,000+', icon: <FaChartLine />, color: 'from-blue-500 to-blue-700' },
    { label: 'Cities Covered', value: '2', icon: <FaMapMarkerAlt />, color: 'from-purple-500 to-purple-700' },
    { label: 'Service Rating', value: '4.8/5', icon: <FaAward />, color: 'from-orange-500 to-orange-700' },
  ]

  const values = [
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: 'Safety First',
      description: 'Every vehicle undergoes thorough 50-point inspection and verification before delivery'
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: 'Trust & Transparency',
      description: 'No hidden charges, clear pricing, and honest communication with every rental'
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: 'Customer Centric',
      description: '24/7 support and personalized service for every user, every time'
    },
  ]

  const timeline = [
    {
      year: '2023',
      title: 'RideEase Founded',
      description: 'Started with a vision to revolutionize vehicle rentals in Delhi NCR',
      icon: '🚀'
    },
    {
      year: '2024',
      title: '10,000+ Customers',
      description: 'Achieved milestone of serving over 10,000 happy customers',
      icon: '🎉'
    },
    {
      year: '2025',
      title: 'Expansion Plans',
      description: 'Planning to expand to Mumbai, Bangalore, and Pune',
      icon: '🌟'
    }
  ]

  const team = [
    {
      name: 'Gaurav Kumar',
      role: 'Founder & CEO',
      experience: '8+ years in tech & mobility',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: 'Building trust, one ride at a time.'
    },
    {
      name: 'Priya Singh',
      role: 'Head of Operations',
      experience: '6+ years in logistics',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: 'Customer satisfaction is our priority.'
    },
    {
      name: 'Amit Verma',
      role: 'Technical Lead',
      experience: '7+ years in full-stack dev',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      quote: 'Technology that simplifies mobility.'
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section with Image */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Office team meeting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-gray-900/80"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="section-padding max-w-7xl mx-auto text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              About <span className="text-emerald-400">RideEase</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              Your trusted bike and car rental platform in Delhi & Gurugram. 
              Building trust through transparency and quality service.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white text-2xl mb-4 mx-auto`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-6 text-emerald-600">Our Mission</h2>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                To make vehicle rental accessible, affordable, and safe for everyone in Delhi NCR. 
                We aim to revolutionize urban mobility through technology and trusted services.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                By providing company-verified vehicles with comprehensive insurance, 
                we eliminate the trust issues associated with traditional rental services.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-6 text-emerald-600">Our Vision</h2>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                To become India's most trusted vehicle rental platform, expanding to 50+ cities 
                and serving 1 million customers by 2026.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We envision a future where renting a vehicle is as easy and reliable as 
                booking a ride-sharing service.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="section-padding max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our <span className="text-emerald-600">Values</span></h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center text-white text-3xl mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="section-padding max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our <span className="text-emerald-600">Journey</span></h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full -mr-12 -mt-12 opacity-20"></div>
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-emerald-600 font-bold text-xl mb-2">{item.year}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="section-padding max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Meet Our <span className="text-emerald-600">Team</span></h2>
          <p className="text-xl text-gray-600 text-center mb-12">The passionate people behind RideEase</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-2xl font-bold">{member.name}</div>
                    <div className="text-sm opacity-90">{member.role}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-emerald-600 mb-3">
                    <FaClock />
                    <span className="text-sm">{member.experience}</span>
                  </div>
                  <p className="text-gray-600 italic">"{member.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
        <div className="section-padding max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How We Ensure <span className="text-yellow-300">Safety</span></h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-3">Vehicle Verification</h3>
              <p className="text-emerald-100">50-point inspection by company representatives</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center"
            >
              <div className="text-5xl mb-4">📄</div>
              <h3 className="text-2xl font-semibold mb-3">Document Check</h3>
              <p className="text-emerald-100">RC, insurance, and PUC verification</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center"
            >
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-semibold mb-3">Damage Protection</h3>
              <p className="text-emerald-100">Comprehensive insurance coverage</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4">
              <div className="text-4xl text-emerald-600">⭐</div>
              <div>
                <div className="font-bold text-xl">4.8/5</div>
                <div className="text-gray-600">10,000+ reviews</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="text-4xl text-emerald-600">🔒</div>
              <div>
                <div className="font-bold text-xl">100%</div>
                <div className="text-gray-600">Verified vehicles</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="text-4xl text-emerald-600">🚨</div>
              <div>
                <div className="font-bold text-xl">24/7</div>
                <div className="text-gray-600">Roadside support</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="text-4xl text-emerald-600">💰</div>
              <div>
                <div className="font-bold text-xl">Best Price</div>
                <div className="text-gray-600">Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}