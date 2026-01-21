import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <>
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
                                            className={
                                                location.pathname === "/" ||
                                                    location.pathname.startsWith("/menuitem")
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            Home
                                        </NavLink>

                                    </li>

                                    <li>
                                        <NavLink
                                            to="/about"
                                            className={({ isActive }) => isActive ? "active" : ""}
                                        >
                                            About
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
                                    {!isLoggedIn && (
                                        <li>
                                            <NavLink
                                                to="/authentication"
                                                className={({ isActive }) => isActive ? "active" : ""}
                                            >
                                                Login
                                            </NavLink>
                                        </li>
                                    )}


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
