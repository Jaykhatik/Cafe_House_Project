import React, { useState } from "react";
import "../pages/cssOfWebsite/profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [activeSection, setActiveSection] = useState("info");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="tm-profile-page">
      <div className="tm-profile-card">

        {/* SIDEBAR */}
        <aside className="tm-profile-sidebar">
          <div className="tm-profile-user">
            <div className="tm-avatar">JD</div>
            <h4>John Doe</h4>
            <p>john@example.com</p>
          </div>

          <nav className="tm-profile-menu">
            <button
              className={activeSection === "info" ? "active" : ""}
              onClick={() => setActiveSection("info")}
            >
              👤 My Info
            </button>

            <button
              className={activeSection === "orders" ? "active" : ""}
              onClick={() => setActiveSection("orders")}
            >
              📦 My Orders
            </button>

            <button
              className={activeSection === "settings" ? "active" : ""}
              onClick={() => setActiveSection("settings")}
            >
              ⚙️ Settings
            </button>
          </nav>

          <button className="tm-logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </aside>

        {/* CONTENT */}
        <section className="tm-profile-content">
          {activeSection === "info" && (
            <div className="tm-profile-section fade-in">
              <h2>My Information</h2>
              <div className="tm-info-grid">
                <div><span>Name</span><p>John Doe</p></div>
                <div><span>Email</span><p>john@example.com</p></div>
                <div><span>Phone</span><p>9876543210</p></div>
              </div>
            </div>
          )}

          {activeSection === "orders" && (
            <div className="tm-profile-section fade-in">
              <h2>My Orders</h2>
              <div className="tm-empty">
                <p>No orders yet.</p>
              </div>
            </div>
          )}

          {activeSection === "settings" && (
            <div className="tm-profile-section fade-in">
              <h2>Account Settings</h2>
              <p>Manage password, address, and preferences.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default Profile;
