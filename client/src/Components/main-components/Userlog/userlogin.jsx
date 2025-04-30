import React, { useState } from "react";
import "./UserLogin.css"; // Import the CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function UserLogin() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Initialize navigate function

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page refresh
    // Perform authentication logic here if needed
    if (username.toLowerCase() === "admin" && password === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/home"); // Navigate to home page
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login Here </h1>

        <form>
          {/* Email Field */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="Enter your email"
              required
              onChange={(e) => setusername(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn" onClick={handleLogin}>
            Log In
          </button>
        </form>

        {/* Forgot password link */}
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>

        {/* Sign up link */}
        <div className="signup-link">
          <p>
            Don't have an account? <a href="#">Sign Up</a>
          </p>
        </div>

        {/* Animated Quote */}
        <div className="quote-container">
          <p className="quote">
            “Effective disaster management requires swift action and clear
            communication.”
          </p>
        </div>
      </div>
    </div>
  );
}
