import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const ContactUs = () => {
  useEffect(() => {
    document.title = "Bespoke Furniture | Contact Us";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_w7393o8", // Replace with your service ID
        "template_ykhywtk", // Replace with your template ID
        e.target,
        "KJtGrBrUTsRjUbTWs" // Replace with your user ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response);
          toast.success("Your message has been sent successfully!");
          handleClear();
        },
        (error) => {
          console.log("FAILED...", error);
          toast.error(
            "There was an issue sending your message. Please try again later."
          );
        }
      );
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-8 mt-10">
      <div className="mx-auto max-w-[1200px] text-center">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
          {/* Left Section */}
          <motion.div
            className="flex flex-col my-10 lg:w-1/2 px-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-[30px] sm:text-[40px] lg:text-[50px] max-w-[90vw] lg:max-w-[42vw] text-left">
              We are here to assist you with every detail, ensuring your
              questions are answered and your bespoke journey is seamless.
            </h1>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-10 px-4 sm:px-0 mt-10">
              <div className="flex flex-col gap-4 text-left">
                <span className="text-[20px] font-bold">Call Center</span>
                <span className="text-[18px]">+94 777 866 400</span>
              </div>

              <div className="flex flex-col gap-4 text-left">
                <span className="text-[20px] font-bold">Email</span>
                <span className="text-[18px]">
                  info@artisanbespokefurniture.com
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-10 px-4 sm:px-0 mt-10">
              <div className="flex flex-col gap-4 text-left">
                <span className="text-[20px] font-bold">Our Location</span>
                <span className="text-[18px]">
                  No 4, Sangabo Mawatha, <br />
                  Borupana, <br />
                  Rathmalana, <br />
                  Sri Lanka
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-[20px] font-bold">Social Networks</span>
                <div className="flex gap-4 justify-center sm:justify-start">
                  {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                    (Icon, index) => (
                      <a
                        key={index}
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center bg-gray-200 p-2 rounded-full shadow-none hover:bg-brown-300 transition-all duration-300 transform hover:scale-110"
                      >
                        <Icon className="w-full h-full text-secondary-100" />
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Section - Contact Form */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-[24px] sm:text-[30px] font-bold text-gray-800 mb-6">
              Connect with us
            </h1>
            <p className="text-[18px] text-gray-600 mb-6 px-4 sm:px-10">
              Each piece we create carries a story—yours. Share your dreams with
              us, and our artisans will shape them into timeless designs crafted
              exclusively for your space.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 sm:px-0">
                <div className="flex flex-col">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#533B30]"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#533B30]"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col px-4 sm:px-0">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#533B30]"
                  placeholder="Enter the subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-6 flex flex-col px-4 sm:px-0">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#533B30]"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 text-[18px] px-4 sm:px-0">
                <button
                  type="button"
                  className="mt-6 w-full sm:w-[150px] py-2 h-10 text-[#533B30] border-[1.5px] border-[#7a6358] bg-white font-semibold rounded-[20px] shadow-md hover:bg-[#e2e2e2] focus:outline-none focus:ring-2 focus:ring-[#533B30]"
                  onClick={handleClear}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="mt-6 w-full sm:w-[150px] py-2 h-10 bg-[#533B30] text-white font-semibold rounded-[20px] shadow-md hover:bg-[#3e2c21] focus:outline-none focus:ring-2 focus:ring-[#533B30]"
                >
                  Send a Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Office Address & Map */}
        <div className="m-auto mt-20 px-4 sm:px-0">
          <div className="relative gap-12 rounded-[30px] overflow-hidden">
            <div className="h-72 shadow-xl">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1177.7992918831608!2d79.89384998082775!3d6.814921759072289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25acad07727f1%3A0xd9c2ecfad99ba16d!2s4%20Sangabo%20Mawatha%2C%20Moratuwa!5e0!3m2!1sen!2slk!4v1736059575066!5m2!1sen!2slk"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-0 bg-[#533b30b0] w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
