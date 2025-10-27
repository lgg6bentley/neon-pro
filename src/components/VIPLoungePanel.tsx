'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const crypticMessages = [
  'The marble was never yours.',
  'Red means stop. Or does it?',
  'Player 218 is too quiet.',
  'The bridge remembers.',
  'Masks don’t lie. People do.',
  'The pot grows. So does the risk.',
  'One tug, one fate.',
  'VIP #3 is watching closely.',
  'The game favors no one.',
  'Elimination is a form of clarity.',
]

export default function VIPLoungePanel() {
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage =
        crypticMessages[Math.floor(Math.random() * crypticMessages.length)]
      setMessages(prev => [newMessage, ...prev.slice(0, 4)])
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="panel">
      <h2 className="text-yellow-500 text-xl font-bold mb-2">VIP Lounge</h2>
      <p className="text-zinc-400 text-sm mb-2">
        Stream cryptic commentary and trigger special events.
      </p>
      <div className="bg-black border border-yellow-600 rounded-md p-3 h-40 overflow-y-auto text-yellow-300 text-sm space-y-2">
        {messages.map((msg, idx) => (
          <p key={idx} className="animate-fade-in">
            {msg}
          </p>
        ))}
      </div>

      {/* VIP Door Icon with Link */}
      <div className="flex justify-center mt-4">
        <Link href="/vip-lounge/negotiation">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse hover:scale-110 transition-transform cursor-pointer"
          >
            <rect x="6" y="3" width="12" height="18" rx="2" ry="2" />
            <circle cx="12" cy="12" r="1.5" fill="#FFD700" />
            <path d="M12 15v3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

