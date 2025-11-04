'use client'

import Link from 'next/link'

export default function GameMenuPanel() {
  return (
    <section className="bg-zinc-900 border border-yellow-500 rounded-lg p-4 shadow-lg space-y-6">
      <h2 className="text-yellow-400 text-xl font-bold text-center">🎮 Squid Game Menu</h2>
      <p className="text-gray-400 text-center">Choose your challenge. Each path is mythic.</p>

      <div className="grid grid-cols-1 gap-4">
        <Link href="/squid-memory">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md border border-red-400 w-full">
            🧠 Squid Memory Match
          </button>
        </Link>

        <Link href="/glass-bridge">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md border border-blue-400 w-full">
            🪟 Glass Bridge Puzzle
          </button>
        </Link>

        <Link href="/ddakji">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md border border-yellow-300 w-full">
            🃏 Ddakji Flip Challenge
          </button>
        </Link>

        <Link href="/red-light">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md border border-green-400 w-full">
            🚦 Red Light, Green Light
          </button>
        </Link>
      </div>
    </section>
  )
}

