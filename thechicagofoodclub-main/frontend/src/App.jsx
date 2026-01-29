import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./componenets/Layout";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import AdminDashboard from "./pages/admin/dashboard";
import UserDashboard from "./pages/user/dashboard";
import ProtectedRoute from "./componenets/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermaOfService";
import CookiePolicy from "./pages/CookiePolicy";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function App() {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  // role check
  const userRole = !isAuthenticated
    ? null
    : currentUser?.isAdmin
    ? "admin"
    : "user";

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && currentUser?.isAdmin ? (
                <Navigate to="/admin" replace />
              ) : (
                <Home />
              )
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  );
}
