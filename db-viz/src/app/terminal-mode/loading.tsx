export default function TerminalModeLoading() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Top bar */}
      <div className="h-12 bg-gray-900 border-b border-gray-800 flex items-center gap-3 px-4">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="h-4 w-40 bg-gray-700 rounded animate-pulse mx-auto" />
      </div>

      {/* Terminal body */}
      <div className="flex-1 p-6 space-y-3 font-mono">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex gap-2 items-center">
            <span className="text-green-500 text-sm shrink-0">$</span>
            <div
              className="h-3 bg-gray-800 rounded animate-pulse"
              style={{ width: `${30 + (i * 17 + 23) % 55}%` }}
            />
          </div>
        ))}
        <div className="flex gap-2 items-center mt-2">
          <span className="text-green-500 text-sm shrink-0">$</span>
          <div className="w-2 h-4 bg-green-500 animate-pulse rounded-sm" />
        </div>
      </div>
    </div>
  );
}
