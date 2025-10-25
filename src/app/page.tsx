'use client'

import Link from 'next/link'

export default function HomePage() {
  const prizeAmount = 45600000000
  const formatted = new Intl.NumberFormat('en-US').format(prizeAmount)

  return (
    <main className="min-h-screen bg-black text-white font-orbitron flex flex-col items-center justify-center p-6 space-y-8 animate-fade-in">
      {/* Golden Piggy Bank */}
      <div className="flex flex-col items-center space-y-2">
        <svg
          viewBox="0 0 64 64"
          className="w-24 h-24 text-yellow-400 drop-shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 12c-11 0-20 7-20 16s9 16 20 16 20-7 20-16-9-16-20-16zm0 28c-6.6 0-12-4.5-12-10s5.4-10 12-10 12 4.5 12 10-5.4 10-12 10z"
            fill="currentColor"
          />
          <circle cx="32" cy="32" r="4" fill="#000" />
        </svg>
        <p className="text-yellow-300 text-2xl font-bold tracking-tight">
          ₩{formatted}
        </p>
        <p className="text-zinc-400 text-sm">Current Prize Pool</p>
      </div>

      {/* CTA to Command Center */}
      <Link
        href="/command-center"
        className="bg-neon-pink hover:bg-pink-700 text-white px-6 py-3 rounded-md text-lg font-bold border border-pink-400 transition-colors"
      >
        Enter Command Center
      </Link>
    </main>
  )
}

