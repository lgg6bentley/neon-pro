'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  const prizeAmount = 45600000000
  const formatted = new Intl.NumberFormat('en-US').format(prizeAmount)

  return (
    <main className="min-h-screen bg-black text-white font-orbitron flex flex-col items-center justify-center p-6 space-y-8 animate-fade-in">
      {/* Golden Piggy Bank */}
      <div className="flex flex-col items-center space-y-2">
        <Image
          src="/images/golden-piggy-bank.png"
          alt="Golden Piggy Bank"
          width={96}
          height={96}
          className="drop-shadow-lg animate-laugh"
          priority
        />
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
