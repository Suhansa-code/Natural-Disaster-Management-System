import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../Services/ApiEndPoint";
import {
	Avatar,
	Button,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
	Typography,
} from "@material-tailwind/react";
import {
	Cog6ToothIcon,
	InboxArrowDownIcon,
	LifebuoyIcon,
	PowerIcon,
	UserCircleIcon,
} from "@heroicons/react/24/solid";
import profile_img from "../assets/profile_img.webp";
import { Logout } from "../Redux/AuthSlice";

// profile menu component

export function Profile_Avatar() {
	const user = useSelector((state) => state.Auth.user);
	const [imgpath, setImgpath] = useState(user?.profileImage || profile_img);

	useEffect(() => {
		// Update `imgpath` whenever `user` changes
		if (user?.profileImage) {
			setImgpath(user.profileImage);
		} else {
			setImgpath(profile_img);
		}
	}, [user]);

	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const closeMenu = () => setIsMenuOpen(false);
	const dispatch = useDispatch();

	const gotoProfile = () => {
		console.log("mavigate pass");
		navigate("/profile");
	};

	const helpPrompt = () => {
		alert("This is help prompt");
	};

	const handleLogOut = async () => {
		try {
			const request = await post("api/auth/logout");
			const response = request.data;

			if (request.status == 200) {
				dispatch(Logout());
				dispatch({ type: "RESET_APP_STATE" });
				navigate("/login");
			} else {
				console.error("Logout failed:", request.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const profileMenuItems = [
		{
			label: "My Profile",
			icon: UserCircleIcon,
			action: gotoProfile,
		},
		{
			label: "Help",
			icon: LifebuoyIcon,
			action: helpPrompt,
		},
		{
			label: "Sign Out",
			icon: PowerIcon,
			action: handleLogOut,
		},
	];

	if (!user) {
		return null; // Return null or a fallback UI if `user` is not available
	}
	return (
		<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
			<MenuHandler>
				<Button
					variant="text"
					color="blue-gray"
					className="flex items-center rounded-full p-0 h-[50px hover:scale-[1.10] transition-all duration-300"
				>
					<Avatar
						variant="circular"
						size="md"
						alt="tania andrew"
						withBorder={true}
						color="blue-gray"
						className=" p-0.5 w-10 h-10"
						src={imgpath}
					/>
				</Button>
			</MenuHandler>
			<MenuList className="p-1">
				{profileMenuItems.map(({ label, icon, action }, key) => {
					const isLastItem = key === profileMenuItems.length - 1;
					return (
						<MenuItem
							key={label}
							onClick={(closeMenu, action)}
							className={`flex items-center gap-2 rounded ${
								isLastItem
									? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
									: ""
							}`}
						>
							{React.createElement(icon, {
								className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
								strokeWidth: 2,
							})}
							<Typography
								as="span"
								variant="small"
								className="font-normal"
								color={isLastItem ? "red" : "inherit"}
							>
								{label}
							</Typography>
						</MenuItem>
					);
				})}
			</MenuList>
		</Menu>
	);
}
