"use client"

import Link from 'next/link'
import { useCart } from '@/store/cart'
import { getProduct } from '@/lib/products'
import { useMemo } from 'react'

export function MiniCart({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, updateQty, remove } = useCart()
  const products = useMemo(() => items.map((i) => ({ item: i, product: getProduct(i.id) })).filter((x) => !!x.product), [items])
  const subtotal = products.reduce((sum, x) => sum + (x.product!.priceCents * x.item.quantity), 0)
  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      {/* Panel */}
      <div className={`absolute right-0 top-0 h-full w-[360px] bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <div className="font-semibold">Your Cart</div>
          <button onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="p-4 space-y-3 overflow-auto h-[calc(100%-140px)]">
          {products.length === 0 ? <div className="text-sm opacity-70">Your cart is empty.</div> : (
            <ul className="space-y-3">
              {products.map(({ item, product }) => (
                <li key={item.id} className="flex items-center justify-between gap-2">
                  <div>
                    <div className="font-medium text-sm">{product!.name}</div>
                    <div className="text-xs opacity-70">${(product!.priceCents/100).toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input className="w-14 border rounded px-2 py-1" type="number" min={1} max={10} value={item.quantity} onChange={(e) => updateQty(item.id, Number(e.target.value))} />
                    <button className="text-red-600 text-sm" onClick={() => remove(item.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-4 border-t space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div>Subtotal</div>
            <div>${(subtotal/100).toFixed(2)}</div>
          </div>
          <div className="flex gap-2">
            <Link href="/cart" className="border px-3 py-2 rounded text-center flex-1" onClick={onClose}>View cart</Link>
            <Link href="/checkout" className="bg-blue-600 text-white px-3 py-2 rounded text-center flex-1" onClick={onClose}>Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  )
}