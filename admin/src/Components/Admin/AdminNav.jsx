import React from "react";
import {
  FaTh,
  FaClipboardList,
  FaBoxOpen,
  FaUser,
  FaBell,
} from "react-icons/fa";

import img from "../../assets/Logo.png";
import avatar from "../../assets/profile_img.webp";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { Profile_Avatar } from "../Profile_Avatar";

export default function AdminNav() {
  return (
    <nav className="flex items-center justify-between px-16 py-4 bg-primary text-secondary-100">
      {/* Logo */}
      <div className="flex items-center w-30 h-20">
        <Logo />
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-4 ">
        <Link to={"/admin/purchase-management"}>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-secondary-100 rounded-full hover:bg-secondary-100 hover:text-primary transition w-32 h-10 justify-center">
            <FaTh />
            Purchase
          </button>
        </Link>{" "}
        *
        <Link to={"/admin/inventory"}>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-secondary-100 rounded-full hover:bg-secondary-100 hover:text-primary transition w-32 h-10 justify-center">
            <FaClipboardList />
            Inventory
          </button>
        </Link>
        <Link to={"/admin/product"}>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-secondary-100 rounded-full hover:bg-secondary-100 hover:text-primary transition w-32 h-10 justify-center">
            <FaBoxOpen />
            Product
          </button>
        </Link>
        <Link to={"/admin/user-management"}>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-secondary-100 rounded-full hover:bg-secondary-100 hover:text-primary transition w-32 h-10 justify-center">
            <FaUser />
            Users
          </button>
        </Link>
      </div>

      {/* Notifications and User Profile */}
      <div className="flex items-center space-x-4 ">
        {/* Notification Icon */}
        <div className="relative">
          <button className="flex items-center justify-center w-10 h-10 bg-secondary-100 text-primary rounded-full">
            <FaBell />
          </button>
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        </div>

        {/* User Avatar */}

        <Profile_Avatar />
      </div>
    </nav>
  );
}
