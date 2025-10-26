"use client"

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/lib/products'
import { useMemo, useState } from 'react'
import { AddToCartButton } from './shared'

export default function ProductsPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<'all' | 'apparel' | 'accessories'>('all')
  const cats = useMemo(() => Array.from(new Set(products.map(p => p.category))), [])
  const list = useMemo(() => {
    const ql = q.trim().toLowerCase()
    return products.filter(p =>
      (cat === 'all' || p.category === cat) &&
      (ql === '' || p.name.toLowerCase().includes(ql) || p.description.toLowerCase().includes(ql))
    )
  }, [q, cat])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="Search products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2 w-full sm:w-56"
          value={cat}
          onChange={(e) => setCat(e.target.value as 'all' | 'apparel' | 'accessories')}
        >
          <option value="all">All categories</option>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {list.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {list.map((p) => (
            <li key={p.id} className="border rounded p-4">
              <div className="aspect-[4/3] bg-gray-100 mb-3 relative overflow-hidden">
                <Image src={p.images[0]} alt={p.name} fill className="object-contain" />
              </div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm opacity-80">{p.description}</div>
              <div className="mt-2">${(p.priceCents / 100).toFixed(2)}</div>
              <div className="mt-3 flex gap-3">
                <Link className="text-blue-600 underline" href={`/products/${p.id}`}>
                  View details
                </Link>
                <AddToCartButton id={p.id} disabled={!p.inStock} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
