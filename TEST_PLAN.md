# LittleCart – Test Plan

> **Project:** LittleCart – Mini Checkout and Browser Test Suite  
> **Version:** 1.0  
> **Prepared by:** Hackathon Team  
> **Test Types:** Automated (Playwright) + Manual  
> **Tools:** Playwright, Chromium  

---

## Test Environment

| Item | Detail |
|---|---|
| OS | Windows 11 |
| Browser | Chromium (via Playwright) |
| Application URL | http://localhost:5173 |
| Node.js | 18+ |
| Playwright version | ^1.44.0 |

---

## Test Cases

### Automated Tests

---

#### TC-01: Successful Checkout

| Field | Detail |
|---|---|
| **Test ID** | TC-01 |
| **Type** | Automated (Playwright) |
| **Test Scenario** | A customer adds a product, enters their name, and places an order successfully. |
| **Preconditions** | Application is running on localhost:5173. Browser is at a clean state (fresh page load). |
| **Test Steps** | 1. Navigate to `/`. 2. Click "Add to Cart" for Classic Notebook. 3. Enter `Riya Sharma` in the Customer Name field. 4. Click "Place Order". |
| **Expected Result** | Order confirmation box is visible. Order reference matches pattern `LC-XXXXXX`. Order total displays ₹120. |
| **Actual Result** | Order confirmation appeared with a valid `LC-XXXXXX` reference and ₹120 total. |
| **Status** | ✅ PASS |

---

#### TC-02: Missing Required Field

| Field | Detail |
|---|---|
| **Test ID** | TC-02 |
| **Type** | Automated (Playwright) |
| **Test Scenario** | A customer attempts to place an order without entering their name. |
| **Preconditions** | Application is running. Browser at clean state. |
| **Test Steps** | 1. Navigate to `/`. 2. Click "Add to Cart" for Classic Notebook. 3. Leave the Customer Name field empty. 4. Click "Place Order". |
| **Expected Result** | A validation message "Please enter your name" appears. No order confirmation is shown. Cart item remains visible. |
| **Actual Result** | Inline error message appeared under the name field. No confirmation shown. Cart unchanged. |
| **Status** | ✅ PASS |

---

#### TC-03: Quantity and Total Calculation

| Field | Detail |
|---|---|
| **Test ID** | TC-03 |
| **Type** | Automated (Playwright) |
| **Test Scenario** | Quantity controls update line totals and order total correctly. |
| **Preconditions** | Application is running. Browser at clean state. |
| **Test Steps** | 1. Navigate to `/`. 2. Add Classic Notebook. 3. Click + to increase quantity to 2. 4. Verify line total = ₹240. 5. Add Premium Pen Set. 6. Click + to increase quantity to 2. 7. Verify line total = ₹160. 8. Verify order total = ₹400. |
| **Expected Result** | Classic Notebook line total = ₹240. Premium Pen Set line total = ₹160. Order total = ₹400. |
| **Actual Result** | All line totals and order total matched expected values exactly. |
| **Status** | ✅ PASS |

---

### Manual Tests

---

#### MT-01: Empty Cart Validation

| Field | Detail |
|---|---|
| **Test ID** | MT-01 |
| **Type** | Manual |
| **Test Scenario** | A customer tries to place an order without adding any product. |
| **Preconditions** | Application is running. No products added to cart. |
| **Test Steps** | 1. Open the application. 2. Do not add any product. 3. Enter a customer name. 4. Click "Place Order". |
| **Expected Result** | Checkout is blocked. An empty-cart error message is displayed. No order confirmation appears. |
| **Actual Result** | A validation banner "Your cart is empty. Please add at least one product." appeared. No confirmation was generated. |
| **Status** | ✅ PASS |

---

#### MT-02: Rapid Double-Click Protection

| Field | Detail |
|---|---|
| **Test ID** | MT-02 |
| **Type** | Manual |
| **Test Scenario** | A customer rapidly double-clicks Place Order to test duplicate submission protection. |
| **Preconditions** | At least one product in cart, customer name entered. |
| **Test Steps** | 1. Add Classic Notebook to cart. 2. Enter customer name. 3. Rapidly double-click the "Place Order" button. |
| **Expected Result** | Only one order confirmation appears. Only one order reference is generated. The button is disabled immediately after the first click. |
| **Actual Result** | Only one confirmation appeared with a single LC-XXXXXX reference. The button was disabled on first click (shows "Placing Order…") and replaced by the confirmation, preventing any second submission. |
| **Status** | ✅ PASS |

---

## Summary

| Test ID | Scenario | Type | Status |
|---|---|---|---|
| TC-01 | Successful Checkout | Automated (Chromium + Firefox) | ✅ PASS |
| TC-02 | Missing Required Field | Automated (Chromium + Firefox) | ✅ PASS |
| TC-03 | Quantity and Total Calculation | Automated (Chromium + Firefox) | ✅ PASS |
| MT-01 | Empty Cart Validation | Manual | ✅ PASS |
| MT-02 | Rapid Double-Click Protection | Manual | ✅ PASS |

**Total Tests: 5 (run across 2 browsers = 6 automated runs) | Automated Passed: 6/6 | Manual: 2/2 | Failed: 0 | Blocked: 0**

**Cross-browser execution:**
```
Running 6 tests using 1 worker
  ok 1 [chromium] › TC-01 (14.1s)   ok 4 [firefox] › TC-01 (9.1s)
  ok 2 [chromium] › TC-02 (4.5s)    ok 5 [firefox] › TC-02 (5.6s)
  ok 3 [chromium] › TC-03 (1.9s)    ok 6 [firefox] › TC-03 (10.8s)
  6 passed (51.1s)
```

---

## Notes

- All automated tests use `data-testid` attributes and ARIA roles for reliable selectors.
- No `waitForTimeout()` is used anywhere. All waits are expectation-based.
- Each test navigates to `/` in `beforeEach` for a clean state.
- Screenshots are saved to `screenshots/` on failure.
- HTML test report is generated at `playwright-report/index.html`.
