import express from "express";
import {
  createPayment,
  verifyPayment,
  getPaymentList,
  updatePayment,
  deletePayment,
} from "../Controllers/PaymentController.js";

const router = express.Router();

// Route to create a Stripe payment intent
router.post("/stripe-payment", createPayment);

// Route to verify a manual bank transfer payment (with slip upload)
router.post("/verify-bank-payment", verifyPayment);

// Get All Payments
router.get("/", getPaymentList);

// Approve Payment
router.put("/:id", updatePayment);

//Delete Payment Recode
router.delete("/delete/:id", deletePayment);

export default router;
