import express from "express";
import dotenv, { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
import Dbcon from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import { protect } from "./Middleware/authMiddleware.js";
import cloudinary from "cloudinary";
import cloudinaryRoutes from "./Utils/Cloudinary.js";

// Routes
import PaymentRoutes from "./Routes/PaymentRoutes.js";
import EmailRoutes from "./Routes/EmailRoutes.js";
import Datasetrouter from "./Routes/datasetRoutes.js";
import DisasterRouters from "./Routes/disasterRoutes.js";
import PostRouters from "./Routes/postsRoutes.js";
import floodRoutes from "./Routes/floodRoutes.js";


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
app.use("/api/dashboard", Datasetrouter); // Email sending endpoint
app.use("/api/disaster", DisasterRouters); // Email sending endpoint
app.use("/api/posts", PostRouters); // Email sending endpoint
app.use("/api/auth", authRoutes);
app.use("/api/user", protect, userRoutes);
app.use("/api", cloudinaryRoutes);

// JWT Secret Keys
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

// Stripe Payment Intent
// app.post("/api/payment/create-payment-intent", async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "usd",
//     });
//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Configuration
cloudinary.config({
  cloud_name: "dmmwhbmkq",
  api_key: "412359435453984",
  api_secret: process.env.CLOUDINARY_API_KEY,
});

 // Flood prediction API
app.use("/api/flood", floodRoutes); // Flood prediction API