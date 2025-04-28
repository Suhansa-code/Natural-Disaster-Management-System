import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ShieldQuestion } from "lucide-react";
import { BackgroundBeams } from "../Components/ui/background-beams";
import axios from "axios";
import toast from "react-hot-toast";
import bgimage from "../assets/map3.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email,
        }
      );

      // Show success message if needed
      console.log("Success:", response.data.message);
      setSuccess(true);
    } catch (error) {
      console.error(
        "Error sending password reset email:",
        error.response?.data?.message || error.message
      );
      toast.error(
        "Error sending password reset email:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className=" min-h-screen relative overflow-hidden bg-gray-900">
      <img
        src={bgimage}
        alt=""
        className="absolute w-full h-full object-cover "
      />
      <BackgroundBeams />

      {/* Diagonal divider */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 40%)",
          background:
            "linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,50,0,0.3) 100%)",
        }}
      />

      {/* Content container */}
      <div className="min-h-screen flex items-center justify-center px-4 relative min-w-[450px]">
        <div className="w-full max-w-md">
          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 relative"
          >
            <div className="text-center">
              <ShieldQuestion className="mx-auto h-12 w-12 text-green-600" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Reset Password
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email to receive reset instructions
              </p>
            </div>

            {!submitted ? (
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border h-[38px] text-[14px] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                    placeholder="Email address"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-normal text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Send Reset Instructions
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="bg-green-50 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">
                  Check your email
                </h3>
                <p className="text-gray-600">
                  We've sent password reset instructions to {email}
                </p>
              </motion.div>
            )}

            <div className="text-center mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center -mt-4 py-2 px-4 border border-transparent rounded-lg shadow-sm text-[14px] font-normal text-green-600 border-green-100 outline-none ring-0 bg-white hover:border-green-300  transition-colors"
              >
                Back to Sign in
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
