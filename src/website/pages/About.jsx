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
                                    src="img/abou-hero-img-removebg-preview.png"
                                    alt="Cafe"
                                    className="img-responsive shadow-img-menupage"
                                    style={{ borderRadius: "15px", width: "80%", height: "340px", objectFit: "cover" }}
                                />
                            </div>

                            <div className="col-lg-6 col-md-6">
                                <h3 className="tm-handwriting-font tm-about-title">
                                    Welcome to <span className="gold-text">Cafe House</span>
                                </h3>
                                <p>
                                    Cafe House is more than a café — it’s a place where passion meets perfection.
                                    From freshly roasted coffee beans to handcrafted desserts, every detail is
                                    thoughtfully curated to deliver an unforgettable experience.
                                </p>

                                <p>
                                    Our warm ambiance, friendly team, and commitment to quality create a cozy
                                    space where conversations flow and moments are celebrated.
                                </p>
                                <ul style={{ marginTop: "20px", listStyle:"none"  }}>
                                    <li style={{marginBottom:"5px"}}>☕ Expertly brewed specialty coffees</li>
                                    <li style={{marginBottom:"5px"}}>🍰 Freshly prepared artisanal desserts</li>
                                    <li style={{marginBottom:"5px"}}>🥗 Wholesome snacks & refreshing beverages</li>
                                    <li>🏆 Premium, sustainable ingredients</li>
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
                                {
                                    icon: "☕",
                                    title: "Uncompromised Quality",
                                    desc: "Every cup is crafted using premium beans and expert techniques."
                                },
                                {
                                    icon: "💛",
                                    title: "Customer First",
                                    desc: "We believe great service creates lasting relationships."
                                },
                                {
                                    icon: "🚀",
                                    title: "Innovation",
                                    desc: "We constantly experiment with flavors, designs, and experiences."
                                },
                                {
                                    icon: "🌱",
                                    title: "Sustainability",
                                    desc: "Responsible sourcing and eco-friendly practices guide us."
                                },
                                {
                                    icon: "🎨",
                                    title: "Creativity",
                                    desc: "From presentation to taste, creativity defines everything we serve."
                                }
                            ]
                                .map((value, idx) => (
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
                                    {
                                        year: "2015",
                                        title: "The Beginning",
                                        desc: "Cafe House began with a simple dream — serving authentic coffee with heart."
                                    },
                                    {
                                        year: "2017",
                                        title: "Menu Expansion",
                                        desc: "We introduced handcrafted desserts and signature beverages."
                                    },
                                    {
                                        year: "2020",
                                        title: "Growing Together",
                                        desc: "Expanded to new locations while maintaining our core values."
                                    },
                                    {
                                        year: "2023",
                                        title: "A Modern Touch",
                                        desc: "Revamped our interiors and launched seasonal specialties."
                                    }
                                ]
                                    .map((item, idx) => (
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
                                {
                                    name: "Sarah J.",
                                    text: "Cafe House offers the perfect blend of taste, comfort, and atmosphere."
                                },
                                {
                                    name: "John D.",
                                    text: "Exceptional coffee, delightful desserts, and welcoming staff every time."
                                },
                                {
                                    name: "Emily R.",
                                    text: "It’s my favorite place to relax, work, and enjoy great coffee."
                                }
                            ]
                                .map((test, idx) => (
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
                                    "Crafting moments of warmth, flavor, and happiness in every cup."
                                </h3>
                                <p className="tm-motto-author">— Jay, Founder of Cafe House</p>
                            </div>
                        </div>
                    </section>


                </div>
            </div>
        </>
    );
}

export default About;
