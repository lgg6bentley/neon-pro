<<<<<<< HEAD
'use client'; 

import React, { useState, useEffect } from 'react'; 

// --- 0. Utility and Mock Game Components ---

// Mock Game Components
const SquidMemoryGame = ({ setActiveGame }) => (
    <div className="h-96 bg-black/50 border border-gray-700 p-8 flex flex-col items-center justify-center text-gray-300">
        <h3 className="text-xl font-bold mb-4">Squid Memory Match (Simulation)</h3>
        <p className="text-center">Challenge: Match pairs quickly. The time limit is enforced by the system controller.</p>
        <button 
            onClick={() => setActiveGame('ECHO')} 
            className="mt-6 bg-neon-blue hover:bg-blue-600 text-white py-2 px-6 rounded transition-colors shadow-lg"
        >
            Next Game (Echo Chamber)
        </button>
    </div>
);
const EchoChamberGame = ({ setActiveGame }) => (
    <div className="h-96 bg-black/50 border border-gray-700 p-8 flex flex-col items-center justify-center text-gray-300">
        <h3 className="text-xl font-bold mb-4">Echo Chamber Test (Simulation)</h3>
        <p className="text-center">Challenge: Resist the auditory deception protocol. Failure means disqualification.</p>
        <button 
            onClick={() => setActiveGame('BACK')} 
            className="mt-6 bg-neon-green hover:bg-green-600 text-white py-2 px-6 rounded transition-colors shadow-lg"
        >
            Next Game (BackDoor Trial)
        </button>
    </div>
);
const BackDoorTrialGame = ({ setActiveGame }) => (
    <div className="h-96 bg-black/50 border border-gray-700 p-8 flex flex-col items-center justify-center text-gray-300">
        <h3 className="text-xl font-bold mb-4">BackDoor Trial Sequence (Simulation)</h3>
        <p className="text-center">Challenge: Solve the sequence lock to bypass the main security door. High stakes.</p>
        <button 
            onClick={() => setActiveGame('TTOE')} 
            className="mt-6 bg-neon-pink hover:bg-pink-600 text-white py-2 px-6 rounded transition-colors shadow-lg"
        >
            Next Game (Tic Tac Toe)
        </button>
    </div>
);
const SquidTicTacToe = ({ setActiveGame }) => (
    <div className="h-96 bg-black/50 border border-gray-700 p-8 flex flex-col items-center justify-center text-gray-300">
        <h3 className="text-xl font-bold mb-4">Squid Tic Tac Toe (Simulation)</h3>
        <p className="text-center">Challenge: A simple test of basic strategy. Win or suffer the consequences.</p>
        <button 
            onClick={() => setActiveGame('MEM')} 
            className="mt-6 bg-zinc-600 hover:bg-zinc-500 text-white py-2 px-6 rounded transition-colors shadow-lg"
        >
            Restart Cycle (Memory Match)
        </button>
    </div>
);

// Configuration for all games
const GAME_COMPONENTS = {
    'MEM': { 
        title: "Squid Memory Match", 
        component: SquidMemoryGame, 
        color: 'text-neon-blue',
        borderColor: 'border-neon-blue'
    },
    'ECHO': { 
        title: "Echo Chamber Test", 
        component: EchoChamberGame, 
        color: 'text-neon-green',
        borderColor: 'border-neon-green' 
    },
    'BACK': { 
        title: "BackDoor Trial Sequence", 
        component: BackDoorTrialGame, 
        color: 'text-neon-pink',
        borderColor: 'border-neon-pink' 
    },
    'TTOE': { 
        title: "Squid Tic Tac Toe", 
        component: SquidTicTacToe, 
        color: 'text-yellow-400',
        borderColor: 'border-yellow-400' 
    },
};

// Component for game selection panel button
const GameSelectorPanel = ({ gameId, gameConfig, activeGameId, setActiveGameId }) => {
    const isActive = gameId === activeGameId;
    const { title, color } = gameConfig;

    return (
        <button 
            onClick={() => setActiveGameId(gameId)}
            className={`
                p-3 rounded-lg text-center shadow-lg transition duration-300 transform 
                ${color} ${isActive ? `${gameConfig.borderColor} border-4 scale-105` : 'border border-gray-800 hover:border-gray-600'}
                bg-gray-900/70 hover:bg-gray-800/90
            `}
        >
            <span className="block text-lg font-bold truncate">{title}</span>
            <span className={`block text-xs uppercase font-mono ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                {isActive ? '[ACTIVE]' : '[SELECT]'}
            </span>
        </button>
    );
};


// --- Core App Component: Switches between Dashboard and Game Arena ---

export default function App() {
    // State to manage which view is currently displayed
    const [view, setView] = useState('dashboard'); // 'dashboard' or 'arena'

    if (view === 'arena') {
        // Render the Game Arena view
        return <GameArena setView={setView} />;
    }

    // Render the Command Center (Dashboard) view
    return <CommandCenter setView={setView} />;
}

// --- 1. Sub-Component Definitions (Dashboard View) ---

// Client Component: FrontmanLiarControlBar (Navbar)
function FrontmanLiarControlBar({ setView }) {
    const [status, setStatus] = useState('OPERATIONAL');

    const handleStatusToggle = () => {
        setStatus(prev => prev === 'OPERATIONAL' ? 'WARNING' : 'OPERATIONAL');
    };

    const statusColor = status === 'OPERATIONAL' ? 'text-green-400' : 'text-yellow-400';

    return (
        <header className="fixed top-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-sm z-50 shadow-2xl border-b border-red-700/50 p-3 flex justify-between items-center h-20">
            <h1 className="text-3xl font-bold text-red-600 tracking-widest uppercase">
                Frontman Liar
            </h1>
            <nav className="hidden md:flex space-x-6 text-lg">
                <a href="#prize-pot" className="hover:text-red-500 transition-colors">Pot Value</a>
                <a href="#surveillance" className="hover:text-red-500 transition-colors">Surveillance</a>
                <a href="#protocols" className="hover:text-red-500 transition-colors">Protocols</a>
                {/* Optional link to arena in the navbar */}
                <button 
                    onClick={() => setView('arena')} 
                    className="text-red-500 hover:text-red-300 transition-colors uppercase font-bold tracking-widest"
                >
                    [ACCESS ARENA]
                </button>
            </nav>
            <div className="flex items-center space-x-4">
                <span className={`text-sm uppercase font-mono ${statusColor}`}>Status: {status}</span>
                <button 
                    onClick={handleStatusToggle} 
                    className="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors shadow-md"
                >
                    Toggle Status
                </button>
            </div>
        </header>
    );
}

// Client Component: FrontmanLiarDisplay (Prize Pot)
function FrontmanLiarDisplay() {
    const [prizePot, setPrizePot] = useState(1000000); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPrizePot(prev => prev + Math.floor(Math.random() * 1000)); 
        }, 3000);
        
        return () => clearInterval(intervalId);
    }, []);

    const formattedPot = prizePot.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });

    return (
        <div className="bg-zinc-950 border-2 border-green-700 p-6 rounded-lg shadow-xl shadow-green-700/20 text-center">
            <h3 className="text-sm uppercase text-green-400 font-bold tracking-widest">Current Prize Pot</h3>
            <p className="text-5xl font-extrabold font-mono mt-2 text-green-300 animate-pulse">
                {formattedPot}
            </p>
        </div>
    );
}

// Client Component: FrontmanLiarPlayerCount
function FrontmanLiarPlayerCount() {
    const [playerCount, setPlayerCount] = useState(456); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPlayerCount(prev => prev + (Math.random() > 0.5 ? 1 : -1)); 
        }, 5000);
        
        return () => clearInterval(intervalId); 
    }, []);

    return (
        <div className="bg-zinc-800 border-l-4 border-red-500 p-4 shadow-lg rounded-lg transition-all duration-300 hover:shadow-red-500/50">
            <h4 className="text-sm uppercase text-red-400 font-bold tracking-widest">Active Contestants</h4>
            <p className="text-5xl font-mono mt-1 text-white tabular-nums tracking-tighter">
                {playerCount.toString().padStart(3, '0')}
            </p>
        </div>
    );
}

// Client Component: FrontmanLiarSurveillance
function FrontmanLiarSurveillance() {
    const [statusMessage, setStatusMessage] = useState('All systems nominal. Awaiting Protocol initiation.');

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatusMessage('SECURITY ALERT: Irregular movement detected in sector Gamma.');
        }, 15000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-zinc-950 border-2 border-blue-700 p-6 rounded-lg shadow-xl min-h-[300px]">
            <h3 className="text-xl text-blue-400 font-bold mb-4 uppercase tracking-wider border-b border-blue-700/50 pb-2">
                Surveillance Grid Status
            </h3>
            <div className="grid grid-cols-5 gap-1 h-36 border border-blue-900 p-1 bg-zinc-800">
                {Array.from({ length: 25 }).map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-full h-full ${i % 7 === 0 ? 'bg-red-800' : 'bg-blue-900'} hover:bg-blue-600 transition-colors`}
                        title={`Sector ${i + 1}`}
                    ></div>
                ))}
            </div>
            <p className="mt-4 text-sm font-mono text-blue-500 italic">
                {statusMessage}
            </p>
        </div>
    );
}

// Placeholder Component: GameConsole
function GameConsole() {
    return (
        <div className="bg-zinc-950 border-2 border-yellow-700 p-6 rounded-lg shadow-xl min-h-[400px]">
            <h3 className="text-xl text-yellow-500 font-bold mb-4 uppercase tracking-wider border-b border-yellow-700/50 pb-2">
                Game Console Interface
            </h3>
            <p className="text-zinc-400">
                This area will contain controls and real-time game state updates. Placeholder content for now.
            </p>
        </div>
    );
}

// Placeholder Component: EliminationFeed
function EliminationFeed() {
    return (
        <div className="bg-zinc-950 border-2 border-red-700 p-4 rounded-lg shadow-xl">
            <h3 className="text-lg text-red-500 font-bold mb-2 uppercase">Elimination Feed</h3>
            <ul className="text-sm text-zinc-400 space-y-1">
                <li className="text-red-300">| 10:45 AM: Player 112 [Eliminated]</li>
                <li>| 10:43 AM: Player 099 [Status Check]</li>
                <li className="text-red-300">| 10:30 AM: Player 341 [Eliminated]</li>
            </ul>
        </div>
    );
}

// Placeholder Component: VIPLoungePanel
function VIPLoungePanel() {
    return (
        <div className="bg-zinc-950 border-2 border-purple-700 p-4 rounded-lg shadow-xl">
            <h3 className="text-lg text-purple-400 font-bold mb-2 uppercase">VIP Lounge Access</h3>
            <p className="text-zinc-400 text-sm">
                Secure link to observe high-value targets. Access restricted.
            </p>
        </div>
    );
}

// Link that triggers the switch to GameArena 
function BackDoorLink({ setView }) {
    const handleAccess = (e) => {
        // CRITICAL: Prevent the default anchor tag action (hash navigation)
        e.preventDefault(); 
        // Execute the internal view switch
        setView('arena'); 
    };

    return (
        <div className="bg-zinc-950 border-2 border-red-700 p-4 rounded-lg shadow-xl text-center">
            <a 
                href="#" // Used for link styling and accessibility
                onClick={handleAccess}
                className="text-sm text-red-500 hover:text-red-300 transition-colors uppercase font-bold tracking-widest"
            >
                [Access Backdoor Protocol]
            </a>
        </div>
    );
}


// --- 2. Main Dashboard Component ---

function CommandCenter({ setView }) {
    const protocolsId = 'protocols';

    return (
        <>
            {/* Control Bar */}
            <FrontmanLiarControlBar setView={setView} />

            {/* Main Content Area */}
            <main className="bg-zinc-900 text-white min-h-screen grid grid-cols-12 gap-6 p-6 pt-20 font-mono">
                
                {/* --- Left Column (3/12) --- */}
                <section className="col-span-12 md:col-span-3 space-y-6">
                    
                    <div id="prize-pot">
                        <FrontmanLiarDisplay />
                    </div>

                    <FrontmanLiarPlayerCount />
                    
                    {/* BackDoorLink is used here, passing the setView function */}
                    <BackDoorLink setView={setView} /> 
                    
                </section>

                {/* --- Center Column (6/12) --- */}
                <section className="col-span-12 md:col-span-6 space-y-6">
                    
                    <div id="surveillance">
                        <FrontmanLiarSurveillance />
                    </div>

                    <GameConsole /> 
                    
                </section>

                {/* --- Right Column (3/12) --- */}
                <section className="col-span-12 md:col-span-3 space-y-6">
                    
                    <div id={protocolsId}> 
                        <div className="bg-zinc-950 border-2 border-red-700/80 p-4 rounded-lg text-center shadow-lg">
                            <h3 className="text-xl text-yellow-500 uppercase font-bold">Protocols Interface</h3>
                            <p className="text-zinc-500">Component for {protocolsId} goes here.</p>
                        </div>
                    </div>
                    
                    <EliminationFeed />
                    
                    <VIPLoungePanel />
                </section>
            </main>
        </>
    )
}

// --- 3. Game Arena Component (Refactored to be Dynamic) ---

function GameArena({ setView }) {
    const [unlocked, setUnlocked] = useState(false);
    // State to track which game is currently displayed in the main section
    const [activeGameId, setActiveGameId] = useState('MEM'); // Default to Memory Match

    useEffect(() => {
        // Simulates the 1.5-second 'unlocked' delay
        const timer = setTimeout(() => setUnlocked(true), 1500); 
        return () => clearTimeout(timer);
    }, []);

    // Get configuration for the active game
    const ActiveGameConfig = GAME_COMPONENTS[activeGameId];
    const ActiveGameComponent = ActiveGameConfig?.component;
    const ActiveGameTitle = ActiveGameConfig?.title;
    const ActiveGameBorder = ActiveGameConfig?.borderColor;

    return (
        <>
            {/* Global Styles for the Backdoor Aesthetic */}
            <style>{`
                /* Font Import for Digital Aesthetic (Orbitron) */
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
                
                body {
                    background-color: #000000;
                    color: #ffffff;
                    font-family: 'Orbitron', sans-serif;
                    margin: 0;
                    padding: 0;
                }

                /* Custom Neon Colors and Animation Simulation */
                .text-neon-pink { color: #ec4899; } /* Pink-500 */
                .border-neon-pink { border-color: #ec4899; }
                .bg-neon-pink { background-color: #ec4899; }
                .text-neon-blue { color: #3b82f6; } /* Blue-500 */
                .border-neon-blue { border-color: #3b82f6; }
                .bg-neon-blue { background-color: #3b82f6; }
                .text-neon-green { color: #22c55e; } /* Green-500 */
                .border-neon-green { border-color: #22c55e; }
                .bg-neon-green { background-color: #22c55e; }

                /* Simulate glowing/pulse effects */
                @keyframes glow-pulse {
                    0%, 100% { opacity: 0.9; text-shadow: 0 0 5px rgba(236, 72, 153, 0.7); }
                    50% { opacity: 1; text-shadow: 0 0 15px rgba(236, 72, 153, 1); }
                }
                .animate-glow-pulse {
                    animation: glow-pulse 2s infinite alternate;
                }
            `}</style>
            
            <main className="min-h-screen bg-black text-white p-6 max-w-screen-xl mx-auto space-y-12 pt-12 pb-12">
                <div className="text-center">
                    {/* Button to switch back to the Dashboard view */}
                    <button 
                        onClick={() => setView('dashboard')}
                        className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors uppercase font-bold tracking-widest mt-4"
                    >
                        &larr; Return to Command Center
                    </button>
                </div>

                {!unlocked ? (
                    // Initializing/Loading State
                    <div className="text-center pt-24">
                        <h1 className="text-neon-pink text-3xl font-bold animate-glow-pulse">
                            AUTHENTICATION REQUIRED
                        </h1>
                        <p className="text-zinc-400 text-sm mt-4">
                            ACCESSING LEVEL 7 SECURITY OVERRIDE...
                        </p>
                        <div className="mt-8 mx-auto w-3/4 h-3 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-neon-pink w-full animate-pulse rounded-full" />
                        </div>
                    </div>
                ) : (
                    // ✅ Unlocked/Game Arena State (Dynamic Logic)
                    <>
                        <header className="text-center space-y-2">
                            <h1 className="text-neon-pink text-4xl font-extrabold" style={{ textShadow: '0 0 10px #ec4899' }}>
                                F. M. GAME ARENA
                            </h1>
                            <p className="text-zinc-400 text-sm">LIVE SIMULATIONS. FACTION TRIALS. MASKED CLARITY.</p>
                        </header>

                        {/* 1. PRIMARY ACTIVE GAME DISPLAY (Dynamic based on activeGameId) */}
                        {/* Replaced motion.section with div for single-file compatibility */}
                        <div 
                            key={activeGameId}
                            className={`bg-gray-900 ${ActiveGameBorder} border-4 rounded-xl p-8 shadow-2xl min-h-[550px] transition-all duration-300`}
                        >
                            <h2 
                                className={`${ActiveGameConfig?.color} text-3xl font-extrabold mb-6 uppercase border-b border-gray-700 pb-3`}
                                style={{ textShadow: `0 0 10px ${ActiveGameConfig?.borderColor.split('-')[1] === 'pink' ? '#ec4899' : 'rgba(236, 72, 153, 0.7)'}` }}
                            >
                                ACTIVE GAME: {ActiveGameTitle}
                            </h2>
                            {ActiveGameComponent && (
                                <ActiveGameComponent 
                                    activeGame={activeGameId} 
                                    setActiveGame={setActiveGameId} 
                                />
                            )}
                        </div>

                        {/* 2. GAME SELECTION PANEL */}
                        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {Object.entries(GAME_COMPONENTS).map(([id, config]) => (
                                <GameSelectorPanel 
                                    key={id} 
                                    gameId={id} 
                                    gameConfig={config} 
                                    activeGameId={activeGameId} 
                                    setActiveGameId={setActiveGameId} 
                                />
                            ))}
                        </section>
                    </>
                )}
            </main>
        </>
    );
}

=======
'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  const prizeAmount = 45600000000
  const formatted = new Intl.NumberFormat('en-US').format(prizeAmount)

  return (
    <main className="min-h-screen bg-black text-white font-orbitron flex flex-col items-center justify-center p-6 space-y-8 animate-fade-in">
      {/* Golden Piggy Bank */}
      <div className="flex flex-col items-center space-y-2">
        <Image
          src="/images/golden-piggy-bank.png"
          alt="Golden Piggy Bank"
          width={96}
          height={96}
          className="drop-shadow-lg animate-laugh"
          priority
        />
        <p className="text-yellow-300 text-2xl font-bold tracking-tight">
          ₩{formatted}
        </p>
        <p className="text-zinc-400 text-sm">Current Prize Pool</p>
      </div>

      {/* CTA to Command Center */}
      <Link
        href="/command-center"
        className="bg-neon-pink hover:bg-pink-700 text-white px-6 py-3 rounded-md text-lg font-bold border border-pink-400 transition-colors"
      >
        Enter Command Center
      </Link>
    </main>
  )
}
>>>>>>> origin/master
