import express from "express";
import {
	addToCart,
	getCart,
	removeFromCart,
	clearCart,
	increaseQuantity,
	decreaseQuantity,
} from "../Controllers/CartCtrl.js";

const router = express.Router();

router.post("/add", addToCart); // Add item to cart
router.get("/:userId", getCart); // Get user's cart
router.post("/remove", removeFromCart); // Remove item from cart
router.post("/clear", clearCart); // Clear cart
router.post("/increase", increaseQuantity);
router.post("/decrease", decreaseQuantity);

export default router;
