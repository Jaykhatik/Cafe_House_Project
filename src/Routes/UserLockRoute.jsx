import { Navigate } from "react-router-dom";

const UserLockRoute = ({ children }) => {
  const userToken = sessionStorage.getItem("token");

  // If user already logged in → block auth page
  if (userToken === "user_logged_in") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserLockRoute;
