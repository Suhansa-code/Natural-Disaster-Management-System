import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import Stripe from "stripe";
import Dbcon from "./Config/db.js";

// Routes
import PaymentRoutes from "./Routes/PaymentRoutes.js"; // Payment-related routes
import EmailRoutes from "./Routes/EmailRoutes.js"; // Email-related routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Stripe Initialization

// Database Connection
Dbcon();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/payment", PaymentRoutes); // Payment-related endpoints
app.use("/api/email", EmailRoutes); // Email sending endpoint

// Home Route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Stripe Payment Intent
app.post("/api/payment/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
