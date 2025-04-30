import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { BackgroundBeams } from "../Components/ui/background-beams";
import { useSearchParams } from "react-router-dom";
import bgimage from "../assets/map3.png";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        password,
      });

      setSuccess(true);
      toast.success("Password reset successful!");
      setTimeout(() => {
        navigate("/login");
      }, 3000); // 3 seconds
    } catch (error) {
      toast.error("Failed to reset password");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 relative">
      <img
        src={bgimage}
        alt=""
        className="absolute w-full h-full object-cover "
      />
      <BackgroundBeams />

      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-green-900/10 pointer-events-none" />

      <div className="flex justify-center items-center w-full z-10 px-4 min-w-[450px]">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/95 backdrop-blur-sm shadow-xl rounded-xl p-8"
          >
            <div className="text-center">
              <ShieldCheck className="mx-auto h-12 w-12 text-green-600" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                Reset Password
              </h2>
              <p className="text-sm text-gray-600">for {email}</p>
            </div>

            <form onSubmit={handleReset} className="mt-6 space-y-5">
              <div className="relative">
                <Lock className="absolute left-3 z-10 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 py-2 w-full border h-[38px] text-[14px] outline-none border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 bg-white/80 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {!showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 z-10 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword1 ? "text" : "password"}
                  required
                  placeholder="Re-enter Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 py-2 w-full border h-[38px] text-[14px] border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-green-500 bg-white/80 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword1((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {!showPassword1 ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 text-white font-normal bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                Reset Password
              </button>
            </form>
            {success && (
              <div className="text-center mt-6">
                <p className="text-green-600 font-medium">
                  🎉 Your password has been reset successfully!
                </p>
                <p className="text-sm text-gray-600">Redirecting to login...</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
