export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="h-12 w-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg mb-12" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="border dark:border-gray-800 rounded-2xl p-5 h-[450px] bg-white dark:bg-gray-900 shadow-sm flex flex-col"
          >
            <div className="h-56 w-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse mb-6" />
            <div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-4" />
            <div className="h-6 w-full bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-2" />
            <div className="h-6 w-2/3 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-4" />
            <div className="mt-auto h-8 w-24 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
