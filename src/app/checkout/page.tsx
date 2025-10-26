"use client"

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/store/cart'
import { useOrders } from '@/store/orders'
import { getProduct } from '@/lib/products'

export default function CheckoutPage() {
  const { items, clear } = useCart()
  const addOrder = useOrders((s) => s.add)
  const initialStatus = typeof window !== 'undefined'
    ? (new URLSearchParams(window.location.search).get('success') === '1'
        ? 'success'
        : (new URLSearchParams(window.location.search).get('canceled') === '1' ? 'canceled' : 'idle'))
    : 'idle'
  const [status] = useState<'idle' | 'success' | 'canceled'>(initialStatus)
  const products = useMemo(() => items.map((i) => ({ item: i, product: getProduct(i.id) })).filter((x) => !!x.product), [items])
  const total = products.reduce((sum, x) => sum + (x.product!.priceCents * x.item.quantity), 0)

  useEffect(() => {
    if (status !== 'success') return
    if (items.length > 0) {
      addOrder({ id: `local-${Date.now()}`, items: items.slice(), totalCents: total, createdAt: new Date().toISOString() })
      clear()
    }
  }, [status, items, addOrder, clear, total])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">Checkout</h1>
      {status === 'success' ? (
        <div className="text-green-700">
          <p>Payment succeeded. Your order has been recorded locally.</p>
          <div className="mt-3 flex gap-3">
            <Link href="/orders" className="text-blue-600 underline">View orders</Link>
            <Link href="/products" className="text-blue-600 underline">Continue shopping</Link>
          </div>
        </div>
      ) : status === 'canceled' ? (
        <div className="text-amber-700">Payment canceled. You can try again from the cart.</div>
      ) : (
        <p className="opacity-80">After successful payment you will be redirected back here.</p>
      )}
    </div>
  )
}
