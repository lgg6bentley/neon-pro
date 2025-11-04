'use client'

import { useState, useEffect } from 'react'

export default function DdakjiFlipPanel() {
  const [score, setScore] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [targetTime, setTargetTime] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    const delay = Math.random() * 2000 + 1000 // 1–3s delay
    const timeout = setTimeout(() => {
      setTargetTime(Date.now())
      setIsActive(true)
    }, delay)

    return () => clearTimeout(timeout)
  }, [score])

  const handleSlam = () => {
    const now = Date.now()
    const delta = Math.abs(now - targetTime)

    console.log({ now, targetTime, delta, isActive })

    if (isActive && delta < 1000) {
      const reward = 1000000 * multiplier
      setScore(score + reward)
      setMultiplier(multiplier + 1)
      setResult('Success!')
    } else {
      setMultiplier(1)
      setResult('Missed!')
    }

    setIsActive(false)
    setTargetTime(0)

    setTimeout(() => setResult(null), 1000)
  }

  return (
    <div className="bg-zinc-900 p-4 rounded-lg border border-red-500 shadow-md space-y-4">
      <h2 className="text-xl font-bold text-red-400">Ddakji Flip Challenge</h2>

      <div className="flex flex-col items-center space-y-4">
        {/* Card */}
        <div className="w-24 h-24 bg-red-600 rounded-md shadow-lg animate-pulse" />

        {/* Slam Button */}
        <button
          onClick={handleSlam}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-bold border border-yellow-300 transition-all active:scale-95"
        >
          SLAM
        </button>

        {/* Slam Window Indicator */}
        {isActive ? (
          <p className="text-green-400 font-bold animate-pulse">SLAM NOW!</p>
        ) : (
          <p className="text-zinc-500">Wait for it...</p>
        )}

        {/* Slam Result */}
        {result && (
          <p className="text-sm text-yellow-300 font-semibold">{result}</p>
        )}

        {/* Score Display */}
        <div className="text-center">
          <p className="text-lg text-neon-green font-bold">
            ₩{score.toLocaleString()}
          </p>
          <p className="text-sm text-zinc-400">Multiplier: x{multiplier}</p>
        </div>
      </div>
    </div>
  )
}


