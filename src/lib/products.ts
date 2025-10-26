export type Product = {
  id: string
  name: string
  description: string
  priceCents: number
  currency: 'usd'
  image: string
  inStock: boolean
}

export const products: Product[] = [
  {
    id: 'sku-basic-shirt',
    name: 'Basic Tee',
    description: 'Soft cotton tee in classic fit',
    priceCents: 1999,
    currency: 'usd',
    image: '/images/products/basic-tee.jpg',
    inStock: true,
  },
  {
    id: 'sku-hoodie',
    name: 'Cozy Hoodie',
    description: 'Fleece-lined hoodie for all-day comfort',
    priceCents: 4999,
    currency: 'usd',
    image: '/images/products/cozy-hoodie.jpg',
    inStock: true,
  },
  {
    id: 'sku-water-bottle',
    name: 'Steel Water Bottle',
    description: 'Insulated bottle keeps drinks cold 24h, hot 12h',
    priceCents: 2999,
    currency: 'usd',
    image: '/images/products/steel-bottle.jpg',
    inStock: false,
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
