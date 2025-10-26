export default function LoadingProduct() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="aspect-[4/3] bg-gray-100 animate-pulse rounded" />
      <div>
        <div className="h-6 w-56 bg-gray-200 animate-pulse rounded mb-3" />
        <div className="h-4 w-80 bg-gray-100 animate-pulse rounded" />
      </div>
    </div>
  )
}