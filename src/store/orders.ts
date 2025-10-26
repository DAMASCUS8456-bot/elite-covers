import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/lib/validators'

export type Order = {
  id: string
  items: CartItem[]
  totalCents: number
  createdAt: string
}

type OrdersState = {
  orders: Order[]
  add: (o: Order) => void
  clearAll: () => void
}

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      add: (o) => set((s) => ({ orders: [o, ...s.orders] })),
      clearAll: () => set({ orders: [] }),
    }),
    { name: 'orders', version: 1 }
  )
)