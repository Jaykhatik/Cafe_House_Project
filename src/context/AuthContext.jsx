// AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        sessionStorage.getItem("token") === "user_logged_in"
    );

    const login = () => {
        sessionStorage.setItem("token", "user_logged_in");
        setIsLoggedIn(true);
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("customerEmail");
        sessionStorage.removeItem("customerName");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
