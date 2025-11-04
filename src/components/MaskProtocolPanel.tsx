'use client'

import { useState } from 'react'

export default function MaskProtocolPanel() {
  const [role, setRole] = useState('Worker')
  const [traits, setTraits] = useState<string[]>([])
  const [power, setPower] = useState('None')

  const toggleTrait = (trait: string) => {
    setTraits(prev =>
      prev.includes(trait)
        ? prev.filter(t => t !== trait)
        : [...prev, trait]
    )
  }

  const secretUnlocked = role === 'Manager' && traits.includes('Stealth') && power !== 'None'

  return (
    <section className="bg-gray-900 border border-purple-500 rounded-lg p-4 shadow-lg space-y-4">
      <h2 className="text-purple-400 text-xl font-bold">Mask Protocols</h2>
      <p className="text-gray-400 mb-2">Assign roles and enforce hierarchy with masked clarity.</p>

      {/* Role Selector */}
      <div className="space-y-2">
        <label className="text-gray-300 font-semibold">Role:</label>
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="bg-gray-800 text-white border border-purple-400 rounded px-3 py-2 w-full"
        >
          <option>Worker</option>
          <option>Manager</option>
          <option>VIP</option>
        </select>
      </div>

      {/* Trait Toggles */}
      <div className="space-y-2">
        <label className="text-gray-300 font-semibold">Traits:</label>
        <div className="flex gap-2 flex-wrap">
          {['Stealth', 'Aggression', 'Loyalty', 'Deception'].map(trait => (
            <button
              key={trait}
              onClick={() => toggleTrait(trait)}
              className={`px-3 py-1 rounded border ${
                traits.includes(trait)
                  ? 'bg-purple-600 text-white border-purple-400'
                  : 'bg-gray-800 text-gray-300 border-gray-600'
              }`}
            >
              {trait}
            </button>
          ))}
        </div>
      </div>

      {/* Power Selector */}
      <div className="space-y-2">
        <label className="text-gray-300 font-semibold">Power:</label>
        <select
          value={power}
          onChange={e => setPower(e.target.value)}
          className="bg-gray-800 text-white border border-purple-400 rounded px-3 py-2 w-full"
        >
          <option>None</option>
          <option>Override</option>
          <option>Invisibility</option>
          <option>Surveillance Access</option>
        </select>
      </div>

      {/* Secret Panel Unlock */}
      {secretUnlocked && (
        <div className="mt-4 p-3 bg-purple-800 border border-yellow-400 rounded text-yellow-300 font-bold text-center animate-pulse">
          🔓 Secret Panel Unlocked: Mask Modifier Activated
        </div>
      )}
    </section>
  )
}

