import React, { useState, useEffect } from "react";
import img1 from "../assets/images1.jpg"; // Import the image
import { motion } from "framer-motion";
import "./GridComponent.css";
import i1 from "../assets/Wallpaper/Image1/i1.png";
import i2 from "../assets/Wallpaper/Image1/i2.png";
import i3 from "../assets/Wallpaper/Image1/i3.png";
import i4 from "../assets/Wallpaper/Image1/i4.png";
import i5 from "../assets/Wallpaper/Image1/i5.png";
import i6 from "../assets/Wallpaper/Image1/i6.png";
import i7 from "../assets/Wallpaper/Image1/i7.png";
import i8 from "../assets/Wallpaper/Image1/i8.png";
import i9 from "../assets/Wallpaper/Image1/i9.png";
import i10 from "../assets/Wallpaper/Image1/i10.png";
import i11 from "../assets/Wallpaper/Image1/i11.png";
import i12 from "../assets/Wallpaper/Image1/i12.png";
import i13 from "../assets/Wallpaper/Image1/i13.png";
import i14 from "../assets/Wallpaper/Image1/i14.png";
import i15 from "../assets/Wallpaper/Image1/i15.png";
import i16 from "../assets/Wallpaper/Image1/i16.png";
import FlipCard from "./FlipCard";

const images = [
	i1,
	i2,
	i3,
	i4,
	i5,
	i6,
	i7,
	i8,
	i9,
	i10,
	i11,
	i12,
	i13,
	i14,
	i15,
	i16,
];

const GridComponent = () => {
	const [animate, setAnimate] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Cycle through 0, 1, 2
		}, 5000); // Change this duration as needed
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="image-grid-container">
			<div className="grid-overlay">
				{Array.from({ length: 16 }).map((_, index) => {
					if (index === 5) {
						return (
							// 533B30
							<div key={index} className={`relative grid-tile bg-[#eeeeee]`}>
								<FlipCard
									text1={"Designs Rooted in Excellence"}
									text2={"Timeless Craftsmanship"}
									colour1={"301d0e"}
									colour2={"533B30"}
									size1={"50px"}
									size2={"50px"}
									position={"center"}
									position1={"center"}
								/>

								{/* 
								<motion.div
									className="absolute bottom-0 left-0 w-full h-full grid-tile bg-[#cfb09a]"
									initial={{ y: "100%" }}
									animate={{ y: "0%" }}
									transition={{
										duration: 1, // Smooth animation duration
										ease: "linear",
										repeat: Infinity, // Repeat animation
										repeatType: "loop", // Reverse animation for a loop effect
										repeatDelay: 2, // Delay before repeating
									}}
								>
									<h2 className="text-[3rem]">Timeless Craftsmanship</h2>
								</motion.div>
								<motion.div
									className="absolute bottom-0 left-0 w-full h-full grid-tile bg-[#cfb09a]"
									initial={{ y: "100%" }}
									animate={{ y: "0%" }}
									transition={{
										duration: 1, // Smooth animation duration
										ease: "linear",
										repeat: Infinity, // Repeat animation
										repeatType: "loop", // Reverse animation for a loop effect
										repeatDelay: 2, // Delay before repeating
									}}
								>
									<h2 className="text-[3rem]">Designs Rooted in Excellence</h2>
								</motion.div>
								<motion.div
									className="absolute bottom-0 left-0 w-full h-full grid-tile bg-[#86c7d0]"
									initial={{ y: "100%" }}
									animate={{ y: "0%" }}
									transition={{
										duration: 1, // Smooth animation duration
										ease: "linear",
										repeat: Infinity, // Repeat animation
										repeatType: "loop", // Reverse animation for a loop effect
										repeatDelay: 4, // Delay before repeating
									}}
								>
									<h2 className="text-[3rem]">Tradition Meets Innovation</h2>
								</motion.div> */}
								{/* <div
									className={`animated-div absolute bottom-0 left-0 w-full h-full bg-[#cfb09a] ${
										animate ? "slide-up" : "slide-down"
									}`}
								>
									<img
										src={images[index]}
										alt=""
										className="object-cover w-full h-full -ml-"
									/>
								</div>{" "} */}
							</div>
						);
					} else if (index === 6) {
						return (
							<div key={index} className={`relative grid-tile`}>
								{/* <img src={images[index]} alt="" className="object-cover" /> */}

								<p className="tile-content abolute text-[#533B30] text-[1.4rem] text-center  w-full px-10">
									Discover the artistry behind bespoke furniture that elevates
									your spaces
								</p>
							</div>
						);
					} else if (index === 11) {
						return (
							<div key={index} className={`relative grid-tile bg-[#533B30]`}>
								{/* <img src={images[index]} alt="" className="object-cover" /> */}

								<div className="tile-content abolute text-white text-left  w-full">
									<h2 className="text-[3rem] pl-3">
										Heritage
										<br /> Quality
									</h2>
								</div>
							</div>
						);
					} else if (index === 14) {
						return (
							<FlipCard
								text1={"Elegance in Every Detail"}
								text2={"Inspired by Legacy"}
								colour1={"301d0e"}
								colour2={"533B30"}
								size1={"50px"}
								size2={"50px"}
								position={"start"}
								position1={"left"}
							/>
						);
					} else {
						return (
							<div key={index} className={`relative grid-tile`}>
								<img
									src={images[index]}
									alt=""
									className="object-cover w-full h-full"
									draggable="false"
								/>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};

export default GridComponent;
