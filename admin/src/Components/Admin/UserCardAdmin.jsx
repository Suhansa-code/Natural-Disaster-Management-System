import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaUser, FaPen, FaTrash } from "react-icons/fa";
import { delet, post, put, updateAdmin } from "../../../Services/ApiEndPoint";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRight,
	faEye,
	faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const UserCardAdmin = ({ user, getUsers }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
		mobile: user.mobile,
		address: user.address,
	});

	const [name, setName] = useState(user.mobile || "");
	const [email, setEmail] = useState(user.address || "");
	const [mobile, setMobile] = useState(user.mobile || "");
	const [address, setAddress] = useState(user.address || "");
	const [password, setPassword] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSave = async (e) => {
		e.preventDefault();

		const updatedData = {
			name,
			email,
			address,
			mobile,
			password,
		};

		//console.log(updatedData);

		try {
			const request = await put(`/api/admin/update/${user._id}`, updatedData);

			if (request.status === 200) {
				// toast.success(request.data.message || "Update successfully!");
				setTimeout(() => {
					window.location.reload();
				}, 2000);
				window.location.reload();
				// setTimeout(() => {
				// 	window.location.reload();
				// }, 2000);
				toast.success(request.data.message || "Update successfully!");
			}
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.message || "An error occurred.");
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	const handleCancel = () => {
		setFormData({ ...user });
		setIsEditing(false);
	};

	const handleDelete = async () => {
		const confirmDelete = await new Promise((resolve) => {
			toast(
				(t) => (
					<div style={{ textAlign: "center" }}>
						<p>Are you sure you want to delete "{user.name}"?</p>
						<div
							style={{
								marginTop: "10px",
								display: "flex",
								justifyContent: "center",
								gap: "10px",
							}}
						>
							<button
								onClick={() => {
									toast.dismiss(t.id); // Dismiss toast
									resolve(true); // Resolve promise with true
								}}
								style={{
									padding: "6px 12px",
									backgroundColor: "#f44336",
									color: "#fff",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
								}}
							>
								Confirm
							</button>
							<button
								onClick={() => {
									toast.dismiss(t.id);
									resolve(false); // Resolve promise with false
								}}
								style={{
									padding: "6px 12px",
									backgroundColor: "#ccc",
									color: "#000",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				),
				{ duration: 5000 } // Custom duration for this toast only (5 seconds)
			);
		});

		if (!confirmDelete) return; // Exit if user cancels

		try {
			const response = await post(`/api/admin/delete/${user._id}`);
			const data = await response.data;
			toast.success(data.message || "User Account deleted successfully.");
			getUsers();
		} catch (error) {
			toast.error("An error occurred while deleting the User.");
			console.log(error);
		}
	};

	return (
		<div
			className={`transition-all duration-500 ease-in-out bg-white mx-20 rounded-xl border shadow-lg hover:shadow-2xl overflow-hidden ${
				isEditing ? "p-8" : "p-4 flex justify-between items-center"
			}`}
		>
			{!isEditing ? (
				<>
					{/* Product View */}
					<div className="grid grid-cols-[15%,15%,38%,20%,1fr] items-center gap-4 w-full">
						{/* First Column (10% width) */}
						<div className="col-span-1 flex flex-row items-center gap-10">
							<div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full shadow-md">
								<FaUser className="text-gray-600 text-xl" />
							</div>
							<h3 className="text-[18px] font-semibold text-gray-800">
								{user.role}
							</h3>
						</div>

						{/* Second Column (60% width) */}
						{/* <div className="col-span-1 flex flex-row items-start text-left justify-start"> */}
						<div className="flex flex-col justify-center items-center text-center ">
							<h1 className="text-[18px] font-bold text-gray-800">Username</h1>

							<h3 className="text-[16px] font-semibold text-gray-600">
								{user.name}
							</h3>
						</div>

						<div className="flex flex-col justify-center items-center text-center">
							<h1 className="text-[18px] font-bold text-gray-800">E-mail</h1>

							<h3 className="text-[16px] font-semibold text-gray-600">
								{user.email}
							</h3>
						</div>
						{/* </div> */}

						{/* Third Column (20% width) */}
						<div className="col-span-1">
							<p className="text-lg font-bold text-gray-700">{user.mobile}</p>
						</div>

						{/* Fourth Column (Balance of remaining space) */}
						<div className="col-span-1 ">
							<div className="flex items-center gap-5">
								<button
									onClick={() => setIsEditing(true)}
									className="p-2 rounded-[6px] bg-brown-300 text-white hover:bg-brown-500 transition duration-300"
								>
									<FaPen />
								</button>
								<button
									onClick={handleDelete}
									className="p-2 rounded-[6px] bg-red-500 text-white hover:bg-red-600 transition duration-300"
								>
									<FaTrash />
								</button>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					{/* Edit Form */}
					<form className="w-full space-y-4 text-[20px] ">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-gray-800">
								User Management
							</h2>
							<button
								type="button"
								onClick={handleCancel}
								className="text-red-500 hover:text-red-700 transition duration-300"
							>
								Cancel
							</button>
						</div>
						<div className="flex flex-row gap-5 items-center px-20">
							<label className="block text-gray-600 text-left w-1/4">
								User Name
							</label>
							<input
								type="text"
								name="name"
								defaultValue={user.name}
								onChange={(e) => setName(e.target.value)}
								className="w-full border-gray-200 rounded-lg shadow-sm p-2 focus:border-brown-100 ring-0 border-[1px] outline-none"
							/>
						</div>
						<div className="flex flex-row gap-5 items-center px-20">
							<label className="block text-gray-600 text-left w-1/4">
								E - mail
							</label>
							<input
								name="email"
								defaultValue={user.email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full border-gray-200 rounded-lg shadow-sm p-2 focus:border-brown-100 ring-0 border-[1px] outline-none"
							></input>
						</div>
						<div className="flex flex-row gap-5 items-center px-20">
							<label className="block text-gray-600 text-left w-1/4">
								Address
							</label>
							<textarea
								type="text"
								name="address"
								rows={4}
								defaultValue={user.address}
								onChange={(e) => setAddress(e.target.value)}
								className="w-full border-gray-200 rounded-lg shadow-sm p-2 focus:border-brown-100 ring-0 border-[1px] outline-none"
							/>
						</div>
						<div className="flex flex-row gap-5 items-center px-20">
							<label className="block text-gray-600 text-left w-1/4">
								Mobile No
							</label>
							<input
								name="mobile"
								defaultValue={user.mobile}
								onChange={(e) => setMobile(e.target.value)}
								className="w-full border-gray-200 rounded-lg shadow-sm p-2 focus:border-brown-100 ring-0 border-[1px] outline-none"
							></input>
						</div>{" "}
						<div className="flex flex-row gap-5 items-center px-20">
							<label className="block text-gray-600 text-left w-1/4">
								Password
							</label>
							<div className="relative w-full">
								<input
									type={isPasswordVisible ? "text" : "password"}
									placeholder="Password"
									id="password"
									className=" placeholder:text-[#533b308c] text-[#533b30da] w-full  px-2 border-gray-200 rounded-lg shadow-sm p-2 focus:border-brown-100 ring-0 border-[1px]  transition-all duration-300 outline-none"
									onChange={(e) => setPassword(e.target.value)}
								/>
								<FontAwesomeIcon
									icon={isPasswordVisible ? faEye : faEyeSlash}
									className="absolute right-4 top-[14px] cursor-pointer text-[#533b30ab] hover:text-[#533b30] hover:scale-110 transition-all duration-300"
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
								/>
							</div>
							{/* <input
								name="mobile"
								defaultValue={user.mobile}
								onChange={(e) => setMobile(e.target.value)}
								className="w-full border-gray-200 rounded-lg shadow-sm p-2 focus:border-brown-100 ring-0 border-[1px] outline-none"
							></input> */}
						</div>
						<div className="flex justify-end gap-4">
							<button
								type="button"
								onClick={handleCancel}
								className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleSave}
								className="px-4 py-2 rounded-lg bg-brown-300 text-white hover:bg-brown-400 transition duration-300"
							>
								Save
							</button>
						</div>
					</form>
				</>
			)}
		</div>
	);
};

UserCardAdmin.propTypes = {
	user: PropTypes.object.isRequired,
	getUsers: PropTypes.func.isRequired,
};

export default UserCardAdmin;
