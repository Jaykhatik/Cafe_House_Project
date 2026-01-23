import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../component/cartcontext";
import "../component/cssOfWebsiteComponent/Topbar.css";
import { useWishlist } from "../component/WhishlistContext";
import { useEffect, useState } from "react";



function Topbar() {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("token") === "user_logged_in"
  );

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(
        sessionStorage.getItem("token") === "user_logged_in"
      );
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);

    return () => window.removeEventListener("storage", syncAuth);
  }, []);



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



          {isLoggedIn && (
            <NavLink to="/profile" className="tm-topbar-icon">
              <i className="fa fa-user"></i>
            </NavLink>
          )}


          <NavLink to="/wishlist" className="tm-topbar-icon">
            ❤️
            {wishlist.length > 0 && (
              <span className="tm-cart-badge">{wishlist.length}</span>
            )}
          </NavLink>



        </div>
      </div>
    </div>
  );
}

export default Topbar;
