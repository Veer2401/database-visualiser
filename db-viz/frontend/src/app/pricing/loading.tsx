export default function PricingLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="w-9 h-9 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
        </div>
      </header>

      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12 space-y-3">
            <div className="h-4 w-16 bg-gray-100 rounded animate-pulse mx-auto" />
            <div className="h-9 w-72 bg-gray-200 rounded-xl animate-pulse mx-auto" />
            <div className="h-4 w-48 bg-gray-100 rounded animate-pulse mx-auto" />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-8 rounded-2xl border-2 border-gray-200 bg-white">
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-9 w-24 bg-gray-100 rounded animate-pulse mb-4" />
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse mb-6" />
                <div className="space-y-3">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse shrink-0" />
                      <div className="h-3 bg-gray-100 rounded animate-pulse flex-1" />
                    </div>
                  ))}
                </div>
                <div className="mt-8 h-10 bg-gray-200 rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
