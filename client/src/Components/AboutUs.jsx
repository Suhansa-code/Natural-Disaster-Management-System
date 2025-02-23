import React from "react";
import img1 from "../assets/images/img13.png";
import img2 from "../assets/images/img20.png";
import { motion } from "framer-motion";

const AboutUs = () => {
	return (
		<div className="container mx-auto mt-28 p-4 ">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				{/* First Row */}
				<motion.div
					className="flex justify-center items-center"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<img
						src={img1}
						alt="Bespoke Antique Furniture"
						className="w-full h-auto rounded-lg shadow-lg"
					/>
				</motion.div>
				<motion.div
					className="flex justify-center items-center"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.3 }}
				>
					<div className="text-left p-4">
						<h2 className="text-5xl font-bold mb-8 text-gray-800">
							About Bespoke
						</h2>
						<p className="text-[26px] text-gray-500">
							Bespoke is a unique collaboration between U.K. citizens and Sri
							Lankan artisans, specializing in exquisite antique furniture. Our
							mission is to blend timeless craftsmanship with modern elegance,
							creating pieces that resonate with history and beauty.
						</p>
					</div>
				</motion.div>

				{/* Second Row */}
				<motion.div
					className="flex justify-center items-center md:order-2"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.8 }}
				>
					<img
						src={img2}
						alt="Artisan Craftsmanship"
						className="w-full h-auto rounded-lg shadow-lg"
					/>
				</motion.div>
				<motion.div
					className="flex justify-center items-center md:order-1"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.5 }}
				>
					<div className="text-left p-4">
						<h2 className="text-5xl font-bold mb-8 text-gray-800 ">
							Our Heritage
						</h2>
						<p className="text-[26px] text-gray-500">
							Our passion for antique furniture stems from a shared love of
							history, craftsmanship, and culture. We work closely with skilled
							artisans in Sri Lanka to bring the finest furniture designs to
							life, combining traditional techniques with modern designs.
						</p>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default AboutUs;
