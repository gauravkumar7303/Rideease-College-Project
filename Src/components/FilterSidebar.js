'use client'

import { FaStar } from 'react-icons/fa'

export default function FilterSidebar({ type, filters, onFilterChange, onClearFilters }) {
  const priceRanges = type === 'bike' ? [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
    { label: '₹2000 - ₹3000', min: 2000, max: 3000 },
    { label: 'Above ₹3000', min: 3000, max: 10000 }
  ] : [
    { label: 'Under ₹1500', min: 0, max: 1500 },
    { label: '₹1500 - ₹2500', min: 1500, max: 2500 },
    { label: '₹2500 - ₹3500', min: 2500, max: 3500 },
    { label: '₹3500 - ₹5000', min: 3500, max: 5000 },
    { label: 'Above ₹5000', min: 5000, max: 20000 }
  ]

  const ratings = [
    { label: '4.5 & above', value: 4.5 },
    { label: '4.0 & above', value: 4.0 },
    { label: '3.5 & above', value: 3.5 },
    { label: '3.0 & above', value: 3.0 }
  ]

  const features = type === 'bike' ? [
    { label: 'Free Delivery', value: 'free_delivery' },
    { label: 'Company Verified', value: 'verified' },
    { label: 'Instant Booking', value: 'instant' }
  ] : [
    { label: 'AC Available', value: 'ac' },
    { label: 'Free Delivery', value: 'free_delivery' },
    { label: 'With Driver Option', value: 'with_driver' },
    { label: 'Company Verified', value: 'verified' }
  ]

  const brands = type === 'bike' ? [
    'Royal Enfield', 'KTM', 'Honda', 'Yamaha', 'Bajaj', 
    'TVS', 'Hero', 'Suzuki', 'Kawasaki', 'BMW'
  ] : [
    'Maruti Suzuki', 'Hyundai', 'Toyota', 'Honda', 'Tata',
    'Mahindra', 'Ford', 'Volkswagen', 'Skoda', 'MG', 'Kia'
  ]

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-[--color-primary-600] hover:text-[--color-primary-800] text-sm font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Price Range (per day)</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.priceRange.some(r => r.label === range.label)}
                onChange={() => onFilterChange('priceRange', range)}
                className="w-4 h-4 text-[--color-primary-600] rounded"
              />
              <span className="text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Rating</h4>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label key={rating.label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating.value}
                onChange={() => onFilterChange('rating', rating.value)}
                className="w-4 h-4 text-[--color-primary-600]"
              />
              <span className="flex items-center text-gray-700">
                <FaStar className="text-yellow-400 mr-1" />
                {rating.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Features</h4>
        <div className="space-y-2">
          {features.map((feature) => (
            <label key={feature.label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.features.includes(feature.value)}
                onChange={() => onFilterChange('features', feature.value)}
                className="w-4 h-4 text-[--color-primary-600] rounded"
              />
              <span className="text-gray-700">{feature.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Brands</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => onFilterChange('brand', brand)}
                className="w-4 h-4 text-[--color-primary-600] rounded"
              />
              <span className="text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}