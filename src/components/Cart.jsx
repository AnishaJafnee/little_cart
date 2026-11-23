import React from 'react'
import { formatPrice } from './ProductCard'

function Cart({ cartItems, onIncrease, onDecrease, onRemove }) {
  const orderTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (cartItems.length === 0) {
    return (
      <div className="cart-box">
        <div className="cart-empty" data-testid="cart-empty-message">
          <span className="cart-empty-icon" aria-hidden="true">🛒</span>
          Your cart is empty. Add a product above to get started.
        </div>
      </div>
    )
  }

  return (
    <div className="cart-box">
      <table className="cart-table" aria-label="Shopping cart">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Quantity</th>
            <th scope="col" className="align-right">Line Total</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            const lineTotal = item.price * item.quantity
            return (
              <tr key={item.id} data-testid={`cart-item-${item.id}`}>
                <td>{item.name}</td>
                <td>{formatPrice(item.price)}</td>
                <td>
                  <div className="qty-controls">
                    <button
                      className="btn-qty"
                      onClick={() => onDecrease(item.id)}
                      aria-label={`Decrease quantity of ${item.name}`}
                      data-testid={`qty-decrease-${item.id}`}
                    >
                      −
                    </button>
                    <span
                      className="qty-value"
                      data-testid={`qty-value-${item.id}`}
                      aria-label={`Quantity of ${item.name}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      className="btn-qty"
                      onClick={() => onIncrease(item.id)}
                      aria-label={`Increase quantity of ${item.name}`}
                      data-testid={`qty-increase-${item.id}`}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td
                  className="align-right"
                  data-testid={`line-total-${item.id}`}
                >
                  {formatPrice(lineTotal)}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    data-testid={`remove-${item.id}`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="cart-footer">
        <span className="cart-total-label">Order Total:</span>
        <span
          className="cart-total-amount"
          data-testid="order-total"
        >
          {formatPrice(orderTotal)}
        </span>
      </div>
    </div>
  )
}

export default Cart
