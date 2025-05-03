import React, { useState, useEffect, useRef, useContext } from "react";
import { useModal } from "../main-components/ModalContext";
import {
  Home,
  Info,
  CircleDollarSign,
  MessageCircleDashed,
  Settings,
  User,
  LogOut,
  UserCircle,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import default_profile from "../../assets/profile.png";

function Navbar() {
  const { isModalOpen } = useModal();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Navbar Auto Hide Variable
  const [isVisible, setIsVisible] = useState(true);
  const hideTimerRef = useRef(null);
  const navbarAreaRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    // Hide navbar after 3 seconds
    const hideTimer = setTimeout(() => setIsVisible(false), 3000);
    hideTimerRef.current = hideTimer;

    // Close dropdown if clicking outside
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    // Set scroll state
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      clearTimeout(hideTimer);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(hideTimerRef.current);
    if (isModalOpen) return; // Don't show navbar if modal is open
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    hideTimerRef.current = setTimeout(() => setIsVisible(false), 2000);
  };

  const navItems =
    user?.role === "admin"
      ? [
          {
            name: "Dashboard",
            link: "/admin/Dashboard",
            icon: <LayoutDashboard className="w-4 h-4" />,
          },
          {
            name: "Disaster",
            link: "/admin/Disaster",
            icon: <CircleDollarSign className="w-4 h-4" />,
          },
          {
            name: "Funding",
            link: "/admin/payments",
            icon: <CircleDollarSign className="w-4 h-4" />,
          },
          {
            name: "User Management",
            link: "/User-management",
            icon: <Users className="w-4 h-4" />,
          },
          {
            name: "Community",
            link: "/admin/posts",
            icon: <MessageCircleDashed className="w-4 h-4" />,
          },
        ]
      : [
          { name: "Home", link: "/", icon: <Home className="w-4 h-4" /> },
          {
            name: "Disaster",
            link: "/Disaster",
            icon: <Info className="w-4 h-4" />,
          },
          {
            name: "Funding",
            link: "/Funding",
            icon: <CircleDollarSign className="w-4 h-4" />,
          },
          {
            name: "Community",
            link: "/Community",
            icon: <MessageCircleDashed className="w-4 h-4" />,
          },
        ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      ref={navbarAreaRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed top-0 left-0 right-0 m-auto w-[600px]  h-[20px] z-[60]"
    >
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl 
    transform transition-all duration-500 ease-in-out 
    ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-95 pointer-events-none"} 
    ${isScrolled ? "bg-white/60 backdrop-blur-lg" : "bg-white/80 backdrop-blur-md"} 
    rounded-full shadow-lg shadow-gray-200/50 border border-white/50 z-50`}
      >
        <div className="px-4 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                Guardian Earth
              </span>
            </div>

            <div className="flex items-center">
              {/* Single Navigation */}
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveLink(item.name);
                      navigate(item.link);
                    }}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-all duration-200
                      ${
                        activeLink === item.name
                          ? "bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-500 font-medium"
                          : "text-gray-600 hover:bg-gray-100/50"
                      }`}
                  >
                    {item.icon}
                    <span className="hidden sm:inline text-sm">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
              <div className="h-5 w-px bg-gray-200 mx-2" />

              {isAuthenticated ? (
                // Profile Dropdown if user is authenticated
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="p-1.5 rounded-full hover:bg-gray-100/50 transition-colors duration-200"
                  >
                    <User className="w-4 h-4 text-emerald-600" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute   right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                      <div className="px-3 py-2 border-b border-gray-100 flex items-center space-x-3">
                        {/* Profile Image */}
                        <img
                          src={default_profile} // fallback to default image
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />

                        {/* User Info */}
                        <div className="flex flex-col text-left">
                          <p className="text-sm font-medium text-gray-800">
                            Hi, {user?.name}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {user?.role}
                          </p>
                        </div>
                      </div>

                      <button
                        className="w-full text-left px-4 py-2 text-sm  items-center gap-2 flex flex-row justify-start hover:bg-gray-100 transition rounded-md"
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate("/profile");
                        }}
                      >
                        <UserCircle className="w-4 h-4 text-gray-600 " />
                        <span>Profile</span>
                      </button>

                      <button
                        className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 flex-row justify-start text-red-600 hover:bg-red-50 transition rounded-md"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Sign In Button if user is not authenticated
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center space-x-1 h-[30px] px-3 py-1.5 rounded-full border border-emerald-500 text-emerald-600 text-sm font-normal hover:bg-emerald-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
