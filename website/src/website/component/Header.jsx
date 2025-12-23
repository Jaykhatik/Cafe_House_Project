import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <>
            <div>
                {/* Preloader */}
                {/* <div id="loader-wrapper">
                    <div id="loader" />
                    <div className="loader-section section-left" />
                    <div className="loader-section section-right" />
                </div> */}
                {/* End Preloader */}
                <div className="tm-top-header">
                    <div className="container">
                        <div className="row">
                            <div className="tm-top-header-inner">
                                <div className="tm-logo-container">
                                    <img src="img/logo.png" alt="Logo" className="tm-site-logo" />
                                    <h1 className="tm-site-name tm-handwriting-font">Cafe House</h1>
                                </div>
                                <div className="mobile-menu-icon">
                                    <i className="fa fa-bars" />
                                </div>
                                <nav className="tm-nav">
                                    <ul>
                                        <li><NavLink to="/">Home</NavLink></li>
                                        <li><NavLink to="/today_special">Today Special</NavLink></li>
                                        <li><NavLink to="/menu">Menu</NavLink></li>
                                        <li><NavLink to="/Contact">Contact</NavLink></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header