import React from "react";

function About() {
    return (
        <>
            {/* ================= WELCOME SECTION ================= */}
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
                            &nbsp;About Us&nbsp;&nbsp;
                            <img src="img/header-line.png" alt="Line" className="tm-header-line" />
                        </h2>

                        <h2 className="gold-text tm-welcome-header-2">Cafe House</h2>

                        <p className="gray-text tm-welcome-description">
                            Learn more about our journey, values, and what makes <span className="gold-text">Cafe House</span> special.
                        </p>

                        <a href="#main" className="tm-more-button tm-more-button-welcome">
                            Explore More
                        </a>
                    </div>

                    <img
                        src="img/table-set.png"
                        alt="Table Set"
                        className="tm-table-set img-responsive"
                    />
                </div>
            </section>

            {/* ================= ABOUT / HERO IMAGE ================= */}
            <div className="tm-main-section light-gray-bg" id="main">
                <div className="container">
                    <section className="tm-section row margin-bottom-60">
                        <div className="col-lg-12 tm-section-header-container margin-bottom-30">
                            <h2 className="tm-section-header gold-text tm-handwriting-font">
                                <img src="img/logo.png" alt="Logo" className="tm-site-logo" />
                                Our Story
                            </h2>
                            <div className="tm-hr-container">
                                <hr className="tm-hr" />
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-6 margin-bottom-30">
                                <img
                                    src="img/1.jpg"
                                    alt="Cafe"
                                    className="img-responsive shadow-img-menupage"
                                    style={{ borderRadius: "15px", width: "80%", height: "340px",objectFit:"cover" }}
                                />
                            </div>

                            <div className="col-lg-6 col-md-6">
                                <h3 className="tm-handwriting-font tm-about-title">
                                    Welcome to <span className="gold-text">Cafe House</span>
                                </h3>
                                <p>
                                    At Cafe House, we deliver more than just coffee — we create experiences.
                                    From freshly roasted beans to handcrafted desserts, our team ensures quality, creativity, and sustainability.
                                </p>
                                <p>
                                    Our cozy ambience, warm smiles, and attention to detail make every visit special.
                                </p>
                                <ul style={{ marginTop: "20px" }}>
                                    <li>☕ Freshly brewed coffees</li>
                                    <li>🍰 Handcrafted desserts</li>
                                    <li>🥗 Healthy snacks and beverages</li>
                                    <li>🏆 Quality and sustainable ingredients</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* ================= OUR VALUES ================= */}
                    <section className="tm-section row margin-bottom-60">
                        <div className="col-lg-12 tm-section-header-container margin-bottom-30">
                            <h2 className="tm-section-header gold-text tm-handwriting-font">
                                <img src="img/logo.png" alt="Logo" className="tm-site-logo" />
                                Our Values
                            </h2>
                            <div className="tm-hr-container">
                                <hr className="tm-hr" />
                            </div>
                        </div>

                        <div className="row">
                            {[
                                { icon: "☕", title: "Quality", desc: "We source only the finest ingredients." },
                                { icon: "💛", title: "Customer Care", desc: "We put our customers first." },
                                { icon: "🚀", title: "Innovation", desc: "Unique experiences through creativity." },
                                { icon: "🌱", title: "Sustainability", desc: "Eco-friendly practices daily." },
                                { icon: "🎨", title: "Creativity", desc: "Innovative drinks & desserts." }
                            ].map((value, idx) => (
                                <div key={idx} className="col-lg-4 col-md-6 margin-bottom-30">
                                    <div className="tm-values-card">
                                        <div className="tm-values-icon">{value.icon}</div>
                                        <h3>{value.title}</h3>
                                        <p>{value.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ================= OUR JOURNEY TIMELINE ================= */}
                    <section className="tm-section row margin-bottom-60">
                        <div className="col-lg-12 tm-section-header-container margin-bottom-30">
                            <h2 className="tm-section-header gold-text tm-handwriting-font">
                                <img src="img/logo.png" alt="Logo" className="tm-site-logo" />
                                Our Journey
                            </h2>
                            <div className="tm-hr-container">
                                <hr className="tm-hr" />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="timeline">
                                {[
                                    { year: "2015", title: "Humble Beginning", desc: "Cafe House opened its doors to serve the finest coffee." },
                                    { year: "2017", title: "Expanded Menu", desc: "Introduced handcrafted desserts and healthy drinks." },
                                    { year: "2020", title: "New Locations", desc: "Opened two more branches for more coffee lovers." },
                                    { year: "2023", title: "Modern Renovation", desc: "Updated interior and launched seasonal specials." }
                                ].map((item, idx) => (
                                    <div key={idx} className="timeline-item">
                                        <div className="timeline-year">{item.year}</div>
                                        <div className="timeline-content">
                                            <h4>{item.title}</h4>
                                            <p>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ================= TESTIMONIALS ================= */}
                    <section className="tm-section row margin-bottom-60">
                        <div className="col-lg-12 tm-section-header-container margin-bottom-30">
                            <h2 className="tm-section-header gold-text tm-handwriting-font">
                                <img src="img/logo.png" alt="Logo" className="tm-site-logo" />
                                Testimonials
                            </h2>
                            <div className="tm-hr-container">
                                <hr className="tm-hr" />
                            </div>
                        </div>

                        <div className="row">
                            {[
                                { name: "Sarah J.", text: "The coffee and ambiance are perfect! A must-visit cafe." },
                                { name: "John D.", text: "Amazing desserts and friendly staff. Highly recommend!" },
                                { name: "Emily R.", text: "Cafe House feels like a second home. Love it!" }
                            ].map((test, idx) => (
                                <div key={idx} className="col-lg-4 col-md-6 margin-bottom-30">
                                    <div className="tm-testimonial-card">
                                        <div className="tm-testimonial-text">“{test.text}”</div>
                                        <div className="tm-testimonial-author">— {test.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ================= CAFE MOTTO / CLOSING QUOTE ================= */}
                    <section className="tm-section row margin-bottom-60 tm-motto-section">
                        <div className="col-lg-12 text-center">
                            <div className="tm-motto-card">
                                <h3 className="tm-motto-text">
                                    "Bringing warmth, flavor, and joy to every cup."
                                </h3>
                                <p className="tm-motto-author">— Jay, Cafe House Founder</p>
                            </div>
                        </div>
                    </section>


                </div>
            </div>
        </>
    );
}

export default About;
