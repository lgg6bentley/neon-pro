'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CounterPage() {
  const [amount, setAmount] = useState(0)
  const target = 45600000000 // ₩45,600,000,000

  useEffect(() => {
    const duration = 3000 // 3 seconds
    const steps = 60
    const increment = target / steps
    let current = 0
    let count = 0

    const interval = setInterval(() => {
      current += increment
      count++
      setAmount(Math.min(Math.floor(current), target))
      if (count >= steps) clearInterval(interval)
    }, duration / steps)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white flex flex-col items-center justify-center p-6 font-orbitron relative overflow-hidden">
      {/* Spinning Golden Piggy Bank */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 animate-spin-slow">
        <div className="w-[400px] h-[400px] bg-yellow-400 rounded-full blur-2xl" />
      </div>

      {/* Counter Display */}
      <div className="z-10 text-4xl sm:text-6xl font-bold text-neon-green mb-8">
        ₩{amount.toLocaleString()}
      </div>

      {/* Action Buttons */}
      <div className="z-10 flex gap-6">
        <Link href="/command-center">
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md flex items-center gap-2 border border-pink-400">
            <span className="inline-block w-4 h-4 bg-pink-300 rounded-full" />
            Continue Game
          </button>
        </Link>
        <Link href="/command-center/cashout">
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-md flex items-center gap-2 border border-yellow-400">
            <span className="inline-block w-4 h-4 bg-yellow-300 rotate-45" />
            Cash Out
          </button>
        </Link>
      </div>
    </section>
  )
}

