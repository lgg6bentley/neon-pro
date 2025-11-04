'use client'

import { useState } from 'react'

export default function VIPLoungeGamePanel() {
  const [choice, setChoice] = useState<'invest' | 'sabotage' | 'eliminate' | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [prizePool, setPrizePool] = useState(10000000)
  const [log, setLog] = useState<string[]>([])

  const handleDecision = (action: 'invest' | 'sabotage' | 'eliminate') => {
    setChoice(action)
    setRevealed(true)

    let outcome = ''
    if (action === 'invest') {
      const boost = Math.floor(Math.random() * 500000 + 500000)
      setPrizePool(prizePool + boost)
      outcome = `💰 You invested ₩${boost.toLocaleString()} into the prize pool.`
    } else if (action === 'sabotage') {
      outcome = `🧨 You sabotaged another VIP. Their influence dropped.`
    } else if (action === 'eliminate') {
      outcome = `🔪 You voted to eliminate a masked VIP. Outcome pending...`
    }

    setLog(prev => [outcome, ...prev])
  }

  const resetRound = () => {
    setChoice(null)
    setRevealed(false)
  }

  return (
    <section className="bg-zinc-900 border border-yellow-500 rounded-lg p-6 shadow-lg space-y-6">
      <h2 className="text-yellow-400 text-2xl font-bold text-center">🎭 VIP Lounge Negotiation</h2>
      <p className="text-gray-400 text-center">Choose your masked action. Influence the prize pool or eliminate rivals.</p>

      <div className="text-center text-green-400 font-bold text-xl">
        Prize Pool: ₩{prizePool.toLocaleString()}
      </div>

      {!revealed ? (
        <div className="grid grid-cols-3 gap-4 text-center">
          <button
            onClick={() => handleDecision('invest')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md border border-green-400"
          >
            💰 Invest
          </button>
          <button
            onClick={() => handleDecision('sabotage')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md border border-red-400"
          >
            🧨 Sabotage
          </button>
          <button
            onClick={() => handleDecision('eliminate')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-md border border-yellow-300"
          >
            🔪 Eliminate
          </button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-white font-semibold">You chose: {choice === 'invest' ? '💰 Invest' : choice === 'sabotage' ? '🧨 Sabotage' : '🔪 Eliminate'}</p>
          <button
            onClick={resetRound}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600"
          >
            Next Round
          </button>
        </div>
      )}

      <div className="mt-6 space-y-2">
        <h3 className="text-yellow-300 font-bold">📝 Decision Log</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          {log.map((entry, i) => (
            <li key={i}>• {entry}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

