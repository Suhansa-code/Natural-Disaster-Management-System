import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import SearchBar from "../../Components/SearchBar";
import UserCardAdmin from "../../Components/Admin/UserCardAdmin";
import { FaCirclePlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { get } from "../../../Services/ApiEndPoint";
import toast from "react-hot-toast";

const UserManagement = () => {
	const [user, setUsers] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredUsers = user.filter((prod) =>
		prod.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const GetUsers = async () => {
		try {
			const response = await get("/api/admin/getuser");
			const data = response.data.user;
			setUsers(data);
		} catch (error) {
			toast.error("Error fetching Users :", error);
		}
	};
	useEffect(() => {
		GetUsers();
	}, []);

	// Handle search
	// const handleSearch = (query) => {
	// 	const filtered = products.filter((product) =>
	// 		product.name.toLowerCase().includes(query.toLowerCase())
	// 	);
	// 	setFilteredProducts(filtered);
	// };

	return (
		<div className="p-4">
			<h1 className="text-[22px] font-bold mb-5 text-gray-700">
				User Management
			</h1>
			<div className="flex justify-between mb-4">
				<div className="flex items-center bg-gray-100 rounded-[10px] shadow-lg p-4 mb-6 w-1/3 mx-auto h-12">
					<FaSearch className="text-gray-500 mr-4" />
					<input
						type="text"
						placeholder="Search Users..."
						className="flex-grow outline-none bg-transparent text-gray-700"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-4 ">
				{filteredUsers && filteredUsers.length > 0 ? (
					filteredUsers.map((user) => (
						<UserCardAdmin key={user._id} user={user} getUsers={GetUsers} />
					))
				) : (
					<div className="mt-[28vh] text-[20px] text-gray-500   self-center text-center flex justify-center items-center">
						<p className="w-[300px] bg-gray-100 rounded-[10px] py-10">
							No Record found!
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserManagement;
