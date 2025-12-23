import React from 'react'

function Today_special() {
    return (
        <>
            <div>
                <section className="tm-welcome-section">
                    <div className="container tm-position-relative">
                        <div className="tm-lights-container">
                            <img src="img/light.png" alt="Light" className="light light-1" />
                            <img src="img/light.png" alt="Light" className="light light-2" />
                            <img src="img/light.png" alt="Light" className="light light-3" />
                        </div>
                        <div className="row tm-welcome-content">
                            <h2 className="white-text tm-handwriting-font tm-welcome-header">
                                <img src="img/header-line.png" alt="Line" className="tm-header-line" />
                                &nbsp;Today's Special&nbsp;&nbsp;
                                <img src="img/header-line.png" alt="Line" className="tm-header-line" />
                            </h2>

                            <h2 className="gold-text tm-welcome-header-2">Cafe House</h2>

                            <p className="gray-text tm-welcome-description">
                                Welcome to <span className="gold-text">Cafe House</span>, where great taste meets a warm, cozy atmosphere. 
                                Our handcrafted coffees, delicious pastries, and freshly prepared snacks are made to give you the perfect café experience. 
                                Whether you're here for a quick sip or a relaxing break, we make sure every moment feels special.
                            </p>

                            <a href="#main" className="tm-more-button tm-more-button-welcome">Explore Menu</a>
                        </div>

                        <img src="img/table-set.png" alt="Table Set" className="tm-table-set img-responsive" />
                    </div>
                </section>


                {/* POPULAR ITEMS */}
                <div className="tm-main-section light-gray-bg">
                    <div className="container" id="main">
                        <section className="tm-section tm-section-margin-bottom-0 row">
                            <div className="col-lg-12 tm-section-header-container">
                                <h2 className="tm-section-header gold-text tm-handwriting-font">
                                    <img src="img/logo.png" alt="Logo" className="tm-site-logo" /> Popular Items
                                </h2>
                                <div className="tm-hr-container"><hr className="tm-hr" /></div>
                            </div>

                            <div className="col-lg-12 tm-popular-items-container">

                                {/* ITEM 1 */}
                                <div className="tm-popular-item">
                                    <img src="img/popular-1.jpg" alt="Americano" className="tm-popular-item-img" />
                                    <div className="tm-popular-item-description">
                                        <h3 className="tm-handwriting-font tm-popular-item-title">
                                            <span className="tm-handwriting-font bigger-first-letter">A</span>mericano
                                        </h3>
                                        <hr className="tm-popular-item-hr" />
                                        <p>A smooth, rich, and bold espresso blended with hot water—perfect for those who love a deep coffee flavor.</p>
                                        <div className="order-now-container">
                                            <a href="#" className="order-now-link tm-handwriting-font">Order Now</a>
                                        </div>
                                    </div>
                                </div>

                                {/* ITEM 2 */}
                                <div className="tm-popular-item">
                                    <img src="img/popular-2.jpg" alt="Cappuccino" className="tm-popular-item-img" />
                                    <div className="tm-popular-item-description">
                                        <h3 className="tm-handwriting-font tm-popular-item-title">
                                            <span className="tm-handwriting-font bigger-first-letter">C</span>appuccino
                                        </h3>
                                        <hr className="tm-popular-item-hr" />
                                        <p>A classic Italian favorite made with rich espresso, steamed milk, and a velvety foam layer.</p>
                                        <div className="order-now-container">
                                            <a href="#" className="order-now-link tm-handwriting-font">Order Now</a>
                                        </div>
                                    </div>
                                </div>

                                {/* ITEM 3 */}
                                <div className="tm-popular-item">
                                    <img src="img/popular-3.jpg" alt="Mocha" className="tm-popular-item-img" />
                                    <div className="tm-popular-item-description">
                                        <h3 className="tm-handwriting-font tm-popular-item-title">
                                            <span className="tm-handwriting-font bigger-first-letter">M</span>ocha
                                        </h3>
                                        <hr className="tm-popular-item-hr" />
                                        <p>Espresso meets chocolate! A sweet and creamy blend perfect for chocolate lovers.</p>
                                        <div className="order-now-container">
                                            <a href="#" className="order-now-link tm-handwriting-font">Order Now</a>
                                        </div>
                                    </div>
                                </div>

                                {/* ITEM 4 */}
                                <div className="tm-popular-item">
                                    <img src="img/popular-1.jpg" alt="Latte" className="tm-popular-item-img" />
                                    <div className="tm-popular-item-description">
                                        <h3 className="tm-handwriting-font tm-popular-item-title">
                                            <span className="tm-handwriting-font bigger-first-letter">L</span>atte
                                        </h3>
                                        <hr className="tm-popular-item-hr" />
                                        <p>A creamy blend of espresso and steamed milk, topped with a thin layer of foam. Light, smooth, and comforting.</p>
                                        <div className="order-now-container">
                                            <a href="#" className="order-now-link tm-handwriting-font">Order Now</a>
                                        </div>
                                    </div>
                                </div>

                                {/* ITEM 5 */}
                                <div className="tm-popular-item">
                                    <img src="img/popular-2.jpg" alt="Caramel Cappuccino" className="tm-popular-item-img" />
                                    <div className="tm-popular-item-description">
                                        <h3 className="tm-handwriting-font tm-popular-item-title">
                                            <span className="tm-handwriting-font bigger-first-letter">C</span>aramel Cappuccino
                                        </h3>
                                        <hr className="tm-popular-item-hr" />
                                        <p>A sweet twist on the classic cappuccino infused with rich caramel syrup and frothy milk.</p>
                                        <div className="order-now-container">
                                            <a href="#" className="order-now-link tm-handwriting-font">Order Now</a>
                                        </div>
                                    </div>
                                </div>

                                {/* ITEM 6 */}
                                <div className="tm-popular-item">
                                    <img src="img/popular-3.jpg" alt="Dark Mocha" className="tm-popular-item-img" />
                                    <div className="tm-popular-item-description">
                                        <h3 className="tm-handwriting-font tm-popular-item-title">
                                            <span className="tm-handwriting-font bigger-first-letter">D</span>ark Mocha
                                        </h3>
                                        <hr className="tm-popular-item-hr" />
                                        <p>A richer, deeper mocha with premium dark chocolate—perfect for coffee enthusiasts.</p>
                                        <div className="order-now-container">
                                            <a href="#" className="order-now-link tm-handwriting-font">Order Now</a>
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
                                            Enjoy our freshly prepared daily specials made with quality ingredients and lots of love. 
                                            From breakfast to evening snacks, we bring you dishes that are both tasty and comforting.
                                        </p>

                                        <ol className="margin-top-30">
                                            <li>Fresh Brewed Coffee</li>
                                            <li>Garlic Cheese Toast</li>
                                            <li>Veggie Sandwich</li>
                                            <li>Chocolate Brownie</li>
                                            <li>Special Masala Tea</li>
                                            <li>Classic Croissant</li>
                                        </ol>

                                        <a href="#" className="tm-more-button margin-top-30">Full Menu</a>
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

export default Today_special;
