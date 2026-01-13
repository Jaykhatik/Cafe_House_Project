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
  Phone
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
        {/* LEFT */}
        <div className="cafe-auth-left">
          <Coffee size={42} />
          <h1>Cafe House</h1>
          <p>
            {isLogin
              ? "Sip, relax and continue your journey with us."
              : "Join Cafe House and enjoy handcrafted flavors every day."}
          </p>
        </div>

        {/* RIGHT */}
        <div className="cafe-auth-right">
          <h2>{isLogin ? "Sign In" : "Create Account"}</h2>

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
                    placeholder="Phone"
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
                placeholder="Email"
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
                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>
            )}

            <button disabled={isLoading}>
              {isLoading ? "Brewing..." : isLogin ? "Sign In" : "Sign Up"}
              <ArrowRight />
            </button>
          </form>

          <p className="cafe-toggle">
            {isLogin ? "New here?" : "Already a member?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Create account" : " Sign in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CafeAuth;
