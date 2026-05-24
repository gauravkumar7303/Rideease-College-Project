'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-[--color-primary-600] border-t-transparent rounded-full animate-spin"></div>
      <div className="mt-4 text-gray-600 font-medium">Loading...</div>
    </div>
  )
}