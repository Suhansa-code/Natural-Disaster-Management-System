import express from "express";
import {
  register,
  login,
  getProfile,
  forgetpassword,
  deactivateUser,
  getUsers,
  activateUser,
  deleteUser,
  updateUser,
  updateProfile,
  changePassword,
} from "../Controllers/authController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getProfile);
router.post("/forgot-password", forgetpassword);
router.get("/users", protect, getUsers);
router.put("/users/:id/activate", protect, activateUser);
router.put("/users/:id/deactivate", protect, deactivateUser);
router.delete("/users/:id", protect, deleteUser);
router.put("/users/:id", protect, updateUser);
router.put("/change-password", protect, changePassword);
export default router;
