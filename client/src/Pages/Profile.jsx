import React, { useState, useRef, useEffect } from "react";
import profile_img from "../assets/profile_img.webp";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faImage } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { put, get } from "../../Services/ApiEndPoint";
import { useNavigate } from "react-router-dom";
import AccordionCustomStyles from "../Components/accordion";
import axios from "axios";

function Profile() {
	const user = useSelector((state) => state.Auth.user);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const [imgpath, setImgpath] = useState(user.profileImage);

	useEffect(() => {
		document.title = "Bespoke Furniture | Profile";
		if (!user.profileImage) {
			setImgpath(profile_img); // Assign default image
		}
	}, [user.profileImage]);
	const fileInputRef = useRef(null);

	const [imageseleted, setimageselected] = useState("");
	const [purchaseHistory, setPurchaseHistory] = useState([]);

	//Fetch History Data
	useEffect(() => {
		const fetchPurchaseHistory = async () => {
			try {
				const response = await get(`/api/v1/purchase-history/user/${user._id}`);
				setPurchaseHistory(response.data); // Assuming the response data is an array of purchase history
			} catch (error) {
				console.error("Error fetching purchase history:", error);
			}
		};

		if (user) {
			fetchPurchaseHistory();
		}
	}, [user]);

	//console.log(user);
	const [mobile, setMobile] = useState(user.mobile || "");
	const [address, setAddress] = useState(user.address || "");

	const handleButtonClick = () => {
		fileInputRef.current.click();
	};

	const uploadImage = async () => {
		const formData1 = new FormData();
		formData1.append("file", imageseleted);
		formData1.append("upload_preset", "xw4yrog1");

		try {
			const response = await axios.post(
				"https://api.cloudinary.com/v1_1/pasi123/image/upload",
				formData1
			);
			console.log("Uploaded image:", response.data);
			return response.data.secure_url;
		} catch (error) {
			console.error("Error uploading image:", error);
			toast.error("Failed to upload image.");
			throw error;
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();

		try {
			let uploadedImageUrl = null;

			if (imageseleted) {
				uploadedImageUrl = await uploadImage();
			}

			const updatedData = {
				mobile,
				address,
				profileImage: uploadedImageUrl,
			};

			const request = await put(`/api/auth/update/${user._id}`, updatedData);

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

	return (
		<div className="flex flex-col mt-10 overflow-hidden px-10  items-center">
			<div className="flex flex-row px-10 mt-10 mx-10 justify-center text-center items-center shadow-lg w-fit rounded-[10px]">
				<div className="flex flex-col w-auto justify-center items-center ">
					<div className="text-[30px] font-normal text-[#533B30] mb-3 self-center">
						My Profile
					</div>
					<div className="relative overflow-hidden rounded-full border-2  border-[#dddddd] p-1 transition-all duration-300 group">
						<div className="relative rounded-full overflow-hidden bg-[#e2e2e2] h-[45vh] w-[45vh]">
							<img
								src={imgpath}
								alt="profile picture"
								className="object-cover w-full h-full"
								draggable="false"
							/>

							<input
								type="file"
								accept="image/*"
								ref={fileInputRef}
								style={{ display: "none" }}
								onChange={(event) => {
									const selectedFile = event.target.files[0];
									setimageselected(selectedFile);
									const fileURL = URL.createObjectURL(selectedFile);
									setImgpath(fileURL);
								}}
							/>
						</div>
						<div className="absolute bg-[#ffffff74] opacity-0 group-hover:opacity-100 transition-all duration-300 text-[18px] text-gray-700 backdrop-blur-lg w-full h-[60px] bottom-[20%] translate-y-[50%] flex items-center justify-center">
							<button
								className="w-30 h-8 px-3 bg-[#ffffff] rounded-[5px] active:bg-brown-50"
								onClick={handleButtonClick}
							>
								Change Image
							</button>
						</div>
					</div>
				</div>
				<div className="flex flex-col text-left  p-16  w-auto  m-5 pt-32">
					<div className="profile_card w-full overflow-hidden">
						<div className="text-[24px] ml-4 font-normal text-[#533B30]">
							Name
						</div>
						<input
							className="text-[18px] px-3 py-1 rounded-[5px] ml-1 outline-[#d2815c]  w-[30vw] font-light mb-4 text-[#7b6a60] bg-transparent border-[1.5px]  hover:border-brown-200 transition-all duration-300"
							type="text"
							disabled
							defaultValue={user.name}
						></input>
					</div>
					<div className="profile_card w-full overflow-hidden">
						<div className="text-[24px] ml-4  font-normal  text-[#533B30]">
							Email
						</div>

						<input
							className="text-[18px] px-3 py-1 rounded-[5px] ml-1 outline-[#d2815c]  w-[30vw] font-light mb-4 text-[#7b6a60] bg-transparent border-[1.5px]  hover:border-brown-200 transition-all duration-300"
							type="text"
							disabled
							defaultValue={user.email}
						></input>
					</div>
					<div className="profile_card w-full overflow-hidden">
						<div className="text-[24px] ml-4  font-normal  text-[#533B30]">
							Phone Number
						</div>
						<input
							className="text-[18px] px-3 py-1 rounded-[5px] ml-1 outline-[#d2815c]  w-[30vw] font-light mb-4 text-[#7b6a60] bg-transparent border-[1.5px]  hover:border-brown-200 transition-all duration-300"
							type="text"
							defaultValue={user.mobile}
							onChange={(e) => setMobile(e.target.value)}
						></input>
					</div>
					<div className="profile_card w-full overflow-hidden flex flex-col justify-between">
						<div className="div">
							<div className="text-[24px] ml-4  font-normal text-[#533B30]">
								Address
							</div>
							<textarea
								className="text-[18px] px-3 py-1 rounded-[5px] ml-1 outline-[#d2815c] text-wrap w-[30vw] font-light bg-transparent mb-4 text-[#7b6a60] border-[1.5px] hover:border-brown-200 transition-all duration-300"
								type="text"
								defaultValue={user.address}
								rows={4}
								onChange={(e) => setAddress(e.target.value)}
							></textarea>
						</div>

						<div className="flex flex-row items-center justify-center mt-0 gap-5 p-5">
							<button
								type="submit"
								onClick={handleUpdate}
								className={`bg-[#7e5441] text-[20px] h-8 active:border-[1.5px] active:border-[#533b30b5] 
              w-32 rounded-[5px] text-center  text-white hover:bg-[#9e6f59] transition-all 
              duration-300 active:bg-white active:text-[#533b30da] `}
							>
								Update
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-center px-20 text-left w-full mt-10">
				<h1 className="font-normal text-3xl text-[#533B30] pl-2 py-5 text-center">
					Purchase History
				</h1>
				<AccordionCustomStyles purchaseHistory={purchaseHistory} />
			</div>
		</div>
	);
}

export default Profile;
