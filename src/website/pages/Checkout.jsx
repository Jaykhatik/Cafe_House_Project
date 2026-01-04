import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../pages/cssOfWebsite/Checkout.css";

function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  // Sample cart summary data
  const cartItems = [
    { id: 1, name: "Espresso", quantity: 2, price: 150 },
    { id: 2, name: "Cappuccino", quantity: 1, price: 200 },
    { id: 3, name: "Blueberry Muffin", quantity: 3, price: 120 },
  ];

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully!");
  };

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-container">
        {/* ===== BILLING FORM ===== */}
        <div className="checkout-form-container">
          <h3>Billing Details</h3>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-inline">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ZIP</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
        </div>

        {/* ===== ORDER SUMMARY ===== */}
        <div className="checkout-summary-container">
          <h3>Order Summary</h3>
          <div className="checkout-summary-items">
            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="checkout-summary-totals">
            <p>Subtotal: ₹{subtotal}</p>
            <p>Tax (5%): ₹{tax}</p>
            <p className="checkout-total">Total: ₹{total}</p>
          </div>

          {/* Payment options */}
          <div className="payment-options">
            <h4>Payment Options</h4>
            <button className="payment-btn">Credit/Debit Card</button>
            <button className="payment-btn">UPI</button>
            <button className="payment-btn">Cash on Delivery</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
