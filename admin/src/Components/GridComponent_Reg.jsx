import React from "react";
import img1 from "../assets/images1.jpg"; // Import the image
import "./GridComponent.css";
import iR1 from "../assets/Wallpaper/Image2/ir1.png";
import iR2 from "../assets/Wallpaper/Image2/ir2.png";
import iR3 from "../assets/Wallpaper/Image2/ir3.png";
import iR4 from "../assets/Wallpaper/Image2/ir4.png";
import iR5 from "../assets/Wallpaper/Image2/ir5.png";
import iR6 from "../assets/Wallpaper/Image2/ir6.png";
import iR7 from "../assets/Wallpaper/Image2/ir7.png";
import iR8 from "../assets/Wallpaper/Image2/ir8.png";
import iR9 from "../assets/Wallpaper/Image2/ir9.png";
import iR10 from "../assets/Wallpaper/Image2/ir10.png";
import iR11 from "../assets/Wallpaper/Image2/ir11.png";
import iR12 from "../assets/Wallpaper/Image2/ir12.png";
import iR13 from "../assets/Wallpaper/Image2/ir13.png";
import iR14 from "../assets/Wallpaper/Image2/ir14.png";
import iR15 from "../assets/Wallpaper/Image2/ir15.png";
import iR16 from "../assets/Wallpaper/Image2/ir16.png";
import FlipCard from "./FlipCard";

const images = [
	iR1,
	iR2,
	iR3,
	iR4,
	iR5,
	iR6,
	iR7,
	iR8,
	iR9,
	iR10,
	iR11,
	iR12,
	iR13,
	iR14,
	iR15,
	iR16,
];

const GridComponent = () => {
	return (
		<div className="image-grid-container">
			<div className="grid-overlay">
				{Array.from({ length: 16 }).map((_, index) => {
					if (index === 9) {
						return (
							<FlipCard
								text1={"Precision Beyond Time"}
								text2={"Enduring Artistry"}
								colour1={"ffffff"}
								colour2={"533B30"}
								size1={"50px"}
								size2={"50px"}
								position={"center"}
								position1={"left"}
								textcolour={"533B30"}
								textcolour1={"ffffff"}
							/>
						);
					} else if (index === 6) {
						return (
							<FlipCard
								text1={"Exclusive Design"}
								text2={"Crafted to Endure"}
								colour1={"ffffff"}
								colour2={"ffffff"}
								size1={"50px"}
								size2={"50px"}
								position={"center"}
								position1={"left"}
								textcolour={"533B30"}
								textcolour1={"533B30"}
							/>
						);
					} else if (index === 11) {
						return (
							<div key={index} className={`relative grid-tile bg-[#533B30]`}>
								{/* <img src={images[index]} alt="" className="object-cover" /> */}

								<div className="tile-content abolute text-white text-left  w-full">
									<h2 className="text-[2.7rem] pl-3">
										celebrate
										<br /> centuries
									</h2>
								</div>
							</div>
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
