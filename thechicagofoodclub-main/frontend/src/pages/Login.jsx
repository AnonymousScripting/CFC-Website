import React, { useState, useEffect } from "react";
import axios from "../axios/axiosInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      const userData = res?.data?.data;
      const token = res?.data?.token;

      dispatch(loginSuccess({ user: userData, token }));

      if (userData?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 px-6 shadow-4xl">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md shadow-2xl">
        <h2 className="text-4xl font-extrabold mb-6 text-center font-playfair text-[#262626]">Member Access</h2>
         <h2 className="text-lg font-medium mb-6 text-center font-montserrat text-[#737373] leading-relaxed max-w-sm mx-auto">Welcome back to your exclusive culinary sanctuary</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base font-medium mb-1 text-[#404040] font-montserrat tracking-wide">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
              className="w-full border border-gray-300 px-4 py-2 text-base rounded focus:border-[#c7a462] focus:outline-none font-montserrat"
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-1 text-[#404040] font-montserrat tracking-wide">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 px-4 py-2 rounded pr-10 focus:border-[#c7a462] focus:outline-none font-montserrat"
                value={password}
                required
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-3 text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm float-right">
            <a
              href="/forgot-password"
              className="text-[#c8a76f] hover:underline float-right font-montserrat"
            >
              Forgot Password?
            </a>
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
              "Login"
            )}
          </button>

        </form>
      </div>
    </section>
  );
}
