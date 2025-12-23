import React from 'react'

function Footer() {
    return (
        <>
            <div>

                <div className="tm-black-bg">
                    <div className="container">

                        <div className="row margin-bottom-60">

                            {/* MAIN MENU */}
                            <nav className="col-lg-3 col-md-3 tm-footer-nav tm-footer-div">
                                <h3 className="tm-footer-div-title">Quick Links</h3>
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Our Menu</a></li>
                                    <li><a href="#">Specials</a></li>
                                    <li><a href="#">Gallery</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                </ul>
                            </nav>

                            {/* ABOUT CAFE */}
                            <div className="col-lg-5 col-md-5 tm-footer-div">
                                <h3 className="tm-footer-div-title">About Cafe House</h3>
                                <p className="margin-top-15">
                                    Cafe House is your perfect spot for premium coffee, handcrafted beverages,
                                    and freshly made bakery treats. We believe in delivering warmth, comfort,
                                    and unforgettable flavors in every cup.
                                </p>
                                <p className="margin-top-15">
                                    From cozy ambience to delightful food, we bring you the café experience
                                    you’ll love to return to—every single day.
                                </p>
                            </div>

                            {/* SOCIAL MEDIA */}
                            <div className="col-lg-4 col-md-4 tm-footer-div">
                                <h3 className="tm-footer-div-title">Connect With Us</h3>
                                <p>Follow us on social media to stay updated on offers, events & new arrivals.</p>

                                <div className="tm-social-icons-container">
                                    <a href="#" className="tm-social-icon"><i className="fa fa-facebook" /></a>
                                    <a href="#" className="tm-social-icon"><i className="fa fa-instagram" /></a>
                                    <a href="#" className="tm-social-icon"><i className="fa fa-twitter" /></a>
                                    <a href="#" className="tm-social-icon"><i className="fa fa-youtube" /></a>
                                    <a href="#" className="tm-social-icon"><i className="fa fa-map-marker" /></a>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                {/* COPYRIGHT */}
                <div>
                    <div className="container">
                        <div className="row tm-copyright">
                            <p className="col-lg-12 small copyright-text text-center">
                                © {new Date().getFullYear()} Cafe House — Crafted with Love & Coffee ☕
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Footer
