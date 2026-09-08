export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 border-b border-gray-100 flex items-center px-6 gap-4">
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="flex-1" />
        <div className="flex gap-3">
          <div className="h-8 w-20 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-8 w-20 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="pt-32 pb-20 flex flex-col items-center text-center px-4 gap-5">
        <div className="h-5 w-40 bg-gray-100 rounded-full animate-pulse" />
        <div className="h-14 w-3/4 max-w-xl bg-gray-200 rounded-2xl animate-pulse" />
        <div className="h-14 w-1/2 max-w-lg bg-gray-100 rounded-2xl animate-pulse" />
        <div className="h-5 w-96 bg-gray-100 rounded animate-pulse" />
        <div className="flex gap-3 mt-4">
          <div className="h-11 w-36 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-11 w-36 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </div>

      {/* Screenshot skeleton */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="w-full h-80 bg-gray-100 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}
