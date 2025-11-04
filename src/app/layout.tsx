import './globals.css'
<<<<<<< HEAD
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={orbitron.variable}>
      <body className="bg-black text-white font-orbitron antialiased">
        {children}
=======
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Neon Protocol',
  description: 'Squid Game Command Center',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <div className="w-full min-h-screen flex flex-col">{children}</div>
>>>>>>> origin/master
      </body>
    </html>
  )
}
<<<<<<< HEAD
=======

>>>>>>> origin/master
