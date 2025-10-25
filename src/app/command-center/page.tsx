import SurveillanceGrid from '@/components/SurveillanceGrid'
import GameConsole from '@/components/GameConsole'
import EliminationFeed from '@/components/EliminationFeed'
import PrizePotDisplay from '@/components/PrizePotDisplay'
import VIPLoungePanel from '@/components/VIPLoungePanel'
import MaskProtocolPanel from '@/components/MaskProtocolPanel'
import BackDoorLink from '@/components/BackDoorLink'

export default function CommandCenter() {
  return (
    <>
      <main className="bg-black text-white min-h-screen grid grid-cols-12 gap-4 p-6 font-orbitron">
        {/* Left Column */}
        <section className="col-span-3 space-y-6">
          <PrizePotDisplay />
          <MaskProtocolPanel />
        </section>

        {/* Center Column */}
        <section className="col-span-6 space-y-6">
          <SurveillanceGrid />
          <GameConsole />
        </section>

        {/* Right Column */}
        <section className="col-span-3 space-y-6">
          <EliminationFeed />
          <VIPLoungePanel />
        </section>
      </main>

      <BackDoorLink />
    </>
  )
}
