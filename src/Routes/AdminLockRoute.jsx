import { Navigate } from "react-router-dom";

const AdminLockRoute = ({ children }) => {
  const adminToken = sessionStorage.getItem("adminToken");

  if (adminToken) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AdminLockRoute;
