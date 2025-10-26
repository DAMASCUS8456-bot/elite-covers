"use client"

import Link from 'next/link'
import { useCart } from '@/store/cart'

export function Nav() {
  const items = useCart((s) => s.items)
  const count = items.reduce((n, i) => n + i.quantity, 0)
  return (
    <header className="border-b">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">Dropshipping Store</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/products" className="hover:underline">Products</Link>
          <Link href="/offers" className="hover:underline">Offers</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/cart" className="hover:underline">Cart ({count})</Link>
        </nav>
      </div>
    </header>
  )
}
