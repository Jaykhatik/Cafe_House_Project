import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../component/cartcontext";
import "../component/cssOfWebsiteComponent/Topbar.css";

function Topbar() {
  const { totalItems } = useCart();

  return (
    <div className="tm-topbar">
      <div className="container tm-topbar-inner">

        <div className="tm-topbar-left">
          📞 HelpLine No: <strong>1800-123-456</strong>
        </div>

        <div className="tm-topbar-center">
          <form className="tm-search-form">
            <input
              type="text"
              placeholder="Search for products..."
              className="tm-search-input"
            />
          </form>
        </div>

        <div className="tm-topbar-right">
          <NavLink to="/cart" className="tm-topbar-icon">
            <i className="fa fa-shopping-cart"></i>

            {totalItems > 0 && (
              <span className="tm-cart-badge">{totalItems}</span>
            )}
          </NavLink>

          <NavLink to="/profile" className="tm-topbar-icon">
            <i className="fa fa-user"></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
