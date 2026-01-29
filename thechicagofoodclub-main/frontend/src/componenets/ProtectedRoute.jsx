import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  // If not authenticated, role must be null
  const userRole = !isAuthenticated
    ? null
    : currentUser?.isAdmin
    ? "admin"
    : "user";

  if (!isAuthenticated || userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
