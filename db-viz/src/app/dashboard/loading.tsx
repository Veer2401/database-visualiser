export default function DashboardLoading() {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar skeleton */}
      <div className="w-64 border-r border-gray-200 flex flex-col gap-3 p-4 shrink-0">
        {/* Logo */}
        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse mb-4" />
        {/* DB items */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-2 py-2">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse shrink-0" />
            <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" style={{ width: `${60 + i * 10}%` }} />
          </div>
        ))}
        <div className="mt-auto">
          <div className="h-10 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className="h-14 border-b border-gray-200 flex items-center gap-4 px-4 shrink-0">
          <div className="h-8 w-36 bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex-1" />
          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Canvas skeleton */}
        <div className="flex-1 relative bg-gray-50">
          {/* Dot grid pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#94a3b8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>

          {/* Fake table nodes */}
          <div className="absolute" style={{ left: 100, top: 80 }}>
            <TableNodeSkeleton cols={4} />
          </div>
          <div className="absolute" style={{ left: 450, top: 120 }}>
            <TableNodeSkeleton cols={3} />
          </div>
          <div className="absolute" style={{ left: 780, top: 60 }}>
            <TableNodeSkeleton cols={5} />
          </div>

          {/* Loading indicator in center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-3 opacity-60">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              <span className="text-xs text-gray-400 font-medium">Loading workspace…</span>
            </div>
          </div>
        </div>

        {/* Terminal skeleton */}
        <div className="h-32 border-t border-gray-200 bg-gray-900 p-3 shrink-0">
          <div className="flex gap-2 mb-3">
            <div className="w-3 h-3 bg-red-500/50 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500/50 rounded-full" />
            <div className="w-3 h-3 bg-green-500/50 rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-2/3 bg-gray-700 rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TableNodeSkeleton({ cols }: { cols: number }) {
  return (
    <div className="w-56 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      <div className="h-10 bg-gray-100 px-3 flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-300 rounded" />
        <div className="h-3 w-24 bg-gray-300 rounded" />
      </div>
      <div className="p-2 space-y-1.5">
        {[...Array(cols)].map((_, i) => (
          <div key={i} className="flex items-center gap-2 py-1 px-1">
            <div className="w-3 h-3 bg-gray-200 rounded shrink-0" />
            <div className="h-2.5 bg-gray-200 rounded flex-1" style={{ width: `${50 + (i * 13) % 40}%` }} />
            <div className="h-2 w-10 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
