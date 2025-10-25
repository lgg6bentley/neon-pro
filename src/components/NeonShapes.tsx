'use client'

export default function NeonShapes() {
  return (
    <div className="flex justify-center items-center gap-8 mt-10 animate-fade-in">
      <svg className="w-12 h-12 text-pink-500 animate-weave" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" />
      </svg>
      <svg className="w-12 h-12 text-pink-500 animate-weave delay-200" viewBox="0 0 100 100">
        <polygon points="50,10 90,90 10,90" stroke="currentColor" strokeWidth="8" fill="none" />
      </svg>
      <svg className="w-12 h-12 text-pink-500 animate-weave delay-400" viewBox="0 0 100 100">
        <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="8" fill="none" />
      </svg>
    </div>
  )
}