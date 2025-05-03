import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../Controllers/authController.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
