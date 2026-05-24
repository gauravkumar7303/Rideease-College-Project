// 'use client'

// import { useState } from 'react'
// import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaWhatsapp, FaHeadset, FaComments, FaQuestionCircle } from 'react-icons/fa'
// import { toast } from 'react-toastify'

// export default function ContactPage() {
//   const [activeTab, setActiveTab] = useState('contact')
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: ''
//   })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     toast.success('Message sent successfully! We will get back to you soon.')
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       subject: '',
//       message: ''
//     })
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const contactInfo = [
//     {
//       icon: <FaPhone className="text-xl" />,
//       title: 'Phone Number',
//       details: '+91 98765 43210',
//       description: 'Mon-Sun, 24/7 Support'
//     },
//     {
//       icon: <FaEnvelope className="text-xl" />,
//       title: 'Email Address',
//       details: 'support@rideease.com',
//       description: 'We reply within 24 hours'
//     },
//     {
//       icon: <FaMapMarkerAlt className="text-xl" />,
//       title: 'Our Locations',
//       details: 'Delhi & Gurugram',
//       description: 'Multiple pickup points'
//     },
//     {
//       icon: <FaClock className="text-xl" />,
//       title: 'Working Hours',
//       details: '24/7',
//       description: 'Round-the-clock service'
//     }
//   ]

//   const faqs = [
//     {
//       q: 'What documents do I need for booking?',
//       a: 'Original driving license, Aadhaar card, and one passport size photo.'
//     },
//     {
//       q: 'Is there a security deposit?',
//       a: 'Yes, a refundable security deposit of ₹5,000 is required for cars and ₹2,000 for bikes.'
//     },
//     {
//       q: 'What happens if the vehicle breaks down?',
//       a: 'We provide 24/7 roadside assistance and will arrange a replacement vehicle if needed.'
//     },
//     {
//       q: 'Can I extend my booking period?',
//       a: 'Yes, you can extend your booking through the app or by calling our support team.'
//     },
//     {
//       q: 'Is fuel included in the rental price?',
//       a: 'No, fuel is not included. The vehicle will be provided with a full tank and should be returned full.'
//     },
//     {
//       q: 'What is your cancellation policy?',
//       a: 'Free cancellation up to 24 hours before pickup. 50% refund for cancellations within 24 hours.'
//     }
//   ]

//   const supportTypes = [
//     {
//       title: 'General Support',
//       phone: '+91 98765 43210',
//       email: 'support@rideease.com',
//       hours: '24/7'
//     },
//     {
//       title: 'Emergency Assistance',
//       phone: '+91 98765 43211',
//       email: 'emergency@rideease.com',
//       hours: '24/7'
//     },
//     {
//       title: 'Corporate Bookings',
//       phone: '+91 98765 43212',
//       email: 'corporate@rideease.com',
//       hours: '9 AM - 6 PM'
//     },
//     {
//       title: 'Vehicle Owners',
//       phone: '+91 98765 43213',
//       email: 'owners@rideease.com',
//       hours: '10 AM - 7 PM'
//     }
//   ]

//   const locations = {
//     delhi: [
//       'Connaught Place',
//       'Aerocity',
//       'Saket',
//       'Dwarka',
//       'Rohini',
//       'Karol Bagh',
//       'Lajpat Nagar',
//       'Vasant Kunj'
//     ],
//     gurugram: [
//       'Cyber City',
//       'Sector 29',
//       'Sector 56',
//       'Sector 14',
//       'MG Road',
//       'DLF Phase 1-5',
//       'Sohna Road',
//       'Golf Course Road'
//     ]
//   }

//   return (
//     <div className="pt-24 pb-16">
//       <div className="section-padding">
//         {/* Hero Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
//             Contact <span className="text-[--color-primary-600]">RideEase</span>
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Get in touch with our team for any queries, support, or feedback.
//             We're here to help you 24/7.
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="mb-8">
//           <div className="flex flex-wrap border-b border-gray-200">
//             <button
//               onClick={() => setActiveTab('contact')}
//               className={`px-6 py-3 font-medium text-lg border-b-2 transition-colors ${
//                 activeTab === 'contact'
//                   ? 'border-[--color-primary-600] text-[--color-primary-600]'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <FaHeadset className="inline mr-2" />
//               Contact Us
//             </button>
//             <button
//               onClick={() => setActiveTab('faq')}
//               className={`px-6 py-3 font-medium text-lg border-b-2 transition-colors ${
//                 activeTab === 'faq'
//                   ? 'border-[--color-primary-600] text-[--color-primary-600]'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <FaQuestionCircle className="inline mr-2" />
//               FAQ
//             </button>
//             <button
//               onClick={() => setActiveTab('support')}
//               className={`px-6 py-3 font-medium text-lg border-b-2 transition-colors ${
//                 activeTab === 'support'
//                   ? 'border-[--color-primary-600] text-[--color-primary-600]'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <FaComments className="inline mr-2" />
//               Support Channels
//             </button>
//             <button
//               onClick={() => setActiveTab('locations')}
//               className={`px-6 py-3 font-medium text-lg border-b-2 transition-colors ${
//                 activeTab === 'locations'
//                   ? 'border-[--color-primary-600] text-[--color-primary-600]'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <FaMapMarkerAlt className="inline mr-2" />
//               Our Locations
//             </button>
//           </div>
//         </div>

//         {/* Contact Tab */}
//         {activeTab === 'contact' && (
//           <div className="grid lg:grid-cols-3 gap-12">
//             {/* Contact Information */}
//             <div className="lg:col-span-1">
//               <div className="space-y-6">
//                 {contactInfo.map((info, index) => (
//                   <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-[--color-primary-100] rounded-lg flex items-center justify-center text-[--color-primary-600]">
//                         {info.icon}
//                       </div>
//                       <div>
//                         <h3 className="font-semibold">{info.title}</h3>
//                         <p className="text-gray-900 font-medium">{info.details}</p>
//                         <p className="text-gray-500 text-sm mt-1">{info.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 {/* WhatsApp Button */}
//                 <a
//                   href="https://wa.me/919876543210"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center justify-center gap-3 bg-green-500 text-white p-4 rounded-xl hover:bg-green-600 transition-colors"
//                 >
//                   <FaWhatsapp className="text-xl" />
//                   <span className="font-semibold">Chat on WhatsApp</span>
//                 </a>

//                 {/* Quick Response */}
//                 <div className="bg-gradient-to-r from-[--color-primary-50] to-[--color-primary-100] p-6 rounded-xl">
//                   <h3 className="font-semibold mb-3">Quick Response Time</h3>
//                   <div className="space-y-2 text-sm text-gray-700">
//                     <div className="flex justify-between">
//                       <span>Email Response:</span>
//                       <span className="font-medium">Within 24 hours</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Phone Response:</span>
//                       <span className="font-medium">Within 15 minutes</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>WhatsApp Response:</span>
//                       <span className="font-medium">Within 5 minutes</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Form */}
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-xl shadow-sm p-8">
//                 <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Your Name *
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent"
//                         placeholder="Enter your name"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address *
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent"
//                         placeholder="Enter your email"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Phone Number *
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent"
//                         placeholder="Enter your phone number"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Subject *
//                       </label>
//                       <select
//                         name="subject"
//                         value={formData.subject}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent"
//                       >
//                         <option value="">Select subject</option>
//                         <option value="booking">Booking Inquiry</option>
//                         <option value="support">Customer Support</option>
//                         <option value="feedback">Feedback & Suggestions</option>
//                         <option value="corporate">Corporate Rental</option>
//                         <option value="other">Other</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Message *
//                     </label>
//                     <textarea
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                       rows={6}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary-500] focus:border-transparent resize-none"
//                       placeholder="Type your message here..."
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="bg-[--color-primary-600] text-white px-8 py-4 rounded-lg font-medium hover:bg-[--color-primary-700] transition-colors flex items-center justify-center gap-3 w-full"
//                   >
//                     <FaPaperPlane />
//                     Send Message
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* FAQ Tab */}
//         {activeTab === 'faq' && (
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//               <div className="p-8">
//                 <h2 className="text-2xl font-semibold mb-8">Frequently Asked Questions</h2>
                
//                 <div className="space-y-6">
//                   {faqs.map((faq, index) => (
//                     <div key={index} className="border-b pb-6 last:border-b-0">
//                       <h3 className="text-lg font-semibold mb-3 text-[--color-primary-700]">
//                         {index + 1}. {faq.q}
//                       </h3>
//                       <p className="text-gray-600">{faq.a}</p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Still have questions */}
//                 <div className="mt-12 p-6 bg-gradient-to-r from-[--color-primary-50] to-[--color-primary-100] rounded-xl">
//                   <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
//                   <p className="text-gray-600 mb-6">
//                     Can't find the answer you're looking for? Please chat with our friendly team.
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <a
//                       href="tel:+919876543210"
//                       className="bg-[--color-primary-600] text-white px-6 py-3 rounded-lg font-medium hover:bg-[--color-primary-700] transition-colors text-center"
//                     >
//                       Call Us Now
//                     </a>
//                     <a
//                       href="https://wa.me/919876543210"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors text-center"
//                     >
//                       WhatsApp Chat
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Support Channels Tab */}
//         {activeTab === 'support' && (
//           <div className="max-w-6xl mx-auto">
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//               {supportTypes.map((support, index) => (
//                 <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
//                   <div className="text-[--color-primary-600] text-2xl mb-4">
//                     {support.title === 'Emergency Assistance' ? '🚨' : 
//                      support.title === 'Corporate Bookings' ? '💼' : 
//                      support.title === 'Vehicle Owners' ? '🚗' : '📞'}
//                   </div>
//                   <h3 className="font-semibold text-lg mb-3">{support.title}</h3>
//                   <div className="space-y-2">
//                     <div>
//                       <div className="text-sm text-gray-500">Phone</div>
//                       <div className="font-medium">{support.phone}</div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-gray-500">Email</div>
//                       <div className="font-medium">{support.email}</div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-gray-500">Hours</div>
//                       <div className="font-medium">{support.hours}</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Support Process */}
//             <div className="bg-white rounded-xl shadow-sm p-8">
//               <h2 className="text-2xl font-semibold mb-6">Our Support Process</h2>
              
//               <div className="grid md:grid-cols-4 gap-6">
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-[--color-primary-100] rounded-full flex items-center justify-center text-[--color-primary-600] font-bold text-xl mx-auto mb-4">
//                     1
//                   </div>
//                   <h4 className="font-semibold mb-2">Contact Us</h4>
//                   <p className="text-gray-600 text-sm">Reach out via phone, email, or WhatsApp</p>
//                 </div>
                
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-[--color-primary-100] rounded-full flex items-center justify-center text-[--color-primary-600] font-bold text-xl mx-auto mb-4">
//                     2
//                   </div>
//                   <h4 className="font-semibold mb-2">Issue Identification</h4>
//                   <p className="text-gray-600 text-sm">Our team will understand your concern</p>
//                 </div>
                
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-[--color-primary-100] rounded-full flex items-center justify-center text-[--color-primary-600] font-bold text-xl mx-auto mb-4">
//                     3
//                   </div>
//                   <h4 className="font-semibold mb-2">Solution Implementation</h4>
//                   <p className="text-gray-600 text-sm">We work on resolving your issue</p>
//                 </div>
                
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-[--color-primary-100] rounded-full flex items-center justify-center text-[--color-primary-600] font-bold text-xl mx-auto mb-4">
//                     4
//                   </div>
//                   <h4 className="font-semibold mb-2">Follow Up</h4>
//                   <p className="text-gray-600 text-sm">We ensure your satisfaction</p>
//                 </div>
//               </div>

//               {/* Response Time Guarantee */}
//               <div className="mt-12 p-6 bg-gradient-to-r from-[--color-primary-50] to-[--color-primary-100] rounded-xl">
//                 <h3 className="text-xl font-semibold mb-4">Response Time Guarantee</h3>
//                 <div className="grid md:grid-cols-3 gap-6">
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-[--color-primary-600]">5 min</div>
//                     <div className="text-gray-600">WhatsApp Response</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-[--color-primary-600]">15 min</div>
//                     <div className="text-gray-600">Phone Response</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-[--color-primary-600]">24 hrs</div>
//                     <div className="text-gray-600">Email Response</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Locations Tab */}
//         {activeTab === 'locations' && (
//           <div className="max-w-6xl mx-auto">
//             <div className="grid lg:grid-cols-2 gap-12">
//               {/* Delhi Locations */}
//               <div className="bg-white rounded-xl shadow-sm p-8">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-12 h-12 bg-gradient-to-r from-[--color-primary-500] to-[--color-primary-700] rounded-lg flex items-center justify-center">
//                     <span className="text-white text-xl">🇮🇳</span>
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-semibold">Delhi Locations</h2>
//                     <p className="text-gray-600">8+ pickup points across Delhi</p>
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   {locations.delhi.map((location, index) => (
//                     <div key={index} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//                       <FaMapMarkerAlt className="text-[--color-primary-600]" />
//                       <div>
//                         <div className="font-medium">{location}</div>
//                         <div className="text-sm text-gray-500">Open 24/7</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Delhi Info */}
//                 <div className="mt-8 p-6 bg-gray-50 rounded-lg">
//                   <h3 className="font-semibold mb-3">Delhi Service Information</h3>
//                   <ul className="text-gray-600 space-y-2">
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-[--color-primary-600] rounded-full"></span>
//                       <span>Free delivery within 10km radius</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-[--color-primary-600] rounded-full"></span>
//                       <span>24/7 vehicle pickup and drop</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-[--color-primary-600] rounded-full"></span>
//                       <span>Multiple payment options available</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               {/* Gurugram Locations */}
//               <div className="bg-white rounded-xl shadow-sm p-8">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-12 h-12 bg-gradient-to-r from-[--color-secondary-500] to-[--color-secondary-700] rounded-lg flex items-center justify-center">
//                     <span className="text-white text-xl">🏙️</span>
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-semibold">Gurugram Locations</h2>
//                     <p className="text-gray-600">8+ pickup points across Gurugram</p>
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   {locations.gurugram.map((location, index) => (
//                     <div key={index} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//                       <FaMapMarkerAlt className="text-[--color-secondary-600]" />
//                       <div>
//                         <div className="font-medium">{location}</div>
//                         <div className="text-sm text-gray-500">Open 24/7</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Gurugram Info */}
//                 <div className="mt-8 p-6 bg-gray-50 rounded-lg">
//                   <h3 className="font-semibold mb-3">Gurugram Service Information</h3>
//                   <ul className="text-gray-600 space-y-2">
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-[--color-secondary-600] rounded-full"></span>
//                       <span>Free delivery within 15km radius</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-[--color-secondary-600] rounded-full"></span>
//                       <span>Corporate rental packages available</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-[--color-secondary-600] rounded-full"></span>
//                       <span>Premium vehicle options</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Map Section */}
//             <div className="mt-12 bg-gradient-to-r from-[--color-primary-50] to-[--color-primary-100] p-8 rounded-2xl">
//               <h3 className="text-2xl font-semibold mb-6 text-center">Service Coverage Map</h3>
              
//               <div className="grid md:grid-cols-3 gap-8">
//                 <div className="text-center">
//                   <div className="text-4xl mb-4">🗺️</div>
//                   <h4 className="font-semibold mb-2">Delhi NCR Coverage</h4>
//                   <p className="text-gray-600">Complete coverage across Delhi and satellite cities</p>
//                 </div>
                
//                 <div className="text-center">
//                   <div className="text-4xl mb-4">📍</div>
//                   <h4 className="font-semibold mb-2">16+ Pickup Points</h4>
//                   <p className="text-gray-600">Convenient locations across both cities</p>
//                 </div>
                
//                 <div className="text-center">
//                   <div className="text-4xl mb-4">🚗</div>
//                   <h4 className="font-semibold mb-2">Free Delivery Zone</h4>
//                   <p className="text-gray-600">Within 10-15km radius of pickup points</p>
//                 </div>
//               </div>

//               {/* Coming Soon */}
//               <div className="mt-8 p-6 bg-white rounded-xl text-center">
//                 <h4 className="font-semibold mb-2">Coming Soon!</h4>
//                 <p className="text-gray-600">
//                   We're expanding to Noida, Faridabad, and Ghaziabad soon. Stay tuned!
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Bottom CTA */}
//         <div className="mt-16 text-center">
//           <h3 className="text-2xl font-semibold mb-6">Need Immediate Assistance?</h3>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a
//               href="tel:+919876543210"
//               className="bg-[--color-primary-600] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[--color-primary-700] transition-colors text-lg"
//             >
//               Call Now: +91 98765 43210
//             </a>
//             <a
//               href="https://wa.me/919876543210"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors text-lg"
//             >
//               WhatsApp Chat
//             </a>
//           </div>
//           <p className="text-gray-500 mt-4">
//             We're available 24/7 to assist you with any queries or emergencies.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaWhatsapp, FaHeadset, FaComments, FaQuestionCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('contact')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message sent successfully! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: <FaPhone className="text-xl" />,
      title: 'Phone Number',
      details: '+91 98765 43210',
      description: 'Mon-Sun, 24/7 Support'
    },
    {
      icon: <FaEnvelope className="text-xl" />,
      title: 'Email Address',
      details: 'support@rideease.com',
      description: 'We reply within 24 hours'
    },
    {
      icon: <FaMapMarkerAlt className="text-xl" />,
      title: 'Our Locations',
      details: 'Delhi & Gurugram',
      description: 'Multiple pickup points'
    },
    {
      icon: <FaClock className="text-xl" />,
      title: 'Working Hours',
      details: '24/7',
      description: 'Round-the-clock service'
    }
  ]

  const faqs = [
    {
      q: 'What documents do I need for booking?',
      a: 'Original driving license, Aadhaar card, and one passport size photo.'
    },
    {
      q: 'Is there a security deposit?',
      a: 'Yes, a refundable security deposit of ₹5,000 is required for cars and ₹2,000 for bikes.'
    },
    {
      q: 'What happens if the vehicle breaks down?',
      a: 'We provide 24/7 roadside assistance and will arrange a replacement vehicle if needed.'
    },
    {
      q: 'Can I extend my booking period?',
      a: 'Yes, you can extend your booking through the app or by calling our support team.'
    },
    {
      q: 'Is fuel included in the rental price?',
      a: 'No, fuel is not included. The vehicle will be provided with a full tank and should be returned full.'
    },
    {
      q: 'What is your cancellation policy?',
      a: 'Free cancellation up to 24 hours before pickup. 50% refund for cancellations within 24 hours.'
    }
  ]

  const supportTypes = [
    {
      title: 'General Support',
      phone: '+91 98765 43210',
      email: 'support@rideease.com',
      hours: '24/7'
    },
    {
      title: 'Emergency Assistance',
      phone: '+91 98765 43211',
      email: 'emergency@rideease.com',
      hours: '24/7'
    },
    {
      title: 'Corporate Bookings',
      phone: '+91 98765 43212',
      email: 'corporate@rideease.com',
      hours: '9 AM - 6 PM'
    },
    {
      title: 'Vehicle Owners',
      phone: '+91 98765 43213',
      email: 'owners@rideease.com',
      hours: '10 AM - 7 PM'
    }
  ]

  const locations = {
    delhi: [
      'Connaught Place',
      'Aerocity',
      'Saket',
      'Dwarka',
      'Rohini',
      'Karol Bagh',
      'Lajpat Nagar',
      'Vasant Kunj'
    ],
    gurugram: [
      'Cyber City',
      'Sector 29',
      'Sector 56',
      'Sector 14',
      'MG Road',
      'DLF Phase 1-5',
      'Sohna Road',
      'Golf Course Road'
    ]
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section with Image */}
      <section className="relative h-[450px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Call center support"
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
              Contact <span className="text-emerald-400">RideEase</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              Get in touch with our team for any queries, support, or feedback.
              We're here to help you 24/7.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {['contact', 'faq', 'support', 'locations'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium text-lg transition-all ${
                  activeTab === tab
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab === 'contact' && <FaHeadset className="inline mr-2" />}
                {tab === 'faq' && <FaQuestionCircle className="inline mr-2" />}
                {tab === 'support' && <FaComments className="inline mr-2" />}
                {tab === 'locations' && <FaMapMarkerAlt className="inline mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of the content with motion animations */}
      <section className="py-12">
        <div className="section-padding max-w-7xl mx-auto">
          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-3 gap-12"
            >
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center text-white text-2xl">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700">{info.title}</h3>
                        <p className="text-emerald-600 font-bold">{info.details}</p>
                        <p className="text-gray-500 text-sm mt-1">{info.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* WhatsApp Button */}
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-500 text-white p-5 rounded-xl hover:bg-green-600 transition-colors shadow-lg"
                >
                  <FaWhatsapp className="text-2xl" />
                  <span className="font-semibold text-lg">Chat on WhatsApp</span>
                </motion.a>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
                >
                  <h2 className="text-2xl font-bold mb-6 text-emerald-600">Send us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="">Select subject</option>
                          <option value="booking">Booking Inquiry</option>
                          <option value="support">Customer Support</option>
                          <option value="feedback">Feedback & Suggestions</option>
                          <option value="corporate">Corporate Rental</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                        placeholder="Type your message here..."
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-colors flex items-center justify-center gap-3 shadow-lg"
                    >
                      <FaPaperPlane />
                      Send Message
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-8 text-emerald-600">Frequently Asked Questions</h2>
                  
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border-b pb-6 last:border-b-0 cursor-pointer group"
                      >
                        <h3 className="text-lg font-semibold mb-3 text-gray-800 group-hover:text-emerald-600 transition-colors">
                          <span className="text-emerald-600 font-bold mr-2">{index + 1}.</span> {faq.q}
                        </h3>
                        <p className="text-gray-600 ml-6">{faq.a}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Support Channels Tab */}
          {activeTab === 'support' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {supportTypes.map((support, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="text-4xl mb-4">
                      {support.title === 'Emergency Assistance' ? '🚨' : 
                       support.title === 'Corporate Bookings' ? '💼' : 
                       support.title === 'Vehicle Owners' ? '🚗' : '📞'}
                    </div>
                    <h3 className="font-semibold text-xl mb-4">{support.title}</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium text-emerald-600">{support.phone}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-medium text-emerald-600">{support.email}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Hours</div>
                        <div className="font-medium">{support.hours}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Locations Tab */}
          {activeTab === 'locations' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12"
            >
              {/* Delhi Locations */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center text-white text-2xl">
                    🇮🇳
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-600">Delhi Locations</h2>
                    <p className="text-gray-600">8+ pickup points across Delhi</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {locations.delhi.map((location, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 p-4 border rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      <FaMapMarkerAlt className="text-emerald-600 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{location}</div>
                        <div className="text-sm text-gray-500">Open 24/7</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Gurugram Locations */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-white text-2xl">
                    🏙️
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600">Gurugram Locations</h2>
                    <p className="text-gray-600">8+ pickup points across Gurugram</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {locations.gurugram.map((location, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 p-4 border rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      <FaMapMarkerAlt className="text-purple-600 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{location}</div>
                        <div className="text-sm text-gray-500">Open 24/7</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-800">
        <div className="section-padding max-w-7xl mx-auto text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-8"
          >
            Need Immediate Assistance?
          </motion.h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="tel:+919876543210"
              className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors text-lg shadow-xl"
            >
              Call Now: +91 98765 43210
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition-colors text-lg shadow-xl"
            >
              WhatsApp Chat
            </motion.a>
          </div>
          <p className="text-emerald-100 mt-6 text-lg">
            We're available 24/7 to assist you with any queries or emergencies.
          </p>
        </div>
      </section>
    </div>
  )
}