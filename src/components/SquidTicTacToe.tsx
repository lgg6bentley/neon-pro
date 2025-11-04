'use client'

import { useState } from 'react'

type Player = 'circle' | 'triangle'
type Cell = Player | null

const icons: Record<Player, string> = {
  circle: '₩',
  triangle: '🪙',
}

export default function SquidTicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<Player>('circle')
  const [winner, setWinner] = useState<Player | 'draw' | null>(null)

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const result = checkWinner(newBoard)
    if (result) {
      setWinner(result)
    } else {
      setCurrentPlayer(currentPlayer === 'circle' ? 'triangle' : 'circle')
    }
  }

  const checkWinner = (b: Cell[]): Player | 'draw' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6],            // diagonals
    ]
    for (const [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a]
    }
    return b.every(cell => cell) ? 'draw' : null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('circle')
    setWinner(null)
  }

  return (
    <div className="space-y-6 text-center animate-fade-in">
      <h2 className="text-neon-pink text-xl font-bold animate-glow-pulse">Squid Tic Tac Toe</h2>

      <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-20 h-20 text-3xl font-bold bg-zinc-700 text-white border border-zinc-500 rounded shadow hover:bg-zinc-600 transition"
          >
            {cell ? icons[cell] : ''}
          </button>
        ))}
      </div>

      {winner && (
        <div className="space-y-2 animate-glow-pulse">
          <p className="text-neon-green text-lg font-semibold">
            {winner === 'draw' ? 'It’s a draw!' : `${icons[winner]} wins!`}
          </p>
          <button
            onClick={resetGame}
            className="bg-neon-pink text-black px-4 py-2 rounded hover:bg-neon-green transition"
          >
            Play Again
          </button>
        </div>
      )}

      {!winner && (
        <p className="text-zinc-400 text-sm">
          Current turn: <span className="text-white font-bold">{icons[currentPlayer]}</span>
        </p>
      )}
    </div>
  )
}
