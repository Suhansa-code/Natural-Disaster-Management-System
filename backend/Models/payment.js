import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    //user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user making the payment
    user: { type: String, required: true }, // Reference to the user making the payment

    paymentMethod: {
      type: String,
      enum: ["stripe", "bank_transfer"],
      required: true,
    }, // Stripe or Bank Transfer

    amount: { type: Number, required: true }, // Payment amount in cents

    currency: { type: String, default: "USD" }, // Currency used for payment

    branch: { type: String }, // Slip Upload Branch

    status: {
      type: String,
      enum: ["pending", "successful", "failed"],
      default: "pending",
    }, // Payment status

    transactionId: { type: String, unique: true, sparse: true }, // Stripe transaction ID

    slipImage: {
      type: String,
      required: function () {
        return this.paymentMethod === "bank_transfer";
      },
    }, // Image URL for slip (required if bank transfer)

    email: { type: String, required: true }, // Email for payment confirmation

    receiptUrl: { type: String }, // Stripe receipt URL (if applicable)

    createdAt: { type: Date, default: Date.now }, // Timestamp
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
