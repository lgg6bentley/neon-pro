'use client'

export default function PrizePotDisplay() {
  const rawAmount = 45600000000
  const formatted = rawAmount.toLocaleString('en-US')

  return (
    <section className="bg-gray-900 border border-green-500 rounded-lg p-4 shadow-lg text-center">
      <h2 className="text-green-400 text-xl font-bold mb-2">Prize Pot</h2>
      <div className="inline-block bg-black px-3 py-2 rounded-md border border-green-400 max-w-full overflow-hidden">
        <p className="text-xl font-bold text-green-300 tracking-tight break-words">
          ₩{formatted}
        </p>
        
      </div>
      <p className="text-xs text-zinc-400 mt-1">Current Prize Pool</p>
    </section>
  )
}
