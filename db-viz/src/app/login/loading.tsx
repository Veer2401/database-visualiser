export default function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="h-7 w-32 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Card */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-gray-200/50 p-8 border border-white/50">
          <div className="text-center mb-8 space-y-2">
            <div className="h-7 w-40 bg-gray-200 rounded-lg animate-pulse mx-auto" />
            <div className="h-4 w-56 bg-gray-100 rounded animate-pulse mx-auto" />
          </div>

          <div className="space-y-3">
            <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200/50">
            <div className="h-3 w-64 bg-gray-100 rounded animate-pulse mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
