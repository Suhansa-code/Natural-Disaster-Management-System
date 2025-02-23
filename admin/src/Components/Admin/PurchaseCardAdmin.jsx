import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const PurchaseCardAdmin = ({ purchase }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => setIsExpanded((prev) => !prev);

	return (
		<AnimatePresence>
			<motion.div
				className="transition-all duration-500 ease-in-out mx-20 bg-white rounded-xl border shadow-lg hover:shadow-2xl overflow-hidden"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				layout
				onClick={toggleExpand}
			>
				{/* Summary View */}
				<div className="grid grid-cols-[8%,60%,20%,1fr] items-center gap-4 w-full p-4 cursor-pointer">
					<div className="col-span-1">
						<img
							src={
								purchase.products[0]?.imageUrl ||
								"https://via.placeholder.com/150"
							}
							alt="Product"
							className="w-20 h-20 object-cover rounded-lg shadow-md transition-transform duration-300 transform hover:scale-110"
						/>
					</div>
					<div className="col-span-1 flex flex-col items-start text-left justify-start">
						<h3 className="text-[22px] font-semibold text-gray-800">
							{purchase.purchaseId}
						</h3>
						<p className="text-gray-600">
							{new Date(purchase.purchaseDate).toLocaleDateString()}
						</p>
						<p
							className={`text-[18px] ${
								purchase.paymentStatus === "Paid"
									? "text-green-500"
									: purchase.paymentStatus === "Pending"
										? "text-orange-700"
										: "text-red-500"
							}`}
						>
							{purchase.paymentStatus}
						</p>
					</div>
					<div className="col-span-1">
						<p className="text-lg font-bold text-gray-700 ">
							${purchase.totalAmount}
						</p>
					</div>
					<div className="col-span-1">
						<p className="text-sm text-gray-500">Click to view details</p>
					</div>
				</div>

				{/* Expanded View */}
				{isExpanded && (
					<motion.div
						className="p-4 bg-gray-50"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
					>
						{/* User Information */}
						<div className="mb-6">
							<h4 className="text-lg font-semibold mb-4">User Information:</h4>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
								<div className="p-4 bg-white border rounded-lg shadow-sm">
									<p className="font-semibold">Name:</p>
									<p className="text-gray-700">{purchase.userDetails.name}</p>
								</div>
								<div className="p-4 bg-white border rounded-lg shadow-sm">
									<p className="font-semibold">Email:</p>
									<p className="text-gray-700">{purchase.userDetails.email}</p>
								</div>
								<div className="p-4 bg-white border rounded-lg shadow-sm">
									<p className="font-semibold">User ID:</p>
									<p className="text-gray-700">{purchase.userDetails._id}</p>
								</div>
							</div>
						</div>

						{/* Product Information */}
						<h4 className="text-lg font-semibold mb-4">Products in Order:</h4>
						<div className="space-y-4">
							{purchase.products.map((product, index) => (
								<div
									key={index}
									className="flex items-center gap-4 p-4 border rounded-lg shadow-sm"
								>
									<img
										src={product.imageUrl || "https://via.placeholder.com/150"}
										alt={product.itemName}
										className="w-16 h-16 object-cover rounded-lg"
									/>
									<div className="flex-1">
										<h5 className="font-semibold text-gray-800">
											{product.itemName}
										</h5>
										<p className="text-gray-600">Price: ${product.price}</p>
									</div>
									<div>
										<p className="text-gray-700 font-bold">
											Quantity: {product.quantity}
										</p>
										<p className="text-gray-700 font-bold">
											Total: ${product.totalPrice}
										</p>
									</div>
								</div>
							))}
						</div>
					</motion.div>
				)}
			</motion.div>
		</AnimatePresence>
	);
};

PurchaseCardAdmin.propTypes = {
	purchase: PropTypes.shape({
		purchaseId: PropTypes.string.isRequired,
		purchaseDate: PropTypes.string.isRequired,
		totalAmount: PropTypes.number.isRequired,
		paymentStatus: PropTypes.string.isRequired,
		userDetails: PropTypes.shape({
			name: PropTypes.string.isRequired,
			email: PropTypes.string.isRequired,
			_id: PropTypes.string.isRequired,
		}).isRequired,
		products: PropTypes.arrayOf(
			PropTypes.shape({
				itemName: PropTypes.string.isRequired,
				price: PropTypes.number.isRequired,
				quantity: PropTypes.number.isRequired,
				totalPrice: PropTypes.number.isRequired,
				imageUrl: PropTypes.string,
			})
		).isRequired,
	}).isRequired,
};

export default PurchaseCardAdmin;
