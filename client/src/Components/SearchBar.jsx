import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
	const [searchText, setSearchText] = useState("");

	const handleSearch = () => {
		if (onSearch && searchText.trim() !== "") {
			onSearch(searchText);
		}
	};

	return (
		<div className="bg-secondary-200-low border-2 border-secondary-100 flex items-center p-2 h-[50px] rounded-2xl w-3/4">
			{/* Input Field */}
			<input
				type="text"
				className="bg-transparent text-secondary-100 flex-1 outline-none text-lg px-2 placeholder:text-slate-600"
				placeholder="Search for products, categories..."
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
				onKeyPress={(e) => {
					handleSearch();
				}}
			/>

			{/* Search Icon Button */}
		</div>
	);
}
