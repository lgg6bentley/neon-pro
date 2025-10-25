'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const symbols = [
  '◯', '△', '□', '💀', '🎮', '🪙',
  '🔺', '🟥', '🟢', '👁️', '₩', '🧠',
]

const generateDeck = () => {
  const deck = [...symbols, ...symbols]
  return deck.sort(() => Math.random() - 0.5)
}

export default function SquidMemoryGame({ activeGame }: { activeGame?: string }) {
  const router = useRouter()
  const [deck, setDeck] = useState<string[]>(generateDeck())
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [attempts, setAttempts] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [vipMessage, setVipMessage] = useState<string | null>(null)

  const matchSoundRef = useRef<HTMLAudioElement>(null)
  const errorSoundRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (activeGame === 'memory-match') {
      handleReset()
    }
  }, [activeGame])

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped
      setAttempts(prev => prev + 1)

      if (deck[first] === deck[second]) {
        setMatched(prev => [...prev, first, second])
        matchSoundRef.current?.play()
      } else {
        errorSoundRef.current?.play()
      }

      setTimeout(() => setFlipped([]), 1000)
    }
  }, [flipped, deck])

  useEffect(() => {
    if (matched.length === deck.length && deck.length > 0) {
      const duration = ((Date.now() - (startTime ?? Date.now())) / 1000).toFixed(1)
      setVipMessage(`VIP Alert: All pairs matched in ${attempts} attempts over ${duration} seconds.`)

      const timeout = setTimeout(() => {
        router.push('/command-center/counter') // ✅ Updated redirect
      }, 10000)

      return () => clearTimeout(timeout)
    }
  }, [matched, deck.length, startTime, attempts, router])

  const handleFlip = (index: number) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
      setFlipped(prev => [...prev, index])
    }
  }

  const handleReset = () => {
    setDeck(generateDeck())
    setFlipped([])
    setMatched([])
    setAttempts(0)
    setStartTime(Date.now())
    setVipMessage(null)
  }

  return (
    <section className="bg-gray-900 border border-pink-500 rounded-lg p-4 shadow-lg relative overflow-hidden">
      <h2 className="text-pink-400 text-xl font-bold mb-2">Squid Memory Match</h2>

      {/* Control Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-zinc-400 text-sm">
          Attempts: {attempts} {startTime && `| Time: ${((Date.now() - startTime) / 1000).toFixed(1)}s`}
        </div>
        <button
          onClick={handleReset}
          className="bg-pink-600 hover:bg-pink-700 text-white text-xs px-3 py-1 rounded-md border border-pink-400"
        >
          Reset Game
        </button>
      </div>

      {/* Card Grid */}
      <div className="relative">
        <div className="grid grid-cols-6 gap-4">
          {deck.map((symbol, idx) => {
            const isFlipped = flipped.includes(idx)
            const isMatched = matched.includes(idx)
            return (
              <motion.button
                key={idx}
                onClick={() => handleFlip(idx)}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                className={`h-20 w-20 text-3xl font-bold rounded-md border perspective ${
                  isMatched
                    ? 'bg-green-700 border-green-500 text-white'
                    : isFlipped
                    ? 'bg-pink-700 border-pink-500 text-white'
                    : 'bg-black border-zinc-700 text-zinc-700'
                }`}
              >
                {isFlipped || isMatched ? symbol : '?'}
              </motion.button>
            )
          })}
        </div>

        {/* Centered Animation */}
        {matched.length === deck.length && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.1, 1], opacity: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-black bg-opacity-80 border border-yellow-500 text-yellow-300 text-3xl font-bold px-6 py-4 rounded-lg shadow-lg">
              ALL SYMBOLS MATCHED
            </div>
          </motion.div>
        )}
      </div>

      {/* VIP Message */}
      {vipMessage && (
        <div className="mt-4 text-yellow-400 text-sm border-t border-yellow-600 pt-2">
          {vipMessage}
        </div>
      )}

      {/* Sound Effects */}
      <audio ref={matchSoundRef} src="/sounds/match.mp3" preload="auto" />
      <audio ref={errorSoundRef} src="/sounds/error.mp3" preload="auto" />
    </section>
  )
}