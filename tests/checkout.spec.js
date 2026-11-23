// @ts-check
import { test, expect } from '@playwright/test'

/**
 * LittleCart – Playwright Automated Test Suite
 *
 * Product IDs used as test-id suffixes:
 *   classic-notebook  → price ₹120
 *   premium-pen-set   → price ₹80
 *
 * Each test navigates to '/' in beforeEach, ensuring a clean application
 * state independent of previous tests (page reload resets all React state).
 */

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  // Wait until the page is fully loaded and products are visible.
  await expect(
    page.getByTestId('add-to-cart-classic-notebook')
  ).toBeVisible()
})

// ══════════════════════════════════════════════════════════════
// Test Case 1 – Successful Checkout
// ══════════════════════════════════════════════════════════════
test('TC-01: Successful checkout with correct order confirmation', async ({
  page,
}) => {
  // Step 1 – Add Classic Notebook to cart.
  await page.getByTestId('add-to-cart-classic-notebook').click()

  // Step 2 – Enter customer name.
  await page.getByTestId('customer-name-input').fill('Riya Sharma')

  // Step 3 – Click Place Order.
  await page.getByTestId('place-order-btn').click()

  // Step 4 – Verify order confirmation is visible.
  const confirmation = page.getByTestId('order-confirmation')
  await expect(confirmation).toBeVisible()

  // Step 5 – Verify order reference is displayed and matches LC-XXXXXX format.
  const orderRef = page.getByTestId('order-ref')
  await expect(orderRef).toBeVisible()
  const refText = await orderRef.textContent()
  expect(refText).toMatch(/^LC-\d{6}$/)

  // Step 6 – Verify correct order total is displayed (₹120 for 1 notebook).
  const confirmationTotal = page.getByTestId('confirmation-total')
  await expect(confirmationTotal).toContainText('₹120')
})

// ══════════════════════════════════════════════════════════════
// Test Case 2 – Missing Required Field (Customer Name)
// ══════════════════════════════════════════════════════════════
test('TC-02: Checkout blocked when customer name is missing', async ({
  page,
}) => {
  // Step 1 – Add a product to cart (name field left empty).
  await page.getByTestId('add-to-cart-classic-notebook').click()

  // Step 2 – Click Place Order without entering a name.
  await page.getByTestId('place-order-btn').click()

  // Step 3 – Verify validation message for missing name is shown.
  const nameError = page.getByTestId('name-error')
  await expect(nameError).toBeVisible()
  await expect(nameError).toContainText('Please enter your name')

  // Step 4 – Verify no order confirmation appeared.
  await expect(page.getByTestId('order-confirmation')).not.toBeVisible()

  // Step 5 – Verify cart still contains the product (unchanged).
  await expect(page.getByTestId('cart-item-classic-notebook')).toBeVisible()
})

// ══════════════════════════════════════════════════════════════
// Test Case 3 – Quantity Changes and Total Calculation
// ══════════════════════════════════════════════════════════════
test('TC-03: Quantity controls update line totals and order total correctly', async ({
  page,
}) => {
  // ── Classic Notebook ──────────────────────────────────────
  // Step 1 – Add Classic Notebook.
  await page.getByTestId('add-to-cart-classic-notebook').click()

  // Step 2 – Increase quantity to 2.
  await page.getByTestId('qty-increase-classic-notebook').click()

  // Step 3 – Verify line total = ₹240 (₹120 × 2).
  const notebookLineTotal = page.getByTestId('line-total-classic-notebook')
  await expect(notebookLineTotal).toContainText('₹240')

  // ── Premium Pen Set ───────────────────────────────────────
  // Step 4 – Add Premium Pen Set.
  await page.getByTestId('add-to-cart-premium-pen-set').click()

  // Step 5 – Increase quantity to 2.
  await page.getByTestId('qty-increase-premium-pen-set').click()

  // Step 6 – Verify line total = ₹160 (₹80 × 2).
  const penLineTotal = page.getByTestId('line-total-premium-pen-set')
  await expect(penLineTotal).toContainText('₹160')

  // Step 7 – Verify order total = ₹400 (₹240 + ₹160).
  const orderTotal = page.getByTestId('order-total')
  await expect(orderTotal).toContainText('₹400')
})
