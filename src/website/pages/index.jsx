
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom';



function Index() {
    const [popularItems, setPopularItems] = useState([]);

    const fetchPopularItems = async () => {
        try {
            const response = await axios.get("http://localhost:3002/menuItems");
            // only available items
            const availableItems = response.data.filter(
                item => item.status === "available"
            );
            setPopularItems(availableItems);
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
                <section className="tm-welcome-section">
                    <div className="container tm-position-relative">
                        <div className="tm-lights-container">
                            <img src="../img/light.png" alt="Light" className="light light-1" />
                            <img src="img/light.png" alt="Light" className="light light-2" />
                            <img src="img/light.png" alt="Light" className="light light-3" />
                        </div>

                        {/* WELCOME HEADER */}
                        <div className="row tm-welcome-content">
                            <h2 className="white-text tm-handwriting-font tm-welcome-header">
                                <img src="img/header-line.png" alt="Line" className="tm-header-line" />
                                &nbsp;Welcome To&nbsp;&nbsp;
                                <img src="img/header-line.png" alt="Line" className="tm-header-line" />
                            </h2>

                            <h2 className="gold-text tm-welcome-header-2">Cafe House</h2>

                            <p className="gray-text tm-welcome-description">
                                Step inside <span className="gold-text">Cafe House</span> — where great taste, cozy ambience,
                                and handcrafted flavors come together. From freshly brewed coffees to delicious snacks,
                                we create the perfect space for your conversations, work sessions, or peaceful breaks.
                                Enjoy the aroma, the comfort, and the passion in every cup.
                            </p>

                            <a href="#main" className="tm-more-button tm-more-button-welcome">Explore More</a>
                        </div>

                        <img src="img/table-set.png" alt="Table Set" className="tm-table-set img-responsive" />
                    </div>
                </section>


                {/* MAIN CONTENT */}
                <div className="tm-main-section light-gray-bg">
                    <div className="container" id="main">

                        {/* ABOUT SECTION */}
                        <section className="tm-section row">
                            <div className="col-lg-9 col-md-9 col-sm-8">
                                <h2 className="tm-section-header gold-text tm-handwriting-font">The Best Coffee For You</h2>
                                <h2>Cafe House</h2>

                                <p className="tm-welcome-description">
                                    At Cafe House, we believe that every cup tells a story. Our beans are freshly roasted,
                                    our recipes are thoughtfully crafted, and our chefs prepare each item with love.
                                    Whether you’re craving a strong espresso, a creamy latte, or a light snack,
                                    we bring you flavors that feel like home.
                                </p>

                                <a href="#" className="tm-more-button margin-top-30">Discover More</a>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-4 tm-welcome-img-container">
                                <div className="inline-block shadow-img">
                                    <img src="img/1.jpg" alt="Cafe Image" className="img-circle img-thumbnail" />
                                </div>
                            </div>
                        </section>


                        {/* POPULAR ITEMS */}
                        <section className="tm-section tm-section-margin-bottom-0 row">
                            <div className="col-lg-12 tm-section-header-container">
                                <h2 className="tm-section-header gold-text tm-handwriting-font">
                                    <img src="img/logo.png" alt="Logo" className="tm-site-logo" /> Popular Items
                                </h2>
                                <div className="tm-hr-container"><hr className="tm-hr" /></div>
                            </div>

                            <div className="col-lg-12 tm-popular-items-container">

                                {popularItems.map((item) => (
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

                                            <p className="gold-text"><b>${item.price}</b></p>

                                            <div className="order-now-container">
                                                <a href="#" className="order-now-link tm-handwriting-font">
                                                    Order Now
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}




                            </div>
                        </section>


                        {/* TODAY'S SPECIAL */}
                        <section className="tm-section today-special-layout row">
                            <div className="col-lg-12 tm-section-header-container">
                                <h2 className="tm-section-header gold-text tm-handwriting-font">
                                    <img src="img/logo.png" alt="Logo" className="tm-site-logo" /> Today's Special
                                </h2>
                                <div className="tm-hr-container"><hr className="tm-hr" /></div>
                            </div>

                            <div className="col-lg-12 tm-special-container margin-top-60">

                                {/* LEFT SPECIAL ITEM */}
                                <div className="tm-special-item-left">
                                    <div className="tm-special-img-container">
                                        <img src="img/poster1.png" alt="Special" className="tm-special-img img-responsive" />
                                        <a href="#">
                                            <div className="tm-special-description">
                                                <h3 className="tm-special-title">Coffee of the Day</h3>
                                                <p>Our master-roasted beans delivering a deep, smooth & aromatic experience.</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                {/* RIGHT SPECIAL ITEMS */}
                                <div className="tm-special-column-right">

                                    {/* Top right item */}
                                    <div className="tm-special-item-upper">
                                        <div className="tm-special-img-container">
                                            <img src="img/poster2.png" alt="Special" className="tm-special-img img-responsive" />
                                            <a href="#">
                                                <div className="tm-special-description">
                                                    <h3 className="tm-special-title">Snacks</h3>
                                                    <p>Yummy snacks......</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Bottom row with 2 items */}
                                    <div className="tm-special-row-lower">

                                        <div className="tm-special-item-lower">
                                            <div className="tm-special-img-container">
                                                <img src="img/poster4.png" alt="Special" className="tm-special-img img-responsive" />
                                                <a href="#">
                                                    <div className="tm-special-description">
                                                        <p>Pastries & Desserts</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        <div className="tm-special-item-lower">
                                            <div className="tm-special-img-container">
                                                <img src="img/poster3.png" alt="Special" className="tm-special-img img-responsive" />
                                                <a href="#">
                                                    <div className="tm-special-description">
                                                        <p>Healthy Drinks</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </section>



                        {/* DAILY MENU */}
                        <section className="tm-section">
                            <div className="row">
                                <div className="col-lg-12 tm-section-header-container">
                                    <h2 className="tm-section-header gold-text tm-handwriting-font">
                                        <img src="img/logo.png" alt="Logo" className="tm-site-logo" /> Daily Menu
                                    </h2>
                                    <div className="tm-hr-container"><hr className="tm-hr" /></div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="tm-daily-menu-container margin-top-60">

                                    <div className="col-lg-4 col-md-4">
                                        <img src="img/menu-board.png" alt="Menu board" className="tm-daily-menu-img" />
                                    </div>

                                    <div className="col-lg-8 col-md-8">
                                        <p>
                                            Enjoy our freshly designed menu featuring handcrafted beverages and delicious light bites.
                                            Whether you're in the mood for something warm, sweet, or refreshing,
                                            our daily menu offers something for everyone.
                                        </p>

                                        <ol className="margin-top-30">
                                            <li>Coffee</li>
                                            <li>Desserts</li>
                                            <li>Snacks</li>
                                            <li>Beverages</li>
                                            <li>Special Combos</li>
                                            <li>Fresh Fruit Bowl</li>
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
    )
}

export default Index
