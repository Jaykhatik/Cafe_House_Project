import React, { useState } from "react";
import { useCart } from "../component/cartcontext";
import { useNavigate, NavLink } from "react-router-dom";

function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, City, Country",
  });

  const orderId = `ORD-${Date.now()}`;
  const discount = subtotal > 50 ? 10 : 0;
  const total = subtotal - discount;

  const handlePlaceOrder = () => {
    alert(`Order ${orderId} placed successfully!`);
    clearCart();
    navigate("/");
  };

  if (cartItems.length === 0)
    return (
      <div className="tm-main-section" style={{ padding: "50px 0", textAlign: "center" }}>
        <h2>Your Cart is Empty</h2>
        <NavLink to="/" className="tm-more-button">Go Back Home</NavLink>
      </div>
    );

  return (
    <div className="tm-main-section detail-bg" style={{ padding: "60px 0" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>

        {/* ================= BREADCRUMB ================= */}
        <div className="detail-breadcrumb" style={{ marginBottom: "20px", color: "#888" }}>
          <NavLink to="/">Home</NavLink> / <NavLink to="/cart">Cart</NavLink> / <span>Checkout</span>
        </div>

        {/* ================= SINGLE CARD ================= */}
        <div style={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "30px"
        }}>
          
          {/* ORDER ID + CUSTOMER INFO */}
          <div style={{ borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
            <h2 style={{ color: "#c79a2b", marginBottom: "10px" }}>Checkout</h2>
            <p><b>Order ID:</b> {orderId}</p>
            <p><b>Name:</b> {customer.name}</p>
            <p><b>Email:</b> {customer.email}</p>
            <p><b>Phone:</b> {customer.phone}</p>
            <p><b>Address:</b> {customer.address}</p>
          </div>

          {/* CART ITEMS */}
          <div>
            <h3 style={{ marginBottom: "15px" }}>Order Items</h3>
            {cartItems.map(item => (
              <div key={item.id} style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "15px",
                background: "#fafafa"
              }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "12px" }}
                />
                <div style={{ flex: 1 }}>
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  {item.discount && <p>Discount: ${item.discount}</p>}
                  <p><b>Total: ${(item.price * item.quantity - (item.discount || 0)).toFixed(2)}</b></p>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY + PLACE ORDER */}
          <div style={{
            borderTop: "1px solid #eee",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px"
          }}>
            <div>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Discount: ${discount.toFixed(2)}</p>
              <h3 style={{ color: "#c79a2b" }}>Total: ${total.toFixed(2)}</h3>
            </div>

            <button
              onClick={handlePlaceOrder}
              style={{
                padding: "16px 35px",
                background: "#c79a2b",
                color: "#fff",
                border: "none",
                borderRadius: "30px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseOver={e => e.target.style.background = "#b38720"}
              onMouseOut={e => e.target.style.background = "#c79a2b"}
            >
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;
