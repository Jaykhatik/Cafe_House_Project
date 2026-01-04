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
                <div className="today-special-section">
                    <div className="tm-main-section light-gray-bg">
                        <div className="container" id="main">
                            <section className="tm-section row">

                                {/* MAIN HEADER */}
                                <div className="col-lg-12 tm-section-header-container">
                                    <h2 className="tm-section-header gold-text tm-handwriting-font">
                                        <img src="img/logo.png" alt="Logo" className="tm-site-logo" /> Popular Items
                                    </h2>
                                    <div className="tm-hr-container">
                                        <hr className="tm-hr" />
                                    </div>
                                </div>

                                {/* ================= COFFEE CATEGORY ================= */}
                                <div className="col-lg-12 today-special-section">
                                    <h3 className="gold-text tm-handwriting-font mt-5">Coffee</h3>
                                    <hr className="tm-hr" />

                                    <div className="tm-popular-items-container">

                                        {/* Americano */}
                                        <div className="tm-popular-item">
                                            <img src="img/popular-1.jpg" alt="Americano" className="tm-popular-item-img" />
                                            <div className="tm-popular-item-description">
                                                <h3 className="tm-handwriting-font tm-popular-item-title">
                                                    <span className="bigger-first-letter">A</span>mericano
                                                </h3>
                                                <hr className="tm-popular-item-hr" />
                                                <p>Rich espresso mixed with hot water for a bold taste.</p>
                                                <p className="price">
                                                    <span className="discount-price">$3.00</span> <span className="original-price">$4.00</span>
                                                </p>
                                                <div className="order-now-container small-order">
                                                    <a href="#" className="order-now-link tm-handwriting-font">Order</a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Cappuccino */}
                                        <div className="tm-popular-item">
                                            <img src="img/popular-2.jpg" alt="Cappuccino" className="tm-popular-item-img" />
                                            <div className="tm-popular-item-description">
                                                <h3 className="tm-handwriting-font tm-popular-item-title">
                                                    <span className="bigger-first-letter">C</span>appuccino
                                                </h3>
                                                <hr className="tm-popular-item-hr" />
                                                <p>Espresso with steamed milk and creamy foam.</p>
                                                <p className="price">
                                                    <span className="discount-price">$4.50</span> <span className="original-price">$5.50</span>
                                                </p>
                                                <div className="order-now-container small-order">
                                                    <a href="#" className="order-now-link tm-handwriting-font">Order</a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Latte */}
                                        <div className="tm-popular-item">
                                            <img src="img/popular-1.jpg" alt="Latte" className="tm-popular-item-img" />
                                            <div className="tm-popular-item-description">
                                                <h3 className="tm-handwriting-font tm-popular-item-title">
                                                    <span className="bigger-first-letter">L</span>atte
                                                </h3>
                                                <hr className="tm-popular-item-hr" />
                                                <p>Smooth milk coffee with light foam.</p>
                                                <p className="price">
                                                    <span className="discount-price">$4.00</span> <span className="original-price">$5.00</span>
                                                </p>
                                                <div className="order-now-container small-order">
                                                    <a href="#" className="order-now-link tm-handwriting-font">Order</a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Espresso */}
                                        <div className="tm-popular-item">
                                            <img src="img/popular-2.jpg" alt="Espresso" className="tm-popular-item-img" />
                                            <div className="tm-popular-item-description">
                                                <h3 className="tm-handwriting-font tm-popular-item-title">
                                                    <span className="bigger-first-letter">E</span>spresso
                                                </h3>
                                                <hr className="tm-popular-item-hr" />
                                                <p>Strong black coffee with a rich aroma.</p>
                                                <p className="price">
                                                    <span className="discount-price">$2.50</span> <span className="original-price">$3.50</span>
                                                </p>
                                                <div className="order-now-container small-order">
                                                    <a href="#" className="order-now-link tm-handwriting-font">Order</a>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* ================= CHOCOLATE DRINKS CATEGORY ================= */}
                                <div className="col-lg-12 today-special-section">
                                    <h3 className="gold-text tm-handwriting-font mt-5">Chocolate Drinks</h3>
                                    <hr className="tm-hr" />

                                    <div className="tm-popular-items-container">

                                        {/* Mocha */}
                                        <div className="tm-popular-item">
                                            <img src="img/popular-3.jpg" alt="Mocha" className="tm-popular-item-img" />
                                            <div className="tm-popular-item-description">
                                                <h3 className="tm-handwriting-font tm-popular-item-title">
                                                    <span className="bigger-first-letter">M</span>ocha
                                                </h3>
                                                <hr className="tm-popular-item-hr" />
                                                <p>Chocolate and espresso blended perfectly.</p>
                                                <p className="price">
                                                    <span className="discount-price">$4.00</span> <span className="original-price">$5.00</span>
                                                </p>
                                                <div className="order-now-container small-order">
                                                    <a href="#" className="order-now-link tm-handwriting-font">Order</a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dark Mocha */}
                                        <div className="tm-popular-item">
                                            <img src="img/popular-4.jpg" alt="Dark Mocha" className="tm-popular-item-img" />
                                            <div className="tm-popular-item-description">
                                                <h3 className="tm-handwriting-font tm-popular-item-title">
                                                    <span className="bigger-first-letter">D</span>ark Mocha
                                                </h3>
                                                <hr className="tm-popular-item-hr" />
                                                <p>Deep chocolate flavor with strong espresso.</p>
                                                <p className="price">
                                                    <span className="discount-price">$4.50</span> <span className="original-price">$5.50</span>
                                                </p>
                                                <div className="order-now-container small-order">
                                                    <a href="#" className="order-now-link tm-handwriting-font">Order</a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Chocolate Frappe */}
                                        <div className="tm-popular-item">
                                            <img src="img/popular-5.jpg" alt="Choco Frappe" className="tm-popular-item-img" />
                                            <div className="tm-popular-item-description">
                                                <h3 className="tm-handwriting-font tm-popular-item-title">
                                                    <span className="bigger-first-letter">C</span>hoco Frappe
                                                </h3>
                                                <hr className="tm-popular-item-hr" />
                                                <p>Cold chocolate frappe topped with cream.</p>
                                                <p className="price">
                                                    <span className="discount-price">$5.00</span> <span className="original-price">$6.00</span>
                                                </p>
                                                <div className="order-now-container small-order">
                                                    <a href="#" className="order-now-link tm-handwriting-font">Order</a>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* ================= SPECIAL LATTE CATEGORY ================= */}
                                <div className="col-lg-12 today-special-section">
                                    <h3 className="gold-text tm-handwriting-font mt-5">Special Latte</h3>
                                    <hr className="tm-hr" />

                                    <div className="tm-popular-items-container">

                                        {/* Caramel Latte */}
                                        <div className="tm-popular-item">
                                            <img src="img/popular-2.jpg" alt="Caramel Latte" className="tm-popular-item-img" />
                                            <div className="tm-popular-item-description">
                                                <h3 className="tm-handwriting-font tm-popular-item-title">
                                                    <span className="bigger-first-letter">C</span>aramel Latte
                                                </h3>
                                                <hr className="tm-popular-item-hr" />
                                                <p>Sweet caramel blended with creamy milk.</p>
                                                <p className="price">
                                                    <span className="discount-price">$4.50</span> <span className="original-price">$5.50</span>
                                                </p>
                                                <div className="order-now-container small-order">
                                                    <a href="#" className="order-now-link tm-handwriting-font">Order</a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Vanilla Latte */}
                                        <div className="tm-popular-item">
                                            <img src="img/popular-1.jpg" alt="Vanilla Latte" className="tm-popular-item-img" />
                                            <div className="tm-popular-item-description">
                                                <h3 className="tm-handwriting-font tm-popular-item-title">
                                                    <span className="bigger-first-letter">V</span>anilla Latte
                                                </h3>
                                                <hr className="tm-popular-item-hr" />
                                                <p>Smooth vanilla flavor with steamed milk.</p>
                                                <p className="price">
                                                    <span className="discount-price">$4.00</span> <span className="original-price">$5.00</span>
                                                </p>
                                                <div className="order-now-container small-order">
                                                    <a href="#" className="order-now-link tm-handwriting-font">Order</a>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Today_special;
