export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Landing-aligned Top Navigation Bar Skeleton */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/80 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-3 bg-gray-100 rounded animate-pulse hidden sm:inline" />
          <div className="h-4 w-16 bg-gray-100 rounded animate-pulse hidden sm:inline" />
        </div>
        <div className="w-24 h-8 rounded-full bg-gray-100 animate-pulse" />
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Title skeleton */}
        <div className="mb-8 space-y-1.5">
          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-44 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Identity Card Skeleton */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)] space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-5">
                  <div className="w-18 h-18 rounded-2xl bg-gray-200 animate-pulse shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-6 w-40 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="h-4 w-28 bg-gray-100 rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="border-t border-gray-100 my-6" />
                <div className="space-y-4">
                  <div className="h-14 bg-gray-50 rounded-xl animate-pulse" />
                  <div className="h-14 bg-gray-50 rounded-xl animate-pulse" />
                </div>
              </div>
              <div className="h-10 bg-gray-100 rounded-full animate-pulse mt-6" />
            </div>
          </div>

          {/* Right Column: Plan Card Skeleton */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="rounded-2xl p-6 sm:p-7 bg-[#1c1c1c] border border-white/10 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-5 w-24 bg-white/10 rounded-full animate-pulse" />
                  <div className="w-5 h-5 rounded-full bg-white/10 animate-pulse" />
                </div>
                <div className="h-7 w-32 bg-white/20 rounded-lg animate-pulse mb-2" />
                <div className="h-8 w-20 bg-white/10 rounded animate-pulse mb-3" />
                <div className="h-4 w-full bg-white/10 rounded animate-pulse mb-6" />
                <div className="border-t border-white/10 my-4" />
                <div className="space-y-3">
                  <div className="h-3 w-28 bg-white/10 rounded animate-pulse" />
                  <div className="h-3.5 w-4/5 bg-white/10 rounded animate-pulse" />
                  <div className="h-3.5 w-3/4 bg-white/10 rounded animate-pulse" />
                  <div className="h-3.5 w-5/6 bg-white/10 rounded animate-pulse" />
                </div>
              </div>
              <div className="h-10 bg-white/20 rounded-full animate-pulse mt-6" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
