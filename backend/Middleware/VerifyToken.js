import jwt from "jsonwebtoken";
import UserModel from "../Models/user.js";

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ msg: "Access denied. No user found." });
    }
    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ msg: "Access denied. You are not an admin ." });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const IsUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ msg: "Access denied. No user found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
export { isAdmin, IsUser };
