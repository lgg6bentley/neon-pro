'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const mockPlayers = [
  { id: '001', name: 'Player 001', status: 'alive', heartRate: 82, lastGame: 'Red Light Green Light' },
  { id: '067', name: 'Player 067', status: 'eliminated', heartRate: 0, lastGame: 'Glass Bridge' },
  { id: '456', name: 'Player 456', status: 'alive', heartRate: 95, lastGame: 'Marbles' },
  { id: '218', name: 'Player 218', status: 'alive', heartRate: 88, lastGame: 'Tug of War' },
  { id: '101', name: 'Player 101', status: 'eliminated', heartRate: 0, lastGame: 'Squid Game' },
]

export default function SurveillanceGrid() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section className="bg-gray-900 border border-red-700 rounded-lg p-4 shadow-lg">
      <h2 className="text-red-500 text-xl font-bold mb-4">Surveillance Grid</h2>
      <div className="grid grid-cols-2 gap-4">
        {mockPlayers.map(player => (
          <motion.div
            key={player.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelected(player.id)}
            className={`p-3 rounded-lg cursor-pointer border ${
              player.status === 'alive' ? 'border-green-500' : 'border-red-500'
            } bg-black text-white`}
          >
            <p className="text-lg font-semibold">{player.name}</p>
            <p className="text-sm text-gray-400">Status: {player.status}</p>
            <p className="text-sm text-gray-400">Last Game: {player.lastGame}</p>
          </motion.div>
        ))}
      </div>

      {selected && (
        <div className="mt-6 p-4 bg-gray-800 border border-yellow-500 rounded-lg">
          <h3 className="text-yellow-400 font-bold mb-2">Player Details</h3>
          {mockPlayers
            .filter(p => p.id === selected)
            .map(p => (
              <div key={p.id}>
                <p>ID: {p.id}</p>
                <p>Name: {p.name}</p>
                <p>Status: {p.status}</p>
                <p>Heart Rate: {p.heartRate} bpm</p>
                <p>Last Game: {p.lastGame}</p>
              </div>
            ))}
        </div>
      )}
    </section>
  )
}

