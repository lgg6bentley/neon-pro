<<<<<<< HEAD
export default function EliminationFeed() {
  return (
    <section className="bg-gray-900 border border-red-500 rounded-lg p-4 shadow-lg">
      <h2 className="text-red-500 text-xl font-bold mb-4">Elimination Feed</h2>
      <p className="text-gray-400">Chronicle player eliminations with timestamps and cause.</p>
=======
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
>>>>>>> origin/master
    </section>
  )
}

