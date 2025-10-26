import Stripe from 'stripe'
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

    const { items, successUrl, cancelUrl } = parse.data

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []
    for (const item of items) {
      const p = getProduct(item.id)
      if (!p) {
        return Response.json({ error: `Product ${item.id} not found` }, { status: 404 })
      }
      if (!p.inStock) {
        return Response.json({ error: `Product ${item.id} is out of stock` }, { status: 409 })
      }
      lineItems.push({
        quantity: item.quantity,
        price_data: {
          currency: p.currency,
          product_data: { name: p.name, description: p.description },
          unit_amount: p.priceCents,
        },
      })
    }

    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      return Response.json({ error: 'Stripe not configured' }, { status: 500 })
    }

    const stripe = new Stripe(key)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
    })

    return Response.json({ id: session.id, url: session.url }, { status: 200 })
  } catch (err) {
    console.error('POST /api/checkout failed', err)
    return Response.json({ error: 'Unexpected server error' }, { status: 500 })
  }
}
