import React, { useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import login_wallpaper from "../assets/wallpaper.jpg";
import { post } from "../../Services/ApiEndPoint";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../Components/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRight,
	faEye,
	faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import GridComponent from "../Components/GridComponent_Reg";

function Register() {
	//Change Document Title
	useEffect(() => {
		document.title = "Bespoke Furniture | Register";
	}, []);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);

	const validateForm = () => {
		if (!name) {
			toast.error("Name is required.");
			return false;
		}
		if (!email) {
			toast.error("Email is required.");
			return false;
		}
		if (!/\S+@\S+\.\S+/.test(email)) {
			toast.error("Enter a valid email address.");
			return false;
		}
		if (!password) {
			toast.error("Password is required.");
			return false;
		}
		if (password.length < 6) {
			toast.error("Password must be at least 6 characters long.");
			return false;
		}
		if (password !== confirmPassword) {
			toast.error("Passwords do not match.");
			return false;
		}
		return true;
	};

	const register_Submit = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		try {
			const request = await post("/api/auth/register", {
				name,
				email,
				password,
			});
			const response = request.data;
			if (request.status === 201) {
				toast.success(response.message || "Registered successfully!");
				setName("");
				setEmail("");
				setPassword("");
				setConfirmPassword("");
			}
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.message || "An error occurred.");
		}
	};

	return (
		<div>
			<div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden">
				<div className="flex flex-col gap-2 w-[100vw] lg:w-[700px] px-2 justify-between py-12 items-center">
					<Logo />

					<form
						onSubmit={register_Submit}
						className="w-full px-4 max-w-[400px]"
						noValidate
					>
						<div className="flex flex-col justify-center items-center mb-12">
							<h1 className="font-normal text-6xl text-[#533B30]">Sign Up</h1>
							<p className="font-thin text-[22px] mt-2 text-[#533B30]">
								Sign up to explore exclusive collections, receive personalized
								design tips, and gain access to limited-edition artisan pieces
							</p>
						</div>

						<div className="flex flex-col justify-center items-center text-center gap-5 w-full">
							<input
								type="text"
								placeholder="Username"
								id="username"
								className="rounded-[30px] border-[1.5px]  placeholder:text-[#533b308c] text-[#533b30da] w-full p-2 px-5 hover:border-[#533B30] border-[#533b309d] transition-all duration-300 outline-none"
								onChange={(e) => setName(e.target.value)}
								value={name}
								required
							/>

							<input
								type="email"
								placeholder="Email Address"
								id="email"
								className="rounded-[30px] border-[1.5px] placeholder:text-[#533b308c] text-[#533b30da] w-full p-2 px-5 hover:border-[#533B30] border-[#533b309d] transition-all duration-300 outline-none"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								required
							/>
							<div className="relative w-full">
								<input
									type={isPasswordVisible ? "text" : "password"}
									placeholder="Password"
									id="password"
									className="rounded-[30px] border-[1.5px] placeholder:text-[#533b308c] text-[#533b30da] w-full p-2 px-5 hover:border-[#533B30] border-[#533b309d] transition-all duration-300 outline-none"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
								/>
								<FontAwesomeIcon
									icon={isPasswordVisible ? faEye : faEyeSlash}
									className="absolute right-4 top-[14px] cursor-pointer text-[#533b30ab] hover:text-[#533b30] hover:scale-110 transition-all duration-300"
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
								/>
							</div>

							<div className="relative w-full">
								<input
									type={isConfirmPasswordVisible ? "text" : "password"}
									placeholder="Re-enter Password"
									id="repassword"
									className="rounded-[30px] border-[1.5px] placeholder:text-[#533b308c] text-[#533b30da] w-full p-2 px-5 hover:border-[#533B30] border-[#533b309d] transition-all duration-300 outline-none"
									onChange={(e) => setConfirmPassword(e.target.value)}
									value={confirmPassword}
								/>
								<FontAwesomeIcon
									icon={isConfirmPasswordVisible ? faEye : faEyeSlash}
									className="absolute right-4 top-[14px] cursor-pointer text-[#533b30ab] hover:text-[#533b30] hover:scale-110 transition-all duration-300"
									onClick={() =>
										setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
									}
								/>
							</div>

							<button
								type="submit"
								className="bg-[#533B30] active:border-[1.5px] active:border-[#533b30b5]  w-28 mt-4 justify-between flex flex-row gap-2 rounded-[20px] pl-4 py-1 text-white hover:scale-110 transition-all duration-300 active:bg-white active:text-[#533b30da]"
							>
								Sign Up
								<div className="rounded-[50px] mr-1 w-6 h-6 border-[2px] text-center justify-center items-center border-white flex flex-row content-center">
									<FontAwesomeIcon
										icon={faArrowRight}
										className="self-center l-2 w-3 h-3"
									/>
								</div>
							</button>
						</div>
					</form>
					<div className="flex flex-row items-center text-center">
						<div className="flex flex-row font-thin text-2xl text-[#533B30] text-[16px]">
							<span>Already have an account ?</span>
							<button
								href="#"
								className="rounded-[25px] ml-3 h-8 text-justify px-3 border-[#533B30] border-[1px] hover:bg-[#533B30] hover:text-white active:scale-110 transition-all duration-300  text-[#533b30da]"
							>
								<Link to={"/login"}>Sign In</Link>
							</button>
						</div>
					</div>
				</div>

				<div className="w-full h-[95vh] bg-black flex items-center justify-center overflow-hidden m-5  rounded-[25px] self-center">
					<GridComponent />
				</div>
			</div>
		</div>
	);
}

export default Register;
