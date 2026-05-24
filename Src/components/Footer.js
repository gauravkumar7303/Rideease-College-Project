// import Link from 'next/link'
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

// export default function Footer() {
//   const currentYear = new Date().getFullYear()

//   const footerLinks = {
//     services: [
//       { name: 'Self-Drive Bikes', href: '/bikes' },
//       { name: 'Self-Drive Cars', href: '/cars' },
//       { name: 'Car with Driver', href: '/cars?withDriver=true' },
//       { name: 'Long Term Rental', href: '/rental/long-term' },
//       { name: 'Corporate Rental', href: '/corporate' },
//     ],
//     company: [
//       { name: 'About Us', href: '/about' },
//       { name: 'How It Works', href: '#how-it-works' },
//       { name: 'Careers', href: '/careers' },
//       { name: 'Blog', href: '/blog' },
//       { name: 'Press', href: '/press' },
//     ],
//     support: [
//       { name: 'Help Center', href: '/help' },
//       { name: 'Safety', href: '/safety' },
//       { name: 'FAQs', href: '/faq' },
//       { name: 'Terms & Conditions', href: '/terms' },
//       { name: 'Privacy Policy', href: '/privacy' },
//     ],
//     cities: [
//       { name: 'Delhi', href: '/delhi' },
//       { name: 'Gurugram', href: '/gurugram' },
//       { name: 'Noida', href: '/noida' },
//       { name: 'Faridabad', href: '/faridabad' },
//       { name: 'Ghaziabad', href: '/ghaziabad' },
//     ],
//   }

//   const socialLinks = [
//     { icon: <FaFacebook />, href: '#', label: 'Facebook' },
//     { icon: <FaTwitter />, href: '#', label: 'Twitter' },
//     { icon: <FaInstagram />, href: '#', label: 'Instagram' },
//     { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
//   ]

//   return (
//     <footer className="bg-gray-900 text-white mt-auto">
//       <div className="section-padding">
//         <div className="py-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//             {/* Company Info */}
//             <div className="lg:col-span-2">
//               <Link href="/" className="flex items-center space-x-2 mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-r from-[--color-primary-500] to-[--color-primary-700] rounded-lg flex items-center justify-center">
//                   <FaMapMarkerAlt className="text-white text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold">RideEase</h3>
//                   <p className="text-gray-400 text-sm">Delhi & Gurugram</p>
//                 </div>
//               </Link>
//               <p className="text-gray-400 mb-6 max-w-md">
//                 Your trusted bike and car rental platform in Delhi NCR. 
//                 Company-verified vehicles with end-to-end service, damage protection, and 24/7 support.
//               </p>
//               <div className="flex space-x-4">
//                 {socialLinks.map((social) => (
//                   <a
//                     key={social.label}
//                     href={social.href}
//                     className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center 
//                              hover:bg-[--color-primary-600] transition-colors"
//                     aria-label={social.label}
//                   >
//                     {social.icon}
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Services */}
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Services</h4>
//               <ul className="space-y-2">
//                 {footerLinks.services.map((link) => (
//                   <li key={link.name}>
//                     <Link
//                       href={link.href}
//                       className="text-gray-400 hover:text-white transition-colors"
//                     >
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Company */}
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Company</h4>
//               <ul className="space-y-2">
//                 {footerLinks.company.map((link) => (
//                   <li key={link.name}>
//                     <Link
//                       href={link.href}
//                       className="text-gray-400 hover:text-white transition-colors"
//                     >
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Contact */}
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
//               <ul className="space-y-3">
//                 <li className="flex items-center space-x-3 text-gray-400">
//                   <FaPhone className="text-[--color-primary-500]" />
//                   <span>+91 98765 43210</span>
//                 </li>
//                 <li className="flex items-center space-x-3 text-gray-400">
//                   <FaEnvelope className="text-[--color-primary-500]" />
//                   <span>support@rideease.com</span>
//                 </li>
//                 <li className="flex items-center space-x-3 text-gray-400">
//                   <FaMapMarkerAlt className="text-[--color-primary-500]" />
//                   <span>Delhi & Gurugram, India</span>
//                 </li>
//               </ul>
              
//               <div className="mt-6">
//                 <h4 className="text-lg font-semibold mb-4">Our Cities</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {footerLinks.cities.map((city) => (
//                     <Link
//                       key={city.name}
//                       href={city.href}
//                       className="px-3 py-1 bg-gray-800 rounded-full text-sm 
//                                hover:bg-[--color-primary-600] transition-colors"
//                     >
//                       {city.name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-800 py-6">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 text-sm">
//               &copy; {currentYear} RideEase. All rights reserved.
//             </p>
            
//             <div className="flex items-center space-x-6 mt-4 md:mt-0">
//               <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
//                 Terms of Service
//               </Link>
//               <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
//                 Privacy Policy
//               </Link>
//               <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm">
//                 Sitemap
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaTimes,
  FaBriefcase, FaNewspaper, FaBullhorn, FaFileAlt,
  FaShieldAlt
} from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  // Modal states
  const [showCareers, setShowCareers] = useState(false)
  const [showBlog, setShowBlog] = useState(false)
  const [showPress, setShowPress] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  const footerLinks = {
    services: [
      { name: 'Self-Drive Bikes', href: '/bikes' },
      { name: 'Self-Drive Cars', href: '/cars' },
      { name: 'Car with Driver', href: '/cars?withDriver=true' },
      { name: 'Long Term Rental', href: '/rental/long-term' },
      { name: 'Corporate Rental', href: '/corporate' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Careers', href: '#', onClick: () => setShowCareers(true) },
      { name: 'Blog', href: '#', onClick: () => setShowBlog(true) },
      { name: 'Press', href: '#', onClick: () => setShowPress(true) },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Safety', href: '/safety' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Terms & Conditions', href: '#', onClick: () => setShowTerms(true) },
      { name: 'Privacy Policy', href: '#', onClick: () => setShowPrivacy(true) },
    ],
    cities: [
      { name: 'Delhi', href: '/delhi' },
      { name: 'Gurugram', href: '/gurugram' },
      { name: 'Noida', href: '/noida' },
      { name: 'Faridabad', href: '/faridabad' },
      { name: 'Ghaziabad', href: '/ghaziabad' },
    ],
  }

  const socialLinks = [
    { icon: <FaFacebook />, href: '#', label: 'Facebook' },
    { icon: <FaTwitter />, href: '#', label: 'Twitter' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram' },
    { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
  ]

  // Modal Components
  const Modal = ({ isOpen, onClose, title, icon, children }) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-emerald-600">{icon}</span>
              <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="section-padding">
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <Link href="/" className="flex items-center space-x-2 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">RideEase</h3>
                    <p className="text-gray-400 text-sm">Delhi & Gurugram</p>
                  </div>
                </Link>
                <p className="text-gray-400 mb-6 max-w-md">
                  Your trusted bike and car rental platform in Delhi NCR. 
                  Company-verified vehicles with end-to-end service, damage protection, and 24/7 support.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center 
                               hover:bg-emerald-600 transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      {link.onClick ? (
                        <button
                          onClick={link.onClick}
                          className="text-gray-400 hover:text-white transition-colors text-left w-full"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3 text-gray-400">
                    <FaPhone className="text-emerald-500" />
                    <span>+91 98765 43210</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-400">
                    <FaEnvelope className="text-emerald-500" />
                    <span>support@rideease.com</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-400">
                    <FaMapMarkerAlt className="text-emerald-500" />
                    <span>Delhi & Gurugram, India</span>
                  </li>
                </ul>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4">Our Cities</h4>
                  <div className="flex flex-wrap gap-2">
                    {footerLinks.cities.map((city) => (
                      <Link
                        key={city.name}
                        href={city.href}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm 
                                 hover:bg-emerald-600 transition-colors"
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} RideEase. All rights reserved.
              </p>
              
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <button
                  onClick={() => setShowTerms(true)}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Privacy Policy
                </button>
                <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Careers Modal */}
      <Modal isOpen={showCareers} onClose={() => setShowCareers(false)} title="Careers at RideEase" icon={<FaBriefcase />}>
        <div className="space-y-6">
          <p className="text-gray-600">
            Join our team and help shape the future of mobility in India. We're always looking for talented individuals who are passionate about what they do.
          </p>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg">Senior Full Stack Developer</h3>
              <p className="text-gray-600 text-sm mb-2">Gurugram • Full-time</p>
              <p className="text-gray-600 mb-3">3-5 years experience with React, Node.js, MongoDB</p>
              <button className="text-emerald-600 font-medium hover:underline">Apply Now →</button>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg">Operations Manager</h3>
              <p className="text-gray-600 text-sm mb-2">Delhi • Full-time</p>
              <p className="text-gray-600 mb-3">4-6 years experience in logistics/operations</p>
              <button className="text-emerald-600 font-medium hover:underline">Apply Now →</button>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg">Customer Support Executive</h3>
              <p className="text-gray-600 text-sm mb-2">Gurugram • Full-time</p>
              <p className="text-gray-600 mb-3">1-2 years experience in customer support</p>
              <button className="text-emerald-600 font-medium hover:underline">Apply Now →</button>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Don't see a role that fits? Send your resume to careers@rideease.com
          </p>
        </div>
      </Modal>

      {/* Blog Modal */}
      <Modal isOpen={showBlog} onClose={() => setShowBlog(false)} title="RideEase Blog" icon={<FaNewspaper />}>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-1">Complete Guide to Self-Drive Rentals</h3>
              <p className="text-gray-600 text-sm mb-2">Feb 15, 2024 • 5 min read</p>
              <p className="text-gray-600">Everything you need to know about renting bikes and cars in Delhi NCR...</p>
              <button className="text-emerald-600 font-medium hover:underline mt-2 inline-block">Read More →</button>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-1">Top 5 Weekend Getaways from Delhi</h3>
              <p className="text-gray-600 text-sm mb-2">Feb 10, 2024 • 4 min read</p>
              <p className="text-gray-600">Planning a weekend trip? Here are the best destinations within 4-5 hours drive...</p>
              <button className="text-emerald-600 font-medium hover:underline mt-2 inline-block">Read More →</button>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-1">How RideEase Ensures Vehicle Safety</h3>
              <p className="text-gray-600 text-sm mb-2">Feb 5, 2024 • 3 min read</p>
              <p className="text-gray-600">Learn about our 50-point inspection process and safety measures...</p>
              <button className="text-emerald-600 font-medium hover:underline mt-2 inline-block">Read More →</button>
            </div>
          </div>
          
          <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            View All Posts
          </button>
        </div>
      </Modal>

      {/* Press Modal */}
      <Modal isOpen={showPress} onClose={() => setShowPress(false)} title="Press & Media" icon={<FaBullhorn />}>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-1">RideEase Raises $10M in Series A Funding</h3>
              <p className="text-gray-600 text-sm mb-2">Feb 1, 2024 • TechCrunch</p>
              <p className="text-gray-600">Leading bike and car rental platform secures funding to expand to new cities...</p>
              <button className="text-emerald-600 font-medium hover:underline mt-2 inline-block">Read Press Release →</button>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-1">RideEase Launches Electric Vehicle Fleet</h3>
              <p className="text-gray-600 text-sm mb-2">Jan 15, 2024 • Economic Times</p>
              <p className="text-gray-600">Company introduces electric bikes and cars to promote sustainable mobility...</p>
              <button className="text-emerald-600 font-medium hover:underline mt-2 inline-block">Read Press Release →</button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Media Kit</h3>
            <div className="space-y-2">
              <button className="text-emerald-600 hover:underline flex items-center gap-2">
                <FaFileAlt /> Download Press Kit (ZIP)
              </button>
              <button className="text-emerald-600 hover:underline flex items-center gap-2">
                <FaFileAlt /> Brand Guidelines (PDF)
              </button>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            For media inquiries: press@rideease.com
          </p>
        </div>
      </Modal>

      {/* Terms Modal */}
      <Modal isOpen={showTerms} onClose={() => setShowTerms(false)} title="Terms & Conditions" icon={<FaFileAlt />}>
        <div className="space-y-6 text-gray-600">
          <section>
            <h3 className="font-semibold text-lg mb-2">1. Acceptance of Terms</h3>
            <p>By accessing or using RideEase's services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">2. Eligibility</h3>
            <p>You must be at least 21 years old and possess a valid driving license to rent vehicles through our platform. International customers must have a valid international driving permit.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">3. Booking and Payment</h3>
            <p>All bookings must be made through our website or app. Payment is required at the time of booking. We accept all major credit cards, debit cards, and UPI payments.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">4. Cancellation Policy</h3>
            <p>Cancellations made 24 hours before pickup are eligible for a full refund. Cancellations within 24 hours will incur a 50% cancellation fee. No-shows will be charged the full amount.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">5. Vehicle Usage</h3>
            <p>Vehicles must be returned in the same condition as received. Any damages will be assessed and charged accordingly. Smoking is strictly prohibited in all vehicles.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">6. Insurance and Liability</h3>
            <p>All rentals include basic insurance coverage. Additional coverage options are available. Renter is responsible for any damages not covered by insurance.</p>
          </section>
          
          <p className="text-sm text-gray-500 mt-4">Last updated: February 2024</p>
        </div>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy" icon={<FaShieldAlt />}>
        <div className="space-y-6 text-gray-600">
          <section>
            <h3 className="font-semibold text-lg mb-2">1. Information We Collect</h3>
            <p className="mb-2">We collect information you provide directly to us, such as when you:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Create an account or profile</li>
              <li>Make a booking or rental</li>
              <li>Contact customer support</li>
              <li>Submit reviews or ratings</li>
              <li>Participate in promotions or surveys</li>
            </ul>
            <p className="mt-2">This information may include your name, email address, phone number, payment information, driver's license details, and any other information you choose to provide.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">2. How We Use Your Information</h3>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process and manage your bookings</li>
              <li>Verify your identity and eligibility</li>
              <li>Communicate with you about your bookings</li>
              <li>Send you promotional offers and updates (with your consent)</li>
              <li>Improve our services and user experience</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">3. Information Sharing</h3>
            <p className="mb-2">We may share your information with:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">Vehicle Owners:</span> To facilitate rentals and communicate about bookings</li>
              <li><span className="font-medium">Drivers:</span> When you book with a driver service</li>
              <li><span className="font-medium">Service Providers:</span> Payment processors, insurance partners, and customer support tools</li>
              <li><span className="font-medium">Legal Authorities:</span> When required by law or to protect our rights</li>
            </ul>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">4. Data Security</h3>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">5. Your Rights</h3>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Delete your personal data</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-2">To exercise these rights, please contact us at privacy@rideease.com</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">6. Cookies and Tracking</h3>
            <p>We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and personalize content. You can control cookies through your browser settings.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">7. Third-Party Links</h3>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites. We encourage you to review their privacy policies.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">8. Children's Privacy</h3>
            <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">9. Changes to Privacy Policy</h3>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2">10. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">RideEase Privacy Team</p>
              <p>Email: privacy@rideease.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Address: Delhi & Gurugram, India</p>
            </div>
          </section>
          
          <p className="text-sm text-gray-500 mt-4">Last updated: February 2024</p>
        </div>
      </Modal>
    </>
  )
}