import UserModel from "../Models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

const register = async (req, res) => {
	try {
		const { name, email, role, password } = req.body;
		const existUsers = await UserModel.findOne({
			email: { $regex: new RegExp(`^${email}$`, "i") },
		});
		const existUsername = await UserModel.findOne({
			name: { $regex: new RegExp(`^${name}$`, "i") },
		});

		if (existUsers || existUsername) {
			return res.status(401).json({
				sucess: false,
				message:
					"Username or Email already exists. Please try with a different username or email.",
			});
		}

		const hashedPassword = await bcryptjs.hashSync(password, 10);
		const newuser = new UserModel({
			name,
			email,
			role,
			password: hashedPassword,
		});

		await newuser.save();
		res
			.status(201)
			.json({ message: "User Registration Successfully", newuser });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
		console.log(error);
	}
};

const Login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({
			$or: [{ email: email }, { name: email }],
		});

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Please enter a valid credentials !",
			});
		}

		// Validate password
		const isPasswordValid = bcryptjs.compareSync(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: "Please enter a valid credentials !",
			});
		}

		// Generate JWT
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		res.cookie("token", token, {
			httpOnly: true,
			maxAge: 3600000,
			secure: false,
		});

		res.status(200).json({
			success: true,
			message: "Login Successfully",
			user,
			token,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
		console.log(error);
	}
};

const Logout = async (req, res) => {
	try {
		res.clearCookie("token");
		res.status(200).json({ success: true, message: "Logout Successfully" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
		console.log(error);
	}
};

const CheckUser = async (req, res) => {
	try {
		const user = req.user;

		if (!user) {
			res.status(404).json({ success: false, message: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
		console.log(error);
	}
};

const UpdateUserData = async (req, res) => {
	try {
		const { id } = req.params; // User ID from request params
		const { mobile, address, profileImage } = req.body; // Mobile and address fields from request body

		// Validate input
		if (!mobile && !address) {
			return res.status(400).json({
				success: false,
				message: "Please provide mobile or address to update.",
			});
		}

		// Find and update the user
		const updatedUser = await UserModel.findByIdAndUpdate(
			id,
			{
				$set: {
					...(mobile && { mobile }),
					...(address && { address }),
					...(profileImage && { profileImage }),
				},
			},
			{ new: true } // Return the updated user
		);

		if (!updatedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found.",
			});
		}

		res.status(200).json({
			success: true,
			message: "User updated successfully.",
			updatedUser,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
		console.error(error);
	}
};

export { register, Login, Logout, CheckUser, UpdateUserData };
