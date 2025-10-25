'use client'

export default function EliminationFeed() {
  return (
    <section className="panel">
      <h2 className="text-red-500 text-xl font-bold mb-2">Elimination Feed</h2>
      <ul className="space-y-2 text-sm text-gray-400">
        <li>🔻 Player 067 eliminated — 14:03 | Cause: Rule Violation</li>
        <li>🔻 Player 218 eliminated — 13:47 | Cause: Failed Challenge</li>
        <li>🔻 Player 101 eliminated — 13:22 | Cause: Time Expired</li>
      </ul>
    </section>
  )
}

