"use client"

import { useCart } from '@/store/cart'

export function AddToCartButton({ id, disabled }: { id: string; disabled?: boolean }) {
  const add = useCart((s) => s.add)
  return (
    <button
      type="button"
      className="text-sm border px-3 py-1.5 rounded disabled:opacity-50"
      disabled={disabled}
      onClick={() => add({ id, quantity: 1 })}
    >
      Add to cart
    </button>
  )
}