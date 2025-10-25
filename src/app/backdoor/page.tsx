'use client'

import SquidMemoryGame from '@/components/SquidMemoryGame'

export default function BackdoorPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 space-y-6 font-orbitron animate-fade-in max-w-screen-md mx-auto">
      <h1 className="text-neon-pink text-2xl font-bold animate-glow-pulse">Backdoor Access</h1>
      <p className="text-zinc-400 text-sm">Welcome, VIP. Hidden features unlocked.</p>
      <section className="panel">
        <SquidMemoryGame />
      </section>
    </main>
  )
}
