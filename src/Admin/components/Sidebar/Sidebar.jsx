import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

import { useState } from "react";
import logo from "../Sidebar/logo.png";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminEmail");
    navigate("/admin-login", { replace: true });
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div>
        {/* ===== HEADER ===== */}
        <div className="sidebar-header">
          <div className="icon-box">
            <img src={logo} alt="Cafe House" />
          </div>

          <div className="brand-text">
            <h5>Cafe House</h5>
            <small>Admin Panel</small>
          </div>

          {/* 🔽 TOGGLE BUTTON */}
          <button
            className="sidebar-toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"}`}></i>
          </button>
        </div>

        <hr className="sidebar-divider" />

        {/* ===== MENU ===== */}
        <ul className="nav flex-column list-unstyled">
          {[
            { to: "/admin/dashboard", icon: "bi-grid", label: "Dashboard" },
            { to: "/admin/menu", icon: "bi-cup-straw", label: "Menu Items" },
            { to: "/admin/orders", icon: "bi-receipt", label: "Orders" },
            { to: "/admin/employees", icon: "bi-people", label: "Employees" },
            { to: "/admin/customers", icon: "bi-person", label: "Customers" },
            { to: "/admin/inventory", icon: "bi-box", label: "Inventory" },
            { to: "/admin/categories", icon: "bi-tags", label: "Categories" },
            { to: "/admin/offers", icon: "bi-percent", label: "Offers" },
            { to: "/admin/reservations", icon: "bi-calendar-event", label: "Reservations" },
            { to: "/admin/settings", icon: "bi-gear", label: "Settings" }
          ].map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <i className={`bi ${item.icon}`}></i>
                <span>{item.label}</span>
                <span className="active-dot"></span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== LOGOUT ===== */}
      <div className="logout">
        <button className="logout-link" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
