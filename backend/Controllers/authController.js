import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../Models/user.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    status,
    last_active,
    Country,
    joinDate,
    profile_img,
  } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    status: status || "Active",
    last_active: last_active || new Date().toISOString(),
    Country: Country || "Unknown",
    joinDate: new Date().toISOString(),
    profile_img: profile_img || "",
  });

  res.status(201).json({
    token: generateToken(user),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      last_active: user.last_active,
      Country: user.Country,
      joinDate: user.joinDate,
      profile_img: user.profile_img,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    $or: [
      { email: { $regex: new RegExp(`^${email}$`, "i") } }, // Case-insensitive email match
      { name: { $regex: new RegExp(`^${email}$`, "i") } }, // Case-insensitive name match
    ],
  });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    token: generateToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

export const forgetpassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Send mail using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "GuardianEarth.Pro@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="http://localhost:5173/reset-password?email=${email}">here</a> to reset your password.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, password, status, last_active, Country, profile_img } =
      req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (status) user.status = status;
    if (last_active) user.last_active = last_active;
    if (Country) user.Country = Country;
    if (profile_img) user.profile_img = profile_img;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        last_active: user.last_active,
        Country: user.Country,
        profile_img: user.profile_img,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log(user._id);
    await User.findByIdAndDelete(user._id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

export const activateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = "Active";
    await user.save();

    res.json({ message: "User activated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to activate user" });
  }
};

export const deactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = "Inactive";
    await user.save();

    res.json({ message: "User deactivated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to deactivate user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, role, status, Country, profile_img } = req.body;

    // Update user fields if provided in the request body
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (status) user.status = status;
    if (Country) user.Country = Country;
    if (profile_img) user.profile_img = profile_img;

    await user.save();

    res.json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        Country: user.Country,
        profile_img: user.profile_img,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};
