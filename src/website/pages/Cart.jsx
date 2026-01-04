import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../pages/cssOfWebsite/Cart.css";

function Cart() {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Espresso",
      description: "Strong and bold coffee shot",
      price: 150,
      quantity: 2,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Cappuccino",
      description: "Espresso with steamed milk and foam",
      price: 200,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "Blueberry Muffin",
      description: "Soft muffin with fresh blueberries",
      price: 120,
      quantity: 3,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 4,
      name: "Latte",
      description: "Creamy coffee with steamed milk",
      price: 180,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 5,
      name: "Chocolate Cake Slice",
      description: "Rich chocolate cake with layers",
      price: 250,
      quantity: 2,
      image: "https://via.placeholder.com/80",
    },
  ]);

  // Update quantity
  const updateQuantity = (id, value) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + value) } : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + tax;

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <NavLink to="/" className="back-home-btn">
            Go Back to Shop
          </NavLink>
        </div>
      ) : (
        <>
          <div className="cart-table">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-desc">{item.description}</p>
                  <p>Price: ₹{item.price}</p>
                  <div className="cart-quantity">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <div className="cart-item-remove">
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Subtotal: ₹{subtotal}</p>
            <p>Tax (5%): ₹{tax}</p>
            <p className="cart-total">Total: ₹{total}</p>
            <NavLink to="/cart/checkout" className="checkout-btn">
              Proceed to Checkout
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
