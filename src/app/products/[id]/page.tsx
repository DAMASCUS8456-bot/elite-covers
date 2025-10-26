import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/products'
import type { Metadata } from 'next'
import ClientProduct from './product.client'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = getProduct(params.id)
  if (!product) return { title: 'Product not found' }
  return {
    title: `${product.name} – $${(product.priceCents/100).toFixed(2)}`,
    description: product.description,
    openGraph: { title: product.name, description: product.description },
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id)
  if (!product) return notFound()
  return <ClientProduct product={product} />
}
