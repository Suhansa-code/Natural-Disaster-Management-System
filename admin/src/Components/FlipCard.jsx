import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Component Css/FlipCard.css";

const FlipCard = ({
	text1,
	text2,
	colour1,
	colour2,
	size1,
	size2,
	position,
	position1,
	textcolour,
	textcolour1,
}) => {
	const [isFlipped, setIsFlipped] = useState(false);

	// Automatically flip the card every 2 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setIsFlipped((prev) => !prev);
		}, 5000);

		return () => clearInterval(interval); // Cleanup on unmount
	}, []);

	return (
		<div className="perspective-container  rounded-[30px]">
			<motion.div
				className="flip-card"
				animate={{ rotateX: isFlipped ? 180 : 0 }}
				transition={{ duration: 0.6, ease: "easeInOut" }}
				style={{ transformStyle: "preserve-3d" }}
			>
				<div
					className={`card-face front bg-[#${colour1}] text-[${size1}] px-2 flex items-${position} justify-${position1} text-[#${textcolour}]`}
				>
					{text1}
				</div>

				<div
					className={`card-face back bg-[#${colour2}] text-[${size2}] px-2 flex items-${position} justify-${position1} text-[#${textcolour1}]`}
				>
					{text2}
				</div>
			</motion.div>
		</div>
	);
};

export default FlipCard;
