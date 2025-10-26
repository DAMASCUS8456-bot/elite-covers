"use client"

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/lib/products'
import { useMemo, useState, useEffect, Suspense } from 'react'
import { AddToCartButton } from './shared'
import { useRouter, useSearchParams } from 'next/navigation'
import { formatPrice } from '@/lib/format'

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <ProductsInner />
    </Suspense>
  )
}

function ProductsInner() {
  const search = useSearchParams()
  const router = useRouter()
  const [q, setQ] = useState(search.get('q') ?? '')
  type Cat = 'all' | 'apparel' | 'accessories'
  type Sort = 'relevance' | 'price-asc' | 'price-desc' | 'name-asc'
  const [cat, setCat] = useState<Cat>((search.get('cat') as Cat | null) ?? 'all')
  const [sort, setSort] = useState<Sort>((search.get('sort') as Sort | null) ?? 'relevance')
  useEffect(() => {
    const usp = new URLSearchParams()
    if (q) usp.set('q', q)
    if (cat && cat !== 'all') usp.set('cat', cat)
    if (sort && sort !== 'relevance') usp.set('sort', sort)
    router.replace(`/products${usp.toString() ? '?' + usp.toString() : ''}`)
  }, [q, cat, sort, router])
  const cats = useMemo(() => Array.from(new Set(products.map(p => p.category))), [])
  const list = useMemo(() => {
    const ql = q.trim().toLowerCase()
    let arr = products.filter(p =>
      (cat === 'all' || p.category === cat) &&
      (ql === '' || p.name.toLowerCase().includes(ql) || p.description.toLowerCase().includes(ql))
    )
    switch (sort) {
      case 'price-asc':
        arr = arr.slice().sort((a,b) => a.priceCents - b.priceCents); break
      case 'price-desc':
        arr = arr.slice().sort((a,b) => b.priceCents - a.priceCents); break
      case 'name-asc':
        arr = arr.slice().sort((a,b) => a.name.localeCompare(b.name)); break
    }
    return arr
  }, [q, cat, sort])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="Search products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2 w-full"
          value={cat}
          onChange={(e) => setCat(e.target.value as 'all' | 'apparel' | 'accessories')}
        >
          <option value="all">All categories</option>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          className="border rounded px-3 py-2 w-full"
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Sort: Price (Low → High)</option>
          <option value="price-desc">Sort: Price (High → Low)</option>
          <option value="name-asc">Sort: Name (A → Z)</option>
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
              <div className="font-medium flex items-center gap-2">
                {p.name}
                {!p.inStock && <span className="text-xs px-2 py-0.5 rounded bg-gray-200">Out of stock</span>}
              </div>
              <div className="text-sm opacity-80">{p.description}</div>
              <div className="mt-2">{formatPrice(p.priceCents)}</div>
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
