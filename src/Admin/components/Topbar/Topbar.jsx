import "./Topbar.css";
import image1 from "../Topbar/2.jpg";
import { useLocation } from "react-router-dom";

function Topbar({ title }) {
  const location = useLocation();

  const pageTitles = {
    "/admin/dashboard": "Dashboard",
    "/admin/menu": "Menu Items",
    "/admin/orders": "Orders",
    "/admin/employees": "Employees",
    "/admin/customers": "Customers",
    "/admin/inventory": "Inventory",
    "/admin/categories": "Categories",
    "/admin/offers": "Offers",
    "/admin/reservations": "Reservations",
    "/admin/reports": "Reports",
    "/admin/settings": "Settings",
  };

  const dynamicTitle = pageTitles[location.pathname] || title || "Admin Panel";

  return (
    <nav className="admin-topbar">
      <h4 className="topbar-title">{dynamicTitle}</h4>

      <div className="topbar-right">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Search..." />
        </div>

        <div className="notif">
          <i className="bi bi-bell"></i>
          <span className="notif-badge">3</span>
        </div>

        <div className="user">
          <div className="user-circle">
            <img src={image1} alt="User" />
          </div>
          <div className="user-info">
            <p className="user-name">Admin User</p>
            <small className="user-email">JK@cafehouse.com</small>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
