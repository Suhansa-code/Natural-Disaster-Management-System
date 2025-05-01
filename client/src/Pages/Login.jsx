import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock, Eye, EyeOff, Check } from "lucide-react";
import { BackgroundBeams } from "../Components/ui/background-beams";
import axios from "axios";
import toast from "react-hot-toast";
import bgimage from "../assets/map3.png";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save token to localStorage or context
      localStorage.setItem("token", res.data.token);
      const { token, user } = res.data;
      login(token, user);
      // Redirect or show success

      toast.success("Login successful", res.data);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error("Login error:", err.response?.data || err.message);
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
              <ShieldCheck className="mx-auto h-12 w-12 text-green-600" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to your account
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="email"
                      name="username"
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 pr-3 py-2 w-full border h-[38px] text-[14px] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                      placeholder="Email or Username"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute z-10  left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 w-full px-3 py-2 border h-[38px] text-[14px] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {!showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>{" "}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 relative">
                  {/* Hidden Checkbox */}
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="peer  hidden"
                  />
                  {/* Custom Checkbox UI */}
                  <label
                    htmlFor="remember-me"
                    className="w-5 h-5 inline-flex items-center justify-center rounded-md border border-gray-300 peer-checked:border-green-500 peer-checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                  >
                    <Check className="w-4 h-4 z-10 text-white  peer-checked:block" />
                  </label>

                  {/* Label Text */}
                  <span className="text-sm text-gray-900">Remember me</span>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-[14px]  font-normal text-green-600 hover:text-green-500 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Sign in
              </button>

              <p className="mt-2 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-normal text-green-600 hover:text-green-500 transition-colors"
                >
                  Register here
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;
