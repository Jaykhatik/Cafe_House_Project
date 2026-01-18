import React, { useState, useRef } from "react";
import "../pages/cssOfWebsite/profile.css";

function Profile() {
  const [activeSection, setActiveSection] = useState("profile");
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/150");
  const fileInputRef = useRef(null);

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

            <h3>jay</h3>
            <p>jk@gmail.com</p>

            <div className="tm-profile-stats">
              <div>
                <strong>0</strong>
                <span>Orders</span>
              </div>
              <div>
                <strong>0</strong>
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

          <button className="tm-logout-btn">🚪 Logout</button>
        </aside>

        {/* ========== CONTENT ========== */}
        <section className="tm-profile-content">
          {activeSection === "profile" && (
            <div className="tm-profile-card fade-in">
              <h2>Personal Information</h2>

              <div className="tm-profile-form">
                <div>
                  <label>First Name</label>
                  <input type="text" value="jay" disabled />
                </div>

                <div>
                  <label>Last Name</label>
                  <input type="text" placeholder="Enter your last name" />
                </div>

                <div>
                  <label>Email Address</label>
                  <input type="email" value="jk@gmail.com" disabled />
                </div>

                <div>
                  <label>Phone Number</label>
                  <input type="text" />
                </div>
              </div>

              <div className="tm-profile-actions">
                <button className="primary">Save Changes</button>
                <button className="secondary">Cancel</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Profile;
