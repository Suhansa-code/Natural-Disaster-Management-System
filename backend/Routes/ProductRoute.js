import express from "express";
import {
	createProduct,
	getProducts,
	deleteProduct,
	getSingleProduct,
	getSuggestedProducts,
	updateProduct,
} from "../Controllers/ProductCtrl.js";
import upload from "../Utils/multer.js";

const router = express.Router();

// Create Product with Multiple Images
router.post("/create", upload.array("images", 5), createProduct); // Max 5 images
router.get("/", getProducts);
router.delete("/:id", deleteProduct);
router.get("/:id", getSingleProduct);
router.get("/Suggestion/:category", getSuggestedProducts);
router.put("/:id", upload.array("images", 5), updateProduct);

export default router;
