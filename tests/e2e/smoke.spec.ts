import { test, expect } from '@playwright/test'

test('home loads and shows link to products', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Welcome to the Store' })).toBeVisible()
  await expect(page.getByRole('link', { name: /products/i })).toBeVisible()
})

test('products page lists items and can add to cart', async ({ page }) => {
  await page.goto('/products')
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()
  // Add first product to cart
  const firstAdd = page.getByRole('button', { name: 'Add to cart' }).first()
  await firstAdd.click()
  // Open mini cart
  await page.getByRole('button', { name: /cart \(/i }).click()
  await expect(page.getByText('Your Cart')).toBeVisible()
})
