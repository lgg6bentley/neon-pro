'use client'

export default function ReceiptPage() {
  return (
    <main className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center p-6 space-y-6 font-mono">
      <div className="border border-green-600 bg-zinc-900 px-6 py-4 rounded-lg shadow-lg w-full max-w-md text-center animate-fade-in">
        <p className="text-lg font-bold tracking-widest mb-2">BANK OF KOREA RECEIPT</p>
        <p className="text-yellow-300 text-2xl font-bold mb-4">₩45,600,000,000 Dispensed</p>
        <p className="text-green-400 text-sm">Transaction ID: <span className="text-white">0456-PLAYER</span></p>
        <p className="text-zinc-500 text-xs mt-2">Thank you for playing</p>

        {/* Neon Glyphs */}
        <div className="mt-4 flex justify-center gap-4 text-pink-500 text-xl">
          <span>◯</span>
          <span>△</span>
          <span>□</span>
        </div>

        {/* Ceremonial Print Animation */}
        <div className="mt-6 h-1 w-full bg-green-500 animate-print-line" />
      </div>
    </main>
  )
}
