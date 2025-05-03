import Stripe from "stripe";
import dotenv from "dotenv";
import Payment from "../Models/payment.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a Stripe payment intent
export const createPayment = async (req, res) => {
  const { user_ID, username, amount, currency, email } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      receipt_email: email,
    });

    // Save the payment record in MongoDB
    const newPayment = new Payment({
      user: user_ID, // Save the user ID
      name: username,
      paymentMethod: "stripe",
      amount,
      currency,
      branch: "N/A",
      status: "Pending",
      transactionId: paymentIntent.id,
      email,
    });

    await newPayment.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify a manual bank transfer payment
export const verifyPayment = async (req, res) => {
  const {
    user_ID,
    username,
    amount,
    bankname,
    branch,
    currency,
    slipImage,
    email,
  } = req.body;

  try {
    const newPayment = new Payment({
      user: user_ID, // Save the user ID
      name: username,
      paymentMethod: "bank_transfer",
      amount,
      currency,
      bankname,
      branch,
      status: "Pending",
      slipImage,
      email,
    });
    const savedPayment = await newPayment.save();

    res.json({
      message: "Bank transfer payment submitted for verification.",
      paymentId: savedPayment._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Payments
export const getPaymentList = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve Payment
export const updatePayment = async (req, res) => {
  const { status } = req.body;
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = status;
    await payment.save();

    res.json({ message: "Payment approved successfully", payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Payment Record Controller
export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    await Payment.findByIdAndDelete(req.params.id);

    res.json({ message: "Payment record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch payments for a specific user
export const getUserPayments = async (req, res) => {
  const { userId } = req.params;

  try {
    const payments = await Payment.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json({ payments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
