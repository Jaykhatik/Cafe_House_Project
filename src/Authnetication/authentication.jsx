import axios from "axios";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Authnetication/cssofauth/Authentication.css";


import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Coffee,
  ArrowRight,
  ArrowLeft,
  Phone,
  Github,
  Chrome
} from "lucide-react";

/* ================= BASE URL ================= */
const BASE_URL = "http://localhost:3002";

const CafeAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      /* ================= REGISTER ================= */
      if (!isLogin) {
        const { data: customers } = await axios.get(
          `${BASE_URL}/customers`
        );

        if (customers.some((u) => u.email === formData.email)) {
          toast.error("Email already registered");
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        const newUser = {
          id: "u_" + Date.now(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          status: "Active",
          registered: new Date().toISOString()
        };

        const { data } = await axios.post(
          `${BASE_URL}/customers`,
          newUser
        );

        localStorage.setItem("token", "user_logged_in");
        localStorage.setItem("userId", data.id);

        toast.success("Welcome to Cafe House ☕");
      }

      /* ================= LOGIN ================= */
      else {
        const { data: admin } = await axios.get(
          `${BASE_URL}/admin`
        );

        if (
          formData.email === admin.email &&
          formData.password === admin.password
        ) {
          localStorage.setItem("adminToken", "admin_logged_in");
          toast.success("Admin logged in");
          await delay(800);
          navigate("/admin");
          return;
        }

        const { data: user } = await axios.get(
          `${BASE_URL}/customers`,
          {
            params: {
              email: formData.email,
              password: formData.password
            }
          }
        );

        if (!user.length) {
          toast.error("Invalid credentials");
          return;
        }

        localStorage.setItem("token", "user_logged_in");
        localStorage.setItem("userId", user[0].id);

        toast.success("Welcome back ☕");
      }

      await delay(800);
      navigate(from, { replace: true });

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cafe-auth-page">
      <Link to="/" className="cafe-back-home">
        <ArrowLeft size={18} /> Back to Home
      </Link>

      <div className="cafe-auth-card">
        {/* LEFT INFO SIDE */}
        <div className="cafe-auth-left">
          <img
            src="img/authimg-removebg-preview.png"
            alt="Coffee illustration"
            className="cafe-auth-illustration"
          />
          <h1>Cafe House</h1>

          <p className="cafe-auth-desc">
            {isLogin
              ? "Welcome back! Sign in to continue exploring delicious brews, exclusive offers, and quick ordering."
              : "Create your Cafe House account and unlock a world of handcrafted coffee, exclusive discounts, and faster checkouts."}
          </p>

          <ul className="cafe-auth-features">
            <li>✔ Freshly brewed coffee & snacks</li>
            <li>✔ Easy online ordering</li>
            <li>✔ Secure & fast checkout</li>
          </ul>

          <p className="cafe-auth-note">
            Trusted by 10,000+ coffee lovers ❤️
          </p>

          <span className="cafe-auth-footer">
            Brewed with love at Cafe House
          </span>
        </div>

        {/* RIGHT FORM SIDE */}
        <div className="cafe-auth-right">
          <h2>{isLogin ? "Welcome Back" : "Create Your Account"}</h2>
          <p className="cafe-auth-subtitle">
            {isLogin
              ? "Sign in to continue your coffee journey"
              : "Join us and enjoy handcrafted flavors every day"}
          </p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="cafe-input">
                  <User />
                  <input
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="cafe-input">
                  <Phone />
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="cafe-input">
              <Mail />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                required
              />
            </div>

            <div className="cafe-input">
              <Lock />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>

            {!isLogin && (
              <div className="cafe-input">
                <Lock />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>
            )}


            {!isLogin && (
              <p className="cafe-terms">
                {/* By signing up, you agree to our Terms & Privacy Policy. */}
              </p>
            )}

            <button disabled={isLoading}>
              {isLoading
                ? "Brewing..."
                : isLogin
                  ? "Sign In"
                  : "Create Account"}
              <ArrowRight />
            </button>
              {isLogin && (
              <div className="cafe-forgot-links">
                <Link to="/forgot-password">Forgot Password?</Link>
                <span>•</span>
                <Link to="/forgot-account">Forgot Account?</Link>
              </div>
            )}
            <div className="cafe-divider">
              <span>OR</span>
            </div>

            <div className="cafe-social-buttons">
              <button type="button" className="google-btn">
                <Chrome size={18} />
                Continue with Google
              </button>

              <button type="button" className="github-btn">
                <Github size={18} />
                Continue with GitHub
              </button>
            </div>

          </form>

          <p className="cafe-toggle">
            {isLogin ? "New to Cafe House?" : "Already have an account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Create Account" : " Sign In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CafeAuth;