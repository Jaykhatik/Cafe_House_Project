import { Navigate, useLocation } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token"); // 🔄 changed
  const location = useLocation();

  if (token !== "user_logged_in") {
    return (
      <Navigate
        to="/authentication"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default UserProtectedRoute;
