export default function LoadingProducts() {
  return (
    <div className="p-6">
      <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-4" />
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <li key={i} className="border rounded p-4">
            <div className="aspect-[4/3] bg-gray-100 animate-pulse rounded mb-3" />
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-2" />
            <div className="h-3 w-40 bg-gray-100 animate-pulse rounded" />
          </li>
        ))}
      </ul>
    </div>
  )
}