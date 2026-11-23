import React from 'react'

function CustomerForm({ customerName, onChange, error }) {
  return (
    <div className="form-box">
      <div className="form-group">
        <label htmlFor="customer-name" className="form-label">
          Your Name <span className="required-star" aria-hidden="true">*</span>
        </label>
        <input
          id="customer-name"
          type="text"
          className={`form-input${error ? ' has-error' : ''}`}
          placeholder="Enter your full name"
          value={customerName}
          onChange={(e) => onChange(e.target.value)}
          aria-required="true"
          aria-describedby={error ? 'name-error' : undefined}
          data-testid="customer-name-input"
          autoComplete="name"
        />
        {error && (
          <span
            id="name-error"
            className="error-message"
            role="alert"
            data-testid="name-error"
          >
            ⚠ {error}
          </span>
        )}
      </div>
    </div>
  )
}

export default CustomerForm
