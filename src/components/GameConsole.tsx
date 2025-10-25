'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const games = [
  { id: 'red-light', name: 'Red Light, Green Light', danger: 'High' },
  { id: 'tug-of-war', name: 'Tug of War', danger: 'Medium' },
  { id: 'glass-bridge', name: 'Glass Bridge', danger: 'Extreme' },
  { id: 'marbles', name: 'Marbles', danger: 'Low' },
  { id: 'squid-game', name: 'Squid Game', danger: 'Final' },
]

export default function GameConsole() {
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)

  const triggerGame = (id: string) => {
    setActiveGame(id)
    setCountdown(5)
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval)
          return null
        }
        return prev ? prev - 1 : null
      })
    }, 1000)
  }

  return (
    <section className="bg-gray-900 border border-yellow-500 rounded-lg p-4 shadow-lg">
      <h2 className="text-yellow-400 text-xl font-bold mb-4">Game Console</h2>
      <div className="grid grid-cols-2 gap-4">
        {games.map(game => (
          <motion.button
            key={game.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => triggerGame(game.id)}
            className="bg-black border border-yellow-400 text-yellow-300 p-3 rounded-lg hover:bg-yellow-900 transition-colors"
          >
            <p className="font-semibold">{game.name}</p>
            <p className="text-sm text-yellow-500">Danger: {game.danger}</p>
          </motion.button>
        ))}
      </div>

      {activeGame && (
        <div className="mt-6 p-4 bg-yellow-900 border border-yellow-500 rounded-lg text-black">
          <h3 className="text-xl font-bold mb-2">Game Triggered</h3>
          <p className="text-lg text-white">
            {games.find(g => g.id === activeGame)?.name}
          </p>
          {countdown !== null && (
            <p className="text-white mt-2">Countdown: {countdown} seconds</p>
          )}
        </div>
      )}
    </section>
  )
}
