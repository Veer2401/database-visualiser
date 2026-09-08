export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="w-9 h-9 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        {/* Avatar + name */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-6 w-40 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-4 w-56 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
        {/* Fields */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 bg-gray-100 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
