import React, { useState } from "react";
import { Profile_Avatar } from "./Profile_Avatar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { IoMdLogIn } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for hamburger menu

function Navbar() {
  const user = useSelector((state) => state.Auth.user); // Get user from Redux state
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling the menu

  const handleCartClick = () => {
    if (!user) {
      navigate("/login"); // Redirect to login if user is not authenticated
    } else {
      navigate("/cart"); // Navigate to cart if user is authenticated
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="absolute z-30 w-full backdrop-blur-[10px] bg-[#ffffff46] top-0 left-0 flex flex-row justify-between py-2 items-center px-5 md:px-20">
      <img
        src={logo}
        alt="logo"
        className="w-auto h-10 object-cover hover:cursor-pointer hover:scale-[1.05] transition-all duration-500"
        draggable="false"
      />

      {/* Hamburger icon for mobile */}
      <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-row gap-20 2xl:text-[22px] lg:text-[20px] py-5 text-[#533B30] font-normal cursor-pointer">
        <Link to="/" className="hover:scale-[1.15] transition-all duration-300">
          Home
        </Link>
        <Link
          to="/product-list"
          className="hover:scale-[1.15] transition-all duration-300"
        >
          Product Listing
        </Link>
        <Link
          to="/aboutus"
          className="hover:scale-[1.15] transition-all duration-300"
        >
          About Us
        </Link>
        <Link
          to="/contactus"
          className="hover:scale-[1.15] transition-all duration-300"
        >
          Contact Us
        </Link>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden flex flex-col gap-5 py-5 px-5 text-[#533B30] font-normal">
          <Link
            to="/"
            className="hover:scale-[1.1] transition-all duration-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/product-list"
            className="hover:scale-[1.1] transition-all duration-300"
            onClick={toggleMenu}
          >
            Product Listing
          </Link>
          <Link
            to="/aboutus"
            className="hover:scale-[1.1] transition-all duration-300"
            onClick={toggleMenu}
          >
            About Us
          </Link>
          <Link
            to="/contactus"
            className="hover:scale-[1.1] transition-all duration-300"
            onClick={toggleMenu}
          >
            Contact Us
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
