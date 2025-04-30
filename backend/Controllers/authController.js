import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import nodemailer from "nodemailer";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password, role });
  res.status(201).json({
    token: generateToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
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

    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};
