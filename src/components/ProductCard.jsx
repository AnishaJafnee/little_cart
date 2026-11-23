import React from 'react'

// formatPrice – formats a number as Indian Rupees
export function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount)
}

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card" data-testid={`product-card-${product.id}`}>
      <div className="product-illustration" aria-hidden="true">
        {product.emoji}
      </div>

      <h2 className="product-name">{product.name}</h2>
      <p className="product-desc">{product.description}</p>
      <p className="product-price" data-testid={`product-price-${product.id}`}>
        {formatPrice(product.price)}
      </p>

      <button
        className="btn btn-primary"
        onClick={() => onAddToCart(product)}
        data-testid={`add-to-cart-${product.id}`}
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
