"use client"

import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/products'
import { useCart } from '@/store/cart'

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = getProduct(params.id)
  const add = useCart((s) => s.add)
  if (!product) return notFound()
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <p className="opacity-80 mt-2">{product.description}</p>
      <div className="mt-4">${(product.priceCents / 100).toFixed(2)}</div>
      {!product.inStock && <div className="mt-2 text-red-600">Out of stock</div>}
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!product.inStock}
          onClick={() => add({ id: product.id, quantity: 1 })}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
