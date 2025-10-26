"use client"

import { useOrders } from '@/store/orders'
import { getProduct } from '@/lib/products'

export default function OrdersPage() {
  const orders = useOrders((s) => s.orders)
  if (orders.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Orders</h1>
        <p>No orders yet.</p>
      </div>
    )
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      <ul className="space-y-3">
        {orders.map((o) => (
          <li key={o.id} className="border rounded p-4">
            <div className="font-medium">Order {o.id}</div>
            <div className="text-sm opacity-70">{new Date(o.createdAt).toLocaleString()}</div>
            <div className="mt-2 text-sm">
              {o.items.map(i => {
                const p = getProduct(i.id)
                return (
                  <div key={i.id} className="flex items-center justify-between">
                    <span>{p?.name ?? i.id}</span>
                    <span>Qty {i.quantity}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-2">Total ${(o.totalCents / 100).toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}