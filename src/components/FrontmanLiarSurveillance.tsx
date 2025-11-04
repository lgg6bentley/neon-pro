'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSkull, FaHeartbeat, FaSearch } from 'react-icons/fa' // Importing icons

// Define the type for player data for robust coding
interface PlayerData {
  id: string;
  name: string;
  status: 'alive' | 'eliminated';
  heartRate: number;
  lastGame: string;
}

const mockPlayers: PlayerData[] = [
  { id: '001', name: 'Player 001', status: 'alive', heartRate: 82, lastGame: 'Red Light Green Light' },
  { id: '067', name: 'Player 067', status: 'eliminated', heartRate: 0, lastGame: 'Glass Bridge' },
  { id: '456', name: 'Player 456', status: 'alive', heartRate: 95, lastGame: 'Marbles' },
  { id: '218', name: 'Player 218', status: 'alive', heartRate: 88, lastGame: 'Tug of War' },
  { id: '101', name: 'Player 101', status: 'eliminated', heartRate: 0, lastGame: 'Squid Game' },
]

/**
 * FrontmanLiarSurveillance Component
 * Displays a surveillance grid of players with a dramatic, authoritative theme.
 */
export default function FrontmanLiarSurveillance() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedPlayer = mockPlayers.find(p => p.id === selectedId)

  return (
    <section className="bg-zinc-950 border-4 border-red-700/80 rounded-none p-6 shadow-[0_0_20px_rgba(220,38,38,0.7)] font-mono">
      
      {/* Title */}
      <h2 className="text-yellow-500 text-2xl font-extrabold mb-5 uppercase tracking-widest flex items-center">
        <FaSearch className="mr-3 text-red-500" />
        OPERATIONAL SURVEILLANCE GRID
      </h2>

      {/* Player Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {mockPlayers.map(player => {
          const isAlive = player.status === 'alive'
          const statusColor = isAlive ? 'border-green-400 text-green-300' : 'border-red-700 text-red-500'
          const icon = isAlive ? <FaHeartbeat className="text-green-500" /> : <FaSkull className="text-red-700" />

          return (
            <motion.div
              key={player.id}
              whileHover={{ scale: 1.05, boxShadow: isAlive ? "0 0 15px rgba(134, 239, 172, 0.5)" : "0 0 15px rgba(220, 38, 38, 0.7)" }}
              onClick={() => setSelectedId(player.id)}
              className={`p-3 rounded-md cursor-pointer border-2 transition-all duration-200 ${statusColor} bg-black/70 
                ${selectedId === player.id ? 'ring-4 ring-yellow-500 ring-offset-1 ring-offset-black' : ''}`}
            >
              <div className="flex justify-between items-center mb-1">
                <p className="text-xl font-bold tracking-tight">{player.id}</p>
                <div className="text-lg">{icon}</div>
              </div>
              <p className="text-xs text-zinc-400 truncate">{player.name}</p>
              <p className={`text-xs uppercase font-semibold ${isAlive ? 'text-green-400' : 'text-red-600'}`}>
                {player.status}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* --- */}

      {/* Selected Player Detail Panel (Data Download) */}
      {selectedPlayer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-5 bg-zinc-900 border-2 border-yellow-500 rounded-none shadow-lg shadow-yellow-500/30"
        >
          <h3 className="text-yellow-400 font-extrabold text-xl mb-3 uppercase border-b border-red-700 pb-1 flex items-center">
            <FaSearch className="mr-2 text-red-500" />
            Subject File: {selectedPlayer.id}
          </h3>
          <div className="grid grid-cols-2 gap-y-1 text-sm text-white">
            <p className="font-semibold text-zinc-400">Name:</p>
            <p className="font-bold text-yellow-300">{selectedPlayer.name}</p>

            <p className="font-semibold text-zinc-400">Current Status:</p>
            <p className={`font-bold uppercase ${selectedPlayer.status === 'alive' ? 'text-green-400' : 'text-red-600'}`}>{selectedPlayer.status}</p>

            <p className="font-semibold text-zinc-400">Bio Data (HR):</p>
            <p>{selectedPlayer.heartRate > 0 ? `${selectedPlayer.heartRate} bpm` : 'DATA NULLIFIED'}</p>
            
            <p className="font-semibold text-zinc-400">Last Engagement:</p>
            <p className="text-red-400">{selectedPlayer.lastGame}</p>
          </div>
        </motion.div>
      )}
    </section>
  )
}
