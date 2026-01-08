import React, { useState } from "react";
import "../pages/cssOfWebsite/auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="auth-page">
      <div className={`auth-box ${isLogin ? "login-mode" : ""}`}>

        {/* INFO PANEL */}
        <div className="auth-info-panel">
          <div className="floating-icons-panel">
            <span className="icon particle">🍵</span>
             <span className="icon particle">🫖</span>
            
            
          </div>
          <h1>Welcome to Age House</h1>
          <p>
            Discover premium products and enjoy a luxurious experience.  
            Join now for exclusive offers and best deals!
          </p>
        </div>

        {/* FORM PANEL */}
        <div className="auth-form-panel">
          <div className="floating-icons-panel">
             <span className="icon particle">🍵</span>
            <span className="icon particle">🍰</span>
            <span className="icon particle">🥐</span>
            
          </div>

          {!isLogin ? (
            <div className="auth-form signup-form fade-in">
              <h2>Create Account</h2>
              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
              <button className="submit-btn">Sign Up</button>

              <p className="auth-switch">
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)}>Login</span>
              </p>

              <div className="social-login">
                <p>Or sign up with</p>
                <div className="social-buttons">
                  <button className="google">Google</button>
                  <button className="facebook">Facebook</button>
                  <button className="apple">Apple</button>
                  <button className="linkedin">LinkedIn</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="auth-form login-form fade-in">
              <h2>Login</h2>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button className="submit-btn">Login</button>

              <p className="auth-switch">
                Don’t have an account?{" "}
                <span onClick={() => setIsLogin(false)}>Sign Up</span>
              </p>

              <div className="social-login">
                <p>Or login with</p>
                <div className="social-buttons">
                  <button className="google">Google</button>
                  <button className="facebook">Facebook</button>
                  <button className="apple">Apple</button>
                  <button className="linkedin">LinkedIn</button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Auth;
