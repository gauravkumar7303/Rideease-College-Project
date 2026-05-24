export const VEHICLES_DATA = [
  // Bikes
  {
    id: 1,
    type: 'bike',
    brand: 'Royal Enfield',
    model: 'Classic 350',
    price: 800,
    originalPrice: 1000,
    location: 'Delhi, Connaught Place',
    rating: 4.7,
    image: '/assets/images/bikes/classic350.jpg',
    features: ['350cc', 'Petrol', 'Cruiser', 'ABS', 'Disc Brakes'],
    available: true,
    verified: true,
    delivery: 'Free',
    distance: '2.5 km away',
    seats: 2,
    transmission: 'Manual',
    year: 2023
  },
  {
    id: 2,
    type: 'bike',
    brand: 'KTM',
    model: 'Duke 390',
    price: 1200,
    location: 'Gurugram, Cyber City',
    rating: 4.8,
    image: '/assets/images/bikes/duke390.jpg',
    features: ['390cc', 'Petrol', 'Sports', 'ABS', 'Quick Shifter'],
    available: true,
    verified: true,
    delivery: 'Free',
    distance: '3.1 km away',
    seats: 2,
    transmission: 'Manual',
    year: 2024
  },
  {
    id: 3,
    type: 'bike',
    brand: 'Honda',
    model: 'Activa 125',
    price: 500,
    location: 'Delhi, Rohini',
    rating: 4.5,
    image: '/assets/images/bikes/activa125.jpg',
    features: ['125cc', 'Petrol', 'Scooter', 'CBS', 'LED Lights'],
    available: true,
    verified: true,
    delivery: '₹50',
    distance: '1.8 km away',
    seats: 2,
    transmission: 'Automatic',
    year: 2023
  },
  {
    id: 4,
    type: 'bike',
    brand: 'Yamaha',
    model: 'R15 V4',
    price: 1100,
    location: 'Gurugram, Sector 29',
    rating: 4.6,
    image: '/assets/images/bikes/r15v4.jpg',
    features: ['155cc', 'Petrol', 'Sports', 'VVA', 'LED DRLs'],
    available: true,
    verified: true,
    delivery: 'Free',
    distance: '4.2 km away',
    seats: 2,
    transmission: 'Manual',
    year: 2024
  },

  // Cars
  {
    id: 5,
    type: 'car',
    brand: 'Hyundai',
    model: 'Creta SX',
    price: 2200,
    originalPrice: 2500,
    location: 'Delhi, Aerocity',
    rating: 4.6,
    image: '/assets/images/cars/creta.jpg',
    features: ['Automatic', 'Petrol', '5 Seater', 'AC', 'Sunroof', 'Camera'],
    available: true,
    verified: true,
    delivery: 'Free',
    distance: '5.3 km away',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    year: 2023
  },
  {
    id: 6,
    type: 'car',
    brand: 'Maruti Suzuki',
    model: 'Swift Dzire',
    price: 1800,
    location: 'Gurugram, Sector 14',
    rating: 4.3,
    image: '/assets/images/cars/swift.jpg',
    features: ['Manual', 'Petrol', '5 Seater', 'AC', 'Power Windows'],
    available: true,
    verified: true,
    delivery: '₹100',
    distance: '2.7 km away',
    seats: 5,
    transmission: 'Manual',
    fuel: 'Petrol',
    year: 2022
  },
  {
    id: 7,
    type: 'car',
    brand: 'Toyota',
    model: 'Innova Crysta',
    price: 3500,
    location: 'Delhi, Saket',
    rating: 4.7,
    image: '/assets/images/cars/innova.jpg',
    features: ['Automatic', 'Diesel', '7 Seater', 'AC', 'Leather Seats'],
    available: true,
    verified: true,
    delivery: 'Free',
    distance: '6.1 km away',
    seats: 7,
    transmission: 'Automatic',
    fuel: 'Diesel',
    year: 2023
  },
  {
    id: 8,
    type: 'car',
    brand: 'Tata',
    model: 'Nexon EV',
    price: 2800,
    location: 'Gurugram, Sector 45',
    rating: 4.5,
    image: '/assets/images/cars/nexon.jpg',
    features: ['Automatic', 'Electric', '5 Seater', 'AC', 'Sunroof'],
    available: true,
    verified: true,
    delivery: 'Free',
    distance: '3.9 km away',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    year: 2024
  },
  {
    id: 9,
    type: 'car',
    brand: 'Mahindra',
    model: 'Scorpio N',
    price: 3200,
    location: 'Delhi, Dwarka',
    rating: 4.4,
    image: '/assets/images/cars/scorpio.jpg',
    features: ['Manual', 'Diesel', '7 Seater', 'AC', '4x4'],
    available: true,
    verified: true,
    delivery: '₹150',
    distance: '7.2 km away',
    seats: 7,
    transmission: 'Manual',
    fuel: 'Diesel',
    year: 2023
  },
  {
    id: 10,
    type: 'car',
    brand: 'Honda',
    model: 'City V',
    price: 2400,
    location: 'Gurugram, Sector 56',
    rating: 4.6,
    image: '/assets/images/cars/city.jpg',
    features: ['Automatic', 'Petrol', '5 Seater', 'AC', 'Camera'],
    available: true,
    verified: true,
    delivery: 'Free',
    distance: '4.5 km away',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    year: 2024
  }
]

export const FEATURES = {
  bikes: [
    { label: 'Engine CC', key: 'engine' },
    { label: 'Fuel Type', key: 'fuel' },
    { label: 'Type', key: 'type' },
    { label: 'ABS', key: 'abs' },
    { label: 'Transmission', key: 'transmission' },
    { label: 'Year', key: 'year' }
  ],
  cars: [
    { label: 'Transmission', key: 'transmission' },
    { label: 'Fuel Type', key: 'fuel' },
    { label: 'Seating', key: 'seats' },
    { label: 'AC', key: 'ac' },
    { label: 'Type', key: 'type' },
    { label: 'Year', key: 'year' }
  ]
}

export const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    role: 'Software Engineer',
    rating: 5,
    comment: 'Best bike rental service in Delhi! The Classic 350 was in perfect condition and delivery was on time.',
    avatar: 'RS'
  },
  {
    name: 'Priya Singh',
    role: 'College Student',
    rating: 5,
    comment: 'Perfect for my daily commute. Affordable prices and excellent customer support.',
    avatar: 'PS'
  },
  {
    name: 'Amit Verma',
    role: 'Business Traveler',
    rating: 4,
    comment: 'Car with driver service saved me so much time during my business trip to Gurugram.',
    avatar: 'AV'
  },
  {
    name: 'Neha Patel',
    role: 'Tourist',
    rating: 5,
    comment: 'Rented a car for our family trip. Everything was smooth and hassle-free. Highly recommended!',
    avatar: 'NP'
  }
]

export const LOCATIONS = [
  'Delhi - Connaught Place',
  'Delhi - Aerocity',
  'Delhi - Saket',
  'Delhi - Dwarka',
  'Gurugram - Cyber City',
  'Gurugram - Sector 29',
  'Gurugram - Sector 56',
  'Noida - Sector 62',
  'Faridabad - Sector 21'
]

export const BRANDS = {
  bikes: [
    'Royal Enfield', 'KTM', 'Honda', 'Yamaha', 'Bajaj', 
    'TVS', 'Hero', 'Suzuki', 'Kawasaki', 'BMW'
  ],
  cars: [
    'Maruti Suzuki', 'Hyundai', 'Toyota', 'Honda', 'Tata',
    'Mahindra', 'Ford', 'Volkswagen', 'Skoda', 'MG', 'Kia'
  ]
}

export const FILTER_OPTIONS = {
  priceRanges: [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
    { label: '₹2000 - ₹3000', min: 2000, max: 3000 },
    { label: 'Above ₹3000', min: 3000, max: 10000 }
  ],
  ratings: [
    { label: '4.5 & above', value: 4.5 },
    { label: '4.0 & above', value: 4.0 },
    { label: '3.5 & above', value: 3.5 },
    { label: '3.0 & above', value: 3.0 }
  ],
  features: [
    { label: 'AC Available', value: 'ac' },
    { label: 'Free Delivery', value: 'free_delivery' },
    { label: 'With Driver', value: 'with_driver' },
    { label: 'Company Verified', value: 'verified' },
    { label: 'Instant Booking', value: 'instant' }
  ]
}