import React from 'react'

function Index() {
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

                                {/* Americano */}
                                <div className="tm-popular-item">
                                    <img src="img/americano.avif" alt="Americano" className="tm-popular-item-img" />
                                    <div className="tm-popular-item-description">
                                        <h3 className="tm-handwriting-font tm-popular-item-title">
                                            <span className="tm-handwriting-font bigger-first-letter">A</span>mericano
                                        </h3>
                                        <hr className="tm-popular-item-hr" />
                                        <p>A bold, rich espresso blended with hot water. A perfect pick-me-up for coffee lovers.</p>
                                        <div className="order-now-container">
                                            <a href="#" className="order-now-link tm-handwriting-font">Order Now</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Cappuccino */}
                                <div className="tm-popular-item">
                                    <img src="img/premium_photo-1722859269665-2c4c040d9031.avif" alt="Cappuccino" className="tm-popular-item-img" />
                                    <div className="tm-popular-item-description">
                                        <h3 className="tm-handwriting-font tm-popular-item-title">
                                            <span className="tm-handwriting-font bigger-first-letter">C</span>appuccino
                                        </h3>
                                        <hr className="tm-popular-item-hr" />
                                        <p>A smooth blend of espresso, steamed milk, and delightful foam. Light and creamy.</p>
                                        <div className="order-now-container">
                                            <a href="#" className="order-now-link tm-handwriting-font">Order Now</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Mocha */}
                                <div className="tm-popular-item">
                                    <img src="img/mocha.webp" alt="Mocha" className="tm-popular-item-img" />
                                    <div className="tm-popular-item-description">
                                        <h3 className="tm-handwriting-font tm-popular-item-title">
                                            <span className="tm-handwriting-font bigger-first-letter">M</span>ocha
                                        </h3>
                                        <hr className="tm-popular-item-hr" />
                                        <p>A chocolatey delight combining espresso, milk, and premium cocoa. Sweet & energizing.</p>
                                        <div className="order-now-container">
                                            <a href="#" className="order-now-link tm-handwriting-font">Order Now</a>
                                        </div>
                                    </div>
                                </div>
                                {/* Latte */}
                                <div className="tm-popular-item">
                                    <img src="img/coffee-5495609_1920.jpg" alt="Latte" className="tm-popular-item-img" />
                                    <div className="tm-popular-item-description">
                                        <h3 className="tm-handwriting-font tm-popular-item-title">
                                            <span className="tm-handwriting-font bigger-first-letter">L</span>atte
                                        </h3>
                                        <hr className="tm-popular-item-hr" />
                                        <p>Smooth espresso blended with creamy steamed milk. Mild, comforting, and rich.</p>
                                        <div className="order-now-container">
                                            <a href="#" className="order-now-link tm-handwriting-font">Order Now</a>
                                        </div>
                                    </div>
                                </div>
                                {/* Iced Coffee */}
                                <div className="tm-popular-item">
                                    <img src="img/iced-coffe.avif" alt="Iced Coffee" className="tm-popular-item-img" />
                                    <div className="tm-popular-item-description">
                                        <h3 className="tm-handwriting-font tm-popular-item-title">
                                            <span className="tm-handwriting-font bigger-first-letter">I</span>ced Coffee
                                        </h3>
                                        <hr className="tm-popular-item-hr" />
                                        <p>Chilled coffee served over ice. Refreshing, smooth, and energizing.</p>
                                        <div className="order-now-container">
                                            <a href="#" className="order-now-link tm-handwriting-font">Order Now</a>
                                        </div>
                                    </div>
                                </div>
                                {/* Chocolate Frappe */}
                                <div className="tm-popular-item">
                                    <img src="img/chocolate-frappe.webp" alt="Chocolate Frappe" className="tm-popular-item-img" />
                                    <div className="tm-popular-item-description">
                                        <h3 className="tm-handwriting-font tm-popular-item-title">
                                            <span className="tm-handwriting-font bigger-first-letter">C</span>hocolate Frappe
                                        </h3>
                                        <hr className="tm-popular-item-hr" />
                                        <p>Cold blended coffee with chocolate syrup and whipped cream. Pure indulgence.</p>
                                        <div className="order-now-container">
                                            <a href="#" className="order-now-link tm-handwriting-font">Order Now</a>
                                        </div>
                                    </div>
                                </div>
                                {/* Chocolate Brownie */}
                                <div className="tm-popular-item tm-center-item">
                                    <img src="img/brownie.webp" alt="Chocolate Brownie" className="tm-popular-item-img" />
                                    <div className="tm-popular-item-description">
                                        <h3 className="tm-handwriting-font tm-popular-item-title">
                                            <span className="tm-handwriting-font bigger-first-letter">B</span>rownie
                                        </h3>
                                        <hr className="tm-popular-item-hr" />
                                        <p>Rich, fudgy chocolate brownie served warm. Best paired with coffee.</p>
                                        <div className="order-now-container">
                                            <a href="#" className="order-now-link tm-handwriting-font">Order Now</a>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </section>


                        {/* TODAY'S SPECIAL */}
                        <section className="tm-section row">
                            <div className="col-lg-12 tm-section-header-container">
                                <h2 className="tm-section-header gold-text tm-handwriting-font">
                                    <img src="img/logo.png" alt="Logo" className="tm-site-logo" /> Today's Special
                                </h2>
                                <div className="tm-hr-container"><hr className="tm-hr" /></div>
                            </div>

                            <div className="col-lg-12 tm-special-container margin-top-60">

                                {/* LEFT SPECIAL ITEM */}
                                <div className="tm-special-container-left">
                                    <div className="tm-special-item">
                                        <div className="tm-special-img-container">
                                            <img src="img/special-1.jpg" alt="Special" className="tm-special-img img-responsive" />
                                            <a href="#">
                                                <div className="tm-special-description">
                                                    <h3 className="tm-special-title">Signature Coffee Blend</h3>
                                                    <p>Our master-roasted beans delivering a deep, smooth & aromatic experience.</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT SPECIAL ITEMS */}
                                <div className="tm-special-container-right">

                                    <div className="tm-special-item">
                                        <div className="tm-special-img-container">
                                            <img src="img/special-2.jpg" alt="Special" className="img-responsive" />
                                            <a href="#">
                                                <div className="tm-special-description">
                                                    <h3 className="tm-special-title">Honey Almond Latte</h3>
                                                    <p>Sweetened with natural honey & a hint of almond. Perfect for evenings.</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="tm-special-container-lower">
                                        <div className="tm-special-item">
                                            <div className="tm-special-img-container">
                                                <img src="img/special-3.jpg" alt="Special" className="img-responsive" />
                                                <a href="#">
                                                    <div className="tm-special-description">
                                                        <p>Freshly Baked Croissant</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        <div className="tm-special-item">
                                            <div className="tm-special-img-container">
                                                <img src="img/special-4.jpg" alt="Special" className="img-responsive" />
                                                <a href="#">
                                                    <div className="tm-special-description">
                                                        <p>Chocolate Fudge Brownie</p>
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
                                            <li>Classic Masala Tea</li>
                                            <li>Garlic Butter Toast</li>
                                            <li>Grilled Veggie Sandwich</li>
                                            <li>Chocolate Chip Muffin</li>
                                            <li>Iced Caramel Coffee</li>
                                            <li>Fresh Fruit Bowl</li>
                                        </ol>

                                        <a href="#" className="tm-more-button margin-top-30">View Full Menu</a>
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
