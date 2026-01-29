// import React, { useState, useEffect } from 'react';
// import { Eye, EyeOff } from 'lucide-react';

// export function ResetPassword({ token }) {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');

//   useEffect(() => {
//     try {
//       const decoded = JSON.parse(atob(token));
//       setEmail(decoded.email);
//       setOtp(decoded.otp);
//     } catch (err) {
//       console.error('Invalid token');
//     }
//   }, [token]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }
//     fetch('/api/reset-password', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, otp, password })
//     }).then(res => res.json()).then(data => {
//     });
//   };

//     return (
//         <section className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
//             <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
//                 <h2 className="text-2xl font-bold mb-6 text-center">Set New Password</h2>
//                 <form className="space-y-4" onSubmit={handleSubmit}>
//                     <div>
//                         <label className="block text-sm font-semibold mb-1">New Password</label>
//                         <div className="relative">
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 className="w-full border border-gray-300 p-2 rounded pr-10 focus:border-[#c7a462] focus:outline-none"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-3 text-gray-500 cursor-pointer">
//                                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                             </button>
//                         </div>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-semibold mb-1">Confirm Password</label>
//                         <div className="relative">
//                             <input
//                                 type={showConfirmPassword ? 'text' : 'password'}
//                                 className="w-full border border-gray-300 p-2 rounded pr-10 focus:border-[#c7a462] focus:outline-none"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                 className="absolute right-2 top-3 text-gray-500 cursor-pointer"
//                             >
//                                 {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                             </button>
//                         </div>
//                     </div>

//                     <button type="submit" className="bg-[#bfa268] text-white font-semibold px-6 py-3 w-full rounded cursor-pointer transition duration-300 hover:filter hover:saturate-150">
//                         Update Password
//                     </button>
//                 </form>
//             </div>
//         </section>
//     );
// }


import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from '../axios/axiosInstance'
import toast from "react-hot-toast";

export function ResetPassword() {
  const { token } = useParams(); // ✅ get token from route
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.patch("/auth/reset-password", {
        token,
        newPassword: password,
      });

      if (res.data?.success) {
        toast.success("Password has been updated successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error resetting password. Please try again.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-4xl font-extrabold mb-6 text-center font-playfair text-[#262626]">Set New Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base font-medium mb-1 text-[#404040] font-montserrat tracking-wide">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 px-4 py-2 rounded pr-10 focus:border-[#c7a462] focus:outline-none font-montserrat"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-3 text-gray-500 cursor-pointer font-montserrat"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-base font-medium mb-1 text-[#404040] font-montserrat tracking-wide">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full border border-gray-300 px-4 py-2 rounded pr-10 focus:border-[#c7a462] focus:outline-none font-montserrat"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-3 text-gray-500 cursor-pointer font-montserrat"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#c8a76f] text-white font-semibold px-6 py-3 w-full rounded cursor-pointer transition duration-300 hover:filter hover:saturate-150 flex justify-center items-center gap-2 font-montserrat"
          >
            Update Password
          </button>
        </form>
      </div>
    </section>
  );
}
