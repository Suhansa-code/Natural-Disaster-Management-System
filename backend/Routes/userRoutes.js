import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { getMe, updateProfile } from "../Controllers/authController.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.put("/me", protect, updateProfile);

export default router;
