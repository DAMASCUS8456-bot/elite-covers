"use client"

import { useCart } from '@/store/cart'
import { useToast } from '@/components/ToastProvider'

export function AddToCartButton({ id, disabled }: { id: string; disabled?: boolean }) {
  const add = useCart((s) => s.add)
  const { show } = useToast()
  return (
    <button
      type="button"
      className="text-sm border px-3 py-1.5 rounded disabled:opacity-50"
      disabled={disabled}
      onClick={() => {
        add({ id, quantity: 1 })
        show({ title: 'Added to cart', message: id })
      }}
    >
      Add to cart
    </button>
  )
}
