import express from "express";
import sendEmail from "../utils/sendEmail.js";
import fs from "fs";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, amount } = req.body;

  // Generate PDF Receipt
  const pdfPath = `./uploads/Payment_Receipt_${Date.now()}.pdf`;
  fs.writeFileSync(
    pdfPath,
    `Payment Receipt\nName: ${name}\nEmail: ${email}\nAmount: ${
      amount / 100
    } USD`
  );

  try {
    await sendEmail(name, email, pdfPath);
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
