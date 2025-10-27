import SurveillanceGrid from '@/components/SurveillanceGrid'
import GameConsole from '@/components/GameConsole'
import EliminationFeed from '@/components/EliminationFeed'
import PrizePotDisplay from '@/components/PrizePotDisplay'
import VIPLoungePanel from '@/components/VIPLoungePanel'
import MaskProtocolPanel from '@/components/MaskProtocolPanel'
import BackDoorLink from '@/components/BackDoorLink'
import DdakjiFlipPanel from '@/components/DdakjiFlipPanel' // ✅ Make sure this is imported

export default function CommandCenter() {
  return (
    <>
      <main className="bg-black text-white min-h-screen grid grid-cols-12 gap-4 p-6 font-orbitron">
        
        {/* Left Column */}
        <section className="col-span-3 space-y-6">
          <PrizePotDisplay />
          <MaskProtocolPanel />
        </section>

        {/* ✅ Center Column — this is the missing part */}
        <section className="col-span-6 space-y-6">
          <SurveillanceGrid />
          <GameConsole />
          <DdakjiFlipPanel /> {/* 🔥 Your new game module */}
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

