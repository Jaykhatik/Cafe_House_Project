import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    // Example: cartItems comes from your state or context
    // You can replace this with your actual cart state
    const cartItems = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
        { id: 3, quantity: 3 },
    ];

    // Calculate total items in cart
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            {/* ===== TOPBAR ===== */}
            <div className="tm-topbar">
                <div className="container tm-topbar-inner">
                    {/* Left: Toll Free */}
                    <div className="tm-topbar-left">
                        <span className="tm-tollfree">
                            📞 HelpLine No: <strong>1800-123-456</strong>
                        </span>
                    </div>

                    {/* Center: Search Bar */}
                    <div className="tm-topbar-center">
                        <form className="tm-search-form">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="tm-search-input"
                            />
                            <button type="submit" className="tm-search-button">
                                <i className="fa fa-search"></i>
                            </button>
                        </form>
                    </div>

                    {/* Right: Cart & Profile */}
                    <div className="tm-topbar-right">
                        <NavLink
                            to="/cart"
                            className={({ isActive }) =>
                                isActive || window.location.pathname.startsWith("/cart/checkout")
                                    ? "active-link tm-topbar-icon"
                                    : "tm-topbar-icon"
                            }
                        >
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

            <header className="tm-top-header">
                <div className="container">
                    <div className="row">
                        <div className="tm-top-header-inner">
                            {/* LOGO */}
                            <div className="tm-logo-container">
                                <img
                                    src="/img/logo.png"
                                    alt="Cafe House Logo"
                                    className="tm-site-logo"
                                />
                                <h1 className="tm-site-name tm-handwriting-font">
                                    Cafe House
                                </h1>
                            </div>

                            {/* MOBILE ICON */}
                            <div className="mobile-menu-icon">
                                <i className="fa fa-bars" />
                            </div>

                            {/* NAVIGATION */}
                            <nav className="tm-nav">
                                <ul>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={({ isActive }) => isActive ? "active" : ""}
                                        >
                                            Home
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/today_special"
                                            className={({ isActive }) => isActive ? "active" : ""}
                                        >
                                            Today Special
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/menu"
                                            className={({ isActive }) => isActive ? "active" : ""}
                                        >
                                            Menu
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/contact"
                                            className={({ isActive }) => isActive ? "active" : ""}
                                        >
                                            Contact
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/cart"
                                            className={({ isActive }) =>
                                                isActive || window.location.pathname.startsWith("/cart/checkout")
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            Cart
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
