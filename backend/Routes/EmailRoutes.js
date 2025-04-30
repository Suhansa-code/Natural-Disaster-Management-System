import express from "express";
import sendEmail from "../utils/sendEmail.js";
import fs from "fs";
import axios from "axios";

const router = express.Router();

router.get("/approve", async (req, res) => {
  const { id } = req.query;
  await axios.put(`http://localhost:5000/api/payment/${id}`, {
    status: "Successful", // Ensure backend updates status
  });

  res.send("✅ Payment Approved!");
});

router.get("/reject", async (req, res) => {
  const { id } = req.query;
  await axios.put(`http://localhost:5000/api/payment/${id}`, {
    status: "Failed", // Ensure backend updates status
  });

  res.send("❌ Payment Rejected!");
});

router.post("/", async (req, res) => {
  const {
    _id,
    username,
    email,
    amount,
    bankname,
    branch,
    currency,
    slipImage,
  } = req.body;

  // Generate PDF Receipt
  /*const pdfPath = `./uploads/Payment_Receipt_${Date.now()}.pdf`;
  fs.writeFileSync(
    pdfPath,
    `Payment Receipt\nName: ${username}\nEmail: ${email}\nAmount: ${
      amount / 100
    } USD`
  );
  */
  try {
    await sendEmail(
      _id,
      username,
      email,
      amount,
      bankname,
      branch,
      currency,
      slipImage
    );
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
