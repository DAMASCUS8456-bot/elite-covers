export const dynamic = 'force-dynamic'

export async function GET(
  _req: Request,
  context: { params: { id: string } }
) {
  const { getProduct } = await import('@/lib/products')
  try {
    const { id } = context.params
    if (!id || typeof id !== 'string') {
      return Response.json({ error: 'Invalid product id' }, { status: 400 })
    }
    const product = getProduct(id)
    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 })
    }
    return Response.json({ product }, { status: 200 })
  } catch (err) {
    console.error('GET /api/products/[id] failed', err)
    return Response.json(
      { error: 'Unexpected error fetching product' },
      { status: 500 }
    )
  }
}
