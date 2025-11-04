'use client'

import { FaMoneyBillWave, FaUsers, FaCog } from 'react-icons/fa'
import { motion } from 'framer-motion'

/**
 * FrontmanLiarControlBar Component
 * A sticky, fixed navigation bar with the Black/Red/Gold theme to control the main dashboard views.
 */
export default function FrontmanLiarControlBar() {
  
  // Scrolls the view to the element with the given ID
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Define the navigation items with their labels, IDs, and icons
  const navItems = [
    { id: 'prize-pot', label: 'Ante Total', icon: FaMoneyBillWave },
    { id: 'surveillance', label: 'Player Status', icon: FaUsers },
    { id: 'settings', label: 'Protocols', icon: FaCog },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full bg-zinc-950/95 border-b-2 border-red-700/80 z-50 p-3 shadow-2xl shadow-red-900/50 flex justify-center space-x-10 font-mono">
      {navItems.map(item => (
        <motion.button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          className="flex items-center text-sm uppercase font-bold text-yellow-500 hover:text-red-500 transition-colors duration-200 tracking-wider group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Icon */}
          <item.icon className="mr-2 text-xl text-red-700 group-hover:text-yellow-500 transition-colors" />
          {/* Label */}
          {item.label}
        </motion.button>
      ))}
    </nav>
  )
}
