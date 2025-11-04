'use client'

/**
 * PrizePotDisplay Component
 * Displays the current prize pot amount in Korean Won (₩) with proper formatting.
 */
export default function PrizePotDisplay() {
  // The raw amount in a numerical format. 
  // 45,600,000,000 (45.6 Billion)
  const rawAmount = 45600000000;

  // Use the Intl.NumberFormat for robust currency formatting.
  // This is generally preferred over toLocaleString() when dealing specifically with currency.
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KRW', // Korean Won
    minimumFractionDigits: 0, // No decimal places for this large whole number
    maximumFractionDigits: 0,
  }).format(rawAmount);

  // The formatted amount will be '₩45,600,000,000'

  return (
    <section className="bg-gray-900 border border-green-500 rounded-xl p-6 shadow-2xl text-center transition-all duration-300 hover:shadow-green-500/50">
      {/* Title */}
      <h2 className="text-green-400 text-2xl font-extrabold mb-4 uppercase tracking-wider">
        Current Prize Pot
      </h2>

      {/* Display Box for the Amount */}
      <div className="inline-flex items-center justify-center bg-black/50 px-5 py-3 rounded-lg border-2 border-green-400 max-w-full overflow-hidden shadow-inner shadow-green-700/50">
        <p className="text-3xl sm:text-4xl font-black text-green-300 tracking-tightest break-all">
          {formattedAmount}
        </p>
      </div>
      
      {/* Footer/Context Text */}
      <p className="text-sm text-zinc-400 mt-3 font-medium">
        (Estimated total winnings)
      </p>
    </section>
  );
}