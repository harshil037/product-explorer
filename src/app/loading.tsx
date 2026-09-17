export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-md w-full md:w-96"></div>
        <div className="h-10 bg-gray-200 rounded-md w-48"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-4 animate-pulse">
          <div className="h-48 bg-gray-200 rounded-lg"></div>
        </aside>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-5 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}