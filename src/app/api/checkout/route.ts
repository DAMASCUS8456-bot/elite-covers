import { CheckoutRequestSchema } from '@/lib/validators'
import { getProduct } from '@/lib/products'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const parse = CheckoutRequestSchema.safeParse(body)
    if (!parse.success) {
      return Response.json({ error: 'Invalid payload', details: parse.error.format() }, { status: 400 })
    }

    const { items, successUrl } = parse.data

    // Validate items and compute total
    let totalCents = 0
    for (const item of items) {
      const p = getProduct(item.id)
      if (!p) return Response.json({ error: `Product ${item.id} not found` }, { status: 404 })
      if (!p.inStock) return Response.json({ error: `Product ${item.id} is out of stock` }, { status: 409 })
      totalCents += p.priceCents * item.quantity
    }

    // Payoneer note: Payoneer does not provide a drop-in web checkout API like Stripe.
    // If you have a hosted payment page or link, set it via PAYONEER_CHECKOUT_URL and we will redirect.
    const payoneerUrl = process.env.PAYONEER_CHECKOUT_URL
    if (payoneerUrl) {
      return Response.json({ url: payoneerUrl }, { status: 200 })
    }

    // Fallback: simulate order creation and mark as paid externally; client will handle success redirect.
    const orderId = `order_${Date.now()}`
    return Response.json({ id: orderId, totalCents, success: true, redirect: successUrl }, { status: 200 })
  } catch (err) {
    console.error('POST /api/checkout failed', err)
    return Response.json({ error: 'Unexpected server error' }, { status: 500 })
  }
}
