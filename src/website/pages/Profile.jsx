import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WhishlistContext";
import { useCart } from "../../context/cartcontext";
import { useAuth } from "../../context/AuthContext"; // adjust path


import "../pages/cssOfWebsite/profile.css";

function Profile() {
  const [activeSection, setActiveSection] = useState("profile");
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const { wishlist, removeFromWishlist } = useWishlist();

  const { addToCart } = useCart();

  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/150");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const customerId = sessionStorage.getItem("userId");

    if (!customerId || sessionStorage.getItem("token") !== "user_logged_in") {
      navigate("/authentication", { replace: true });
    }
    // Fetch customer
    axios
      .get(`http://localhost:3002/customers/${customerId}`)
      .then((res) => setCustomer(res.data))
      .catch(() => navigate("/authentication", { replace: true }));

    // Fetch orders
    axios
      .get("http://localhost:3002/orders")
      .then((res) => {
        const userOrders = res.data.filter(
          (o) => o.customerId === customerId
        );
        setOrders(userOrders);
      });
  }, [navigate]);

  // Trigger file input
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };
  const { logout } = useAuth();

  return (
    <div className="tm-profile-page">
      <div className="tm-profile-wrapper">

        {/* ========== SIDEBAR ========== */}
        <aside className="tm-profile-sidebar">
          <div className="tm-profile-user">

            <div className="tm-profile-avatar">
              <img src={profileImage} alt="profile" />

              {/* CAMERA BUTTON */}
              <span
                className="tm-avatar-upload"
                onClick={handleAvatarClick}
              >
                📷
              </span>

              {/* HIDDEN FILE INPUT */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>

            <h3>{customer?.name}</h3>
            <p>{customer?.email}</p>


            <div className="tm-profile-stats">
              <div>
                <strong>{customer?.orderCount || orders.length}</strong>
                <span>Orders</span>
              </div>
              <div>
                <strong>{wishlist.length}</strong>
                <span>Wishlist</span>
              </div>
            </div>
          </div>

          <nav className="tm-profile-menu">
            <button
              className={activeSection === "profile" ? "active" : ""}
              onClick={() => setActiveSection("profile")}
            >
              👤 Profile
            </button>

            <button
              className={activeSection === "orders" ? "active" : ""}
              onClick={() => setActiveSection("orders")}
            >
              📦 Orders
            </button>

            <button
              className={activeSection === "wishlist" ? "active" : ""}
              onClick={() => setActiveSection("wishlist")}
            >
              ❤️ Wishlist
            </button>

            <button
              className={activeSection === "settings" ? "active" : ""}
              onClick={() => setActiveSection("settings")}
            >
              ⚙️ Settings
            </button>
          </nav>

          <button
            className="tm-logout-btn"
            onClick={() => {
              logout(); // clears token and updates state
              navigate("/authentication");
            }}
          >
            🚪 Logout
          </button>


        </aside>

        {/* ========== CONTENT ========== */}
        <section className="tm-profile-content">
          {activeSection === "profile" && (
            <div className="tm-profile-card fade-in">
              <h2>Personal Information</h2>

              <div className="tm-profile-form">
                <div>
                  <label>First Name</label>
                  <input type="text" value={customer?.name} />
                </div>

                <div>
                  <label>Email Address</label>
                  <input type="email" value={customer?.email} disabled />
                </div>

                <div>
                  <label>Phone Number</label>
                  <input type="tel" value={customer?.phone} />
                </div>
              </div>

              <div className="tm-profile-actions">
                <button className="primary">Save Changes</button>
                <button className="secondary">Cancel</button>
              </div>
            </div>
          )}
          {activeSection === "orders" && (
            <div className="tm-profile-card fade-in">
              <h2>My Orders</h2>

              {orders.length === 0 ? (
                <p>No orders found</p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      border: "1px solid #eee",
                      padding: "12px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Date:</strong> {order.date}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                    <button
                      onClick={() => navigate(`/orderdetails/${order.id}`)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#000",
                        color: "#f0ad4e",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "8px",
                      }}
                    >
                      View Details
                    </button>


                  </div>
                ))
              )}
            </div>
          )}
          {activeSection === "wishlist" && (
            <div className="tm-profile-card fade-in">
              <h2>My Wishlist ❤️</h2>

              {wishlist.length === 0 ? (
                <p>No items in wishlist</p>
              ) : (
                wishlist.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      padding: "12px",
                      border: "1px solid #eee",
                      borderRadius: "10px",
                      marginBottom: "10px"
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "70px", borderRadius: "8px" }}
                    />

                    <div style={{ flex: 1 }}>
                      <h4>{item.name}</h4>
                      <p>₹{item.price}</p>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        background: "#c79a2b",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px"
                      }}
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "red",
                        fontSize: "18px"
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

        </section>
      </div>
    </div>
  );
}

export default Profile;
