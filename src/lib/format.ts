export function formatPrice(cents: number, currency: string = 'USD', locale: string = 'en-US') {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(cents / 100)
  } catch {
    return `$${(cents / 100).toFixed(2)}`
  }
}