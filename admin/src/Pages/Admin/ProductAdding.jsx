import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import SearchBar from "../../Components/SearchBar";
import ProductCardAdmin from "../../Components/Admin/ProductCardAdmin";
import { FaCirclePlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { get } from "../../../Services/ApiEndPoint";
import toast from "react-hot-toast";
import AddProductForm from "../../Components/Admin/AddProductForm";

export default function ProductAdding() {
	const [products, setProducts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isAdding, setIsAdding] = useState(false);

	const filteredProducts = products.filter((prod) =>
		prod.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const fetchProducts = async () => {
		try {
			const response = await get("/api/v1/products/");
			const data = response.data;
			setProducts(data); // Set fetched products
			setFilteredProducts(data); // Initially show all products
		} catch (error) {
			//toast.error("Error fetching products:", error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const handleCreateProduct = async (formData) => {
		try {
			const response = await fetch(
				"http://localhost:4000/api/v1/products/create",
				{
					method: "POST",
					body: formData, // Send FormData directly
				}
			);

			const data = await response.json();

			if (response.ok) {
				setProducts((prev) => [...prev, data.product]);
				//setFilteredProducts((prev) => [...prev, data.product]);
				setIsAdding(false);
				toast.success(data.message || "Product created successfully!");
			} else {
				toast.error(data.message || "Failed to create product.");
			}
		} catch (error) {
			console.error("Error creating product:", error);
			toast.error("An error occurred. Please try again.");
		}
	};
	return (
		<div className="p-4">
			<h1 className="text-[22px] font-bold mb-5 text-gray-700">
				Product Management
			</h1>
			<div className="flex justify-between mb-4 mx-20">
				<div className="flex items-center bg-gray-100 rounded-[10px] shadow-lg p-4 mb-6 w-full mr-10 h-12">
					<FaSearch className="text-gray-500 mr-4" />
					<input
						type="text"
						placeholder="Search products..."
						className="flex-grow outline-none bg-transparent text-gray-700"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				<button
					className="flex items-center gap-2 px-6 py-3 h-12 rounded-lg bg-secondary-100 text-primary font-semibold shadow-md hover:shadow-lg hover:bg-secondary-200 transition-all duration-300 whitespace-nowrap group"
					onClick={() => setIsAdding(true)}
				>
					<FaCirclePlus className="text-primary text-xl transition-transform duration-300 transform group-hover:scale-125 group-hover:text-secondary-100" />
					<span className="text-primary-light text-lg transition-colors duration-300 group-hover:text-secondary-100">
						Add Product
					</span>
				</button>
			</div>
			{isAdding ? (
				<AddProductForm
					onCreate={handleCreateProduct}
					onCancel={() => setIsAdding(false)}
				/>
			) : (
				<div className="grid grid-cols-1 gap-2 ">
					{filteredProducts && filteredProducts.length > 0 ? (
						filteredProducts.map((product) => (
							<ProductCardAdmin
								key={product._id}
								product={product}
								fetchProducts={fetchProducts}
							/>
						))
					) : (
						<div className="mt-[28vh] text-[20px] text-gray-500   self-center text-center flex justify-center items-center">
							<p className="w-[300px] bg-gray-100 rounded-[10px] py-10">
								No Record found!
							</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
