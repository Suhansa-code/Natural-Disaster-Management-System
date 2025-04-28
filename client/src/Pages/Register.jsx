import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import { BackgroundBeams } from "../Components/ui/background-beams";
import axios from "axios";
import toast from "react-hot-toast";
import bgimage from "../assets/map3.png";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        phone,
        password,
      });

      toast.success("Registration successful!");
      // Redirect after short delay
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      // Show error toast
      const errorMsg =
        err.response?.data?.message || "Registration failed. Try again.";
      toast.error(errorMsg);

      // Reset only password fields
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
    }
  };

  return (
    <div className=" min-h-screen relative overflow-hidden bg-gray-900">
      <img
        src={bgimage}
        alt=""
        className="absolute  w-full h-full object-cover "
      />
      <BackgroundBeams className="z-20 bg-white " />

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
      <div className="min-h-screen  z-20 flex items-center justify-center px-4 relative min-w-[450px]">
        <div className="w-full max-w-md">
          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 relative"
          >
            <div className="text-center">
              <ShieldCheck className="mx-auto h-12 w-12 text-green-600 -my-3" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Create Account
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Join the Disaster Response Network
              </p>
            </div>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-10 w-full px-3 py-2 h-[38px] text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                    placeholder="Full Name"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute  left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10 w-full px-3 py-2 border h-[38px] text-[14px]  border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                    placeholder="Email address"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute  z-10 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="pl-10 w-full px-3 py-2 border h-[38px] text-[14px]  border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute  z-10 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pl-10 w-full px-3 py-2 border h-[38px] text-[14px]  border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                    placeholder="Password"
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
                  <Lock className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword1 ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="pl-10 w-full px-3 py-2 border h-[38px] text-[14px]  border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                    placeholder="Confirm Password"
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
              </div>

              <button
                type="submit"
                className="w-full  flex justify-center py-2 px-4  border border-transparent rounded-lg shadow-sm text-sm font-normal text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Create Account
              </button>

              <p className="text-center text-sm text-gray-600 ">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-normal text-green-600 hover:text-green-500 transition-colors "
                >
                  Sign in
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Register;
