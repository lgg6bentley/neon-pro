'use client'; 

import React, { useState, useEffect, useRef } from 'react'; 
import { motion } from 'framer-motion';

// ====================================================================
// --- I. GAME REGISTRY: Define available games and their components ---
// ====================================================================

// --- Mock Game Components (Enhanced to take props) ---
const EchoChamberGame = ({ activeGame, setActiveGame }) => (
    <div className="h-full w-full bg-black/50 border border-gray-700 flex items-center justify-center text-gray-400">
        <p className='text-sm p-4 text-center'>[Echo Chamber]: Audio/Input Challenge Simulation. {activeGame === 'ECHO' ? '(Main View)' : '(Select to view)'}</p>
    </div>
);
const BackDoorTrialGame = ({ activeGame, setActiveGame }) => (
    <div className="h-full w-full bg-black/50 border border-gray-700 flex items-center justify-center text-gray-400">
        <p className='text-sm p-4 text-center'>[BackDoor Trial]: Complex Trial Logic Simulation. {activeGame === 'TRIAL' ? '(Main View)' : '(Select to view)'}</p>
    </div>
);


// --- FUNCTIONAL SQUID TIC-TAC-TOE GAME ---
function SquidTicTacToe({ activeGame, setActiveGame }) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winner = calculateWinner(board);

    const handleClick = (i) => {
        if (winner || board[i]) return;
        const newBoard = board.slice();
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const status = winner 
        ? `Winner: ${winner === 'X' ? '🔺' : '◯'}` 
        : board.every(Boolean) ? 'Draw' : `Next player: ${isXNext ? 'X (🔺)' : 'O (◯)'}`;

    const renderSquare = (i, isMini = false) => (
        <button
            className={`w-full aspect-square text-xl font-bold rounded-lg transition-all 
                        ${isMini ? 'text-xs' : 'text-3xl md:w-20 md:h-20'}
                        ${board[i] === 'X' ? 'bg-red-700 text-red-100' : board[i] === 'O' ? 'bg-blue-700 text-blue-100' : 'bg-zinc-800 hover:bg-zinc-700 text-white/50'}
                        ${(winner || board[i] || isMini) ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => { if (!isMini) handleClick(i) }}
            disabled={!!winner || !!board[i] || isMini}
        >
            {board[i] === 'X' ? '🔺' : board[i] === 'O' ? '◯' : (isMini ? '' : '')}
        </button>
    );

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6], // diagonals
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
    
    // Render logic distinguishes between main view and selector view
    const isMainView = activeGame === 'TTT';

    if (!isMainView) {
        // Mini view for selector panel
        return (
            <div className="grid grid-cols-3 gap-0.5 w-full h-full bg-zinc-900 p-0.5">
                {Array.from({ length: 9 }).map((_, i) => renderSquare(i, true))}
            </div>
        );
    }

    // Full view for main arena
    return (
        <section className="bg-gray-900 border border-blue-500 rounded-lg p-4 shadow-lg relative overflow-hidden">
            <h2 className="text-blue-400 text-xl font-bold mb-2">Squid Tic-Tac-Toe (Game ID: TTT)</h2>
            <div className="text-zinc-400 text-sm font-mono mb-4">{status}</div>
            
            <div className="grid grid-cols-3 gap-2 mx-auto max-w-xs">
                {Array.from({ length: 9 }).map((_, i) => renderSquare(i, false))}
            </div>

            <button
                onClick={() => { setBoard(Array(9).fill(null)); setIsXNext(true); }}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-md border border-blue-400 transition duration-200"
            >
                Reset TTT
            </button>
        </section>
    );
}

// --- FUNCTIONAL SQUID MEMORY GAME (Updated to pass props) ---
const symbols = [
    '◯', '△', '□', '💀', '🎮', '🪙',
    '🔺', '🟥', '🟢', '👁️', '₩', '🧠',
];

const generateDeck = () => {
    const deck = [...symbols, ...symbols];
    return deck.sort(() => Math.random() - 0.5);
};

function SquidMemoryGame({ activeGame, setActiveGame }) {
    const [deck, setDeck] = useState(generateDeck());
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [attempts, setAttempts] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [vipMessage, setVipMessage] = useState(null);

    useEffect(() => {
        if (flipped.length === 2) {
            const [first, second] = flipped;
            setAttempts(prev => prev + 1);

            if (deck[first] === deck[second]) {
                setMatched(prev => [...prev, first, second]);
            }
            setTimeout(() => setFlipped([]), 1000);
        }
    }, [flipped, deck]);

    useEffect(() => {
        if (matched.length === deck.length && deck.length > 0) {
            const duration = ((Date.now() - (startTime ?? Date.now())) / 1000).toFixed(1);
            setVipMessage(`VIP Alert: All pairs matched in ${attempts} attempts over ${duration} seconds.`);
        }
    }, [matched, deck.length, startTime, attempts]);

    const handleFlip = (index) => {
        if (!startTime) {
            setStartTime(Date.now());
        }
        if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
            setFlipped(prev => [...prev, index]);
        }
    };

    const handleReset = () => {
        setDeck(generateDeck());
        setFlipped([]);
        setMatched([]);
        setAttempts(0);
        setStartTime(Date.now());
        setVipMessage(null);
    };
    
    const isMainView = activeGame === 'MEM';

    if (!isMainView) {
        // Mini view for selector panel
        return (
            <div className="grid grid-cols-6 gap-0.5 w-full h-full bg-zinc-900 p-0.5">
                {deck.slice(0, 12).map((symbol, idx) => {
                    const isMatched = matched.includes(idx);
                    return (
                        <div 
                            key={idx}
                            className={`w-full aspect-square flex items-center justify-center text-xs rounded-sm transition-all
                                        ${isMatched ? 'bg-green-700 text-white' : 'bg-zinc-800 text-zinc-600'}`}
                        >
                            {isMatched ? symbol : '?'}
                        </div>
                    );
                })}
            </div>
        );
    }

    // Full view for main arena
    return (
        <section className="bg-gray-900 border border-pink-500 rounded-lg p-4 shadow-lg relative overflow-hidden">
            <h2 className="text-pink-400 text-xl font-bold mb-2">Squid Memory Match (Game ID: MEM)</h2>
            <div className="flex justify-between items-center mb-4">
                <div className="text-zinc-400 text-sm font-mono">
                    Attempts: {attempts} {startTime && `| Time: ${((Date.now() - (startTime ?? Date.now())) / 1000).toFixed(1)}s`}
                </div>
                <button
                    onClick={handleReset}
                    className="bg-pink-600 hover:bg-pink-700 text-white text-xs px-3 py-1 rounded-md border border-pink-400 transition duration-200"
                >
                    Reset Game
                </button>
            </div>
            
            {/* Card Grid */}
            <div className="relative">
                <div className="grid grid-cols-6 gap-2 md:gap-4 justify-center">
                    {deck.map((symbol, idx) => {
                        const isFlipped = flipped.includes(idx);
                        const isMatched = matched.includes(idx);
                        const isDisabled = flipped.length === 2 && !isFlipped;

                        return (
                            <motion.button
                                key={idx}
                                disabled={isDisabled || isMatched}
                                onClick={() => handleFlip(idx)}
                                initial={{ rotateY: 0 }}
                                animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
                                transition={{ duration: 0.4 }}
                                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                                className={`h-16 w-full max-w-20 aspect-square text-3xl font-bold rounded-md border perspective cursor-pointer transition-all ${
                                    isMatched
                                        ? 'bg-green-700 border-green-500 text-white shadow-green-400/50 shadow-md'
                                        : isFlipped
                                            ? 'bg-pink-700 border-pink-500 text-white'
                                            : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-600 text-zinc-600'
                                }`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center [transform:rotateY(0deg)] backface-hidden">
                                    {!isFlipped && !isMatched ? '?' : ''}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center [transform:rotateY(180deg)] backface-hidden">
                                    {isFlipped || isMatched ? symbol : ''}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {matched.length === deck.length && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                    >
                        <div className="bg-black bg-opacity-90 border-2 border-yellow-500 text-yellow-300 text-2xl md:text-3xl font-bold px-6 py-4 rounded-xl shadow-2xl shadow-yellow-500/50 text-center">
                            ALL SYMBOLS MATCHED
                        </div>
                    </motion.div>
                )}
            </div>

            {/* VIP Message */}
            {vipMessage && (
                <div className="mt-4 text-yellow-400 text-sm border-t border-yellow-600 pt-2 font-mono">
                    {vipMessage}
                </div>
            )}
        </section>
    );
}


// --- CENTRAL GAME REGISTRY ---
const GAME_COMPONENTS = {
    'MEM': { 
        title: 'Squid Memory Match', 
        component: SquidMemoryGame, 
        color: 'text-neon-pink', 
        borderColor: 'border-pink-800' 
    },
    'ECHO': { 
        title: 'Echo Chamber Test', 
        component: EchoChamberGame, 
        color: 'text-neon-green', 
        borderColor: 'border-green-800' 
    },
    'TRIAL': { 
        title: 'BackDoor Trial Sequence', 
        component: BackDoorTrialGame, 
        color: 'text-neon-pink', 
        borderColor: 'border-red-800' 
    },
    'TTT': { 
        title: 'Squid Tic Tac Toe', 
        component: SquidTicTacToe, 
        color: 'text-neon-blue', 
        borderColor: 'border-blue-800' 
    },
};

// ====================================================================
// --- II. GAME ARENA COMPONENTS (Refactored) ---
// ====================================================================

// NEW: Game Selector Panel
const GameSelectorPanel = ({ gameId, gameConfig, activeGameId, setActiveGameId }) => {
    const isSelected = activeGameId === gameId;
    const GameComponent = gameConfig.component;

    // Determine hover/selected style from the neon color
    const colorClass = gameConfig.color.split('-')[1]; // e.g., 'neon'
    const shadeClass = gameConfig.color.split('-')[2]; // e.g., 'pink'

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`bg-gray-900 border-2 rounded-xl p-4 shadow-2xl transition duration-500 ease-in-out cursor-pointer h-full
                        ${isSelected ? `${gameConfig.borderColor.replace('800', '500')} ring-4 ring-${shadeClass}-500` : `${gameConfig.borderColor} hover:border-white/50`}
                        ${gameId === 'TRIAL' ? 'md:col-span-2' : 'md:col-span-1'}`}
            onClick={() => setActiveGameId(gameId)}
        >
            <h3 className={`${gameConfig.color} text-xl font-extrabold mb-2 uppercase`}>
                {gameConfig.title}
            </h3>
            {isSelected && (
                 <p className='text-xs text-yellow-400 font-mono italic mb-2'>-- Currently Active --</p>
            )}
            
            {/* Render a miniature version or the actual component */}
            <div className="h-24 overflow-hidden rounded-md border border-zinc-700 p-1">
                <GameComponent activeGame={activeGameId} setActiveGame={setActiveGameId} />
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent the parent div onClick from firing
                    setActiveGameId(gameId);
                }}
                className={`mt-3 w-full text-xs font-bold py-1 rounded transition-colors 
                            ${isSelected ? 'bg-zinc-700 text-white/50 cursor-default' : 'bg-red-700 hover:bg-red-600 text-white'}`}
                disabled={isSelected}
            >
                {isSelected ? 'Active' : 'Set Active Game'}
            </button>
        </motion.div>
    );
};


function GameArena({ setView }) {
    const [unlocked, setUnlocked] = useState(false);
    // NEW: State to track which game is currently displayed in the main section
    const [activeGameId, setActiveGameId] = useState('MEM'); // Default to Memory Match

    useEffect(() => {
        const timer = setTimeout(() => setUnlocked(true), 1500); // Shorter delay for faster testing
        return () => clearTimeout(timer);
    }, []);

    const ActiveGameConfig = GAME_COMPONENTS[activeGameId];
    const ActiveGameComponent = ActiveGameConfig?.component;
    const ActiveGameTitle = ActiveGameConfig?.title;
    const ActiveGameColor = ActiveGameConfig?.color;
    const ActiveGameBorder = ActiveGameConfig?.borderColor;

    return (
        <>
            {/* Global Styles for the Backdoor Aesthetic (Kept for styling) */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
                body {
                    background-color: #000000;
                    color: #ffffff;
                    font-family: 'Orbitron', sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .text-neon-pink { color: #ec4899; }
                .text-neon-blue { color: #3b82f6; }
                .text-neon-green { color: #22c55e; }
                @keyframes glow-pulse {
                    0%, 100% { opacity: 0.9; text-shadow: 0 0 5px rgba(236, 72, 153, 0.7); }
                    50% { opacity: 1; text-shadow: 0 0 15px rgba(236, 72, 153, 1); }
                }
                .animate-glow-pulse {
                    animation: glow-pulse 2s infinite alternate;
                }
                .perspective { perspective: 1000px; }
                .backface-hidden { backface-visibility: hidden; }
            `}</style>
            
            <main className="min-h-screen bg-black text-white p-6 max-w-screen-xl mx-auto space-y-12 pt-12 pb-12">
                <div className="text-center">
                    <button 
                        onClick={() => setView('dashboard')}
                        className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors uppercase font-bold tracking-widest mt-4"
                    >
                        &larr; Return to Command Center
                    </button>
                </div>

                {!unlocked ? (
                    <div className="text-center pt-24">
                        <h1 className="text-neon-pink text-3xl font-bold animate-glow-pulse">AUTHENTICATION REQUIRED</h1>
                        <p className="text-zinc-400 text-sm mt-4">ACCESSING LEVEL 7 SECURITY OVERRIDE...</p>
                        <div className="mt-8 mx-auto w-3/4 h-3 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-neon-pink w-full animate-pulse rounded-full" />
                        </div>
                    </div>
                ) : (
                    <>
                        <header className="text-center space-y-2">
                            <h1 className="text-neon-pink text-4xl font-extrabold" style={{ textShadow: '0 0 10px #ec4899' }}>
                                F. M. GAME ARENA
                            </h1>
                            <p className="text-zinc-400 text-sm">LIVE SIMULATIONS. FACTION TRIALS. MASKED CLARITY.</p>
                        </header>

                        {/* 1. PRIMARY ACTIVE GAME DISPLAY */}
                        <motion.section 
                            key={activeGameId} // Key ensures re-mount for smooth transition of the ActiveGameComponent
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className={`bg-gray-900 ${ActiveGameBorder} border-4 rounded-xl p-8 shadow-2xl min-h-[550px]`}
                        >
                            <h2 
                                className={`${ActiveGameColor} text-3xl font-extrabold mb-6 uppercase border-b border-gray-700 pb-3`}
                                style={{ textShadow: '0 0 10px rgba(236, 72, 153, 0.7)' }}
                            >
                                ACTIVE GAME: {ActiveGameTitle}
                            </h2>
                            {ActiveGameComponent && (
                                <ActiveGameComponent 
                                    activeGame={activeGameId} 
                                    setActiveGame={setActiveGameId} 
                                />
                            )}
                        </motion.section>

                        {/* 2. GAME SELECTION PANEL */}
                        <section className="grid grid-cols-2 md:grid-cols-6 gap-6">
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

// ====================================================================
// --- III. CORE APPLICATION COMPONENTS (Unchanged/Slightly Cleaned) ---
// ====================================================================

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
                {/* Link to arena in the navbar */}
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


// --- Main Dashboard Component ---

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
