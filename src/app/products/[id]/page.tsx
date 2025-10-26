"use client"

import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/products'
import { useCart } from '@/store/cart'

import Image from 'next/image'
import { useState } from 'react'

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = getProduct(params.id)
  const add = useCart((s) => s.add)
  const [imgIdx, setImgIdx] = useState(0)
  if (!product) return notFound()
  const images = product.images?.length ? product.images : ['/vercel.svg']
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden rounded">
            <Image src={images[imgIdx]} alt={product.name} fill className="object-contain" />
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((src, i) => (
                <button key={src} className={`h-16 w-20 border rounded overflow-hidden ${i===imgIdx?'ring-2 ring-blue-500':''}`} onClick={() => setImgIdx(i)}>
                  <div className="relative h-full w-full">
                    <Image src={src} alt="thumb" fill className="object-contain" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="text-sm opacity-70 mt-1">Category: {product.category}</div>
          <p className="opacity-80 mt-2">{product.description}</p>
          <div className="mt-4 text-lg">${(product.priceCents / 100).toFixed(2)}</div>
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
      </div>
    </div>
  )
}
