import express from "express";
import { DeleteUser, GetUser, UpdateadminData } from "../Controllers/Admin.js";
import { isAdmin } from "../Middleware/VerifyToken.js";
import { UpdateUserData } from "../Controllers/Auth.js";

const AdminRoutes = express.Router();
AdminRoutes.get("/getuser", isAdmin, GetUser);
AdminRoutes.post("/delete/:id", isAdmin, DeleteUser);
AdminRoutes.put("/update/:id", isAdmin, UpdateadminData);

export default AdminRoutes;
