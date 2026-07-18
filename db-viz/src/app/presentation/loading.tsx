export default function PresentationLoading() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-2 border-gray-600 border-t-gray-200 rounded-full animate-spin" />
      <p className="text-gray-400 text-sm font-medium">Loading presentation…</p>
    </div>
  );
}
