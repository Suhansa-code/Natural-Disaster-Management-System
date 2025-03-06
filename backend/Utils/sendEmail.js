import nodemailer from "nodemailer";

const sendEmail = async (name, email, pdfPath) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Payment Receipt",
    text: `Hello ${name},\n\nThank you for your payment. Please find your receipt attached.`,
    attachments: [{ filename: "receipt.pdf", path: pdfPath }],
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
