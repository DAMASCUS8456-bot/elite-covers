import { z } from 'zod'

export const CartItemSchema = z.object({
  id: z.string().min(1),
  quantity: z.number().int().min(1).max(10),
})
export type CartItem = z.infer<typeof CartItemSchema>

export const CheckoutRequestSchema = z.object({
  items: z.array(CartItemSchema).min(1),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
})
export type CheckoutRequest = z.infer<typeof CheckoutRequestSchema>
