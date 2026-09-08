export default function SettingsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="w-9 h-9 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </header>

      <div className="flex flex-1 max-w-5xl mx-auto w-full px-4 py-8 gap-8">
        {/* Sidebar nav */}
        <aside className="hidden md:block w-52 shrink-0">
          <nav className="space-y-1">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse shrink-0" />
                <div className="h-3 bg-gray-100 rounded animate-pulse" style={{ width: `${55 + (i * 10) % 35}%` }} />
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 space-y-4">
          {/* Section header */}
          <div className="h-7 w-32 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-56 bg-gray-100 rounded animate-pulse" />

          {/* Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-4 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 bg-gray-100 rounded-xl animate-pulse" />
              </div>
            ))}
            <div className="pt-2">
              <div className="h-10 w-28 bg-gray-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
