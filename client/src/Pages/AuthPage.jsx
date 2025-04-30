import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = ({ mode = "login" }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        mode === "register"
          ? "http://localhost:5000/api/auth/register"
          : "http://localhost:5000/api/auth/login";
      const res = await axios.post(endpoint, form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <motion.div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-green-700 mb-4 text-center">
            {mode === "register"
              ? "Create Account"
              : mode === "forgot"
                ? "Reset Password"
                : "Login"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            )}
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            {(mode === "login" || mode === "register") && (
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            )}
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white">
              {mode === "register"
                ? "Register"
                : mode === "forgot"
                  ? "Send Reset Link"
                  : "Login"}
            </button>
          </form>
          <div className="mt-4 text-xs text-center text-gray-600">
            {mode === "login" && (
              <>
                <p>
                  No account?{" "}
                  <Link to="/register" className="text-green-700 underline">
                    Register
                  </Link>
                </p>
                <p>
                  Forgot password?{" "}
                  <Link to="/forgot" className="text-green-700 underline">
                    Reset
                  </Link>
                </p>
              </>
            )}
            {mode === "register" && (
              <p>
                Have an account?{" "}
                <Link to="/login" className="text-green-700 underline">
                  Login
                </Link>
              </p>
            )}
            {mode === "forgot" && (
              <p>
                Remember password?{" "}
                <Link to="/login" className="text-green-700 underline">
                  Back to Login
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthPage;
