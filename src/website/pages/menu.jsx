import React from 'react'

function Menu() {
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
                                <img src="img/header-line.png" alt="Line" className="tm-header-line" />&nbsp;Our Menus&nbsp;&nbsp;
                                <img src="img/header-line.png" alt="Line" className="tm-header-line" />
                            </h2>

                            <h2 className="gold-text tm-welcome-header-2">Cafe House</h2>

                            <p className="gray-text tm-welcome-description">
                                Explore our freshly brewed coffees, delicious desserts, refreshing beverages, and handcrafted snacks. 
                                Each item is made with premium ingredients to give you the best café experience.
                            </p>

                            <a href="#main" className="tm-more-button tm-more-button-welcome">Explore Menu</a>
                        </div>

                        <img src="img/table-set.png" alt="Table Set" className="tm-table-set img-responsive" />
                    </div>
                </section>

                <div className="tm-main-section light-gray-bg">
                    <div className="container" id="main">

                        {/* ABOUT SECTION */}
                        <section className="tm-section row">
                            <div className="col-lg-9 col-md-9 col-sm-8">
                                <h2 className="tm-section-header gold-text tm-handwriting-font">What We Serve</h2>
                                <h2>Cafe House</h2>

                                <p className="tm-welcome-description">
                                    At Cafe House, we serve a wide variety of freshly prepared items including coffee blends, 
                                    continental snacks, desserts, and refreshing drinks. Whether you're here to relax, work, 
                                    or enjoy with friends — we’ve got something special for every moment!
                                </p>

                                <a href="#" className="tm-more-button margin-top-30">Read More</a>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-4 tm-welcome-img-container">
                                <div className="inline-block shadow-img">
                                    <img src="img/1.jpg" alt="Image" className="img-circle img-thumbnail" />
                                </div>
                            </div>
                        </section>

                        {/* MENU SECTION */}
                        <section className="tm-section row">

                            <div className="col-lg-12 tm-section-header-container margin-bottom-30">
                                <h2 className="tm-section-header gold-text tm-handwriting-font">
                                    <img src="img/logo.png" alt="Logo" className="tm-site-logo" /> Our Menu Categories
                                </h2>
                                <div className="tm-hr-container"><hr className="tm-hr" /></div>
                            </div>

                            <div>
                                {/* SIDE MENU */}
                                <div className="col-lg-3 col-md-3">
                                    <div className="tm-position-relative margin-bottom-30">
                                        <nav className="tm-side-menu">
                                            <ul>
                                                <li><a href="#" className="active">Coffee</a></li>
                                                <li><a href="#">Desserts</a></li>
                                                <li><a href="#">Snacks</a></li>
                                                <li><a href="#">Beverages</a></li>
                                                <li><a href="#">Special Combos</a></li>
                                            </ul>
                                        </nav>

                                        <img src="img/vertical-menu-bg.png" alt="Menu bg" className="tm-side-menu-bg" />
                                    </div>
                                </div>

                                {/* PRODUCT CONTENT */}
                                <div className="tm-menu-product-content col-lg-9 col-md-9">

                                    {/* 1 */}
                                    <div className="tm-product">
                                        <img src="img/menu-1.jpg" alt="Product" />
                                        <div className="tm-product-text">
                                            <h3 className="tm-product-title">Classic Cappuccino</h3>
                                            <p className="tm-product-description">
                                                Smooth espresso topped with velvety steamed milk and a rich foam layer.
                                            </p>
                                        </div>
                                        <div className="tm-product-price">
                                            <a href="#" className="tm-product-price-link tm-handwriting-font">
                                                <span className="tm-product-price-currency">$</span>12
                                            </a>
                                        </div>
                                    </div>

                                    {/* 2 */}
                                    <div className="tm-product">
                                        <img src="img/menu-2.jpg" alt="Product" />
                                        <div className="tm-product-text">
                                            <h3 className="tm-product-title">Chocolate Lava Cake</h3>
                                            <p className="tm-product-description">
                                                Warm molten chocolate cake served with vanilla ice cream.
                                            </p>
                                        </div>
                                        <div className="tm-product-price">
                                            <a href="#" className="tm-product-price-link tm-handwriting-font">
                                                <span className="tm-product-price-currency">$</span>18
                                            </a>
                                        </div>
                                    </div>

                                    {/* 3 */}
                                    <div className="tm-product">
                                        <img src="img/menu-3.jpg" alt="Product" />
                                        <div className="tm-product-text">
                                            <h3 className="tm-product-title">Cheese Garlic Sandwich</h3>
                                            <p className="tm-product-description">
                                                Toasted bread filled with melted cheese and fresh garlic butter.
                                            </p>
                                        </div>
                                        <div className="tm-product-price">
                                            <a href="#" className="tm-product-price-link tm-handwriting-font">
                                                <span className="tm-product-price-currency">$</span>10
                                            </a>
                                        </div>
                                    </div>

                                    {/* 4 */}
                                    <div className="tm-product">
                                        <img src="img/menu-4.jpg" alt="Product" />
                                        <div className="tm-product-text">
                                            <h3 className="tm-product-title">Strawberry Milkshake</h3>
                                            <p className="tm-product-description">
                                                A refreshing blend of fresh strawberries, ice cream, and chilled milk.
                                            </p>
                                        </div>
                                        <div className="tm-product-price">
                                            <a href="#" className="tm-product-price-link tm-handwriting-font">
                                                <span className="tm-product-price-currency">$</span>15
                                            </a>
                                        </div>
                                    </div>

                                    {/* 5 */}
                                    <div className="tm-product">
                                        <img src="img/menu-5.jpg" alt="Product" />
                                        <div className="tm-product-text">
                                            <h3 className="tm-product-title">Cafe House Combo</h3>
                                            <p className="tm-product-description">
                                                Includes 1 Coffee + 1 Dessert + 1 Snack of your choice — best value combo!
                                            </p>
                                        </div>
                                        <div className="tm-product-price">
                                            <a href="#" className="tm-product-price-link tm-handwriting-font">
                                                <span className="tm-product-price-currency">$</span>30
                                            </a>
                                        </div>
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

export default Menu
