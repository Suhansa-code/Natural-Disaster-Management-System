import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to the user
	items: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			}, // Reference to product
			quantity: { type: Number, required: true, min: 1 }, // Quantity of the product
		},
	],
	totalPrice: { type: Number, required: true, default: 0 }, // Calculate dynamically
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
// module.exports = mongoose.model("Cart", cartSchema);
