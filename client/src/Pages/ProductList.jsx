import React, { useEffect } from "react";
import coverImg from "../assets/images/img13.png";
import Products from "../Components/Products";
import { motion } from "framer-motion";

export default function ProductList() {
  //Change Document Title
  useEffect(() => {
    document.title = "Bespoke Furniture | Product List";
  }, []);

  return (
    <div className="w-full flex flex-col items-center h-full mt-24 px-10 ">
      <motion.div
        className="w-full h-[400px] relative rounded-[20px]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          backgroundImage: `url(${coverImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-full bg-black rounded-3xl opacity-30 absolute"></div>
        <div className="w-[15rem] md:w-[30rem] h-fill absolute right-4 md:right-8 bottom-16 text-right text-primary text-wrap text-5xl md:text-7xl">
          Discover Bespoke Elegance
        </div>
      </motion.div>
      <motion.div
        className="w-full px-0 pt-8 pb-2 text-3xl md:text-7xl text-secondary-100 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        Step into a world where furniture is
        <br /> more than functionality—it’s an art form
      </motion.div>
      <motion.div
        className="w-full px-0 pt-2 pb-2 text-2xl md:text-4xl text-secondary-100 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        Each piece in our collection is meticulously handcrafted by skilled
        artisans, ensuring <br /> no two items are alike. Explore timeless
        designs that blend tradition, craftsmanship, <br />
        and modern luxury.
      </motion.div>
      <Products />
    </div>
  );
}
