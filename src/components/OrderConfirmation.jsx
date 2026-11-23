import React from 'react'
import { formatPrice } from './ProductCard'

function OrderConfirmation({ orderRef, customerName, orderTotal }) {
  return (
    <div
      className="confirmation-box"
      role="region"
      aria-label="Order confirmation"
      data-testid="order-confirmation"
    >
      <div className="confirmation-title">
        <span aria-hidden="true">✅</span>
        Order placed successfully!
      </div>

      <p className="confirmation-detail">
        <strong>Name:</strong> {customerName}
      </p>
      <p className="confirmation-detail">
        <strong>Order Reference:</strong>{' '}
        <span className="confirmation-ref" data-testid="order-ref">
          {orderRef}
        </span>
      </p>
      <p
        className="confirmation-detail"
        data-testid="confirmation-total"
      >
        <strong>Order Total:</strong> {formatPrice(orderTotal)}
      </p>

      <p className="confirmation-thanks">
        Thank you for shopping with LittleCart.
      </p>
    </div>
  )
}

export default OrderConfirmation
