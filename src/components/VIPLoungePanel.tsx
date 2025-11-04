'use client'

import { useEffect, useState } from 'react'

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
    <section className="bg-gray-900 border border-yellow-700 rounded-lg p-4 shadow-lg">
      <h2 className="text-yellow-500 text-xl font-bold mb-4">VIP Lounge</h2>
      <p className="text-gray-400 mb-2">
        Stream cryptic commentary and trigger special events.
      </p>
      <div className="bg-black border border-yellow-600 rounded-md p-3 h-40 overflow-y-auto text-yellow-300 text-sm space-y-2">
        {messages.map((msg, idx) => (
          <p key={idx} className="animate-fade-in">
            {msg}
          </p>
        ))}
      </div>
    </section>
  )
}

