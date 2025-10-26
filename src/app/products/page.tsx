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
  const [min, setMin] = useState<number | ''>(search.get('min') ? Number(search.get('min')) : '')
  const [max, setMax] = useState<number | ''>(search.get('max') ? Number(search.get('max')) : '')
  const [page, setPage] = useState<number>(search.get('page') ? Number(search.get('page')) : 1)
  const pageSize = 9
  useEffect(() => {
    const usp = new URLSearchParams()
    if (q) usp.set('q', q)
    if (cat && cat !== 'all') usp.set('cat', cat)
    if (sort && sort !== 'relevance') usp.set('sort', sort)
    if (min !== '') usp.set('min', String(min))
    if (max !== '') usp.set('max', String(max))
    if (page > 1) usp.set('page', String(page))
    router.replace(`/products${usp.toString() ? '?' + usp.toString() : ''}`)
  }, [q, cat, sort, min, max, page, router])
  const cats = useMemo(() => Array.from(new Set(products.map(p => p.category))), [])
  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase()
    let arr = products.filter(p =>
      (cat === 'all' || p.category === cat) &&
      (ql === '' || p.name.toLowerCase().includes(ql) || p.description.toLowerCase().includes(ql)) &&
      (min === '' || p.priceCents >= (Number(min) * 100)) &&
      (max === '' || p.priceCents <= (Number(max) * 100))
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
  }, [q, cat, sort, min, max])
  const list = useMemo(() => filtered.slice(0, page * pageSize), [filtered, page])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-1 space-y-3">
          <div>
            <div className="text-sm font-medium mb-1">Search</div>
            <input className="border rounded px-3 py-2 w-full" placeholder="Search products..." value={q} onChange={(e) => { setPage(1); setQ(e.target.value) }} />
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Category</div>
            <select className="border rounded px-3 py-2 w-full" value={cat} onChange={(e) => { setPage(1); setCat(e.target.value as 'all' | 'apparel' | 'accessories') }}>
              <option value="all">All</option>
              {cats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Price range ($)</div>
            <div className="flex items-center gap-2">
              <input className="border rounded px-2 py-1 w-full" type="number" placeholder="Min" value={min} onChange={(e) => { setPage(1); setMin(e.target.value === '' ? '' : Number(e.target.value)) }} />
              <span>—</span>
              <input className="border rounded px-2 py-1 w-full" type="number" placeholder="Max" value={max} onChange={(e) => { setPage(1); setMax(e.target.value === '' ? '' : Number(e.target.value)) }} />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Sort</div>
            <select className="border rounded px-3 py-2 w-full" value={sort} onChange={(e) => { setPage(1); setSort(e.target.value as Sort) }}>
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price (Low → High)</option>
              <option value="price-desc">Price (High → Low)</option>
              <option value="name-asc">Name (A → Z)</option>
            </select>
          </div>
        </aside>
        {/* Products */}
        <section className="md:col-span-3">
          {filtered.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <>
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
              {list.length < filtered.length && (
                <div className="mt-6 flex justify-center">
                  <button className="border px-4 py-2 rounded" onClick={() => setPage((n) => n + 1)}>Load more</button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  )
}
