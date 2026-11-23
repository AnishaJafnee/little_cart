import React, { useState, useRef } from 'react'
import products from './data/products'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'
import CustomerForm from './components/CustomerForm'
import OrderConfirmation from './components/OrderConfirmation'

// generateOrderRef – creates a unique LC-XXXXXX reference.
function generateOrderRef() {
  const suffix = Math.floor(100000 + Math.random() * 900000)
  return `LC-${suffix}`
}

/*
 * Duplicate submission protection is implemented on the CLIENT SIDE.
 *
 * Strategy:
 *   1. `orderStatus` state: 'idle' | 'submitting' | 'confirmed'
 *   2. The Place Order button is disabled while status is 'submitting' or 'confirmed'.
 *   3. A React ref (`submittingRef`) is set synchronously before any async
 *      work begins, so rapid second clicks find it already true.
 *   4. Once 'confirmed', neither the button nor the handler can re-fire.
 *
 * Since there is no backend, this protection is entirely client-side.
 */

function App() {
  const [cart, setCart] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [errors, setErrors] = useState({})
  const [orderStatus, setOrderStatus] = useState('idle') // 'idle' | 'submitting' | 'confirmed'
  const [confirmedOrder, setConfirmedOrder] = useState(null)

  // Synchronous guard to block rapid double-clicks before React re-renders.
  const submittingRef = useRef(false)

  // ── Cart Operations ─────────────────────────────────────────

  function handleAddToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function handleIncrease(productId) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  function handleDecrease(productId) {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== productId) return item
        // Quantity cannot go below 1; use Remove button to delete.
        return { ...item, quantity: Math.max(1, item.quantity - 1) }
      })
    )
  }

  function handleRemove(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  // ── Validation ───────────────────────────────────────────────

  function validate() {
    const newErrors = {}

    if (cart.length === 0) {
      newErrors.cart = 'Your cart is empty. Please add at least one product.'
    }

    if (!customerName.trim()) {
      newErrors.name = 'Please enter your name to complete the order.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ── Place Order ──────────────────────────────────────────────

  function handlePlaceOrder() {
    // Block if already confirmed (order completed).
    if (orderStatus === 'confirmed') return

    // Synchronous double-click guard.
    if (submittingRef.current) return
    submittingRef.current = true

    setOrderStatus('submitting')

    // Validate before "processing".
    if (!validate()) {
      setOrderStatus('idle')
      submittingRef.current = false
      return
    }

    // Simulate minimal processing delay (represents async network call).
    // In a real app this would be an API call; here it's client-side only.
    setTimeout(() => {
      const orderTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      const orderRef = generateOrderRef()

      setConfirmedOrder({
        ref: orderRef,
        customerName: customerName.trim(),
        total: orderTotal,
      })

      setOrderStatus('confirmed')
      setErrors({})
      submittingRef.current = false
    }, 400)
  }

  const isButtonDisabled =
    orderStatus === 'submitting' || orderStatus === 'confirmed'

  const orderTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="app-wrapper">
      {/* ── Header ────────────────────────────────────── */}
      <header className="site-header">
        <h1>
          <span className="header-accent">Little</span>Cart
        </h1>
        <p>Simple online checkout — fast, easy, no fuss.</p>
      </header>

      {/* ── Products ──────────────────────────────────── */}
      <section className="products-section" aria-labelledby="products-heading">
        <h2 className="section-title" id="products-heading">
          Products
        </h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* ── Cart ──────────────────────────────────────── */}
      <section className="cart-section" aria-labelledby="cart-heading">
        <h2 className="section-title" id="cart-heading">
          Your Cart
        </h2>
        <Cart
          cartItems={cart}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
        />
      </section>

      {/* ── Customer Information ──────────────────────── */}
      {orderStatus !== 'confirmed' && (
        <section className="customer-section" aria-labelledby="customer-heading">
          <h2 className="section-title" id="customer-heading">
            Customer Information
          </h2>
          <CustomerForm
            customerName={customerName}
            onChange={(val) => {
              setCustomerName(val)
              if (errors.name) setErrors((e) => ({ ...e, name: undefined }))
            }}
            error={errors.name}
          />
        </section>
      )}

      {/* ── Validation Banner ─────────────────────────── */}
      {errors.cart && (
        <div
          className="validation-banner"
          role="alert"
          data-testid="cart-error"
        >
          ⚠ {errors.cart}
        </div>
      )}

      {/* ── Place Order ───────────────────────────────── */}
      {orderStatus !== 'confirmed' && (
        <section className="place-order-section">
          <button
            className="btn btn-primary"
            onClick={handlePlaceOrder}
            disabled={isButtonDisabled}
            data-testid="place-order-btn"
            aria-label="Place order"
          >
            {orderStatus === 'submitting' ? 'Placing Order…' : 'Place Order'}
          </button>
        </section>
      )}

      {/* ── Order Confirmation ────────────────────────── */}
      {orderStatus === 'confirmed' && confirmedOrder && (
        <section aria-labelledby="confirmation-heading">
          <h2 className="section-title" id="confirmation-heading">
            Order Confirmation
          </h2>
          <OrderConfirmation
            orderRef={confirmedOrder.ref}
            customerName={confirmedOrder.customerName}
            orderTotal={confirmedOrder.total}
          />
        </section>
      )}

      {/* ── Footer ────────────────────────────────────── */}
      <footer className="site-footer">
        <p>
          LittleCart &copy; {new Date().getFullYear()} &mdash; Hackathon Demo
          Project. No real payments processed.
        </p>
      </footer>
    </div>
  )
}

export default App
