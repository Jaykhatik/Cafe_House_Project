import React, { useState } from "react";
import { useCart } from "../component/cartcontext";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";



function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const isSubmitting = useRef(false);


  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // const customerId = Date.now().toString();
  // const orderId = `ORD-${Date.now()}`;
  const discount = subtotal > 50 ? 10 : 0;
  const total = subtotal - discount;
  const saveCustomer = async () => {
    const res = await axios.post("http://localhost:3002/customers", {
      name: customer.name,
      initials: customer.name ? customer.name.charAt(0).toUpperCase() : "",
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      loyalty: "Bronze",
      lastVisit: new Date().toISOString().split("T")[0],
    });

    return res.data.id; // 👈 IMPORTANT
  };

const saveOrder = async (customerId) => {
  const res = await axios.post("http://localhost:3002/orders", {
    customerId,
    totalAmount: total,
    status: "pending",
    date: new Date().toLocaleString(),
    items: cartItems.map(item => ({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });

  return res.data.id; // backend order id
};


const handlePlaceOrder = async () => {
  if (isSubmitting.current) return; // ✅ STOP double submit
  isSubmitting.current = true;

  if (!customer.name || !customer.phone) {
    alert("Please fill customer details");
    isSubmitting.current = false;
    return;
  }

  try {
    const savedCustomerId = await saveCustomer();
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
           <p><b>Order ID:</b> Will be generated after placing order</p>

            <div>
              <h3>Customer Details</h3>

              <input
                placeholder="Full Name"
                value={customer.name}
                onChange={e => setCustomer({ ...customer, name: e.target.value })}
              />

              <input
                placeholder="Email"
                value={customer.email}
                onChange={e => setCustomer({ ...customer, email: e.target.value })}
              />

              <input
                placeholder="Phone"
                value={customer.phone}
                onChange={e => setCustomer({ ...customer, phone: e.target.value })}
              />

              <textarea
                placeholder="Address"
                value={customer.address}
                onChange={e => setCustomer({ ...customer, address: e.target.value })}
              />
            </div>

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
