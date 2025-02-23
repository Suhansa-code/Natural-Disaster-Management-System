import mongoose from "mongoose";

const PurchaseHistorySchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		purchaseId: { type: String, required: true, unique: true },
		purchaseDate: { type: Date, required: true, default: Date.now },
		totalAmount: { type: Number, required: true, default: 0 },
		paymentMethod: { type: String, required: false },
		paymentStatus: {
			type: String,
			required: true,
			enum: ["Paid", "Pending", "Failed"],
		},
		orderNotes: { type: String },
		discount: { type: Number },
		invoiceUrl: { type: String },
		products: [
			{
				products: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				itemName: { type: String, required: true },
				quantity: { type: Number, required: true },
				price: { type: Number, required: true },
				totalPrice: { type: Number, required: true },
				imageUrl: { type: String, required: true },
			},
		],
	},
	{ collection: "purchasehistory" }
);

const PurchaseHistoryModel = mongoose.model(
	"PurchaseHistory",
	PurchaseHistorySchema
);

export default PurchaseHistoryModel;
