"use client"

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useCart } from '@/store/cart'
import { getProduct } from '@/lib/products'

export default function CartPage() {
  const { items, updateQty, remove, clear } = useCart()
  const [loading, setLoading] = useState(false)
  const products = useMemo(() => items.map((i) => ({ item: i, product: getProduct(i.id) })).filter((x) => !!x.product), [items])
  const subtotal = products.reduce((sum, x) => sum + (x.product!.priceCents * x.item.quantity), 0)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  async function checkout() {
    try {
      setLoading(true)
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          successUrl: `${appUrl}/checkout?success=1`,
          cancelUrl: `${appUrl}/cart?canceled=1`,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        alert(data?.error || 'Checkout failed')
        return
      }
      const data = await res.json()
      if (data?.url) {
        window.location.href = data.url
      }
    } catch (e) {
      console.error(e)
      alert('Unexpected error starting checkout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Cart</h1>
      {products.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <div className="mt-3"><Link href="/products" className="text-blue-600 underline">Browse products</Link></div>
        </div>
      ) : (
        <div className="space-y-4">
          <ul className="divide-y">
            {products.map(({ item, product }) => (
              <li key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium">{product!.name}</div>
                  <div className="text-sm opacity-70">${(product!.priceCents / 100).toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    className="w-16 border rounded px-2 py-1"
                    type="number"
                    min={1}
                    max={10}
                    value={item.quantity}
                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                  />
                  <button className="text-red-600" onClick={() => remove(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <div className="font-semibold">Subtotal</div>
            <div>${(subtotal / 100).toFixed(2)}</div>
          </div>
          <div className="flex gap-3">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              onClick={checkout}
              disabled={loading}
            >
              {loading ? 'Processing…' : 'Checkout'}
            </button>
            <button className="border px-4 py-2 rounded" onClick={clear}>Clear</button>
          </div>
        </div>
      )}
    </div>
  )
}
