'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CashoutPage() {
  const router = useRouter()
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const maxLength = 4

  const handleKey = (key: string) => {
    if (key === '←') {
      setPin((prev) => prev.slice(0, -1))
    } else if (key === 'ENTER') {
      if (pin === '0456') {
        router.push('/command-center/cashout/receipt')
      } else {
        setError(true)
        setPin('')
      }
    } else if (pin.length < maxLength) {
      setPin((prev) => prev + key)
      setError(false)
    }
  }

  const keys = ['1','2','3','4','5','6','7','8','9','←','0','ENTER']

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 space-y-6 font-mono">
      {/* Animated Card Slot */}
      <div className="relative w-48 h-6 bg-zinc-800 rounded-md mb-6 overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-green-600 opacity-20" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-slide-card w-32 h-6 bg-black border border-yellow-400 rounded-sm" />
      </div>

      <h1 className="text-2xl text-green-400 font-bold tracking-widest">BANK OF KOREA ATM</h1>
      <p className="text-zinc-400 text-sm">Insert Card • Enter PIN to Access Funds</p>

      {/* PIN Dots */}
      <div className="flex gap-2 mt-4">
        {[...Array(maxLength)].map((_, i) => (
          <div key={i} className={`w-6 h-6 rounded-full border ${pin[i] ? 'bg-green-400' : 'border-zinc-600'}`} />
        ))}
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => handleKey(key)}
            className="bg-zinc-800 text-green-300 font-bold py-3 rounded-md border border-green-500 hover:bg-green-700 transition"
          >
            {key}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm animate-pulse mt-4">Invalid PIN. Try again.</p>
      )}

      <div className="mt-10 text-zinc-600 text-xs">Player 456 • Confidential Access</div>
    </main>
  )
}
