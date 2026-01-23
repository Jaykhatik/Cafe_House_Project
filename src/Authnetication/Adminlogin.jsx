import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Authnetication/cssofauth/Authentication.css";
import { useEffect } from "react";


import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ArrowLeft
} from "lucide-react";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data: admin } = await axios.get(
                "http://localhost:3002/admin"
            );

            if (
                admin.length &&
                email === admin[0].email &&
                password === admin[0].password
            ) {
                sessionStorage.setItem("adminToken", "admin_logged_in");
                sessionStorage.setItem("adminEmail", admin[0].email);


                navigate("/admin", { replace: true });
            } else {
                alert("Invalid admin credentials");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        if (adminToken) {
            navigate("/admin", { replace: true });
        }
    }, [navigate]);

    return (
        <div className="cafe-auth-page">
            <Link to="/" className="cafe-back-home">
                <ArrowLeft size={18} /> Back to Home
            </Link>

            <div className="cafe-auth-card">
                {/* LEFT SIDE */}
                <div className="cafe-auth-left">
                    <img
                        src="/img/authimg-removebg-preview.png"
                        alt="Admin illustration"
                        className="cafe-auth-illustration"
                    />
                    <h1>Cafe House</h1>

                    <p className="cafe-auth-desc">
                        Admin access only. Please sign in to manage orders,
                        inventory, staff, and system settings.
                    </p>

                    <ul className="cafe-auth-features">
                        <li>✔ Secure admin dashboard</li>
                        <li>✔ Manage orders & users</li>
                        <li>✔ Real-time updates</li>
                    </ul>

                    <span className="cafe-auth-footer">
                        Admin Panel – Cafe House
                    </span>
                </div>

                {/* RIGHT SIDE */}
                <div className="cafe-auth-right">
                    <h2>Admin Login</h2>
                    <p className="cafe-auth-subtitle">
                        Sign in to access the dashboard
                    </p>

                    <form onSubmit={handleAdminLogin}>
                        <div className="cafe-input">
                            <Mail />
                            <input
                                type="email"
                                placeholder="Admin Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="cafe-input">
                            <Lock />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff /> : <Eye />}
                            </span>
                        </div>

                        <button disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Login"}
                            <ArrowRight />
                        </button>
                        <div className="admin-login-note">
                            <p><strong>Admin Credentials:</strong></p>
                            <p>Email: <span>admin@cafehouse.com</span></p>
                            <p>Password: <span>admin123</span></p>

                            <hr />

                            <p className="admin-route-note">
                                ⚠️ To access the admin panel, please login first by visiting
                                <strong> /admin-login </strong> from the browser or navbar.
                            </p>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
