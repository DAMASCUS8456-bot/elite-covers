"use client"

import Link from 'next/link'
import { useCart } from '@/store/cart'
import { useState } from 'react'
import { MiniCart } from './MiniCart'

export function Nav() {
  const items = useCart((s) => s.items)
  const count = items.reduce((n, i) => n + i.quantity, 0)
  const [open, setOpen] = useState(false)
  return (
    <header className="border-b">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">Dropshipping Store</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/products" className="hover:underline">Products</Link>
          <Link href="/offers" className="hover:underline">Offers</Link>
          <Link href="/categories" className="hover:underline">Categories</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <button className="hover:underline" onClick={() => setOpen(true)} aria-label="Open mini cart">Cart ({count})</button>
        </nav>
      </div>
      <MiniCart open={open} onClose={() => setOpen(false)} />
    </header>
  )
}
