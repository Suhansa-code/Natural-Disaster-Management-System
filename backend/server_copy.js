import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Dbcon from "./Utils/db.js";
import AuthRoutes from "./Routes/Auth.js";
import AdminRoutes from "./Routes/AdminRoutes.js";
import cookieparser from "cookie-parser";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import multer from "multer";
import fs from "fs";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use Stripe with ES Module
const PORT = process.env.PORT || 4000;

const app = express();

// ======================= DATABASE CONNECTION =======================
Dbcon();

// ======================= MIDDLEWARES =======================
app.use(express.json());
app.use(cookieparser());

app.use(cors());

// ======================= ROUTES =======================
app.use("/api/auth", AuthRoutes);
app.use("/api/admin", AdminRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// ======================= PAYMENT BACKEND =======================
app.post("/create-payment-intent", async (req, res) => {
  const { amount, name, email } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    // Generate PDF Receipt
    const pdfPath = `./uploads/Payment_Receipt_${Date.now()}.pdf`;
    fs.writeFileSync(
      pdfPath,
      `Payment Receipt\nName: ${name}\nEmail: ${email}\nAmount: ${
        amount / 100
      } USD`
    );

    // Send Email with PDF
    sendEmail(name, email, pdfPath);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ======================= EMAIL FUNCTIONALITY =======================

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // App Password
  },
});

// Function to send email
const sendEmail = async (name, email, pdfPath) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Payment Confirmation",
    text: `Hello ${name},\n\nThank you for your payment.\n\nAttached is your receipt.`,
    attachments: [{ filename: "Payment_Receipt.pdf", path: pdfPath }],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Email Error:", error);
  } finally {
    // Remove PDF after sending email
    fs.unlinkSync(pdfPath);
  }
};

// ======================= SERVER START =======================
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
