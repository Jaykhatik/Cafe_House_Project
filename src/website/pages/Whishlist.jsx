import React from "react";
import { useWishlist } from "../component/WhishlistContext";
import { useCart } from "../component/cartcontext";
import { NavLink } from "react-router-dom";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div style={{ padding: "80px", textAlign: "center" }}>
        <h2>Your Wishlist is empty ❤️</h2>
        <NavLink to="/menu">Browse Menu</NavLink>
      </div>
    );
  }

  return (
    <div className="tm-main-section" style={{ padding: "60px 0" }}>
      <div className="container">
        <h2 style={{ marginBottom: "30px" }}>My Wishlist</h2>

        {wishlist.map(item => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              background: "#fff",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "15px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)"
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "90px", borderRadius: "10px" }}
            />

            <div style={{ flex: 1 }}>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>

            <button onClick={() => addToCart(item)}>
              Add to Cart
            </button>

            <button
              onClick={() => removeFromWishlist(item.id)}
              style={{ color: "red", border: "none", background: "none" }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
