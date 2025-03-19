import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
      const { username, email, password, isAdmin } = req.body;
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false, // Allow admin creation if specified
      });
  
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});

export default router;
