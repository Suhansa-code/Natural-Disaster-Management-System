import React from "react";

import { Link } from "react-router-dom";
import Logo from "./Logo";
import logo from "../assets/artisan-White.png";

const social = [
  {
    name: "Instagram",
    link: "https://instagram.com",
  },
  {
    name: "Facebook",
    link: "https://facebook.com",
  },
  {
    name: "Youtube",
    link: "https://youtube.com",
  },
  {
    name: "Tiktok",
    link: "https://tiktok.com",
  },
];

const navigation = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Product list",
    link: "/product-list",
  },
  {
    name: "About us",
    link: "/aboutus",
  },
  {
    name: "Contact us",
    link: "/contactus",
  },
];
export default function Footer() {
  return (
    <footer className="bg-secondary-100 rounded-t-xl mx-2 text-white py-12 px-8 text-[25px] mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="flex flex-col  md:w-1/2  items-center ">
          {/* <Logo colour={"ffffff"} /> */}
          <img src={logo} alt="" className="w-64 my-4" />

          <p className=" w-full h-fit  md:px-6 text-left text-4xl md:text-6xl  font-semibold leading-relaxed">
            Legacy in Every Detail,
          </p>
          <p className="w-full h-fit  md:px-6 text-right text-4xl md:text-6xl   font-semibold leading-relaxed">
            Luxury in Every Piece.
          </p>
        </div>

        {/* Center Section */}
        <div className="mt-8 md:mt-0 flex flex-col items-center md:items-start font-secondaryFont">
          <h3 className="text-md font-semibold mb-4">Navigate</h3>
          <ul className="space-y-2 text-sm">
            {navigation.map((item, index) => (
              <li key={index}>
                <Link to={item.link} className="hover:underline text-[20px]">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="mt-8 md:mt-0 flex flex-col justify-center items-center  font-secondaryFont">
          <h3 className="text-md tracking-wider font-semibold mb-4">
            Social Media
          </h3>
          <ul className="space-y-2 text-sm">
            {social.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className="hover:underline text-[20px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-white/40 pt-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
          <p className="text-[20px]">© 2024 Copyright AllRights reserved</p>
          <div className="flex space-x-8 mt-2 md:mt-0 text-[20px]">
            <a href="/terms" className="hover:underline">
              Terms of services
            </a>
            <a href="/privacy-policy" className="hover:underline">
              Privacy policy
            </a>
            <a href="/cookies" className="hover:underline">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
