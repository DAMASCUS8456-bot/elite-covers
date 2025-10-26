export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { products } from '@/lib/products'

export default function ProductsPage() {
  const list = products
  if (!list || list.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Products</h1>
        <p>No products available right now. Please check back later.</p>
      </div>
    )
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {list.map((p) => (
          <li key={p.id} className="border rounded p-4">
            <div className="font-medium">{p.name}</div>
            <div className="text-sm opacity-80">{p.description}</div>
            <div className="mt-2">${(p.priceCents / 100).toFixed(2)}</div>
            <div className="mt-2">
              <Link className="text-blue-600 underline" href={`/products/${p.id}`}>
                View details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
