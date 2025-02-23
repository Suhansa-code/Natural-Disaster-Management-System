import React from "react";
import logo from "../assets/Logo.png";

function Logo({ colour }) {
	return (
		<div className="logo flex flex-col  justify-center w-full">
			<img
				src={logo}
				alt="Logo"
				width={140}
				className="self-center"
				draggable="false"
			/>
			{/* 533B30 */}
			<h1 className={`text-[22px] text-[#${colour}] font-normal`}>
				Bespoke Furniture
			</h1>
			<p className={`text-[#${colour}] text-[16px] font-thin`}>by Artisan</p>
		</div>
	);
}

export default Logo;
