export default function DocumentationLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="w-9 h-9 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar nav */}
        <aside className="hidden md:block w-48 shrink-0">
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse shrink-0" />
                <div className="h-3 bg-gray-100 rounded animate-pulse flex-1" />
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 space-y-10">
          {[...Array(3)].map((_, i) => (
            <section key={i}>
              <div className="h-7 w-48 bg-gray-200 rounded-lg animate-pulse mb-4" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-gray-100 rounded animate-pulse" />
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
