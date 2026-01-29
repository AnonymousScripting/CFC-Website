import { useState } from "react";
import axios from "../axios/axiosInstance";
import toast from "react-hot-toast";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    //  Check if email is empty
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/auth/forgot-password", { email });
      setSuccess(res.data.message || "Password reset instructions sent!");
      toast.success(res.data.message || "Password reset instructions sent!");
      setEmail("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 px-6 shadow-4xl">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md ">
        <h2 className="text-4xl font-extrabold mb-6 text-center font-playfair text-[#262626]">Forgot Password</h2>
        <p className="text-sm font-medium mb-6 text-center font-montserrat text-[#737373] leading-relaxed max-w-sm mx-auto">
          Enter your email address and we'll send you instructions to reset your
          password.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-[#212121] font-montserrat leading-none block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#212121] px-4 py-2 rounded focus:border-[#c7a462] focus:outline-none font-montserrat"
              placeholder="Enter your email"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#c8a76f] text-white font-montserrat font-semibold px-6 py-3 w-full rounded cursor-pointer transition duration-300 hover:filter hover:saturate-150 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </section>
  );
}
