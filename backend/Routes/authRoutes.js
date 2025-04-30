import express from "express";
import {
  register,
  login,
  getMe,
  forgetpassword,
} from "../Controllers/authController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgot-password", forgetpassword);

export default router;
