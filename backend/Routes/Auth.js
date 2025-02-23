import express from "express";
import {
	register,
	Login,
	Logout,
	CheckUser,
	UpdateUserData,
} from "../Controllers/Auth.js";
import { IsUser } from "../Middleware/VerifyToken.js";

const AutoRoutes = express.Router();

AutoRoutes.post("/register", register);
AutoRoutes.post("/login", Login);
AutoRoutes.post("/logout", Logout);
AutoRoutes.get("/checkUser", IsUser, CheckUser);
AutoRoutes.put("/update/:id", UpdateUserData);

export default AutoRoutes;
