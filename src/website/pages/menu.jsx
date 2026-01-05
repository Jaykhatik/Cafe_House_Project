import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function Menu() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);

    const categoryRefs = useRef({});
    const hasScrolledRef = useRef(false);

    // ================= FETCH DATA =================
    useEffect(() => {
        const fetchData = async () => {
            try {
                const catRes = await axios.get("http://localhost:3002/categories");
                const menuRes = await axios.get("http://localhost:3002/menuItems");

                setCategories(catRes.data);
                setMenuItems(menuRes.data);

                const scrollToId = sessionStorage.getItem("scrollToCategoryId");
                if (scrollToId) {
                    setActiveCategoryId(Number(scrollToId));
                } else if (catRes.data.length > 0) {
                    setActiveCategoryId(catRes.data[0].id);
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // ================= SCROLL =================
    useEffect(() => {
        const scrollToId = sessionStorage.getItem("scrollToCategoryId");
        if (scrollToId && !hasScrolledRef.current) {
            const ref = categoryRefs.current[Number(scrollToId)];
            if (ref) {
                hasScrolledRef.current = true;
                setTimeout(() => {
                    ref.scrollIntoView({ behavior: "smooth", block: "start" });
                    sessionStorage.removeItem("scrollToCategoryId");
                }, 300);
            }
        }
    }, [activeCategoryId]);

    if (loading) return <p>Loading menu...</p>;

    // ================= FILTER ITEMS =================
    const filteredItems = menuItems.filter(item => item.categoryId === activeCategoryId);
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
                                &nbsp;Our Menus&nbsp;&nbsp;
                                <img src="img/header-line.png" alt="Line" className="tm-header-line" />
                            </h2>

                            <h2 className="gold-text tm-welcome-header-2">Cafe House</h2>

                            <p className="gray-text tm-welcome-description">
                                Explore our freshly brewed coffees, delicious desserts, refreshing beverages, and handcrafted snacks.
                            </p>

                            <a href="#main" className="tm-more-button tm-more-button-welcome">
                                Explore Menu
                            </a>
                        </div>

                        <img
                            src="img/table-set.png"
                            alt="Table Set"
                            className="tm-table-set img-responsive"
                        />
                    </div>
                </section>
                <div className="tm-main-section light-gray-bg">
                    <div className="container" id="main">
                        <section className="tm-section row">
                            <div className="col-lg-12 tm-section-header-container margin-bottom-30">
                                <h2 className="tm-section-header gold-text tm-handwriting-font">
                                    <img src="img/logo.png" alt="Logo" className="tm-site-logo" />
                                    Our Menu Categories
                                </h2>
                                <div className="tm-hr-container">
                                    <hr className="tm-hr" />
                                </div>
                            </div>

                            <div className="row">
                                {/* SIDE MENU */}
                                <div className="col-lg-3 col-md-3">
                                    <div className="tm-position-relative-menupage">
                                        <nav className="tm-side-menupage">
                                            <ul>
                                                {categories.map((cat) => (
                                                    <li key={cat.id}>
                                                        <a
                                                            href="#"
                                                            className={activeCategoryId === cat.id ? "active" : ""}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setActiveCategoryId(cat.id);
                                                            }}
                                                        >
                                                            {cat.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                        <img src="img/vertical-menu-bg.png" alt="Menu bg" className="tm-side-menupage-bg" />
                                    </div>
                                </div>

                                {/* PRODUCTS */}
                                <div className="tm-menu-product-content col-lg-9 col-md-9" ref={(el) => categoryRefs.current[activeCategoryId] = el}>
                                    {filteredItems.length > 0 ? (
                                        filteredItems.map((item) => (
                                            <div className="tm-product-menupage" key={item.id}>
                                                <img src={item.image} alt={item.name} />
                                                <div className="tm-product-text-menupage">
                                                    <h3 className="tm-product-title-menupage">{item.name}</h3>
                                                    <p className="tm-product-description-menupage">{item.description}</p>
                                                </div>
                                                <div className="tm-product-price-menupage">
                            <a href="#" className="tm-product-price-link-menupage">
                              <span className="tm-product-price-currency-menupage">$</span>
                              {item.price}
                            </a>
                          </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No items available in this category.</p>
                                    )}
                                </div>

                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;
