import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	price: { type: Number, required: true },
	category: { type: String },
	stoke: { type: Number, required: true },
	//img array
	images: [
		{
			url: { type: String, required: true },
			public_id: { type: String, required: true },
		},
	],
	createdAt: { type: Date, default: Date.now },
});

// module.exports = mongoose.model("Product", productSchema);
const productModel = mongoose.model("Product", productSchema);

export default productModel;
