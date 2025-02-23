import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import toast from "react-hot-toast";

export default function Inventory() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch products from API
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch("http://localhost:4000/api/v1/products/");
				const data = await response.json();
				setProducts(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching products:", error);
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	const handleStockChange = (productId, change) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) =>
				product._id === productId
					? { ...product, stoke: Math.max(product.stoke + change, 0) }
					: product
			)
		);
	};

	const handleSave = async (productId) => {
		const product = products.find((item) => item._id === productId);

		// Ensure all required fields are included in the request body
		const { name, price, category, description, images, stoke } = product;

		// Validation: Check if all fields are filled
		if (!name || !price || !category || !description || !images.length) {
			toast.error("All fields are required.");
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:4000/api/v1/products/${productId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name,
						price,
						category,
						description,
						images,
						stoke,
					}), // Include all fields
				}
			);

			const data = await response.json();
			if (response.ok) {
				toast.success(data.message || "Product updated successfully.");
			} else {
				toast.error(data.message || "Failed to update product.");
			}
		} catch (error) {
			console.error("Error updating product:", error);
			toast.error("An error occurred while updating the product.");
		}
	};

	if (loading) {
		return <div>Loading products...</div>;
	}

	return (
		<div className="p-4">
			<h1 className="text-[22px] font-bold mb-5 text-gray-700">
				Inventory Management
			</h1>

			{products.map((product) => (
				<div
					key={product._id}
					className={`transition-all duration-500  ease-in-out my-2 mx-20 bg-white rounded-xl border shadow-lg hover:shadow-2xl overflow-hidden px-4 py-2 gap-2 flex justify-between items-center`}
				>
					{/* Product View */}
					<div className="grid grid-cols-[8%,40%,30%,1fr] items-center gap-4 w-full">
						{/* First Column (10% width) */}
						<div className="col-span-1">
							<img
								src={product.images[0]?.url}
								alt={product.name}
								className="w-20 h-20 object-cover rounded-lg shadow-md transition-transform duration-300 transform hover:scale-110"
							/>
						</div>

						{/* Second Column (60% width) */}
						<div className="col-span-1 flex flex-col items-start text-left justify-start">
							<h3 className="text-[22px] font-semibold text-gray-800">
								{product.name}
							</h3>
							<p
								className={`${
									product.stoke > 0 ? "text-green-500" : "text-red-500"
								} text-[18px]`}
							>
								{product.stoke > 0 ? "In Stock" : "Out of Stock"}
							</p>
						</div>

						{/* Third Column (20% width) */}
						<div className="col-span-1 flex flex-col justify-center">
							<p className="text-lg font-bold text-gray-800">Category</p>
							<p className="text-lg font-thing text-gray-700">
								{product.category}
							</p>
						</div>

						{/* Fourth Column (Balance of remaining space) */}
						<div className="col-span-1 flex items-center gap-12">
							{/* Stock Controls */}
							<div className="flex items-center">
								<button
									onClick={() => handleStockChange(product._id, -1)}
									className="px-2 py-1 bg-gray-200 rounded-l-lg hover:bg-gray-300"
								>
									-
								</button>
								<div className="px-4 py-1 border bg-gray-100">
									{product.stoke}
								</div>
								<button
									onClick={() => handleStockChange(product._id, 1)}
									className="px-2 py-1 bg-gray-200 rounded-r-lg hover:bg-gray-300"
								>
									+
								</button>
							</div>

							{/* Save Button */}
							<button
								onClick={() => handleSave(product._id)}
								className="p-2 rounded-lg bg-secondary-100 w-[80px] text-white hover:bg-secondary-200 transition duration-300"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
