import './globals.css'
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
      </body>
    </html>
  )
}

