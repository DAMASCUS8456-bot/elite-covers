export type Product = {
  id: string
  name: string
  description: string
  priceCents: number
  currency: 'usd'
  image: string
  inStock: boolean
  category: 'apparel' | 'accessories'
}

export const products: Product[] = [
  {
    id: 'sku-basic-shirt',
    name: 'Basic Tee',
    description: 'Soft cotton tee in classic fit',
    priceCents: 1999,
    currency: 'usd',
    image: '/images/products/basic-tee.svg',
    inStock: true,
    category: 'apparel',
  },
  {
    id: 'sku-hoodie',
    name: 'Cozy Hoodie',
    description: 'Fleece-lined hoodie for all-day comfort',
    priceCents: 4999,
    currency: 'usd',
    image: '/images/products/cozy-hoodie.svg',
    inStock: true,
    category: 'apparel',
  },
  {
    id: 'sku-water-bottle',
    name: 'Steel Water Bottle',
    description: 'Insulated bottle keeps drinks cold 24h, hot 12h',
    priceCents: 2999,
    currency: 'usd',
    image: '/images/products/steel-bottle.svg',
    inStock: false,
    category: 'accessories',
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
