import React from "react";
import img1 from "../assets/Collection/image1.png";
import img2 from "../assets/Collection/image2.png";
import img3 from "../assets/Collection/image3.png";
import img4 from "../assets/Collection/image4.png";
import img5 from "../assets/Collection/image5.png";
import img6 from "../assets/Collection/image6.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Collection_Card = () => {
  const variants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden and below
    visible: { opacity: 1, y: 0 }, // End visible and in place
  };

  return (
    <>
      <div className="flex flex-col px-5 justify-center items-center h-auto gap-0 overflow-hidden">
        {/* Header Text */}
        <motion.h1
          className="font-normal text-center text-[#533B30] 2xl:text-[80px] xl:text-[70px] lg:text-[60px] md:text-[50px] sm:text-[40px] text-[30px]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Transforming Timber into
          <br /> Timeless Masterpieces
        </motion.h1>

        {/* Second Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-center mt-10 items-center text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-normal text-[#533B30] md:text-[80px] sm:text-[50px] text-[40px]">
            We are
          </h1>
          <div className="hidden md:block h-[2px] bg-[#533B30] w-[20vw] mt-2 mx-4"></div>
          <h1 className="font-normal text-[#533B30] md:text-[80px] sm:text-[50px] text-[40px]">
            Artisans
          </h1>
        </motion.div>

        {/* Chair & Description */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mt-10">
          <motion.div
            className="rounded-[40px] overflow-hidden h-[50vh] w-full md:w-[30vw]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <img
              src={img1}
              alt="chair image"
              className="h-full w-full object-cover"
              draggable="false"
            />
          </motion.div>
          <motion.span
            className="font-normal text-[#533B30] text-left text-[20px] md:text-[45px] w-full md:w-[55vw] px-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            At Bespoke Furniture, we believe in the timeless beauty of
            craftsmanship and the art of storytelling through wood. Each of our
            creations is more than just furniture—it’s a masterpiece that
            embodies elegance, heritage, and unparalleled artistry.
          </motion.span>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-20">
          {[img2, img3, img4].map((image, index) => (
            <motion.div
              key={index}
              className="rounded-[40px] overflow-hidden h-[60vh] w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 + index * 0.5 }}
            >
              <img
                src={image}
                alt="furniture image"
                className="h-full w-full object-cover"
                draggable="false"
              />
            </motion.div>
          ))}
        </div>

        {/* Chair Image with Description */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-10 mx-5 md:mx-20 w-full mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="font-normal text-[#533B30] text-left text-[20px] md:text-[45px] w-full md:w-[40vw] px-5">
            Let this exquisite rattan armchair tell its story in your space.
            Crafted for elegance and comfort, it invites you to connect with
            timeless design. Have questions? Talk with us to find your perfect
            fit.
          </span>
          <div className="rounded-[40px] overflow-hidden h-[60vh] w-full md:w-[44vw]">
            <img
              src={img5}
              alt="chair image"
              className="h-full w-full object-cover"
              draggable="false"
            />
          </div>
        </motion.div>

        {/* Furniture Image with Description */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-10 mx-5 md:mx-20 w-full mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="rounded-[40px] overflow-hidden h-[60vh] w-full md:w-[44vw]">
            <img
              src={img6}
              alt="chair image"
              className="h-full w-full object-cover"
              draggable="false"
            />
          </div>
          <span className="font-normal text-[#533B30] text-left text-[20px] md:text-[45px] w-full md:w-[40vw] px-5">
            Experience luxury redefined with this hand-carved armchair, a
            testament to artistry and comfort. Its regal charm speaks
            volumes—let’s make it yours. Talk with us to bring it home.
          </span>
        </motion.div>

        {/* Talk with Us Title & Contact Button */}
        <div className="flex flex-col text-center text-[#533B30] text-[30px] md:text-[80px] justify-center items-center p-10 mb-10">
          <h1 className="font-normal">Talk with us</h1>
          <Link to="/contactus">
            <button className="bg-[#533B30] text-white rounded-[10px] hover:scale-105 transition-all duration-300 h-10 w-40 items-center gap-4 text-[22px] font-thin flex flex-row justify-center px-4 mt-5">
              Contact Us
              <div className="rounded-[50px] w-6 h-6 border-[2px] text-center justify-center items-center border-white flex flex-row content-center">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="self-center l-2 w-3 h-3 fa-light -rotate-45"
                />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Collection_Card;
