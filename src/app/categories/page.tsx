import Link from 'next/link'
import { products } from '@/lib/products'

export const dynamic = 'force-dynamic'

export default function CategoriesPage() {
  const cats = Array.from(new Map(products.map(p => [p.category, 0])).keys()) as Array<'apparel'|'accessories'>
  const counts = cats.reduce<Record<string, number>>((acc, c) => { acc[c] = products.filter(p => p.category === c).length; return acc }, {})
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Categories</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cats.map((c) => (
          <li key={c} className="border rounded p-4">
            <div className="font-medium capitalize">{c}</div>
            <div className="text-sm opacity-70">{counts[c]} products</div>
            <div className="mt-2">
              <Link href={`/products?cat=${encodeURIComponent(c)}`} className="text-blue-600 underline">View</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}