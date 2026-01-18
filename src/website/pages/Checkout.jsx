import React, { useState, useRef } from "react";
import { useCart } from "../component/cartcontext";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import "../pages/cssOfWebsite/Checkout.css"; // Import your CSS

function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const isSubmitting = useRef(false);

  // ===== STATES =====
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const discount = subtotal > 50 ? 10 : 0;
  const total = subtotal - discount;

  // ===== SAVE CUSTOMER =====
  const saveCustomer = async () => {
    const rawId = Date.now().toString();
    const customerId = `CUSTOMER_${rawId}`;

    const res = await axios.post("http://localhost:3002/customers", {
      id: customerId,
      name: customer.name,
      initials: customer.name ? customer.name.charAt(0).toUpperCase() : "",
      email: customer.email,
      phone: customer.phone,
      address: shipping.address,
      loyalty: "Bronze",
      lastVisit: new Date().toISOString().split("T")[0],
    });

    return res.data.id;
  };

  // ===== SAVE ORDER =====
  const saveOrder = async (customerId) => {
    const rawId = Date.now().toString();
    const orderId = `ORDER_${rawId}`;

    const res = await axios.post("http://localhost:3002/orders", {
      id: orderId,
      customerId,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
      shippingAddress: {
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        zip: shipping.zip,
        country: shipping.country,
      },
      payment: {
        method: paymentMethod,
        status: "Pending",
      },
      items: cartItems.map((item) => ({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: total,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    });

    return res.data.id;
  };

  // ===== FIND EXISTING CUSTOMER =====
  const findExistingCustomer = async (email) => {
    const res = await axios.get("http://localhost:3002/customers");
    return res.data.find((c) => c.email.toLowerCase() === email.toLowerCase());
  };

  // ===== HANDLE PLACE ORDER =====
  const handlePlaceOrder = async () => {
    if (isSubmitting.current) return;
    isSubmitting.current = true;

    if (!customer.name || !customer.phone || !shipping.address) {
      alert("Please fill all required details");
      isSubmitting.current = false;
      return;
    }

    try {
      const existingCustomer = await findExistingCustomer(customer.email);
      let savedCustomerId;

      if (existingCustomer) {
        savedCustomerId = existingCustomer.id;
      } else {
        savedCustomerId = await saveCustomer();
      }

      const savedOrderId = await saveOrder(savedCustomerId);

      clearCart();
      navigate("/", { replace: true });

      alert(`Order ${savedOrderId} placed successfully!`);
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong while placing order");
    } finally {
      isSubmitting.current = false;
    }
  };

  // ===== EMPTY CART =====
  if (cartItems.length === 0)
    return (
      <div className="checkout-empty">
        <h2>Your Cart is Empty</h2>
        <NavLink to="/" className="tm-more-button">
          Go Back Home
        </NavLink>
      </div>
    );

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>
      {/* ================= BREADCRUMB ================= */}
      <div className="detail-breadcrumb" style={{ marginBottom: "20px", color: "#888" }}>
        <NavLink to="/">Home</NavLink> / <NavLink to="/cart">Cart</NavLink> / <span>Checkout</span>
      </div>
      <div className="checkout-container">
        {/* ===== CUSTOMER + SHIPPING + PAYMENT FORM ===== */}
        <div className="checkout-form-container checkout-form">
          <h3>Customer Details</h3>
          <div className="form-group">
            <input
              placeholder="Full Name"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Email"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Phone"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            />
          </div>

          <h3>Shipping Address</h3>
          <div className="form-group">
            <textarea
              placeholder="Full Address"
              value={shipping.address}
              onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
            />
          </div>
          <div className="form-group form-group-inline">
            <input
              placeholder="City"
              value={shipping.city}
              onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
            />
            <input
              placeholder="State"
              value={shipping.state}
              onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
            />
          </div>
          <div className="form-group form-group-inline">
            <input
              placeholder="ZIP Code"
              value={shipping.zip}
              onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
            />
            <input
              placeholder="Country"
              value={shipping.country}
              onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
            />
          </div>

          <h3>Payment Method</h3>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="payment-options"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
          </select>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>

        {/* ===== CART ITEMS + SUMMARY ===== */}
        <div className="checkout-summary-container">
          <h3>Order Items</h3>
          <div className="checkout-summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "60px", height: "60px", borderRadius: "10px", objectFit: "cover" }}
                  />
                  <div>
                    <h4 style={{ margin: 0 }}>{item.name}</h4>
                    <p style={{ margin: 0 }}>Qty: {item.quantity}</p>
                  </div>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="checkout-summary-totals">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Discount: ${discount.toFixed(2)}</p>
            <p className="checkout-total">Total: ${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
