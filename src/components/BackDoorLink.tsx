'use client'

import Link from 'next/link'

export default function BackDoorLink() {
  return (
    <div className="mt-12 flex justify-center">
      <Link href="/backdoor" aria-label="Enter Backdoor Access">
        <svg
          viewBox="0 0 100 100"
          className="w-16 h-16 text-neon-pink hover:text-pink-700 transition-colors cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M30 50 L50 30 L70 50 L50 70 Z"
            fill="currentColor"
          />
        </svg>
      </Link>
    </div>
  )
}
