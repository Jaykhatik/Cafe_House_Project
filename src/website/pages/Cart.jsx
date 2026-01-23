import React from "react";
import { useCart } from "../component/cartcontext";
import { useNavigate, NavLink } from "react-router-dom";
import "../pages/cssOfWebsite/Cart.css";

function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="tm-main-section" style={{ padding: "80px 0", textAlign: "center" }}>
        <h2>Your cart is empty ☕</h2>
        <NavLink to="/" className="tm-more-button" style={{ marginTop: "20px" }}>
          Go Back Home
        </NavLink>
      </div>
    );
  }

  return (
    <div className="tm-main-section detail-bg" style={{ padding: "60px 0" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>

        {/* ================= BREADCRUMB ================= */}
        <div className="detail-breadcrumb" style={{ marginBottom: "25px", color: "#888" }}>
          <NavLink to="/">Home</NavLink> / <span>Cart</span>
        </div>

        <h1 style={{ marginBottom: "30px", color: "#333" }}>Shopping Cart</h1>

        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>

          {/* ================= CART ITEMS ================= */}
          <div style={{ flex: "1 1 60%", display: "flex", flexDirection: "column", gap: "20px" }}>
            {cartItems.map(item => (
              <div key={item.id} style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                padding: "15px",
                borderRadius: "18px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
              }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "12px" }}
                />
                <div style={{ flex: 1, marginLeft: "20px" }}>
                  <h3 style={{ marginBottom: "5px" }}>{item.name}</h3>
                  <p style={{ color: "#c79a2b", fontWeight: "bold" }}>₹{item.price}</p>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                    <button
                      style={{ padding: "4px 10px", borderRadius: "6px", cursor: "pointer" }}
                      onClick={() => decreaseQty(item.id)}
                    >-</button>
                    <span>{item.quantity}</span>
                    <button
                      style={{ padding: "4px 10px", borderRadius: "6px", cursor: "pointer" }}
                      onClick={() => increaseQty(item.id)}
                    >+</button>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p style={{ fontWeight: "bold" }}>₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ff4d4f",
                      fontSize: "18px",
                      cursor: "pointer"
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ================= SUMMARY ================= */}
          <div style={{
            flex: "1 1 35%",
            background: "#fff",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            height: "fit-content"
          }}>
            <h2 style={{ marginBottom: "20px" }}>Order Summary</h2>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <span>Total</span>
              <span style={{ fontWeight: "bold", color: "#c79a2b" }}>₹{subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                const loggedCustomerId = sessionStorage.getItem("userId");
                if (!loggedCustomerId) {
                  navigate("/authentication", {
                    replace: true,
                    state: { forceCheckout: true } // <-- Pass this flag
                  });
                } else {
                  navigate("/checkout");
                }
              }}
              style={{
                width: "100%",
                padding: "15px 0",
                background: "#c79a2b",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "30px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseOver={e => e.target.style.background = "#b38720"}
              onMouseOut={e => e.target.style.background = "#c79a2b"}
            >
              Proceed to Checkout
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Cart;
