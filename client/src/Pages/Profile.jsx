import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { User } from "lucide-react";

const Profile = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [profile, setProfile] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      axios
        .get("/api/users/me")
        .then((res) => {
          setProfile({
            name: res.data.name,
            email: res.data.email,
            password: "", // Don't show password
          });
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .put("/api/users/me", profile)
      .then((res) => {
        setMessage("Profile updated successfully.");
        setIsLoading(false);
      })
      .catch((err) => {
        setMessage("Failed to update profile.");
        setIsLoading(false);
        console.error(err);
      });
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <p className="text-center text-xl text-gray-700">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-2xl">
      {/* Profile Header */}
      <div className="flex items-center space-x-6 mb-8">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-white text-3xl">
          <User className="w-12 h-12" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">
            {profile.name}
          </h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>
      </div>

      {message && (
        <p className="mb-6 text-center text-green-600 font-medium">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Password (Leave blank to keep unchanged)
          </label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-6 text-white font-medium text-lg rounded-lg shadow-md transition duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
