import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, CartItemSchema } from '@/lib/validators'

type CartState = {
  items: CartItem[]
  add: (item: CartItem) => void
  remove: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const parsed = CartItemSchema.safeParse(item)
          if (!parsed.success) return state
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            const nextQty = Math.min(existing.quantity + item.quantity, 10)
            return {
              items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: nextQty } : i)),
            }
          }
          return { items: [...state.items, { id: item.id, quantity: Math.min(item.quantity, 10) }] }
        }),
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, Math.min(10, Math.trunc(qty))) } : i)),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: 'cart', version: 1 }
  )
)
