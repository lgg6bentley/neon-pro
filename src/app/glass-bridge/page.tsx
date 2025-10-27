'use client'

import { useState, useEffect } from 'react'

export default function GlassBridgePanel() {
  const [bridge, setBridge] = useState<string[]>([])
  const [step, setStep] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    // Generate a new bridge path: each row has a safe tile ('L' or 'R')
    const newBridge = Array.from({ length: 6 }, () =>
      Math.random() < 0.5 ? 'L' : 'R'
    )
    setBridge(newBridge)
  }, [])

  const handleClick = (choice: 'L' | 'R') => {
    if (failed || step >= bridge.length) return

    if (bridge[step] === choice) {
      setStep(step + 1)
    } else {
      setFailed(true)
      setTimeout(() => {
        setStep(0)
        setFailed(false)
      }, 1500)
    }
  }

  return (
    <section className="bg-gray-900 border border-blue-500 rounded-lg p-4 shadow-lg space-y-4">
      <h2 className="text-blue-400 text-xl font-bold">Glass Bridge Puzzle</h2>
      <p className="text-gray-400">Choose wisely. One tile is safe, the other shatters.</p>

      <div className="grid grid-rows-6 gap-4">
        {bridge.map((safe, i) => (
          <div key={i} className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleClick('L')}
              disabled={step !== i || failed}
              className={`h-16 rounded font-bold transition-all ${
                step === i
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-800 text-gray-500'
              }`}
            >
              Left
            </button>
            <button
              onClick={() => handleClick('R')}
              disabled={step !== i || failed}
              className={`h-16 rounded font-bold transition-all ${
                step === i
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-800 text-gray-500'
              }`}
            >
              Right
            </button>
          </div>
        ))}
      </div>

      {failed && (
        <div className="text-red-500 font-bold text-center animate-shake">
          ❌ Glass Shattered! Restarting...
        </div>
      )}

      {step === bridge.length && (
        <div className="text-green-400 font-bold text-center animate-pulse">
          ✅ You crossed the bridge!
        </div>
      )}
    </section>
  )
}

