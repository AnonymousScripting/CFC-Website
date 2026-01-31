import React, { useState } from "react";
import axios from "../axios/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/user/userSlice";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/auth/change-password", {
        userId: currentUser.id,
        currentPassword,
        newPassword,
      });

      // Update user state to reflect password is no longer temporary
      dispatch(updateUser({ ...currentUser, isTemporaryPassword: false }));

      // Redirect to dashboard
      if (currentUser?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-6">
      <div className="bg-white p-8 rounded-md shadow-2xl w-full max-w-md">
        {/* Header Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#c8a76f] p-3 rounded-full">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold mb-2 text-center font-playfair text-[#262626]">
          Set Your Password
        </h2>
        <p className="text-base font-medium mb-6 text-center font-montserrat text-[#737373] leading-relaxed max-w-sm mx-auto">
          Welcome to Chicago Food Club! For your security, please create a new personal password.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Current Password */}
          <div>
            <label className="block text-base font-medium mb-1 text-[#404040] font-montserrat tracking-wide">
              Temporary Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                className="w-full border border-gray-300 px-4 py-2 rounded pr-10 focus:border-[#c7a462] focus:outline-none font-montserrat"
                value={currentPassword}
                required
                placeholder="Enter password from email"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-2 top-3 text-gray-500 cursor-pointer"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-base font-medium mb-1 text-[#404040] font-montserrat tracking-wide">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="w-full border border-gray-300 px-4 py-2 rounded pr-10 focus:border-[#c7a462] focus:outline-none font-montserrat"
                value={newPassword}
                required
                placeholder="Create a strong password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-2 top-3 text-gray-500 cursor-pointer"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-base font-medium mb-1 text-[#404040] font-montserrat tracking-wide">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full border border-gray-300 px-4 py-2 rounded pr-10 focus:border-[#c7a462] focus:outline-none font-montserrat"
                value={confirmPassword}
                required
                placeholder="Confirm your new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-3 text-gray-500 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="text-xs text-gray-500 font-montserrat">
            <p>Password must:</p>
            <ul className="list-disc list-inside ml-2">
              <li>Be at least 8 characters long</li>
              <li>Be different from your temporary password</li>
            </ul>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#c8a76f] text-white font-semibold px-6 py-3 w-full rounded cursor-pointer transition duration-300 hover:filter hover:saturate-150 flex justify-center items-center gap-2 font-montserrat"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Set New Password"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ChangePassword;
