import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Index() {
    const [popularItems, setPopularItems] = useState([]);

    // ================= FETCH POPULAR ITEMS =================
    const fetchPopularItems = async () => {
        try {
            const response = await axios.get("http://localhost:3002/menuItems");

            // ✅ Popular items = isSpecial === true
            const specialItems = response.data.filter(
                item => item.isSpecial === true
            );

            setPopularItems(specialItems);
        } catch (error) {
            console.error("Error fetching menu items", error);
        }
    };

    useEffect(() => {
        fetchPopularItems();
    }, []);

    return (
        <>
            <div>

                {/* ================= WELCOME SECTION ================= */}
                <section className="tm-welcome-section">
                    <div className="container tm-position-relative">
                        <div className="tm-lights-container">
                            <img src="../img/light.png" alt="Light" className="light light-1" />
                            <img src="img/light.png" alt="Light" className="light light-2" />
                            <img src="img/light.png" alt="Light" className="light light-3" />
                        </div>

                        <div className="row tm-welcome-content">
                            <h2 className="white-text tm-handwriting-font tm-welcome-header">
                                <img src="img/header-line.png" alt="Line" className="tm-header-line" />
                                &nbsp;Welcome To&nbsp;&nbsp;
                                <img src="img/header-line.png" alt="Line" className="tm-header-line" />
                            </h2>

                            <h2 className="gold-text tm-welcome-header-2">Cafe House</h2>

                            <p className="gray-text tm-welcome-description">
                                Step inside <span className="gold-text">Cafe House</span> — where great taste,
                                cozy ambience, and handcrafted flavors come together.
                            </p>

                            <a href="#main" className="tm-more-button tm-more-button-welcome">
                                Explore More
                            </a>
                        </div>

                        <img src="img/table-set.png" alt="Table Set" className="tm-table-set img-responsive" />
                    </div>
                </section>

                {/* ================= MAIN CONTENT ================= */}
                <div className="tm-main-section light-gray-bg">
                    <div className="container" id="main">

                        {/* ================= POPULAR ITEMS ================= */}
                        <section className="tm-section tm-section-margin-bottom-0 row">
                            <div className="col-lg-12 tm-section-header-container">
                                <h2 className="tm-section-header gold-text tm-handwriting-font">
                                    <img src="img/logo.png" alt="Logo" className="tm-site-logo" />
                                    Popular Items
                                </h2>
                                <div className="tm-hr-container">
                                    <hr className="tm-hr" />
                                </div>
                            </div>

                            <div className="col-lg-12 tm-popular-items-container">
                                {popularItems.length > 0 ? (
                                    popularItems.map((item) => (
                                        <div className="tm-popular-item" key={item.id}>
                                            <img
                                                src={item.image || "/img/default-coffee.jpg"}
                                                alt={item.name}
                                                className="tm-popular-item-img"
                                                onError={(e) => e.target.src = "/img/default-coffee.jpg"}
                                            />

                                            <div className="tm-popular-item-description">
                                                <h3 className="tm-handwriting-font tm-popular-item-title">
                                                    <span className="tm-handwriting-font bigger-first-letter">
                                                        {item.name.charAt(0)}
                                                    </span>
                                                    {item.name.slice(1)}
                                                </h3>

                                                <hr className="tm-popular-item-hr" />

                                                <p>{item.ingredients}</p>

                                                <p className="gold-text">
                                                    <b>${item.price}</b>
                                                </p>

                                                <div className="order-now-container">
                                                    <NavLink
                                                        to={`/menu/${item.id}`}
                                                        className="order-now-link tm-handwriting-font"
                                                    >
                                                        View Details
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ textAlign: "center", width: "100%" }}>
                                        No popular items found
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* ================= DAILY MENU ================= */}
                        <section className="tm-section">
                            <div className="row">
                                <div className="col-lg-12 tm-section-header-container">
                                    <h2 className="tm-section-header gold-text tm-handwriting-font">
                                        <img src="img/logo.png" alt="Logo" className="tm-site-logo" />
                                        Daily Menu
                                    </h2>
                                    <div className="tm-hr-container">
                                        <hr className="tm-hr" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="tm-daily-menu-container margin-top-60">
                                    <div className="col-lg-4 col-md-4">
                                        <img
                                            src="img/menu-board.png"
                                            alt="Menu board"
                                            className="tm-daily-menu-img"
                                        />
                                    </div>

                                    <div className="col-lg-8 col-md-8">
                                        <p>
                                            Enjoy our freshly designed menu featuring handcrafted beverages
                                            and delicious light bites.
                                        </p>

                                        <ol className="margin-top-30">
                                            <li>Coffee</li>
                                            <li>Desserts</li>
                                            <li>Snacks</li>
                                            <li>Beverages</li>
                                            <li>Special Combos</li>
                                        </ol>

                                        <NavLink to="/menu" className="tm-more-button">
                                            View Full Menu
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;
