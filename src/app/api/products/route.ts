export const dynamic = 'force-dynamic'

export async function GET() {
  const { products } = await import('@/lib/products')
  try {
    return Response.json({ products }, { status: 200 })
  } catch (err) {
    console.error('GET /api/products failed', err)
    return Response.json(
      { error: 'Unexpected error fetching products' },
      { status: 500 }
    )
  }
}
