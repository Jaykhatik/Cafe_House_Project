import React from 'react'

function Contact() {
    return (
        <>
            <div>
                {/* HERO / HEADER SECTION */}
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
                                &nbsp;Get in Touch&nbsp;&nbsp;
                                <img src="img/header-line.png" alt="Line" className="tm-header-line" />
                            </h2>

                            <h2 className="gold-text tm-welcome-header-2">Cafe House</h2>

                            <p className="gray-text tm-welcome-description">
                                We'd love to hear from you! Whether you have a question, feedback, or simply want to say hello,
                                our team at <span className="gold-text">Cafe House</span> is always ready to help.
                                Drop us a message and we’ll get back to you shortly.
                            </p>

                            <a href="#main" className="tm-more-button tm-more-button-welcome">Message Us</a>
                        </div>

                        <img src="img/table-set.png" alt="Table Set" className="tm-table-set img-responsive" />
                    </div>
                </section>

                {/* MAIN SECTION */}
                <div className="tm-main-section light-gray-bg">
                    <div className="container" id="main">

                        <section className="tm-section row">
                            <h2 className="col-lg-12 margin-bottom-30 gold-text tm-handwriting-font">
                                Send Us a Message
                            </h2>

                            <form action="#" method="post" className="tm-contact-form">

                                {/* CONTACT FORM LEFT */}
                                <div className="col-lg-6 col-md-6">

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="contact_name"
                                            className="form-control"
                                            placeholder="Your Full Name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="email"
                                            id="contact_email"
                                            className="form-control"
                                            placeholder="Your Email Address"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="contact_subject"
                                            className="form-control"
                                            placeholder="Message Subject"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <textarea
                                            id="contact_message"
                                            className="form-control"
                                            rows={6}
                                            placeholder="Write your message here..."
                                        ></textarea>
                                    </div>

                                    <div className="form-group">
                                        <button className="tm-more-button" type="submit" name="submit">
                                            Send Message
                                        </button>
                                    </div>

                                </div>

                                {/* MAP RIGHT */}
                                <div className="col-lg-6 col-md-6">
                                    <div className="contact-map-info">
                                        <h3 className="gold-text tm-handwriting-font">Find Us</h3>
                                        <p className="gray-text">
                                            Visit our cafe or reach us directly through the form.  
                                            We're located in the heart of town — easily accessible and cozy!
                                        </p>
                                        <div id="google-map"></div>
                                    </div>
                                </div>

                            </form>
                        </section>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
