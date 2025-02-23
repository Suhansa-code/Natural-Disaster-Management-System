import UserModel from "../Models/user.js";
import bcryptjs from "bcryptjs";

const GetUser = async (req, res) => {
	try {
		const user = await UserModel.find();
		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ message: "Error fetching user" });
	}
};

const DeleteUser = async (req, res) => {
	try {
		const userID = req.params;

		const checkAdmin = await UserModel.findById(userID.id);

		if (checkAdmin.role == "admin") {
			return res.status(403).json({ message: "Cannot delete admin user" });
		}
		const user = await UserModel.findByIdAndDelete(userID.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const UpdateadminData = async (req, res) => {
	try {
		const { id } = req.params; // User ID from request params
		const { name, email, mobile, address, password } = req.body; // Mobile and address fields from request body

		if (req.user.role !== "admin" && req.user.id !== id) {
			return res
				.status(403)
				.json({ message: "You can only update your own data." });
		}

		// Find and update the user
		let updatedData = { name, email, mobile, address };
		if (password) {
			const hashedPassword = await bcryptjs.hash(password, 10); // Use await for asynchronous password hashing
			updatedData.password = hashedPassword; // Add the hashed password to the data
		}

		const updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, {
			new: true,
		});

		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
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
export { GetUser, DeleteUser, UpdateadminData };
